"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, BadgeCheck, Globe2, Layers3, BookMarked, Sparkles, Wallet, Rocket } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

type Lead = { id: string; name: string; school: string; phone: string; service: string; plan: string; createdAt: string };
const STORAGE_KEY = "nova-leads";
const ADMIN_PASS = "novaadmin123";
const UPI_ID = "novatechsolutions@okicici";

const services = [
  { title: "School Website Development", icon: Globe2, desc: "Admissions-focused, mobile-first websites." },
  { title: "Complete School ERP System", icon: Layers3, desc: "Fees, attendance, communication, and management." },
  { title: "Result Management System", icon: BookMarked, desc: "Fast, secure, and parent-friendly result publishing." },
  { title: "Social Media Management", icon: Sparkles, desc: "Branding, campaigns, and content execution." }
];

const plans = [
  { name: "Basic Plan", subtitle: "Digital Presence", amount: 11000, highlights: ["Premium Website", "SEO Setup", "Hosting Setup", "Email Support"] },
  { name: "Professional Plan", subtitle: "Smart School System", amount: 20000, featured: true, highlights: ["Website + ERP Core", "Result Management", "Parent Communication", "Priority Support"] },
  { name: "Premium Plan", subtitle: "Complete Digital Management", amount: 40000, highlights: ["Full Digital Stack", "Social Media", "Cloud Security", "Dedicated Manager"] }
];

const portfolio = [
  { school: "Greenfield International School", city: "Noida", image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80", outcome: "Admissions website + automation" },
  { school: "Sunrise Public School", city: "Lucknow", image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=80", outcome: "ERP + result management" },
  { school: "Maple Leaf Academy", city: "Jaipur", image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1200&q=80", outcome: "Digital branding + campaign site" }
];

const reveal = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.6, ease: "easeOut" } })
};

const inr = (n: number) => `INR ${n.toLocaleString("en-IN")}`;
const upi = (plan: string, amount: number) =>
  `upi://pay?pa=${UPI_ID}&pn=Nova%20Tech%20Solutions&am=${amount}&cu=INR&tn=${encodeURIComponent(plan)}`;

function SectionTitle({ tag, title, text }: { tag: string; title: string; text: string }) {
  return (
    <div className="mb-10 max-w-3xl">
      <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-slate-300/50 px-4 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-700 dark:border-white/20 dark:text-slate-200">
        <Rocket className="h-3.5 w-3.5" />
        {tag}
      </p>
      <h2 className="text-3xl font-bold leading-tight md:text-4xl">{title}</h2>
      <p className="mt-4 text-base text-slate-700 dark:text-slate-300">{text}</p>
    </div>
  );
}

