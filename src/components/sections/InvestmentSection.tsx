"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { fadeUp, slideInLeft, slideInRight, defaultTransition, viewportOnce } from "@/lib/animations";

const pillars = [
  { number: "01", label: "Joint Ventures" },
  { number: "02", label: "Equity Participation" },
  { number: "03", label: "Land Partnerships" },
];

export function InvestmentSection() {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 min-h-110 overflow-hidden">

      {/* Left — floating photo collage */}
      <motion.div
        variants={slideInLeft}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        transition={defaultTransition}
        className="relative bg-[#0D0D1A] h-96 lg:h-auto overflow-hidden"
      >
        <div className="absolute inset-0 p-4 lg:px-16 lg:py-24 flex flex-col gap-3">

          {/* Top — full width large image */}
          <div className="relative rounded-2xl overflow-hidden" style={{ flex: 1.5 }}>
            <Image
              src="/image/hero-townhomes.png"
              alt="Georgian Bay Harbour"
              fill
              className="object-cover object-center"
              sizes="50vw"
            />
          </div>

          {/* Bottom — two equal images */}
          <div className="flex gap-3" style={{ flex: 1 }}>
            <div className="relative rounded-2xl overflow-hidden" style={{ flex: 1 }}>
              <Image
                src="/image/ChatGPT Image Jun 9, 2026, 10_37_44 AM.png"
                alt="AvranceCorp investment"
                fill
                className="object-cover object-center"
                sizes="25vw"
              />
            </div>
            <div className="relative rounded-2xl overflow-hidden" style={{ flex: 1.5 }}>
              <Image
                src="/image/hero-condos.png"
                alt="Lux Condos"
                fill
                className="object-cover object-center"
                sizes="25vw"
              />
            </div>
          </div>

        </div>

        {/* Blend into right panel */}
        <div className="absolute inset-0 pointer-events-none hidden lg:block bg-linear-to-r from-transparent via-transparent to-[#0D0D1A]/80" />
      </motion.div>

      {/* Right — content */}
      <motion.div
        variants={slideInRight}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        transition={defaultTransition}
        className="relative bg-[#0D0D1A] flex flex-col justify-center px-6 py-12 sm:px-10 sm:py-16 lg:px-16 xl:px-20"
      >
        {/* Subtle red glow */}
        <div className="absolute top-0 right-0 h-100 w-100 -translate-y-1/3 translate-x-1/3 rounded-full bg-primary opacity-[0.07] blur-[100px] pointer-events-none" />

        <div className="relative z-10">
          {/* Label */}
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Investment Opportunities
          </span>

          {/* Heading */}
          <h2 className="mt-3 font-display text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
            Partner <span className="text-primary">With Us</span>
          </h2>
          <div className="mt-4 h-1 w-12 bg-primary rounded-full" />

          {/* Body */}
          <p className="mt-6 text-base sm:text-lg leading-relaxed text-white/60 max-w-md">
            We actively collaborate with investors, landowners, and strategic partners
            to develop high-value real estate projects across Canada.
          </p>

          {/* Partnership types — elegant list */}
          <div className="mt-10 flex flex-col">
            {pillars.map((pillar, i) => (
              <motion.div
                key={pillar.label}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
                transition={{ ...defaultTransition, delay: i * 0.1 }}
                className="flex items-center gap-5 py-4 border-b border-white/10 first:border-t"
              >
                <span className="text-xs font-bold text-primary/60 tracking-widest w-6 shrink-0">
                  {pillar.number}
                </span>
                <span className="text-base font-semibold text-white/85">
                  {pillar.label}
                </span>
              </motion.div>
            ))}
          </div>

        </div>
      </motion.div>

    </section>
  );
}
