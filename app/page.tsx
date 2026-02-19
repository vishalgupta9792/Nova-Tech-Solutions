"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  BookMarked,
  CloudCog,
  Globe2,
  Headphones,
  Layers3,
  MessageCircle,
  Rocket,
  ShieldCheck,
  Sparkles
} from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

const services = [
  { title: "School Website Development", icon: Globe2, desc: "Conversion-driven, mobile-first school websites with admissions funnels." },
  { title: "Complete School ERP System", icon: Layers3, desc: "Admissions, fee, attendance, communication, and operations in one platform." },
  { title: "Result Management System", icon: BookMarked, desc: "Fast, accurate result publishing with role-based access and analytics." },
  { title: "Social Media Management", icon: Sparkles, desc: "Institutional branding, campaign planning, and parent engagement content." },
  { title: "Cloud Hosting & Security", icon: CloudCog, desc: "Secure cloud hosting, backups, monitoring, and enterprise-grade protection." },
  { title: "Maintenance & Technical Support", icon: Headphones, desc: "Ongoing updates, issue resolution, and dedicated support for school teams." }
];

const erpFeatures = [
  "Automated attendance, report cards, and exam workflows",
  "Smart fee reminders, transport tracking, and parent notifications",
  "Principal dashboard with academic and operational insights",
  "Role-based access control with audit-friendly activity logs"
];

const whyUs = [
  "EdTech-first architecture built specifically for private schools",
  "Single vendor for website, ERP, results, hosting, and support",
  "Fast deployment with onboarding and staff training included",
  "Transparent execution with weekly review and performance reports"
];

const pricing = [
  {
    name: "Basic Plan",
    subtitle: "Digital Presence",
    price: "₹24,999",
    perks: ["Premium school website", "Basic SEO setup", "1 year hosting", "Email support"]
  },
  {
    name: "Professional Plan",
    subtitle: "Smart School System",
    price: "₹74,999",
    perks: ["Website + ERP core modules", "Result Management System", "Parent communication setup", "Priority support"],
    featured: true
  },
  {
    name: "Premium Plan",
    subtitle: "Complete Digital Management",
    price: "Custom",
    perks: ["Full digital stack", "Social media management", "Cloud security + compliance", "Dedicated success manager"]
  }
];

const portfolio = [
  "Admissions-focused website for K-12 group: +43% inquiry growth",
  "CBSE school ERP rollout across 3 campuses in 6 weeks",
  "International school result portal with zero downtime during release"
];

const testimonials = [
  {
    quote: "Nova Tech transformed our operations. Parents now get instant updates and online results without delays.",
    author: "Principal, Crestline Public School"
  },
  {
    quote: "From branding to ERP execution, the team worked like our internal digital department.",
    author: "Director, Maple International Academy"
  }
];

const reveal = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.6, ease: "easeOut" } })
};

function SectionTitle({ tag, title, text }: { tag: string; title: string; text: string }) {
  return (
    <div className="mb-10 max-w-3xl">
      <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-slate-300/40 px-4 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-700 dark:border-white/20 dark:text-slate-200">
        <Rocket className="h-3.5 w-3.5" />
        {tag}
      </p>
      <h2 className="text-3xl font-bold leading-tight md:text-4xl">{title}</h2>
      <p className="mt-4 text-base text-slate-700 dark:text-slate-300">{text}</p>
    </div>
  );
}

