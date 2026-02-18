import { ReactNode } from "react";
import { notFound } from "next/navigation";
import { getMessages, getTranslations } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { Cormorant_Garamond, Lato } from "next/font/google";
import { routing } from "@/i18n/routing";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ClientWidgets } from "@/components/layout/ClientWidgets";
import { JsonLd, localBusinessSchema } from "@/components/seo/JsonLd";
import type { Metadata, Viewport } from "next";
import "../globals.css";

// NEXOS: Typographie chaleureux organique — La Table de Marguerite
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-lato",
  display: "swap",
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });

  const description =
    locale === "fr"
      ? "La Table de Marguerite \u2014 Bistro gastronomique au c\u0153ur du Vieux-Qu\u00e9bec. Cuisine de saison, produits locaux et ambiance chaleureuse."
      : "La Table de Marguerite \u2014 Gastronomic bistro in the heart of Old Quebec. Seasonal cuisine, local products and warm atmosphere.";

  return {
    metadataBase: new URL("https://table-de-marguerite.vercel.app"),
    title: {
      default: t("title"),
      template: "%s | La Table de Marguerite",
    },
    description,
    openGraph: {
      type: "website",
      locale: locale === "fr" ? "fr_CA" : "en_CA",
      alternateLocale: locale === "fr" ? "en_CA" : "fr_CA",
      siteName: "La Table de Marguerite",
      title: t("title"),
      description,
    },
    alternates: {
      canonical: `https://table-de-marguerite.vercel.app/${locale}`,
      languages: {
        fr: "https://table-de-marguerite.vercel.app/fr",
        en: "https://table-de-marguerite.vercel.app/en",
      },
    },
    icons: { icon: "/favicon.ico" },
  };
}

export async function generateViewport(): Promise<Viewport> {
  return {
    themeColor: "#4A5A3C",
  };
}

interface RootLayoutProps {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function RootLayout({
  children,
  params,
}: RootLayoutProps) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as "fr" | "en")) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} className={`${cormorant.variable} ${lato.variable}`}>
      <body className="font-body bg-cream-200 text-bark antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:bg-olive-600 focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to main content
        </a>
        <JsonLd data={localBusinessSchema} />
        <NextIntlClientProvider messages={messages}>
          <Header />
          <div id="main-content" className="min-h-screen">{children}</div>
          <Footer />
          <ClientWidgets />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}
