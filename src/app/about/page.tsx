import type { Metadata } from "next";
import Image from "next/image";
import { PageHero, Reveal, SectionHead, Tilt } from "@/components/motion-ui";
import { CLUBS_NOTE, GOVERNANCE, TIMELINE } from "@/lib/content";
import { AboutSection, CTASection } from "@/components/HomeSections";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About K.S.R.A"
        title="Champions are built on this range."
        sub="Since May 1997 the Karnataka State Rifle Association has offered shooters a complete, modern complex at the Sports Authority of India, Bengaluru."
      />
      <AboutSection />

      <section id="history" className="scroll-mt-24 px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <SectionHead eyebrow="History" title="A legacy of upgrades and podiums" />
          <div className="relative mt-16 border-l border-white/15 pl-8 md:pl-14">
            {TIMELINE.map((t, i) => (
              <Reveal key={t.year} delay={i * 0.08} className="relative pb-14 last:pb-0">
                <span className="absolute -left-[41px] top-2 h-4 w-4 rounded-full border-4 border-ink bg-flame shadow-[0_0_20px_#ff5a1f] md:-left-[65px]" />
                <p className="font-display gradient-text text-5xl font-extrabold md:text-6xl">{t.year}</p>
                <h3 className="font-display mt-2 text-2xl font-bold">{t.title}</h3>
                <p className="mt-2 max-w-2xl text-white/60">{t.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="governance" className="scroll-mt-24 bg-ink-2 px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <SectionHead eyebrow="Governing body" title="Vision, forecast & upgrade" />
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {GOVERNANCE.map((g, i) => (
              <Reveal key={g.title} delay={i * 0.12}>
                <Tilt className="h-full rounded-3xl">
                  <div className="h-full rounded-3xl border border-white/10 bg-ink p-8 md:p-10">
                    <h3 className="font-display text-2xl font-bold text-flame">{g.title}</h3>
                    <p className="mt-4 leading-relaxed text-white/65">{g.text}</p>
                  </div>
                </Tilt>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.1}>
            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {["Merged 50m, 25m & 10m ranges for easy monitoring", "International-standard targets and equipment", "Re-planned shooter, spectator and control areas"].map((p) => (
                <div key={p} className="glass rounded-2xl p-6 text-white/80">
                  <span className="text-flame">✦</span> {p}
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section id="clubs" className="relative scroll-mt-24 overflow-hidden px-6 py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-12 md:grid-cols-2">
          <div>
            <SectionHead eyebrow="Network" title="Affiliated units & clubs" />
            <Reveal delay={0.2}>
              <p className="mt-6 text-lg text-white/65">{CLUBS_NOTE}</p>
              <a href="http://theksra.co.in/affiliated-list-of-ksra.php" target="_blank" rel="noreferrer" className="mt-8 inline-block rounded-full border border-white/20 px-7 py-3 font-semibold transition hover:border-flame hover:text-flame">
                View affiliated list
              </a>
            </Reveal>
          </div>
          <Reveal>
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-white/10">
              <Image src="/ref/26.jpeg" alt="K.S.R.A championship" fill sizes="(min-width:768px) 600px, 100vw" className="object-cover" />
            </div>
          </Reveal>
        </div>
      </section>
      <CTASection />
    </>
  );
}
