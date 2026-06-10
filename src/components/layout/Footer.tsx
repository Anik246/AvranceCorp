import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin } from "lucide-react";

const LinkedinIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
  </svg>
);

const FOOTER_LINKS = {
  Company: [
    { label: "About Us", href: "/about" },
    { label: "Leadership", href: "/about#leadership" },
    { label: "Careers", href: "/careers" },
  ],
  Projects: [
    { label: "All Projects", href: "/properties" },
    { label: "Residential", href: "/properties?category=residential" },
    { label: "Mixed-Use", href: "/properties?category=mixed-use" },
  ],
  Investors: [
    { label: "Partner With Us", href: "/contact#invest" },
    { label: "Joint Ventures", href: "/contact#joint-venture" },
    { label: "Contact", href: "/contact" },
  ],
};

const SOCIAL = [
  { icon: LinkedinIcon, label: "LinkedIn", href: "#" },
  { icon: FacebookIcon, label: "Facebook", href: "#" },
  { icon: InstagramIcon, label: "Instagram", href: "#" },
];

export function Footer() {
  return (
    <footer className="bg-black text-text-inverse">
      {/* Red top bar */}
      <div className="h-1 bg-primary" />

      <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[2fr_1fr_1fr_1fr]">

          {/* Brand column */}
          <div className="flex flex-col gap-5">
            <Link href="/" className="inline-block">
              <Image
                src="/image/dakLogo.png"
                alt="AvranceCorp"
                width={180}
                height={120}
                className="object-contain"
                unoptimized
              />
            </Link>
            <p className="text-sm leading-relaxed text-white/45 max-w-xs">
              A full-service real estate development company delivering high-quality
              residential communities and investment opportunities across Canada and the USA.
            </p>

            {/* Contact */}
            <div className="flex flex-col gap-3 mt-2">
              {[
                { icon: MapPin, text: "North York, Ontario, Canada" },
                { icon: Phone, text: "647-368-7108", href: "tel:6473687108" },
                { icon: Mail, text: "info@avrancecorp.com", href: "mailto:info@avrancecorp.com" },
              ].map(({ icon: Icon, text, href }) => (
                <div key={text} className="flex items-center gap-2.5 text-sm text-white/50">
                  <Icon className="h-3.5 w-3.5 shrink-0 text-primary" />
                  {href ? (
                    <a href={href} className="hover:text-white transition-colors">{text}</a>
                  ) : (
                    <span>{text}</span>
                  )}
                </div>
              ))}
            </div>

            {/* Social */}
            <div className="flex gap-2 mt-1">
              {SOCIAL.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-white/40 transition-all duration-200 hover:border-primary hover:text-primary"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
            <div key={heading} className="flex flex-col gap-4">
              <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                {heading}
              </h3>
              <ul className="flex flex-col gap-2.5">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/45 transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-xs text-white/30">
            © Copyright 2016–{new Date().getFullYear()}, AvranceCorp Developments, a subsidiary of eGOLIA GROUP
          </p>
          <div className="flex gap-6">
            {["Privacy Policy", "Terms of Use"].map((item) => (
              <Link
                key={item}
                href="#"
                className="text-xs text-white/30 hover:text-white/60 transition-colors"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
