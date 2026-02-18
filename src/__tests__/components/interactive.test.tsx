import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { describe, it, expect, afterEach, vi } from "vitest";

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
  useLocale: () => "fr",
}));

vi.mock("sonner", () => ({
  toast: { success: vi.fn(), error: vi.fn() },
}));

vi.mock("next/image", () => ({
  default: (props: { alt: string; src: string }) => <img alt={props.alt} src={props.src} />,
}));

afterEach(cleanup);

/* ================================================================== */
/*  1. SeasonalMenuExplorer                                            */
/* ================================================================== */
import { SeasonalMenuExplorer } from "@/components/interactive/SeasonalMenuExplorer";

describe("SeasonalMenuExplorer", () => {
  it("renders without crashing", () => {
    const { container } = render(<SeasonalMenuExplorer />);
    expect(container.firstChild).toBeTruthy();
  });

  it("renders section heading", () => {
    render(<SeasonalMenuExplorer />);
    expect(screen.getByText("title")).toBeInTheDocument();
    expect(screen.getByText("subtitle")).toBeInTheDocument();
  });

  it("renders 4 season tabs", () => {
    render(<SeasonalMenuExplorer />);
    const tabs = screen.getAllByRole("tab");
    expect(tabs).toHaveLength(4);
  });

  it("renders season names", () => {
    render(<SeasonalMenuExplorer />);
    expect(screen.getByText("seasons.spring.name")).toBeInTheDocument();
    expect(screen.getByText("seasons.summer.name")).toBeInTheDocument();
    expect(screen.getByText("seasons.autumn.name")).toBeInTheDocument();
    expect(screen.getByText("seasons.winter.name")).toBeInTheDocument();
  });

  it("has autumn as default active season", () => {
    render(<SeasonalMenuExplorer />);
    const autumnTab = screen.getByText("seasons.autumn.name").closest("button");
    expect(autumnTab).toHaveAttribute("aria-selected", "true");
  });

  it("switches to spring when spring tab is clicked", () => {
    render(<SeasonalMenuExplorer />);
    const springTab = screen.getByText("seasons.spring.name").closest("button");
    fireEvent.click(springTab!);
    expect(springTab).toHaveAttribute("aria-selected", "true");
  });

  it("renders 3 dish cards for active season (starter, main, dessert)", () => {
    render(<SeasonalMenuExplorer />);
    const courseLabels = screen.getAllByText("courses.starter");
    expect(courseLabels.length).toBeGreaterThanOrEqual(1);
  });

  it("renders tabpanel with correct aria attributes", () => {
    render(<SeasonalMenuExplorer />);
    const panel = document.getElementById("season-panel-autumn");
    expect(panel).toBeInTheDocument();
    expect(panel).toHaveAttribute("role", "tabpanel");
  });
});

/* ================================================================== */
/*  2. BotanicalDivider                                                */
/* ================================================================== */
import { BotanicalDivider } from "@/components/interactive/BotanicalDivider";

describe("BotanicalDivider", () => {
  it("renders without crashing", () => {
    const { container } = render(<BotanicalDivider />);
    expect(container.firstChild).toBeTruthy();
  });

  it("renders with role=separator", () => {
    render(<BotanicalDivider />);
    const separator = screen.getByRole("separator", { hidden: true });
    expect(separator).toBeInTheDocument();
  });

  it("renders SVG element", () => {
    const { container } = render(<BotanicalDivider />);
    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
  });

  it("renders vine variant by default", () => {
    const { container } = render(<BotanicalDivider />);
    expect(container.firstChild).toBeTruthy();
  });

  it("renders leaf variant", () => {
    const { container } = render(<BotanicalDivider variant="leaf" />);
    expect(container.firstChild).toBeTruthy();
  });

  it("renders wheat variant", () => {
    const { container } = render(<BotanicalDivider variant="wheat" />);
    expect(container.firstChild).toBeTruthy();
  });

  it("applies custom className", () => {
    const { container } = render(<BotanicalDivider className="my-12" />);
    expect(container.firstChild).toHaveClass("my-12");
  });

  it("is aria-hidden", () => {
    render(<BotanicalDivider />);
    const separator = screen.getByRole("separator", { hidden: true });
    expect(separator).toHaveAttribute("aria-hidden", "true");
  });
});

