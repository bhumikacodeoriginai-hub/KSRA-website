"use client";

import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { DISCIPLINES } from "@/lib/content";

function useSubmit(url: string) {
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [error, setError] = useState("");
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setState("loading");
    setError("");
    const body = Object.fromEntries(new FormData(form).entries());
    try {
      const res = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || "Something went wrong");
      form.reset();
      setState("done");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setState("error");
    }
  }
  return { state, error, submit, reset: () => setState("idle") };
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-bold uppercase tracking-[0.2em] text-white/50">{label}</span>
      {children}
    </label>
  );
}

function Shell({ state, error, reset, onSubmit, children, cta, doneTitle, doneText }: {
  state: string; error: string; reset: () => void; onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  children: React.ReactNode; cta: string; doneTitle: string; doneText: string;
}) {
  return (
    <div className="glass relative overflow-hidden rounded-3xl bg-ink-2/70 p-6 md:p-10">
      <AnimatePresence mode="wait">
        {state === "done" ? (
          <motion.div key="done" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="py-14 text-center">
            <motion.div initial={{ scale: 0, rotate: -90 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: "spring", delay: 0.1 }}>
              <CheckCircle2 className="mx-auto h-20 w-20 text-flame" />
            </motion.div>
            <h3 className="font-display mt-6 text-3xl font-bold">{doneTitle}</h3>
            <p className="mx-auto mt-3 max-w-sm text-white/60">{doneText}</p>
            <button onClick={reset} className="mt-8 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold hover:border-flame">Send another</button>
          </motion.div>
        ) : (
          <motion.form key="form" onSubmit={onSubmit} exit={{ opacity: 0 }} className="space-y-5">
            {children}
            {state === "error" && <p role="alert" className="rounded-xl bg-red-500/15 px-4 py-3 text-sm text-red-300">{error}</p>}
            <button
              type="submit"
              disabled={state === "loading"}
              className="group inline-flex items-center gap-3 rounded-full bg-flame px-8 py-4 font-semibold text-white shadow-[0_0_40px_rgba(255,90,31,0.4)] transition hover:bg-flame-2 disabled:opacity-60"
            >
              {state === "loading" ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5 transition group-hover:translate-x-1" />}
              {state === "loading" ? "Sending…" : cta}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

export function ContactForm() {
  const f = useSubmit("/api/contact");
  return (
    <Shell {...f} onSubmit={f.submit} cta="Send message" doneTitle="Message received" doneText="Thank you for reaching out. The K.S.R.A. office will get back to you shortly.">
      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Full name"><input name="name" required placeholder="Your name" /></Field>
        <Field label="Email"><input name="email" type="email" required placeholder="you@example.com" /></Field>
        <Field label="Phone (optional)"><input name="phone" placeholder="+91 …" /></Field>
        <Field label="Subject"><input name="subject" required placeholder="How can we help?" /></Field>
      </div>
      <Field label="Message"><textarea name="message" required rows={5} placeholder="Tell us more…" /></Field>
    </Shell>
  );
}

export function MembershipForm() {
  const f = useSubmit("/api/membership");
  return (
    <Shell {...f} onSubmit={f.submit} cta="Submit enquiry" doneTitle="Enquiry submitted" doneText="Welcome to the range! Our team will contact you with next steps on membership and training.">
      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Full name"><input name="name" required placeholder="Your name" /></Field>
        <Field label="Age"><input name="age" type="number" min={5} max={99} placeholder="Age" /></Field>
        <Field label="Email"><input name="email" type="email" required placeholder="you@example.com" /></Field>
        <Field label="Phone"><input name="phone" required placeholder="+91 …" /></Field>
        <Field label="Discipline of interest">
          <select name="discipline" defaultValue={DISCIPLINES[0]}>{DISCIPLINES.map((d) => <option key={d}>{d}</option>)}</select>
        </Field>
        <Field label="Experience">
          <select name="experience" defaultValue="Beginner">{["Beginner", "Club level", "State level", "National level"].map((d) => <option key={d}>{d}</option>)}</select>
        </Field>
      </div>
      <Field label="Anything else? (optional)"><textarea name="note" rows={4} placeholder="Goals, questions, preferred timings…" /></Field>
    </Shell>
  );
}
