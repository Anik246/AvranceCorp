"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { fadeUp, defaultTransition, viewportOnce } from "@/lib/animations";

const seniorLeaders = [
  {
    name: "Samuel Babs",
    title: "CEO & Partner",
    photo: null,
    gradient: "from-[#C41230] via-[#9B0E26] to-[#1A1A2E]",
    initials: "SB",
  },
];

const teamMembers = [
  { name: "Valgus Anderson", title: "Architect",         photo: "/image/team/valgus-anderson.jpg" },
  { name: "David Duncan",    title: "Project Engineer",  photo: "/image/team/david-duncan.jpg"    },
  { name: "Russel Santos",   title: "Building Surveyor", photo: "/image/team/russel-santos.jpg"   },
  { name: "Edward Sanders",  title: "Project Engineer",  photo: "/image/team/edward-sanders.jpg"  },
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

          <div className="flex justify-center">
            {seniorLeaders.map((leader, i) => (
              <motion.div
                key={leader.name}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
                transition={{ ...defaultTransition, delay: i * 0.1 }}
                className="group w-full max-w-xs"
              >
                <div className="rounded-2xl bg-white shadow-[0_4px_24px_rgba(0,0,0,0.08)] overflow-hidden transition-shadow duration-300 group-hover:shadow-[0_12px_40px_rgba(0,0,0,0.14)]">
                  {leader.photo ? (
                    <div className="relative h-64 overflow-hidden">
                      <Image src={leader.photo} alt={leader.name} fill className="object-cover object-top" sizes="320px" />
                      <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent" />
                    </div>
                  ) : (
                    <div className={`relative h-64 bg-linear-to-br ${leader.gradient} flex items-center justify-center`}>
                      <div className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-white/20 bg-white/10 backdrop-blur-sm">
                        <span className="font-display text-3xl font-bold text-white">{leader.initials}</span>
                      </div>
                    </div>
                  )}
                  <div className="px-5 py-4">
                    <h3 className="font-display text-lg font-bold text-accent">{leader.name}</h3>
                    <p className="mt-1 text-xs font-semibold tracking-wide text-primary uppercase">{leader.title}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── Our Team ──────────────────────────────────────────── */}
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

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {teamMembers.map((member, i) => (
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
                  <div className="relative h-56 overflow-hidden bg-border">
                    <Image
                      src={member.photo}
                      alt={member.name}
                      fill
                      className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent" />
                  </div>
                  <div className="px-5 py-4">
                    <h3 className="font-display text-lg font-bold text-accent">{member.name}</h3>
                    <p className="mt-1 text-xs font-semibold tracking-wide text-primary uppercase">{member.title}</p>
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
