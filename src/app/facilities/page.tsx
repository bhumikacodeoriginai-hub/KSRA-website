import type { Metadata } from "next";
import { Check } from "lucide-react";
import { PageHero, Reveal, Tilt } from "@/components/motion-ui";
import { CTASection } from "@/components/HomeSections";
import { FACILITIES } from "@/lib/content";

export const metadata: Metadata = { title: "Facilities" };

export default function FacilitiesPage() {
  return (
    <>
      <PageHero
        eyebrow="Facilities"
        title="Four ranges. One complex."
        sub="From the 10m indoor air gun range to Trap & Skeet fields — everything a shooter needs, renovated to match international standards."
      />
      <section className="px-6 pb-24">
        <div className="mx-auto max-w-7xl space-y-8">
          {FACILITIES.map((f, i) => (
            <Reveal key={f.id}>
              <div id={f.id} className="scroll-mt-28">
                <Tilt className="rounded-[2rem]">
                  <div className={`grid gap-10 overflow-hidden rounded-[2rem] border border-white/10 p-8 md:grid-cols-2 md:p-14 ${i % 2 ? "bg-ink-2" : "bg-gradient-to-br from-ink-3 to-ink-2"}`}>
                    <div className="relative">
                      <span className="font-display text-outline text-[8rem] font-extrabold leading-none md:text-[11rem]">{f.distance}</span>
                      <h2 className="font-display -mt-4 text-3xl font-extrabold md:text-5xl">{f.title}</h2>
                      <p className="mt-5 text-lg text-white/65">{f.blurb}</p>
                    </div>
                    <ul className="grid content-center gap-4">
                      {f.points.map((p) => (
                        <li key={p} className="glass flex items-center gap-4 rounded-2xl px-5 py-4">
                          <span className="grid h-8 w-8 place-items-center rounded-full bg-flame text-white"><Check className="h-4 w-4" /></span>
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Tilt>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
      <CTASection />
    </>
  );
}
