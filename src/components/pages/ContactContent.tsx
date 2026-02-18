"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";
import { z } from "zod";
import { toast } from "sonner";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { TextReveal } from "@/components/animations/TextReveal";

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

/* ------------------------------------------------------------------ */
/*  Zod schema (v4 format)                                             */
/* ------------------------------------------------------------------ */

const inquiryTypes = [
  "reservation",
  "private_event",
  "question",
  "other",
] as const;

const contactSchema = z.object({
  name: z.string().min(2, { message: "Le nom doit contenir au moins 2 caracteres." }),
  email: z.string().email({ message: "Adresse courriel invalide." }),
  phone: z.string().optional(),
  type: z.enum(inquiryTypes, { message: "Veuillez choisir un type de demande." }),
  guests: z.string().optional(),
  message: z.string().min(10, { message: "Le message doit contenir au moins 10 caracteres." }),
  consent: z.literal(true, { message: "Vous devez accepter la politique de confidentialite." }),
});

/* ------------------------------------------------------------------ */
/*  Field error display                                                */
/* ------------------------------------------------------------------ */

function FieldError({ errors, field }: { errors: Record<string, string>; field: string }) {
  const msg = errors[field];
  if (!msg) return null;
  return (
    <p className="mt-1 text-xs text-red-500" role="alert">
      {msg}
    </p>
  );
}

/* ------------------------------------------------------------------ */
/*  Main export                                                        */
/* ------------------------------------------------------------------ */

/**
 * ContactContent -- Contact page for La Table de Marguerite with a
 * Zod-validated form (name, email, phone, type, guests, message,
 * consent), an information sidebar, and a map placeholder.
 *
 * Heavy animation components loaded via next/dynamic with ssr:false
 * to reduce Total Blocking Time.
 *
 * @component
 * @example
 * ```tsx
 * <ContactContent />
 * ```
 */
