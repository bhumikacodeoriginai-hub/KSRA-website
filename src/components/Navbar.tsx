"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown, Menu, Phone, X } from "lucide-react";
import { NAV, SITE } from "@/lib/content";

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [dropdown, setDropdown] = useState<string | null>(null);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 30);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => {
    setOpen(false);
    setDropdown(null);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6"
      >
        <div
          className={`mx-auto flex max-w-7xl items-center justify-between rounded-full px-3 py-2 pr-3 transition-all duration-500 sm:px-4 ${
            scrolled ? "glass bg-ink/70 shadow-[0_10px_40px_rgba(0,0,0,0.45)]" : "border border-transparent"
          }`}
        >
          <Link href="/" className="flex items-center gap-3" aria-label="K.S.R.A home">
            <span className="relative h-11 w-11 overflow-hidden rounded-full bg-white ring-2 ring-flame/70">
              <Image src="/ref/logo_2.jpg" alt="KSRA emblem" fill sizes="44px" className="object-contain p-0.5" />
            </span>
            <span className="leading-none">
              <span className="font-display block text-lg font-extrabold tracking-wide">K.S.R.A</span>
              <span className="hidden text-[10px] uppercase tracking-[0.22em] text-white/50 sm:block">Karnataka State Rifle Assn.</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex" onMouseLeave={() => setDropdown(null)}>
            {NAV.map((item) => {
              const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href.split("#")[0]);
              return (
                <div key={item.label} className="relative" onMouseEnter={() => setDropdown(item.children ? item.label : null)}>
                  <Link
                    href={item.href}
                    className={`relative flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                      active ? "text-white" : "text-white/65 hover:text-white"
                    }`}
                  >
                    {active && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 -z-10 rounded-full bg-white/10"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}
                    {item.label}
                    {item.children && <ChevronDown className="h-3.5 w-3.5 opacity-60" />}
                  </Link>
                  <AnimatePresence>
                    {item.children && dropdown === item.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 6, scale: 0.98 }}
                        transition={{ duration: 0.18 }}
                        className="glass absolute left-0 top-full mt-2 w-60 overflow-hidden rounded-2xl bg-ink-2/95 p-2 shadow-2xl"
                      >
                        {item.children.map((c) => (
                          <Link
                            key={c.label}
                            href={c.href}
                            className="block rounded-xl px-3 py-2.5 text-sm text-white/70 transition hover:bg-flame/15 hover:text-white"
                          >
                            {c.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={`tel:${SITE.phone.replace(/\s/g, "")}`}
              className="hidden items-center gap-2 rounded-full px-3 py-2 text-sm text-white/70 transition hover:text-white xl:flex"
            >
              <Phone className="h-4 w-4 text-flame" /> {SITE.phone}
            </a>
            <Link
              href="/membership"
              className="hidden rounded-full bg-flame px-5 py-2.5 text-sm font-semibold text-white shadow-[0_0_30px_rgba(255,90,31,0.45)] transition hover:bg-flame-2 sm:block"
            >
              Join the range
            </Link>
            <button
              onClick={() => setOpen(true)}
              className="grid h-11 w-11 place-items-center rounded-full bg-white/10 lg:hidden"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: "circle(0% at 92% 4%)" }}
            animate={{ clipPath: "circle(150% at 92% 4%)" }}
            exit={{ clipPath: "circle(0% at 92% 4%)" }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[60] overflow-y-auto bg-ink-2 px-6 pb-10 pt-6 lg:hidden"
          >
            <div className="flex items-center justify-between">
              <span className="font-display text-lg font-extrabold">K.S.R.A</span>
              <button onClick={() => setOpen(false)} className="grid h-11 w-11 place-items-center rounded-full bg-white/10" aria-label="Close menu">
                <X className="h-5 w-5" />
              </button>
            </div>
            <ul className="mt-10 space-y-1">
              {NAV.map((n, i) => (
                <motion.li
                  key={n.label}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.25 + i * 0.05 }}
                >
                  <Link href={n.href} className="font-display block border-b border-white/10 py-4 text-3xl font-bold">
                    <span className="mr-3 text-sm text-flame">0{i + 1}</span>
                    {n.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
            <Link href="/membership" className="mt-8 block rounded-full bg-flame py-4 text-center font-semibold">
              Join the range
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
