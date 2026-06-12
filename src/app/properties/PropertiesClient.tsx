"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, ArrowRight } from "lucide-react";

const MotionLink = motion.create(Link);
import { projects, completedProjects } from "@/data/projects";

const FILTERS = ["All", "Ontario", "Michigan", "Ongoing"] as const;
type Filter = (typeof FILTERS)[number];

function getFiltered(active: Filter) {
  if (active === "All") return projects;
  if (active === "Ongoing") return projects.filter((p) => p.status === "Ongoing");
  return projects.filter((p) => p.location.includes(active));
}

function getCount(filter: Filter) {
  return getFiltered(filter).length;
}

export function PropertiesClient() {
  const [active, setActive] = useState<Filter>("All");
  const filtered = getFiltered(active);

  return (
    <>
      {/* Section */}
      <div className="border-b border-border bg-white sticky top-0 z-10 shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="flex gap-2 overflow-x-auto py-4 scrollbar-none">
            {FILTERS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActive(tab)}
                className={`shrink-0 inline-flex items-center gap-2.5 rounded-full px-6 py-2.5 text-base font-semibold transition-all duration-200 ${
                  active === tab
                    ? "bg-primary text-white shadow-md shadow-primary/25"
                    : "text-text-secondary hover:bg-primary/5 hover:text-primary"
                }`}
              >
                {tab}
                <span
                  className={`inline-flex h-6 min-w-6 items-center justify-center rounded-full px-1.5 text-xs font-bold transition-all duration-200 ${
                    active === tab
                      ? "bg-white/25 text-white"
                      : "bg-primary/10 text-primary"
                  }`}
                >
                  {getCount(tab)}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Section */}
      <div className="mx-auto max-w-7xl px-6 py-12 sm:px-8 lg:px-12 lg:py-16">

        {/* Result label */}
        <div className="mb-8 flex items-center justify-between">
          <p className="text-base font-semibold text-accent sm:text-lg">
            <span className="text-primary">{filtered.length}</span>{" "}
            project{filtered.length !== 1 ? "s" : ""}
            {active !== "All" && (
              <> in <span className="text-primary">{active}</span></>
            )}
          </p>
          {active !== "All" && (
            <button
              onClick={() => setActive("All")}
              className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/8 px-4 py-1.5 text-xs font-semibold text-primary transition-all duration-200 hover:bg-primary hover:text-white"
            >
              × Clear filter
            </button>
          )}
        </div>

        <motion.div
          layout
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <MotionLink
                key={`${active}-${project.slug}`}
                href={`/properties/${project.slug}`}
                layout
                initial={{ opacity: 0, y: 24, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -12, scale: 0.95 }}
                transition={{ duration: 0.3, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                className="group block overflow-hidden rounded-2xl bg-white shadow-[0_4px_24px_rgba(0,0,0,0.08)] hover:shadow-[0_16px_48px_rgba(196,18,48,0.18)] hover:-translate-y-1 transition-all duration-300"
              >
                {/* Image / Gradient */}
                <div className="relative h-56 overflow-hidden">
                  {project.image ? (
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  ) : (
                    <div className={`absolute inset-0 bg-linear-to-br ${project.gradient}`} />
                  )}

                  {/* Dark overlay for depth */}
                  <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent" />

                  {/* Status badge */}
                  <div className="absolute bottom-4 left-4">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-black/40 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-sm">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                      {project.status}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="bg-accent px-6 py-6">
                  {/* Red accent bar */}
                  <div className="mb-4 h-0.5 w-8 bg-primary transition-all duration-300 group-hover:w-16" />

                  <h3 className="font-display text-xl font-bold leading-snug text-white mb-2.5 transition-colors duration-300 group-hover:text-primary">
                    {project.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-white/60 line-clamp-2 mb-5">
                    {project.description}
                  </p>

                  {/* Footer row */}
                  <div className="flex items-center justify-between border-t border-white/10 pt-4">
                    <div className="flex items-center gap-1.5 text-xs font-medium text-white/70">
                      <MapPin className="h-3.5 w-3.5 shrink-0 text-primary" />
                      {project.location}
                    </div>
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-white/50 transition-colors duration-300 group-hover:text-primary">
                      View Details
                      <ArrowRight className="h-3 w-3" />
                    </span>
                  </div>
                </div>
              </MotionLink>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="py-24 text-center">
            <p className="text-text-muted text-4xl mb-4">—</p>
            <p className="text-lg font-medium text-text-secondary">No projects found for this filter.</p>
            <button
              onClick={() => setActive("All")}
              className="mt-4 text-sm font-semibold text-primary hover:underline"
            >
              View all projects
            </button>
          </div>
        )}
      </div>

      {/* Section */}
      <div className="bg-[#0D0D1A] relative overflow-hidden">
        {/* Decorative background number */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 font-display text-[18rem] font-black leading-none text-white/2.5 select-none pointer-events-none hidden lg:block">
          JV
        </div>

        <div className="relative mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-12 lg:py-24">

          {/* Header */}
          <div className="mb-12 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                Joint Ventures
              </span>
              <h2 className="mt-3 font-display text-3xl font-bold leading-tight text-white sm:text-4xl">
                Completed <span className="text-primary">Projects</span>
              </h2>
              <div className="mt-4 h-1 w-12 bg-primary rounded-full" />
              <p className="mt-4 text-base leading-relaxed text-white/45 max-w-lg">
                A selection of successfully delivered joint venture developments across Toronto.
              </p>
            </div>
            <div className="shrink-0">
              <span className="font-display text-5xl font-black text-white/[0.07] select-none">
                {completedProjects.length}
              </span>
              <p className="text-xs font-semibold uppercase tracking-widest text-white/25 -mt-1">
                Completed
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {completedProjects.map((project, i) => (
              <div
                key={project.title}
                className="group overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-1"
              >
                {/* Image or gradient top */}
                <div className={`relative h-44 ${!project.image ? `bg-linear-to-br ${project.gradient}` : ""}`}>
                  {project.image && (
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover object-center"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                  )}
                  {/* Overlay for depth */}
                  <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent" />

                  {/* Completed badge */}
                  <div className="absolute bottom-4 left-4">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-black/30 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-white/80 backdrop-blur-sm">
                      <span className="h-1.5 w-1.5 rounded-full bg-white/50" />
                      Completed
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="bg-white/4 border border-white/6 rounded-b-2xl px-5 py-5 backdrop-blur-sm">
                  <div className="mb-3 h-0.5 w-6 bg-primary transition-all duration-300 group-hover:w-10" />
                  <h3 className="font-display text-base font-bold text-white leading-tight group-hover:text-primary transition-colors duration-200">
                    {project.title}
                  </h3>
                  <div className="mt-2.5 flex items-center gap-1.5 text-xs text-white/45">
                    <MapPin className="h-3 w-3 shrink-0 text-primary/70" />
                    {project.location}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Section */}
      <div className="bg-primary">
        <div className="mx-auto max-w-7xl px-6 py-8 sm:px-8 lg:px-12">
          <div className="flex flex-col items-center justify-between gap-5 sm:flex-row">
            <p className="font-display text-xl font-bold text-white sm:text-2xl lg:text-3xl">
              Are you looking for a Joint Venture partnership?
            </p>
            <Link
              href="/contact"
              className="shrink-0 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-bold text-primary transition-all duration-200 hover:bg-white/90 hover:shadow-lg"
            >
              Contact Us
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