export function ContactContent() {
  const t = useTranslations("contact");
  const [sending, setSending] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [selectedType, setSelectedType] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrors({});

    const form = e.currentTarget;
    const formData = new FormData(form);

    const raw: Record<string, unknown> = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone") || undefined,
      type: formData.get("type"),
      guests: formData.get("guests") || undefined,
      message: formData.get("message"),
      consent: formData.get("consent") === "on" ? true : false,
    };

    const result = contactSchema.safeParse(raw);

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0];
        if (key && typeof key === "string" && !fieldErrors[key]) {
          fieldErrors[key] = issue.message;
        }
      }
      setErrors(fieldErrors);
      return;
    }

    setSending(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      toast.success(t("form.success"));
      form.reset();
      setSelectedType("");
      setErrors({});
    } catch {
      toast.error(t("form.error"));
    } finally {
      setSending(false);
    }
  }

  /* Shared input classes */
  const inputClass =
    "w-full rounded-xl border border-cream-400 bg-cream-100/80 px-4 py-3 font-body text-bark transition-all focus:border-olive-500 focus:outline-none focus:ring-2 focus:ring-olive-500/20 focus:bg-cream-100";

  return (
    <main>
      {/* ============================================================ */}
      {/*  1. Hero                                                     */}
      {/* ============================================================ */}
      <section className="relative flex min-h-[40vh] items-center overflow-hidden bg-bark">
        <AuroraBackground />
        <div className="absolute inset-0 grid-overlay opacity-20" />
        <div className="container-narrow text-center relative z-10 section-padding">
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
      {/*  2. Form + Sidebar                                           */}
      {/* ============================================================ */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 gradient-mesh-bg" />
        <div className="container-wide relative z-10">
          <h2 className="sr-only">{t("form_section_heading")}</h2>
          <div className="grid gap-12 md:grid-cols-5">
            {/* --- Form (3 cols) --- */}
            <AnimatedSection direction="left" className="md:col-span-3">
              <form
                className="space-y-5 rounded-2xl border border-cream-300 bg-cream-100/80 p-6 shadow-sm backdrop-blur-sm md:p-8"
                onSubmit={handleSubmit}
                noValidate
              >
                {/* Name + Email */}
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-1.5 block font-heading text-sm font-medium text-bark"
                    >
                      {t("form.name")}
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      className={inputClass}
                    />
                    <FieldError errors={errors} field="name" />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="mb-1.5 block font-heading text-sm font-medium text-bark"
                    >
                      {t("form.email")}
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      className={inputClass}
                    />
                    <FieldError errors={errors} field="email" />
                  </div>
                </div>

                {/* Phone + Type */}
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="phone"
                      className="mb-1.5 block font-heading text-sm font-medium text-bark"
                    >
                      {t("form.phone")}{" "}
                      <span className="font-body text-xs text-bark-light">
                        ({t("form.optional")})
                      </span>
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="type"
                      className="mb-1.5 block font-heading text-sm font-medium text-bark"
                    >
                      {t("form.type")}
                    </label>
                    <select
                      id="type"
                      name="type"
                      required
                      className={inputClass}
                      defaultValue=""
                      onChange={(e) => setSelectedType(e.target.value)}
                    >
                      <option value="" disabled>
                        {t("form.type_placeholder")}
                      </option>
                      {inquiryTypes.map((opt) => (
                        <option key={opt} value={opt}>
                          {t(`form.types.${opt}`)}
                        </option>
                      ))}
                    </select>
                    <FieldError errors={errors} field="type" />
                  </div>
                </div>

                {/* Guests (conditional -- only for reservation) */}
                {selectedType === "reservation" && (
                  <div>
                    <label
                      htmlFor="guests"
                      className="mb-1.5 block font-heading text-sm font-medium text-bark"
                    >
                      {t("form.guests")}
                    </label>
                    <select
                      id="guests"
                      name="guests"
                      className={inputClass}
                      defaultValue="2"
                    >
                      {Array.from({ length: 12 }, (_, i) => i + 1).map((n) => (
                        <option key={n} value={String(n)}>
                          {n} {n === 1 ? t("form.guest_singular") : t("form.guest_plural")}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="mb-1.5 block font-heading text-sm font-medium text-bark"
                  >
                    {t("form.message")}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    placeholder={t("form.message_placeholder")}
                    className={inputClass}
                  />
                  <FieldError errors={errors} field="message" />
                </div>

                {/* Loi 25 consent */}
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="consent"
                    required
                    className="mt-1 h-4 w-4 rounded border-cream-400 text-olive-500 focus:ring-olive-500/20"
                  />
                  <span className="font-body text-sm text-bark-light">
                    {t("form.consent_notice")}{" "}
                    <Link
                      href="/politique-confidentialite"
                      className="text-olive-600 underline underline-offset-2 hover:text-olive-700"
                    >
                      {t("form.privacy_link")}
                    </Link>
                  </span>
                </label>
                <FieldError errors={errors} field="consent" />

                {/* Submit */}
                <Button type="submit" size="lg" variant="primary" disabled={sending}>
                  {sending ? (
                    <span className="flex items-center gap-2">
                      <svg
                        className="h-4 w-4 animate-spin"
                        viewBox="0 0 24 24"
                        fill="none"
                        aria-hidden="true"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                        />
                      </svg>
                      {t("form.sending")}
                    </span>
                  ) : (
                    t("form.submit")
                  )}
                </Button>

                <p className="font-body text-sm text-bark-light">
                  {t("form.response_time")}
                </p>
              </form>
            </AnimatedSection>

            {/* --- Sidebar (2 cols) --- */}
            <AnimatedSection direction="right" delay={0.2} className="md:col-span-2">
              {/* Contact info card */}
              <div className="rounded-2xl border border-bark bg-bark p-6 text-cream-100 md:p-8">
                <h3 className="mb-6 font-heading text-xl text-cream-100">
                  {t("info.title")}
                </h3>
                <div className="space-y-6">
                  {/* Address */}
                  <div className="flex items-start gap-3">
                    <MapPin
                      className="h-5 w-5 text-terra-400 mt-0.5 shrink-0"
                      strokeWidth={1.5}
                    />
                    <div>
                      <p className="font-heading text-sm font-medium text-cream-300">
                        {t("info.address_label")}
                      </p>
                      <p className="font-body text-cream-200">
                        42, rue du Petit-Champlain
                        <br />
                        {t("info.address_city")}
                      </p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-start gap-3">
                    <Phone
                      className="h-5 w-5 text-terra-400 mt-0.5 shrink-0"
                      strokeWidth={1.5}
                    />
                    <div>
                      <p className="font-heading text-sm font-medium text-cream-300">
                        {t("info.phone_label")}
                      </p>
                      <a
                        href="tel:+14185550142"
                        className="font-body text-cream-200 transition-colors hover:text-cream-100"
                      >
                        (418) 555-0142
                      </a>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start gap-3">
                    <Mail
                      className="h-5 w-5 text-terra-400 mt-0.5 shrink-0"
                      strokeWidth={1.5}
                    />
                    <div>
                      <p className="font-heading text-sm font-medium text-cream-300">
                        {t("info.email_label")}
                      </p>
                      <a
                        href="mailto:info@tablede-marguerite.ca"
                        className="font-body text-cream-200 transition-colors hover:text-cream-100"
                      >
                        info@tablede-marguerite.ca
                      </a>
                    </div>
                  </div>

                  {/* Hours */}
                  <div className="flex items-start gap-3">
                    <Clock
                      className="h-5 w-5 text-terra-400 mt-0.5 shrink-0"
                      strokeWidth={1.5}
                    />
                    <div>
                      <p className="font-heading text-sm font-medium text-cream-300">
                        {t("info.hours_label")}
                      </p>
                      <p className="font-body text-cream-200">{t("info.hours_dinner")}</p>
                      <p className="font-body text-cream-200">{t("info.hours_brunch")}</p>
                      <p className="font-body text-cream-200">{t("info.hours_closed")}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map placeholder */}
              <div className="mt-6 flex h-48 items-center justify-center rounded-2xl bg-gradient-to-br from-cream-200 to-cream-300 border border-cream-400">
                <div className="text-center">
                  <MapPin className="mx-auto mb-2 h-8 w-8 text-olive-400" strokeWidth={1.5} />
                  <p className="font-heading text-sm font-medium text-bark-light">
                    {t("map.label")}
                  </p>
                  <p className="font-body text-xs text-bark-light">
                    {t("map.sublabel")}
                  </p>
                </div>
              </div>

              {/* Loi 25 notice */}
              <div className="mt-6 rounded-2xl border border-olive-200/50 bg-olive-50 p-6">
                <h3 className="mb-2 font-heading text-sm font-semibold text-olive-700">
                  {t("loi25.title")}
                </h3>
                <p className="font-body text-sm text-bark-light leading-relaxed">
                  {t("loi25.notice")}{" "}
                  <Link
                    href="/politique-confidentialite"
                    className="text-olive-600 underline underline-offset-2 hover:text-olive-700"
                  >
                    {t("loi25.link")}
                  </Link>
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </main>
  );
}
