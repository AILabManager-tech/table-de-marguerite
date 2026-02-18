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

vi.mock("next/image", () => ({
  default: (props: { alt: string; src: string }) => (
    <img alt={props.alt} src={props.src} />
  ),
}));

vi.mock("next/link", () => ({
  default: ({
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

// Mock next/dynamic — collect promises on globalThis and resolve before tests.
vi.mock("next/dynamic", () => {
  const g = globalThis as unknown as { __dynPromises: Promise<void>[] };
  if (!g.__dynPromises) g.__dynPromises = [];
  return {
    __esModule: true,
    default: (loader: () => Promise<unknown>) => {
      let C: React.ComponentType<Record<string, unknown>> = () => null;
      const p = loader().then((mod: unknown) => {
        const m = mod as { default?: React.ComponentType<Record<string, unknown>> };
        if (m?.default) C = m.default;
      });
      g.__dynPromises.push(p);
      return (props: Record<string, unknown>) => {
        const Comp = C;
        return <Comp {...props} />;
      };
    },
  };
});

vi.mock("@/components/animations/TextReveal", () => ({
  TextReveal: ({
    children,
  }: {
    children: React.ReactNode;
  }) => <h2>{children}</h2>,
}));

vi.mock("@/components/animations/AuroraBackground", () => ({
  AuroraBackground: () => <div data-testid="aurora" />,
}));

vi.mock("@/components/animations/LineReveal", () => ({
  LineReveal: () => <div data-testid="line-reveal" />,
}));

vi.mock("@/components/animations/MagneticButton", () => ({
  MagneticButton: ({
    children,
    href,
  }: {
    children: React.ReactNode;
    href: string;
  }) => <a href={href}>{children}</a>,
}));

vi.mock("@/components/ui/AnimatedSection", () => ({
  AnimatedSection: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

vi.mock("@/components/animations/StaggerGrid", () => ({
  StaggerGrid: ({
    children,
    className,
  }: {
    children: React.ReactNode;
    className?: string;
  }) => <div className={className}>{children}</div>,
}));

vi.mock("@/components/interactive/BotanicalDivider", () => ({
  BotanicalDivider: () => <div data-testid="botanical-divider" />,
}));

import { AboutContent } from "@/components/pages/AboutContent";
import { beforeAll } from "vitest";

// Flush all dynamic import promises before tests run
beforeAll(async () => {
  const g = globalThis as unknown as { __dynPromises?: Promise<void>[] };
  if (g.__dynPromises) await Promise.all(g.__dynPromises);
});

afterEach(cleanup);

describe("AboutContent", () => {
  it("renders the main element", () => {
    render(<AboutContent />);
    expect(document.querySelector("main")).toBeInTheDocument();
  });

  it("renders hero title (Notre Histoire)", () => {
    render(<AboutContent />);
    expect(screen.getByText("hero.title")).toBeInTheDocument();
  });

  it("renders hero badge", () => {
    render(<AboutContent />);
    expect(screen.getByText("hero.badge")).toBeInTheDocument();
  });

  it("renders story section", () => {
    render(<AboutContent />);
    expect(screen.getByText("story.title")).toBeInTheDocument();
    expect(screen.getByText("story.p1")).toBeInTheDocument();
    expect(screen.getByText("story.p2")).toBeInTheDocument();
    expect(screen.getByText("story.p3")).toBeInTheDocument();
  });

  it("renders values section (Terroir, Savoir-faire, Convivialite)", () => {
    render(<AboutContent />);
    expect(screen.getByText("values.title")).toBeInTheDocument();
    expect(screen.getByText("values.terroir.title")).toBeInTheDocument();
    expect(screen.getByText("values.savoirfaire.title")).toBeInTheDocument();
    expect(screen.getByText("values.convivialite.title")).toBeInTheDocument();
  });

  it("renders team section", () => {
    render(<AboutContent />);
    expect(screen.getByText("team.title")).toBeInTheDocument();
  });

  it("renders CTA section", () => {
    render(<AboutContent />);
    expect(screen.getByText("cta.title")).toBeInTheDocument();
    expect(screen.getByText("cta.button")).toBeInTheDocument();
  });

  it("renders BotanicalDivider components", () => {
    render(<AboutContent />);
    const dividers = screen.getAllByTestId("botanical-divider");
    expect(dividers.length).toBeGreaterThanOrEqual(2);
  });

  it("renders multiple sections", () => {
    render(<AboutContent />);
    const sections = document.querySelectorAll("section");
    expect(sections.length).toBeGreaterThanOrEqual(4);
  });
});