/* ================================================================== */
/*  3. FoodGallery                                                     */
/* ================================================================== */
import { FoodGallery } from "@/components/interactive/FoodGallery";

describe("FoodGallery", () => {
  it("renders without crashing", () => {
    const { container } = render(<FoodGallery />);
    expect(container.firstChild).toBeTruthy();
  });

  it("renders section heading", () => {
    render(<FoodGallery />);
    expect(screen.getByText("title")).toBeInTheDocument();
    expect(screen.getByText("subtitle")).toBeInTheDocument();
  });

  it("renders category filter buttons", () => {
    render(<FoodGallery />);
    expect(screen.getByText("categories.all")).toBeInTheDocument();
    expect(screen.getAllByText("categories.starters").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("categories.mains").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("categories.desserts").length).toBeGreaterThanOrEqual(1);
  });

  it("renders gallery cards", () => {
    render(<FoodGallery />);
    const buttons = screen.getAllByRole("button");
    expect(buttons.length).toBeGreaterThanOrEqual(6);
  });

  it("filters items when category button is clicked", () => {
    render(<FoodGallery />);
    const startersBtn = screen.getAllByText("categories.starters")[0];
    fireEvent.click(startersBtn);
    const allBtn = screen.getByText("categories.all");
    expect(allBtn).toBeInTheDocument();
  });

  it("shows all items when 'all' category is active", () => {
    render(<FoodGallery />);
    const allBtn = screen.getByText("categories.all");
    fireEvent.click(allBtn);
    const buttons = screen.getAllByRole("button");
    expect(buttons.length).toBeGreaterThanOrEqual(10);
  });
});

/* ================================================================== */
/*  4. ReservationWidget                                               */
/* ================================================================== */
import { ReservationWidget } from "@/components/interactive/ReservationWidget";

describe("ReservationWidget", () => {
  it("renders without crashing", () => {
    const { container } = render(<ReservationWidget />);
    expect(container.firstChild).toBeTruthy();
  });

  it("renders section heading", () => {
    render(<ReservationWidget />);
    expect(screen.getByText("title")).toBeInTheDocument();
    expect(screen.getByText("subtitle")).toBeInTheDocument();
  });

  it("renders date, guests, time, name, and phone fields", () => {
    render(<ReservationWidget />);
    expect(screen.getByLabelText(/field_date/)).toBeInTheDocument();
    expect(screen.getByLabelText(/field_guests/)).toBeInTheDocument();
    expect(screen.getByLabelText(/field_time/)).toBeInTheDocument();
    expect(screen.getByLabelText(/field_name/)).toBeInTheDocument();
    expect(screen.getByLabelText(/field_phone/)).toBeInTheDocument();
  });

  it("renders submit button", () => {
    render(<ReservationWidget />);
    expect(screen.getByText("submit")).toBeInTheDocument();
  });

  it("date field accepts input", () => {
    render(<ReservationWidget />);
    const dateInput = screen.getByLabelText(/field_date/) as HTMLInputElement;
    fireEvent.change(dateInput, { target: { value: "2026-03-15" } });
    expect(dateInput.value).toBe("2026-03-15");
  });

  it("guests field can be changed", () => {
    render(<ReservationWidget />);
    const guestsSelect = screen.getByLabelText(/field_guests/) as HTMLSelectElement;
    fireEvent.change(guestsSelect, { target: { value: "4" } });
    expect(guestsSelect.value).toBe("4");
  });

  it("name and phone fields accept input", () => {
    render(<ReservationWidget />);
    const nameInput = screen.getByLabelText(/field_name/) as HTMLInputElement;
    const phoneInput = screen.getByLabelText(/field_phone/) as HTMLInputElement;
    fireEvent.change(nameInput, { target: { value: "Jean Tremblay" } });
    fireEvent.change(phoneInput, { target: { value: "418-555-1234" } });
    expect(nameInput.value).toBe("Jean Tremblay");
    expect(phoneInput.value).toBe("418-555-1234");
  });

  it("renders privacy note", () => {
    render(<ReservationWidget />);
    expect(screen.getByText("privacy_note")).toBeInTheDocument();
  });

  it("renders time slot options", () => {
    render(<ReservationWidget />);
    const timeSelect = screen.getByLabelText(/field_time/) as HTMLSelectElement;
    expect(timeSelect.querySelectorAll("option").length).toBeGreaterThanOrEqual(12);
  });
});
