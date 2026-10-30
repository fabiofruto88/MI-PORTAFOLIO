import { describe, expect, it } from "vitest";
import { prefersMarkdown } from "@/lib/negotiation";

describe("prefersMarkdown", () => {
  it("acepta text/markdown explícito", () => {
    expect(prefersMarkdown("text/markdown")).toBe(true);
  });
  it("prefiere HTML cuando el navegador lo pide", () => {
    expect(prefersMarkdown("text/html,application/xhtml+xml,*/*;q=0.8")).toBe(false);
    expect(prefersMarkdown("text/html")).toBe(false);
  });
  it("respeta valores q", () => {
    expect(prefersMarkdown("text/markdown, text/html;q=0.9")).toBe(true);
    expect(prefersMarkdown("text/html, text/markdown;q=0.5")).toBe(false);
    expect(prefersMarkdown("text/markdown;q=0")).toBe(false);
  });
  it("empate favorece Markdown", () => {
    expect(prefersMarkdown("text/markdown, text/html")).toBe(true);
  });
  it("ignora header ausente o comodín", () => {
    expect(prefersMarkdown(null)).toBe(false);
    expect(prefersMarkdown("*/*")).toBe(false);
  });
});
