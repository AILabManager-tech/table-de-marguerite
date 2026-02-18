"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";

/* ------------------------------------------------------------------ */
/*  Gallery item definitions                                           */
/* ------------------------------------------------------------------ */

const GALLERY_ITEMS = [
  { key: "item_0", category: "starters", span: "row-span-2", gradient: "from-terra-300 via-terra-400 to-terra-600" },
  { key: "item_1", category: "mains", span: "", gradient: "from-olive-300 via-olive-500 to-olive-700" },
  { key: "item_2", category: "desserts", span: "", gradient: "from-prune-300 via-prune-400 to-prune-600" },
  { key: "item_3", category: "mains", span: "", gradient: "from-olive-400 via-bark-light to-bark" },
  { key: "item_4", category: "desserts", span: "row-span-2", gradient: "from-prune-200 via-terra-300 to-prune-500" },
  { key: "item_5", category: "starters", span: "", gradient: "from-terra-200 via-olive-300 to-terra-500" },
] as const;

type CategoryKey = "all" | "starters" | "mains" | "desserts";

const CATEGORIES: CategoryKey[] = ["all", "starters", "mains", "desserts"];

/* ------------------------------------------------------------------ */
/*  Gallery card                                                       */
/* ------------------------------------------------------------------ */

interface GalleryCardProps {
  item: (typeof GALLERY_ITEMS)[number];
  index: number;
  prefersReduced: boolean;
  t: ReturnType<typeof useTranslations>;
}

function GalleryCard({ item, index, prefersReduced, t }: GalleryCardProps) {
  return (
    <motion.article
      layout={!prefersReduced}
      initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 30 }}
      whileInView={prefersReduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
      exit={prefersReduced ? { opacity: 0 } : { opacity: 0, scale: 0.95 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.5,
        delay: index * 0.08,
        ease: "easeInOut" as const,
      }}
      className={`group relative overflow-hidden rounded-2xl ${item.span}`}
    >
      {/* Gradient placeholder (no real images yet) */}
      <div
        className={`aspect-[4/3] h-full w-full bg-gradient-to-br ${item.gradient}`}
      >
        {/* Subtle texture overlay */}
        <div className="absolute inset-0 bg-grid-pattern bg-grid-40 opacity-10" />
      </div>

      {/* Hover overlay */}
      <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-bark/80 via-bark/30 to-transparent p-5 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100">
        {/* Category badge */}
        <span className="mb-2 inline-block w-fit rounded-full bg-cream-200/90 px-3 py-0.5 font-body text-[10px] font-bold uppercase tracking-widest text-bark">
          {t(`categories.${item.category}`)}
        </span>

        {/* Dish title */}
        <h3 className="font-heading text-xl font-bold text-cream-100">
          {t(`items.${item.key}.title`)}
        </h3>

        {/* Description */}
        <p className="mt-1 font-body text-sm leading-relaxed text-cream-300">
          {t(`items.${item.key}.description`)}
        </p>
      </div>

      {/* Keyboard-focusable overlay trigger */}
      <button
        className="absolute inset-0 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-olive-400 focus-visible:ring-offset-2"
        aria-label={t(`items.${item.key}.title`)}
        tabIndex={0}
      >
        <span className="sr-only">{t(`items.${item.key}.title`)}</span>
      </button>
    </motion.article>
  );
}

/* ------------------------------------------------------------------ */
/*  Main export                                                        */
/* ------------------------------------------------------------------ */

/**
 * FoodGallery -- Masonry-like gallery of dish images with category filtering.
 *
 * Uses gradient placeholders (no real photos). Each card reveals title,
 * category and description on hover. Staggered scroll-triggered animations.
 *
 * @component
 * @example
 * ```tsx
 * <FoodGallery />
 * ```
 */
export function FoodGallery() {
  const t = useTranslations("home.gallery");
  const prefersReduced = useReducedMotion() ?? false;
  const [activeCategory, setActiveCategory] = useState<CategoryKey>("all");

  const filteredItems =
    activeCategory === "all"
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === activeCategory);

  return (
    <section
      id="food-gallery"
      className="bg-cream-100 py-16 lg:py-24"
      aria-labelledby="gallery-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={prefersReduced ? {} : { opacity: 0, y: 24 }}
          whileInView={prefersReduced ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeInOut" as const }}
          className="mb-10 text-center"
        >
          <h2
            id="gallery-heading"
            className="mb-3 font-heading text-3xl font-bold text-bark lg:text-4xl"
          >
            {t("title")}
          </h2>
          <p className="mx-auto max-w-lg font-body text-bark-light">
            {t("subtitle")}
          </p>
        </motion.div>

        {/* Category filters */}
        <motion.div
          initial={prefersReduced ? {} : { opacity: 0, y: 12 }}
          whileInView={prefersReduced ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1, ease: "easeInOut" as const }}
          className="mb-10 flex flex-wrap justify-center gap-3"
          role="group"
          aria-label={t("filter_label")}
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full px-5 py-2 font-heading text-sm font-semibold transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-olive-600 text-cream-100 shadow-md shadow-olive-300/30"
                  : "bg-cream-200 text-bark-light hover:bg-olive-50 hover:text-olive-600"
              }`}
            >
              {t(`categories.${cat}`)}
            </button>
          ))}
        </motion.div>

        {/* Masonry grid */}
        <AnimatePresence mode="popLayout">
          <motion.div
            layout={!prefersReduced}
            className="grid auto-rows-[200px] gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {filteredItems.map((item, i) => (
              <GalleryCard
                key={item.key}
                item={item}
                index={i}
                prefersReduced={prefersReduced}
                t={t}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Bottom caption */}
        <motion.p
          initial={prefersReduced ? {} : { opacity: 0 }}
          whileInView={prefersReduced ? {} : { opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4, ease: "easeInOut" as const }}
          className="mt-8 text-center font-body text-xs italic text-cream-600"
        >
          {t("caption")}
        </motion.p>
      </div>
    </section>
  );
}
