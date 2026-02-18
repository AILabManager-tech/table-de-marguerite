"use client";

import { useState } from "react";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
} from "framer-motion";
import { useTranslations } from "next-intl";
import { Sprout, Sun, Leaf, Snowflake } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Season definitions                                                 */
/* ------------------------------------------------------------------ */

const SEASONS = ["spring", "summer", "autumn", "winter"] as const;
type SeasonKey = (typeof SEASONS)[number];

const COURSE_KEYS = ["starter", "main", "dessert"] as const;
type CourseKey = (typeof COURSE_KEYS)[number];

/** Icon component mapped per season */
const SEASON_ICON: Record<SeasonKey, typeof Sprout> = {
  spring: Sprout,
  summer: Sun,
  autumn: Leaf,
  winter: Snowflake,
};

/** Colour accent classes per season */
const SEASON_COLORS: Record<
  SeasonKey,
  {
    tab: string;
    tabActive: string;
    accent: string;
    border: string;
    badge: string;
    icon: string;
  }
> = {
  spring: {
    tab: "text-olive-600 hover:bg-olive-50",
    tabActive: "bg-olive-600 text-cream-100 shadow-lg shadow-olive-300/30",
    accent: "text-olive-600",
    border: "border-olive-200",
    badge: "bg-olive-100 text-olive-700",
    icon: "text-olive-500",
  },
  summer: {
    tab: "text-terra-500 hover:bg-terra-50",
    tabActive: "bg-terra-400 text-cream-100 shadow-lg shadow-terra-300/30",
    accent: "text-terra-500",
    border: "border-terra-200",
    badge: "bg-terra-100 text-terra-700",
    icon: "text-terra-400",
  },
  autumn: {
    tab: "text-prune-500 hover:bg-prune-50",
    tabActive: "bg-prune-600 text-cream-100 shadow-lg shadow-prune-300/30",
    accent: "text-prune-600",
    border: "border-prune-200",
    badge: "bg-prune-100 text-prune-700",
    icon: "text-prune-500",
  },
  winter: {
    tab: "text-bark-light hover:bg-cream-300",
    tabActive: "bg-bark text-cream-100 shadow-lg shadow-bark/20",
    accent: "text-bark",
    border: "border-cream-400",
    badge: "bg-cream-300 text-bark",
    icon: "text-bark-light",
  },
};

/* ------------------------------------------------------------------ */
/*  Dish card                                                          */
/* ------------------------------------------------------------------ */

interface DishCardProps {
  season: SeasonKey;
  course: CourseKey;
  index: number;
  prefersReduced: boolean;
  t: ReturnType<typeof useTranslations>;
}

function DishCard({ season, course, index, prefersReduced, t }: DishCardProps) {
  const colors = SEASON_COLORS[season];

  return (
    <motion.article
      initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 20 }}
      animate={prefersReduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
      exit={prefersReduced ? { opacity: 0 } : { opacity: 0, y: -10 }}
      transition={{
        duration: 0.4,
        delay: index * 0.1,
        ease: "easeInOut" as const,
      }}
      className={`group rounded-xl border ${colors.border} bg-cream-100 p-6 transition-shadow duration-300 hover:shadow-md`}
    >
      {/* Course badge */}
      <span
        className={`mb-3 inline-block rounded-full px-3 py-1 font-body text-xs font-semibold uppercase tracking-wider ${colors.badge}`}
      >
        {t(`courses.${course}`)}
      </span>

      {/* Dish name */}
      <h3
        className={`mb-2 font-heading text-xl font-bold ${colors.accent}`}
      >
        {t(`seasons.${season}.dishes.${course}.name`)}
      </h3>

      {/* Description */}
      <p className="mb-4 font-body text-sm leading-relaxed text-bark-light">
        {t(`seasons.${season}.dishes.${course}.description`)}
      </p>

      {/* Price */}
      <div className="flex items-center justify-between border-t border-cream-300 pt-3">
        <span className="font-body text-xs uppercase tracking-wider text-bark-light">
          {t(`courses.${course}`)}
        </span>
        <div
          className={`h-px flex-1 mx-3 ${colors.border} border-t border-dashed`}
        />
        <span className={`font-heading text-lg font-bold ${colors.accent}`}>
          {t(`seasons.${season}.dishes.${course}.price`)}
        </span>
      </div>
    </motion.article>
  );
}

/* ------------------------------------------------------------------ */
/*  Season tab button                                                  */
/* ------------------------------------------------------------------ */

