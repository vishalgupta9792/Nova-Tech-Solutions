import crypto from "crypto";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    if (!keySecret) {
      return NextResponse.json({ error: "Missing Razorpay key secret." }, { status: 500 });
    }

    const body = await req.json();
    const paymentId = String(body?.razorpay_payment_id ?? "");
    const orderId = String(body?.razorpay_order_id ?? "");
    const signature = String(body?.razorpay_signature ?? "");

    if (!paymentId || !orderId || !signature) {
      return NextResponse.json({ error: "Invalid payment payload." }, { status: 400 });
    }

    const expectedSignature = crypto
      .createHmac("sha256", keySecret)
      .update(`${orderId}|${paymentId}`)
      .digest("hex");

    const verified = expectedSignature === signature;
    if (!verified) {
      return NextResponse.json({ verified: false }, { status: 400 });
    }

    return NextResponse.json({ verified: true });
  } catch {
    return NextResponse.json({ error: "Verification failed." }, { status: 500 });
  }
}
