import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import {
  JsonLd,
  localBusinessSchema,
  buildServiceSchema,
  buildFaqSchema,
} from "@/components/seo/JsonLd";

describe("JsonLd", () => {
  it("renders a script tag with correct type", () => {
    const { container } = render(<JsonLd data={localBusinessSchema} />);
    const script = container.querySelector('script[type="application/ld+json"]');
    expect(script).not.toBeNull();
  });

  it("renders valid JSON content with Restaurant type", () => {
    const { container } = render(<JsonLd data={localBusinessSchema} />);
    const script = container.querySelector('script[type="application/ld+json"]');
    const parsed = JSON.parse(script!.textContent!);
    expect(parsed["@context"]).toBe("https://schema.org");
    expect(parsed["@type"]).toBe("Restaurant");
    expect(parsed.name).toBe("La Table de Marguerite");
  });
});

describe("localBusinessSchema", () => {
  it("has required Restaurant fields", () => {
    expect(localBusinessSchema["@type"]).toBe("Restaurant");
    expect(localBusinessSchema.name).toBe("La Table de Marguerite");
    expect(localBusinessSchema.url).toBe("https://table-de-marguerite.vercel.app");
    expect(localBusinessSchema.address).toBeDefined();
    expect(localBusinessSchema.servesCuisine).toEqual(["French", "Qu\u00e9b\u00e9cois", "Farm-to-table"]);
    expect(localBusinessSchema.knowsLanguage).toContain("fr");
    expect(localBusinessSchema.knowsLanguage).toContain("en");
  });

  it("has correct address", () => {
    expect(localBusinessSchema.address.streetAddress).toBe("42, rue du Petit-Champlain");
    expect(localBusinessSchema.address.addressLocality).toBe("Qu\u00e9bec");
    expect(localBusinessSchema.address.addressRegion).toBe("QC");
    expect(localBusinessSchema.address.postalCode).toBe("G1K 4H4");
  });

  it("has geo coordinates", () => {
    expect(localBusinessSchema.geo).toBeDefined();
    expect(localBusinessSchema.geo.latitude).toBeDefined();
    expect(localBusinessSchema.geo.longitude).toBeDefined();
  });

  it("has opening hours specification", () => {
    expect(localBusinessSchema.openingHoursSpecification).toBeDefined();
    expect(localBusinessSchema.openingHoursSpecification.length).toBe(2);
  });

  it("has founder info", () => {
    expect(localBusinessSchema.founder).toBeDefined();
    expect(localBusinessSchema.founder.name).toBe("Marguerite Tremblay");
  });
});

describe("buildServiceSchema", () => {
  it("builds French service schema with FoodService type", () => {
    const schema = buildServiceSchema("fr");
    expect(schema["@type"]).toBe("FoodService");
    expect(schema.serviceType).toBe("Restauration gastronomique");
    expect(schema.hasOfferCatalog.itemListElement).toHaveLength(3);
  });

  it("builds English service schema", () => {
    const schema = buildServiceSchema("en");
    expect(schema.serviceType).toBe("Fine Dining");
  });

  it("includes provider as Restaurant", () => {
    const schema = buildServiceSchema("fr");
    expect(schema.provider["@type"]).toBe("Restaurant");
    expect(schema.provider.name).toBe("La Table de Marguerite");
    expect(schema.provider.url).toBe("https://table-de-marguerite.vercel.app");
  });
});

describe("buildFaqSchema", () => {
  it("builds FAQPage schema from items", () => {
    const items = [
      { question: "Faut-il r\u00e9server?", answer: "Oui, fortement recommand\u00e9." },
      { question: "Options v\u00e9g\u00e9tariennes?", answer: "Absolument." },
    ];
    const schema = buildFaqSchema(items);
    expect(schema["@type"]).toBe("FAQPage");
    expect(schema.mainEntity).toHaveLength(2);
    expect(schema.mainEntity[0]!["@type"]).toBe("Question");
    expect(schema.mainEntity[0]!.name).toBe("Faut-il r\u00e9server?");
    expect(schema.mainEntity[0]!.acceptedAnswer.text).toBe("Oui, fortement recommand\u00e9.");
  });
});
