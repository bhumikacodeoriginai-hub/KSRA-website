"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

type Album = { id: number; title: string; cover: string; year: number; category: string };

export default function GalleryGrid({ albums }: { albums: Album[] }) {
  const [cat, setCat] = useState("All");
  const [open, setOpen] = useState<number | null>(null);
  const cats = ["All", ...Array.from(new Set(albums.map((a) => a.category)))];
  const shown = albums.filter((a) => cat === "All" || a.category === cat);

  const step = useCallback(
    (d: number) => setOpen((o) => (o === null ? o : (o + d + shown.length) % shown.length)),
    [shown.length],
  );

  useEffect(() => {
    if (open === null) return;
    const k = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [open, step]);

  const current = open !== null ? shown[open] : null;

  return (
    <>
      <div className="flex flex-wrap gap-2">
        {cats.map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={`rounded-full border px-5 py-2 text-sm font-medium transition ${cat === c ? "border-flame bg-flame text-white" : "border-white/15 text-white/60 hover:text-white"}`}
          >
            {c}
          </button>
        ))}
      </div>

      <motion.div layout className="mt-10 columns-1 gap-5 sm:columns-2 lg:columns-3">
        <AnimatePresence mode="popLayout">
          {shown.map((a, i) => (
            <motion.button
              layout
              key={a.id}
              onClick={() => setOpen(i)}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5, delay: i * 0.04 }}
              className="group relative mb-5 block w-full overflow-hidden rounded-3xl border border-white/10 text-left"
            >
              <Image src={a.cover} alt={a.title} width={900} height={i % 3 === 0 ? 1100 : 700} className="h-auto w-full transition duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent opacity-80" />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-flame">{a.category} · {a.year}</span>
                <p className="font-display mt-1 text-lg font-bold leading-snug">{a.title}</p>
              </div>
            </motion.button>
          ))}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {current && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] grid place-items-center bg-ink/95 p-4 backdrop-blur-md"
            onClick={() => setOpen(null)}
          >
            <button className="absolute right-5 top-5 grid h-12 w-12 place-items-center rounded-full bg-white/10" onClick={() => setOpen(null)} aria-label="Close"><X /></button>
            <button className="absolute left-3 grid h-12 w-12 place-items-center rounded-full bg-white/10 md:left-8" onClick={(e) => { e.stopPropagation(); step(-1); }} aria-label="Previous"><ChevronLeft /></button>
            <button className="absolute right-3 grid h-12 w-12 place-items-center rounded-full bg-white/10 md:right-8" onClick={(e) => { e.stopPropagation(); step(1); }} aria-label="Next"><ChevronRight /></button>
            <motion.figure
              key={current.id}
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="max-h-[90vh] max-w-4xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image src={current.cover} alt={current.title} width={1400} height={1000} className="max-h-[78vh] w-auto rounded-2xl object-contain" />
              <figcaption className="mt-4 text-center">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-flame">{current.category} · {current.year}</span>
                <p className="font-display mt-1 text-xl font-bold">{current.title}</p>
              </figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
