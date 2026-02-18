import { getTranslations } from "next-intl/server";
import { ServicesContentLazy } from "@/components/pages/ServicesContentLazy";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "services.meta" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `https://table-de-marguerite.vercel.app/${locale}/menu`,
      languages: {
        fr: "https://table-de-marguerite.vercel.app/fr/menu",
        en: "https://table-de-marguerite.vercel.app/en/menu",
      },
    },
  };
}

export default function MenuPage() {
  return <ServicesContentLazy />;
}
