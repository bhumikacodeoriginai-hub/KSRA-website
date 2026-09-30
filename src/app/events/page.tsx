import type { Metadata } from "next";
import { PageHero } from "@/components/motion-ui";
import { EventsList } from "@/components/ListViews";
import { getEvents, getNotices } from "@/lib/data";
import { ArrowUpRight } from "lucide-react";

export const metadata: Metadata = { title: "News & Events" };
export const dynamic = "force-dynamic";

export default async function EventsPage() {
  const [events, notices] = await Promise.all([getEvents(), getNotices()]);
  return (
    <>
      <PageHero eyebrow="News & Events" title="The shooting calendar." sub="Championships, coaching camps, trials and ceremonies — filter by status and level." />
      <section className="px-6 pb-16">
        <div className="mx-auto max-w-7xl"><EventsList events={events} /></div>
      </section>
      <section className="bg-ink-2 px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <h2 className="font-display text-4xl font-extrabold">Notices</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {notices.map((n) => {
              const body = (
                <div className="group h-full rounded-2xl border border-white/10 bg-ink p-6 transition hover:border-flame/60">
                  <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-[0.2em] text-flame">
                    <span>{n.category}</span>
                    <span className="text-white/40">{new Date(n.publishedAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span>
                  </div>
                  <h3 className="font-display mt-2 flex items-start justify-between gap-3 text-xl font-bold">{n.title}{n.href && <ArrowUpRight className="h-5 w-5 shrink-0 text-white/40 group-hover:text-flame" />}</h3>
                  <p className="mt-2 text-sm text-white/55">{n.body}</p>
                </div>
              );
              return n.href ? <a key={n.id} href={n.href} target="_blank" rel="noreferrer">{body}</a> : <div key={n.id}>{body}</div>;
            })}
          </div>
        </div>
      </section>
    </>
  );
}
