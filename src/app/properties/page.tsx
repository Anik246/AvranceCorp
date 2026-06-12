import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { PropertiesClient } from "./PropertiesClient";

export const metadata = {
  title: "Projects | AvranceCorp Developments",
  description: "Explore all AvranceCorp residential communities across Ontario and Michigan.",
};

const stats = [
  { value: "6", label: "Active Projects" },
  { value: "4", label: "Completed" },
  { value: "2,000+", label: "Units" },
  { value: "2", label: "Countries" },
];

export default function PropertiesPage() {
  return (
    <main className="bg-bg-subtle min-h-screen">

      {/* Section */}
      <section className="relative bg-accent overflow-hidden">

        {/* Dot-grid pattern overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.07]"
          style={{
            backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        {/* Red diagonal accent */}
        <div className="absolute right-0 top-0 h-full w-1/3 bg-linear-to-l from-primary/10 to-transparent pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-primary/40 to-transparent" />

        <div className="relative mx-auto max-w-7xl px-6 pt-14 pb-0 sm:px-8 lg:px-12 lg:pt-20">

          {/* Breadcrumb */}
          <nav className="mb-6 flex items-center gap-1.5 text-xs font-medium text-white/40">
            <Link href="/" className="hover:text-white/70 transition-colors">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-white/70">Projects</span>
          </nav>

          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Our Portfolio
          </span>
          <h1 className="mt-3 font-display text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
            Our <span className="text-primary">Projects</span>
          </h1>
          <div className="mt-4 h-1 w-12 bg-primary rounded-full" />
          <p className="mt-5 max-w-xl text-base leading-relaxed text-white/50 lg:text-lg">
            Stay updated with our latest developments, project milestones, and community
            initiatives. Select a category below to explore our portfolio.
          </p>

          {/* Stats strip */}
          <div className="mt-12 grid grid-cols-2 gap-px bg-white/[0.07] border-t border-white/[0.07] sm:grid-cols-4 sm:gap-0 sm:bg-transparent sm:divide-x sm:divide-white/[0.07]">
            {stats.map((s) => (
              <div key={s.label} className="bg-accent px-4 py-5 sm:px-6 sm:py-6 sm:first:pl-0">
                <p className="font-display text-2xl font-bold text-white sm:text-3xl">{s.value}</p>
                <p className="mt-1 text-xs font-semibold uppercase tracking-widest text-white/35">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <PropertiesClient />

    </main>
  );
}
