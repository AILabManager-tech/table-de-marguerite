"use client";

import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "framer-motion";
import { UtensilsCrossed, Beef, CakeSlice, Wine } from "lucide-react";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { TextReveal } from "@/components/animations/TextReveal";
import { LineReveal } from "@/components/animations/LineReveal";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { AuroraBackground } from "@/components/animations/AuroraBackground";
import { StaggerGrid } from "@/components/animations/StaggerGrid";
import { BotanicalDivider } from "@/components/interactive/BotanicalDivider";

/* ------------------------------------------------------------------ */
/*  Menu category definitions                                          */
/* ------------------------------------------------------------------ */

const CATEGORIES = [
  { key: "starters", Icon: UtensilsCrossed, accent: "olive", items: 4 },
  { key: "mains", Icon: Beef, accent: "terra", items: 4 },
  { key: "desserts", Icon: CakeSlice, accent: "prune", items: 3 },
  { key: "drinks", Icon: Wine, accent: "bark", items: 4 },
] as const;

type AccentKey = "olive" | "terra" | "prune" | "bark";

const accentMap: Record<AccentKey, { bg: string; text: string; border: string; badge: string }> = {
  olive: {
    bg: "bg-olive-50",
    text: "text-olive-600",
    border: "border-olive-200",
    badge: "bg-olive-100 text-olive-700",
  },
  terra: {
    bg: "bg-terra-50",
    text: "text-terra-500",
    border: "border-terra-200",
    badge: "bg-terra-100 text-terra-700",
  },
  prune: {
    bg: "bg-prune-50",
    text: "text-prune-600",
    border: "border-prune-200",
    badge: "bg-prune-100 text-prune-700",
  },
  bark: {
    bg: "bg-cream-200",
    text: "text-bark",
    border: "border-cream-400",
    badge: "bg-cream-300 text-bark",
  },
};

/* ------------------------------------------------------------------ */
/*  Menu item card                                                     */
/* ------------------------------------------------------------------ */

interface MenuItemProps {
  categoryKey: string;
  itemIndex: number;
  accent: AccentKey;
  prefersReduced: boolean;
}

