"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations("error");

  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <main className="flex min-h-[60vh] items-center justify-center px-6">
      <div className="text-center max-w-md">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-terra-100">
          <svg
            className="h-8 w-8 text-terra-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
            />
          </svg>
        </div>
        <h1 className="mb-2 font-heading text-2xl font-semibold text-bark">
          {t("title")}
        </h1>
        <p className="mb-6 text-cream-700">
          {t("description")}
        </p>
        <button
          onClick={reset}
          className="rounded-xl bg-olive-600 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-olive-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-olive-400 focus:ring-offset-2"
        >
          {t("retry")}
        </button>
      </div>
    </main>
  );
}
