"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, Phone } from "lucide-react";
import { fadeUp, defaultTransition, viewportOnce } from "@/lib/animations";

interface Member {
  name: string;
  title: string;
  photo: string | null;
  gradient: string;
  initials: string;
  bio?: string;
  email?: string;
  phone?: string;
}

const seniorLeaders: Member[] = [
  {
    name: "Prof. Jacob Babarinde",
    title: "Chairman",
    photo: "/image/team/jacob-babarinde.png",
    gradient: "from-[#1A1A2E] via-[#2A2A4E] to-[#C41230]",
    initials: "JB",
    bio: "Professor Jacob Babarinde is a Chartered Surveyor with a PhD in Urban and Regional Planning, a BSc degree in Real Estate Management and Valuation, and a Master's degree in Urban & Regional Planning. In addition to his role as Chairman of AvranceCorp Developments, Prof. Babarinde works as a Professor of Property Studies at the Papua New Guinea University of Technology. He is an Ontario-Registered Urban & Regional Planner, Licensed Realtor, and Chartered Valuation Surveyor, and a member of the Royal Institution of Chartered Surveyors (FRICS), the Canadian Institute of Planners (MCIP), and the International Society of City & Regional Planners (ISOCARP). He brings 36 years of experience across eight countries including Nigeria, UK, Canada, and Papua New Guinea.",
    phone: "+1 (647) 783-3171",
    email: "jacob@avrancecorp.com",
  },
  {
    name: "Ravi Thakur",
    title: "Acting CEO",
    photo: "/image/team/ravi-thakur.png",
    gradient: "from-[#C41230] via-[#9B0E26] to-[#1A1A2E]",
    initials: "RT",
    bio: "A 30-year veteran of the corporate world with a strong background in project management and business development, Ravi brings deep expertise across multi-residentials, pre-construction, plazas, hotels, retail, industrial space, land infill, and residential development sites of all sizes. As a Certified International Property Specialist (CIPS), he has cultivated strong relationships with private equity managers, mortgage brokers, bankers, builders, developers, and international investors around the world. Ravi advises from both the tenant and landlord perspective, working with small business owners and large corporation decision makers alike.",
    email: "ravi@avrancecorp.com",
  },
];

const professionals: Member[] = [
  {
    name: "Herbert Ofoha",
    title: "CEO",
    photo: "/image/team/herbert-ofoha.png",
    gradient: "from-[#1A1A2E] via-[#2A2A4E] to-[#C41230]",
    initials: "HO",
    bio: "Herbert Ofoha is a Licensed Professional Engineer (P.Eng.), Quantity Surveyor (PQS, RICS), and Gold Seal certified construction executive with over 28 years of continuous experience in the construction and real estate development industry. He holds a B.Sc. in Civil Engineering, an M.Eng. in Building Engineering and Construction, and a Diploma in Quantity Surveying from George Brown College/CIQS. As CEO of AvranceCorp Developments, he brings deep expertise in infrastructure project management, cost consulting, land development, and contract administration. Herbert previously served as a consultant to the City of Toronto on capital projects, and as a college professor at Humber, Seneca, and Ryerson University, as well as Education Administrator for the Canadian Institute of Quantity Surveyors (CIQS) for over a decade.",
  },
  {
    name: "Satnam Singh",
    title: "Partner",
    photo: "/image/team/satnam-singh.png",
    gradient: "from-[#1A1A2E] via-[#2A2A4E] to-[#C41230]",
    initials: "SS",
  },
  {
    name: "Patrick Williams",
    title: "VP of Operations",
    photo: "/image/team/patrick-williams.png",
    gradient: "from-[#C41230] via-[#9B0E26] to-[#1A1A2E]",
    initials: "PW",
    phone: "+1 (647) 499-4277",
    email: "patrick@avrancecorp.com",
  },
  {
    name: "Ellen Radojevic",
    title: "VP of Sales",
    photo: "/image/team/ellen-radojevic.png",
    gradient: "from-[#1A1A2E] via-[#2A2A4E] to-[#C41230]",
    initials: "ER",
    phone: "+1 (647) 836-5282",
    email: "ellen@avrancecorp.com",
  },
  {
    name: "Wole Olapoju",
    title: "VP of Technology",
    photo: "/image/team/wole-olapoju.png",
    gradient: "from-[#C41230] via-[#9B0E26] to-[#1A1A2E]",
    initials: "WO",
    email: "wole@avrancecorp.com",
  },
  {
    name: "Dr. Mazen AbuOmar",
    title: "Principal M&E Engineer",
    photo: "/image/team/mazen-abuomar.png",
    gradient: "from-[#1A1A2E] via-[#2A2A4E] to-[#C41230]",
    initials: "MA",
  },
  {
    name: "Rommel Lumbao",
    title: "Principal Architect",
    photo: "/image/team/rommel-lumbao.png",
    gradient: "from-[#C41230] via-[#9B0E26] to-[#1A1A2E]",
    initials: "RL",
  },
  {
    name: "Renata Kuberka",
    title: "Executive Assistant",
    photo: "/image/team/renata-kuberka.png",
    gradient: "from-[#1A1A2E] via-[#2A2A4E] to-[#C41230]",
    initials: "RK",
    bio: "Renata Kuberka is an Executive Assistant, Receptionist, and Front Office Coordinator supporting Egolia Group, AvranceCorp Developments, and TradeREA. She manages reception services, client and stakeholder communications, executive scheduling, meeting and event coordination, office administration, and operational support across construction, sales, marketing, investor relations, and partnership activities. Renata plays an important role in ensuring a professional customer experience while supporting leadership teams in the successful execution of strategic initiatives.",
  },
];

