import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { LeadershipSection } from "@/components/sections/LeadershipSection";

export const metadata = {
  title: "Our Team | AvranceCorp Developments",
  description: "Meet the AvranceCorp team — the experienced professionals behind our residential developments across Canada and the USA.",
};

export default function TeamPage() {
  return (
    <main>
      <LeadershipSection />

      {/* CTA Banner */}
      <div className="bg-primary">
        <div className="mx-auto max-w-7xl px-6 py-8 sm:px-8 lg:px-12">
          <div className="flex flex-col items-center justify-between gap-5 sm:flex-row">
            <p className="font-display text-xl font-bold text-white sm:text-2xl text-center sm:text-left">
              Are you looking for an Architecture design expert?
            </p>
            <Link
              href="/contact"
              className="shrink-0 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-bold text-primary transition-all duration-200 hover:bg-white/90 hover:shadow-lg"
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
