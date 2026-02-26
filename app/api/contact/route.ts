import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import { isContactAdminAuthorized } from "@/lib/contact-admin";

type ContactPayload = {
  name?: string;
  school?: string;
  phone?: string;
  service?: string;
  plan?: string;
  city?: string;
  boardType?: string;
  studentStrength?: string;
};

type LeadStatus = "new" | "contacted" | "qualified" | "closed";

const COLLECTION_NAME = "contact_leads";
const VALID_STATUSES: LeadStatus[] = ["new", "contacted", "qualified", "closed"];

function sanitize(value: unknown): string {
  return String(value ?? "").trim();
}

function validatePayload(payload: ContactPayload) {
  const name = sanitize(payload.name);
  const school = sanitize(payload.school);
  const phone = sanitize(payload.phone);
  const service = sanitize(payload.service);
  const plan = sanitize(payload.plan);
  const city = sanitize(payload.city);
  const boardType = sanitize(payload.boardType);
  const studentStrength = sanitize(payload.studentStrength);

  if (!name || !school || !phone || !service || !plan) {
    return { ok: false as const, error: "All fields are required." };
  }

  const phoneRegex = /^[0-9+\-\s()]{7,20}$/;
  if (!phoneRegex.test(phone)) {
    return { ok: false as const, error: "Invalid phone number." };
  }

  return {
    ok: true as const,
    value: { name, school, phone, service, plan, city, boardType, studentStrength }
  };
}

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const payload = (await req.json()) as ContactPayload;
    const validated = validatePayload(payload);

    if (!validated.ok) {
      return NextResponse.json({ success: false, error: validated.error }, { status: 400 });
    }

    const db = await getDb();
    const result = await db.collection(COLLECTION_NAME).insertOne({
      ...validated.value,
      status: "new",
      source: "website-contact-form",
      meta: {
        userAgent: req.headers.get("user-agent") ?? "",
        referer: req.headers.get("referer") ?? ""
      },
      createdAt: new Date(),
      updatedAt: new Date()
    });

    return NextResponse.json({
      success: true,
      leadId: result.insertedId.toString()
    });
  } catch (error) {
    console.error("Contact POST error:", error);
    const message =
      process.env.NODE_ENV === "development" && error instanceof Error
        ? error.message
        : "Failed to save contact request.";

    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    if (!isContactAdminAuthorized(req)) {
      return NextResponse.json({ success: false, error: "Unauthorized." }, { status: 401 });
    }

    const url = new URL(req.url);
    const limitRaw = Number(url.searchParams.get("limit") ?? "50");
    const pageRaw = Number(url.searchParams.get("page") ?? "1");
    const queryRaw = sanitize(url.searchParams.get("q"));
    const statusRaw = sanitize(url.searchParams.get("status")) as LeadStatus | "";
    const limit = Number.isFinite(limitRaw)
      ? Math.max(1, Math.min(200, Math.floor(limitRaw)))
      : 50;
    const page = Number.isFinite(pageRaw) ? Math.max(1, Math.floor(pageRaw)) : 1;
    const skip = (page - 1) * limit;

    const filter: Record<string, unknown> = {};
    if (statusRaw && VALID_STATUSES.includes(statusRaw)) {
      filter.status = statusRaw;
    }
    if (queryRaw) {
      filter.$or = [
        { name: { $regex: queryRaw, $options: "i" } },
        { school: { $regex: queryRaw, $options: "i" } },
        { phone: { $regex: queryRaw, $options: "i" } }
      ];
    }

    const db = await getDb();
    const collection = db.collection(COLLECTION_NAME);
    const total = await collection.countDocuments(filter);
    const leads = await db
      .collection(COLLECTION_NAME)
      .find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .toArray();

    return NextResponse.json({
      success: true,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.max(1, Math.ceil(total / limit))
      },
      leads: leads.map((lead) => ({
        id: lead._id.toString(),
        name: lead.name,
        school: lead.school,
        phone: lead.phone,
        service: lead.service,
        plan: lead.plan,
        city: lead.city ?? "",
        boardType: lead.boardType ?? "",
        studentStrength: lead.studentStrength ?? "",
        status: lead.status ?? "new",
        source: lead.source,
        createdAt: lead.createdAt,
        updatedAt: lead.updatedAt ?? lead.createdAt
      }))
    });
  } catch (error) {
    console.error("Contact GET error:", error);
    const message =
      process.env.NODE_ENV === "development" && error instanceof Error
        ? error.message
        : "Failed to fetch leads.";

    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
