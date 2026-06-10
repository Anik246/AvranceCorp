"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer, defaultTransition, viewportOnce } from "@/lib/animations";

const stats = [
  { value: "2016", label: "Year Established", detail: "Nearly a decade of expertise" },
  { value: "5+", label: "Projects Completed", detail: "Across Canada & USA" },
  { value: "2", label: "Countries", detail: "Canada & United States" },
  { value: "100%", label: "End-to-End", detail: "Full development lifecycle" },
];

export function StatsSection() {
  return (
    <section className="relative overflow-hidden bg-[var(--color-accent)] py-24 lg:py-32">
      {/* Background accent */}
      <div className="absolute left-0 top-0 h-full w-1 bg-[var(--color-primary)]" />
      <div className="absolute -right-40 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-[var(--color-primary)] opacity-5" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">

        {/* Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          transition={defaultTransition}
          className="mb-16 max-w-2xl"
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px w-10 bg-[var(--color-primary)]" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-primary)]">
              By The Numbers
            </span>
          </div>
          <h2 className="font-display text-4xl font-bold leading-tight text-white sm:text-5xl">
            Building Success{" "}
            <span className="text-[var(--color-primary)]">Through Experience</span>
          </h2>
        </motion.div>

        {/* Stats grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid grid-cols-2 gap-px bg-white/10 rounded-2xl overflow-hidden lg:grid-cols-4"
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={fadeUp}
              transition={defaultTransition}
              className="flex flex-col gap-3 bg-[var(--color-accent)] px-8 py-10 hover:bg-[var(--color-accent-light)] transition-colors duration-300"
            >
              <span className="font-display text-5xl font-bold text-[var(--color-primary)] lg:text-6xl">
                {stat.value}
              </span>
              <div className="flex flex-col gap-1">
                <span className="font-semibold text-white">{stat.label}</span>
                <span className="text-xs text-white/40">{stat.detail}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
