import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { describe, it, expect, afterEach, vi } from "vitest";

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
  useLocale: () => "fr",
}));

const mockPush = vi.fn();
const mockReplace = vi.fn();

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
  usePathname: () => "/",
  useRouter: () => ({ push: mockPush, replace: mockReplace }),
}));

import { Header } from "@/components/layout/Header";

afterEach(cleanup);

describe("Header", () => {
  it("renders the brand name La Table de Marguerite", () => {
    render(<Header />);
    expect(screen.getByText(/La Table de/)).toBeInTheDocument();
    expect(screen.getByText(/Marguerite/)).toBeInTheDocument();
  });

  it("renders navigation links (menu, about, contact)", () => {
    render(<Header />);
    expect(screen.getAllByText("menu").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("about").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("contact").length).toBeGreaterThanOrEqual(1);
  });

  it("renders language switcher with EN label in fr locale", () => {
    render(<Header />);
    const langBtns = screen.getAllByLabelText("Switch to English");
    expect(langBtns.length).toBeGreaterThanOrEqual(1);
    expect(langBtns[0]).toHaveTextContent("EN");
  });

  it("toggles mobile menu", () => {
    render(<Header />);
    const toggle = screen.getByLabelText("Ouvrir le menu");
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute("aria-expanded", "true");
  });

  it("renders CTA (Reserver) link", () => {
    render(<Header />);
    const ctas = screen.getAllByText("cta");
    expect(ctas.length).toBeGreaterThanOrEqual(1);
  });

  it("calls router.replace on locale switch", () => {
    render(<Header />);
    const langBtns = screen.getAllByLabelText("Switch to English");
    fireEvent.click(langBtns[0]);
    expect(mockReplace).toHaveBeenCalledWith("/", { locale: "en" });
  });

  it("has gradient accent line with olive/terra/prune", () => {
    render(<Header />);
    const header = document.querySelector("header");
    expect(header).toBeInTheDocument();
    const accentLine = header!.querySelector(".bg-gradient-to-r");
    expect(accentLine).toBeInTheDocument();
  });

  it("renders utensils icon", () => {
    render(<Header />);
    const icon = document.querySelector('[aria-hidden="true"]');
    expect(icon).toBeInTheDocument();
  });
});
