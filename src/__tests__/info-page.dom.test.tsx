// @vitest-environment jsdom
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

// jsdom no trae matchMedia; GSAP (ScrollTrigger) lo usa al registrarse.
vi.hoisted(() => {
  window.matchMedia ??= ((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  })) as typeof window.matchMedia;
});
import InfoPage from "@/components/common/InfoPage";
import { contactPage } from "@/data/site";

describe("InfoPage", () => {
  it("renderiza un único h1 y los canales de contacto como enlaces", () => {
    render(<InfoPage page={contactPage} />);
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(screen.getByRole("link", { name: /correo a fabiofruto3@gmail\.com/ })).toHaveAttribute(
      "href",
      "mailto:fabiofruto3@gmail.com",
    );
    expect(screen.getByRole("link", { name: /WhatsApp/ })).toHaveAttribute(
      "href",
      expect.stringContaining("https://wa.me/573002549872"),
    );
    for (const name of [/LinkedIn/, /GitHub/, /Instagram/]) {
      expect(screen.getByRole("link", { name })).toBeInTheDocument();
    }
  });
});
