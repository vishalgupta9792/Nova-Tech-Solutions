"use client";

import { FormEvent, ReactNode, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Atom, BadgeCheck, BarChart3, BookOpenCheck, BriefcaseBusiness, ChartSpline, ClipboardCheck, Cloud, FileCode2, Flame, Layers, Rocket, School, Sparkles, Wallet, Wind, Zap } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

declare global {
  interface Window {
    Razorpay?: new (options: Record<string, unknown>) => {
      open: () => void;
      on: (event: string, handler: (response: { error?: { description?: string } }) => void) => void;
    };
  }
}

const UPI_ID = "8896115419-2@ybl";
const reveal = { hidden: { opacity: 0, y: 24 }, show: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.55 } }) };

const nav = [
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Technology", href: "#technology" },
  { label: "Industries", href: "#industries" },
  { label: "Pricing", href: "#pricing" }
];
const serviceCards = [
  { title: "School Website Development", text: "Admissions-focused websites for modern school brands." },
  { title: "Complete School ERP System", text: "Operations, academics, fees, attendance, communication." },
  { title: "Result Management System", text: "Secure, role-based report and result publishing workflows." },
  { title: "Social Media Management", text: "Creative strategy and campaign execution for admissions." },
  { title: "Cloud Hosting & Security", text: "Performance hosting, security layers, and backups." },
  { title: "Ongoing Technical Support", text: "Continuous optimization, upgrades, and issue resolution." }
];
const serviceGuides = [
  {
    title: "School Website Development",
    whatItIs: "A school website is your institution's official digital front door where parents evaluate trust, credibility, and admissions quality.",
    whyItMatters: "Most parents research schools online first. An outdated website lowers perceived value and can reduce inquiry conversion.",
    benefits: ["Admission inquiry growth", "Professional brand image", "Mobile-friendly parent experience", "24x7 information availability"],
    plan: "Basic Plan"
  },
  {
    title: "Complete School ERP System",
    whatItIs: "An ERP is a centralized platform that manages attendance, fees, exams, transport, and administrative workflows in one place.",
    whyItMatters: "Manual operations create delays, errors, and reporting gaps. ERP provides structure, visibility, and operational control.",
    benefits: ["Time saving for staff", "Accurate records", "Faster decision making", "Parent communication automation"],
    plan: "Professional Plan"
  },
  {
    title: "Result Management System",
    whatItIs: "A result management system automates marks processing, report card generation, and secure publishing.",
    whyItMatters: "Manual result workflows are error-prone and slow during peak exam cycles.",
    benefits: ["Quick result publishing", "Error reduction", "Role-based access", "Parent trust and transparency"],
    plan: "Professional Plan"
  },
  {
    title: "Social Media Management",
    whatItIs: "Structured social execution for school branding, event coverage, admissions campaigns, and community engagement.",
    whyItMatters: "Competing schools grow visibility and admissions through digital channels; inactive presence leads to missed opportunities.",
    benefits: ["Better brand visibility", "Admission campaign support", "Consistent communication", "Higher engagement"],
    plan: "Premium Plan"
  },
  {
    title: "Cloud Hosting & Security",
    whatItIs: "High-uptime cloud hosting with backups, SSL, firewall protection, and proactive monitoring.",
    whyItMatters: "Downtime or security incidents directly impact school reputation, trust, and daily operations.",
    benefits: ["High uptime", "Data protection", "Secure access", "Performance stability"],
    plan: "Premium Plan"
  },
  {
    title: "Ongoing Technical Support",
    whatItIs: "Post-launch support includes ongoing maintenance, issue resolution, upgrades, and optimization.",
    whyItMatters: "Digital systems require continuous updates; without them, performance and reliability degrade over time.",
    benefits: ["Fast issue resolution", "Continuous improvements", "Lower technical risk", "Peace of mind for management"],
    plan: "Premium Plan"
  }
];
const projects = [
  { name: "Greenfield International School", city: "Noida", outcome: "+42% inquiry growth in 5 months", img: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80" },
  { name: "Sunrise Public School", city: "Lucknow", outcome: "ERP + results unified across 2 campuses", img: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1200&q=80" },
  { name: "Maple Leaf Academy", city: "Jaipur", outcome: "Admissions website + social media execution", img: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1200&q=80" }
];
const plans = [
  { name: "Basic Plan", sub: "Digital Presence", original: 15000, amount: 12000, discount: 3000, points: ["Website Setup", "SEO Basics", "Hosting", "Email Support"] },
  { name: "Professional Plan", sub: "Smart School System", original: 25000, amount: 20000, discount: 5000, points: ["Website + ERP Core", "Result Module", "Parent Comms", "Priority Support"], featured: true },
  { name: "Premium Plan", sub: "Complete Digital Management", original: 50000, amount: 45000, discount: 5000, points: ["Full Stack Delivery", "SMM Execution", "Security + Backups", "Dedicated Manager"] }
];
type ExpertiseItem = {
  label: string;
  icon: typeof BookOpenCheck;
  intro: string;
  manage: string;
  tracking: string;
  includes: string[];
};

const expertise: ExpertiseItem[] = [
  {
    label: "UI/UX Engineering",
    icon: BookOpenCheck,
    intro: "Admissions-focused interface systems that make parent journeys frictionless.",
    manage: "Weekly sprint board, wireframe approvals, and conversion-first design handoffs.",
    tracking: "You get screen-by-screen preview links and progress status for each module.",
    includes: ["User flow mapping", "Mobile-first design", "Conversion UI polish", "Design QA pass"]
  },
  {
    label: "Product-Led Delivery",
    icon: Layers,
    intro: "Execution style where outcomes drive releases, not random task completion.",
    manage: "Roadmap split into milestones with clear owner, ETA, and delivery checklist.",
    tracking: "Milestone dashboard shared with school leadership and approval checkpoints.",
    includes: ["Phase planning", "Risk control", "Sprint demos", "Launch playbook"]
  },
  {
    label: "Growth Analytics",
    icon: ChartSpline,
    intro: "Admission and campaign analytics layer that turns traffic into measurable growth.",
    manage: "UTM strategy, event mapping, and weekly lead-quality diagnostics.",
    tracking: "Live metrics review: inquiries, source quality, and conversion improvement.",
    includes: ["Funnel analytics", "Campaign attribution", "Lead scoring", "Monthly growth reports"]
  },
  {
    label: "Dedicated Project Team",
    icon: BriefcaseBusiness,
    intro: "Single accountable team instead of fragmented freelancers and delayed coordination.",
    manage: "PM + designer + developer + QA mapped to your project lifecycle.",
    tracking: "WhatsApp + dashboard support loop with response SLAs and issue timeline.",
    includes: ["Named team allocation", "SLA support", "Weekly review calls", "Escalation matrix"]
  },
  {
    label: "Leadership Dashboards",
    icon: BarChart3,
    intro: "Principal and management dashboards for decisions without data confusion.",
    manage: "Data points finalized with school stakeholders before dashboard deployment.",
    tracking: "Role-based access panels with downloadable reports and trend snapshots.",
    includes: ["Role-based dashboards", "Summary KPIs", "Report exports", "Department snapshots"]
  },
  {
    label: "Continuous Optimization",
    icon: Rocket,
    intro: "Post-launch upgrades to keep admissions, performance, and operations improving.",
    manage: "Monthly optimization cycle: audit, patch, release, and retrospective.",
    tracking: "Improvement backlog + before/after impact logs shared with your team.",
    includes: ["Performance tuning", "Security hardening", "UX improvements", "Feature upgrades"]
  }
];
const technologyTicker = [
  { label: "React", icon: Atom, iconTone: "text-cyan-300", chipTone: "border-cyan-300/35 bg-cyan-500/10" },
  { label: "TypeScript", icon: FileCode2, iconTone: "text-blue-300", chipTone: "border-blue-300/35 bg-blue-500/10" },
  { label: "Tailwind CSS", icon: Wind, iconTone: "text-sky-300", chipTone: "border-sky-300/35 bg-sky-500/10" },
  { label: "Framer Motion", icon: Sparkles, iconTone: "text-fuchsia-300", chipTone: "border-fuchsia-300/35 bg-fuchsia-500/10" },
  { label: "Cloud Hosting", icon: Cloud, iconTone: "text-indigo-300", chipTone: "border-indigo-300/35 bg-indigo-500/10" },
  { label: "School ERP", icon: School, iconTone: "text-emerald-300", chipTone: "border-emerald-300/35 bg-emerald-500/10" },
  { label: "Result Automation", icon: ClipboardCheck, iconTone: "text-teal-300", chipTone: "border-teal-300/35 bg-teal-500/10" },
  { label: "Next.js", icon: Rocket, iconTone: "text-slate-200", chipTone: "border-slate-300/35 bg-slate-500/10" }
];
const faqs = [
  {
    q: "How fast can you launch a school website?",
    a: "In most cases, delivery is completed in 2 to 4 weeks when content and approvals are provided on schedule.",
    category: "Delivery",
    detail: "We run phased milestones: discovery, design, development, and launch."
  },
  {
    q: "Can you migrate from an existing ERP?",
    a: "Yes. We provide phased migration, data validation, and parallel run support to avoid operational disruption.",
    category: "Migration",
    detail: "Data mapping is finalized before migration to preserve historical records."
  },
  {
    q: "Do you support CBSE/ICSE result formats?",
    a: "Yes. We configure report structures and workflows to match each board and school-specific academic rules.",
    category: "Academics",
    detail: "Your team gets role-based publishing control and final approval workflow."
  }
];
const contactHighlights = ["Needs Assessment", "Admissions Roadmap", "Dedicated Implementation Team", "Training & Handover"];
const stats = [
  { value: 8, label: "Years Experience", suffix: "+" },
  { value: 20, label: "Specialists", suffix: "+" },
  { value: 300, label: "Projects", suffix: "+" },
  { value: 4.8, label: "Client Rating", suffix: "/5", decimals: 1 }
];

const fmt = (n: number) => `INR ${n.toLocaleString("en-IN")}`;
const upiIntent = (name: string, amount: number) => `upi://pay?pa=${UPI_ID}&pn=Nova%20Tech%20Solutions&am=${amount}&cu=INR&tn=${encodeURIComponent(name)}`;
const upiQr = (name: string, amount: number) =>
  `https://api.qrserver.com/v1/create-qr-code/?size=512x512&data=${encodeURIComponent(upiIntent(name, amount))}`;

function Title({ tag, head, desc }: { tag: string; head: string; desc?: string }) {
  return (
    <div className="mb-10 max-w-3xl">
      <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-slate-300/50 px-4 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-slate-700 dark:border-white/20 dark:text-slate-200">
        <Rocket className="h-3.5 w-3.5" />{tag}
      </p>
      <h2 className="text-3xl font-bold leading-tight md:text-4xl">{head}</h2>
      {desc ? <p className="mt-4 text-base text-slate-700 dark:text-slate-300">{desc}</p> : null}
    </div>
  );
}

function RevealSection({ id, className, children }: { id?: string; className: string; children: ReactNode }) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 42, scale: 0.985 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.62, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.section>
  );
}

function CountUp({
  value,
  suffix = "",
  decimals = 0
}: {
  value: number;
  suffix?: string;
  decimals?: number;
}) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.8 });

  useEffect(() => {
    if (!inView) return;
    const duration = 1200;
    const start = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - (1 - progress) ** 3;
      setDisplay(value * eased);
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, value]);

  return (
    <span ref={ref}>
      {display.toFixed(decimals)}
      {suffix}
    </span>
  );
}

