"use client";

import { useRef, type ReactNode } from "react";
import { useInView, useReducedMotion } from "@/hooks/useAnimations";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right" | "none";
}

const directions = {
  up: { x: "0px", y: "30px" },
  left: { x: "-30px", y: "0px" },
  right: { x: "30px", y: "0px" },
  none: { x: "0px", y: "0px" },
};

/**
 * AnimatedSection - Fades and slides children into view on scroll with configurable direction.
 *
 * @component
 * @example
 * ```tsx
 * <AnimatedSection direction="up" delay={0.2}>
 *   <p>Animated content</p>
 * </AnimatedSection>
 * ```
 */
export function AnimatedSection({
  children,
  className,
  delay = 0,
  direction = "up",
}: AnimatedSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const offset = directions[direction];

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isInView ? 1 : 0,
        transform: isInView
          ? "translate(0px, 0px)"
          : `translate(${offset.x}, ${offset.y})`,
        transition: `opacity 0.6s ease-out ${delay}s, transform 0.6s ease-out ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}