interface SeasonTabProps {
  season: SeasonKey;
  isActive: boolean;
  onClick: () => void;
  prefersReduced: boolean;
  t: ReturnType<typeof useTranslations>;
}

function SeasonTab({ season, isActive, onClick, prefersReduced, t }: SeasonTabProps) {
  const colors = SEASON_COLORS[season];
  const IconComp = SEASON_ICON[season];

  return (
    <button
      onClick={onClick}
      className={`relative flex items-center gap-2 rounded-full px-5 py-2.5 font-heading text-sm font-semibold transition-all duration-300 ${
        isActive ? colors.tabActive : colors.tab
      }`}
      role="tab"
      aria-selected={isActive}
      aria-controls={`season-panel-${season}`}
    >
      <IconComp
        size={18}
        className={isActive ? "text-current" : colors.icon}
        aria-hidden="true"
      />
      <span>{t(`seasons.${season}.name`)}</span>

      {/* Active underline indicator */}
      {isActive && !prefersReduced && (
        <motion.div
          layoutId="season-indicator"
          className="absolute inset-0 rounded-full"
          transition={{ duration: 0.3, ease: "easeInOut" as const }}
        />
      )}
    </button>
  );
}

/* ------------------------------------------------------------------ */
/*  Main export                                                        */
/* ------------------------------------------------------------------ */

/**
 * SeasonalMenuExplorer -- Interactive seasonal menu carousel for La Table de Marguerite.
 *
 * Displays 4 season tabs (Printemps, Ete, Automne, Hiver), each with 3 signature
 * dishes (starter, main, dessert). Uses AnimatePresence for smooth transitions.
 *
 * @component
 * @example
 * ```tsx
 * <SeasonalMenuExplorer />
 * ```
 */
export function SeasonalMenuExplorer() {
  const t = useTranslations("home.seasonal_menu");
  const prefersReduced = useReducedMotion() ?? false;
  const [activeSeason, setActiveSeason] = useState<SeasonKey>("autumn");

  return (
    <section
      id="seasonal-menu"
      className="bg-cream-200 py-16 lg:py-24"
      aria-labelledby="seasonal-menu-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={prefersReduced ? {} : { opacity: 0, y: 24 }}
          whileInView={prefersReduced ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeInOut" as const }}
          className="mb-12 text-center"
        >
          <h2
            id="seasonal-menu-heading"
            className="mb-3 font-heading text-3xl font-bold text-bark lg:text-4xl"
          >
            {t("title")}
          </h2>
          <p className="mx-auto max-w-xl font-body text-bark-light">
            {t("subtitle")}
          </p>
        </motion.div>

        {/* Season tabs */}
        <motion.div
          initial={prefersReduced ? {} : { opacity: 0, y: 16 }}
          whileInView={prefersReduced ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.15, ease: "easeInOut" as const }}
          className="mb-10 flex flex-wrap justify-center gap-3"
          role="tablist"
          aria-label={t("tabs_label")}
        >
          {SEASONS.map((season) => (
            <SeasonTab
              key={season}
              season={season}
              isActive={activeSeason === season}
              onClick={() => setActiveSeason(season)}
              prefersReduced={prefersReduced}
              t={t}
            />
          ))}
        </motion.div>

        {/* Dishes grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSeason}
            id={`season-panel-${activeSeason}`}
            role="tabpanel"
            aria-labelledby={`season-tab-${activeSeason}`}
            initial={prefersReduced ? { opacity: 0 } : { opacity: 0, x: 30 }}
            animate={prefersReduced ? { opacity: 1 } : { opacity: 1, x: 0 }}
            exit={prefersReduced ? { opacity: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.35, ease: "easeInOut" as const }}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {COURSE_KEYS.map((course, i) => (
              <DishCard
                key={`${activeSeason}-${course}`}
                season={activeSeason}
                course={course}
                index={i}
                prefersReduced={prefersReduced}
                t={t}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Season description */}
        <AnimatePresence mode="wait">
          <motion.p
            key={`desc-${activeSeason}`}
            initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 10 }}
            animate={prefersReduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
            exit={prefersReduced ? { opacity: 0 } : { opacity: 0, y: -10 }}
            transition={{ duration: 0.3, delay: 0.2, ease: "easeInOut" as const }}
            className="mt-8 text-center font-body text-sm italic text-bark-light"
          >
            {t(`seasons.${activeSeason}.note`)}
          </motion.p>
        </AnimatePresence>
      </div>
    </section>
  );
}
