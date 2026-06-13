"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { ChevronDown, LogIn, X } from "lucide-react";

type NavItem = {
  label: string;
  href: string;
  children?: { label: string; href: string; desc?: string; image?: string }[];
};

const NAV_LINKS: NavItem[] = [
  {
    label: "About Us",
    href: "/about",
    children: [
      { label: "Our Story", href: "/about" },
      { label: "Our Team", href: "/about/team" },
    ],
  },
  {
    label: "Our Community",
    href: "/properties",
    children: [
      { label: "Springbank Lux Condos",  href: "/properties/springbank-lux-condos",  image: "/image/projects/springbank-lux/slc-cover.jpg",       desc: "London, Ontario"        },
      { label: "WayneLux Estate",        href: "/properties/waynelux-estate",         image: "/image/projects/waynelux-estate-1.jpg",                desc: "Romulus, Michigan"      },
      { label: "Georgian Bay Harbour",   href: "/properties/georgian-bay-harbour",    image: "/image/projects/georgian-bay-harbour/GBH-cover.png",  desc: "Meaford, Ontario"       },
      { label: "Georgian Bay Terrace",   href: "/properties/georgian-bay-terrace",    image: "/image/projects/georgian-bay-terrace/gbt-cover.jpg",  desc: "Meaford, Ontario"       },
      { label: "T-City Condos Phase II", href: "/properties/t-city-condos-phase-ii",  image: "/image/projects/t-city-condos/tcc-cover.png",         desc: "North York, Ontario"    },
      { label: "Wasaga Lux Condos",      href: "/properties/wasaga-lux-condos",       image: "/image/projects/wasaga-lux/wlc-cover.jpg",            desc: "Wasaga Beach, Ontario"  },
    ],
  },
  { label: "Projects", href: "/properties" },
  { label: "Renovations", href: "/renovations" },
  { label: "News", href: "/news" },
  { label: "Contact Us", href: "/contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openMobileItem, setOpenMobileItem] = useState<string | null>(null);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
    setOpenMobileItem(null);
  }, [pathname]);

  // Close mobile menu on outside click
  useEffect(() => {
    if (!menuOpen) return;
    function handleClick(e: MouseEvent) {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [menuOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  // Scroll shadow
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleMouseEnter = (label: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveDropdown(label);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setActiveDropdown(null), 150);
  };

  return (
    <header
      ref={headerRef}
      className={cn(
        "sticky top-0 z-50 bg-white transition-all duration-300",
        scrolled ? "shadow-[0_4px_24px_rgba(0,0,0,0.09)]" : "border-b border-zinc-200"
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10 lg:py-7">

        {/* Logo */}
        <div className="flex items-center gap-8 shrink-0">
          <Link href="/" className="inline-block">
            <Image
              src="/image/avranceCorpLogo.png"
              alt="AvranceCorp"
              width={180}
              height={46}
              className="object-contain w-36 sm:w-44 lg:w-45"
              priority
              unoptimized
            />
          </Link>
          <div className="hidden lg:block h-7 w-px bg-zinc-200" />
        </div>

        {/* Desktop nav */}
        <nav className="hidden items-center lg:flex">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href && !link.children;
            return (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() => link.children && handleMouseEnter(link.label)}
                onMouseLeave={() => link.children && handleMouseLeave()}
              >
                <Link
                  href={link.href}
                  className={cn(
                    "group relative flex items-center gap-1.5 px-5 py-2 text-base font-medium transition-colors duration-200",
                    isActive ? "text-primary" : "text-zinc-700 hover:text-zinc-900"
                  )}
                >
                  {link.label}
                  {link.children && (
                    <ChevronDown className={cn(
                      "h-3.5 w-3.5 text-primary stroke-[2.5] transition-transform duration-200",
                      activeDropdown === link.label && "rotate-180"
                    )} />
                  )}
                  {!link.children && (
                    <span className={cn(
                      "absolute bottom-0 left-4 right-4 h-0.75 rounded-full bg-primary transition-all duration-200 origin-left",
                      isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                    )} />
                  )}
                </Link>

                {/* Desktop dropdown */}
                <AnimatePresence>
                  {link.children && activeDropdown === link.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      transition={{ duration: 0.15, ease: "easeOut" }}
                      className="absolute left-0 top-full z-50 pt-2 min-w-72"
                    >
                      <div className="overflow-hidden rounded-2xl bg-accent shadow-[0_8px_32px_rgba(0,0,0,0.25)]">
                        <div className="p-1.5">
                          {link.children.map((child) => (
                            <Link
                              key={child.label}
                              href={child.href}
                              className="group/item flex items-center gap-3 rounded-xl px-3 py-2 transition-colors duration-150 hover:bg-white/8"
                            >
                              {child.image && (
                                <div className="relative h-12 w-20 shrink-0 overflow-hidden rounded-sm">
                                  <Image
                                    src={child.image}
                                    alt={child.label}
                                    fill
                                    className="object-cover"
                                    sizes="80px"
                                  />
                                </div>
                              )}
                              <div>
                                <span className="block whitespace-nowrap text-sm font-semibold text-white/85 transition-colors group-hover/item:text-white">
                                  {child.label}
                                </span>
                                {child.desc && (
                                  <span className="block text-xs text-white/40 mt-0.5">{child.desc}</span>
                                )}
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </nav>

        {/* Desktop login */}
        <div className="hidden lg:block">
          <a
            href="https://avrancecorp.savvycrm.ca"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-md bg-primary px-7 py-2.5 text-[13px] font-semibold text-white shadow-[0_2px_8px_rgba(196,18,48,0.25)] transition-all duration-200 hover:bg-primary-dark hover:shadow-[0_4px_16px_rgba(196,18,48,0.35)]"
          >
            <LogIn className="h-4 w-4" />
            Login
          </a>
        </div>

        {/* Hamburger / close */}
        <button
          className="relative flex h-10 w-10 flex-col items-center justify-center gap-1.25 rounded-md hover:bg-zinc-100 transition-colors lg:hidden"
          onClick={() => setMenuOpen((p) => !p)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          <span className={cn(
            "h-[1.5px] w-5 rounded-full bg-zinc-800 transition-all duration-300",
            menuOpen && "translate-y-[6.5px] rotate-45"
          )} />
          <span className={cn(
            "h-[1.5px] w-5 rounded-full bg-zinc-800 transition-all duration-300",
            menuOpen && "opacity-0 scale-x-0"
          )} />
          <span className={cn(
            "h-[1.5px] w-5 rounded-full bg-zinc-800 transition-all duration-300",
            menuOpen && "translate-y-[-6.5px] -rotate-45"
          )} />
        </button>
      </div>

      {/* Mobile menu — absolute so it overlays page content */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute inset-x-0 top-full z-50 border-t border-zinc-100 bg-white shadow-[0_8px_32px_rgba(0,0,0,0.12)] lg:hidden"
          >
            <ul
              className="divide-y divide-zinc-50 px-6 pb-6 pt-2 overflow-y-auto"
              style={{ maxHeight: "calc(100dvh - 78px)" }}
            >
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  {link.children ? (
                    <>
                      <button
                        onClick={() => setOpenMobileItem(openMobileItem === link.label ? null : link.label)}
                        className="flex w-full items-center justify-between py-4 text-sm font-medium text-zinc-700 hover:text-primary transition-colors"
                      >
                        {link.label}
                        <ChevronDown className={cn(
                          "h-4 w-4 text-zinc-400 transition-transform duration-200",
                          openMobileItem === link.label && "rotate-180 text-primary"
                        )} />
                      </button>
                      <AnimatePresence>
                        {openMobileItem === link.label && (
                          <motion.ul
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.15 }}
                            className="overflow-hidden mb-2 space-y-0.5 border-l-2 border-primary/20 ml-1 pl-4"
                          >
                            {link.children.map((child) => (
                              <li key={child.label}>
                                <Link
                                  href={child.href}
                                  onClick={() => setMenuOpen(false)}
                                  className="flex items-center gap-3 py-2 text-sm text-zinc-500 hover:text-primary transition-colors"
                                >
                                  {child.image && (
                                    <div className="relative h-9 w-14 shrink-0 overflow-hidden rounded-sm">
                                      <Image
                                        src={child.image}
                                        alt={child.label}
                                        fill
                                        className="object-cover"
                                        sizes="48px"
                                      />
                                    </div>
                                  )}
                                  <div>
                                    <span className="block text-sm text-zinc-600 group-hover:text-primary">{child.label}</span>
                                    {child.desc && (
                                      <span className="block text-xs text-zinc-400 mt-0.5">{child.desc}</span>
                                    )}
                                  </div>
                                </Link>
                              </li>
                            ))}
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <Link
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className={cn(
                        "flex items-center py-4 text-sm font-medium transition-colors hover:text-primary",
                        pathname === link.href ? "text-primary" : "text-zinc-700"
                      )}
                    >
                      {link.label}
                      {pathname === link.href && (
                        <span className="ml-2 h-1.5 w-1.5 rounded-full bg-primary" />
                      )}
                    </Link>
                  )}
                </li>
              ))}

              {/* Mobile login */}
              <li className="pt-4 pb-2">
                <a
                  href="https://avrancecorp.savvycrm.ca"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMenuOpen(false)}
                  className="flex w-full items-center justify-center gap-2 rounded-md bg-primary py-3.5 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
                >
                  <LogIn className="h-4 w-4" />
                  Login
                </a>
              </li>
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
