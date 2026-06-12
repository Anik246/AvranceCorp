"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";
import { fadeUp, slideInLeft, slideInRight, defaultTransition, viewportOnce } from "@/lib/animations";

type Post = {
  id: number;
  date: string;
  title: string;
  excerpt: string;
  image: string | null;
  slug: string;
};

function stripHtml(html: string) {
  return html.replace(/<[^>]*>/g, "").replace(/&[^;]+;/g, " ").replace(/[—–]/g, ",").replace(/\s{2,}/g, " ").trim();
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-CA", { year: "numeric", month: "long", day: "numeric" });
}

function categorize(title: string): string {
  const t = title.toLowerCase();
  if (t.includes("avrancecorp presents") || t.includes("set to appear on") || t.includes("drops by on") || t.includes("weighs in on avrancecorp")) return "AvranceCorp Presents";
  if (t.includes("georgian bay") || t.includes("springbank") || t.includes("t-city") || t.includes("t city") || t.includes("wasaga lux") || t.includes("wayne lux")) return "Projects";
  if (t.startsWith("the roi") || t.startsWith("the rise") || t.startsWith("the first-time") || t.startsWith("sustainable") || t.startsWith("how immigration") || t.startsWith("how canadian") || t.startsWith("designing") || t.startsWith("4 reasons")) return "Industry";
  return "Press Release";
}

export function BlogSection({ posts }: { posts: Post[] }) {
  const [featured, ...rest] = posts;
  const sideArticles = rest.slice(0, 2);

  if (!featured) return null;

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
            <h2 className="mt-3 font-display text-3xl font-bold leading-tight text-accent sm:text-4xl lg:text-5xl">
              From Our <span className="text-primary">Newsroom</span>
            </h2>
            <div className="mt-4 h-1 w-12 bg-primary rounded-full" />
            <p className="mt-4 text-base text-text-primary sm:text-lg">
              Project updates, market insights, and company news from AvranceCorp.
            </p>
          </div>
          <Link
            href="/news"
            className="hidden sm:inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-primary hover:text-primary-dark transition-colors duration-200"
          >
            View All Articles
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>

        {/* ── Mobile layout ───────────────────────────────────────── */}
        <div className="sm:hidden flex flex-col gap-6">
          {posts.slice(0, 3).map((post, i) => (
            <Link key={post.id} href={`/news/${post.slug}`}>
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
                transition={{ ...defaultTransition, delay: i * 0.08 }}
                className="group"
              >
                <div className="relative aspect-video w-full overflow-hidden rounded-lg mb-3">
                  {post.image ? (
                    <Image src={post.image} alt={stripHtml(post.title)} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="100vw" />
                  ) : (
                    <div className="absolute inset-0 bg-linear-to-br from-accent to-primary" />
                  )}
                </div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
                    {categorize(stripHtml(post.title))}
                  </span>
                  <span className="text-[10px] text-text-secondary">·</span>
                  <span className="text-[10px] text-text-secondary">{formatDate(post.date)}</span>
                </div>
                <h3 className="text-sm font-bold text-accent leading-snug line-clamp-2 group-hover:text-primary transition-colors duration-200">
                  {stripHtml(post.title)}
                </h3>
              </motion.div>
            </Link>
          ))}

          <Link
            href="/news"
            className="mt-1 w-full justify-center inline-flex items-center gap-2 rounded-md bg-primary px-8 py-4 text-base font-semibold text-white shadow-lg shadow-primary/20 transition-colors duration-200 hover:bg-primary-dark"
          >
            View All Articles
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* ── Desktop layout ──────────────────────────────────────── */}
        <div className="hidden sm:grid grid-cols-1 gap-8 lg:grid-cols-[1.6fr_1fr]">

          {/* Featured article */}
          <Link href={`/news/${featured.slug}`}>
            <motion.div
              variants={slideInLeft}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              transition={defaultTransition}
              className="group cursor-pointer"
            >
              <div className="relative h-72 rounded-2xl overflow-hidden sm:h-80 lg:h-96">
                {featured.image ? (
                  <Image src={featured.image} alt={stripHtml(featured.title)} fill className="object-cover object-top transition-transform duration-500 group-hover:scale-105" sizes="(max-width: 1024px) 100vw, 60vw" />
                ) : (
                  <div className="absolute inset-0 bg-linear-to-br from-accent to-primary" />
                )}
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute top-4 left-4 rounded bg-primary px-3 py-1">
                  <span className="text-xs font-semibold text-white">{categorize(stripHtml(featured.title))}</span>
                </div>
              </div>
              <div className="mt-5">
                <div className="flex items-center gap-4 text-sm text-text-primary mb-3">
                  <span className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" />{formatDate(featured.date)}</span>
                </div>
                <h3 className="font-display text-2xl font-bold text-accent leading-snug group-hover:text-primary transition-colors duration-300 sm:text-3xl">
                  {stripHtml(featured.title)}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-text-primary line-clamp-2">
                  {stripHtml(featured.excerpt)}
                </p>
                <div className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary group-hover:gap-3 transition-all duration-200">
                  Read More <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            </motion.div>
          </Link>

          {/* Side articles */}
          <motion.div
            variants={slideInRight}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            transition={defaultTransition}
            className="flex flex-col gap-6"
          >
            {sideArticles.map((post, i) => (
              <Link key={post.id} href={`/news/${post.slug}`}>
                <motion.div
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewportOnce}
                  transition={{ ...defaultTransition, delay: i * 0.1 }}
                  className="group flex gap-4 cursor-pointer"
                >
                  <div className="relative h-28 w-28 shrink-0 rounded-xl overflow-hidden">
                    {post.image ? (
                      <Image src={post.image} alt={stripHtml(post.title)} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="112px" />
                    ) : (
                      <div className="absolute inset-0 bg-linear-to-br from-accent to-primary" />
                    )}
                  </div>
                  <div className="flex flex-col justify-center">
                    <span className="text-xs font-semibold uppercase tracking-widest text-primary mb-1">
                      {categorize(stripHtml(post.title))}
                    </span>
                    <h3 className="text-base font-bold text-accent leading-snug group-hover:text-primary transition-colors duration-300 line-clamp-3">
                      {stripHtml(post.title)}
                    </h3>
                    <div className="mt-2 flex items-center gap-3 text-sm text-text-primary">
                      <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{formatDate(post.date)}</span>
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
