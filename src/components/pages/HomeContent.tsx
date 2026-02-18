"use client";

import { useRef } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";
import { useInView, useReducedMotion } from "@/hooks/useAnimations";
import { TextReveal } from "@/components/animations/TextReveal";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

/* ------------------------------------------------------------------ */
/*  Dynamic imports for below-fold heavy components                     */
/* ------------------------------------------------------------------ */

const AuroraBackground = dynamic(
  () =>
    import("@/components/animations/AuroraBackground").then((m) => ({
      default: m.AuroraBackground,
    })),
  { ssr: false, loading: () => null }
);

const CountUp = dynamic(
  () =>
    import("@/components/animations/CountUp").then((m) => ({
      default: m.CountUp,
    })),
  { ssr: false, loading: () => null }
);

const FloatingElement = dynamic(
  () =>
    import("@/components/animations/FloatingElement").then((m) => ({
      default: m.FloatingElement,
    })),
  { ssr: false, loading: () => null }
);

const MagneticButton = dynamic(
  () =>
    import("@/components/animations/MagneticButton").then((m) => ({
      default: m.MagneticButton,
    })),
  {
    ssr: false,
    loading: () => null,
  }
);

const LineReveal = dynamic(
  () =>
    import("@/components/animations/LineReveal").then((m) => ({
      default: m.LineReveal,
    })),
  { ssr: false, loading: () => null }
);

const SeasonalMenuExplorer = dynamic(
  () =>
    import("@/components/interactive/SeasonalMenuExplorer").then((m) => ({
      default: m.SeasonalMenuExplorer,
    })),
  {
    ssr: false,
    loading: () => (
      <div className="bg-cream-200 py-16 lg:py-24">
        <div className="mx-auto max-w-6xl px-4 text-center">
          <div className="h-8 w-64 mx-auto rounded bg-cream-300 animate-pulse" />
        </div>
      </div>
    ),
  }
);

const BotanicalDivider = dynamic(
  () =>
    import("@/components/interactive/BotanicalDivider").then((m) => ({
      default: m.BotanicalDivider,
    })),
  { ssr: false, loading: () => <div className="my-4 h-[50px]" /> }
);

/* ------------------------------------------------------------------ */
/*  Testimonial card                                                   */
/* ------------------------------------------------------------------ */

interface TestimonialCardProps {
  index: number;
  prefersReduced: boolean;
}

