import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/routing";
import { CookieSettingsButton } from "@/components/legal/CookieConsent";

/**
 * Site footer for La Table de Marguerite with address, hours, navigation, newsletter CTA, and legal links.
 * Dark bark background with cream text and terra accents.
 *
 * @component
 * @example
 * <Footer />
 */
export function Footer() {
  const t = useTranslations("footer");
  const nav = useTranslations("nav");
  const locale = useLocale();
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-bark-dark text-cream-400">
      {/* Gradient accent line at top */}
      <div className="h-1 bg-gradient-to-r from-olive-600 via-terra-400 to-prune-600" />

      {/* Mini CTA bar */}
      <div className="relative border-b border-bark bg-gradient-to-r from-bark-dark via-bark to-bark-dark px-6 py-10 text-center">
        <div className="relative z-10">
          <p className="mb-5 font-heading text-2xl font-semibold text-cream-200">
            {t("cta")}
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-xl bg-terra-400 px-8 py-3 font-medium text-white transition-all hover:bg-terra-500 hover:scale-[1.02] hover:shadow-lg hover:shadow-terra-400/30"
          >
            {t("cta_button")}
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Address */}
          <div>
            <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-terra-400">
              {locale === "fr" ? "Adresse" : "Address"}
            </h4>
            <div className="flex flex-col gap-2 text-sm text-cream-500">
              <p>
                42, rue du Petit-Champlain
                <br />
                Qu&eacute;bec (QC)&nbsp;G1K&nbsp;4H4
              </p>
              <a
                href="tel:+14185550142"
                className="transition-colors hover:text-cream-200"
              >
                (418)&nbsp;555-0142
              </a>
              <a
                href="mailto:info@tablede-marguerite.ca"
                className="transition-colors hover:text-cream-200"
              >
                info@tablede-marguerite.ca
              </a>
            </div>
          </div>

          {/* Hours */}
          <div>
            <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-terra-400">
              {locale === "fr" ? "Horaires" : "Hours"}
            </h4>
            <div className="flex flex-col gap-1 text-sm text-cream-500">
              <p>
                {locale === "fr" ? "Mar\u2013Sam" : "Tue\u2013Sat"}{" "}
                <span className="text-cream-300">17h \u2013 22h</span>
              </p>
              <p>
                {locale === "fr" ? "Dim Brunch" : "Sun Brunch"}{" "}
                <span className="text-cream-300">10h \u2013 14h</span>
              </p>
              <p>
                {locale === "fr" ? "Lun" : "Mon"}{" "}
                <span className="text-cream-600">
                  {locale === "fr" ? "Ferm\u00e9" : "Closed"}
                </span>
              </p>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-terra-400">
              Navigation
            </h4>
            <div className="flex flex-col gap-2">
              <Link
                href="/"
                className="text-sm text-cream-500 transition-colors hover:text-cream-200"
              >
                {nav("home")}
              </Link>
              <Link
                href="/menu"
                className="text-sm text-cream-500 transition-colors hover:text-cream-200"
              >
                {nav("menu")}
              </Link>
              <Link
                href="/notre-histoire"
                className="text-sm text-cream-500 transition-colors hover:text-cream-200"
              >
                {nav("about")}
              </Link>
              <Link
                href="/contact"
                className="text-sm text-cream-500 transition-colors hover:text-cream-200"
              >
                {nav("contact")}
              </Link>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-terra-400">
              {locale === "fr" ? "Infolettre" : "Newsletter"}
            </h4>
            <p className="mb-3 text-sm text-cream-500">
              {locale === "fr"
                ? "Recevez nos menus saisonniers et invitations."
                : "Receive our seasonal menus and invitations."}
            </p>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder={locale === "fr" ? "Votre courriel" : "Your email"}
                className="flex-1 rounded-lg border border-bark-light bg-bark/50 px-3 py-2 text-sm text-cream-200 placeholder:text-cream-600 focus:border-terra-400 focus:outline-none focus:ring-1 focus:ring-terra-400"
                aria-label={locale === "fr" ? "Adresse courriel" : "Email address"}
              />
              <button
                type="submit"
                className="rounded-lg bg-terra-400 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-terra-500"
              >
                OK
              </button>
            </form>
            {/* Social links */}
            <div className="mt-4 flex gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-cream-500 transition-colors hover:text-terra-400"
                aria-label="Instagram"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
                Instagram
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-cream-500 transition-colors hover:text-terra-400"
                aria-label="Facebook"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                Facebook
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-10 mb-6 h-px bg-bark-light/40" />

        {/* Legal links */}
        <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-6">
          <Link
            href="/mentions-legales"
            className="text-xs text-cream-500 transition-colors hover:text-cream-200"
          >
            {locale === "fr" ? "Mentions l\u00e9gales" : "Legal Notice"}
          </Link>
          <Link
            href="/politique-confidentialite"
            className="text-xs text-cream-500 transition-colors hover:text-cream-200"
          >
            {locale === "fr" ? "Politique de confidentialit\u00e9" : "Privacy Policy"}
          </Link>
          <CookieSettingsButton />
        </div>

        {/* Copyright */}
        <div className="mt-4 text-center text-xs text-cream-600">
          <p>
            &copy; {year} La Table de Marguerite.{" "}
            {locale === "fr" ? "Tous droits r\u00e9serv\u00e9s." : "All rights reserved."}
          </p>
        </div>
      </div>
    </footer>
  );
}
