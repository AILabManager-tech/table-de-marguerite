"use client";

import { useState, useRef } from "react";
import { useTranslations } from "next-intl";
import { Sprout, Sun, Leaf, Snowflake } from "lucide-react";
import { useInView, useReducedMotion } from "@/hooks/useAnimations";

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
    tabActive: "bg-terra-700 text-cream-100 shadow-lg shadow-terra-300/30",
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
  show: boolean;
  t: ReturnType<typeof useTranslations>;
}

function DishCard({ season, course, index, prefersReduced, show, t }: DishCardProps) {
  const colors = SEASON_COLORS[season];

  return (
    <article
      className={`group rounded-xl border ${colors.border} bg-cream-100 p-6 transition-shadow duration-300 hover:shadow-md`}
      style={{
        opacity: show ? 1 : 0,
        transform: show
          ? "translateY(0)"
          : prefersReduced
            ? undefined
            : "translateY(20px)",
        transition: prefersReduced
          ? "opacity 0.01s"
          : `opacity 0.4s ease-in-out ${index * 0.1}s, transform 0.4s ease-in-out ${index * 0.1}s`,
      }}
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
    </article>
  );
}

/* ------------------------------------------------------------------ */
/*  Season tab button                                                  */
/* ------------------------------------------------------------------ */

interface SeasonTabProps {
  season: SeasonKey;
  isActive: boolean;
  onClick: () => void;
  t: ReturnType<typeof useTranslations>;
}

function SeasonTab({ season, isActive, onClick, t }: SeasonTabProps) {
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
 * dishes (starter, main, dessert). Uses CSS transitions for smooth tab changes.
 *
 * @component
 * @example
 * ```tsx
 * <SeasonalMenuExplorer />
 * ```
 */
export function SeasonalMenuExplorer() {
  const t = useTranslations("home.seasonal_menu");
  const prefersReduced = useReducedMotion();
  const [activeSeason, setActiveSeason] = useState<SeasonKey>("autumn");
  const [displayedSeason, setDisplayedSeason] = useState<SeasonKey>("autumn");
  const [show, setShow] = useState(true);
  const headerRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true });
  const tabsInView = useInView(tabsRef, { once: true });

  function handleSeasonChange(season: SeasonKey) {
    if (season === activeSeason) return;
    setActiveSeason(season);
    if (prefersReduced) {
      setDisplayedSeason(season);
      return;
    }
    setShow(false);
    setTimeout(() => {
      setDisplayedSeason(season);
      setShow(true);
    }, 300);
  }

  return (
    <section
      id="seasonal-menu"
      className="bg-cream-200 py-16 lg:py-24"
      aria-labelledby="seasonal-menu-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div
          ref={headerRef}
          className="mb-12 text-center"
          style={{
            opacity: prefersReduced || headerInView ? 1 : 0,
            transform: prefersReduced || headerInView ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.5s ease-in-out, transform 0.5s ease-in-out",
          }}
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
        </div>

        {/* Season tabs */}
        <div
          ref={tabsRef}
          className="mb-10 flex flex-wrap justify-center gap-3"
          role="tablist"
          aria-label={t("tabs_label")}
          style={{
            opacity: prefersReduced || tabsInView ? 1 : 0,
            transform: prefersReduced || tabsInView ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 0.4s ease-in-out 0.15s, transform 0.4s ease-in-out 0.15s",
          }}
        >
          {SEASONS.map((season) => (
            <SeasonTab
              key={season}
              season={season}
              isActive={activeSeason === season}
              onClick={() => handleSeasonChange(season)}
              t={t}
            />
          ))}
        </div>

        {/* Dishes grid */}
        <div
          id={`season-panel-${activeSeason}`}
          role="tabpanel"
          aria-labelledby={`season-tab-${activeSeason}`}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          style={{
            opacity: show ? 1 : 0,
            transform: show
              ? "translateX(0)"
              : prefersReduced
                ? undefined
                : "translateX(30px)",
            transition: prefersReduced
              ? "opacity 0.01s"
              : "opacity 0.35s ease-in-out, transform 0.35s ease-in-out",
          }}
        >
          {COURSE_KEYS.map((course, i) => (
            <DishCard
              key={`${displayedSeason}-${course}`}
              season={displayedSeason}
              course={course}
              index={i}
              prefersReduced={prefersReduced}
              show={show}
              t={t}
            />
          ))}
        </div>

        {/* Season description */}
        <p
          className="mt-8 text-center font-body text-sm italic text-bark-light"
          style={{
            opacity: show ? 1 : 0,
            transform: show
              ? "translateY(0)"
              : prefersReduced
                ? undefined
                : "translateY(10px)",
            transition: prefersReduced
              ? "opacity 0.01s"
              : "opacity 0.3s ease-in-out 0.2s, transform 0.3s ease-in-out 0.2s",
          }}
        >
          {t(`seasons.${displayedSeason}.note`)}
        </p>
      </div>
    </section>
  );
}
