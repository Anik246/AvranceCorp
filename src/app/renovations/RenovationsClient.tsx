"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight, ChevronRight, CheckCircle2, Send, Loader2,
} from "lucide-react";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay },
});

const services = [
  "Kitchen and bathroom upgrades",
  "Basement finishing",
  "Full-home remodels",
  "Interior finishes and flooring",
  "Structural and layout changes",
  "Energy-efficiency improvements",
  "Smart home upgrades",
  "Accessibility renovations",
  "Rental suite conversions",
  "Legal secondary suites",
  "Mechanical, electrical, and plumbing modernization",
  "Building envelope improvements",
  "Exterior upgrades (windows, doors, siding, roofing, decks, patios)",
];

const steps = [
  {
    number: "01",
    title: "Initial Consultation",
    desc: "Property review, goal setting, and feasibility guidance.",
    outcome: "You leave with clarity on what is possible",
  },
  {
    number: "02",
    title: "Detailed Scope and Budgeting",
    desc: "Clear, itemized scopes that eliminate surprises.",
    outcome: "Full transparency before work begins",
  },
  {
    number: "03",
    title: "Permits and Compliance",
    desc: "We manage municipal approvals and inspections.",
    outcome: "Zero paperwork stress on your end",
  },
  {
    number: "04",
    title: "Construction and Project Management",
    desc: "Trades are coordinated and supervised at every stage.",
    outcome: "Consistent progress, no guesswork",
  },
  {
    number: "05",
    title: "Final Walkthrough",
    desc: "We confirm the finished product meets your expectations.",
    outcome: "Done only when you are satisfied",
  },
];

const reasons = [
  "Developer-level experience",
  "Reliable trade network",
  "Clear communication and weekly updates",
  "Accurate budgeting and disciplined timelines",
  "Fully insured and compliant",
  "High-quality workmanship",
];

