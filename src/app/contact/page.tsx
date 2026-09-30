import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import { PageHero, Reveal } from "@/components/motion-ui";
import { ContactForm } from "@/components/Forms";
import { SITE } from "@/lib/content";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  const cards = [
    { icon: MapPin, title: "Range address", lines: [SITE.rangeAddress] },
    { icon: MapPin, title: "Admin office", lines: [SITE.officeAddress] },
    { icon: Phone, title: "Phone", lines: [SITE.phone] },
    { icon: Mail, title: "Email", lines: SITE.emails },
  ];
  return (
    <>
      <PageHero eyebrow="Contact" title="Let's talk shooting." sub="Questions on training, events or membership? Write to us or visit the range." />
      <section className="px-6 pb-16">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-5">
          <div className="space-y-4 lg:col-span-2">
            {cards.map((c, i) => (
              <Reveal key={c.title} delay={i * 0.08} y={30}>
                <div className="flex gap-5 rounded-2xl border border-white/10 bg-ink-2 p-6">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-flame/15 text-flame"><c.icon className="h-5 w-5" /></span>
                  <div>
                    <h3 className="font-display font-bold">{c.title}</h3>
                    {c.lines.map((l) => <p key={l} className="mt-1 text-sm text-white/60">{l}</p>)}
                  </div>
                </div>
              </Reveal>
            ))}
            <p className="px-2 text-xs text-white/40">GSTIN: {SITE.gstin}</p>
          </div>
          <div className="lg:col-span-3"><Reveal><ContactForm /></Reveal></div>
        </div>
      </section>
      <section className="px-6 pb-24">
        <Reveal>
          <div className="mx-auto h-[420px] max-w-7xl overflow-hidden rounded-3xl border border-white/10">
            <iframe
              title="K.S.R.A location map"
              src="https://www.google.com/maps?q=SAI+Shooting+Range+Bangalore+University+Mysore+Road+Bengaluru&output=embed"
              className="h-full w-full grayscale invert-[0.92] contrast-[0.9] hue-rotate-180"
              loading="lazy"
            />
          </div>
        </Reveal>
      </section>
    </>
  );
}
