"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  MapPin, Phone, Mail, Send, CheckCircle2,
  ChevronRight, User, MessageSquare,
} from "lucide-react";

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1], delay },
});

const inquiryTypes = [
  "Investment & Joint Venture",
  "Project Information",
  "Media & Press",
  "General Inquiry",
  "Other",
];

const contactItems = [
  { Icon: Phone, label: "Phone", lines: ["+1 647-368-7108"], href: "tel:+16473687108" },
  { Icon: Mail, label: "Email", lines: ["info@avrancecorp.com"], href: "mailto:info@avrancecorp.com" },
  { Icon: MapPin, label: "Head Office", lines: ["2810 Matheson Boulevard East", "Mississauga, Ontario"] },
  { Icon: MapPin, label: "Toronto Office", lines: ["1-4205 Keele Street", "Toronto, Ontario"] },
];

export function ContactClient() {
  const [form, setForm] = useState({ name: "", mobile: "", email: "", inquiryType: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const reset = () => {
    setStatus("idle");
    setForm({ name: "", mobile: "", email: "", inquiryType: "", message: "" });
  };

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          mobile: form.mobile || undefined,
          email: form.email,
          description: form.message,
          subject: form.inquiryType ? `Contact: ${form.inquiryType}` : "New Contact Form Submission",
        }),
      });
      if (!res.ok) throw new Error();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  return (
    <main className="bg-white">

      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="relative bg-accent overflow-hidden">

        {/* Glowing arc — top right */}
        <div className="pointer-events-none select-none absolute top-0 right-0 overflow-hidden w-130 h-80">
          <div className="absolute -top-40 -right-40 w-120 h-120 rounded-full border border-primary/50 shadow-[0_0_60px_rgba(196,18,48,0.25)]" />
          <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full border border-primary/20" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 pt-28 pb-14">
          <motion.div {...fade(0)}>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Get In Touch</span>
          </motion.div>

          <motion.h1
            {...fade(0.07)}
            className="mt-3 font-display text-5xl font-bold text-white sm:text-6xl lg:text-7xl xl:text-8xl"
          >
            Contact <span className="text-primary">Us</span>
          </motion.h1>

          <motion.div {...fade(0.12)} className="mt-4 h-1 w-12 bg-primary rounded-full" />

          <motion.p {...fade(0.16)} className="mt-6 text-lg text-white/60 max-w-2xl leading-relaxed">
            We&apos;re here to help and answer any question you might have. We look forward to hearing from you.
          </motion.p>

          <motion.nav {...fade(0.2)} className="mt-6 flex items-center gap-1.5 text-xs text-white/25">
            <Link href="/" className="hover:text-white/50 transition-colors">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-white/45">Contact</span>
          </motion.nav>
        </div>
      </section>

      {/* ── Three-panel card ──────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 py-14 lg:py-20">
        <motion.div
          {...fade(0.05)}
          className="grid grid-cols-1 lg:grid-cols-[300px_1fr_1fr] rounded-2xl border border-border shadow-[0_8px_48px_rgba(0,0,0,0.10)] overflow-hidden"
        >

          {/* ── Col 1: Let's Connect ─────────────────────────────── */}
          <div className="order-2 lg:order-1 bg-bg-subtle p-8 border-b lg:border-b-0 lg:border-r border-border">

            <h2 className="font-display text-lg font-bold text-accent mb-8">Let&apos;s Connect</h2>

            <div className="space-y-6">
              {contactItems.map(({ Icon, label, lines, href }) => (
                <div key={label} className="flex gap-4 items-start">
                  <div className="h-9 w-9 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                    <Icon className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-accent mb-0.5">{label}</p>
                    {href ? (
                      <a href={href} className="text-sm text-text-secondary hover:text-primary transition-colors">
                        {lines[0]}
                      </a>
                    ) : (
                      <p className="text-sm text-text-secondary leading-relaxed">
                        {lines.join(", ")}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Col 2: Form ──────────────────────────────────────── */}
          <div className="order-3 lg:order-2 bg-white p-8 lg:border-r border-border">
            <h2 className="font-display text-lg font-bold text-accent mb-8">Send us a message</h2>

            {status === "sent" ? (
              <div className="flex flex-col items-center justify-center h-64 gap-4 text-center">
                <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center">
                  <CheckCircle2 className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-display text-xl font-bold text-accent">Message Sent!</h3>
                <p className="text-sm text-text-secondary max-w-50 leading-relaxed">
                  We&apos;ll get back to you within 2 business days.
                </p>
                <button onClick={reset} className="text-sm font-semibold text-primary hover:underline">
                  Send another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted pointer-events-none" />
                    <input
                      name="name" value={form.name} onChange={handleChange} required
                      placeholder="Your Name"
                      className="w-full bg-bg-subtle border border-border rounded-lg pl-9 pr-3 py-3 text-sm text-accent placeholder:text-text-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/15 transition"
                    />
                  </div>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted pointer-events-none" />
                    <input
                      name="email" type="email" value={form.email} onChange={handleChange} required
                      placeholder="Your Email"
                      className="w-full bg-bg-subtle border border-border rounded-lg pl-9 pr-3 py-3 text-sm text-accent placeholder:text-text-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/15 transition"
                    />
                  </div>
                </div>

                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted pointer-events-none" />
                  <input
                    name="mobile" value={form.mobile} onChange={handleChange}
                    placeholder="Phone Number"
                    className="w-full bg-bg-subtle border border-border rounded-lg pl-9 pr-3 py-3 text-sm text-accent placeholder:text-text-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/15 transition"
                  />
                </div>

                <div className="relative">
                  <MessageSquare className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted pointer-events-none" />
                  <select
                    name="inquiryType" value={form.inquiryType} onChange={handleChange}
                    className="w-full bg-bg-subtle border border-border rounded-lg pl-9 pr-3 py-3 text-sm text-accent focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/15 transition appearance-none"
                  >
                    <option value="">Subject</option>
                    {inquiryTypes.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>

                <div className="relative">
                  <textarea
                    name="message" value={form.message} onChange={handleChange} required rows={5}
                    placeholder="Your Message"
                    className="w-full bg-bg-subtle border border-border rounded-lg px-3 py-3 text-sm text-accent placeholder:text-text-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/15 transition resize-none"
                  />
                </div>

                {status === "error" && (
                  <p className="text-sm font-medium text-red-600">
                    Something went wrong. Please try again or email info@avrancecorp.com
                  </p>
                )}

                <button
                  type="submit" disabled={status === "sending"}
                  className="w-full flex items-center justify-center gap-2 bg-primary rounded-md py-4 text-base font-semibold text-white shadow-md shadow-primary/25 transition-all hover:bg-primary-dark hover:shadow-lg hover:shadow-primary/30 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status === "sending" ? "Sending…" : <><span>Send Message</span><Send className="h-4 w-4" /></>}
                </button>

              </form>
            )}
          </div>

          {/* ── Col 3: Map ───────────────────────────────────────── */}
          <div className="order-1 lg:order-3 relative min-h-105 lg:min-h-0 border-b border-border lg:border-b-0">
            <iframe
              src="https://maps.google.com/maps?q=2810+Matheson+Blvd+E,+Mississauga,+Ontario&output=embed"
              className="absolute inset-0 w-full h-full"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

        </motion.div>
      </section>

    </main>
  );
}
