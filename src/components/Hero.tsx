"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import { ArrowDown } from "lucide-react";
import TargetRings from "@/components/TargetRings";
import { Magnetic } from "@/components/motion-ui";

const SLIDES = ["/ref/slider-1.png", "/ref/slider-2.png", "/ref/slider-3.png"];
const LINES = ["Aim.", "Focus.", "Fire."];

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const [i, setI] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setI((p) => (p + 1) % SLIDES.length), 6500);
    return () => clearInterval(t);
  }, []);

  return (
    <section ref={ref} className="grain relative flex min-h-screen items-center overflow-hidden">
      <motion.div style={{ y: bgY }} className="absolute inset-0">
        <AnimatePresence>
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.6 }}
            className="absolute inset-0"
          >
            <Image src={SLIDES[i]} alt="" fill priority sizes="100vw" className="kenburns object-cover" />
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/60" />
      </motion.div>
      <div className="grid-bg absolute inset-0 opacity-60" />

      <motion.div style={{ y: textY, opacity: fade }} className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-10 px-6 pb-24 pt-36 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="glass inline-flex items-center gap-3 rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-white/80"
          >
            <span className="relative flex h-2 w-2">
              <span className="pulse-ring absolute inset-0 rounded-full bg-flame" />
              <span className="relative h-2 w-2 rounded-full bg-flame" />
            </span>
            Est. 1997 · Bengaluru · SAI Complex
          </motion.div>

          <h1 className="font-display mt-8 text-[clamp(3.4rem,10vw,9rem)] font-extrabold leading-[0.88] tracking-tight">
            {LINES.map((l, idx) => (
              <span key={l} className="block overflow-hidden pb-[0.08em]">
                <motion.span
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ delay: 0.5 + idx * 0.16, duration: 1, ease: [0.22, 1, 0.36, 1] }}
                  className={`block ${idx === 2 ? "gradient-text" : idx === 1 ? "text-outline" : ""}`}
                >
                  {l}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.8 }}
            className="mt-8 max-w-xl text-lg text-white/70"
          >
            Karnataka State Rifle Association — a modern shooting complex with 50m, 25m, 10m and Trap & Skeet ranges,
            home to the champions who bring laurels to the country.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.8 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <Magnetic>
              <Link href="/membership" className="block rounded-full bg-flame px-8 py-4 font-semibold text-white shadow-[0_0_50px_rgba(255,90,31,0.5)] transition hover:bg-flame-2">
                Become a shooter
              </Link>
            </Magnetic>
            <Magnetic>
              <Link href="/facilities" className="glass block rounded-full px-8 py-4 font-semibold text-white transition hover:bg-white/10">
                Explore ranges
              </Link>
            </Magnetic>
          </motion.div>
        </div>

        <div className="relative hidden lg:col-span-5 lg:block">
          <TargetRings className="w-full drop-shadow-[0_30px_80px_rgba(255,90,31,0.25)]" />
        </div>
      </motion.div>

      <div className="absolute bottom-8 left-6 z-10 flex items-center gap-3 md:left-10">
        {SLIDES.map((_, idx) => (
          <button key={idx} onClick={() => setI(idx)} aria-label={`Slide ${idx + 1}`} className="group py-3">
            <span className="block h-[3px] w-12 overflow-hidden rounded bg-white/20">
              {idx === i && <motion.span key={i} initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 6.5, ease: "linear" }} className="block h-full bg-flame" />}
            </span>
          </button>
        ))}
      </div>
      <div className="absolute bottom-8 right-6 z-10 hidden items-center gap-3 text-xs uppercase tracking-[0.3em] text-white/50 md:flex md:right-10">
        Scroll <ArrowDown className="h-4 w-4 animate-bounce text-flame" />
      </div>
    </section>
  );
}