function MenuItem({ categoryKey, itemIndex, accent, prefersReduced }: MenuItemProps) {
  const t = useTranslations("services");
  const colors = accentMap[accent];

  return (
    <motion.div
      initial={prefersReduced ? {} : { opacity: 0, y: 20 }}
      whileInView={prefersReduced ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.4,
        delay: itemIndex * 0.1,
        ease: "easeInOut" as const,
      }}
      className={`group flex items-start justify-between rounded-xl border ${colors.border} bg-cream-100/80 p-5 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5`}
    >
      <div className="flex-1 pr-4">
        <h4 className={`mb-1 font-heading text-lg font-semibold ${colors.text}`}>
          {t(`${categoryKey}.item_${itemIndex + 1}.name`)}
        </h4>
        <p className="font-body text-sm leading-relaxed text-bark-light">
          {t(`${categoryKey}.item_${itemIndex + 1}.description`)}
        </p>
      </div>
      <div className="flex items-center">
        <div className={`h-px w-8 ${colors.border} border-t border-dashed`} />
        <span className={`ml-3 whitespace-nowrap font-heading text-lg font-bold ${colors.text}`}>
          {t(`${categoryKey}.item_${itemIndex + 1}.price`)}
        </span>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main export                                                        */
/* ------------------------------------------------------------------ */

/**
 * ServicesContent -- "Le Menu" page for La Table de Marguerite.
 * Displays 4 menu categories (Entrees, Plats, Desserts, Vins)
 * with individual items, a chef's note, and an FAQ section.
 *
 * @component
 * @example
 * ```tsx
 * <ServicesContent />
 * ```
 */
export function ServicesContent() {
  const t = useTranslations("services");
  const prefersReduced = useReducedMotion() ?? false;

  const faqItems = Array.from({ length: 6 }, (_, i) => ({
    question: t(`faq.q${i + 1}`),
    answer: t(`faq.a${i + 1}`),
  }));

  return (
    <main>
      {/* ============================================================ */}
      {/*  1. Hero -- Menu page header                                 */}
      {/* ============================================================ */}
      <section className="relative flex min-h-[45vh] items-center overflow-hidden bg-bark">
        <AuroraBackground />
        <div className="absolute inset-0 grid-overlay opacity-20" />
        <div className="container-narrow text-center relative z-10 section-padding">
          <AnimatedSection delay={0.1} direction="none">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full glass-dark px-4 py-2">
              <span className="h-2 w-2 rounded-full bg-olive-400 animate-glow-pulse" />
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
      {/*  2. Menu categories                                          */}
      {/* ============================================================ */}
      {CATEGORIES.map(({ key, Icon, accent, items }, catIndex) => {
        const colors = accentMap[accent];
        const isEven = catIndex % 2 === 0;

        return (
          <section
            key={key}
            className={`section-padding relative overflow-hidden ${isEven ? "" : "bg-cream-200/50"}`}
          >
            {!isEven && <div className="absolute inset-0 gradient-mesh-bg" />}
            <div className="container-wide relative z-10">
              {/* Category header */}
              <AnimatedSection>
                <div className="mb-8 flex items-center gap-4">
                  <div
                    className={`flex h-14 w-14 items-center justify-center rounded-xl ${colors.bg} ${colors.text}`}
                  >
                    <Icon className="h-7 w-7" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h2 className={`font-heading text-2xl font-bold ${colors.text} lg:text-3xl`}>
                      {t(`${key}.title`)}
                    </h2>
                    <p className="font-body text-sm text-bark-light">
                      {t(`${key}.subtitle`)}
                    </p>
                  </div>
                </div>
              </AnimatedSection>

              <LineReveal className="mb-8 w-16" color={`bg-${accent}-400`} delay={0.2} />

              {/* Items */}
              <StaggerGrid className="grid gap-4 md:grid-cols-2" stagger={0.08}>
                {Array.from({ length: items }, (_, i) => (
                  <MenuItem
                    key={`${key}-${i}`}
                    categoryKey={key}
                    itemIndex={i}
                    accent={accent}
                    prefersReduced={prefersReduced}
                  />
                ))}
              </StaggerGrid>
            </div>

            {catIndex < CATEGORIES.length - 1 && (
              <BotanicalDivider
                variant={catIndex === 0 ? "vine" : catIndex === 1 ? "leaf" : "wheat"}
                className="mt-12"
              />
            )}
          </section>
        );
      })}

      {/* ============================================================ */}
      {/*  3. Note du chef                                             */}
      {/* ============================================================ */}
      <section className="relative overflow-hidden bg-bark py-16 lg:py-20">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-1/4 top-0 h-[400px] w-[400px] rounded-full bg-olive-700/10 blur-[100px]" />
          <div className="absolute -right-1/4 bottom-0 h-[300px] w-[300px] rounded-full bg-terra-500/8 blur-[80px]" />
        </div>
        <div className="container-narrow relative z-10 text-center">
          <AnimatedSection>
            <BotanicalDivider variant="wheat" className="mb-8" />
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <blockquote className="font-heading text-xl italic leading-relaxed text-cream-200 md:text-2xl">
              &ldquo;{t("chef_note.quote")}&rdquo;
            </blockquote>
          </AnimatedSection>
          <AnimatedSection delay={0.4} direction="none">
            <p className="mt-6 font-heading text-sm font-semibold uppercase tracking-wider text-terra-400">
              {t("chef_note.author")}
            </p>
            <p className="font-body text-sm text-cream-400">
              {t("chef_note.role")}
            </p>
          </AnimatedSection>
          <AnimatedSection>
            <BotanicalDivider variant="wheat" className="mt-8" />
          </AnimatedSection>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  4. FAQ                                                      */}
      {/* ============================================================ */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 gradient-mesh-bg" />
        <div className="container-narrow relative z-10">
          <AnimatedSection>
            <TextReveal as="h2" className="mb-4 text-center">
              {t("faq.title")}
            </TextReveal>
          </AnimatedSection>
          <LineReveal className="mx-auto mb-8 w-24" color="bg-olive-400" delay={0.3} />
          <AnimatedSection delay={0.2}>
            <FaqAccordion items={faqItems} />
          </AnimatedSection>
        </div>
      </section>
    </main>
  );
}
