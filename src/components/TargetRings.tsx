"use client";

import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useEffect } from "react";

/** Interactive ISSF-style target that reacts to pointer movement and "fires" shots periodically. */
export default function TargetRings({ className = "" }: { className?: string }) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(useTransform(mx, [-1, 1], [-18, 18]), { stiffness: 80, damping: 18 });
  const y = useSpring(useTransform(my, [-1, 1], [-18, 18]), { stiffness: 80, damping: 18 });

  useEffect(() => {
    const move = (e: PointerEvent) => {
      mx.set((e.clientX / window.innerWidth) * 2 - 1);
      my.set((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, [mx, my]);

  const rings = [
    { r: 190, fill: "#f5efe4", n: "" },
    { r: 152, fill: "#f5efe4", n: "" },
    { r: 114, fill: "#0c0c28", n: "" },
    { r: 76, fill: "#0c0c28", n: "" },
    { r: 40, fill: "#ff5a1f", n: "" },
  ];
  const shots = [
    { cx: 214, cy: 196, d: 1.2 },
    { cx: 186, cy: 212, d: 1.9 },
    { cx: 203, cy: 181, d: 2.6 },
    { cx: 228, cy: 208, d: 3.3 },
    { cx: 197, cy: 203, d: 4.0 },
  ];

  return (
    <motion.svg style={{ x, y }} viewBox="0 0 400 400" className={className} aria-hidden>
      <defs>
        <radialGradient id="tglow" cx="50%" cy="50%" r="50%">
          <stop offset="60%" stopColor="#ff5a1f" stopOpacity="0" />
          <stop offset="100%" stopColor="#ff5a1f" stopOpacity="0.35" />
        </radialGradient>
      </defs>
      <circle cx="200" cy="200" r="198" fill="url(#tglow)" />
      <motion.g
        initial={{ scale: 0.4, opacity: 0, rotate: -40 }}
        animate={{ scale: 1, opacity: 1, rotate: 0 }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformOrigin: "200px 200px" }}
      >
        {rings.map((c) => (
          <circle key={c.r} cx="200" cy="200" r={c.r} fill={c.fill} stroke="#06061a" strokeWidth="2" />
        ))}
        {[152, 114, 76].map((r) => (
          <circle key={`d${r}`} cx="200" cy="200" r={r - 19} fill="none" stroke={r === 152 ? "#06061a" : "#f5efe4"} strokeOpacity="0.25" strokeDasharray="3 5" />
        ))}
        <path d="M200 0V400M0 200H400" stroke="#06061a" strokeOpacity="0.35" strokeWidth="1" />
      </motion.g>
      {shots.map((s) => (
        <g key={s.d}>
          <motion.circle
            cx={s.cx}
            cy={s.cy}
            r="6"
            fill="none"
            stroke="#ff5a1f"
            strokeWidth="2"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0, 3.2], opacity: [0.9, 0] }}
            transition={{ delay: s.d, duration: 0.9, repeat: Infinity, repeatDelay: 5.5 }}
            style={{ transformOrigin: `${s.cx}px ${s.cy}px` }}
          />
          <motion.circle
            cx={s.cx}
            cy={s.cy}
            r="5"
            fill="#06061a"
            stroke="#fff"
            strokeWidth="1.5"
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.6, 1] }}
            transition={{ delay: s.d, duration: 0.35 }}
          />
        </g>
      ))}
    </motion.svg>
  );
}
