"use client";

import { motion, useReducedMotion } from "framer-motion";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type DividerVariant = "vine" | "leaf" | "wheat";

interface BotanicalDividerProps {
  className?: string;
  variant?: DividerVariant;
}

/* ------------------------------------------------------------------ */
/*  SVG path data per variant                                          */
/* ------------------------------------------------------------------ */

/** Each variant produces a decorative botanical SVG pattern */
function VinePaths() {
  return (
    <>
      {/* Central curving vine */}
      <motion.path
        d="M60,25 C120,5 180,45 240,25 C300,5 360,45 420,25 C480,5 540,45 600,25 C660,5 720,45 780,25 C840,5 900,45 940,25"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 2, ease: "easeInOut" as const }}
      />
      {/* Small leaves along the vine */}
      {[150, 330, 510, 690, 870].map((cx, i) => (
        <motion.ellipse
          key={i}
          cx={cx}
          cy={i % 2 === 0 ? 18 : 32}
          rx="8"
          ry="5"
          fill="currentColor"
          transform={`rotate(${i % 2 === 0 ? -30 : 30} ${cx} ${i % 2 === 0 ? 18 : 32})`}
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 0.5, scale: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.4,
            delay: 0.3 + i * 0.2,
            ease: "easeInOut" as const,
          }}
        />
      ))}
    </>
  );
}

function LeafPaths() {
  return (
    <>
      {/* Horizontal stem */}
      <motion.line
        x1="40"
        y1="25"
        x2="960"
        y2="25"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: "easeInOut" as const }}
      />
      {/* Scattered leaf shapes */}
      {[160, 340, 500, 660, 840].map((cx, i) => (
        <motion.path
          key={i}
          d={`M${cx},25 C${cx - 12},${15 - (i % 2) * 20} ${cx + 12},${15 - (i % 2) * 20} ${cx},25`}
          fill="currentColor"
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 0.4, scale: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.5,
            delay: 0.2 + i * 0.15,
            ease: "easeInOut" as const,
          }}
        />
      ))}
    </>
  );
}

function WheatPaths() {
  return (
    <>
      {/* Central line */}
      <motion.line
        x1="40"
        y1="25"
        x2="960"
        y2="25"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: "easeInOut" as const }}
      />
      {/* Wheat ear clusters */}
      {[120, 280, 440, 560, 720, 880].map((cx, i) => (
        <motion.g
          key={i}
          initial={{ opacity: 0, y: 5 }}
          whileInView={{ opacity: 0.5, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.4,
            delay: 0.3 + i * 0.12,
            ease: "easeInOut" as const,
          }}
        >
          {/* Three grain kernels per cluster */}
          <ellipse cx={cx - 4} cy={16} rx="3" ry="6" fill="currentColor" transform={`rotate(-15 ${cx - 4} 16)`} />
          <ellipse cx={cx} cy={14} rx="3" ry="6" fill="currentColor" />
          <ellipse cx={cx + 4} cy={16} rx="3" ry="6" fill="currentColor" transform={`rotate(15 ${cx + 4} 16)`} />
          {/* Small stem down to main line */}
          <line x1={cx} y1={20} x2={cx} y2="25" stroke="currentColor" strokeWidth="0.8" />
        </motion.g>
      ))}
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Reduced-motion fallback variants                                   */
/* ------------------------------------------------------------------ */

function StaticVinePaths() {
  return (
    <>
      <path
        d="M60,25 C120,5 180,45 240,25 C300,5 360,45 420,25 C480,5 540,45 600,25 C660,5 720,45 780,25 C840,5 900,45 940,25"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      {[150, 330, 510, 690, 870].map((cx, i) => (
        <ellipse
          key={i}
          cx={cx}
          cy={i % 2 === 0 ? 18 : 32}
          rx="8"
          ry="5"
          fill="currentColor"
          opacity="0.5"
          transform={`rotate(${i % 2 === 0 ? -30 : 30} ${cx} ${i % 2 === 0 ? 18 : 32})`}
        />
      ))}
    </>
  );
}

function StaticLeafPaths() {
  return (
    <>
      <line x1="40" y1="25" x2="960" y2="25" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
      {[160, 340, 500, 660, 840].map((cx, i) => (
        <path
          key={i}
          d={`M${cx},25 C${cx - 12},${15 - (i % 2) * 20} ${cx + 12},${15 - (i % 2) * 20} ${cx},25`}
          fill="currentColor"
          opacity="0.4"
        />
      ))}
    </>
  );
}

function StaticWheatPaths() {
  return (
    <>
      <line x1="40" y1="25" x2="960" y2="25" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
      {[120, 280, 440, 560, 720, 880].map((cx, i) => (
        <g key={i} opacity="0.5">
          <ellipse cx={cx - 4} cy={16} rx="3" ry="6" fill="currentColor" transform={`rotate(-15 ${cx - 4} 16)`} />
          <ellipse cx={cx} cy={14} rx="3" ry="6" fill="currentColor" />
          <ellipse cx={cx + 4} cy={16} rx="3" ry="6" fill="currentColor" transform={`rotate(15 ${cx + 4} 16)`} />
          <line x1={cx} y1={20} x2={cx} y2="25" stroke="currentColor" strokeWidth="0.8" />
        </g>
      ))}
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Main export                                                        */
/* ------------------------------------------------------------------ */

/**
 * BotanicalDivider -- Decorative SVG divider with organic botanical motifs.
 *
 * Three variants: vine (curving tendrils), leaf (scattered leaves),
 * wheat (grain ear clusters). Animated stroke-draw with framer-motion.
 *
 * @component
 * @example
 * ```tsx
 * <BotanicalDivider variant="vine" className="my-12" />
 * ```
 */
export function BotanicalDivider({
  className = "",
  variant = "vine",
}: BotanicalDividerProps) {
  const prefersReduced = useReducedMotion() ?? false;

  const ANIMATED_VARIANTS: Record<DividerVariant, () => JSX.Element> = {
    vine: VinePaths,
    leaf: LeafPaths,
    wheat: WheatPaths,
  };

  const STATIC_VARIANTS: Record<DividerVariant, () => JSX.Element> = {
    vine: StaticVinePaths,
    leaf: StaticLeafPaths,
    wheat: StaticWheatPaths,
  };

  const PathComponent = prefersReduced
    ? STATIC_VARIANTS[variant]
    : ANIMATED_VARIANTS[variant];

  return (
    <div
      className={`w-full overflow-hidden text-olive-400 ${className}`}
      role="separator"
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1000 50"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid meet"
        className="mx-auto h-[50px] w-full max-w-5xl"
      >
        <PathComponent />
      </svg>
    </div>
  );
}