export default function HomePage() {
  return (
    <main className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-hero-glow" />

      <header className="section-shell relative z-10 py-8">
        <nav className="glass flex items-center justify-between px-5 py-3">
          <div>
            <p className="text-lg font-bold">Nova Tech Solutions</p>
            <p className="text-xs text-slate-700 dark:text-slate-300">Complete Digital Management for Modern Schools</p>
          </div>
          <div className="flex items-center gap-3">
            <a href="#contact" className="rounded-full bg-emerald-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-400">
              Book Consultation
            </a>
            <ThemeToggle />
          </div>
        </nav>
      </header>

      <section className="section-shell relative z-10 pt-8 md:pt-16">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }} className="glass grid items-center gap-8 px-7 py-12 md:grid-cols-2 md:px-10">
          <div>
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/15 px-4 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-white/90">
              <Sparkles className="h-3.5 w-3.5" />
              EdTech Growth Partner
            </p>
            <h1 className="text-4xl font-extrabold leading-tight text-white md:text-6xl">
              Complete Digital Infrastructure for High-Performing Schools
            </h1>
            <p className="mt-5 max-w-xl text-base text-slate-200 md:text-lg">
              Nova Tech Solutions helps CBSE, ICSE, and International schools modernize operations, branding, and communication with one integrated digital ecosystem.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a href="#contact" className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-400">
                Get Free Demo
                <ArrowRight className="h-4 w-4" />
              </a>
              <a href="#pricing" className="rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
                Book Consultation
              </a>
            </div>
          </div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="glass bg-white/8 p-6"
          >
            <p className="mb-6 text-lg font-semibold text-white">Growth Snapshot</p>
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                { label: "Deployment", value: "2-8 Weeks" },
                { label: "Support SLA", value: "< 4 Hours" },
                { label: "Client Schools", value: "100+" }
              ].map((item) => (
                <div key={item.label} className="rounded-xl border border-white/20 bg-white/10 p-4">
                  <p className="text-2xl font-bold text-white">{item.value}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.12em] text-slate-200">{item.label}</p>
                </div>
              ))}
            </div>
            <div className="mt-5 rounded-xl border border-emerald-300/30 bg-emerald-400/10 p-4 text-sm text-emerald-100">
              Built for private schools that need speed, trust, and consistent outcomes.
            </div>
          </motion.div>
        </motion.div>
      </section>

      <section className="section-shell relative z-10">
        <SectionTitle
          tag="About Nova"
          title="Your Complete Digital Management Partner"
          text="We combine startup speed with enterprise-level reliability. From first website launch to complete school ERP automation, Nova Tech Solutions owns your digital journey end-to-end."
        />
        <div className="grid gap-5 md:grid-cols-3">
          {[
            { icon: BarChart3, title: "Execution-Driven", text: "Clear milestones, measurable outcomes, and fast iteration." },
            { icon: ShieldCheck, title: "Secure by Design", text: "Cloud-first architecture with robust access and backup controls." },
            { icon: MessageCircle, title: "Leadership Visibility", text: "Principal and management dashboards that simplify decisions." }
          ].map((card, i) => (
            <motion.article
              key={card.title}
              custom={i}
              variants={reveal}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              className="glass p-6"
            >
              <card.icon className="h-9 w-9 text-emerald-400" />
              <h3 className="mt-4 text-xl font-semibold">{card.title}</h3>
              <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">{card.text}</p>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="section-shell relative z-10">
        <SectionTitle
          tag="Core Services"
          title="Everything Schools Need Under One Partner"
          text="A complete stack designed for admission growth, operational efficiency, and stronger stakeholder communication."
        />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <motion.article
              key={service.title}
              custom={i}
              variants={reveal}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.25 }}
              className="glass group p-6 transition hover:-translate-y-1"
            >
              <service.icon className="h-9 w-9 text-blue-500 transition group-hover:text-emerald-400" />
              <h3 className="mt-4 text-xl font-semibold">{service.title}</h3>
              <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">{service.desc}</p>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="section-shell relative z-10">
        <SectionTitle
          tag="ERP + Results"
          title="Automation That Principals Can Trust"
          text="Our systems reduce manual work, improve transparency, and keep school leadership focused on academics and growth."
        />
        <div className="glass p-6 md:p-8">
          <div className="grid gap-4 md:grid-cols-2">
            {erpFeatures.map((feature, i) => (
              <motion.div
                key={feature}
                custom={i}
                variants={reveal}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                className="rounded-xl border border-slate-300/30 bg-white/50 p-4 dark:border-white/10 dark:bg-white/5"
              >
                <p className="inline-flex items-start gap-2 text-sm md:text-base">
                  <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                  {feature}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell relative z-10">
        <SectionTitle
          tag="Social Media"
          title="Consistent School Branding Across Platforms"
          text="From admission season campaigns to parent communication strategy, we handle your institution's digital voice with consistency and quality."
        />
        <div className="glass p-8">
          <p className="max-w-4xl text-base text-slate-700 dark:text-slate-300">
            We create monthly content calendars, visual creatives, event showcases, and performance tracking for Facebook, Instagram, and YouTube, so your school stays visible and credible in a competitive education market.
          </p>
        </div>
      </section>

      <section className="section-shell relative z-10">
        <SectionTitle
          tag="Why Choose Us"
          title="Built for Serious School Leaders"
          text="Nova Tech Solutions functions as your long-term digital infrastructure partner, not just a vendor."
        />
        <div className="grid gap-4 md:grid-cols-2">
          {whyUs.map((item, i) => (
            <motion.div
              key={item}
              custom={i}
              variants={reveal}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.25 }}
              className="glass p-5"
            >
              <p className="text-sm md:text-base">{item}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section id="pricing" className="section-shell relative z-10">
        <SectionTitle
          tag="Pricing"
          title="Flexible Plans for Every School Stage"
          text="Choose a package based on your current digital maturity and growth goals."
        />
        <div className="grid gap-5 lg:grid-cols-3">
          {pricing.map((plan, i) => (
            <motion.article
              key={plan.name}
              custom={i}
              variants={reveal}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              className={`glass p-7 ${plan.featured ? "border-emerald-300/50 bg-emerald-300/10" : ""}`}
            >
              <p className="text-sm uppercase tracking-[0.14em] text-slate-700 dark:text-slate-300">{plan.name}</p>
              <h3 className="mt-2 text-2xl font-bold">{plan.subtitle}</h3>
              <p className="mt-4 text-3xl font-extrabold">{plan.price}</p>
              <div className="my-6 h-px bg-slate-300/40 dark:bg-white/20" />
              <ul className="space-y-3">
                {plan.perks.map((perk) => (
                  <li key={perk} className="inline-flex items-start gap-2 text-sm">
                    <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                    {perk}
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="section-shell relative z-10">
        <SectionTitle
          tag="Portfolio"
          title="Selected School Transformation Projects"
          text="We deliver outcomes that directly impact admissions, operations, and trust."
        />
        <div className="grid gap-4 md:grid-cols-3">
          {portfolio.map((item, i) => (
            <motion.article
              key={item}
              custom={i}
              variants={reveal}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.25 }}
              className="glass p-6"
            >
              <p className="text-sm md:text-base">{item}</p>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="section-shell relative z-10">
        <SectionTitle
          tag="Testimonials"
          title="What School Leaders Say"
          text="Feedback from principals and management teams that partnered with Nova Tech Solutions."
        />
        <div className="grid gap-5 md:grid-cols-2">
          {testimonials.map((item, i) => (
            <motion.blockquote
              key={item.author}
              custom={i}
              variants={reveal}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.25 }}
              className="glass p-6"
            >
              <p className="text-base leading-relaxed">"{item.quote}"</p>
              <footer className="mt-4 text-sm font-semibold text-emerald-500">{item.author}</footer>
            </motion.blockquote>
          ))}
        </div>
      </section>

      <section id="contact" className="section-shell relative z-10 pb-24">
        <SectionTitle
          tag="Contact"
          title="Book a Free Demo for Your School"
          text="Share your requirements and our team will schedule a personalized consultation."
        />
        <div className="glass grid gap-6 p-7 md:grid-cols-2">
          <div>
            <p className="text-lg font-semibold">Nova Tech Solutions</p>
            <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">
              End-to-end digital infrastructure and management for modern private schools.
            </p>
            <p className="mt-4 text-sm">Email: contact@novatechsolutions.in</p>
            <p className="text-sm">Phone: +91 90000 12345</p>
          </div>
          <div className="flex flex-col gap-3">
            <a href="mailto:contact@novatechsolutions.in" className="rounded-xl bg-slate-900 px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-slate-700 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200">
              Send Email
            </a>
            <a
              href="https://wa.me/919000012345?text=Hi%20Nova%20Tech%20Solutions%2C%20I%20want%20a%20free%20demo%20for%20my%20school."
              target="_blank"
              rel="noreferrer"
              className="rounded-xl bg-emerald-500 px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-emerald-400"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