function MemberModal({ member, onClose }: { member: Member; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        style={{ ["--initial-scale" as string]: 0.95 }}
        transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
        className="relative w-full sm:max-w-lg max-h-[90vh] overflow-y-auto rounded-t-3xl sm:rounded-2xl bg-white shadow-2xl pb-safe"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drag handle — mobile only */}
        <div className="flex sm:hidden justify-center pt-3 pb-1">
          <div className="h-1 w-10 rounded-full bg-gray-300" />
        </div>

        {/* Header */}
        <div className={`relative h-32 bg-linear-to-br ${member.gradient} shrink-0`}>
          <button
            onClick={onClose}
            className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-black/20 text-white backdrop-blur-sm transition-colors hover:bg-black/40"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Avatar */}
        <div className="flex justify-center -mt-12 px-6">
          <div className="relative h-24 w-24 rounded-full overflow-hidden ring-4 ring-white shadow-lg bg-white shrink-0">
            {member.photo ? (
              <Image src={member.photo} alt={member.name} fill className="object-cover object-top" sizes="96px" />
            ) : (
              <div className={`flex h-full w-full items-center justify-center bg-linear-to-br ${member.gradient}`}>
                <span className="font-display text-2xl font-bold text-white">{member.initials}</span>
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="px-6 pb-10 pt-3 sm:px-8 sm:pb-8 text-center">
          <h3 className="font-display text-xl font-bold text-accent sm:text-2xl">{member.name}</h3>
          <p className="mt-1 text-xs font-bold uppercase tracking-widest text-primary">{member.title}</p>

          {member.bio && (
            <p className="mt-4 text-sm leading-relaxed text-text-secondary text-left">{member.bio}</p>
          )}

          {(member.email || member.phone) && (
            <div className="mt-6 space-y-3 border-t border-border pt-5 text-left">
              {member.phone && (
                <a
                  href={`tel:${member.phone.replace(/\s/g, "")}`}
                  className="flex items-center gap-3 text-sm text-text-secondary transition-colors hover:text-primary"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <Phone className="h-3.5 w-3.5 text-primary" />
                  </span>
                  {member.phone}
                </a>
              )}
              {member.email && (
                <a
                  href={`mailto:${member.email}`}
                  className="flex items-center gap-3 text-sm text-text-secondary transition-colors hover:text-primary"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <Mail className="h-3.5 w-3.5 text-primary" />
                  </span>
                  {member.email}
                </a>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

function MemberCard({ member, index }: { member: Member; index: number }) {
  const [open, setOpen] = useState(false);
  const hasBio = !!member.bio;

  return (
    <>
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        transition={{ ...defaultTransition, delay: index * 0.08 }}
        className="group h-full flex flex-col"
      >
        <div
          onClick={() => hasBio && setOpen(true)}
          className={`h-full flex flex-col rounded-2xl bg-white shadow-[0_4px_24px_rgba(0,0,0,0.08)] overflow-hidden transition-shadow duration-300 group-hover:shadow-[0_12px_40px_rgba(0,0,0,0.14)] ${hasBio ? "cursor-pointer" : ""}`}
        >
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
          <div className="px-3 py-3 sm:px-5 sm:py-4 space-y-1.5">
            <h3 className="font-display text-sm font-bold text-accent sm:text-base lg:text-lg leading-snug">{member.name}</h3>
            <p className="text-[10px] sm:text-xs font-semibold tracking-wide text-primary uppercase">{member.title}</p>
            {member.email && (
              <a
                href={`mailto:${member.email}`}
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-1.5 text-[10px] sm:text-xs text-text-secondary hover:text-primary transition-colors truncate"
              >
                <Mail className="h-3 w-3 shrink-0 text-primary/70" />
                <span className="truncate">{member.email}</span>
              </a>
            )}
            {member.phone && (
              <a
                href={`tel:${member.phone.replace(/\s/g, "")}`}
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-1.5 text-[10px] sm:text-xs text-text-secondary hover:text-primary transition-colors"
              >
                <Phone className="h-3 w-3 shrink-0 text-primary/70" />
                {member.phone}
              </a>
            )}
            {hasBio && (
              <p className="text-[10px] text-text-secondary/50 font-medium pt-0.5">View bio →</p>
            )}
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {open && <MemberModal member={member} onClose={() => setOpen(false)} />}
      </AnimatePresence>
    </>
  );
}

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
              <MemberCard key={leader.name} member={leader} index={i} />
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
              <MemberCard key={member.name} member={member} index={i} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
