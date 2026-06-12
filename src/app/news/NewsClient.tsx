"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronRight, ChevronLeft, Calendar } from "lucide-react";

const PER_PAGE = 9;

const CATEGORIES = ["All", "Press Release", "Projects", "AvranceCorp Presents", "Industry"] as const;
type Category = typeof CATEGORIES[number];

function categorize(title: string): Category {
  const t = title.toLowerCase();
  if (
    t.includes("avrancecorp presents") ||
    t.includes("set to appear on") ||
    t.includes("drops by on") ||
    t.includes("weighs in on avrancecorp") ||
    t.includes("shares money-saving") ||
    t.includes("breaks down the problem") ||
    t.includes("reflects on 2025") ||
    t.includes("realtor david wiebe shares") ||
    t.includes("mats moy set to appear")
  ) return "AvranceCorp Presents";
  if (
    t.includes("georgian bay") ||
    t.includes("springbank") ||
    t.includes("t-city") ||
    t.includes("t city") ||
    t.includes("wasaga lux") ||
    t.includes("wayne lux")
  ) return "Projects";
  if (
    t.startsWith("the roi") ||
    t.startsWith("the rise") ||
    t.startsWith("the first-time") ||
    t.startsWith("sustainable development") ||
    t.startsWith("sustainable practices") ||
    t.startsWith("how immigration") ||
    t.startsWith("how canadian") ||
    t.startsWith("designing spacious") ||
    t.startsWith("4 reasons")
  ) return "Industry";
  return "Press Release";
}

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1], delay },
});

type NewsPost = {
  id: number;
  date: string;
  title: string;
  excerpt: string;
  link: string;
  image: string | null;
  slug?: string;
};

