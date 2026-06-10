"use client";

import { motion } from "framer-motion";
import { MapPin, Compass, HardHat, BarChart3 } from "lucide-react";
import { fadeUp, slideInLeft, staggerContainer, defaultTransition, viewportOnce } from "@/lib/animations";

const services = [
  {
    number: "01",
    icon: MapPin,
    title: "Land Acquisition & Development",
    description:
      "Identifying and securing strategic development opportunities with strong growth potential.",
  },
  {
    number: "02",
    icon: Compass,
    title: "Planning & Design",
    description:
      "Collaborating with industry-leading architects, planners, and consultants to create exceptional developments.",
  },
  {
    number: "03",
    icon: HardHat,
    title: "Construction Management",
    description:
      "Managing all construction activities while maintaining quality, safety, and schedule performance.",
  },
  {
    number: "04",
    icon: BarChart3,
    title: "Real Estate Investment",
    description:
      "Partnering with investors through equity participation and joint venture opportunities.",
  },
];

export function ServicesSection() {
  return (
    <section className="bg-[var(--color-accent)] py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-[1fr_2fr] lg:gap-20 items-start">

          {/* Left — sticky heading */}
          <motion.div
            variants={slideInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            transition={defaultTransition}
            className="lg:sticky lg:top-32"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px w-10 bg-[var(--color-primary)]" />
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-primary)]">
                Our Expertise
              </span>
            </div>
            <h2 className="font-display text-4xl font-bold leading-tight text-white sm:text-5xl">
              What We{" "}
              <span className="text-[var(--color-primary)]">Do Best</span>
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-white/50">
              From identifying the right land to handing over keys — we manage
              every step with precision and care.
            </p>
          </motion.div>

          {/* Right — service list */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="flex flex-col divide-y divide-white/10"
          >
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.number}
                  variants={fadeUp}
                  transition={defaultTransition}
                  className="group flex items-start gap-6 py-8 first:pt-0 last:pb-0 transition-colors duration-300"
                >
                  {/* Number */}
                  <span className="mt-1 font-display text-xs font-bold tracking-widest text-[var(--color-primary)] opacity-70 group-hover:opacity-100 transition-opacity shrink-0">
                    {service.number}
                  </span>

                  {/* Icon */}
                  <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/10 text-white/40 transition-all duration-300 group-hover:border-[var(--color-primary)] group-hover:text-[var(--color-primary)] group-hover:bg-[var(--color-primary)]/10">
                    <Icon className="h-5 w-5" strokeWidth={1.5} />
                  </div>

                  {/* Text */}
                  <div className="flex flex-col gap-2">
                    <h3 className="font-semibold text-white group-hover:text-[var(--color-primary)] transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-white/45">
                      {service.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