function OrbitCluster({ index }: { index: number }) {
  const spinA = 18 + index * 2;
  const spinB = 23 + index * 2;
  const spinC = 27 + index * 2;

  return (
    <div className="pointer-events-none absolute -right-12 -top-10 h-44 w-44 opacity-80">
      <div className="absolute left-1/2 top-1/2 h-14 w-14 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-200/30 bg-gradient-to-br from-cyan-300/30 via-emerald-300/10 to-slate-900/80 shadow-[0_0_45px_-10px_rgba(45,212,191,0.8)]" />
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: spinA, repeat: Infinity, ease: "linear" }}
        className="absolute inset-6 rounded-full border border-cyan-200/20"
      >
        <span className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-cyan-300 shadow-[0_0_14px_rgba(103,232,249,0.95)]" />
      </motion.div>
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: spinB, repeat: Infinity, ease: "linear" }}
        className="absolute inset-2 rounded-full border border-emerald-200/15"
      >
        <span className="absolute left-1/2 top-0 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-300 shadow-[0_0_16px_rgba(110,231,183,0.95)]" />
      </motion.div>
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: spinC, repeat: Infinity, ease: "linear" }}
        className="absolute inset-12 rounded-full border border-white/10"
      >
        <span className="absolute bottom-0 left-1/2 h-1.5 w-1.5 -translate-x-1/2 translate-y-1/2 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.9)]" />
      </motion.div>
    </div>
  );
}

