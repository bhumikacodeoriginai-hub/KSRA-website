"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Calendar, MapPin, Search } from "lucide-react";

type Event = { id: number; title: string; category: string; level: string; venue: string; description: string; startDate: string; endDate: string | null };
type Result = { id: number; title: string; year: number; discipline: string; level: string; summary: string; href: string | null };

const fmt = (d: string) => new Date(d + "T00:00:00").toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

function Chips({ options, value, onChange }: { options: string[]; value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => (
        <button
          key={o}
          onClick={() => onChange(o)}
          className={`relative rounded-full px-5 py-2 text-sm font-medium transition ${value === o ? "text-white" : "text-white/60 hover:text-white"}`}
        >
          {value === o && <motion.span layoutId={`chip-${options.join("")}`} className="absolute inset-0 rounded-full bg-flame" transition={{ type: "spring", stiffness: 400, damping: 30 }} />}
          <span className="relative">{o}</span>
        </button>
      ))}
    </div>
  );
}

export function EventsList({ events }: { events: Event[] }) {
  const today = new Date().toISOString().slice(0, 10);
  const [when, setWhen] = useState("Upcoming");
  const [level, setLevel] = useState("All");
  const levels = ["All", ...Array.from(new Set(events.map((e) => e.level)))];

  const shown = useMemo(() => {
    return events
      .filter((e) => {
        const end = e.endDate ?? e.startDate;
        if (when === "Upcoming" && end < today) return false;
        if (when === "Past" && end >= today) return false;
        return level === "All" || e.level === level;
      })
      .sort((a, b) => (when === "Past" ? b.startDate.localeCompare(a.startDate) : a.startDate.localeCompare(b.startDate)));
  }, [events, when, level, today]);

  return (
    <div>
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
        <div className="glass w-fit rounded-full p-1"><Chips options={["Upcoming", "Past", "All"]} value={when} onChange={setWhen} /></div>
        <Chips options={levels} value={level} onChange={setLevel} />
      </div>
      <div className="mt-10 space-y-4">
        <AnimatePresence mode="popLayout">
          {shown.map((e) => (
            <motion.article
              layout
              key={e.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.45 }}
              className="group grid gap-6 rounded-3xl border border-white/10 bg-gradient-to-r from-ink-2 to-ink p-6 transition hover:border-flame/60 md:grid-cols-[140px_1fr_auto] md:items-center md:p-8"
            >
              <div className="font-display">
                <p className="text-sm font-bold uppercase tracking-widest text-flame">{new Date(e.startDate).toLocaleDateString("en-IN", { month: "short", year: "numeric" })}</p>
                <p className="text-6xl font-extrabold leading-none">{new Date(e.startDate + "T00:00:00").getDate()}</p>
              </div>
              <div>
                <div className="flex flex-wrap gap-2 text-[11px] font-bold uppercase tracking-[0.15em]">
                  <span className="rounded-full bg-flame/15 px-3 py-1 text-flame">{e.level}</span>
                  <span className="rounded-full bg-white/10 px-3 py-1 text-white/70">{e.category}</span>
                </div>
                <h3 className="font-display mt-3 text-2xl font-bold transition group-hover:text-flame">{e.title}</h3>
                <p className="mt-2 max-w-2xl text-white/60">{e.description}</p>
                <div className="mt-4 flex flex-wrap gap-x-6 gap-y-1 text-sm text-white/50">
                  <span className="flex items-center gap-2"><Calendar className="h-4 w-4" />{fmt(e.startDate)}{e.endDate ? ` – ${fmt(e.endDate)}` : ""}</span>
                  <span className="flex items-center gap-2"><MapPin className="h-4 w-4" />{e.venue}</span>
                </div>
              </div>
              <a href="/membership" className="grid h-14 w-14 place-items-center rounded-full border border-white/15 transition group-hover:rotate-45 group-hover:border-flame group-hover:bg-flame" aria-label="Enquire to participate">
                <ArrowUpRight className="h-6 w-6" />
              </a>
            </motion.article>
          ))}
        </AnimatePresence>
        {shown.length === 0 && <p className="rounded-3xl border border-dashed border-white/15 p-12 text-center text-white/50">No events match these filters.</p>}
      </div>
    </div>
  );
}

export function ResultsList({ results }: { results: Result[] }) {
  const [q, setQ] = useState("");
  const [level, setLevel] = useState("All");
  const levels = ["All", ...Array.from(new Set(results.map((r) => r.level)))];
  const shown = results.filter(
    (r) => (level === "All" || r.level === level) && (r.title + r.summary + r.discipline).toLowerCase().includes(q.toLowerCase()),
  );
  return (
    <div>
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
        <div className="relative w-full md:max-w-sm">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search results…" className="!rounded-full !pl-11" />
        </div>
        <Chips options={levels} value={level} onChange={setLevel} />
      </div>
      <div className="mt-10 grid gap-5 md:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {shown.map((r) => (
            <motion.a
              layout
              key={r.id}
              href={r.href ?? "#"}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-ink-2 p-8 transition hover:border-flame/60"
            >
              <span className="font-display text-outline absolute -right-2 -top-4 text-8xl font-extrabold opacity-50">{r.year}</span>
              <div className="relative">
                <div className="flex gap-2 text-[11px] font-bold uppercase tracking-[0.15em]">
                  <span className="rounded-full bg-flame/15 px-3 py-1 text-flame">{r.level}</span>
                  <span className="rounded-full bg-white/10 px-3 py-1 text-white/70">{r.discipline}</span>
                </div>
                <h3 className="font-display mt-4 max-w-sm text-2xl font-bold leading-snug">{r.title}</h3>
                <p className="mt-3 text-white/60">{r.summary}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-flame">View full results <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-1 group-hover:-translate-y-1" /></span>
              </div>
            </motion.a>
          ))}
        </AnimatePresence>
      </div>
      {shown.length === 0 && <p className="mt-10 rounded-3xl border border-dashed border-white/15 p-12 text-center text-white/50">No results found.</p>}
    </div>
  );
}
