"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { BuildingWatermark } from "@/components/ui/BuildingWatermark";
import { fadeUp, defaultTransition, viewportOnce } from "@/lib/animations";

export function CtaSection() {
  return (
    <section className="relative overflow-hidden bg-linear-to-br from-white via-[#FFF5F5] to-[#FFE8E8] py-24 lg:py-32">
      <BuildingWatermark className="absolute bottom-0 right-0 h-[60%] text-accent opacity-[0.04] pointer-events-none" />

      <div className="mx-auto max-w-4xl px-6 sm:px-8 lg:px-12 text-center">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          transition={defaultTransition}
        >
          {/* Label */}
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Work With Us
          </span>

          {/* Heading */}
          <h2 className="mt-3 font-display text-4xl font-bold leading-tight text-accent sm:text-5xl lg:text-6xl">
            Build With the <span className="text-primary">Best</span>
          </h2>

          {/* Accent line */}
          <div className="mt-4 mx-auto h-1 w-12 bg-primary rounded-full" />

          {/* Body */}
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-text-secondary">
            Whether you&apos;re a homebuyer, investor, or development partner,
            our team is here to guide you every step of the way.
          </p>

          {/* Buttons */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-md bg-primary px-8 py-4 text-base font-semibold text-white shadow-lg shadow-primary/25 transition-colors duration-200 hover:bg-primary-dark"
            >
              Contact Us
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/properties"
              className="inline-flex items-center gap-2 rounded-md border border-border px-8 py-4 text-base font-semibold text-accent transition-all duration-200 hover:border-primary hover:text-primary"
            >
              Explore Projects
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
