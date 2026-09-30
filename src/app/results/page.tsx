import type { Metadata } from "next";
import { Award } from "lucide-react";
import { PageHero, Reveal, SectionHead, Tilt } from "@/components/motion-ui";
import { ResultsList } from "@/components/ListViews";
import { getResults } from "@/lib/data";
import { AWARDS } from "@/lib/content";

export const metadata: Metadata = { title: "Results & Awards" };
export const dynamic = "force-dynamic";

export default async function ResultsPage() {
  const results = await getResults();
  return (
    <>
      <PageHero eyebrow="Results" title="Scores that speak." sub="State, national and international results featuring Karnataka's shooters." />
      <section className="px-6 pb-24">
        <div className="mx-auto max-w-7xl"><ResultsList results={results} /></div>
      </section>
      <section id="awards" className="scroll-mt-24 bg-ink-2 px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <SectionHead eyebrow="Awardees" title="Honours for excellence" />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {AWARDS.map((a, i) => (
              <Reveal key={a.title} delay={i * 0.1}>
                <Tilt className="h-full rounded-3xl">
                  <a href={a.href} target="_blank" rel="noreferrer" className="block h-full rounded-3xl border border-white/10 bg-ink p-8">
                    <span className="grid h-14 w-14 place-items-center rounded-full bg-flame/15 text-flame"><Award className="h-7 w-7" /></span>
                    <h3 className="font-display mt-6 text-2xl font-bold">{a.title}</h3>
                    <p className="mt-3 text-white/60">{a.text}</p>
                    <span className="mt-6 inline-block text-sm font-semibold text-flame">See awardees →</span>
                  </a>
                </Tilt>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
