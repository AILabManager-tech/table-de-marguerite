"use client";

import { useRef, useEffect, useState, type ReactNode } from "react";
import { useReducedMotion } from "@/hooks/useAnimations";

interface ParallaxSectionProps {
  children: ReactNode;
  className?: string;
  speed?: number;
}

/**
 * ParallaxSection - Wraps children in a scroll-driven parallax effect with opacity fade.
 *
 * @component
 * @example
 * ```tsx
 * <ParallaxSection speed={0.3}>
 *   <p>Parallax content</p>
 * </ParallaxSection>
 * ```
 */
export function ParallaxSection({
  children,
  className,
  speed = 0.3,
}: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [style, setStyle] = useState({ y: 0, opacity: 1 });

  useEffect(() => {
    if (shouldReduceMotion) return;
    const el = ref.current;
    if (!el) return;

    function onScroll() {
      const rect = el!.getBoundingClientRect();
      const windowH = window.innerHeight;
      const progress = (windowH - rect.top) / (windowH + rect.height);
      const clamped = Math.max(0, Math.min(1, progress));
      const y = (clamped - 0.5) * 2 * speed * -100;
      const opacity =
        clamped < 0.2
          ? 0.4 + (clamped / 0.2) * 0.6
          : clamped > 0.8
            ? 0.4 + ((1 - clamped) / 0.2) * 0.6
            : 1;
      setStyle({ y, opacity });
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [shouldReduceMotion, speed]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className ?? ""}`}>
      {shouldReduceMotion ? (
        <div>{children}</div>
      ) : (
        <div
          style={{
            transform: `translateY(${style.y}px)`,
            opacity: style.opacity,
            willChange: "transform, opacity",
          }}
        >
          {children}
        </div>
      )}
    </div>
  );
}
