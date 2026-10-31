import { existsSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import {
  homeMarkdown,
  projectSummaries,
  recognitions,
  services,
  skillGroups,
} from "@/data/site";

describe("contenido del home (fuente única para HTML y Markdown)", () => {
  const md = homeMarkdown();
  it("el Markdown incluye servicios, proyectos, publicaciones y tecnologías", () => {
    for (const s of services) expect(md).toContain(s.title);
    for (const p of projectSummaries) expect(md).toContain(p.title);
    for (const r of recognitions) expect(md).toContain(r.title);
    for (const g of skillGroups) expect(md).toContain(g.group);
  });
  it("cada proyecto tiene imagen existente, etiquetas y enlaces", () => {
    for (const p of projectSummaries) {
      expect(existsSync(path.join(process.cwd(), "public", p.image))).toBe(true);
      expect(p.tags.length).toBeGreaterThan(0);
      expect(p.demoUrl).toMatch(/^https:\/\//);
      expect(p.githubUrl).toMatch(/^https:\/\/github\.com\//);
    }
  });
  it("el recorte del retrato para DitherVeil existe", () => {
    expect(existsSync(path.join(process.cwd(), "public/images/profile-cutout.png"))).toBe(true);
  });
});

