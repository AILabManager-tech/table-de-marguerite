"use client";

import { useRef } from "react";
import { useInView, useReducedMotion } from "@/hooks/useAnimations";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type DividerVariant = "vine" | "leaf" | "wheat";

interface BotanicalDividerProps {
  className?: string;
  variant?: DividerVariant;
}

/* ------------------------------------------------------------------ */
/*  SVG path data per variant (animated with CSS stroke-dash)          */
/* ------------------------------------------------------------------ */

function VinePaths({ isInView }: { isInView: boolean }) {
  return (
    <>
      {/* Central curving vine */}
      <path
        d="M60,25 C120,5 180,45 240,25 C300,5 360,45 420,25 C480,5 540,45 600,25 C660,5 720,45 780,25 C840,5 900,45 940,25"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        style={{
          strokeDasharray: 1200,
          strokeDashoffset: isInView ? 0 : 1200,
          transition: "stroke-dashoffset 2s ease-in-out",
        }}
      />
      {/* Small leaves along the vine */}
      {[150, 330, 510, 690, 870].map((cx, i) => (
        <ellipse
          key={i}
          cx={cx}
          cy={i % 2 === 0 ? 18 : 32}
          rx="8"
          ry="5"
          fill="currentColor"
          transform={`rotate(${i % 2 === 0 ? -30 : 30} ${cx} ${i % 2 === 0 ? 18 : 32})`}
          style={{
            opacity: isInView ? 0.5 : 0,
            transform: `rotate(${i % 2 === 0 ? -30 : 30}deg) scale(${isInView ? 1 : 0})`,
            transformOrigin: `${cx}px ${i % 2 === 0 ? 18 : 32}px`,
            transition: `opacity 0.4s ease-in-out ${0.3 + i * 0.2}s, transform 0.4s ease-in-out ${0.3 + i * 0.2}s`,
          }}
        />
      ))}
    </>
  );
}

function LeafPaths({ isInView }: { isInView: boolean }) {
  return (
    <>
      {/* Horizontal stem */}
      <line
        x1="40"
        y1="25"
        x2="960"
        y2="25"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        style={{
          strokeDasharray: 920,
          strokeDashoffset: isInView ? 0 : 920,
          transition: "stroke-dashoffset 1.5s ease-in-out",
        }}
      />
      {/* Scattered leaf shapes */}
      {[160, 340, 500, 660, 840].map((cx, i) => (
        <path
          key={i}
          d={`M${cx},25 C${cx - 12},${15 - (i % 2) * 20} ${cx + 12},${15 - (i % 2) * 20} ${cx},25`}
          fill="currentColor"
          style={{
            opacity: isInView ? 0.4 : 0,
            transform: `scale(${isInView ? 1 : 0})`,
            transformOrigin: `${cx}px 25px`,
            transition: `opacity 0.5s ease-in-out ${0.2 + i * 0.15}s, transform 0.5s ease-in-out ${0.2 + i * 0.15}s`,
          }}
        />
      ))}
    </>
  );
}

function WheatPaths({ isInView }: { isInView: boolean }) {
  return (
    <>
      {/* Central line */}
      <line
        x1="40"
        y1="25"
        x2="960"
        y2="25"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        style={{
          strokeDasharray: 920,
          strokeDashoffset: isInView ? 0 : 920,
          transition: "stroke-dashoffset 1.5s ease-in-out",
        }}
      />
      {/* Wheat ear clusters */}
      {[120, 280, 440, 560, 720, 880].map((cx, i) => (
        <g
          key={i}
          style={{
            opacity: isInView ? 0.5 : 0,
            transform: `translateY(${isInView ? 0 : 5}px)`,
            transition: `opacity 0.4s ease-in-out ${0.3 + i * 0.12}s, transform 0.4s ease-in-out ${0.3 + i * 0.12}s`,
          }}
        >
          {/* Three grain kernels per cluster */}
          <ellipse cx={cx - 4} cy={16} rx="3" ry="6" fill="currentColor" transform={`rotate(-15 ${cx - 4} 16)`} />
          <ellipse cx={cx} cy={14} rx="3" ry="6" fill="currentColor" />
          <ellipse cx={cx + 4} cy={16} rx="3" ry="6" fill="currentColor" transform={`rotate(15 ${cx + 4} 16)`} />
          {/* Small stem down to main line */}
          <line x1={cx} y1={20} x2={cx} y2="25" stroke="currentColor" strokeWidth="0.8" />
        </g>
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
 * wheat (grain ear clusters). Animated stroke-draw with CSS transitions.
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
  const ref = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();
  const isInView = useInView(ref, { once: true });

  const ANIMATED_VARIANTS: Record<DividerVariant, React.FC<{ isInView: boolean }>> = {
    vine: VinePaths,
    leaf: LeafPaths,
    wheat: WheatPaths,
  };

  const STATIC_VARIANTS: Record<DividerVariant, React.FC> = {
    vine: StaticVinePaths,
    leaf: StaticLeafPaths,
    wheat: StaticWheatPaths,
  };

  return (
    <div
      ref={ref}
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
        {prefersReduced ? (
          (() => {
            const StaticComp = STATIC_VARIANTS[variant];
            return <StaticComp />;
          })()
        ) : (
          (() => {
            const AnimatedComp = ANIMATED_VARIANTS[variant];
            return <AnimatedComp isInView={isInView} />;
          })()
        )}
      </svg>
    </div>
  );
}
