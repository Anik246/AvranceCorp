"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, Images } from "lucide-react";
// motion.img used in lightbox to avoid next/image fill constraints
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  images: string[];
  projectTitle: string;
}

const MAX_VISIBLE = 5;

export function GalleryLightbox({ images, projectTitle }: Props) {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(0);

  const prev = useCallback(() =>
    setCurrent((c) => (c - 1 + images.length) % images.length), [images.length]);

  const next = useCallback(() =>
    setCurrent((c) => (c + 1) % images.length), [images.length]);

  const openAt = (i: number) => { setCurrent(i); setOpen(true); };

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape")     setOpen(false);
      if (e.key === "ArrowLeft")  prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, prev, next]);

  if (images.length === 0) return null;

  const visible = images.slice(0, MAX_VISIBLE);
  const remaining = images.length - MAX_VISIBLE;

  return (
    <>
      {/* Section */}
      <div className="mb-8 flex items-end justify-between gap-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Gallery</span>
          <h2 className="mt-2 font-display text-2xl font-bold text-white sm:text-3xl">
            Project Photos{" "}
            <span className="text-white/40 font-normal">({images.length})</span>
          </h2>
          <div className="mt-3 h-1 w-10 bg-primary rounded-full" />
        </div>
        <button
          onClick={() => openAt(0)}
          className="shrink-0 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/8 px-5 py-2.5 text-sm font-semibold text-white/70 shadow-sm transition-all hover:border-primary hover:bg-white/12 hover:text-primary"
        >
          <Images className="h-4 w-4" />
          View All
        </button>
      </div>

      {/* Section */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((src, i) => {
          const isOverflow = i === MAX_VISIBLE - 1 && remaining > 0;
          return (
            <div
              key={i}
              onClick={() => openAt(i)}
              className="group relative aspect-video cursor-pointer overflow-hidden rounded-2xl bg-border transform-gpu"
            >
              <Image
                src={src}
                alt={`${projectTitle} — ${i + 1}`}
                fill
                priority={i === 0}
                className="object-cover object-center"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />

              {/* Hover overlay */}
              {!isOverflow && (
                <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-black/25">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/20">
                    <Images className="h-5 w-5 text-white" />
                  </div>
                </div>
              )}

              {/* "+N more" overlay on last visible tile */}
              {isOverflow && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black/60 transition-colors duration-300 group-hover:bg-black/70">
                  <Images className="h-6 w-6 text-white/70" />
                  <span className="font-display text-4xl font-black text-white leading-none">+{remaining}</span>
                  <span className="text-xs font-semibold uppercase tracking-widest text-white/50">more photos</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Section */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-9999 flex flex-col bg-black"
            onClick={() => setOpen(false)}
          >
            {/* Top bar */}
            <div
              className="relative z-10 flex shrink-0 items-center justify-between px-6 py-4"
              onClick={(e) => e.stopPropagation()}
            >
              <span className="text-sm font-semibold text-white/60">
                {current + 1} <span className="text-white/30">/</span> {images.length}
              </span>
              <p className="absolute left-1/2 hidden -translate-x-1/2 truncate text-sm font-semibold text-white/70 sm:block max-w-xs">
                {projectTitle}
              </p>
              <button
                onClick={() => setOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Main image */}
            <div
              className="relative flex flex-1 items-center justify-center overflow-hidden px-14 sm:px-20"
              onClick={(e) => e.stopPropagation()}
            >
              {images.length > 1 && (
                <button
                  onClick={prev}
                  className="absolute left-2 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-all hover:bg-white/20 sm:left-4"
                  aria-label="Previous"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
              )}

              <AnimatePresence mode="wait">
                <motion.img
                  key={current}
                  src={images[current]}
                  alt={`${projectTitle} — ${current + 1}`}
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.18 }}
                  className="max-h-full max-w-full object-contain"
                />
              </AnimatePresence>

              {images.length > 1 && (
                <button
                  onClick={next}
                  className="absolute right-2 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-all hover:bg-white/20 sm:right-4"
                  aria-label="Next"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              )}
            </div>

            {/* Thumbnail strip */}
            {images.length > 1 && (
              <div
                className="flex shrink-0 items-center justify-center gap-2 overflow-x-auto px-4 py-4 scrollbar-none"
                onClick={(e) => e.stopPropagation()}
              >
                {images.map((src, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className={`relative h-14 w-20 shrink-0 overflow-hidden rounded-lg transition-all duration-200 ${
                      i === current
                        ? "opacity-100 ring-2 ring-primary ring-offset-2 ring-offset-black"
                        : "opacity-40 hover:opacity-70"
                    }`}
                    aria-label={`Photo ${i + 1}`}
                  >
                    <Image src={src} alt={`Thumbnail ${i + 1}`} fill
                      className="object-cover object-center" sizes="80px" />
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
