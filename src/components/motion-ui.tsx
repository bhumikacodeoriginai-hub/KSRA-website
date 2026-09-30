"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useMotionTemplate,
  useSpring,
  useTransform,
} from "motion/react";
import { ArrowUpRight } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

export function Reveal({
  children,
  delay = 0,
  y = 40,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function SplitWords({
  text,
  className = "",
  delay = 0,
  as: Tag = "h2",
}: {
  text: string;
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "p";
}) {
  const words = text.split(" ");
  const M = motion[Tag];
  return (
    <M
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      transition={{ staggerChildren: 0.06, delayChildren: delay }}
      aria-label={text}
    >
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.12em] align-bottom" aria-hidden>
          <motion.span
            className="inline-block"
            variants={{ hidden: { y: "110%", rotate: 4 }, show: { y: 0, rotate: 0 } }}
            transition={{ duration: 0.9, ease: EASE }}
          >
            {w}
            {i < words.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </M>
  );
}

export function Counter({ to, suffix = "", plain = false }: { to: number; suffix?: string; plain?: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const c = animate(0, to, { duration: 2.2, ease: EASE, onUpdate: (v) => setVal(Math.round(v)) });
    return () => c.stop();
  }, [inView, to]);
  return (
    <span ref={ref}>
      {plain ? val : val.toLocaleString("en-IN")}
      {suffix}
    </span>
  );
}

export function Magnetic({ children, strength = 0.35 }: { children: ReactNode; strength?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useSpring(useMotionValue(0), { stiffness: 220, damping: 15 });
  const y = useSpring(useMotionValue(0), { stiffness: 220, damping: 15 });
  return (
    <motion.div
      ref={ref}
      style={{ x, y, display: "inline-block" }}
      onMouseMove={(e) => {
        const r = ref.current!.getBoundingClientRect();
        x.set((e.clientX - (r.left + r.width / 2)) * strength);
        y.set((e.clientY - (r.top + r.height / 2)) * strength);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

export function Tilt({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rx = useSpring(useTransform(my, [0, 1], [7, -7]), { stiffness: 200, damping: 20 });
  const ry = useSpring(useTransform(mx, [0, 1], [-7, 7]), { stiffness: 200, damping: 20 });
  const gx = useTransform(mx, (v) => `${v * 100}%`);
  const gy = useTransform(my, (v) => `${v * 100}%`);
  const glow = useMotionTemplate`radial-gradient(420px circle at ${gx} ${gy}, rgba(255,90,31,0.18), transparent 60%)`;
  return (
    <motion.div
      ref={ref}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 900 }}
      onMouseMove={(e) => {
        const r = ref.current!.getBoundingClientRect();
        mx.set((e.clientX - r.left) / r.width);
        my.set((e.clientY - r.top) / r.height);
      }}
      onMouseLeave={() => {
        mx.set(0.5);
        my.set(0.5);
      }}
      className={`relative ${className}`}
    >
      <motion.div style={{ background: glow }} className="pointer-events-none absolute inset-0 z-10 rounded-[inherit]" />
      {children}
    </motion.div>
  );
}

export function Marquee({ items, reverse = false, outline = false }: { items: string[]; reverse?: boolean; outline?: boolean }) {
  const row = [...items, ...items];
  return (
    <div className="overflow-hidden">
      <div className={`marquee-track flex items-center gap-10 ${reverse ? "reverse" : ""}`}>
        {row.map((t, i) => (
          <span key={i} className="flex items-center gap-10">
            <span className={`font-display whitespace-nowrap text-5xl font-extrabold uppercase md:text-7xl ${outline ? "text-outline" : "text-white"}`}>
              {t}
            </span>
            <span className="text-3xl text-flame">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export function ArrowLink({ href, children, external = false }: { href: string; children: ReactNode; external?: boolean }) {
  const cls =
    "group inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.15em] text-white transition hover:text-flame";
  const inner = (
    <>
      {children}
      <span className="grid h-8 w-8 place-items-center rounded-full bg-flame text-white transition group-hover:rotate-45">
        <ArrowUpRight className="h-4 w-4" />
      </span>
    </>
  );
  return external ? (
    <a href={href} target="_blank" rel="noreferrer" className={cls}>{inner}</a>
  ) : (
    <Link href={href} className={cls}>{inner}</Link>
  );
}

export function SectionHead({ eyebrow, title, sub, align = "left" }: { eyebrow: string; title: string; sub?: string; align?: "left" | "center" }) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <Reveal>
        <span className="inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.3em] text-flame">
          <span className="h-px w-8 bg-flame" />
          {eyebrow}
        </span>
      </Reveal>
      <SplitWords text={title} className="font-display mt-4 text-4xl font-extrabold leading-[1.02] md:text-6xl" />
      {sub && (
        <Reveal delay={0.2}>
          <p className="mt-5 text-lg text-white/60">{sub}</p>
        </Reveal>
      )}
    </div>
  );
}

export function PageHero({ eyebrow, title, sub }: { eyebrow: string; title: string; sub?: string }) {
  return (
    <section className="relative overflow-hidden px-6 pb-20 pt-40 md:pt-48">
      <div className="grid-bg absolute inset-0" />
      <div className="pointer-events-none absolute -right-40 -top-40 h-[560px] w-[560px] rounded-full bg-indigo-k/30 blur-[140px]" />
      <div className="pointer-events-none absolute -left-40 top-40 h-[420px] w-[420px] rounded-full bg-flame/20 blur-[140px]" />
      <svg className="spin-slow pointer-events-none absolute -right-24 top-16 h-[420px] w-[420px] opacity-30 md:-right-10" viewBox="0 0 200 200" fill="none" stroke="white" strokeWidth="0.6">
        {[95, 75, 55, 35, 15].map((r) => (
          <circle key={r} cx="100" cy="100" r={r} strokeDasharray={r % 20 === 15 ? "2 3" : undefined} />
        ))}
        <path d="M100 0V200M0 100H200" />
      </svg>
      <div className="relative mx-auto max-w-7xl">
        <Reveal>
          <span className="inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.3em] text-flame">
            <span className="h-px w-8 bg-flame" />
            {eyebrow}
          </span>
        </Reveal>
        <SplitWords as="h1" text={title} className="font-display mt-5 max-w-4xl text-5xl font-extrabold leading-[0.98] md:text-8xl" />
        {sub && (
          <Reveal delay={0.3}>
            <p className="mt-8 max-w-2xl text-lg text-white/60 md:text-xl">{sub}</p>
          </Reveal>
        )}
      </div>
    </section>
  );
}
