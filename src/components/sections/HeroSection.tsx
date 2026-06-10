"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Building2 } from "lucide-react";

const slides = [
  { id: 0, image: "/image/hero-townhomes.png", alt: "Georgian Bay Harbour" },
  { id: 1, image: "/image/hero-condos.png",    alt: "Lux Condos" },
];

const stats = [
  { value: "2016", label: "Year Established" },
  { value: "5+",   label: "Projects Completed" },
  { value: "2",    label: "Countries" },
  { value: "100%", label: "End-to-End Delivery" },
];

const reveal = {
  hidden: { opacity: 0, y: 80 },
  visible: { opacity: 1, y: 0 },
};

const ease = "easeOut" as const;

export function HeroSection() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden flex flex-col">

      {/* ── Background carousel + Ken Burns ─────────────────────── */}
      <AnimatePresence initial={false}>
        <motion.div
          key={active}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <Image
            src={slides[active].image}
            alt={slides[active].alt}
            fill
            className="object-cover object-right-center"
            priority={active === 0}
            sizes="100vw"
          />
        </motion.div>
      </AnimatePresence>

      {/* Left gradient — content readability */}
      <div className="absolute inset-0 bg-linear-to-r from-black/95 via-black/55 to-transparent pointer-events-none" />
      {/* Radial shadow behind content area */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 65% 85% at 20% 55%, rgba(0,0,0,0.82) 0%, transparent 70%)" }} />
      {/* Bottom fade */}
      <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

      {/* ── Content — staggered reveal ───────────────────────────── */}
      <div className="relative z-10 flex flex-1 flex-col justify-center">
        <div className="mx-auto w-full max-w-7xl px-8 sm:px-10 lg:px-16">

          {/* Heading line 1 */}
          <div className="overflow-hidden pb-1">
            <motion.div
              variants={reveal}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.9, ease: "easeOut", delay: 0.1 }}
              className="font-display text-5xl font-medium leading-[1.15] tracking-tight sm:text-6xl lg:text-7xl"
            >
              <span className="bg-linear-to-b from-white via-white/90 to-white/55 bg-clip-text text-transparent">
                Superior Quality
              </span>
            </motion.div>
          </div>

          {/* Heading line 2 */}
          <div className="overflow-hidden pb-1">
            <motion.div
              variants={reveal}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.9, ease: "easeOut", delay: 0.28 }}
              className="font-display text-5xl font-medium leading-[1.15] tracking-tight sm:text-6xl lg:text-7xl"
            >
              <em className="not-italic bg-linear-to-r from-[#C41230] via-[#E8192C] to-[#C41230] bg-clip-text text-transparent">From Concept to Creation</em>
            </motion.div>
          </div>

          {/* Subheading */}
          <motion.p
            variants={reveal}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.8, ease, delay: 0.42 }}
            className="mt-5 max-w-lg text-sm leading-relaxed text-white/90 sm:text-base"
          >
            AvranceCorp Developments embarks on projects from conception
            right through development and construction with precision.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            variants={reveal}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.8, ease, delay: 0.58 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <Link
              href="/properties"
              className="inline-flex items-center gap-2 rounded-md bg-primary px-8 py-4 text-base font-semibold text-white transition-colors duration-200 hover:bg-primary-dark"
            >
              Explore Projects
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/contact#invest"
              className="inline-flex items-center gap-2 rounded-md border border-white/30 bg-white/10 backdrop-blur-sm px-8 py-4 text-base font-semibold text-white transition-all duration-200 hover:border-white/60 hover:bg-white/15"
            >
              <Building2 className="h-4 w-4" />
              Partner With Us
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={reveal}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.8, ease, delay: 0.72 }}
            className="mt-10 flex flex-wrap items-center gap-5"
          >
            {stats.map((stat, i) => (
              <div key={stat.label} className={`flex flex-col ${i !== 0 ? "pl-5 border-l border-white/20" : ""}`}>
                <span className="font-display text-2xl font-bold text-primary">{stat.value}</span>
                <span className="text-xs font-medium text-white/80 uppercase tracking-wide mt-0.5">{stat.label}</span>
              </div>
            ))}
          </motion.div>

        </div>
      </div>

      {/* Slide dots — bottom center */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease, delay: 0.85 }}
        className="relative z-10 flex justify-center gap-2 pb-20"
      >
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            aria-label={`Slide ${i + 1}`}
            className={`transition-all duration-300 rounded-full ${
              i === active
                ? "w-6 h-1.5 bg-primary"
                : "w-1.5 h-1.5 bg-white/25 hover:bg-white/50"
            }`}
          />
        ))}
      </motion.div>

    </section>
  );
}