export default function HomePage() {
  const [form, setForm] = useState({ name: "", school: "", phone: "", service: services[0].title, plan: plans[1].name });
  const [leads, setLeads] = useState<Lead[]>([]);
  const [msg, setMsg] = useState("");
  const [adminInput, setAdminInput] = useState("");
  const [adminOpen, setAdminOpen] = useState(false);

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) setLeads(JSON.parse(raw));
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(leads));
  }, [leads]);

  const serviceStats = useMemo(() => {
    const map = new Map<string, number>();
    leads.forEach((l) => map.set(l.service, (map.get(l.service) ?? 0) + 1));
    return [...map.entries()].sort((a, b) => b[1] - a[1]);
  }, [leads]);

  const submitLead = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLeads((p) => [{ ...form, id: String(Date.now()), createdAt: new Date().toISOString() }, ...p]);
    setForm({ name: "", school: "", phone: "", service: services[0].title, plan: plans[1].name });
    setMsg("Requirement saved. Team will contact you soon.");
  };

  return (
    <main className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-hero-glow" />
      <div className="pointer-events-none absolute -left-28 top-44 h-80 w-80 rounded-full bg-emerald-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 top-10 h-80 w-80 rounded-full bg-blue-500/20 blur-3xl" />

      <header className="section-shell relative z-10 py-8">
        <nav className="glass flex flex-wrap items-center justify-between gap-4 px-5 py-3">
          <div>
            <p className="text-lg font-bold">Nova Tech Solutions</p>
            <p className="text-xs text-slate-700 dark:text-slate-300">Complete Digital Management for Modern Schools</p>
          </div>
          <div className="flex items-center gap-3">
            <a href="#contact" className="rounded-full bg-emerald-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-400">Get Free Demo</a>
            <a href="#admin" className="rounded-full border border-slate-300/60 px-4 py-2 text-sm font-semibold dark:border-white/20">Admin Access</a>
            <ThemeToggle />
          </div>
        </nav>
      </header>

      <section className="section-shell relative z-10 pt-6 md:pt-12">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }} className="glass grid items-center gap-8 overflow-hidden px-7 py-10 md:grid-cols-2 md:px-10">
          <div>
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/15 px-4 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-white/90">Premium EdTech Partner</p>
            <h1 className="text-4xl font-extrabold leading-tight text-white md:text-6xl">Complete Digital Management for Modern Schools</h1>
            <p className="mt-5 max-w-xl text-base text-slate-200 md:text-lg">Private, CBSE, ICSE, and International schools ke liye complete website, ERP, results, social media, security, aur support.</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a href="#contact" className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-400">Get Free Demo<ArrowRight className="h-4 w-4" /></a>
              <a href="#pricing" className="rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10">Book Consultation</a>
            </div>
          </div>
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8, delay: 0.2 }} className="relative">
            <img src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1400&q=80" alt="Modern school environment" className="h-[360px] w-full rounded-2xl object-cover" />
          </motion.div>
        </motion.div>
      </section>

      <section className="section-shell relative z-10">
        <SectionTitle tag="Core Services" title="Everything Schools Need Under One Team" text="Website, ERP, result system, social media, and support." />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {services.map((s, i) => (
            <motion.article key={s.title} custom={i} variants={reveal} initial="hidden" whileInView="show" whileHover={{ y: -8 }} viewport={{ once: true, amount: 0.25 }} className="glass p-6">
              <s.icon className="h-9 w-9 text-emerald-400" />
              <h3 className="mt-4 text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">{s.desc}</p>
            </motion.article>
          ))}
        </div>
      </section>

      <section id="pricing" className="section-shell relative z-10">
        <SectionTitle tag="Pricing Plans" title="Animated and Transparent Packages" text="Updated pricing as requested." />
        <div className="grid gap-5 lg:grid-cols-3">
          {plans.map((plan, i) => (
            <motion.article key={plan.name} custom={i} variants={reveal} initial="hidden" whileInView="show" whileHover={{ y: -10, scale: 1.01 }} viewport={{ once: true, amount: 0.3 }} className={`glass p-7 ${plan.featured ? "border-emerald-300/50 bg-emerald-400/10" : ""}`}>
              <p className="text-sm uppercase tracking-[0.14em] text-slate-700 dark:text-slate-300">{plan.name}</p>
              <h3 className="mt-2 text-2xl font-bold">{plan.subtitle}</h3>
              <p className="mt-4 text-3xl font-extrabold">{inr(plan.amount)}</p>
              <div className="my-5 h-px bg-slate-300/40 dark:bg-white/20" />
              <ul className="space-y-3">
                {plan.highlights.map((h) => (
                  <li key={h} className="inline-flex items-start gap-2 text-sm"><BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />{h}</li>
                ))}
              </ul>
              <div className="mt-6 grid gap-2">
                <a href={upi(plan.name, plan.amount)} className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-400"><Wallet className="h-4 w-4" />Pay Now</a>
                <a href="#contact" className="rounded-xl border border-slate-300/50 px-4 py-3 text-center text-sm font-semibold dark:border-white/20">Book Consultation</a>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="section-shell relative z-10">
        <SectionTitle tag="School Websites Built by Us" title="Portfolio" text="School website projects and outcomes." />
        <div className="grid gap-5 md:grid-cols-3">
          {portfolio.map((item, i) => (
            <motion.article key={item.school} custom={i} variants={reveal} initial="hidden" whileInView="show" whileHover={{ y: -6 }} viewport={{ once: true, amount: 0.25 }} className="glass overflow-hidden">
              <img src={item.image} alt={`${item.school} preview`} className="h-48 w-full object-cover" />
              <div className="p-5">
                <h3 className="text-lg font-semibold">{item.school}</h3>
                <p className="mt-1 text-xs uppercase tracking-[0.12em] text-slate-600 dark:text-slate-300">{item.city}</p>
                <p className="mt-3 text-sm text-slate-700 dark:text-slate-300">{item.outcome}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <section id="contact" className="section-shell relative z-10">
        <SectionTitle tag="Contact" title="Lead Capture Form" text="Visitor jo service choose karega, data admin dashboard me show hoga." />
        <div className="grid gap-6 md:grid-cols-2">
          <form onSubmit={submitLead} className="glass space-y-4 p-6">
            <input required value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} placeholder="Your Name" className="w-full rounded-xl border border-slate-300/50 bg-white/70 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-emerald-400 dark:border-white/20 dark:bg-white/10" />
            <input required value={form.school} onChange={(e) => setForm((p) => ({ ...p, school: e.target.value }))} placeholder="School Name" className="w-full rounded-xl border border-slate-300/50 bg-white/70 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-emerald-400 dark:border-white/20 dark:bg-white/10" />
            <input required value={form.phone} onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))} placeholder="Phone Number" className="w-full rounded-xl border border-slate-300/50 bg-white/70 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-emerald-400 dark:border-white/20 dark:bg-white/10" />
            <select value={form.service} onChange={(e) => setForm((p) => ({ ...p, service: e.target.value }))} className="w-full rounded-xl border border-slate-300/50 bg-white/70 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-emerald-400 dark:border-white/20 dark:bg-slate-900">{services.map((s) => <option key={s.title}>{s.title}</option>)}</select>
            <select value={form.plan} onChange={(e) => setForm((p) => ({ ...p, plan: e.target.value }))} className="w-full rounded-xl border border-slate-300/50 bg-white/70 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-emerald-400 dark:border-white/20 dark:bg-slate-900">{plans.map((p) => <option key={p.name}>{p.name}</option>)}</select>
            <button type="submit" className="w-full rounded-xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-400">Submit Requirement</button>
            {msg ? <p className="text-sm text-emerald-500">{msg}</p> : null}
          </form>
          <div className="glass p-6">
            <p className="text-lg font-semibold">Quick Actions</p>
            <div className="mt-5 grid gap-3">
              <a href="mailto:contact@novatechsolutions.in" className="rounded-xl bg-slate-900 px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-slate-700 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200">Send Email</a>
              <a href="https://wa.me/919000012345?text=Hi%20Nova%20Tech%20Solutions%2C%20I%20want%20a%20free%20demo%20for%20my%20school." target="_blank" rel="noreferrer" className="rounded-xl bg-emerald-500 px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-emerald-400">Chat on WhatsApp</a>
              <a href={upi("Professional Plan", 20000)} className="rounded-xl border border-emerald-400/50 px-5 py-3 text-center text-sm font-semibold text-emerald-600 transition hover:bg-emerald-50 dark:text-emerald-300 dark:hover:bg-emerald-500/10">Pay Professional Plan (INR 20,000)</a>
            </div>
          </div>
        </div>
      </section>

      <section id="admin" className="section-shell relative z-10 pb-10">
        <SectionTitle tag="Admin Dashboard" title="Service Interest Analytics" text="Website se jo leads aa rahi hain unka service-wise data." />
        {!adminOpen ? (
          <div className="glass max-w-xl p-6">
            <p className="text-sm text-slate-700 dark:text-slate-300">Enter admin password to view dashboard.</p>
            <div className="mt-4 flex gap-3">
              <input type="password" value={adminInput} onChange={(e) => setAdminInput(e.target.value)} placeholder="Admin password" className="w-full rounded-xl border border-slate-300/50 bg-white/70 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-emerald-400 dark:border-white/20 dark:bg-white/10" />
              <button onClick={() => setAdminOpen(adminInput === ADMIN_PASS)} className="rounded-xl bg-emerald-500 px-4 py-3 text-sm font-semibold text-white">Unlock</button>
            </div>
            <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">Demo password: {ADMIN_PASS}</p>
          </div>
        ) : (
          <div className="space-y-5">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="glass p-5"><p className="text-xs uppercase tracking-[0.12em] text-slate-600 dark:text-slate-300">Total Leads</p><p className="mt-2 text-3xl font-bold">{leads.length}</p></div>
              <div className="glass p-5"><p className="text-xs uppercase tracking-[0.12em] text-slate-600 dark:text-slate-300">Top Service</p><p className="mt-2 text-lg font-bold">{serviceStats[0]?.[0] ?? "No data"}</p></div>
              <div className="glass p-5"><p className="text-xs uppercase tracking-[0.12em] text-slate-600 dark:text-slate-300">Top Plan</p><p className="mt-2 text-lg font-bold">{leads[0]?.plan ?? "No data"}</p></div>
            </div>
            <div className="grid gap-5 lg:grid-cols-2">
              <div className="glass p-6">
                <p className="mb-3 font-semibold">Most Requested Services</p>
                <div className="space-y-3">
                  {serviceStats.length === 0 ? <p className="text-sm text-slate-600 dark:text-slate-300">No data yet.</p> : serviceStats.map(([name, count]) => (
                    <div key={name}>
                      <div className="mb-1 flex items-center justify-between text-sm"><span>{name}</span><span>{count}</span></div>
                      <div className="h-2 rounded-full bg-slate-200 dark:bg-white/10"><div style={{ width: `${Math.min(count * 25, 100)}%` }} className="h-2 rounded-full bg-emerald-500" /></div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="glass overflow-x-auto p-6">
                <p className="mb-3 font-semibold">Recent Leads</p>
                <table className="min-w-full text-left text-sm">
                  <thead><tr className="border-b border-slate-300/50 dark:border-white/20"><th className="py-2 pr-3">Name</th><th className="py-2 pr-3">School</th><th className="py-2 pr-3">Service</th><th className="py-2">Plan</th></tr></thead>
                  <tbody>
                    {leads.slice(0, 8).map((l) => (
                      <tr key={l.id} className="border-b border-slate-300/30 dark:border-white/10"><td className="py-2 pr-3">{l.name}</td><td className="py-2 pr-3">{l.school}</td><td className="py-2 pr-3">{l.service}</td><td className="py-2">{l.plan}</td></tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </section>

      <motion.footer initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.6 }} className="relative z-10 border-t border-slate-300/40 bg-slate-950/95 text-slate-200">
        <div className="section-shell grid gap-8 py-12 md:grid-cols-3">
          <div><p className="text-lg font-bold text-white">Nova Tech Solutions</p><p className="mt-2 text-sm text-slate-300">Complete Digital Management for Modern Schools.</p></div>
          <div><p className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-400">Services</p><ul className="mt-3 space-y-2 text-sm"><li>School Website Development</li><li>School ERP System</li><li>Result Management</li><li>Cloud Hosting & Security</li></ul></div>
          <div><p className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-400">Contact</p><p className="mt-3 text-sm">contact@novatechsolutions.in</p><p className="text-sm">+91 90000 12345</p><a href="https://wa.me/919000012345?text=Hi%20Nova%20Tech%20Solutions%2C%20I%20need%20a%20school%20website%20demo." target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-3 py-2 text-sm font-semibold text-white transition hover:bg-emerald-400">WhatsApp<ArrowRight className="h-4 w-4" /></a></div>
        </div>
      </motion.footer>
    </main>
  );
}
