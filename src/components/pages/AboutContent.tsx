"use client";

import { useRef } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";
import { Leaf, ChefHat, Heart } from "lucide-react";
import { useInView, useReducedMotion } from "@/hooks/useAnimations";
import { TextReveal } from "@/components/animations/TextReveal";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

/* ------------------------------------------------------------------ */
/*  Dynamic imports for heavy components                                */
/* ------------------------------------------------------------------ */

const AuroraBackground = dynamic(
  () =>
    import("@/components/animations/AuroraBackground").then((m) => ({
      default: m.AuroraBackground,
    })),
  { ssr: false, loading: () => null }
);

const LineReveal = dynamic(
  () =>
    import("@/components/animations/LineReveal").then((m) => ({
      default: m.LineReveal,
    })),
  { ssr: false, loading: () => null }
);

const StaggerGrid = dynamic(
  () =>
    import("@/components/animations/StaggerGrid").then((m) => ({
      default: m.StaggerGrid,
    })),
  {
    ssr: false,
    loading: () => null,
  }
);

const MagneticButton = dynamic(
  () =>
    import("@/components/animations/MagneticButton").then((m) => ({
      default: m.MagneticButton,
    })),
  { ssr: false, loading: () => null }
);

const BotanicalDivider = dynamic(
  () =>
    import("@/components/interactive/BotanicalDivider").then((m) => ({
      default: m.BotanicalDivider,
    })),
  { ssr: false, loading: () => <div className="my-4 h-[50px]" /> }
);

/* ------------------------------------------------------------------ */
/*  Values data                                                        */
/* ------------------------------------------------------------------ */

const VALUES = [
  { key: "terroir", Icon: Leaf, accent: "olive" },
  { key: "savoirfaire", Icon: ChefHat, accent: "terra" },
  { key: "convivialite", Icon: Heart, accent: "prune" },
] as const;

type ValueAccent = "olive" | "terra" | "prune";

const valueAccentMap: Record<ValueAccent, { bg: string; text: string; border: string }> = {
  olive: { bg: "bg-olive-50", text: "text-olive-600", border: "border-olive-200" },
  terra: { bg: "bg-terra-50", text: "text-terra-500", border: "border-terra-200" },
  prune: { bg: "bg-prune-50", text: "text-prune-600", border: "border-prune-200" },
};

/* ------------------------------------------------------------------ */
/*  Team member card                                                   */
/* ------------------------------------------------------------------ */

interface TeamMemberProps {
  index: number;
  prefersReduced: boolean;
}

