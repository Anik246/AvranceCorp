"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, MapPin } from "lucide-react";
import { fadeUp, staggerContainer, defaultTransition, viewportOnce } from "@/lib/animations";
import { featuredProjects as projects } from "@/data/projects";
import type { Project } from "@/data/projects";

function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href="/properties"
      className="group block overflow-hidden rounded-2xl shadow-[0_4px_30px_rgba(0,0,0,0.10)] hover:shadow-[0_12px_50px_rgba(0,0,0,0.18)] transition-shadow duration-300"
    >
      <div className="relative h-52 sm:h-64 overflow-hidden">
        {project.image ? (
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 640px) 90vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className={`absolute inset-0 bg-linear-to-br ${project.gradient}`} />
        )}
      </div>

      <div className="bg-accent px-6 py-5">
        <div className="mb-4 h-0.5 w-8 bg-primary transition-all duration-300 group-hover:w-14" />
        <h3 className="font-display text-xl font-bold leading-snug text-white mb-2 transition-colors duration-300 group-hover:text-primary">
          {project.title}
        </h3>
        <p className="text-sm leading-relaxed text-white/70 line-clamp-2 mb-4">
          {project.description}
        </p>
        <div className="flex items-center justify-between border-t border-white/10 pt-4">
          <div className="flex items-center gap-1.5 text-xs text-white/85">
            <MapPin className="h-3.5 w-3.5 shrink-0" />
            {project.location}
          </div>
          <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 text-white transition-all duration-300 group-hover:border-primary group-hover:bg-primary">
            <ArrowRight className="h-3.5 w-3.5" />
          </div>
        </div>
      </div>
    </Link>
  );
}

export function ProjectsSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    const maxScroll = scrollWidth - clientWidth;
    if (maxScroll <= 0) return;
    const index = Math.round((scrollLeft / maxScroll) * (projects.length - 1));
    setActiveIndex(index);
  };

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
          className="mb-12 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Our Portfolio
            </span>
            <h2 className="mt-3 font-display text-3xl font-bold leading-tight text-accent sm:text-4xl lg:text-5xl">
              Our Featured <span className="text-primary">Projects</span>
            </h2>
            <div className="mt-4 h-1 w-12 bg-primary rounded-full" />
            <p className="mt-4 text-base leading-relaxed text-text-secondary max-w-md sm:text-lg">
              Go through our project portfolio below. We have over 7,000 units currently under development across Canada and the United States.
            </p>
          </div>

          {/* Browse All — desktop only in header */}
          <Link
            href="/properties"
            className="hidden sm:inline-flex items-center gap-2 rounded-md bg-primary px-8 py-4 text-base font-semibold text-white shadow-lg shadow-primary/20 transition-colors duration-200 hover:bg-primary-dark"
          >
            Browse All
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>

        {/* Mobile carousel */}
        <div className="sm:hidden">
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory -mx-6 px-6 pb-2 scrollbar-none [&::-webkit-scrollbar]:hidden"
          >
            {projects.map((project) => (
              <div key={project.title} className="w-[85vw] shrink-0 snap-center">
                <ProjectCard project={project} />
              </div>
            ))}
          </div>

          {/* Dot indicators */}
          <div className="mt-5 flex justify-center gap-2">
            {projects.map((_, i) => (
              <span
                key={i}
                className={`block rounded-full transition-all duration-300 ${
                  i === activeIndex ? "w-6 h-1.5 bg-primary" : "w-1.5 h-1.5 bg-border"
                }`}
              />
            ))}
          </div>

          {/* Browse All — mobile only below carousel */}
          <Link
            href="/properties"
            className="mt-6 w-full justify-center inline-flex items-center gap-2 rounded-md bg-primary px-8 py-4 text-base font-semibold text-white shadow-lg shadow-primary/20 transition-colors duration-200 hover:bg-primary-dark"
          >
            Browse All
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Desktop grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              variants={fadeUp}
              transition={{ ...defaultTransition, delay: i * 0.12 }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
