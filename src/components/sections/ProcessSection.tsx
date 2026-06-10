"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { fadeUp, defaultTransition, viewportOnce } from "@/lib/animations";

const steps = [
  {
    number: "01",
    icon: "/image/due deligence.png",
    title: "Due Diligence",
    description: "Comprehensive research and feasibility analysis to identify viable development opportunities.",
  },
  {
    number: "02",
    icon: "/image/acqution.png",
    title: "Acquisition",
    description: "Strategic acquisition of properties and land with strong development potential.",
  },
  {
    number: "03",
    icon: "/image/design and planning.png",
    title: "Design & Planning",
    description: "Developing architectural concepts and obtaining required approvals.",
  },
  {
    number: "04",
    icon: "/image/construction-preparation.png",
    title: "Construction Preparation",
    description: "Finalizing engineering, budgeting, and project planning.",
  },
  {
    number: "05",
    icon: "/image/construction.png",
    title: "Construction",
    description: "Executing projects with a focus on quality, efficiency, and safety.",
  },
  {
    number: "06",
    icon: "/image/project-completion.png",
    title: "Project Completion",
    description: "Delivering finished developments to homeowners, investors, and stakeholders.",
  },
];

const rows = [steps.slice(0, 3), steps.slice(3)];

export function ProcessSection() {
  return (
    <section className="bg-white pt-12 pb-12 lg:pt-16 lg:pb-16 overflow-hidden">
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
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            How We Work
          </span>
          <h2 className="mt-3 font-display text-4xl font-bold leading-tight text-accent sm:text-5xl">
            Our Development <span className="text-primary">Process</span>
          </h2>
          <div className="mt-4 mx-auto h-1 w-12 bg-primary rounded-full" />
          <p className="mt-5 text-lg leading-relaxed text-text-secondary max-w-md mx-auto">
            From vision to reality, we follow a proven process to deliver exceptional developments.
          </p>
        </motion.div>

        {/* Two-row stepper */}
        <div className="space-y-14 lg:space-y-16">
          {rows.map((rowSteps, rowIdx) => (
            <div key={rowIdx} className="relative">

              {/* Horizontal dashed connector — desktop only */}
              <div className="hidden lg:block absolute top-5 left-[16.67%] right-[16.67%] h-px border-t-2 border-dashed border-primary/20" />

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
                {rowSteps.map((step, i) => (
                  <motion.div
                    key={step.number}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportOnce}
                    transition={{ ...defaultTransition, delay: (rowIdx * 3 + i) * 0.1 }}
                    className="flex flex-col items-center text-center"
                  >
                    {/* Numbered circle */}
                    <div className="relative z-10 mb-6 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white text-sm font-bold shadow-[0_4px_20px_rgba(196,18,48,0.25)]">
                      {step.number}
                    </div>

                    {/* Icon */}
                    <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-white shadow-md">
                      <Image
                        src={step.icon}
                        alt={step.title}
                        width={44}
                        height={44}
                        className="object-contain"
                      />
                    </div>

                    {/* Title */}
                    <h3 className="mb-2 font-bold text-accent text-base">
                      {step.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm leading-relaxed text-text-secondary max-w-50">
                      {step.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
