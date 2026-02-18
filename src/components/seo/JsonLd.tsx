interface JsonLdProps {
  data: Record<string, unknown>;
}

/**
 * Renders a JSON-LD structured data script tag for SEO.
 *
 * @component
 * @param {JsonLdProps} props - The structured data object to serialize.
 * @example
 * <JsonLd data={localBusinessSchema} />
 */
export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: "La Table de Marguerite",
  description:
    "Bistro gastronomique dans le Vieux-Québec. Cuisine française et québécoise, produits locaux et de saison depuis 1987.",
  url: "https://table-de-marguerite.vercel.app",
  telephone: "(418) 555-0142",
  email: "info@tablede-marguerite.ca",
  servesCuisine: ["French", "Québécois", "Farm-to-table"],
  priceRange: "$$$",
  address: {
    "@type": "PostalAddress",
    streetAddress: "42, rue du Petit-Champlain",
    addressLocality: "Québec",
    addressRegion: "QC",
    postalCode: "G1K 4H4",
    addressCountry: "CA",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 46.8117,
    longitude: -71.2038,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "17:00",
      closes: "22:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Sunday",
      opens: "10:00",
      closes: "14:00",
    },
  ],
  areaServed: {
    "@type": "City",
    name: "Québec",
  },
  founder: {
    "@type": "Person",
    name: "Marguerite Tremblay",
    jobTitle: "Cheffe fondatrice",
  },
  knowsLanguage: ["fr", "en"],
};

export function buildServiceSchema(locale: string) {
  const isFr = locale === "fr";
  return {
    "@context": "https://schema.org",
    "@type": "FoodService",
    provider: {
      "@type": "Restaurant",
      name: "La Table de Marguerite",
      url: "https://table-de-marguerite.vercel.app",
    },
    serviceType: isFr ? "Restauration gastronomique" : "Fine Dining",
    areaServed: {
      "@type": "City",
      name: "Québec, Canada",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: isFr ? "Menu gastronomique" : "Gastronomic Menu",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "FoodService",
            name: isFr ? "Souper gastronomique" : "Gastronomic Dinner",
            description: isFr
              ? "Menu saisonnier du mardi au samedi, 17h à 22h. Entrées, plats, desserts et carte des vins."
              : "Seasonal menu from Tuesday to Saturday, 5pm to 10pm. Starters, mains, desserts and wine list.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "FoodService",
            name: isFr ? "Brunch du dimanche" : "Sunday Brunch",
            description: isFr
              ? "Brunch gastronomique le dimanche de 10h à 14h. Classiques revisités avec produits locaux."
              : "Gastronomic brunch on Sundays from 10am to 2pm. Reimagined classics with local products.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "FoodService",
            name: isFr ? "Événements privés" : "Private Events",
            description: isFr
              ? "Salon privé pour événements spéciaux jusqu'à 20 convives. Menu personnalisé sur demande."
              : "Private dining room for special events up to 20 guests. Custom menu upon request.",
          },
        },
      ],
    },
  };
}

export function buildFaqSchema(
  items: { question: string; answer: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}
