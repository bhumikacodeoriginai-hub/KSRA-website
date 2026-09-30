import type { Metadata } from "next";
import { ArrowUpRight, FileText } from "lucide-react";
import { PageHero, Reveal } from "@/components/motion-ui";
import { RESOURCES } from "@/lib/content";

export const metadata: Metadata = { title: "Resources" };

export default function ResourcesPage() {
  return (
    <>
      <PageHero eyebrow="Resources" title="Rules, criteria & documents." sub="Rule books, selection criteria, calendars and governance documents — all in one place." />
      <section className="px-6 pb-24">
        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-2">
          {RESOURCES.map((g, i) => (
            <Reveal key={g.group} delay={i * 0.08}>
              <div className="h-full rounded-3xl border border-white/10 bg-gradient-to-br from-ink-3 to-ink-2 p-8">
                <h2 className="font-display text-2xl font-bold text-flame">{g.group}</h2>
                <ul className="mt-6 divide-y divide-white/10">
                  {g.items.map((it) => (
                    <li key={it.title}>
                      <a href={it.href} target="_blank" rel="noreferrer" className="group flex items-center justify-between gap-4 py-4 transition hover:pl-2">
                        <span className="flex items-center gap-3 text-white/80 group-hover:text-white"><FileText className="h-4 w-4 text-white/40" />{it.title}</span>
                        <ArrowUpRight className="h-5 w-5 text-white/30 transition group-hover:text-flame" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