function TestimonialCard({ index, prefersReduced }: TestimonialCardProps) {
  const t = useTranslations("home.testimonials");
  const ref = useRef<HTMLQuoteElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <blockquote
      ref={ref}
      className="flex flex-col rounded-2xl border border-cream-300 bg-cream-100/80 p-6 shadow-sm backdrop-blur-sm"
      style={{
        opacity: prefersReduced || isInView ? 1 : 0,
        transform: prefersReduced || isInView ? "translateY(0)" : "translateY(30px)",
        transition: `opacity 0.5s ease-in-out ${index * 0.15}s, transform 0.5s ease-in-out ${index * 0.15}s`,
      }}
    >
      {/* Stars */}
      <div className="mb-4 flex gap-1 text-terra-400" aria-hidden="true">
        {Array.from({ length: 5 }, (_, i) => (
          <svg key={i} className="h-4 w-4 fill-current" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>

      <p className="mb-6 flex-1 font-body text-bark-light leading-relaxed italic">
        &ldquo;{t(`${index}.quote`)}&rdquo;
      </p>

      <footer className="flex items-center gap-3 border-t border-cream-300 pt-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-olive-100 font-heading text-sm font-bold text-olive-600">
          {t(`${index}.name`).charAt(0)}
        </div>
        <div>
          <p className="font-heading text-sm font-medium text-bark">
            {t(`${index}.name`)}
          </p>
          <p className="font-body text-xs text-bark-light">
            {t(`${index}.role`)}
          </p>
        </div>
      </footer>
    </blockquote>
  );
}

/* ------------------------------------------------------------------ */
/*  Gallery card (inline -- lightweight masonry)                        */
/* ------------------------------------------------------------------ */

const GALLERY_IMAGES = [
  { key: "img_1", span: "col-span-2 row-span-2" },
  { key: "img_2", span: "col-span-1 row-span-1" },
  { key: "img_3", span: "col-span-1 row-span-1" },
  { key: "img_4", span: "col-span-1 row-span-2" },
  { key: "img_5", span: "col-span-1 row-span-1" },
  { key: "img_6", span: "col-span-1 row-span-1" },
] as const;

/* ------------------------------------------------------------------ */
/*  Main export                                                        */
/* ------------------------------------------------------------------ */

/**
 * HomeContent -- Landing page for La Table de Marguerite featuring a
 * gastronomic hero, philosophy section, seasonal menu explorer,
 * food gallery, testimonials, and reservation CTA.
 *
 * Below-fold sections use next/dynamic with ssr:false to reduce
 * initial JavaScript bundle and Total Blocking Time (TBT).
 *
 * @component
 * @example
 * ```tsx
 * <HomeContent />
 * ```
 */
export function HomeContent() {
  const t = useTranslations("home");
  const prefersReduced = useReducedMotion();
  const galleryRef = useRef<HTMLDivElement>(null);
  const galleryInView = useInView(galleryRef, { once: true });

  return (
    <main>
      {/* ============================================================ */}
      {/*  1. Hero -- Full-width with AuroraBackground (bark tones)    */}
      {/* ============================================================ */}
      <section className="relative flex min-h-screen items-center overflow-hidden bg-bark">
        <AuroraBackground />
        <div className="absolute inset-0 grid-overlay opacity-20" />

        <div className="container-wide relative z-10 section-padding">
          <div className="max-w-2xl">
            <AnimatedSection delay={0.1} direction="none">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full glass-dark px-4 py-2">
                <span className="h-2 w-2 rounded-full bg-terra-400 animate-glow-pulse" />
                <span className="font-body text-sm font-medium text-cream-300">
                  {t("hero.badge")}
                </span>
              </div>
            </AnimatedSection>

            <TextReveal className="mb-6 !text-white" delay={0.2}>
              {t("hero.title")}
            </TextReveal>

            <AnimatedSection delay={0.6} direction="none">
              <p className="mb-10 font-body text-lg text-cream-300/90 md:text-xl leading-relaxed">
                {t("hero.subtitle")}
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.9} direction="none">
              <div className="flex flex-col gap-4 sm:flex-row">
                <MagneticButton
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-xl bg-terra-600 px-8 py-4 font-heading text-lg font-medium text-cream-100 transition-all hover:bg-terra-700 hover:shadow-xl hover:shadow-terra-600/25"
                  strength={0.35}
                >
                  {t("hero.cta")}
                </MagneticButton>
                <MagneticButton
                  href="/menu"
                  className="inline-flex items-center justify-center rounded-xl border-2 border-white/30 px-8 py-4 font-heading text-lg font-medium text-white backdrop-blur-sm transition-all hover:bg-white/10 hover:border-white/50"
                  strength={0.25}
                >
                  {t("hero.cta_secondary")}
                </MagneticButton>
              </div>
            </AnimatedSection>
          </div>

          {/* Floating elements -- right side */}
          <div className="pointer-events-none absolute right-0 top-1/4 hidden lg:block">
            <FloatingElement amplitude={15} duration={7}>
              <div className="h-20 w-20 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md" />
            </FloatingElement>
            <FloatingElement amplitude={10} duration={5} delay={1} className="ml-24 mt-8">
              <div className="h-12 w-12 rounded-xl border border-terra-400/20 bg-terra-400/10 backdrop-blur-sm" />
            </FloatingElement>
            <FloatingElement amplitude={18} duration={8} delay={2} className="-ml-8 mt-6">
              <div className="h-16 w-16 rounded-full border border-olive-400/15 bg-olive-400/10 backdrop-blur-sm" />
            </FloatingElement>
          </div>
        </div>

        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-cream-200 to-transparent" />
      </section>

      {/* ============================================================ */}
      {/*  2. Philosophie -- Cuisine locale & saisonniere + stats       */}
      {/* ============================================================ */}

      {/* Stats bar -- glassmorphism */}
      <section className="relative -mt-16 z-20">
        <div className="container-wide px-6">
          <div className="glass rounded-2xl p-8">
            <div className="grid grid-cols-3 gap-8 text-center">
              <div>
                <p className="font-heading text-3xl font-bold text-olive-600 md:text-4xl">
                  <CountUp to={37} suffix=" " />
                  {t("stats.years_suffix")}
                </p>
                <p className="mt-1 font-body text-sm text-bark-light">
                  {t("stats.experience")}
                </p>
              </div>
              <div>
                <p className="font-heading text-3xl font-bold text-terra-500 md:text-4xl">
                  <CountUp to={100} suffix="%" />
                </p>
                <p className="mt-1 font-body text-sm text-bark-light">
                  {t("stats.local")}
                </p>
              </div>
              <div>
                <p className="font-heading text-3xl font-bold text-prune-500 md:text-4xl">
                  <CountUp to={4} />
                </p>
                <p className="mt-1 font-body text-sm text-bark-light">
                  {t("stats.seasons")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy text */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 gradient-mesh-bg" />
        <div className="container-narrow relative z-10">
          <AnimatedSection>
            <TextReveal as="h2" className="mb-4 text-center">
              {t("philosophy.title")}
            </TextReveal>
          </AnimatedSection>
          <LineReveal className="mx-auto mb-8 w-24" color="bg-olive-400" delay={0.3} />
          <AnimatedSection delay={0.2}>
            <div className="space-y-5 font-body text-lg leading-relaxed text-bark-light">
              <p>{t("philosophy.p1")}</p>
              <p>{t("philosophy.p2")}</p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <BotanicalDivider variant="vine" className="my-4" />

      {/* ============================================================ */}
      {/*  3. SeasonalMenuExplorer -- Interactive seasonal carousel     */}
      {/* ============================================================ */}
      <SeasonalMenuExplorer />

      <BotanicalDivider variant="leaf" className="my-4" />

      {/* ============================================================ */}
      {/*  4. Food Gallery -- Masonry grid                             */}
      {/* ============================================================ */}
      <section className="section-padding relative overflow-hidden bg-cream-200">
        <div className="container-wide relative z-10">
          <AnimatedSection>
            <TextReveal as="h2" className="mb-4 text-center">
              {t("gallery.title")}
            </TextReveal>
          </AnimatedSection>
          <AnimatedSection delay={0.2} direction="none">
            <p className="mx-auto mb-4 max-w-xl text-center font-body text-lg text-bark-light">
              {t("gallery.subtitle")}
            </p>
          </AnimatedSection>
          <LineReveal className="mx-auto mb-12 w-24" color="bg-terra-400" delay={0.3} />

          <div ref={galleryRef} className="grid auto-rows-[180px] grid-cols-2 gap-4 md:grid-cols-4">
            {GALLERY_IMAGES.map(({ key, span }, i) => (
              <div
                key={key}
                className={`group relative overflow-hidden rounded-xl ${span}`}
                style={{
                  opacity: prefersReduced || galleryInView ? 1 : 0,
                  transform: prefersReduced || galleryInView ? "scale(1)" : "scale(0.95)",
                  transition: `opacity 0.4s ease-in-out ${i * 0.08}s, transform 0.4s ease-in-out ${i * 0.08}s`,
                }}
              >
                <div className="h-full w-full bg-gradient-to-br from-olive-100 to-cream-300 flex items-center justify-center">
                  <span className="font-heading text-sm text-olive-600">
                    {t(`gallery.${key}.caption`)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <BotanicalDivider variant="wheat" className="my-4" />

      {/* ============================================================ */}
      {/*  5. Testimonials -- 3 client reviews                         */}
      {/* ============================================================ */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 gradient-mesh-bg" />
        <div className="container-wide relative z-10">
          <AnimatedSection>
            <TextReveal as="h2" className="mb-4 text-center">
              {t("testimonials.title")}
            </TextReveal>
          </AnimatedSection>
          <LineReveal className="mx-auto mb-12 w-24" color="bg-prune-400" delay={0.3} />

          <div className="grid gap-6 md:grid-cols-3">
            {[0, 1, 2].map((i) => (
              <TestimonialCard
                key={i}
                index={i}
                prefersReduced={prefersReduced}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  6. Reservation CTA                                          */}
      {/* ============================================================ */}
      <section className="relative overflow-hidden bg-bark py-16 lg:py-24">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-1/4 -top-1/4 h-[500px] w-[500px] rounded-full bg-olive-700/10 blur-[100px]" />
          <div className="absolute -right-1/4 bottom-0 h-[400px] w-[400px] rounded-full bg-terra-500/10 blur-[80px]" />
        </div>

        <div className="container-narrow relative z-10 text-center section-padding">
          <AnimatedSection>
            <TextReveal as="h2" className="mb-4 !text-cream-100">
              {t("reservation.title")}
            </TextReveal>
          </AnimatedSection>
          <AnimatedSection delay={0.3}>
            <p className="mb-10 font-body text-lg text-cream-300/90">
              {t("reservation.subtitle")}
            </p>
          </AnimatedSection>
          <AnimatedSection delay={0.5}>
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <MagneticButton
                href="/contact"
                className="inline-flex items-center justify-center rounded-xl bg-terra-600 px-10 py-5 font-heading text-lg font-medium text-cream-100 transition-all hover:bg-terra-700 hover:shadow-xl hover:shadow-terra-600/25"
                strength={0.4}
              >
                {t("reservation.cta")}
              </MagneticButton>
              <Link
                href="/menu"
                className="font-body text-cream-300 underline underline-offset-4 transition-colors hover:text-cream-100"
              >
                {t("reservation.menu_link")}
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </main>
  );
}
