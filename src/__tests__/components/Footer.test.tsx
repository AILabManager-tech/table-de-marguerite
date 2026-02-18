import { render, screen, cleanup } from "@testing-library/react";
import { describe, it, expect, afterEach, vi } from "vitest";

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
  useLocale: () => "fr",
}));

vi.mock("@/i18n/routing", () => ({
  Link: ({
    children,
    href,
    ...props
  }: {
    children: React.ReactNode;
    href: string;
    [key: string]: unknown;
  }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

vi.mock("@/components/legal/CookieConsent", () => ({
  CookieSettingsButton: () => <button>Cookie Settings</button>,
}));

import { Footer } from "@/components/layout/Footer";

afterEach(cleanup);

describe("Footer", () => {
  it("renders footer element", () => {
    render(<Footer />);
    expect(document.querySelector("footer")).toBeInTheDocument();
  });

  it("renders the brand name La Table de Marguerite", () => {
    render(<Footer />);
    expect(screen.getByText(/La Table de Marguerite/)).toBeInTheDocument();
  });

  it("renders navigation links (home, menu, about, contact)", () => {
    render(<Footer />);
    expect(screen.getByText("home")).toBeInTheDocument();
    expect(screen.getByText("menu")).toBeInTheDocument();
    expect(screen.getByText("about")).toBeInTheDocument();
    expect(screen.getByText("contact")).toBeInTheDocument();
  });

  it("renders legal links (privacy, legal mentions)", () => {
    render(<Footer />);
    const privacyLink = screen.getByText("Politique de confidentialit\u00e9");
    expect(privacyLink.closest("a")).toHaveAttribute(
      "href",
      "/politique-confidentialite"
    );
    const legalLink = screen.getByText("Mentions l\u00e9gales");
    expect(legalLink.closest("a")).toHaveAttribute(
      "href",
      "/mentions-legales"
    );
  });

  it("renders cookie settings button", () => {
    render(<Footer />);
    expect(screen.getByText("Cookie Settings")).toBeInTheDocument();
  });

  it("renders CTA section", () => {
    render(<Footer />);
    expect(screen.getByText("cta")).toBeInTheDocument();
    expect(screen.getByText("cta_button")).toBeInTheDocument();
  });

  it("renders address info (42, rue du Petit-Champlain)", () => {
    render(<Footer />);
    expect(screen.getByText(/42, rue du Petit-Champlain/)).toBeInTheDocument();
  });

  it("renders contact info (phone and email)", () => {
    render(<Footer />);
    expect(screen.getByText(/555-0142/)).toBeInTheDocument();
    expect(screen.getByText("info@tablede-marguerite.ca")).toBeInTheDocument();
  });

  it("renders social links (Instagram, Facebook)", () => {
    render(<Footer />);
    expect(screen.getByText("Instagram")).toBeInTheDocument();
    expect(screen.getByText("Facebook")).toBeInTheDocument();
  });

  it("renders newsletter section", () => {
    render(<Footer />);
    const emailInput = screen.getByLabelText("Adresse courriel");
    expect(emailInput).toBeInTheDocument();
    expect(screen.getByText("OK")).toBeInTheDocument();
  });

  it("renders copyright with current year", () => {
    render(<Footer />);
    const year = new Date().getFullYear();
    expect(screen.getByText(new RegExp(`${year}`))).toBeInTheDocument();
  });
});
