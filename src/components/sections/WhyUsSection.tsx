"use client";

import { motion } from "framer-motion";
import { Building2, Ruler, HardHat, TrendingUp } from "lucide-react";
import { fadeUp, staggerContainer, defaultTransition, viewportOnce } from "@/lib/animations";

const items = [
  {
    icon: Building2,
    title: "End-to-End Development",
    description: "Full lifecycle management from land acquisition to project completion.",
  },
  {
    icon: Ruler,
    title: "Quality Design",
    description: "Thoughtfully designed by experienced architects to maximize value.",
  },
  {
    icon: HardHat,
    title: "Construction Excellence",
    description: "Durable standards, efficient execution, and on-time delivery.",
  },
  {
    icon: TrendingUp,
    title: "Investment Opportunities",
    description: "Strategic real estate investments built for long-term growth.",
  },
];

export function WhyUsSection() {
  return (
    <section className="bg-white pt-12 pb-12 lg:pt-16 lg:pb-16 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">

        {/* Centered header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          transition={defaultTransition}
          className="mb-16 text-center"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Our Difference
          </span>
          <h2 className="mt-3 font-display text-4xl font-bold leading-tight text-accent sm:text-5xl">
            WHY <span className="text-primary">CHOOSE</span> US
          </h2>
          <div className="mt-4 mx-auto h-1 w-12 bg-primary rounded-full" />
          <p className="mt-5 text-lg leading-relaxed text-text-secondary max-w-xl mx-auto">
            Choosing the right developer means choosing trust, transparency, and results.
            Our hands-on approach and proven track record set us apart at every stage.
          </p>
        </motion.div>

        {/* Icon showcase — 4 columns with dividers */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid grid-cols-2 lg:grid-cols-4 gap-0.5 bg-border"
        >
          {items.map((item, i) => (
            <motion.div
              key={item.title}
              variants={fadeUp}
              transition={{ ...defaultTransition, delay: i * 0.1 }}
              className="group flex flex-col items-center text-center px-8 py-12 bg-white hover:bg-primary/2 transition-colors duration-300"
            >
              {/* Icon */}
              <div className="relative mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10 transition-colors duration-300 group-hover:bg-primary/15">
                <item.icon
                  className="h-10 w-10 text-primary transition-transform duration-300 group-hover:scale-110"
                  strokeWidth={1.75}
                />
              </div>

              {/* Red accent line — grows on hover */}
              <div className="h-0.5 w-0 bg-primary group-hover:w-8 transition-all duration-300 mb-4 rounded-full" />

              {/* Title */}
              <h3 className="font-bold text-accent text-lg mb-3 leading-snug transition-colors duration-300 group-hover:text-primary">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-sm leading-relaxed text-text-primary max-w-48">
                {item.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-0 h-0.5 bg-border" />

      </div>
    </section>
  );
}
