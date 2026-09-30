"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowUpRight, Calendar, MapPin, Target } from "lucide-react";
import { ArrowLink, Counter, Marquee, Reveal, SectionHead, SplitWords, Tilt } from "@/components/motion-ui";
import { FACILITIES, GOVERNANCE, STATS } from "@/lib/content";

type Notice = { id: number; title: string; category: string; body: string; href: string | null; pinned: boolean; publishedAt: string };
type Event = { id: number; title: string; category: string; level: string; venue: string; description: string; startDate: string; endDate: string | null };
type Album = { id: number; title: string; cover: string; year: number; category: string };

const fmt = (d: string) => new Date(d + "T00:00:00").toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

export function MarqueeBand() {
  return (
    <section className="relative border-y border-white/10 bg-ink-2 py-8">
      <Marquee items={["10m Air Rifle", "25m Pistol", "50m Rifle", "Trap & Skeet", "Coaching Camps", "Civilian Training"]} />
    </section>
  );
}

export function StatsSection() {
  return (
    <section className="relative px-6 py-24">
      <div className="mx-auto grid max-w-7xl gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 md:grid-cols-4">
        {STATS.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.1} y={30} className="bg-ink p-8 md:p-10">
            <p className="font-display gradient-text text-6xl font-extrabold md:text-7xl">
              <Counter to={s.value} suffix={s.suffix ?? ""} plain={s.format === "year"} />
            </p>
            <p className="mt-3 text-sm uppercase tracking-[0.2em] text-white/50">{s.label}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function AboutSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const rot = useTransform(scrollYProgress, [0, 1], [-4, 4]);
  return (
    <section className="relative overflow-hidden px-6 py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2">
        <div ref={ref} className="relative">
          <motion.div style={{ rotate: rot }} className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-white/10">
            <motion.div style={{ y, scale: 1.2 }} className="absolute inset-0">
              <Image src="/ref/aboutusimage.png" alt="KSRA shooting range building at SAI complex" fill sizes="(min-width:1024px) 600px, 100vw" className="object-cover" />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
          </motion.div>
          <motion.div
            initial={{ scale: 0, rotate: -90 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", delay: 0.4 }}
            className="glass absolute -bottom-6 -right-2 rounded-2xl bg-ink-2/80 p-5 md:-right-8"
          >
            <p className="font-display text-4xl font-extrabold text-flame">1997</p>
            <p className="text-xs uppercase tracking-[0.2em] text-white/60">Serving shooters since May</p>
          </motion.div>
        </div>

        <div>
          <SectionHead eyebrow="Welcome" title="Karnataka State Rifle Association" />
          <Reveal delay={0.2}>
            <p className="mt-6 text-lg leading-relaxed text-white/70">
              A full-fledged modern shooting complex comprising a <b className="text-white">50 mtr Range</b>, <b className="text-white">25 mtr Pistol Range</b>,{" "}
              <b className="text-white">10 mts Indoor Air Gun range</b> and <b className="text-white">Trap &amp; Skeet range</b> has been available at the Sports Authority of India complex since May 1997.
              During 2009–2011, these ranges were renovated to match international standards with state-of-the-art electronic target shooting equipment.
            </p>
            <p className="mt-4 leading-relaxed text-white/60">
              K.S.R.A. has produced many champions who have brought laurels to the country, and also imparts training in handling weapons under the Civilian Rifle Training Course.
            </p>
            <div className="mt-8">
              <ArrowLink href="/about">Read our story</ArrowLink>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function FacilitiesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], ["2%", "-62%"]);
  const cards = FACILITIES.slice(0, 5);
  return (
    <section ref={ref} className="relative hidden h-[420vh] lg:block">
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <div className="mx-auto w-full max-w-7xl px-6">
          <SectionHead eyebrow="Facilities" title="Ranges built to international standard" />
        </div>
        <motion.div style={{ x }} className="mt-14 flex gap-6 pl-[max(1.5rem,calc((100vw-80rem)/2+1.5rem))]">
          {cards.map((f, i) => (
            <Link key={f.id} href={`/facilities#${f.id}`} className="group relative block h-[380px] w-[440px] shrink-0 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-ink-3 to-ink-2 p-8">
              <div className="absolute -right-10 -top-10 h-56 w-56 rounded-full bg-flame/20 blur-3xl transition group-hover:bg-flame/40" />
              <span className="font-display text-outline absolute bottom-0 right-4 text-[11rem] font-extrabold leading-none opacity-60 transition group-hover:opacity-100">
                {f.distance.length <= 3 ? f.distance : `0${i + 1}`}
              </span>
              <div className="relative flex h-full flex-col justify-between">
                <div>
                  <span className="grid h-12 w-12 place-items-center rounded-full bg-flame/15 text-flame"><Target className="h-6 w-6" /></span>
                  <h3 className="font-display mt-6 text-3xl font-bold leading-tight">{f.title}</h3>
                  <p className="mt-3 max-w-[300px] text-sm text-white/60">{f.blurb.slice(0, 110)}…</p>
                </div>
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-flame">Details <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-1 group-hover:-translate-y-1" /></span>
              </div>
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export function FacilitiesMobile() {
  return (
    <section className="px-6 py-20 lg:hidden">
      <SectionHead eyebrow="Facilities" title="Ranges built to international standard" />
      <div className="mt-10 space-y-4">
        {FACILITIES.slice(0, 5).map((f) => (
          <Reveal key={f.id}>
            <Link href={`/facilities#${f.id}`} className="block rounded-3xl border border-white/10 bg-ink-2 p-6">
              <Target className="h-6 w-6 text-flame" />
              <h3 className="font-display mt-4 text-2xl font-bold">{f.title}</h3>
              <p className="mt-2 text-sm text-white/60">{f.blurb}</p>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function NoticesEvents({ notices, events }: { notices: Notice[]; events: Event[] }) {
  const today = new Date().toISOString().slice(0, 10);
  const upcoming = events.filter((e) => (e.endDate ?? e.startDate) >= today).slice(0, 4);
  const list = upcoming.length ? upcoming : events.slice(-4);
  return (
    <section className="relative px-6 py-24">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <SectionHead eyebrow="Important notice" title="Latest news & announcements" />
          <div className="mt-10 divide-y divide-white/10 border-y border-white/10">
            {notices.map((n, i) => {
              const inner = (
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ delay: i * 0.05, duration: 0.6 }}
                  className="group flex items-start gap-5 py-6 transition hover:bg-white/[0.03] md:px-4"
                >
                  <span className="font-display w-14 shrink-0 text-xs font-bold uppercase leading-tight tracking-widest text-flame">
                    {new Date(n.publishedAt).toLocaleDateString("en-IN", { month: "short" })}
                    <span className="block text-3xl text-white">{new Date(n.publishedAt).getDate()}</span>
                  </span>
                  <span className="flex-1">
                    <span className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-white/40">
                      {n.pinned && <span className="rounded-full bg-flame px-2 py-0.5 text-white">Pinned</span>}
                      {n.category}
                    </span>
                    <span className="font-display mt-1 block text-xl font-bold transition group-hover:text-flame">{n.title}</span>
                    <span className="mt-1 line-clamp-2 block text-sm text-white/55">{n.body}</span>
                  </span>
                  <ArrowUpRight className="mt-2 h-5 w-5 text-white/30 transition group-hover:text-flame" />
                </motion.div>
              );
              return n.href ? (
                <a key={n.id} href={n.href} target="_blank" rel="noreferrer" className="block">{inner}</a>
              ) : (
                <Link key={n.id} href="/events" className="block">{inner}</Link>
              );
            })}
          </div>
        </div>

        <div className="lg:col-span-5">
          <Reveal className="glass sticky top-28 rounded-3xl bg-ink-2/60 p-8">
            <h3 className="font-display flex items-center gap-3 text-2xl font-bold"><Calendar className="h-6 w-6 text-flame" /> Upcoming events</h3>
            <ul className="mt-6 space-y-5">
              {list.map((e) => (
                <li key={e.id} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-flame/60">
                  <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-flame">{e.level} · {e.category}</span>
                  <p className="font-display mt-1 text-lg font-bold leading-snug">{e.title}</p>
                  <p className="mt-2 flex items-center gap-2 text-sm text-white/50"><Calendar className="h-3.5 w-3.5" />{fmt(e.startDate)}{e.endDate ? ` – ${fmt(e.endDate)}` : ""}</p>
                  <p className="mt-1 flex items-center gap-2 text-sm text-white/50"><MapPin className="h-3.5 w-3.5" />{e.venue}</p>
                </li>
              ))}
            </ul>
            <div className="mt-6"><ArrowLink href="/events">All events</ArrowLink></div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function GalleryPreview({ albums }: { albums: Album[] }) {
  const spans = ["md:col-span-2 md:row-span-2", "", "", "md:col-span-2", "", ""];
  return (
    <section className="relative bg-ink-2 px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHead eyebrow="Gallery" title="Moments from the range" />
          <ArrowLink href="/gallery">View all images</ArrowLink>
        </div>
        <div className="mt-12 grid auto-rows-[220px] gap-4 md:grid-cols-4">
          {albums.slice(0, 6).map((a, i) => (
            <Reveal key={a.id} delay={i * 0.07} y={50} className={`${spans[i]} h-full`}>
              <Link href="/gallery" className="group relative block h-full overflow-hidden rounded-3xl border border-white/10">
                <Image src={a.cover} alt={a.title} fill sizes="(min-width:768px) 40vw, 100vw" className="object-cover transition duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent opacity-90" />
                <div className="absolute inset-x-0 bottom-0 translate-y-2 p-5 transition group-hover:translate-y-0">
                  <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-flame">{a.category} · {a.year}</span>
                  <p className="font-display mt-1 line-clamp-2 text-lg font-bold leading-snug">{a.title}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function GoverningSection() {
  return (
    <section className="relative px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <SectionHead eyebrow="Governing bodies" title="Where we're headed" align="center" />
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {GOVERNANCE.map((g, i) => (
            <Reveal key={g.title} delay={i * 0.15}>
              <Tilt className="h-full rounded-3xl">
                <div className="h-full rounded-3xl border border-white/10 bg-gradient-to-br from-ink-3 to-ink-2 p-8 md:p-10">
                  <span className="font-display text-sm font-bold text-flame">0{i + 1}</span>
                  <h3 className="font-display mt-2 text-2xl font-bold md:text-3xl">{g.title}</h3>
                  <p className="mt-4 leading-relaxed text-white/60">{g.text}</p>
                </div>
              </Tilt>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CTASection() {
  return (
    <section className="px-6 pb-24">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-flame via-flame-2 to-flame p-10 md:p-20">
        <div className="absolute -right-20 -top-20 h-96 w-96 rounded-full border-[40px] border-white/10" />
        <div className="absolute -right-4 top-10 h-52 w-52 rounded-full border-[30px] border-white/10" />
        <div className="relative max-w-3xl text-ink">
          <SplitWords text="Ready to take your first shot?" className="font-display text-4xl font-extrabold leading-none md:text-7xl" />
          <Reveal delay={0.3}>
            <p className="mt-6 max-w-xl text-lg font-medium text-ink/80">
              Join Karnataka&apos;s premier shooting association — from first-timers in the Civilian Rifle Training Course to national-level competitors.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/membership" className="rounded-full bg-ink px-8 py-4 font-semibold text-white transition hover:scale-105">Enquire about membership</Link>
              <Link href="/contact" className="rounded-full border-2 border-ink px-8 py-4 font-semibold transition hover:bg-ink hover:text-white">Contact us</Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