export function RenovationsClient() {
  return (
    <main className="overflow-hidden">

      {/* Hero */}
      <section className="relative min-h-screen flex items-start overflow-hidden">
        <Image
          src="/image/renovations.png"
          alt="Residential Renovations"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/55 to-black/20" />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pt-32 pb-20 sm:px-8 lg:px-12">
          <motion.div {...fadeUp(0)} className="relative max-w-2xl">
            <div className="absolute -inset-10 rounded-full bg-black/60 blur-3xl" />
            <div className="relative">
            <nav className="mb-5 flex items-center gap-1.5 text-xs text-white/45">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <ChevronRight className="h-3 w-3" />
              <span className="text-white/80">Renovations</span>
            </nav>

            <h1 className="font-display text-4xl font-bold leading-[1.05] text-white sm:text-5xl lg:text-6xl">
              Renovations Built With{" "}
              <span className="text-primary">Developer-Level</span>{" "}
              Precision
            </h1>

            <div className="mt-4 h-1 w-10 bg-primary rounded-full" />

            <p className="mt-5 text-base leading-relaxed text-white/60">
              From single-unit upgrades to full building retrofits, we deliver high-quality renovations backed by disciplined project management and proven construction expertise.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href="#contact-form"
                className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-primary px-8 py-4 text-base font-semibold text-white shadow-lg shadow-primary/30 transition-all hover:bg-primary-dark sm:w-auto"
              >
                Get a Free Consultation
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="#services"
                className="inline-flex w-full items-center justify-center gap-2 rounded-md border border-white/20 px-8 py-4 text-base font-semibold text-white transition-all hover:bg-white/10 sm:w-auto"
              >
                View Services
              </Link>
            </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-12 lg:py-28">
          <motion.div {...fadeUp(0)} className="mb-14 max-w-3xl">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">What We Offer</span>
            <h2 className="mt-2 font-display text-3xl font-bold text-accent sm:text-4xl lg:text-5xl">
              About Our <span className="text-primary">Renovation Services</span>
            </h2>
            <div className="mt-4 h-1 w-10 bg-primary rounded-full" />
            <p className="mt-6 text-base font-medium leading-relaxed text-accent sm:text-lg">
              Renovations are not just about improving aesthetics. They are about increasing value, enhancing functionality, and extending the lifespan of your asset. Our team approaches every renovation with the same rigor we apply to large development projects. You receive clear scope, accurate budgets, and efficient execution.
            </p>
          </motion.div>

          <motion.p {...fadeUp(0.1)} className="mb-6 text-sm font-bold uppercase tracking-[0.2em] text-accent">
            What we specialize in?
          </motion.p>

          <div className="flex flex-wrap gap-3">
            {services.map((label, i) => (
              <motion.span
                key={label}
                {...fadeUp(i * 0.04)}
                className="rounded-full border border-border px-5 py-2.5 text-sm font-medium text-accent hover:border-primary hover:text-primary transition-colors duration-200 cursor-default"
              >
                {label}
              </motion.span>
            ))}
          </div>

          <motion.div {...fadeUp(0.1)} className="mt-12">
            <Link
              href="#contact-form"
              className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:gap-3 transition-all duration-200"
            >
              Discuss your project
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Process */}
      <section className="bg-accent">
        <div className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-12 lg:py-28">
          <motion.div {...fadeUp(0)} className="mb-16">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">How It Works</span>
            <h2 className="mt-2 font-display text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
              Our <span className="text-primary">Process</span>
            </h2>
            <div className="mt-4 h-1 w-10 bg-primary rounded-full" />
            <p className="mt-6 text-base font-medium text-white/80 max-w-xl sm:text-lg">
              Renovations often fall apart because of unclear scope, poor coordination, or unmanaged timelines. We remove those risks with a structured process.
            </p>
          </motion.div>

          <div className="relative">
            <div className="absolute left-5 top-5 bottom-5 w-px bg-white/10 hidden sm:block" />
            <div className="space-y-0">
              {steps.map(({ number, title, desc, outcome }, i) => (
                <motion.div
                  key={number}
                  {...fadeUp(i * 0.08)}
                  className="relative grid grid-cols-1 gap-6 pb-14 last:pb-0 sm:grid-cols-[40px_1fr] sm:gap-12"
                >
                  <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-black text-white ring-4 ring-accent">
                    {number}
                  </div>
                  <div className="sm:pt-1">
                    <h3 className="font-display text-2xl font-bold text-white">{title}</h3>
                    <p className="mt-2 text-base leading-relaxed text-white/60 max-w-lg">{desc}</p>
                    <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/8 px-4 py-1.5">
                      <CheckCircle2 className="h-3.5 w-3.5 text-primary shrink-0" />
                      <span className="text-xs font-semibold text-white/65">{outcome}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-12 lg:py-28">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24 items-start">

            <motion.div {...fadeUp(0)} className="lg:sticky lg:top-28">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Why Us</span>
              <h2 className="mt-2 font-display text-3xl font-bold text-accent sm:text-4xl lg:text-5xl">
                Why Clients<br /><span className="text-primary">Choose Us?</span>
              </h2>
              <div className="mt-4 h-1 w-10 bg-primary rounded-full" />
              <p className="mt-6 text-base font-medium leading-relaxed text-accent sm:text-lg">
                We bring the same standards we apply to full-scale developments to every renovation project we take on.
              </p>
              <div className="mt-8">
                <Link
                  href="#contact-form"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-primary px-8 py-4 text-base font-semibold text-white shadow-lg shadow-primary/25 transition-all hover:bg-primary-dark sm:w-auto"
                >
                  Get a Free Consultation
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.div>

            <div className="divide-y divide-border">
              {reasons.map((reason, i) => (
                <motion.div
                  key={reason}
                  {...fadeUp(i * 0.07)}
                  className="flex items-center gap-4 py-5 group"
                >
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-primary" />
                  <span className="text-base font-semibold text-accent group-hover:text-primary transition-colors duration-200 sm:text-lg">{reason}</span>
                </motion.div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* Contact Form */}
      <RenovationsForm />

    </main>
  );
}

function RenovationsForm() {
  const [form, setForm] = useState({ name: "", mobile: "", email: "", description: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          to: "george@avrancecorp.com",
          subject: "Renovations lead",
        }),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact-form" className="bg-accent">
      <div className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24 items-start">

          <motion.div {...fadeUp(0)}>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Get Started</span>
            <h2 className="mt-2 font-display text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
              Start Your<br /><span className="text-primary">Renovation</span>
            </h2>
            <div className="mt-4 h-1 w-10 bg-primary rounded-full" />
            <p className="mt-6 text-base font-medium leading-relaxed text-white/70 sm:text-lg">
              Tell us about your project and we will get back to you within 24 hours with a free consultation.
            </p>
          </motion.div>

          <motion.div {...fadeUp(0.1)}>
            {status === "success" ? (
              <div className="flex flex-col items-start gap-4 rounded-2xl border border-primary/30 bg-primary/10 p-8">
                <CheckCircle2 className="h-10 w-10 text-primary" />
                <h3 className="font-display text-2xl font-bold text-white">Message Received</h3>
                <p className="text-base text-white/60">Thank you for reaching out. We will be in touch within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold uppercase tracking-[0.15em] text-white/50">Name <span className="text-primary">*</span></label>
                    <input
                      name="name"
                      type="text"
                      required
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your full name"
                      className="rounded-md border border-white/10 bg-white/8 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-primary focus:outline-none transition-colors"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold uppercase tracking-[0.15em] text-white/50">Mobile <span className="normal-case font-normal text-white/30">(optional)</span></label>
                    <input
                      name="mobile"
                      type="tel"
                      value={form.mobile}
                      onChange={handleChange}
                      placeholder="Your phone number"
                      className="rounded-md border border-white/10 bg-white/8 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-primary focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold uppercase tracking-[0.15em] text-white/50">Email <span className="text-primary">*</span></label>
                  <input
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    className="rounded-md border border-white/10 bg-white/8 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-primary focus:outline-none transition-colors"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold uppercase tracking-[0.15em] text-white/50">Briefly describe the renovations required <span className="text-primary">*</span></label>
                  <textarea
                    name="description"
                    required
                    rows={5}
                    value={form.description}
                    onChange={handleChange}
                    placeholder="Describe what you are looking to renovate..."
                    className="rounded-md border border-white/10 bg-white/8 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-primary focus:outline-none transition-colors resize-none"
                  />
                </div>

                {status === "error" && (
                  <p className="text-sm text-primary">Something went wrong. Please try again or email us directly.</p>
                )}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-primary px-8 py-4 text-base font-semibold text-white shadow-lg shadow-primary/25 transition-all hover:bg-primary-dark disabled:opacity-60"
                >
                  {status === "loading" ? (
                    <><Loader2 className="h-4 w-4 animate-spin" /> Sending...</>
                  ) : (
                    <><Send className="h-4 w-4" /> Send Message</>
                  )}
                </button>
              </form>
            )}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
