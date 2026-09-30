"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

/** Crosshair cursor that follows the pointer and tightens over interactive elements. */
export default function Cursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.4 });
  const [enabled, setEnabled] = useState(false);
  const [hover, setHover] = useState(false);
  const [down, setDown] = useState(false);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setEnabled(true);
    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const t = e.target as HTMLElement | null;
      setHover(!!t?.closest("a, button, input, select, textarea, [data-cursor]"));
    };
    const d = () => setDown(true);
    const u = () => setDown(false);
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerdown", d);
    window.addEventListener("pointerup", u);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerdown", d);
      window.removeEventListener("pointerup", u);
    };
  }, [x, y]);

  if (!enabled) return null;
  return (
    <>
      <motion.div
        aria-hidden
        style={{ x: sx, y: sy }}
        className="pointer-events-none fixed left-0 top-0 z-[100] -ml-5 -mt-5 h-10 w-10 mix-blend-difference"
      >
        <motion.div
          animate={{ scale: down ? 0.6 : hover ? 1.7 : 1, rotate: hover ? 45 : 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="relative h-full w-full"
        >
          <span className="absolute inset-0 rounded-full border border-white" />
          <span className="absolute left-1/2 top-[-6px] h-[14px] w-px -translate-x-1/2 bg-white" />
          <span className="absolute bottom-[-6px] left-1/2 h-[14px] w-px -translate-x-1/2 bg-white" />
          <span className="absolute left-[-6px] top-1/2 h-px w-[14px] -translate-y-1/2 bg-white" />
          <span className="absolute right-[-6px] top-1/2 h-px w-[14px] -translate-y-1/2 bg-white" />
        </motion.div>
      </motion.div>
      <motion.div
        aria-hidden
        style={{ x, y }}
        className="pointer-events-none fixed left-0 top-0 z-[100] -ml-[3px] -mt-[3px] h-[6px] w-[6px] rounded-full bg-flame"
      />
    </>
  );
}
