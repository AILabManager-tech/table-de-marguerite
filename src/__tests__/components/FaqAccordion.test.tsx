import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { describe, it, expect, afterEach } from "vitest";
import { FaqAccordion } from "@/components/ui/FaqAccordion";

const mockItems = [
  { question: "Faut-il r\u00e9server \u00e0 l'avance?", answer: "Oui, nous recommandons fortement la r\u00e9servation." },
  { question: "Proposez-vous des options v\u00e9g\u00e9tariennes?", answer: "Absolument, notre carte propose toujours au moins deux plats v\u00e9g\u00e9tariens." },
  { question: "Quel est le code vestimentaire?", answer: "Tenue soign\u00e9e d\u00e9contract\u00e9e (smart casual)." },
];

afterEach(cleanup);

describe("FaqAccordion", () => {
  it("renders all questions", () => {
    render(<FaqAccordion items={mockItems} />);
    expect(screen.getByText("Faut-il r\u00e9server \u00e0 l'avance?")).toBeInTheDocument();
    expect(screen.getByText("Proposez-vous des options v\u00e9g\u00e9tariennes?")).toBeInTheDocument();
    expect(screen.getByText("Quel est le code vestimentaire?")).toBeInTheDocument();
  });

  it("renders all answers in DOM", () => {
    render(<FaqAccordion items={mockItems} />);
    expect(screen.getByText(/Oui, nous recommandons/)).toBeInTheDocument();
    expect(screen.getByText(/Absolument/)).toBeInTheDocument();
  });

  it("all items start collapsed (aria-expanded=false)", () => {
    render(<FaqAccordion items={mockItems} />);
    const buttons = screen.getAllByRole("button");
    buttons.forEach((btn) => {
      expect(btn).toHaveAttribute("aria-expanded", "false");
    });
  });

  it("expands an item on click", () => {
    render(<FaqAccordion items={mockItems} />);
    const buttons = screen.getAllByRole("button");

    fireEvent.click(buttons[0]!);
    expect(buttons[0]).toHaveAttribute("aria-expanded", "true");
  });

  it("collapses an expanded item on second click", () => {
    render(<FaqAccordion items={mockItems} />);
    const buttons = screen.getAllByRole("button");

    fireEvent.click(buttons[0]!);
    expect(buttons[0]).toHaveAttribute("aria-expanded", "true");

    fireEvent.click(buttons[0]!);
    expect(buttons[0]).toHaveAttribute("aria-expanded", "false");
  });

  it("only one item can be open at a time", () => {
    render(<FaqAccordion items={mockItems} />);
    const buttons = screen.getAllByRole("button");

    fireEvent.click(buttons[0]!);
    expect(buttons[0]).toHaveAttribute("aria-expanded", "true");
    expect(buttons[1]).toHaveAttribute("aria-expanded", "false");

    fireEvent.click(buttons[1]!);
    expect(buttons[0]).toHaveAttribute("aria-expanded", "false");
    expect(buttons[1]).toHaveAttribute("aria-expanded", "true");
  });
});
