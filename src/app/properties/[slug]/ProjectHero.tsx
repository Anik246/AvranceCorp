"use client";

import Image from "next/image";
import Link from "next/link";
import { MapPin, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

interface Props {
  title: string;
  address: string;
  status: string;
  image: string | null;
  gradient?: string;
}

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as any, delay },
});

export function ProjectHero({ title, address, status, image, gradient }: Props) {
  return (
    <section className="relative h-[60vh] min-h-96 overflow-hidden transform-gpu">
      {/* Image with Ken Burns zoom */}
      {image ? (
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 8, ease: "easeOut" }}
        >
          <Image
            src={image}
            alt={title}
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
        </motion.div>
      ) : (
        <div className={`absolute inset-0 bg-linear-to-br ${gradient}`} />
      )}

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-linear-to-t from-black via-black/60 to-black/10" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end">
        <div className="mx-auto w-full max-w-7xl px-6 pb-10 sm:px-8 lg:px-12">
          <motion.nav {...fadeUp(0)} className="mb-5 flex items-center gap-1.5 text-xs font-medium text-white/50">
            <Link href="/" className="hover:text-white/80 transition-colors">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <Link href="/properties" className="hover:text-white/80 transition-colors">Projects</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-white/80">{title}</span>
          </motion.nav>

          <motion.span
            {...fadeUp(0.1)}
            className="inline-flex items-center gap-1.5 rounded-full bg-primary/90 px-3 py-1.5 text-xs font-bold text-white mb-4 backdrop-blur-sm"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
            {status}
          </motion.span>

          <motion.h1 {...fadeUp(0.2)} className="font-display text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
            {title}
          </motion.h1>

          <motion.div {...fadeUp(0.3)} className="mt-3 flex items-center gap-2 text-base text-white/70">
            <MapPin className="h-4 w-4 shrink-0 text-primary" />
            {address}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
