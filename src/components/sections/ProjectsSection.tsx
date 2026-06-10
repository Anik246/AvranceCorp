"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, MapPin } from "lucide-react";
import { fadeUp, staggerContainer, defaultTransition, viewportOnce } from "@/lib/animations";

const projects = [
  {
    title: "Georgian Bay Harbour",
    location: "Ontario, Canada",
    type: "Residential",
    status: "Completed",
    description: "Thoughtfully designed townhomes with modern amenities tailored for growing families.",
    image: "/image/hero-townhomes.png",
  },
  {
    title: "Lux Condos",
    location: "Ontario, Canada",
    type: "Condo",
    status: "Completed",
    description: "Premium condominium residences built for urban professionals seeking refined living.",
    image: "/image/hero-condos.png",
  },
  {
    title: "Georgian Bay Terrace",
    location: "Ontario, Canada",
    type: "Mixed-Use",
    status: "In Progress",
    description: "A vibrant mixed-use community blending residential and commercial spaces.",
    image: null,
    gradient: "from-[#C41230] via-[#9B0E26] to-[#1A1A2E]",
  },
];

export function ProjectsSection() {
  return (
    <section className="bg-bg-subtle pt-12 pb-24 lg:pt-16 lg:pb-32 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">

        {/* Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          transition={defaultTransition}
          className="mb-12 flex items-end justify-between gap-6"
        >
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Our Portfolio
            </span>
            <h2 className="mt-3 font-display text-4xl font-bold leading-tight text-accent sm:text-5xl">
              Our Featured <span className="text-primary">Projects</span>
            </h2>
            <div className="mt-4 h-1 w-12 bg-primary rounded-full" />
            <p className="mt-4 text-lg leading-relaxed text-text-secondary max-w-md">
              Go through our project portfolio below. We have over 2,000 units currently under development. Vast majority of these units will be released to the public for sale starting from 2022.
            </p>
          </div>

          <Link
            href="/properties"
            className="shrink-0 inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition-colors duration-200 hover:bg-primary-dark"
          >
            Browse All
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              variants={fadeUp}
              transition={{ ...defaultTransition, delay: i * 0.12 }}
              className="group cursor-pointer overflow-hidden rounded-2xl shadow-[0_4px_30px_rgba(0,0,0,0.10)] hover:shadow-[0_12px_50px_rgba(0,0,0,0.18)] transition-shadow duration-300"
            >
              {/* Image — fully visible, no overlay */}
              <div className="relative h-64 overflow-hidden">
                {project.image ? (
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                ) : (
                  <div className={`absolute inset-0 bg-linear-to-br ${project.gradient}`} />
                )}

                {/* Status badge */}
                <div className={`absolute right-4 top-4 rounded-full px-3 py-1 text-xs font-semibold text-white ${project.status === "Completed" ? "bg-primary" : "bg-accent/80 backdrop-blur-sm"}`}>
                  {project.status}
                </div>
              </div>

              {/* Dark content panel */}
              <div className="bg-accent px-6 py-5">
                {/* Red accent line */}
                <div className="mb-4 h-0.5 w-8 bg-primary transition-all duration-300 group-hover:w-14" />

                {/* Title */}
                <h3 className="font-display text-xl font-bold leading-snug text-white mb-2 transition-colors duration-300 group-hover:text-primary">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-sm leading-relaxed text-white/70 line-clamp-2 mb-4">
                  {project.description}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between border-t border-white/10 pt-4">
                  <div className="flex items-center gap-1.5 text-xs text-white/60">
                    <MapPin className="h-3.5 w-3.5 shrink-0" />
                    {project.location}
                  </div>
                  <Link
                    href="/properties"
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 text-white transition-all duration-300 group-hover:border-primary group-hover:bg-primary"
                  >
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
