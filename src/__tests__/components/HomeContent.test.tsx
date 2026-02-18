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

vi.mock("framer-motion", () => {
  const mc = (Tag: string) => {
    const FM_PROPS = new Set([
      "initial", "animate", "exit", "transition", "whileInView",
      "viewport", "variants", "whileHover", "whileTap", "layout",
      "layoutId",
    ]);
    const C = ({ children, ...props }: Record<string, unknown>) => {
      const safe: Record<string, unknown> = {};
      for (const [k, v] of Object.entries(props)) {
        if (!FM_PROPS.has(k)) {
          safe[k] = v;
        }
      }
      const El = Tag as unknown as React.ElementType;
      return <El {...safe}>{children as React.ReactNode}</El>;
    };
    C.displayName = `motion.${Tag}`;
    return C;
  };
  return {
    motion: {
      div: mc("div"), span: mc("span"), button: mc("button"),
      section: mc("section"), a: mc("a"), h1: mc("h1"),
      h2: mc("h2"), h3: mc("h3"), p: mc("p"),
      blockquote: mc("blockquote"),
      create: (tag: string) => mc(tag),
    },
    animate: () => ({ stop: () => {} }),
    useInView: () => true,
    useScroll: () => ({ scrollYProgress: { get: () => 0.5 } }),
    useTransform: () => 0,
    useMotionValue: (v: number = 0) => ({ set: () => {}, get: () => v }),
    useSpring: () => ({ set: () => {}, get: () => 0 }),
    useReducedMotion: () => false,
    AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  };
});

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
  // globalThis is accessible inside hoisted vi.mock factories
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
    className,
  }: {
    children: React.ReactNode;
    className?: string;
  }) => <h1 className={className}>{children}</h1>,
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

vi.mock("@/components/animations/AuroraBackground", () => ({
  AuroraBackground: () => <div data-testid="aurora" />,
}));

vi.mock("@/components/animations/CountUp", () => ({
  CountUp: ({ to, suffix }: { to: number; suffix?: string }) => (
    <span>
      {to}
      {suffix}
    </span>
  ),
}));

vi.mock("@/components/animations/LineReveal", () => ({
  LineReveal: () => <div data-testid="line-reveal" />,
}));

vi.mock("@/components/animations/FloatingElement", () => ({
  FloatingElement: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

vi.mock("@/components/ui/AnimatedSection", () => ({
  AnimatedSection: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

vi.mock("@/components/interactive/SeasonalMenuExplorer", () => ({
  SeasonalMenuExplorer: () => <div data-testid="seasonal-menu-explorer" />,
}));

vi.mock("@/components/interactive/BotanicalDivider", () => ({
  BotanicalDivider: () => <div data-testid="botanical-divider" />,
}));

import { HomeContent } from "@/components/pages/HomeContent";
import { beforeAll } from "vitest";

// Flush all dynamic import promises before tests run
beforeAll(async () => {
  const g = globalThis as unknown as { __dynPromises?: Promise<void>[] };
  if (g.__dynPromises) await Promise.all(g.__dynPromises);
});

afterEach(cleanup);

describe("HomeContent", () => {
  it("renders the main element", () => {
    render(<HomeContent />);
    expect(document.querySelector("main")).toBeInTheDocument();
  });

  it("renders hero section with title", () => {
    render(<HomeContent />);
    expect(screen.getByText("hero.title")).toBeInTheDocument();
  });

  it("renders hero subtitle", () => {
    render(<HomeContent />);
    expect(screen.getByText("hero.subtitle")).toBeInTheDocument();
  });

  it("renders hero CTA buttons (Reserver + Voir le menu)", () => {
    render(<HomeContent />);
    expect(screen.getByText("hero.cta")).toBeInTheDocument();
    expect(screen.getByText("hero.cta_secondary")).toBeInTheDocument();
  });

  it("renders stats section (years, local, seasons)", () => {
    render(<HomeContent />);
    expect(screen.getByText("stats.experience")).toBeInTheDocument();
    expect(screen.getByText("stats.local")).toBeInTheDocument();
    expect(screen.getByText("stats.seasons")).toBeInTheDocument();
  });

  it("renders philosophy section", () => {
    render(<HomeContent />);
    expect(screen.getByText("philosophy.title")).toBeInTheDocument();
    expect(screen.getByText("philosophy.p1")).toBeInTheDocument();
  });

  it("renders SeasonalMenuExplorer component", () => {
    render(<HomeContent />);
    expect(screen.getByTestId("seasonal-menu-explorer")).toBeInTheDocument();
  });

  it("renders BotanicalDivider components", () => {
    render(<HomeContent />);
    const dividers = screen.getAllByTestId("botanical-divider");
    expect(dividers.length).toBeGreaterThanOrEqual(2);
  });

  it("renders gallery section", () => {
    render(<HomeContent />);
    expect(screen.getByText("gallery.title")).toBeInTheDocument();
    expect(screen.getByText("gallery.subtitle")).toBeInTheDocument();
  });

  it("renders testimonials section", () => {
    render(<HomeContent />);
    expect(screen.getByText("testimonials.title")).toBeInTheDocument();
  });

  it("renders reservation CTA section", () => {
    render(<HomeContent />);
    expect(screen.getByText("reservation.title")).toBeInTheDocument();
    expect(screen.getByText("reservation.cta")).toBeInTheDocument();
  });

  it("renders multiple content sections", () => {
    render(<HomeContent />);
    const sections = document.querySelectorAll("section");
    expect(sections.length).toBeGreaterThanOrEqual(4);
  });
});
