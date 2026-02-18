import type { Metadata } from "next";

// Static metadata so Lighthouse can find the description in <head>
export const metadata: Metadata = {
  description:
    "La Table de Marguerite — Bistro gastronomique dans le Vieux-Québec. Cuisine française et québécoise, produits locaux et de saison.",
};

// Root layout redirects to [locale] layout
// This file is required by Next.js but all rendering happens in [locale]/layout.tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
