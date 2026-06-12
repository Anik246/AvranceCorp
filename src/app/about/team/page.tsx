import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";
import { LeadershipSection } from "@/components/sections/LeadershipSection";

export const metadata = {
  title: "Our Team | AvranceCorp Developments",
  description: "Meet the AvranceCorp team — the experienced professionals behind our residential developments across Canada and the USA.",
};

export default function TeamPage() {
  return (
    <main>

      {/* Hero */}
      <section className="bg-accent">
        <div className="mx-auto max-w-7xl px-6 pb-16 pt-24 sm:px-8 lg:px-12 lg:pb-20 lg:pt-32">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Our People</span>
          <h1 className="mt-3 font-display text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
            Meet the <span className="text-primary">Team</span>
          </h1>
          <div className="mt-4 h-1 w-12 bg-primary rounded-full" />
          <p className="mt-6 text-base leading-relaxed text-white/60 max-w-2xl sm:text-lg">
            Our leadership and professionals bring decades of experience in real estate development, finance, and construction across Canada and the United States.
          </p>
          <nav className="mt-6 flex items-center gap-1.5 text-xs text-white/40">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <Link href="/about" className="hover:text-white transition-colors">About</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-white/70">Team</span>
          </nav>
        </div>
      </section>

      <LeadershipSection />

      {/* CTA Banner */}
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
