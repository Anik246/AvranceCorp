"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { fadeUp, defaultTransition, viewportOnce } from "@/lib/animations";

const professionals = [
  { name: "Jason R. Macintosh", title: "Chief Financial Officer",  photo: "/image/team/jason-macintosh.png" as string | null, gradient: "from-[#C41230] via-[#9B0E26] to-[#1A1A2E]", initials: "JM" },
  { name: "Wole Olapoju",       title: "Chief Technology Officer", photo: "/image/team/wole-olapoju.png"    as string | null, gradient: "from-[#1A1A2E] via-[#2A2A4E] to-[#C41230]", initials: "WO" },
  { name: "Elaine Galley",      title: "Chief Operating Officer",  photo: "/image/team/elaine-galley.png"   as string | null, gradient: "from-[#C41230] via-[#9B0E26] to-[#1A1A2E]", initials: "EG" },
  { name: "Valgus Anderson",    title: "Architect",                photo: null,                              gradient: "from-[#1A1A2E] via-[#2A2A4E] to-[#C41230]", initials: "VA" },
  { name: "David Duncan",       title: "Project Engineer",         photo: null,                              gradient: "from-[#C41230] via-[#9B0E26] to-[#1A1A2E]", initials: "DD" },
  { name: "Russel Santos",      title: "Building Surveyor",        photo: null,                              gradient: "from-[#1A1A2E] via-[#2A2A4E] to-[#C41230]", initials: "RS" },
  { name: "Edward Sanders",     title: "Project Engineer",         photo: null,                              gradient: "from-[#C41230] via-[#9B0E26] to-[#1A1A2E]", initials: "ES" },
];

const seniorLeaders = [
  { name: "Samuel Babarinde",   title: "Founder & Chairman", photo: "/image/team/samuel-babarinde.png",    gradient: "from-[#C41230] via-[#9B0E26] to-[#1A1A2E]", initials: "SB" },
  { name: "Ravi Thakur",        title: "Vice Chairman",      photo: "/image/team/ravi-thakur.png",          gradient: "from-[#1A1A2E] via-[#2A2A4E] to-[#C41230]", initials: "RT" },
  { name: "Michael Spencley",   title: "Director",           photo: "/image/team/michael-spencley.png",     gradient: "from-[#C41230] via-[#9B0E26] to-[#1A1A2E]", initials: "MS" },
  { name: "Sergio DiNicola",    title: "Director",           photo: "/image/team/sergio-dinicola.png",      gradient: "from-[#1A1A2E] via-[#2A2A4E] to-[#C41230]", initials: "SD" },
  { name: "Tihomir Bajić",      title: "Director",           photo: "/image/team/tihomir-bajic.png",        gradient: "from-[#C41230] via-[#9B0E26] to-[#1A1A2E]", initials: "TB" },
  { name: "Larry D. Hayes",     title: "Director",           photo: "/image/team/larry-hayes.png",          gradient: "from-[#1A1A2E] via-[#2A2A4E] to-[#C41230]", initials: "LH" },
  { name: "Christopher Williams", title: "Director",         photo: "/image/team/christopher-williams.png", gradient: "from-[#C41230] via-[#9B0E26] to-[#1A1A2E]", initials: "CW" },
  { name: "Neil Wolfson",       title: "Director",           photo: "/image/team/neil-wolfson.png",         gradient: "from-[#1A1A2E] via-[#2A2A4E] to-[#C41230]", initials: "NW" },
];

export function LeadershipSection() {
  return (
    <section className="bg-bg pt-8 pb-16 sm:pt-12 sm:pb-24 lg:pt-16 lg:pb-32 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 space-y-20">

        {/* ── Senior Leadership ─────────────────────────────────── */}
        <div>
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            transition={defaultTransition}
            className="mb-10 text-center"
          >
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Leadership</span>
            <h2 className="mt-2 font-display text-3xl font-bold leading-tight text-accent sm:text-4xl lg:text-5xl">
              Senior <span className="text-primary">Leadership</span>
            </h2>
            <div className="mt-4 mx-auto h-1 w-10 bg-primary rounded-full" />
          </motion.div>

          <div className="grid grid-cols-2 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {seniorLeaders.map((leader, i) => (
              <motion.div
                key={leader.name}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
                transition={{ ...defaultTransition, delay: i * 0.1 }}
                className="group"
              >
                <div className="rounded-2xl bg-white shadow-[0_4px_24px_rgba(0,0,0,0.08)] overflow-hidden transition-shadow duration-300 group-hover:shadow-[0_12px_40px_rgba(0,0,0,0.14)]">
                  {leader.photo ? (
                    <div className="relative h-44 sm:h-52 lg:h-60 overflow-hidden">
                      <Image
                        src={leader.photo}
                        alt={leader.name}
                        fill
                        className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent" />
                    </div>
                  ) : (
                    <div className={`relative h-44 sm:h-52 lg:h-60 bg-linear-to-br ${leader.gradient} flex items-center justify-center`}>
                      <div className="flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full border-4 border-white/20 bg-white/10 backdrop-blur-sm">
                        <span className="font-display text-xl sm:text-2xl font-bold text-white">{leader.initials}</span>
                      </div>
                    </div>
                  )}
                  <div className="px-3 py-3 sm:px-5 sm:py-4">
                    <h3 className="font-display text-sm font-bold text-accent sm:text-base lg:text-lg leading-snug">{leader.name}</h3>
                    <p className="mt-1 text-[10px] sm:text-xs font-semibold tracking-wide text-primary uppercase">{leader.title}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── Meet Our Professionals ────────────────────────────── */}
        <div>
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            transition={defaultTransition}
            className="mb-10 text-center"
          >
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Our Team</span>
            <h2 className="mt-2 font-display text-3xl font-bold leading-tight text-accent sm:text-4xl lg:text-5xl">
              Meet Our <span className="text-primary">Professionals</span>
            </h2>
            <div className="mt-4 mx-auto h-1 w-10 bg-primary rounded-full" />
          </motion.div>

          <div className="grid grid-cols-2 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {professionals.map((member, i) => (
              <motion.div
                key={member.name}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
                transition={{ ...defaultTransition, delay: i * 0.1 }}
                className="group"
              >
                <div className="rounded-2xl bg-white shadow-[0_4px_24px_rgba(0,0,0,0.08)] overflow-hidden transition-shadow duration-300 group-hover:shadow-[0_12px_40px_rgba(0,0,0,0.14)]">
                  {member.photo ? (
                    <div className="relative h-44 sm:h-52 lg:h-60 overflow-hidden">
                      <Image
                        src={member.photo}
                        alt={member.name}
                        fill
                        className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent" />
                    </div>
                  ) : (
                    <div className={`relative h-44 sm:h-52 lg:h-60 bg-linear-to-br ${member.gradient} flex items-center justify-center`}>
                      <div className="flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full border-4 border-white/20 bg-white/10 backdrop-blur-sm">
                        <span className="font-display text-xl sm:text-2xl font-bold text-white">{member.initials}</span>
                      </div>
                    </div>
                  )}
                  <div className="px-3 py-3 sm:px-5 sm:py-4">
                    <h3 className="font-display text-sm font-bold text-accent sm:text-base lg:text-lg leading-snug">{member.name}</h3>
                    <p className="mt-1 text-[10px] sm:text-xs font-semibold tracking-wide text-primary uppercase">{member.title}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
