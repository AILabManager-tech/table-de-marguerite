import { getTranslations } from "next-intl/server";
import { AboutContentLazy } from "@/components/pages/AboutContentLazy";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about.meta" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `https://table-de-marguerite.vercel.app/${locale}/notre-histoire`,
      languages: {
        fr: "https://table-de-marguerite.vercel.app/fr/notre-histoire",
        en: "https://table-de-marguerite.vercel.app/en/notre-histoire",
      },
    },
  };
}

export default function NotreHistoirePage() {
  return <AboutContentLazy />;
}