export default function HomePage() {
  const [faqOpen, setFaqOpen] = useState(0);
  const [activeServiceGuide, setActiveServiceGuide] = useState(0);
  const [activeExpertise, setActiveExpertise] = useState(0);
  const [msg, setMsg] = useState("");
  const [msgType, setMsgType] = useState<"success" | "error">("success");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({ name: "", school: "", phone: "", service: serviceCards[0].title, plan: plans[1].name });
  const [dealEndsAt] = useState(() => Date.now() + 1000 * 60 * 60 * 48);
  const [timeLeft, setTimeLeft] = useState(1000 * 60 * 60 * 48);
  const [payingPlan, setPayingPlan] = useState<string | null>(null);
  const { scrollYProgress } = useScroll();
  const orbLeftY = useTransform(scrollYProgress, [0, 1], [-30, 180]);
  const orbRightY = useTransform(scrollYProgress, [0, 1], [-10, 120]);
  const faqRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress: faqProgress } = useScroll({
    target: faqRef,
    offset: ["start end", "end start"]
  });
  const faqLift = useTransform(faqProgress, [0, 0.5, 1], [38, 0, -26]);
  const faqLeftX = useTransform(faqProgress, [0, 0.5, 1], [-16, 0, 10]);
  const faqRightX = useTransform(faqProgress, [0, 0.5, 1], [18, 0, -12]);
  const faqSweepX = useTransform(faqProgress, [0, 1], ["-35%", "115%"]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(Math.max(0, dealEndsAt - Date.now()));
    }, 1000);
    return () => clearInterval(timer);
  }, [dealEndsAt]);
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMsg("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      const data = (await response.json()) as { success?: boolean; error?: string };

      if (!response.ok || !data.success) {
        setMsgType("error");
        setMsg(data.error || "Could not submit your requirement. Please try again.");
        return;
      }

      setMsgType("success");
      setMsg("Lead saved. Team will connect shortly.");
      setForm({ name: "", school: "", phone: "", service: serviceCards[0].title, plan: plans[1].name });
    } catch {
      setMsgType("error");
      setMsg("Network issue while submitting form. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  const hours = String(Math.floor(timeLeft / (1000 * 60 * 60))).padStart(2, "0");
  const minutes = String(Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, "0");
  const seconds = String(Math.floor((timeLeft % (1000 * 60)) / 1000)).padStart(2, "0");
  const activeExpertiseItem = expertise[activeExpertise];
  const activeGuide = serviceGuides[activeServiceGuide];

  const openServiceGuide = (index: number) => {
    setActiveServiceGuide(index);
    const section = document.getElementById("service-guide");
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const payWithRazorpay = async (plan: typeof plans[number]) => {
    if (!window.Razorpay) {
      setMsg("Payment SDK is still loading. Please try again.");
      return;
    }

    try {
      setPayingPlan(plan.name);
      const response = await fetch("/api/razorpay/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: plan.amount, planName: plan.name })
      });

      const payload = await response.json();
      if (!response.ok) {
        throw new Error(payload?.error ?? "Failed to create Razorpay order.");
      }

      const rz = new window.Razorpay({
        key: payload.keyId,
        amount: payload.amount,
        currency: payload.currency,
        name: "Nova Tech Solutions",
        description: `${plan.name} - ${plan.sub}`,
        order_id: payload.id,
        prefill: {
          name: form.name || "School Admin",
          contact: form.phone || ""
        },
        notes: {
          plan: plan.name
        },
        theme: {
          color: "#10b981"
        },
        handler: async (payResponse: {
          razorpay_payment_id?: string;
          razorpay_order_id?: string;
          razorpay_signature?: string;
        }) => {
          const verifyResponse = await fetch("/api/razorpay/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payResponse)
          });

          const verifyPayload = await verifyResponse.json();
          if (!verifyResponse.ok || !verifyPayload?.verified) {
            setMsg("Payment captured but verification failed. Contact support.");
            return;
          }

          setMsg(`Payment verified: ${payResponse.razorpay_payment_id ?? "Confirmed"}`);
        }
      });

      rz.on("payment.failed", (failed) => {
        setMsg(failed?.error?.description ?? "Payment failed. Please try again.");
      });

      rz.open();
    } catch (error) {
      setMsg(error instanceof Error ? error.message : "Unable to start payment.");
    } finally {
      setPayingPlan(null);
    }
  };

  const payViaUpiApp = (name: string, amount: number) => {
    const intentUrl = upiIntent(name, amount);
    const qrUrl = upiQr(name, amount);

    window.location.href = intentUrl;

    // If deep link handler is unavailable (common on desktop), open QR fallback.
    setTimeout(() => {
      if (document.visibilityState === "visible") {
        window.open(qrUrl, "_blank", "noopener,noreferrer");
      }
    }, 900);
  };

  return (
    <main className="relative overflow-hidden">
      <motion.div style={{ scaleX: scrollYProgress }} className="fixed left-0 top-0 z-[70] h-1 w-full origin-left bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(16,185,129,0.18),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(59,130,246,0.2),transparent_40%),linear-gradient(135deg,rgba(248,250,252,0.95),rgba(241,245,249,0.92))] dark:bg-hero-glow" />
      <motion.div style={{ y: orbLeftY }} className="pointer-events-none absolute -left-20 top-24 h-80 w-80 rounded-full bg-emerald-400/20 blur-3xl" />
      <motion.div style={{ y: orbRightY }} className="pointer-events-none absolute -right-20 top-8 h-80 w-80 rounded-full bg-blue-500/20 blur-3xl" />

      <header className="section-shell relative z-10 py-7">
        <nav className="glass flex flex-wrap items-center justify-between gap-3 px-5 py-3 text-slate-900 dark:text-slate-100">
          <motion.a
            href="#"
            whileHover={{ y: -1, scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 320, damping: 22 }}
            className="rounded-xl border border-slate-300/55 bg-white/45 px-3 py-2 transition-colors hover:bg-white/70 dark:border-white/20 dark:bg-white/10 dark:hover:bg-white/15"
          >
            <p className="text-lg font-bold text-slate-900 dark:text-white">Nova Tech Solutions</p>
            <p className="text-xs text-slate-700 dark:text-slate-200">Complete Digital Management for Modern Schools</p>
          </motion.a>
          <div className="order-3 w-full md:order-none md:w-auto">
            <div className="-mx-1 flex items-center gap-2 overflow-x-auto px-1 py-1">
              {nav.map((item) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  whileHover={{ y: -2, scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 320, damping: 22 }}
                  className="group relative shrink-0 rounded-full border border-slate-300/60 bg-white/45 px-4 py-2 text-xs font-semibold tracking-[0.03em] text-slate-800 transition-colors hover:text-slate-950 dark:border-white/25 dark:bg-white/10 dark:text-slate-100 dark:hover:text-white"
                >
                  <span className="relative z-10">{item.label}</span>
                  <span className="pointer-events-none absolute inset-x-3 bottom-1 h-px origin-left scale-x-0 bg-emerald-400 transition-transform duration-300 group-hover:scale-x-100" />
                </motion.a>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <motion.a
              href="#contact"
              whileHover={{ y: -2, scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 320, damping: 22 }}
              className="group relative overflow-hidden rounded-full bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_8px_24px_-12px_rgba(16,185,129,0.9)]"
            >
              <span className="pointer-events-none absolute inset-0 bg-gradient-to-r from-emerald-300/0 via-white/35 to-emerald-300/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <span className="relative">Get Free Demo</span>
            </motion.a>
            <motion.div whileHover={{ rotate: 18 }} transition={{ type: "spring", stiffness: 280, damping: 18 }}>
              <ThemeToggle />
            </motion.div>
          </div>
        </nav>
      </header>

      <RevealSection className="section-shell relative z-10 pb-10 pt-4 md:pb-12 md:pt-8">
        <div className="glass relative grid items-center gap-8 overflow-hidden px-7 py-10 md:grid-cols-2 md:px-10">
          <div className="pointer-events-none absolute -left-20 top-10 h-44 w-44 rounded-full bg-emerald-300/15 blur-3xl" />
          <div className="pointer-events-none absolute -right-20 bottom-6 h-44 w-44 rounded-full bg-cyan-300/15 blur-3xl" />
          <div>
            <p className="mb-4 inline-flex rounded-full border border-slate-300/60 bg-white/55 px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-slate-800 dark:border-white/25 dark:bg-white/10 dark:text-white">India&apos;s School Digital Transformation Studio</p>
            <h1 className="text-4xl font-extrabold leading-[1.02] text-slate-900 dark:text-white md:text-6xl">
              Where School Reputation
              <span className="block bg-gradient-to-r from-emerald-400 via-cyan-300 to-blue-300 bg-clip-text text-transparent">Meets Digital Performance</span>
            </h1>
            <p className="mt-5 max-w-xl text-base text-slate-700 dark:text-slate-200 md:text-lg">
              We build high-converting school websites, ERP systems, and result automation into one seamless digital layer that improves admissions, operations, and parent trust.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href="#contact" className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 px-6 py-3 text-sm font-semibold text-white shadow-[0_18px_40px_-20px_rgba(16,185,129,0.95)]">Book Free Strategy Call <ArrowRight className="h-4 w-4" /></a>
              <a href="#projects" className="rounded-full border border-slate-400/60 bg-white/50 px-6 py-3 text-sm font-semibold text-slate-800 transition hover:bg-white/70 dark:border-white/35 dark:bg-white/5 dark:text-white dark:hover:bg-white/10">See Transformation Stories</a>
            </div>
            <div className="mt-6 grid max-w-md grid-cols-3 gap-2 text-center text-xs text-slate-800 dark:text-white">
              <span className="rounded-lg border border-slate-300/60 bg-white/45 py-2 dark:border-white/20 dark:bg-white/5">100+ Schools</span>
              <span className="rounded-lg border border-slate-300/60 bg-white/45 py-2 dark:border-white/20 dark:bg-white/5">99.9% Uptime</span>
              <span className="rounded-lg border border-slate-300/60 bg-white/45 py-2 dark:border-white/20 dark:bg-white/5">4-Hour Support SLA</span>
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative h-[430px] w-full overflow-hidden rounded-3xl border border-white/20 bg-gradient-to-br from-slate-900/95 via-[#0e2144]/90 to-[#12395d]/90 p-4 shadow-[0_40px_70px_-40px_rgba(8,145,178,0.8)]"
          >
            <div className="pointer-events-none absolute inset-0 rounded-3xl bg-[radial-gradient(circle_at_14%_10%,rgba(16,185,129,0.18),transparent_28%),radial-gradient(circle_at_90%_8%,rgba(56,189,248,0.2),transparent_32%)]" />
            <Image
              src="https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1600&q=90"
              alt="Students collaborating in a modern classroom"
              fill
              className="rounded-3xl object-cover opacity-80"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
            <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-t from-slate-950/80 via-slate-900/20 to-transparent" />

            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative mt-64 rounded-2xl border border-white/25 bg-slate-900/55 p-4 backdrop-blur-xl"
            >
              <div className="mb-3 flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-cyan-100">Live School Dashboard</p>
                <span className="rounded-full border border-emerald-300/35 bg-emerald-400/20 px-2 py-1 text-[10px] font-semibold text-emerald-100">Real-Time</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div className="rounded-lg border border-white/25 bg-white/10 p-3">
                  <p className="text-[10px] uppercase text-slate-300">Admissions Leads</p>
                  <p className="mt-1 text-lg font-bold text-white">+38%</p>
                </div>
                <div className="rounded-lg border border-white/25 bg-white/10 p-3">
                  <p className="text-[10px] uppercase text-slate-300">Parent Engagement</p>
                  <p className="mt-1 text-lg font-bold text-white">87%</p>
                </div>
                <div className="rounded-lg border border-white/25 bg-white/10 p-3">
                  <p className="text-[10px] uppercase text-slate-300">Ops Efficiency</p>
                  <p className="mt-1 text-lg font-bold text-white">+41%</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </RevealSection>

      <RevealSection id="industries" className="section-shell relative z-10 pt-8 md:pt-10">
        <Title tag="Who We Are" head="Agency-Grade Delivery with Product Thinking" desc="A conversion-first funnel with strong proof, high-quality projects, clear expertise, and a focused contact journey." />
        <div className="grid gap-4 md:grid-cols-4">
          {stats.map((s, i) => (
            <motion.div key={s.label} custom={i} variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true }} className="glass p-6 text-center">
              <p className="text-3xl font-bold">
                <CountUp value={s.value} suffix={s.suffix} decimals={s.decimals ?? 0} />
              </p>
              <p className="mt-1 text-sm text-slate-700 dark:text-slate-300">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </RevealSection>

      <RevealSection id="services" className="section-shell relative z-10">
        <Title tag="Services" head="High-Impact Solutions for School Growth" desc="Structured delivery model across brand, engineering, operations, and automation." />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {serviceCards.map((s, i) => (
            <motion.button
              key={s.title}
              type="button"
              custom={i}
              variants={reveal}
              initial="hidden"
              whileInView="show"
              whileHover={{ y: -7 }}
              viewport={{ once: true }}
              onClick={() => openServiceGuide(i)}
              className={`glass p-6 text-left transition ${activeServiceGuide === i ? "border-emerald-300/50 bg-emerald-400/10" : ""}`}
            >
              <h3 className="text-xl font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">{s.text}</p>
              <p className="mt-4 text-xs font-semibold uppercase tracking-[0.1em] text-emerald-500">Click to understand this service</p>
            </motion.button>
          ))}
        </div>
      </RevealSection>

      <RevealSection id="service-guide" className="section-shell relative z-10">
        <Title tag="Service Guide" head="Click a Topic, Understand the Value, Decide Faster" desc="Each topic clearly explains what it is, why it matters, and the direct outcomes your school can expect." />
        <div className="grid gap-5 lg:grid-cols-[320px_1fr]">
          <div className="glass p-3">
            <div className="space-y-2">
              {serviceGuides.map((guide, i) => (
                <button
                  key={guide.title}
                  type="button"
                  onClick={() => setActiveServiceGuide(i)}
                  className={`w-full rounded-xl border px-4 py-3 text-left text-sm font-semibold transition ${
                    activeServiceGuide === i
                      ? "border-emerald-300/60 bg-emerald-400/15 text-emerald-100"
                      : "border-white/20 bg-white/5 hover:border-cyan-200/50"
                  }`}
                >
                  {guide.title}
                </button>
              ))}
            </div>
          </div>

          <motion.div
            key={activeGuide.title}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="glass relative overflow-hidden p-6 md:p-7"
          >
            <div className="pointer-events-none absolute -right-16 -top-14 h-44 w-44 rounded-full bg-cyan-300/20 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-14 -left-14 h-44 w-44 rounded-full bg-emerald-300/20 blur-3xl" />
            <div className="relative">
              <p className="inline-flex rounded-full border border-emerald-300/45 bg-emerald-400/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.1em] text-emerald-200">
                {activeGuide.title}
              </p>
              <div className="mt-5 grid gap-4 md:grid-cols-3">
                <div className="rounded-xl border border-white/15 bg-white/5 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.1em] text-cyan-200">What It Is</p>
                  <p className="mt-2 text-sm text-slate-100">{activeGuide.whatItIs}</p>
                </div>
                <div className="rounded-xl border border-white/15 bg-white/5 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.1em] text-emerald-200">Why It Matters</p>
                  <p className="mt-2 text-sm text-slate-100">{activeGuide.whyItMatters}</p>
                </div>
                <div className="rounded-xl border border-white/15 bg-white/5 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.1em] text-amber-200">Recommended Plan</p>
                  <p className="mt-2 text-sm font-semibold text-white">{activeGuide.plan}</p>
                  <a href="#pricing" className="mt-4 inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-3 py-2 text-xs font-semibold text-white">
                    View Plan <ArrowRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>

              <div className="mt-5 rounded-xl border border-white/15 bg-white/5 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-200">Expected Benefits</p>
                <div className="mt-3 grid gap-2 sm:grid-cols-2">
                  {activeGuide.benefits.map((benefit) => (
                    <p key={benefit} className="inline-flex items-start gap-2 text-sm text-slate-100">
                      <BadgeCheck className="mt-0.5 h-4 w-4 text-emerald-300" />
                      {benefit}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </RevealSection>

      <RevealSection id="projects" className="section-shell relative z-10">
        <Title tag="Projects" head="School Websites and Platforms Delivered" desc="Selected school projects that demonstrate brand, UX, and system integration quality." />
        <div className="grid gap-5 md:grid-cols-3">
          {projects.map((p, i) => (
            <motion.article key={p.name} custom={i} variants={reveal} initial="hidden" whileInView="show" whileHover={{ y: -6 }} className="glass overflow-hidden">
              <div className="relative h-48 w-full">
                <Image src={p.img} alt={p.name} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
              </div>
              <div className="p-5"><p className="text-lg font-semibold">{p.name}</p><p className="text-xs uppercase tracking-[0.12em] text-slate-600 dark:text-slate-300">{p.city}</p><p className="mt-3 text-sm">{p.outcome}</p></div>
            </motion.article>
          ))}
        </div>
      </RevealSection>

      <RevealSection id="pricing" className="section-shell relative z-10">
        <Title tag="Pricing" head="Clear Plans with Fast Decision Flow" desc="Animated cards and direct payment intent links to reduce friction." />
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-rose-300/35 bg-gradient-to-r from-rose-500/15 via-orange-500/10 to-emerald-500/10 px-4 py-3 backdrop-blur"
        >
          <p className="inline-flex items-center gap-2 text-sm font-semibold text-rose-100">
            <Flame className="h-4 w-4 text-rose-300" /> Hot Offer Live
          </p>
          <p className="rounded-lg border border-white/20 bg-white/10 px-3 py-1.5 text-sm font-bold tracking-[0.08em] text-white">
            Ends in {hours}:{minutes}:{seconds}
          </p>
        </motion.div>
        <div className="grid gap-5 lg:grid-cols-3">
          {plans.map((p, i) => (
            <motion.article
              key={p.name}
              custom={i}
              variants={reveal}
              initial="hidden"
              whileInView="show"
              animate={{ y: [0, -6, 0], rotate: [0, 0.35, 0, -0.35, 0] }}
              transition={{ duration: 8 + i * 1.6, repeat: Infinity, ease: "easeInOut" }}
              whileHover={{ y: -12, scale: 1.02, rotateX: 2 }}
              className={`glass group relative overflow-hidden p-7 ${p.featured ? "border-emerald-300/50 bg-emerald-300/10" : ""}`}
            >
              <OrbitCluster index={i} />
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_75%_8%,rgba(56,189,248,0.16),transparent_34%),radial-gradient(circle_at_12%_88%,rgba(16,185,129,0.12),transparent_35%)]" />
              <motion.div
                animate={{ opacity: [0.2, 0.55, 0.2] }}
                transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
                className="absolute -right-12 -top-12 h-24 w-24 rounded-full bg-rose-400/25 blur-2xl"
              />
              <p className="relative text-sm uppercase tracking-[0.12em] text-slate-600 dark:text-slate-300">{p.name}</p>
              <h3 className="relative mt-2 text-2xl font-bold">{p.sub}</h3>
              <div className="relative mt-4 flex items-center gap-2">
                <span className="rounded-full border border-rose-300/40 bg-rose-500/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.08em] text-rose-200">Save {fmt(p.discount)}</span>
                <span className="text-sm font-semibold text-slate-500 line-through dark:text-slate-400">{fmt(p.original)}</span>
              </div>
              <p className="relative mt-2 text-4xl font-extrabold">{fmt(p.amount)}</p>
              <div className="relative my-5 h-px bg-slate-300/40 dark:bg-white/20" />
              <ul className="relative space-y-2">{p.points.map((x) => <li key={x} className="inline-flex items-start gap-2 text-sm"><BadgeCheck className="mt-0.5 h-4 w-4 text-emerald-500" />{x}</li>)}</ul>
              <div className="relative mt-6 grid gap-2">
                <button
                  onClick={() => payWithRazorpay(p)}
                  disabled={payingPlan === p.name}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 px-4 py-3 text-sm font-semibold text-white shadow-[0_18px_34px_-18px_rgba(16,185,129,0.95)] transition duration-300 hover:shadow-[0_22px_38px_-14px_rgba(45,212,191,0.95)] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  <Wallet className="h-4 w-4" />
                  {payingPlan === p.name ? "Starting Razorpay..." : "Pay with Razorpay"}
                </button>
                <button
                  onClick={() => payViaUpiApp(p.name, p.amount)}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-emerald-300/40 bg-emerald-400/5 px-4 py-3 text-sm font-semibold transition duration-300 hover:border-emerald-200/70 hover:bg-emerald-400/10 dark:border-emerald-200/30"
                >
                  Pay via UPI App
                </button>
                <a href="#contact" className="rounded-xl border border-white/30 bg-white/5 px-4 py-3 text-center text-sm font-semibold transition duration-300 hover:border-white/60 hover:bg-white/10 dark:border-white/20">Book Consultation</a>
              </div>
            </motion.article>
          ))}
        </div>
      </RevealSection>

      <RevealSection id="technology" className="section-shell relative z-10">
        <Title tag="Expertise" head="Technology + Domain + Execution" desc="Focused execution approach similar high-performing service companies." />
        <div className="glass mb-4 overflow-hidden p-2">
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 18, ease: "linear", repeat: Infinity }}
            className="flex w-max gap-3 px-2"
          >
            {[...technologyTicker, ...technologyTicker].map((item, i) => (
              <motion.div
                key={`${item.label}-${i}`}
                whileHover={{ y: -2, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 320, damping: 22 }}
                className={`group flex items-center gap-3 rounded-xl border px-3 py-2 backdrop-blur ${item.chipTone}`}
              >
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-white/20 bg-white/10">
                  <item.icon className={`h-4 w-4 ${item.iconTone}`} />
                </span>
                <span className="whitespace-nowrap text-xs font-semibold uppercase tracking-[0.12em] text-slate-800 dark:text-slate-100">
                  {item.label}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {expertise.map((item, i) => (
            <motion.button
              key={item.label}
              type="button"
              custom={i}
              variants={reveal}
              initial="hidden"
              whileInView="show"
              whileHover={{ y: -4, scale: 1.01 }}
              onClick={() => setActiveExpertise(i)}
              className={`group relative overflow-hidden rounded-2xl border p-5 text-left transition ${
                activeExpertise === i
                  ? "border-emerald-300/55 bg-gradient-to-r from-emerald-400/20 via-cyan-400/10 to-transparent shadow-[0_20px_45px_-28px_rgba(16,185,129,0.9)]"
                  : "border-white/20 bg-white/5 hover:border-cyan-200/40 hover:bg-white/10"
              }`}
            >
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_88%_10%,rgba(56,189,248,0.16),transparent_38%)] opacity-0 transition group-hover:opacity-100" />
              <div className="relative flex items-center gap-3">
                <span className={`inline-flex h-10 w-10 items-center justify-center rounded-xl border ${activeExpertise === i ? "border-emerald-200/45 bg-emerald-400/15" : "border-white/20 bg-white/5"}`}>
                  <item.icon className={`h-5 w-5 ${activeExpertise === i ? "text-emerald-300" : "text-emerald-500"}`} />
                </span>
                <div>
                  <p className="text-base font-semibold">{item.label}</p>
                  <p className="mt-1 text-xs text-slate-300">Tap to view delivery blueprint</p>
                </div>
              </div>
            </motion.button>
          ))}
        </div>

        <motion.div
          key={activeExpertiseItem.label}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="glass relative mt-6 overflow-hidden border border-cyan-200/25 bg-gradient-to-br from-slate-900/90 via-[#0f1d43]/92 to-[#0b1736]/95 p-6 md:p-7"
        >
          <div className="pointer-events-none absolute -right-20 -top-16 h-52 w-52 rounded-full bg-cyan-300/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-16 h-56 w-56 rounded-full bg-emerald-300/15 blur-3xl" />

          <div className="relative grid gap-6 md:grid-cols-[1.3fr_1fr]">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-200/35 bg-cyan-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.1em] text-cyan-100">
                <activeExpertiseItem.icon className="h-3.5 w-3.5" />
                {activeExpertiseItem.label}
              </div>
              <p className="mt-4 text-base leading-relaxed text-slate-100">{activeExpertiseItem.intro}</p>
              <div className="mt-5 space-y-3">
                <div className="rounded-xl border border-white/15 bg-white/5 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.1em] text-emerald-200">How We Manage</p>
                  <p className="mt-2 text-sm text-slate-100">{activeExpertiseItem.manage}</p>
                </div>
                <div className="rounded-xl border border-white/15 bg-white/5 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.1em] text-cyan-200">How You Track Service</p>
                  <p className="mt-2 text-sm text-slate-100">{activeExpertiseItem.tracking}</p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-white/15 bg-white/5 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-200">What Is Included</p>
              <ul className="mt-3 space-y-2">
                {activeExpertiseItem.includes.map((entry) => (
                  <li key={entry} className="inline-flex items-start gap-2 text-sm text-slate-100">
                    <BadgeCheck className="mt-0.5 h-4 w-4 text-emerald-300" />
                    {entry}
                  </li>
                ))}
              </ul>
              <a href="#contact" className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 px-4 py-3 text-sm font-semibold text-white shadow-[0_18px_35px_-20px_rgba(16,185,129,0.9)] transition hover:brightness-110">
                Start With This Service <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </motion.div>
      </RevealSection>

      <RevealSection id="faq" className="section-shell relative z-10">
        <Title tag="FAQ" head="Strategic Answers for School Decision-Makers" desc="An interactive FAQ experience designed to make decisions faster and more confident." />
        <motion.div ref={faqRef} style={{ y: faqLift }} className="relative grid gap-5 lg:grid-cols-[280px_1fr]">
          <motion.div
            style={{ x: faqSweepX }}
            className="pointer-events-none absolute inset-y-2 z-0 w-20 -skew-x-12 bg-gradient-to-r from-transparent via-cyan-300/10 to-transparent blur-sm"
          />
          <motion.div style={{ x: faqLeftX }} className="glass relative z-10 p-4">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-300">Question Navigator</p>
            <div className="space-y-2">
              {faqs.map((f, i) => (
                <motion.button
                  key={f.q}
                  onClick={() => setFaqOpen(i)}
                  animate={{ y: [0, -2, 0] }}
                  transition={{ duration: 3 + i * 0.6, repeat: Infinity, ease: "easeInOut" }}
                  className={`w-full rounded-xl border px-3 py-3 text-left text-sm font-semibold transition ${
                    faqOpen === i
                      ? "border-emerald-300/60 bg-emerald-400/15 text-emerald-100"
                      : "border-white/20 bg-white/5 hover:border-cyan-200/45"
                  }`}
                >
                  <span className="inline-flex rounded-md border border-white/20 bg-white/10 px-2 py-0.5 text-[10px] uppercase tracking-[0.1em] text-slate-200">
                    {f.category}
                  </span>
                  <p className="mt-2">{f.q}</p>
                </motion.button>
              ))}
            </div>
          </motion.div>

          <motion.div style={{ x: faqRightX }} className="relative z-10 space-y-3">
            <motion.div
              key={faqs[faqOpen].q}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="glass relative overflow-hidden border border-cyan-300/25 bg-gradient-to-br from-slate-900/85 via-[#102446]/85 to-[#0b1d37]/90 p-6"
            >
              <motion.div
                animate={{ x: [0, 18, 0], y: [0, -10, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                className="pointer-events-none absolute -right-14 -top-14 h-44 w-44 rounded-full bg-cyan-300/25 blur-3xl"
              />
              <motion.div
                animate={{ x: [0, -14, 0], y: [0, 12, 0] }}
                transition={{ duration: 8.5, repeat: Infinity, ease: "easeInOut" }}
                className="pointer-events-none absolute -bottom-16 -left-16 h-44 w-44 rounded-full bg-emerald-300/20 blur-3xl"
              />
              <motion.div
                animate={{ x: ["-120%", "120%"] }}
                transition={{ duration: 3.4, repeat: Infinity, ease: "linear" }}
                className="pointer-events-none absolute inset-y-0 w-24 -skew-x-12 bg-gradient-to-r from-transparent via-cyan-200/10 to-transparent"
              />
              <div className="relative">
                <p className="inline-flex rounded-full border border-cyan-200/45 bg-cyan-400/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.1em] text-cyan-100">
                  {faqs[faqOpen].category}
                </p>
                <h3 className="mt-4 text-2xl font-bold text-white">{faqs[faqOpen].q}</h3>
                <p className="mt-3 text-base leading-relaxed text-slate-100">{faqs[faqOpen].a}</p>
                <div className="mt-4 rounded-xl border border-white/15 bg-white/5 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.1em] text-emerald-200">Implementation Note</p>
                  <p className="mt-2 text-sm text-slate-100">{faqs[faqOpen].detail}</p>
                </div>
              </div>
            </motion.div>

            <div className="grid gap-3 md:grid-cols-2">
              {faqs.map((f, i) => (
                <motion.button
                  key={`${f.q}-card`}
                  type="button"
                  whileHover={{ y: -3, scale: 1.01 }}
                  animate={{ y: [0, -1.5, 0] }}
                  transition={{ duration: 4 + i * 0.5, repeat: Infinity, ease: "easeInOut" }}
                  onClick={() => setFaqOpen(i)}
                  className={`glass group relative overflow-hidden flex items-start justify-between gap-3 p-4 text-left transition ${
                    faqOpen === i ? "border-emerald-300/45 bg-emerald-400/10" : ""
                  }`}
                >
                  <motion.span
                    animate={{ x: ["-130%", "130%"] }}
                    transition={{ duration: 2.8 + i * 0.2, repeat: Infinity, ease: "linear" }}
                    className="pointer-events-none absolute inset-y-0 w-16 -skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                  />
                  <div>
                    <p className="text-sm font-semibold">{f.q}</p>
                    <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">{f.category}</p>
                  </div>
                  <ArrowRight className={`mt-1 h-4 w-4 shrink-0 transition ${faqOpen === i ? "rotate-90 text-emerald-300" : "text-slate-400"}`} />
                </motion.button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </RevealSection>

      <RevealSection id="contact" className="section-shell relative z-10">
        <Title tag="Contact" head="Book a Consultation for Your School" desc="Share your goals and current challenges. We will propose the right service mix, timeline, and implementation plan." />
        <div className="grid gap-6 md:grid-cols-2 md:items-start">
          <motion.form
            onSubmit={submit}
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass relative space-y-4 overflow-hidden p-6"
          >
            <div className="pointer-events-none absolute -right-14 -top-14 h-36 w-36 rounded-full bg-emerald-400/25 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-14 -left-14 h-40 w-40 rounded-full bg-blue-400/20 blur-3xl" />
            <p className="relative text-xs font-medium text-slate-600 dark:text-slate-300">Complete this form to receive a customized proposal and implementation estimate.</p>
            <input required value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} placeholder="Full Name" className="w-full rounded-xl border border-slate-300/50 bg-white/80 px-4 py-3 text-sm shadow-inner transition focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-300/40 dark:border-white/20 dark:bg-white/10 dark:focus:border-emerald-300" />
            <input required value={form.school} onChange={(e) => setForm((p) => ({ ...p, school: e.target.value }))} placeholder="Official School Name" className="w-full rounded-xl border border-slate-300/50 bg-white/80 px-4 py-3 text-sm shadow-inner transition focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-300/40 dark:border-white/20 dark:bg-white/10 dark:focus:border-emerald-300" />
            <input required value={form.phone} onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))} placeholder="WhatsApp / Contact Number" className="w-full rounded-xl border border-slate-300/50 bg-white/80 px-4 py-3 text-sm shadow-inner transition focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-300/40 dark:border-white/20 dark:bg-white/10 dark:focus:border-emerald-300" />
            <select value={form.service} onChange={(e) => setForm((p) => ({ ...p, service: e.target.value }))} className="w-full rounded-xl border border-slate-300/50 bg-white/80 px-4 py-3 text-sm shadow-inner transition focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-300/40 dark:border-white/20 dark:bg-slate-900">{serviceCards.map((s) => <option key={s.title}>{s.title}</option>)}</select>
            <select value={form.plan} onChange={(e) => setForm((p) => ({ ...p, plan: e.target.value }))} className="w-full rounded-xl border border-slate-300/50 bg-white/80 px-4 py-3 text-sm shadow-inner transition focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-300/40 dark:border-white/20 dark:bg-slate-900">{plans.map((p) => <option key={p.name}>{p.name}</option>)}</select>
            <motion.button disabled={isSubmitting} whileHover={{ y: -2, scale: 1.01 }} whileTap={{ scale: 0.98 }} className="w-full rounded-xl bg-gradient-to-r from-emerald-500 via-emerald-500 to-cyan-500 px-5 py-3 text-sm font-semibold text-white shadow-[0_14px_30px_-16px_rgba(16,185,129,0.95)] disabled:cursor-not-allowed disabled:opacity-60">
              {isSubmitting ? "Submitting..." : "Request Proposal"}
            </motion.button>
            {msg ? <p className={`text-sm ${msgType === "success" ? "text-emerald-500" : "text-rose-500"}`}>{msg}</p> : null}
          </motion.form>
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass relative self-start overflow-hidden p-6"
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,rgba(16,185,129,0.25),transparent_40%),radial-gradient(circle_at_88%_8%,rgba(56,189,248,0.22),transparent_45%),linear-gradient(150deg,rgba(15,23,42,0.92),rgba(8,47,73,0.9))]" />
            <motion.div
              animate={{ y: [0, -8, 0], rotateX: [0, 2, 0], rotateY: [0, -2, 0] }}
              transition={{ duration: 6.2, repeat: Infinity, ease: "easeInOut" }}
              className="relative rounded-2xl border border-white/25 bg-white/10 p-6 shadow-[0_30px_60px_-35px_rgba(16,185,129,0.85)] backdrop-blur-xl"
            >
              <div className="mb-4 flex items-center justify-between">
                <p className="text-lg font-semibold text-white">Consultation Snapshot</p>
                <span className="inline-flex items-center gap-1 rounded-full border border-emerald-300/35 bg-emerald-400/20 px-3 py-1 text-xs font-semibold text-emerald-100">
                  <Zap className="h-3.5 w-3.5" /> Priority Callback
                </span>
              </div>
              <p className="text-sm text-slate-200">Our team reviews your requirements, maps the right modules, and shares a practical rollout plan with transparent pricing.</p>
              <div className="mt-5 grid grid-cols-2 gap-2">
                {contactHighlights.map((item, i) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.07, duration: 0.35 }}
                    viewport={{ once: true }}
                    className="rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-xs font-semibold uppercase tracking-[0.08em] text-slate-100"
                  >
                    {item}
                  </motion.div>
                ))}
              </div>
            </motion.div>
            <div className="relative mt-5 space-y-3">
              <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.08em] text-slate-200">
                <span>Response SLA</span>
                <span>Within 48 Hours</span>
              </div>
              <div className="h-2 rounded-full bg-white/15">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="h-2 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </RevealSection>

      <motion.footer initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="relative z-10 border-t border-slate-300/30 bg-slate-950/95 text-slate-200">
        <div className="section-shell grid gap-8 py-12 md:grid-cols-4">
          <div><p className="text-lg font-bold text-white">Nova Tech Solutions</p><p className="mt-2 text-sm text-slate-300">Complete Digital Management for Modern Schools.</p></div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">Services</p>
            <ul className="mt-3 space-y-2 text-sm">
              <li><button type="button" onClick={() => openServiceGuide(0)} className="transition hover:text-emerald-300">School Websites</button></li>
              <li><button type="button" onClick={() => openServiceGuide(1)} className="transition hover:text-emerald-300">School ERP</button></li>
              <li><button type="button" onClick={() => openServiceGuide(2)} className="transition hover:text-emerald-300">Result Management</button></li>
              <li><button type="button" onClick={() => openServiceGuide(4)} className="transition hover:text-emerald-300">Cloud Security</button></li>
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">Company</p>
            <ul className="mt-3 space-y-2 text-sm">
              <li><a href="#projects" className="transition hover:text-emerald-300">Portfolio</a></li>
              <li><a href="#pricing" className="transition hover:text-emerald-300">Pricing</a></li>
              <li><a href="#faq" className="transition hover:text-emerald-300">FAQ</a></li>
              <li><a href="#contact" className="transition hover:text-emerald-300">Contact</a></li>
            </ul>
          </div>
          <div><p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">Contact</p><p className="mt-3 text-sm">contact@novatechsolutions.in</p><p className="text-sm">+91 8896115419</p><a href="https://wa.me/918896115419" target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center gap-1 rounded-lg bg-emerald-500 px-3 py-2 text-sm font-semibold text-white">WhatsApp <ArrowRight className="h-4 w-4" /></a></div>
        </div>
      </motion.footer>
    </main>
  );
}
