"use client";

import { FormEvent, ReactNode, useEffect, useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Atom, BadgeCheck, BarChart3, BookOpenCheck, BriefcaseBusiness, ChartSpline, ClipboardCheck, Cloud, FileCode2, Flame, Layers, Rocket, School, Sparkles, Wallet, Wind, Zap } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

type Lead = { id: string; name: string; school: string; phone: string; service: string; plan: string; createdAt: string };
const STORAGE_KEY = "nova-leads-v2";
const UPI_ID = "novatechsolutions@okicici";
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
const expertise = [
  { label: "UI/UX Engineering", icon: BookOpenCheck },
  { label: "Product-Led Delivery", icon: Layers },
  { label: "Growth Analytics", icon: ChartSpline },
  { label: "Dedicated Project Team", icon: BriefcaseBusiness },
  { label: "Leadership Dashboards", icon: BarChart3 },
  { label: "Continuous Optimization", icon: Rocket }
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
  { q: "How fast can you launch a school website?", a: "In most cases, 2 to 4 weeks with content and approvals ready." },
  { q: "Can you migrate from existing ERP?", a: "Yes, we provide phased data migration and onboarding support." },
  { q: "Do you support CBSE/ICSE result formats?", a: "Yes, we configure modules around school-specific workflows." }
];
const contactHighlights = ["Fast Onboarding", "Admission Growth Focus", "24x7 Tech Support", "Conversion-Led UX"];
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

