import type { Metadata } from "next";
import { PageHero, Reveal } from "@/components/motion-ui";
import { MembershipForm } from "@/components/Forms";

export const metadata: Metadata = { title: "Join the Range" };

const STEPS = [
  ["01", "Enquire", "Share your interest and experience level using the form."],
  ["02", "Orientation", "Visit the range, meet coaches and learn range safety."],
  ["03", "Train", "Join coaching sessions or the Civilian Rifle Training Course."],
  ["04", "Compete", "Progress to club, state and national competitions."],
];

export default function MembershipPage() {
  return (
    <>
      <PageHero eyebrow="Membership" title="Your journey starts here." sub="Whether it's your first shot or your next national medal — tell us about yourself." />
      <section className="px-6 pb-24">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-5">
          <div className="space-y-4 lg:col-span-2">
            {STEPS.map(([n, t, d], i) => (
              <Reveal key={n} delay={i * 0.08} y={30}>
                <div className="flex gap-5 rounded-2xl border border-white/10 bg-ink-2 p-6">
                  <span className="font-display gradient-text text-4xl font-extrabold">{n}</span>
                  <div>
                    <h3 className="font-display text-xl font-bold">{t}</h3>
                    <p className="mt-1 text-sm text-white/60">{d}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="lg:col-span-3"><Reveal><MembershipForm /></Reveal></div>
        </div>
      </section>
    </>
  );
}
