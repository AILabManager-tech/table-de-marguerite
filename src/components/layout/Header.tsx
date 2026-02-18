"use client";

import { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/routing";
import type { Locale } from "@/i18n/routing";
import { UtensilsCrossed } from "lucide-react";

const navLinks = [
  { href: "/menu", key: "menu" },
  { href: "/notre-histoire", key: "about" },
  { href: "/contact", key: "contact" },
] as const;

/**
 * Header navigation component for La Table de Marguerite with locale-aware links and mobile menu.
 * Warm organic design with olive/terra palette and Cormorant Garamond serif branding.
 *
 * @component
 * @example
 * <Header />
 */
export function Header() {
  const t = useTranslations("nav");
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 20);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function switchLocale() {
    const next = locale === "fr" ? "en" : "fr";
    router.replace(pathname, { locale: next });
  }

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-cream-200 shadow-lg shadow-bark/10"
          : "bg-cream-200/80 backdrop-blur-xl border-b border-olive-100/30 shadow-sm"
      }`}
    >
      {/* Gradient accent line */}
      <div className="h-0.5 bg-gradient-to-r from-olive-600 via-terra-400 to-prune-600" />

      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        {/* Logo wordmark with utensils icon */}
        <Link
          href="/"
          className="flex items-center gap-2 font-heading text-xl font-semibold text-bark transition-colors"
        >
          <UtensilsCrossed className="h-7 w-7 text-terra-400" aria-hidden="true" />
          <span>
            La Table de{" "}
            <span className="text-olive-600">Marguerite</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map(({ href, key }) => (
            <Link
              key={key}
              href={href}
              className={`relative text-sm font-medium transition-colors hover:text-olive-600 ${
                pathname === href
                  ? "text-olive-600"
                  : "text-bark-light"
              }`}
            >
              {t(key)}
              {pathname === href && (
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full bg-olive-500" />
              )}
            </Link>
          ))}

          {/* Language switcher */}
          <button
            onClick={switchLocale}
            className="rounded-lg border border-olive-200/60 bg-white/50 px-3 py-1.5 text-xs font-medium text-bark-light transition-all hover:border-olive-400 hover:text-olive-600 hover:bg-olive-50 focus:outline-none focus:ring-2 focus:ring-olive-400 focus:ring-offset-2"
            aria-label={locale === "fr" ? "Switch to English" : "Passer au fran\u00e7ais"}
          >
            {locale === "fr" ? "EN" : "FR"}
          </button>

          {/* CTA */}
          <Link
            href="/contact"
            className="rounded-xl bg-terra-700 px-5 py-2 text-sm font-medium text-white transition-all hover:bg-terra-800 hover:scale-[1.02] hover:shadow-lg hover:shadow-terra-700/20"
          >
            {t("cta")}
          </Link>
        </nav>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex flex-col gap-1.5 md:hidden focus:outline-none focus:ring-2 focus:ring-olive-400 focus:ring-offset-2 rounded-md p-1"
          aria-label={locale === "fr" ? "Ouvrir le menu" : "Toggle menu"}
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
        >
          <span
            className={`h-0.5 w-6 bg-bark transition-transform ${
              mobileOpen ? "translate-y-2 rotate-45" : ""
            }`}
          />
          <span
            className={`h-0.5 w-6 bg-bark transition-opacity ${
              mobileOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`h-0.5 w-6 bg-bark transition-transform ${
              mobileOpen ? "-translate-y-2 -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <nav
          id="mobile-nav"
          className="border-t border-olive-100/50 bg-cream-200/95 backdrop-blur-xl px-6 pb-6 pt-4 md:hidden"
        >
          <div className="flex flex-col gap-4">
            {navLinks.map(({ href, key }) => (
              <Link
                key={key}
                href={href}
                onClick={() => setMobileOpen(false)}
                className={`text-base font-medium transition-colors ${
                  pathname === href
                    ? "text-olive-600"
                    : "text-bark-light hover:text-olive-600"
                }`}
              >
                {t(key)}
              </Link>
            ))}
            <div className="flex items-center gap-4 pt-2">
              <button
                onClick={switchLocale}
                className="rounded-lg border border-olive-200 px-3 py-1.5 text-sm text-bark-light hover:text-olive-600 focus:outline-none focus:ring-2 focus:ring-olive-400 focus:ring-offset-2"
                aria-label={locale === "fr" ? "Switch to English" : "Passer au fran\u00e7ais"}
              >
                {locale === "fr" ? "English" : "Fran\u00e7ais"}
              </button>
              <Link
                href="/contact"
                onClick={() => setMobileOpen(false)}
                className="rounded-xl bg-terra-700 px-5 py-2 text-sm font-medium text-white hover:bg-terra-800"
              >
                {t("cta")}
              </Link>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
