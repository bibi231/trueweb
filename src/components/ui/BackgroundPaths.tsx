"use client";

import { useId } from "react";
import { motion } from "framer-motion";

type Props = {
  className?: string;
  opacity?: number;
  color?: string;
};

const PATHS = [
  "M-100 200 C 50 100, 150 300, 300 200 S 450 100, 600 200 S 750 300, 900 200",
  "M-100 250 C 100 150, 200 350, 400 250 S 600 150, 800 250 S 950 350, 1100 250",
  "M0 300 Q 200 150 400 300 T 800 300 T 1200 300",
  "M-50 150 C 150 50, 250 250, 450 150 S 650 50, 850 150 S 1050 250, 1250 150",
  "M100 350 C 250 200, 350 400, 550 350 S 750 200, 950 350 S 1150 400, 1350 350",
];

export function BackgroundPaths({ className = "", opacity = 0.3, color = "var(--teal)" }: Props) {
  const id = useId();

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`} aria-hidden>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 1200 600"
        preserveAspectRatio="xMidYMid slice"
        style={{ opacity }}
      >
        <defs>
          <linearGradient id={`${id}-grad`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={color} stopOpacity="0" />
            <stop offset="30%" stopColor={color} stopOpacity="0.8" />
            <stop offset="70%" stopColor={color} stopOpacity="0.8" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
        {PATHS.map((d, i) => (
          <motion.path
            key={i}
            d={d}
            fill="none"
            stroke={`url(#${id}-grad)`}
            strokeWidth={1.5 - i * 0.2}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{
              pathLength: { duration: 3 + i * 0.5, ease: "easeInOut", delay: i * 0.3 },
              opacity: { duration: 0.5, delay: i * 0.3 },
            }}
          />
        ))}
        {PATHS.map((d, i) => (
          <motion.path
            key={`pulse-${i}`}
            d={d}
            fill="none"
            stroke={color}
            strokeWidth={1}
            strokeOpacity={0.2}
            initial={{ pathLength: 0, pathOffset: 0 }}
            animate={{ pathOffset: [0, 1] }}
            transition={{
              pathOffset: { duration: 6 + i, ease: "linear", repeat: Infinity, delay: i * 0.5 },
            }}
            style={{ strokeDasharray: "80px 1000px" }}
          />
        ))}
      </svg>
    </div>
  );
}
