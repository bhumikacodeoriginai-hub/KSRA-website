import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { SITE } from "@/lib/content";

const QUICK = [
  ["Home", "/"],
  ["About", "/about"],
  ["Facilities", "/facilities"],
  ["Events", "/events"],
  ["Results", "/results"],
  ["Gallery", "/gallery"],
  ["Awards", "/results#awards"],
  ["Resources", "/resources"],
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-ink-2">
      <div className="pointer-events-none absolute -bottom-32 left-1/2 -translate-x-1/2 select-none whitespace-nowrap font-display text-[26vw] font-extrabold leading-none text-white/[0.03]">
        KSRA
      </div>
      <div className="relative mx-auto grid max-w-7xl gap-12 px-6 py-20 md:grid-cols-12">
        <div className="md:col-span-5">
          <div className="flex items-center gap-4">
            <span className="relative h-16 w-16 overflow-hidden rounded-full bg-white">
              <Image src="/ref/logo_2.jpg" alt="KSRA emblem" fill sizes="64px" className="object-contain p-1" />
            </span>
            <div>
              <p className="font-display text-2xl font-extrabold">{SITE.short}</p>
              <p className="text-sm text-white/50">{SITE.name}</p>
            </div>
          </div>
          <p className="mt-6 max-w-md text-white/60">
            A full-fledged modern shooting complex at the Sports Authority of India, Bengaluru — training champions since May 1997.
          </p>
          <div className="mt-6 flex gap-3">
            <a href={SITE.facebook} target="_blank" rel="noreferrer" className="rounded-full border border-white/15 px-4 py-2 text-sm text-white/70 transition hover:border-flame hover:text-white">
              Facebook
            </a>
            <a href={SITE.instagram} target="_blank" rel="noreferrer" className="rounded-full border border-white/15 px-4 py-2 text-sm text-white/70 transition hover:border-flame hover:text-white">
              Instagram
            </a>
          </div>
        </div>

        <div className="md:col-span-3">
          <h4 className="font-display text-sm font-bold uppercase tracking-[0.2em] text-flame">Quick links</h4>
          <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3 text-white/65 md:grid-cols-1">
            {QUICK.map(([l, h]) => (
              <li key={l}>
                <Link href={h} className="transition hover:text-white hover:underline hover:decoration-flame hover:underline-offset-4">
                  {l}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-4">
          <h4 className="font-display text-sm font-bold uppercase tracking-[0.2em] text-flame">Contact</h4>
          <ul className="mt-5 space-y-4 text-sm text-white/65">
            <li className="flex gap-3"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-flame" />{SITE.rangeAddress}</li>
            <li className="flex gap-3"><Phone className="mt-0.5 h-4 w-4 shrink-0 text-flame" />{SITE.phone}</li>
            <li className="flex gap-3"><Mail className="mt-0.5 h-4 w-4 shrink-0 text-flame" />{SITE.emails.join(" / ")}</li>
          </ul>
        </div>
      </div>
      <div className="relative border-t border-white/10 px-6 py-6 text-center text-xs text-white/40">
        © {new Date().getFullYear()} Karnataka State Rifle Association · GSTIN {SITE.gstin}
      </div>
    </footer>
  );
}
