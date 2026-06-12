import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function CtaSection() {
  return (
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
  );
}