function Title({ tag, head, desc }: { tag: string; head: string; desc: string }) {
  return (
    <div className="mb-10 max-w-3xl">
      <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-slate-300/50 px-4 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-slate-700 dark:border-white/20 dark:text-slate-200">
        <Rocket className="h-3.5 w-3.5" />{tag}
      </p>
      <h2 className="text-3xl font-bold leading-tight md:text-4xl">{head}</h2>
      <p className="mt-4 text-base text-slate-700 dark:text-slate-300">{desc}</p>
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

export default function HomePage() {
  const [faqOpen, setFaqOpen] = useState(0);
  const [msg, setMsg] = useState("");
  const [leads, setLeads] = useState<Lead[]>([]);
  const [form, setForm] = useState({ name: "", school: "", phone: "", service: serviceCards[0].title, plan: plans[1].name });
  const [dealEndsAt] = useState(() => Date.now() + 1000 * 60 * 60 * 48);
  const [timeLeft, setTimeLeft] = useState(1000 * 60 * 60 * 48);
  const { scrollYProgress } = useScroll();
  const orbLeftY = useTransform(scrollYProgress, [0, 1], [-30, 180]);
  const orbRightY = useTransform(scrollYProgress, [0, 1], [-10, 120]);

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) setLeads(JSON.parse(raw));
  }, []);
  useEffect(() => { localStorage.setItem(STORAGE_KEY, JSON.stringify(leads)); }, [leads]);
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(Math.max(0, dealEndsAt - Date.now()));
    }, 1000);
    return () => clearInterval(timer);
  }, [dealEndsAt]);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    setLeads((p) => [{ ...form, id: String(Date.now()), createdAt: new Date().toISOString() }, ...p]);
    setForm({ name: "", school: "", phone: "", service: serviceCards[0].title, plan: plans[1].name });
    setMsg("Lead saved. Team will connect shortly.");
  };
  const hours = String(Math.floor(timeLeft / (1000 * 60 * 60))).padStart(2, "0");
  const minutes = String(Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, "0");
  const seconds = String(Math.floor((timeLeft % (1000 * 60)) / 1000)).padStart(2, "0");

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
        <div className="glass grid items-center gap-7 overflow-hidden px-7 py-10 md:grid-cols-2 md:px-10">
          <div>
            <p className="mb-4 inline-flex rounded-full border border-slate-300/60 bg-white/50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-slate-800 dark:border-white/25 dark:bg-white/10 dark:text-white">Top Rated EdTech Partner</p>
            <h1 className="text-4xl font-extrabold leading-tight text-slate-900 dark:text-white md:text-6xl">A Complete Digital Infrastructure Partner for Private Schools</h1>
            <p className="mt-5 max-w-xl text-base text-slate-700 dark:text-slate-200 md:text-lg">Design, engineering, ERP, communication, and school growth systems delivered as one unified team.</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href="#contact" className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-white">Get Free Demo <ArrowRight className="h-4 w-4" /></a>
              <a href="#pricing" className="rounded-full border border-slate-400/60 px-6 py-3 text-sm font-semibold text-slate-800 dark:border-white/35 dark:text-white">Book Consultation</a>
            </div>
            <div className="mt-6 grid max-w-md grid-cols-3 gap-2 text-center text-xs text-slate-800 dark:text-white"><span className="rounded-lg border border-slate-300/60 py-2 dark:border-white/20">100+ Schools</span><span className="rounded-lg border border-slate-300/60 py-2 dark:border-white/20">99.9% Uptime</span><span className="rounded-lg border border-slate-300/60 py-2 dark:border-white/20">Fast Support</span></div>
          </div>
          <motion.img initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1600&q=80" alt="School digital transformation" className="h-[420px] w-full rounded-2xl object-cover" />
        </div>
      </RevealSection>

      <RevealSection id="industries" className="section-shell relative z-10 pt-8 md:pt-10">
        <Title tag="Who We Are" head="Agency-Grade Delivery with Product Thinking" desc="KrishaWeb style funnel follow karte hue: strong proof, rich projects, clear expertise, and conversion-oriented contact flow." />
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
            <motion.article key={s.title} custom={i} variants={reveal} initial="hidden" whileInView="show" whileHover={{ y: -7 }} viewport={{ once: true }} className="glass p-6">
              <h3 className="text-xl font-semibold">{s.title}</h3><p className="mt-2 text-sm text-slate-700 dark:text-slate-300">{s.text}</p>
            </motion.article>
          ))}
        </div>
      </RevealSection>

      <RevealSection id="projects" className="section-shell relative z-10">
        <Title tag="Projects" head="School Websites and Platforms Delivered" desc="Selected school projects that demonstrate brand, UX, and system integration quality." />
        <div className="grid gap-5 md:grid-cols-3">
          {projects.map((p, i) => (
            <motion.article key={p.name} custom={i} variants={reveal} initial="hidden" whileInView="show" whileHover={{ y: -6 }} className="glass overflow-hidden">
              <img src={p.img} alt={p.name} className="h-48 w-full object-cover" />
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
              whileHover={{ y: -10, scale: 1.015, rotateX: 1 }}
              className={`glass relative overflow-hidden p-7 ${p.featured ? "border-emerald-300/50 bg-emerald-300/10" : ""}`}
            >
              <motion.div
                animate={{ opacity: [0.2, 0.55, 0.2] }}
                transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
                className="absolute -right-12 -top-12 h-24 w-24 rounded-full bg-rose-400/25 blur-2xl"
              />
              <p className="text-sm uppercase tracking-[0.12em] text-slate-600 dark:text-slate-300">{p.name}</p>
              <h3 className="mt-2 text-2xl font-bold">{p.sub}</h3>
              <div className="mt-4 flex items-center gap-2">
                <span className="rounded-full border border-rose-300/40 bg-rose-500/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.08em] text-rose-200">Save {fmt(p.discount)}</span>
                <span className="text-sm font-semibold text-slate-500 line-through dark:text-slate-400">{fmt(p.original)}</span>
              </div>
              <p className="mt-2 text-4xl font-extrabold">{fmt(p.amount)}</p>
              <div className="my-5 h-px bg-slate-300/40 dark:bg-white/20" />
              <ul className="space-y-2">{p.points.map((x) => <li key={x} className="inline-flex items-start gap-2 text-sm"><BadgeCheck className="mt-0.5 h-4 w-4 text-emerald-500" />{x}</li>)}</ul>
              <div className="mt-6 grid gap-2"><a href={upiQr(p.name, p.amount)} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-4 py-3 text-sm font-semibold text-white"><Wallet className="h-4 w-4" />Scan & Pay (UPI QR)</a><a href="#contact" className="rounded-xl border border-slate-300/50 px-4 py-3 text-center text-sm font-semibold dark:border-white/20">Book Consultation</a></div>
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
            <motion.div key={item.label} custom={i} variants={reveal} initial="hidden" whileInView="show" className="glass flex items-center gap-3 p-5">
              <item.icon className="h-5 w-5 text-emerald-500" />
              <p className="text-sm font-medium">{item.label}</p>
            </motion.div>
          ))}
        </div>
      </RevealSection>

      <RevealSection className="section-shell relative z-10">
        <Title tag="FAQ" head="Common Questions from School Leaders" desc="Clear answers that reduce decision friction for principals and directors." />
        <div className="space-y-3">
          {faqs.map((f, i) => (
            <div key={f.q} className="glass p-5">
              <button onClick={() => setFaqOpen(i)} className="flex w-full items-center justify-between text-left text-sm font-semibold">{f.q}<ArrowRight className={`h-4 w-4 transition ${faqOpen === i ? "rotate-90" : ""}`} /></button>
              {faqOpen === i ? <p className="mt-3 text-sm text-slate-700 dark:text-slate-300">{f.a}</p> : null}
            </div>
          ))}
        </div>
      </RevealSection>

      <RevealSection id="contact" className="section-shell relative z-10">
        <Title tag="Contact" head="Premium Inquiry Experience" desc="High-converting contact flow with bold visual storytelling and fast response promise." />
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
            <input required value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} placeholder="Your Name" className="w-full rounded-xl border border-slate-300/50 bg-white/80 px-4 py-3 text-sm shadow-inner transition focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-300/40 dark:border-white/20 dark:bg-white/10 dark:focus:border-emerald-300" />
            <input required value={form.school} onChange={(e) => setForm((p) => ({ ...p, school: e.target.value }))} placeholder="School Name" className="w-full rounded-xl border border-slate-300/50 bg-white/80 px-4 py-3 text-sm shadow-inner transition focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-300/40 dark:border-white/20 dark:bg-white/10 dark:focus:border-emerald-300" />
            <input required value={form.phone} onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))} placeholder="Phone Number" className="w-full rounded-xl border border-slate-300/50 bg-white/80 px-4 py-3 text-sm shadow-inner transition focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-300/40 dark:border-white/20 dark:bg-white/10 dark:focus:border-emerald-300" />
            <select value={form.service} onChange={(e) => setForm((p) => ({ ...p, service: e.target.value }))} className="w-full rounded-xl border border-slate-300/50 bg-white/80 px-4 py-3 text-sm shadow-inner transition focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-300/40 dark:border-white/20 dark:bg-slate-900">{serviceCards.map((s) => <option key={s.title}>{s.title}</option>)}</select>
            <select value={form.plan} onChange={(e) => setForm((p) => ({ ...p, plan: e.target.value }))} className="w-full rounded-xl border border-slate-300/50 bg-white/80 px-4 py-3 text-sm shadow-inner transition focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-300/40 dark:border-white/20 dark:bg-slate-900">{plans.map((p) => <option key={p.name}>{p.name}</option>)}</select>
            <motion.button whileHover={{ y: -2, scale: 1.01 }} whileTap={{ scale: 0.98 }} className="w-full rounded-xl bg-gradient-to-r from-emerald-500 via-emerald-500 to-cyan-500 px-5 py-3 text-sm font-semibold text-white shadow-[0_14px_30px_-16px_rgba(16,185,129,0.95)]">
              Submit Requirement
            </motion.button>
            {msg ? <p className="text-sm text-emerald-500">{msg}</p> : null}
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
                <p className="text-lg font-semibold text-white">Launch-Ready Creative Stack</p>
                <span className="inline-flex items-center gap-1 rounded-full border border-emerald-300/35 bg-emerald-400/20 px-3 py-1 text-xs font-semibold text-emerald-100">
                  <Zap className="h-3.5 w-3.5" /> 48h Response
                </span>
              </div>
              <p className="text-sm text-slate-200">A premium client-facing contact experience with animated visual depth and conversion-focused UX details.</p>
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
                <span>Experience Depth</span>
                <span>94%</span>
              </div>
              <div className="h-2 rounded-full bg-white/15">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "94%" }}
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
          <div><p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">Services</p><ul className="mt-3 space-y-2 text-sm"><li>School Websites</li><li>School ERP</li><li>Result Management</li><li>Cloud Security</li></ul></div>
          <div><p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">Company</p><ul className="mt-3 space-y-2 text-sm"><li>Portfolio</li><li>Pricing</li><li>FAQ</li><li>Contact</li></ul></div>
          <div><p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">Contact</p><p className="mt-3 text-sm">contact@novatechsolutions.in</p><p className="text-sm">+91 90000 12345</p><a href="https://wa.me/919000012345" target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center gap-1 rounded-lg bg-emerald-500 px-3 py-2 text-sm font-semibold text-white">WhatsApp <ArrowRight className="h-4 w-4" /></a></div>
        </div>
      </motion.footer>
    </main>
  );
}
