"use client";

import { useState, useCallback, useRef } from "react";
import { useTranslations } from "next-intl";
import { Calendar, Users, Clock, Phone, User } from "lucide-react";
import { toast } from "sonner";
import { useInView, useReducedMotion } from "@/hooks/useAnimations";

/* ------------------------------------------------------------------ */
/*  Form state                                                         */
/* ------------------------------------------------------------------ */

interface ReservationForm {
  date: string;
  guests: string;
  time: string;
  name: string;
  phone: string;
}

const INITIAL_FORM: ReservationForm = {
  date: "",
  guests: "2",
  time: "",
  name: "",
  phone: "",
};

/** Available time slots */
const TIME_SLOTS = [
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "17:30",
  "18:00",
  "18:30",
  "19:00",
  "19:30",
  "20:00",
  "20:30",
  "21:00",
] as const;

/** Guest count options */
const GUEST_OPTIONS = Array.from({ length: 10 }, (_, i) => i + 1);

/* ------------------------------------------------------------------ */
/*  Form field wrapper                                                 */
/* ------------------------------------------------------------------ */

interface FieldProps {
  icon: React.ReactNode;
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}

function FormField({ icon, label, htmlFor, children }: FieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={htmlFor}
        className="flex items-center gap-2 font-heading text-sm font-semibold text-bark"
      >
        {icon}
        {label}
      </label>
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main export                                                        */
/* ------------------------------------------------------------------ */

/**
 * ReservationWidget -- Simplified reservation form for La Table de Marguerite.
 *
 * Collects date, number of guests, time slot, name and phone. Does not
 * actually submit (UI-only with toast confirmation via sonner).
 *
 * @component
 * @example
 * ```tsx
 * <ReservationWidget />
 * ```
 */
export function ReservationWidget() {
  const t = useTranslations("home.reservation");
  const prefersReduced = useReducedMotion();
  const [form, setForm] = useState<ReservationForm>(INITIAL_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true });
  const cardInView = useInView(cardRef, { once: true });

  /** Update a single field */
  const updateField = useCallback(
    (field: keyof ReservationForm, value: string) => {
      setForm((prev) => ({ ...prev, [field]: value }));
    },
    [],
  );

  /** Simulated submit handler */
  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();

      /* Basic client-side validation */
      if (!form.date || !form.time || !form.name.trim() || !form.phone.trim()) {
        toast.error(t("error_missing_fields"));
        return;
      }

      setIsSubmitting(true);

      /* Simulate network delay */
      setTimeout(() => {
        setIsSubmitting(false);
        toast.success(t("success_message"), {
          description: t("success_description", {
            date: form.date,
            time: form.time,
            guests: form.guests,
          }),
          duration: 5000,
        });
        setForm(INITIAL_FORM);
      }, 1200);
    },
    [form, t],
  );

  /** Today's date in YYYY-MM-DD for min attribute */
  const today = new Date().toISOString().split("T")[0];

  const inputClasses =
    "w-full rounded-lg border border-olive-200 bg-cream-50 px-4 py-2.5 font-body text-sm text-bark transition-colors duration-200 placeholder:text-cream-600 focus:border-olive-500 focus:outline-none focus:ring-2 focus:ring-olive-200";

  const selectClasses =
    "w-full appearance-none rounded-lg border border-olive-200 bg-cream-50 px-4 py-2.5 font-body text-sm text-bark transition-colors duration-200 focus:border-olive-500 focus:outline-none focus:ring-2 focus:ring-olive-200";

  return (
    <section
      id="reservation"
      className="bg-cream-200 py-16 lg:py-24"
      aria-labelledby="reservation-heading"
    >
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div
          ref={headerRef}
          className="mb-10 text-center"
          style={{
            opacity: prefersReduced || headerInView ? 1 : 0,
            transform: prefersReduced || headerInView ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.5s ease-in-out, transform 0.5s ease-in-out",
          }}
        >
          <h2
            id="reservation-heading"
            className="mb-3 font-heading text-3xl font-bold text-bark lg:text-4xl"
          >
            {t("title")}
          </h2>
          <p className="mx-auto max-w-md font-body text-bark-light">
            {t("subtitle")}
          </p>
        </div>

        {/* Reservation card */}
        <div
          ref={cardRef}
          className="rounded-2xl border border-olive-200 bg-cream-100 p-6 shadow-sm sm:p-8"
          style={{
            opacity: prefersReduced || cardInView ? 1 : 0,
            transform: prefersReduced || cardInView ? "translateY(0) scale(1)" : "translateY(20px) scale(0.98)",
            transition: "opacity 0.5s ease-in-out 0.15s, transform 0.5s ease-in-out 0.15s",
          }}
        >
          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            {/* Row 1: Date + Guests */}
            <div className="grid gap-5 sm:grid-cols-2">
              {/* Date */}
              <FormField
                icon={<Calendar size={16} className="text-olive-500" aria-hidden="true" />}
                label={t("field_date")}
                htmlFor="reservation-date"
              >
                <input
                  id="reservation-date"
                  type="date"
                  min={today}
                  value={form.date}
                  onChange={(e) => updateField("date", e.target.value)}
                  className={inputClasses}
                  required
                  aria-required="true"
                />
              </FormField>

              {/* Guests */}
              <FormField
                icon={<Users size={16} className="text-olive-500" aria-hidden="true" />}
                label={t("field_guests")}
                htmlFor="reservation-guests"
              >
                <select
                  id="reservation-guests"
                  value={form.guests}
                  onChange={(e) => updateField("guests", e.target.value)}
                  className={selectClasses}
                  required
                  aria-required="true"
                >
                  {GUEST_OPTIONS.map((n) => (
                    <option key={n} value={n}>
                      {t("guest_count", { count: n })}
                    </option>
                  ))}
                </select>
              </FormField>
            </div>

            {/* Row 2: Time */}
            <FormField
              icon={<Clock size={16} className="text-olive-500" aria-hidden="true" />}
              label={t("field_time")}
              htmlFor="reservation-time"
            >
              <select
                id="reservation-time"
                value={form.time}
                onChange={(e) => updateField("time", e.target.value)}
                className={selectClasses}
                required
                aria-required="true"
              >
                <option value="" disabled>
                  {t("time_placeholder")}
                </option>
                {TIME_SLOTS.map((slot) => (
                  <option key={slot} value={slot}>
                    {slot}
                  </option>
                ))}
              </select>
            </FormField>

            {/* Row 3: Name + Phone */}
            <div className="grid gap-5 sm:grid-cols-2">
              {/* Name */}
              <FormField
                icon={<User size={16} className="text-olive-500" aria-hidden="true" />}
                label={t("field_name")}
                htmlFor="reservation-name"
              >
                <input
                  id="reservation-name"
                  type="text"
                  value={form.name}
                  onChange={(e) => updateField("name", e.target.value)}
                  placeholder={t("name_placeholder")}
                  className={inputClasses}
                  required
                  aria-required="true"
                  autoComplete="name"
                />
              </FormField>

              {/* Phone */}
              <FormField
                icon={<Phone size={16} className="text-olive-500" aria-hidden="true" />}
                label={t("field_phone")}
                htmlFor="reservation-phone"
              >
                <input
                  id="reservation-phone"
                  type="tel"
                  value={form.phone}
                  onChange={(e) => updateField("phone", e.target.value)}
                  placeholder={t("phone_placeholder")}
                  className={inputClasses}
                  required
                  aria-required="true"
                  autoComplete="tel"
                />
              </FormField>
            </div>

            {/* Divider */}
            <div className="border-t border-olive-100" />

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-terra-500 px-6 py-3.5 font-heading text-base font-bold text-cream-100 shadow-md shadow-terra-300/30 transition-all duration-300 hover:bg-terra-600 hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terra-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? (
                <>
                  {/* Simple spinner */}
                  <svg
                    className="h-5 w-5 animate-spin text-cream-200"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
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
                  {t("submitting")}
                </>
              ) : (
                <>
                  <Calendar size={18} aria-hidden="true" />
                  {t("submit")}
                </>
              )}
            </button>

            {/* Privacy note */}
            <p className="text-center font-body text-[11px] text-bark-light">
              {t("privacy_note")}
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
