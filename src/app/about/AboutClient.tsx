"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, HeartHandshake, BadgeCheck } from "lucide-react";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay },
});

const stats = [
  { value: "2016",   label: "Founded" },
  { value: "7,000+", label: "Residential Units" },
  { value: "$4B+",   label: "Portfolio Value" },
  { value: "100%",   label: "End-to-End" },
];

const values = [
  {
    icon: ShieldCheck,
    title: "Confidentiality",
    description: "We guarantee the confidentiality of our client and investor data through strict control over our infrastructure, as well as our physical and personal access rights.",
  },
  {
    icon: HeartHandshake,
    title: "Comprehensive Support",
    description: "We offer comprehensive support to all our buyers, to ensure a maximum enjoyment of your new property.",
  },
  {
    icon: BadgeCheck,
    title: "Quality",
    description: "We are dedicated to providing high quality products and services based on extensive experience and knowledge.",
  },
];

export function AboutClient() {
  return (
    <main>

      {/* Hero */}
      <section className="relative min-h-96 overflow-hidden bg-accent flex items-end">
        <Image
          src="/image/who we are.png"
          alt=""
          fill
          priority
          className="object-cover object-center opacity-20 pointer-events-none select-none"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-linear-to-b from-accent/60 to-accent" />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-16 pt-24 sm:px-8 lg:px-12 lg:pb-24">
          <motion.div {...fadeUp(0)}>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Our Story</span>
          </motion.div>
          <motion.h1
            {...fadeUp(0.1)}
            className="mt-3 font-display text-5xl font-bold leading-tight text-white sm:text-6xl lg:text-7xl max-w-3xl"
          >
            Who We <span className="text-primary">Are</span>
          </motion.h1>
          <motion.div {...fadeUp(0.2)} className="mt-4 h-1 w-12 bg-primary rounded-full" />
          <motion.p
            {...fadeUp(0.3)}
            className="mt-6 text-base font-medium text-white/60 max-w-2xl leading-relaxed sm:text-xl"
          >
            Connecting people, passion and purpose to place.
          </motion.p>
        </div>
      </section>

      {/* Story */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-12 lg:py-28">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24 items-start">

            <motion.div {...fadeUp(0)} className="space-y-6 text-base leading-relaxed text-text-secondary">
              <p className="text-base font-semibold text-accent leading-snug sm:text-xl">
                This is our mission and our purpose as an organization.
              </p>
              <p>
                We enjoy the process of finding a great site, of creating a shared vision with communities and our project partners, and then delivering high quality homes that deliver livability, connection and value to owners and residents.
              </p>
              <p>
                A new home is thoughtfully designed, perfectly positioned and family-friendly. It&apos;s an investment in your future, that pays lifestyle dividends today.
              </p>
              <p>
                To realize this goal, we listen closely to our customers and connect with how they aspire to live. This provides the inspiration for new ideas, designs and amenities that can enhance the way we relate to our homes, each other, and the wider community.
              </p>
              <p>
                This process of investigation, combined with sustainable building practices, community-focused design and discriminating site selection, forms the foundation of every landmark project we create for our owner-occupiers and investors.
              </p>
              <div className="pt-2">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-md bg-primary px-8 py-4 text-base font-semibold text-white shadow-lg shadow-primary/25 transition-all hover:bg-primary-dark"
                >
                  Contact Us
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.div>

            <motion.div {...fadeUp(0.15)} className="relative aspect-4/5 overflow-hidden rounded-2xl bg-border lg:sticky lg:top-28">
              <Image
                src="/image/who we are.png"
                alt="Who We Are - AvranceCorp"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <div className="bg-accent border-y border-white/5">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-2 gap-px bg-white/10 sm:grid-cols-4 sm:gap-0 sm:bg-transparent sm:divide-x sm:divide-white/10">
            {stats.map(({ value, label }, i) => (
              <motion.div
                key={label}
                {...fadeUp(i * 0.08)}
                className="flex flex-col items-center gap-1.5 bg-accent px-4 py-6 text-center sm:px-6 sm:py-8"
              >
                <span className="font-display text-3xl font-bold text-primary sm:text-4xl">{value}</span>
                <span className="text-xs font-semibold uppercase tracking-[0.15em] text-white/40">{label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Values */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-12 lg:py-28">
          <motion.div {...fadeUp(0)} className="mb-14">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Our Values</span>
            <h2 className="mt-2 font-display text-3xl font-bold text-accent sm:text-4xl lg:text-5xl">
              What We <span className="text-primary">Stand For</span>
            </h2>
            <div className="mt-4 h-1 w-10 bg-primary rounded-full" />
          </motion.div>

          <div className="space-y-0 divide-y divide-border">
            {values.map(({ icon: Icon, title, description }, i) => (
              <motion.div
                key={title}
                {...fadeUp(i * 0.1)}
                className="flex gap-8 py-10 group"
              >
                <div className="shrink-0 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/8 text-primary mt-1 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold text-accent sm:text-2xl">{title}</h3>
                  <p className="mt-2 text-base leading-relaxed text-text-secondary max-w-2xl">{description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="bg-accent">
        <div className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-12 lg:py-28">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-24 items-center">
            <motion.div {...fadeUp(0)}>
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">What We Do</span>
              <h2 className="mt-2 font-display text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
                Built on <span className="text-primary">Experience</span>
              </h2>
              <div className="mt-4 h-1 w-10 bg-primary rounded-full" />
            </motion.div>
            <motion.div {...fadeUp(0.1)} className="space-y-5 text-base leading-relaxed text-white/65">
              <p>
                We specialize in locating great sites for new developments. Our projects range from sub-division Town Homes to Mid-rise Condominium projects.
              </p>
              <p>
                We also specialize in creating a massive passive income for those looking to build a generational wealth.
              </p>
              <p>
                Whether you&apos;re looking to invest in a new build and refurbishment schemes, a Joint Venture partnership on projects, or are an existing landowner with a joint venture idea, AvranceCorp Developments has the collective skills and experience to translate your ideas into reality.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <div className="bg-primary">
        <div className="mx-auto max-w-7xl px-6 py-10 sm:px-8 lg:px-12">
          <div className="flex flex-col items-center justify-between gap-5 sm:flex-row">
            <p className="font-display text-2xl font-bold text-white sm:text-3xl">
              Ready to work with us?
            </p>
            <Link
              href="/contact"
              className="shrink-0 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-bold text-primary transition-all duration-200 hover:bg-white/90 hover:shadow-lg"
            >
              Contact Us
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>

    </main>
  );
}
