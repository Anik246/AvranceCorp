"use client";

import { motion } from "framer-motion";
import { Mail } from "lucide-react";

const LinkedinIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);
import { fadeUp, defaultTransition, viewportOnce } from "@/lib/animations";

const leaders = [
  {
    name: "Samuel Babs",
    title: "CEO & Partner",
    bio: "With extensive experience in real estate development, land acquisition, and project management, Samuel leads AvranceCorp's strategic vision and growth initiatives. His focus on quality, innovation, and strong partnerships continues to drive the company's success.",
    gradient: "from-[#C41230] via-[#9B0E26] to-[#1A1A2E]",
    initials: "SB",
  },
];

export function LeadershipSection() {
  return (
    <section className="bg-[var(--color-bg)] py-16 sm:py-24 lg:py-32 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">

        {/* Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          transition={defaultTransition}
          className="mb-16 text-center"
        >
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="h-px w-10 bg-[var(--color-primary)]" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-primary)]">
              Leadership
            </span>
            <div className="h-px w-10 bg-[var(--color-primary)]" />
          </div>
          <h2 className="font-display text-4xl font-bold leading-tight text-[var(--color-accent)] sm:text-5xl">
            Meet Our{" "}
            <span className="text-[var(--color-primary)]">Leadership</span>
          </h2>
        </motion.div>

        {/* Leader cards */}
        <div className="flex flex-wrap justify-center gap-8">
          {leaders.map((leader) => (
            <motion.div
              key={leader.name}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              transition={defaultTransition}
              className="group w-full max-w-sm"
            >
              <div className="rounded-2xl bg-white shadow-[var(--shadow-md)] overflow-hidden transition-shadow duration-300 group-hover:shadow-[var(--shadow-lg)]">
                {/* Photo area */}
                <div className={`relative h-52 bg-gradient-to-br ${leader.gradient}`}>
                  {/* Initials avatar */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-white/20 bg-white/10 backdrop-blur-sm">
                      <span className="font-display text-3xl font-bold text-white">
                        {leader.initials}
                      </span>
                    </div>
                  </div>
                  {/* Bottom fade */}
                  <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white/5 to-transparent" />
                </div>

                {/* Content */}
                <div className="px-6 py-6 sm:px-8 sm:py-7">
                  <h3 className="font-display text-2xl font-bold text-[var(--color-accent)]">
                    {leader.name}
                  </h3>
                  <p className="mt-1 text-sm font-semibold tracking-wide text-[var(--color-primary)]">
                    {leader.title}
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-[var(--color-text-secondary)]">
                    {leader.bio}
                  </p>

                  {/* Social links */}
                  <div className="mt-6 flex gap-3 border-t border-[var(--color-border)] pt-5">
                    <a
                      href="#"
                      className="flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--color-border)] text-[var(--color-text-muted)] transition-all duration-200 hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"
                      aria-label="LinkedIn"
                    >
                      <LinkedinIcon />
                    </a>
                    <a
                      href="#"
                      className="flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--color-border)] text-[var(--color-text-muted)] transition-all duration-200 hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"
                      aria-label="Email"
                    >
                      <Mail className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