function stripHtml(html: string) {
  return html
    .replace(/<[^>]*>/g, "")
    .replace(/&[^;]+;/g, " ")
    .replace(/[—–]/g, ",")
    .replace(/\s{2,}/g, " ")
    .trim();
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-CA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function NewsClient({ posts }: { posts: NewsPost[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const page = Math.max(1, Number(searchParams.get("page") ?? "1"));
  const rawCategory = searchParams.get("category") ?? "All";
  const category: Category = CATEGORIES.includes(rawCategory as Category) ? (rawCategory as Category) : "All";

  const [featured, ...rest] = posts;

  function getPageRange(current: number, total: number): (number | "…")[] {
    if (total <= 5) return Array.from({ length: total }, (_, i) => i + 1);
    if (current <= 3) return [1, 2, 3, "…", total];
    if (current >= total - 2) return [1, "…", total - 2, total - 1, total];
    return [1, "…", current - 1, current, current + 1, "…", total];
  }

  const filtered = category === "All" ? rest : rest.filter(p => categorize(stripHtml(p.title)) === category);
  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  function goTo(p: number) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(p));
    router.push(`/news?${params.toString()}`, { scroll: true });
  }

  function selectCategory(cat: Category) {
    const params = new URLSearchParams();
    if (cat !== "All") params.set("category", cat);
    router.push(`/news?${params.toString()}`, { scroll: false });
  }

  return (
    <main className="overflow-hidden">

      {/* Hero */}
      <section className="bg-accent">
        <div className="mx-auto max-w-7xl px-6 pb-16 pt-24 sm:px-8 lg:px-12 lg:pb-20 lg:pt-32">
          <motion.div {...fadeUp(0)}>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Latest Updates</span>
          </motion.div>
          <motion.h1
            {...fadeUp(0.08)}
            className="mt-3 font-display text-5xl font-bold text-white sm:text-6xl lg:text-7xl"
          >
            News &amp; <span className="text-primary">Press</span>
          </motion.h1>
          <motion.div {...fadeUp(0.15)} className="mt-4 h-1 w-12 bg-primary rounded-full" />
          <motion.p {...fadeUp(0.2)} className="mt-6 text-lg text-white/60 max-w-2xl leading-relaxed">
            Stay updated with our latest developments, project milestones, and community initiatives. Select a category below to filter the news.
          </motion.p>
          <motion.div {...fadeUp(0.25)}>
            <nav className="mt-6 flex items-center gap-1.5 text-xs text-white/40">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <ChevronRight className="h-3 w-3" />
              <span className="text-white/70">News</span>
            </nav>
          </motion.div>
        </div>
      </section>

      {posts.length === 0 ? (
        <section className="bg-white">
          <div className="mx-auto max-w-7xl px-6 py-28 text-center">
            <p className="text-base text-text-secondary">No articles found.</p>
          </div>
        </section>
      ) : (
        <>
          {/* Featured article */}
          {featured && page === 1 && (
            <section className="bg-white border-b border-border">
              <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-12 lg:py-20">
                <motion.a
                  {...fadeUp(0)}
                  href={featured.slug ? `/news/${featured.slug}` : featured.link}
                  {...(!featured.slug ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="group grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16 items-center"
                >
                  <div className="relative aspect-video overflow-hidden rounded-2xl bg-bg-subtle">
                    {featured.image ? (
                      <Image
                        src={featured.image}
                        alt={stripHtml(featured.title)}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-linear-to-br from-accent to-accent/60" />
                    )}
                  </div>
                  <div>
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                      Latest
                    </span>
                    <h2 className="mt-3 font-display text-3xl font-bold leading-snug text-accent group-hover:text-primary transition-colors duration-200 sm:text-4xl">
                      {stripHtml(featured.title)}
                    </h2>
                    <p className="mt-4 text-base leading-relaxed text-text-secondary line-clamp-3">
                      {stripHtml(featured.excerpt)}
                    </p>
                    <div className="mt-5 flex items-center gap-4">
                      <span className="flex items-center gap-1.5 text-sm font-semibold text-text-secondary">
                        <Calendar className="h-4 w-4 text-primary" />
                        {formatDate(featured.date)}
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-sm font-bold text-primary group-hover:gap-2.5 transition-all duration-200">
                        Read More <ArrowRight className="h-4 w-4" />
                      </span>
                    </div>
                  </div>
                </motion.a>
              </div>
            </section>
          )}

          {/* Category filter */}
          <section className="bg-white border-b border-border">
            <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
              <div className="flex gap-0 overflow-x-auto scrollbar-none sm:justify-center">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => selectCategory(cat)}
                    className={`relative shrink-0 whitespace-nowrap px-4 py-4 text-sm font-semibold transition-colors duration-200 cursor-pointer sm:px-6 sm:py-5 sm:text-base ${
                      category === cat
                        ? "text-primary"
                        : "text-text-secondary hover:text-accent"
                    }`}
                  >
                    {cat}
                    {category === cat && (
                      <motion.div
                        layoutId="cat-underline"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full"
                        transition={{ duration: 0.2 }}
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* Article grid */}
          <section className="bg-white">
            <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-12 lg:py-24">

              <AnimatePresence mode="wait">
                <motion.div
                  key={page}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3"
                >
                  {paginated.map((post, i) => (
                    <motion.a
                      key={post.id}
                      {...fadeUp(i * 0.04)}
                      href={post.slug ? `/news/${post.slug}` : post.link}
                      {...(!post.slug ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className="group flex flex-col gap-4"
                    >
                      <div className="relative aspect-video overflow-hidden rounded-xl bg-accent/10">
                        {post.image ? (
                          <Image
                            src={post.image}
                            alt={stripHtml(post.title)}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          />
                        ) : (
                          <div className="absolute inset-0 bg-linear-to-br from-accent to-accent/60" />
                        )}
                      </div>
                      <div>
                        <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.15em] text-primary">
                          <Calendar className="h-3 w-3" />
                          {formatDate(post.date)}
                        </span>
                        <h3 className="mt-2 font-display text-lg font-bold leading-snug text-accent group-hover:text-primary transition-colors duration-200 line-clamp-2">
                          {stripHtml(post.title)}
                        </h3>
                        {stripHtml(post.excerpt) && (
                          <p className="mt-1.5 text-sm leading-relaxed text-text-secondary line-clamp-2">
                            {stripHtml(post.excerpt)}
                          </p>
                        )}
                      </div>
                    </motion.a>
                  ))}
                </motion.div>
              </AnimatePresence>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-16">
                  {/* Mobile: simplified prev / page info / next */}
                  <div className="flex sm:hidden items-center justify-between max-w-xs mx-auto">
                    <button
                      onClick={() => goTo(page - 1)}
                      disabled={page === 1}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-white text-accent transition-all hover:border-primary hover:text-primary disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>
                    <span className="text-sm font-semibold text-accent">
                      Page {page} of {totalPages}
                    </span>
                    <button
                      onClick={() => goTo(page + 1)}
                      disabled={page === totalPages}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-white text-accent transition-all hover:border-primary hover:text-primary disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Desktop: truncated page numbers */}
                  <div className="hidden sm:flex items-center justify-center gap-2">
                    <button
                      onClick={() => goTo(page - 1)}
                      disabled={page === 1}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-white text-accent transition-all hover:border-primary hover:text-primary disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>

                    {getPageRange(page, totalPages).map((p, i) =>
                      p === "…" ? (
                        <span key={`ellipsis-${i}`} className="flex h-10 w-8 items-center justify-center text-sm text-text-secondary select-none">…</span>
                      ) : (
                        <button
                          key={p}
                          onClick={() => goTo(p as number)}
                          className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold transition-all ${
                            p === page
                              ? "bg-primary text-white shadow-md shadow-primary/25"
                              : "border border-border bg-white text-accent hover:border-primary hover:text-primary"
                          }`}
                        >
                          {p}
                        </button>
                      )
                    )}

                    <button
                      onClick={() => goTo(page + 1)}
                      disabled={page === totalPages}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-white text-accent transition-all hover:border-primary hover:text-primary disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              )}

              <p className="mt-6 text-center text-sm font-semibold text-accent">
                Page {page} of {totalPages} · {filtered.length} articles
              </p>

            </div>
          </section>
        </>
      )}

      {/* CTA */}
      <div className="bg-primary">
        <div className="mx-auto max-w-7xl px-6 py-10 sm:px-8 lg:px-12">
          <div className="flex flex-col items-center justify-between gap-5 sm:flex-row">
            <p className="font-display text-xl font-bold text-white sm:text-2xl lg:text-3xl text-center sm:text-left">
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

    </main>
  );
}
