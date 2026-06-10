"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { fadeUp, slideInLeft, slideInRight, defaultTransition, viewportOnce } from "@/lib/animations";

const featured = {
  category: "Project Update",
  title: "Georgian Bay Harbour: A New Standard for Residential Living in Ontario",
  excerpt:
    "Our latest development redefines community living with thoughtfully designed townhomes, green spaces, and modern amenities tailored for growing families.",
  date: "June 2, 2026",
  readTime: "5 min read",
  image: "/image/hero-townhomes.png",
};

const articles = [
  {
    category: "Real Estate Insights",
    title: "Why Ontario Remains Canada's Top Real Estate Investment Market",
    date: "May 20, 2026",
    readTime: "3 min read",
    image: "/image/hero-condos.png",
  },
  {
    category: "Company News",
    title: "AvranceCorp Breaks Ground on New Mixed-Use Development in Alberta",
    date: "May 8, 2026",
    readTime: "4 min read",
    image: null,
  },
];

export function BlogSection() {
  return (
    <section className="bg-white pt-12 pb-24 lg:pt-16 lg:pb-32 overflow-hidden">
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
              Latest News
            </span>
            <h2 className="mt-3 font-display text-4xl font-bold leading-tight text-accent sm:text-5xl">
              From Our <span className="text-primary">Blog</span>
            </h2>
            <div className="mt-4 h-1 w-12 bg-primary rounded-full" />
            <p className="mt-4 text-lg text-text-primary">
              Project updates, market insights, and company news from AvranceCorp.
            </p>
          </div>

          <Link
            href="/blog"
            className="hidden sm:inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-primary hover:text-primary-dark transition-colors duration-200"
          >
            View All Posts
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>

        {/* ── Mobile layout ───────────────────────────────────────── */}
        <div className="sm:hidden space-y-4">

          {/* Featured — editorial overlay card */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            transition={defaultTransition}
            className="group relative h-72 rounded-2xl overflow-hidden cursor-pointer"
          >
            <Image
              src={featured.image}
              alt={featured.title}
              fill
              className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
              sizes="100vw"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/30 to-transparent" />

            {/* Category badge */}
            <div className="absolute top-4 left-4 rounded-full bg-primary px-3 py-1">
              <span className="text-xs font-semibold text-white">{featured.category}</span>
            </div>

            {/* Bottom text */}
            <div className="absolute bottom-0 left-0 right-0 p-5">
              <div className="flex items-center gap-3 text-xs text-white/85 mb-2">
                <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{featured.date}</span>
                <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{featured.readTime}</span>
              </div>
              <h3 className="font-display text-lg font-bold text-white leading-snug line-clamp-2 group-hover:text-primary/90 transition-colors duration-300">
                {featured.title}
              </h3>
              <div className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-primary">
                Read More <ArrowRight className="h-3 w-3" />
              </div>
            </div>
          </motion.div>

          {/* Two supporting articles — 2-column grid */}
          <div className="grid grid-cols-2 gap-3">
            {articles.map((article, i) => (
              <motion.div
                key={article.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
                transition={{ ...defaultTransition, delay: i * 0.1 }}
                className="group cursor-pointer rounded-xl overflow-hidden bg-white shadow-[0_2px_16px_rgba(0,0,0,0.08)]"
              >
                {/* Image */}
                <div className="relative h-28 overflow-hidden">
                  {article.image ? (
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="50vw"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-linear-to-br from-accent to-primary" />
                  )}
                  <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent" />
                </div>
                {/* Text */}
                <div className="p-3">
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-primary">
                    {article.category}
                  </span>
                  <h3 className="mt-1 text-xs font-bold text-accent leading-snug line-clamp-3 group-hover:text-primary transition-colors duration-300">
                    {article.title}
                  </h3>
                  <p className="mt-1.5 text-[10px] text-text-secondary font-medium">{article.date}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* View All — full width CTA */}
          <Link
            href="/blog"
            className="mt-2 w-full justify-center inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition-colors duration-200 hover:bg-primary-dark"
          >
            View All Posts
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* ── Desktop layout (unchanged) ──────────────────────────── */}
        <div className="hidden sm:grid grid-cols-1 gap-8 lg:grid-cols-[1.6fr_1fr]">

          {/* Featured article */}
          <motion.div
            variants={slideInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            transition={defaultTransition}
            className="group cursor-pointer"
          >
            <div className="relative h-72 rounded-2xl overflow-hidden sm:h-80 lg:h-96">
              <Image
                src={featured.image}
                alt={featured.title}
                fill
                className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 60vw"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute top-4 left-4 rounded-full bg-primary px-3 py-1">
                <span className="text-xs font-semibold text-white">{featured.category}</span>
              </div>
            </div>
            <div className="mt-5">
              <div className="flex items-center gap-4 text-sm text-text-primary mb-3">
                <span className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" />{featured.date}</span>
                <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" />{featured.readTime}</span>
              </div>
              <h3 className="font-display text-2xl font-bold text-accent leading-snug group-hover:text-primary transition-colors duration-300 sm:text-3xl">
                {featured.title}
              </h3>
              <p className="mt-3 text-base leading-relaxed text-text-primary line-clamp-2">
                {featured.excerpt}
              </p>
              <div className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary group-hover:gap-3 transition-all duration-200">
                Read More <ArrowRight className="h-4 w-4" />
              </div>
            </div>
          </motion.div>

          {/* Side articles */}
          <motion.div
            variants={slideInRight}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            transition={defaultTransition}
            className="flex flex-col gap-6"
          >
            {articles.map((article, i) => (
              <motion.div
                key={article.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
                transition={{ ...defaultTransition, delay: i * 0.1 }}
                className="group flex gap-4 cursor-pointer"
              >
                <div className="relative h-28 w-28 shrink-0 rounded-xl overflow-hidden">
                  {article.image ? (
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="112px"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-linear-to-br from-accent to-primary" />
                  )}
                </div>
                <div className="flex flex-col justify-center">
                  <span className="text-xs font-semibold uppercase tracking-widest text-primary mb-1">
                    {article.category}
                  </span>
                  <h3 className="text-base font-bold text-accent leading-snug group-hover:text-primary transition-colors duration-300 line-clamp-3">
                    {article.title}
                  </h3>
                  <div className="mt-2 flex items-center gap-3 text-sm text-text-primary">
                    <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{article.date}</span>
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{article.readTime}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
