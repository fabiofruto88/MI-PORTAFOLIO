// @vitest-environment jsdom
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import InfoPage from "@/components/common/InfoPage";
import { contactPage } from "@/data/site";

describe("InfoPage", () => {
  it("renderiza un único h1 y enlaces de contacto", () => {
    render(<InfoPage page={contactPage} />);
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(screen.getByRole("link", { name: "fabiofruto3@gmail.com" })).toHaveAttribute(
      "href",
      "mailto:fabiofruto3@gmail.com",
    );
  });
});