function TeamMemberCard({ index, prefersReduced }: TeamMemberProps) {
  const t = useTranslations("about.team");
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  const accentColors = ["olive", "terra", "prune"] as const;
  const accent = accentColors[index % accentColors.length] ?? "olive";
  const colors = valueAccentMap[accent];

  return (
    <div
      ref={ref}
      className={`group rounded-2xl border ${colors.border} bg-cream-100/80 p-6 text-center shadow-sm backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1`}
      style={{
        opacity: prefersReduced || isInView ? 1 : 0,
        transform: prefersReduced || isInView
          ? undefined
          : "translateY(30px)",
        transition: `opacity 0.5s ease-in-out ${index * 0.15}s, transform 0.5s ease-in-out ${index * 0.15}s`,
      }}
    >
      {/* Avatar placeholder */}
      <div
        className={`mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full ${colors.bg} ${colors.text} font-heading text-2xl font-bold`}
      >
        {t(`${index}.name`).charAt(0)}
      </div>

      <h3 className={`mb-1 font-heading text-lg font-semibold ${colors.text}`}>
        {t(`${index}.name`)}
      </h3>
      <p className="mb-3 font-body text-sm text-bark-light">
        {t(`${index}.role`)}
      </p>
      <p className="font-body text-sm leading-relaxed text-bark-light">
        {t(`${index}.bio`)}
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main export                                                        */
/* ------------------------------------------------------------------ */

/**
 * AboutContent -- "Notre Histoire" page for La Table de Marguerite.
 * Features the founding story, core values, team members, and a CTA.
 *
 * Heavy animation components loaded via next/dynamic with ssr:false
 * to reduce Total Blocking Time.
 *
 * @component
 * @example
 * ```tsx
 * <AboutContent />
 * ```
 */
export function AboutContent() {
  const t = useTranslations("about");
  const prefersReduced = useReducedMotion();

  return (
    <main>
      {/* ============================================================ */}
      {/*  1. Hero -- bark bg, badge "Depuis 1987"                     */}
      {/* ============================================================ */}
      <section className="relative flex min-h-[50vh] items-center overflow-hidden bg-bark">
        <AuroraBackground />
        <div className="absolute inset-0 grid-overlay opacity-20" />
        <div className="container-narrow text-center relative z-10 section-padding">
          <AnimatedSection delay={0.1} direction="none">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full glass-dark px-4 py-2">
              <span className="h-2 w-2 rounded-full bg-terra-400 animate-glow-pulse" />
              <span className="font-body text-sm font-medium text-cream-300">
                {t("hero.badge")}
              </span>
            </div>
          </AnimatedSection>
          <TextReveal className="mb-4 !text-cream-100">{t("hero.title")}</TextReveal>
          <AnimatedSection delay={0.4} direction="none">
            <p className="font-body text-lg text-cream-300/90 md:text-xl">
              {t("hero.subtitle")}
            </p>
          </AnimatedSection>
          <LineReveal className="mx-auto mt-8 w-24" delay={0.6} />
        </div>
      </section>

      {/* ============================================================ */}
      {/*  2. Story -- Marguerite's founding story                     */}
      {/* ============================================================ */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 gradient-mesh-bg" />
        <div className="container-narrow relative z-10">
          <AnimatedSection>
            <TextReveal as="h2" className="mb-4">
              {t("story.title")}
            </TextReveal>
          </AnimatedSection>
          <LineReveal className="mb-8 w-16" color="bg-olive-400" delay={0.3} />
          <AnimatedSection delay={0.2}>
            <div className="space-y-5 font-body text-lg leading-relaxed text-bark-light">
              <p>{t("story.p1")}</p>
              <p>{t("story.p2")}</p>
              <p>{t("story.p3")}</p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <BotanicalDivider variant="vine" className="my-4" />

      {/* ============================================================ */}
      {/*  3. Values -- Terroir, Savoir-faire, Convivialite            */}
      {/* ============================================================ */}
      <section className="section-padding relative overflow-hidden bg-cream-200/50">
        <div className="absolute inset-0 gradient-mesh-bg" />
        <div className="container-wide relative z-10">
          <AnimatedSection>
            <TextReveal as="h2" className="mb-4 text-center">
              {t("values.title")}
            </TextReveal>
          </AnimatedSection>
          <LineReveal className="mx-auto mb-12 w-24" color="bg-terra-400" delay={0.3} />

          <StaggerGrid className="grid gap-6 md:grid-cols-3" stagger={0.12}>
            {VALUES.map(({ key, Icon, accent }) => {
              const colors = valueAccentMap[accent];
              return (
                <div
                  key={key}
                  className={`rounded-2xl border ${colors.border} bg-cream-100/80 p-8 text-center shadow-sm backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1`}
                >
                  <div
                    className={`mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-xl ${colors.bg} ${colors.text}`}
                  >
                    <Icon className="h-8 w-8" strokeWidth={1.5} />
                  </div>
                  <h3 className={`mb-3 font-heading text-xl font-semibold ${colors.text}`}>
                    {t(`values.${key}.title`)}
                  </h3>
                  <p className="font-body text-sm leading-relaxed text-bark-light">
                    {t(`values.${key}.description`)}
                  </p>
                </div>
              );
            })}
          </StaggerGrid>
        </div>
      </section>

      <BotanicalDivider variant="leaf" className="my-4" />

      {/* ============================================================ */}
      {/*  4. Equipe -- 3 team members                                 */}
      {/* ============================================================ */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 gradient-mesh-bg" />
        <div className="container-wide relative z-10">
          <AnimatedSection>
            <TextReveal as="h2" className="mb-4 text-center">
              {t("team.title")}
            </TextReveal>
          </AnimatedSection>
          <LineReveal className="mx-auto mb-12 w-24" color="bg-prune-400" delay={0.3} />

          <div className="grid gap-8 md:grid-cols-3">
            {[0, 1, 2].map((i) => (
              <TeamMemberCard
                key={i}
                index={i}
                prefersReduced={prefersReduced}
              />
            ))}
          </div>
        </div>
      </section>

      <BotanicalDivider variant="wheat" className="my-4" />

      {/* ============================================================ */}
      {/*  5. CTA -- "Venez nous rencontrer"                           */}
      {/* ============================================================ */}
      <section className="relative overflow-hidden bg-bark py-16 lg:py-24">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-1/4 -top-1/4 h-[500px] w-[500px] rounded-full bg-olive-700/10 blur-[100px]" />
          <div className="absolute -right-1/4 bottom-0 h-[400px] w-[400px] rounded-full bg-prune-500/10 blur-[80px]" />
        </div>

        <div className="container-narrow relative z-10 text-center">
          <AnimatedSection>
            <TextReveal as="h2" className="mb-4 !text-cream-100">
              {t("cta.title")}
            </TextReveal>
          </AnimatedSection>
          <AnimatedSection delay={0.3}>
            <p className="mb-10 font-body text-lg text-cream-300/90">
              {t("cta.subtitle")}
            </p>
          </AnimatedSection>
          <AnimatedSection delay={0.5}>
            <MagneticButton
              href="/contact"
              className="inline-flex items-center justify-center rounded-xl bg-terra-600 px-10 py-5 font-heading text-lg font-medium text-cream-100 transition-all hover:bg-terra-700 hover:shadow-xl hover:shadow-terra-600/25"
              strength={0.4}
            >
              {t("cta.button")}
            </MagneticButton>
          </AnimatedSection>
          <AnimatedSection delay={0.7} direction="none">
            <Link
              href="/menu"
              className="mt-6 inline-block font-body text-cream-300 underline underline-offset-4 transition-colors hover:text-cream-100"
            >
              {t("cta.menu_link")}
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </main>
  );
}
