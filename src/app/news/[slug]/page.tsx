import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, ArrowRight, ChevronRight, Clock } from "lucide-react";
import allPostsRaw from "@/data/news.json";

type Post = {
  id: number;
  date: string;
  title: string;
  excerpt: string;
  content?: string;
  link: string;
  image: string | null;
  slug: string;
};

const allPosts = allPostsRaw as Post[];

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-CA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function stripHtml(html: string) {
  return html
    .replace(/<[^>]*>/g, "")
    .replace(/&[^;]+;/g, " ")
    .replace(/[—–]/g, ",")
    .replace(/\s{2,}/g, " ")
    .trim();
}

function cleanExcerptHtml(html: string) {
  return html
    .replace(/<a[^>]*class="more-link"[^>]*>[\s\S]*?<\/a>/g, "")
    .replace(/&hellip;/g, "...")
    .replace(/&nbsp;/g, " ")
    .replace(/&#8211;/g, "–")
    .replace(/&#8212;/g, "—")
    .replace(/&#8220;/g, "“")
    .replace(/&#8221;/g, "”")
    .replace(/&#8216;/g, "‘")
    .replace(/&#8217;/g, "’")
    .trim();
}

function getReadingTime(html: string): number {
  const text = html.replace(/<[^>]*>/g, "");
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

function categorize(title: string): string {
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

export async function generateStaticParams() {
  return allPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = allPosts.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: `${stripHtml(post.title)} | AvranceCorp`,
    description: stripHtml(post.excerpt).slice(0, 160),
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = allPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  const category = categorize(stripHtml(post.title));
  const postIndex = allPosts.indexOf(post);
  const others = [...allPosts.slice(0, postIndex), ...allPosts.slice(postIndex + 1)];
  const sameCategory = others.filter((p) => categorize(stripHtml(p.title)) === category);
  const relatedArticles = (sameCategory.length >= 3 ? sameCategory : [...sameCategory, ...others.filter((p) => !sameCategory.includes(p))]).slice(0, 3);

  const rawBody = post.content ?? cleanExcerptHtml(post.excerpt);
  const bodyHtml = rawBody.replace(
    /<h3>About AvranceCorp Developments<\/h3>[\s\S]*?(?=<h3>|$)/gi,
    ""
  ).trim();

  const readingTime = getReadingTime(bodyHtml);

  return (
    <main>

      {/* Hero */}
      <section className="relative bg-accent overflow-hidden">
        {post.image && (
          <>
            <Image
              src={post.image}
              alt={stripHtml(post.title)}
              fill
              className="object-cover opacity-20"
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-linear-to-b from-accent/60 via-accent/85 to-accent" />
          </>
        )}
        <div className="relative mx-auto max-w-4xl px-6 pb-20 pt-24 sm:px-8 lg:pb-28 lg:pt-32">
          <nav className="mb-6 flex flex-wrap items-center gap-1.5 text-xs text-white/40">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <Link href="/news" className="hover:text-white transition-colors">News</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-white/60 truncate max-w-45">{category}</span>
          </nav>
          <span className="inline-flex items-center rounded bg-primary px-3 py-1 text-xs font-semibold tracking-wide text-white">
            {category}
          </span>
          <h1 className="mt-4 font-display text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
            {stripHtml(post.title)}
          </h1>
          <div className="mt-5 flex items-center gap-4 text-sm text-white/70">
            <span className="flex items-center gap-1.5 font-semibold">
              <Calendar className="h-4 w-4 text-primary" />
              {formatDate(post.date)}
            </span>
            <span className="h-1 w-1 rounded-full bg-white/30" />
            <span className="flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-primary" />
              {readingTime} min read
            </span>
          </div>
        </div>
      </section>

      {/* Featured image card */}
      {post.image && (
        <div className="bg-white">
          <div className="mx-auto max-w-4xl px-6 sm:px-8">
            <div className="-mt-10 relative aspect-video overflow-hidden rounded-2xl shadow-2xl">
              <Image
                src={post.image}
                alt={stripHtml(post.title)}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 896px) 100vw, 896px"
              />
            </div>
          </div>
        </div>
      )}

      {/* Article body */}
      <section className="bg-white">
        <div className="mx-auto max-w-3xl px-6 sm:px-8">
          <div className="py-12 lg:py-16">

            {/* Byline */}
            <div className="flex items-center gap-3 pb-8 mb-8 border-b border-border">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary">
                <span className="text-xs font-bold text-white">AC</span>
              </div>
              <div className="min-w-0">
                <p className="text-sm font-bold text-accent leading-none">AvranceCorp Developments</p>
                <p className="text-sm text-text-secondary mt-1">Published · {formatDate(post.date)}</p>
              </div>
              <span className="ml-auto shrink-0 inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1 text-xs font-semibold text-text-secondary">
                <Clock className="h-3 w-3 text-primary" />
                {readingTime} min read
              </span>
            </div>

            {/* Body content */}
            <div
              className="
                text-[1.0625rem] leading-[1.85] text-text-secondary
                [&>p]:mb-6 [&>p:last-child]:mb-0
                [&>p:first-child]:text-base [&>p:first-child]:font-medium [&>p:first-child]:text-accent/80 [&>p:first-child]:leading-relaxed [&>p:first-child]:border-l-4 [&>p:first-child]:border-primary [&>p:first-child]:pl-4 [&>p:first-child]:py-1
                [&>h2]:mt-10 [&>h2]:mb-3 [&>h2]:font-display [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:text-accent
                [&>h3]:mt-10 [&>h3]:mb-3 [&>h3]:font-display [&>h3]:text-xl [&>h3]:font-bold [&>h3]:text-accent
                [&>blockquote]:my-8 [&>blockquote]:rounded-r-xl [&>blockquote]:border-l-4 [&>blockquote]:border-primary [&>blockquote]:bg-bg-subtle [&>blockquote]:px-6 [&>blockquote]:py-5 [&>blockquote]:text-lg [&>blockquote]:italic [&>blockquote]:text-accent/80 [&>blockquote]:leading-relaxed
                [&_strong]:font-bold [&_strong]:text-accent
                [&_em]:italic
                [&>ul]:mb-6 [&>ul]:space-y-2.5
                [&>ul>li]:relative [&>ul>li]:pl-5
                [&>ul>li]:before:absolute [&>ul>li]:before:left-0 [&>ul>li]:before:top-[0.6em] [&>ul>li]:before:h-1.5 [&>ul>li]:before:w-1.5 [&>ul>li]:before:rounded-full [&>ul>li]:before:bg-primary [&>ul>li]:before:content-['']
              "
              dangerouslySetInnerHTML={{ __html: bodyHtml }}
            />

            {/* Media Contact */}
            <div className="mt-14 border-t border-border pt-10">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-6">Media Contact</p>
              <div className="flex flex-col gap-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent">
                    <span className="text-sm font-bold text-white">KA</span>
                  </div>
                  <div>
                    <p className="text-base font-bold text-accent">Kenai Andrews</p>
                    <p className="text-sm text-text-secondary mt-0.5">Director, Media &amp; Investor Relations · AvranceCorp Developments</p>
                  </div>
                </div>
                <div className="flex flex-col gap-3 pl-1">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-text-muted">Email</span>
                    <a href="mailto:kenai@avrancecorp.com" className="text-sm font-semibold text-primary hover:underline transition-colors">
                      kenai@avrancecorp.com
                    </a>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-text-muted">Phone</span>
                    <a href="tel:+16473688888" className="text-sm font-semibold text-primary hover:underline transition-colors">
                      +1 647-368-8888
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-10 border-t border-border pt-8">
              <Link
                href="/news"
                className="inline-flex items-center gap-2 text-sm font-semibold text-text-secondary hover:text-accent transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to News
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Related articles */}
      {relatedArticles.length > 0 && (
        <section className="bg-bg-subtle border-t border-border">
          <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-12 lg:py-20">
            <h2 className="font-display text-2xl font-bold text-accent">More Articles</h2>
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
              {relatedArticles.map((p) => (
                <Link
                  key={p.id}
                  href={`/news/${p.slug}`}
                  className="group flex flex-col gap-4"
                >
                  <div className="relative aspect-video overflow-hidden rounded-xl bg-accent/10">
                    {p.image ? (
                      <Image
                        src={p.image}
                        alt={stripHtml(p.title)}
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
                      {formatDate(p.date)}
                    </span>
                    <h3 className="mt-2 font-display text-base font-bold leading-snug text-accent group-hover:text-primary transition-colors duration-200 line-clamp-2">
                      {stripHtml(p.title)}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
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
