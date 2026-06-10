"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import type { NavLink } from "@/types";

const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Properties", href: "/properties" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--color-border)] bg-[var(--color-surface)] shadow-[var(--shadow-sm)]">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="inline-block">
          <Image
            src="/image/avranceCorpLogo.png"
            alt="AvranceCorp"
            width={157}
            height={40}
            className="object-contain"
            priority
            unoptimized
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors duration-150 hover:text-[var(--color-primary)]",
                pathname === link.href
                  ? "text-[var(--color-primary)] font-semibold"
                  : "text-[var(--color-text-secondary)]"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:block">
          <Button variant="secondary" size="sm">
            List Your Property
          </Button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="flex flex-col gap-1.5 p-1 md:hidden"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          <span className={cn("h-0.5 w-6 bg-[var(--color-primary)] transition-transform duration-200", menuOpen && "translate-y-2 rotate-45")} />
          <span className={cn("h-0.5 w-6 bg-[var(--color-primary)] transition-opacity duration-200", menuOpen && "opacity-0")} />
          <span className={cn("h-0.5 w-6 bg-[var(--color-primary)] transition-transform duration-200", menuOpen && "-translate-y-2 -rotate-45")} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <nav className="border-t border-[var(--color-border)] bg-[var(--color-surface)] px-4 pb-4 pt-2 md:hidden">
          <ul className="flex flex-col gap-3">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={cn(
                    "block text-sm font-medium transition-colors hover:text-[var(--color-primary)]",
                    pathname === link.href
                      ? "text-[var(--color-primary)]"
                      : "text-[var(--color-text-secondary)]"
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Button variant="secondary" size="sm" fullWidth>
                List Your Property
              </Button>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
