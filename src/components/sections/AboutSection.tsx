"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { fadeUp, slideInLeft, slideInRight, defaultTransition, viewportOnce, staggerContainer } from "@/lib/animations";

const highlights = [
  { value: "2016",   label: "Year Founded" },
  { value: "7,000+", label: "Residential Units" },
  { value: "$4B+",   label: "Portfolio Value" },
  { value: "Canada\n& USA", label: "Operations" },
];

export function AboutSection() {
  return (
    <section className="relative overflow-hidden bg-bg pt-24 pb-12 lg:pt-32 lg:pb-16">

      {/* Background image */}
      <Image
        src="/image/bg.png"
        alt=""
        fill
        className="object-cover object-center pointer-events-none select-none"
        sizes="100vw"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24 items-center">

          {/* Left — text */}
          <motion.div
            variants={slideInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            transition={defaultTransition}
          >
            <div className="mb-6">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                About AvranceCorp
              </span>
            </div>

            <h2 className="font-display text-3xl font-bold leading-tight text-accent sm:text-4xl lg:text-5xl">
              Connecting People, Passion{" "}
              <span className="text-primary">and Purpose to Place</span>
            </h2>
            <div className="mt-4 h-1 w-12 bg-primary rounded-full" />

            <div className="mt-8 space-y-5 text-base leading-relaxed text-text-primary">
              <p>
                Founded in 2016, AvranceCorp Developments is a Tarion-licensed Canadian real estate developer with a $4B+ portfolio and 7,000+ residential units in active development across Ontario and the United States.
              </p>
              <p>
                Guided by urban planning principles and a commitment to innovation, our team manages every stage of the development lifecycle — from land acquisition and planning through design, construction, and project delivery. We create sustainable communities that balance affordability, investor value, and long-term quality of life.
              </p>
            </div>
          </motion.div>

          {/* Right — highlights grid */}
          <motion.div
            variants={slideInRight}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            transition={defaultTransition}
            className="relative"
          >
            {/* Background decorative element */}
            <div className="absolute -inset-4 rounded-2xl bg-white shadow-[0_8px_40px_rgba(0,0,0,0.12)]" />

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              className="relative grid grid-cols-2 gap-px bg-border rounded-2xl overflow-hidden shadow-[0_8px_40px_rgba(0,0,0,0.15)]"
            >
              {highlights.map((item) => (
                <motion.div
                  key={item.label}
                  variants={fadeUp}
                  transition={defaultTransition}
                  className="flex flex-col items-center justify-center gap-2 bg-white p-6 sm:p-10 text-center"
                >
                  <span className="font-display text-3xl font-bold whitespace-pre-line text-accent leading-tight">
                    {item.value}
                  </span>
                  <span className="text-xs font-medium uppercase tracking-widest text-text-muted">
                    {item.label}
                  </span>
                </motion.div>
              ))}
            </motion.div>

            {/* Red accent corner */}
            <div className="absolute -bottom-3 -right-3 h-16 w-16 rounded-br-2xl bg-primary" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
