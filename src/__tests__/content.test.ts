import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { infoPages, markdownForPath } from "@/data/site";
import { serializeJsonLd, siteJsonLd } from "@/lib/jsonld";
import sitemap from "@/app/sitemap";

describe("páginas de confianza", () => {
  it.each(infoPages.map((p) => [p.path, p] as const))("%s tiene al menos 500 caracteres", (_p, page) => {
    const text = [page.intro, ...page.sections.flatMap((s) => [s.heading, ...s.paragraphs])].join(" ");
    expect(text.length).toBeGreaterThanOrEqual(500);
    expect(markdownForPath(page.path)).toContain(`# ${page.title}`);
  });
  it("rutas desconocidas no tienen Markdown", () => {
    expect(markdownForPath("/nope")).toBeNull();
  });
  it("sitemap incluye about, contact y privacy", () => {
    const urls = sitemap().map((e) => e.url);
    for (const p of ["/about", "/contact", "/privacy"]) expect(urls).toContain(`https://fabiofruto.com${p}`);
  });
});

describe("JSON-LD", () => {
  const graph = siteJsonLd["@graph"];
  it("incluye Person, Organization y WebSite", () => {
    expect(graph.slice(0, 3).map((n) => n["@type"])).toEqual(["Person", ["Organization", "ProfessionalService"], "WebSite"]);
  });
  it("Organization tiene contactPoint y address", () => {
    const org = graph[1] as unknown as { contactPoint: { contactType: string; email: string }; address: { "@type": string; addressLocality: string } };
    expect(org.contactPoint.contactType).toBeTruthy();
    expect(org.contactPoint.email).toContain("@");
    expect(org.address["@type"]).toBe("PostalAddress");
    expect(org.address.addressLocality).toBe("Barranquilla");
  });
  it("incluye un CreativeWork por proyecto y el artículo ACOFI con DOI", () => {
    const types = graph.map((n) => n["@type"]);
    expect(types.filter((t) => t === "CreativeWork")).toHaveLength(6);
    expect(JSON.stringify(graph)).toContain("10.26507/paper.3977");
  });
  it("escapa < al serializar", () => {
    expect(serializeJsonLd({ a: "</script>" })).not.toContain("<");
  });
});

describe("llms.txt", () => {
  const txt = readFileSync(path.join(process.cwd(), "public/llms.txt"), "utf8");
  it("sigue el formato: H1, cita y secciones", () => {
    expect(txt).toMatch(/^# .+/);
    expect(txt).toMatch(/^> .+/m);
  });
  it("incluye guía when-to-use", () => {
    expect(txt).toMatch(/when to use/i);
  });
  it("enlaza páginas de confianza", () => {
    for (const p of ["/about", "/contact", "/privacy"]) expect(txt).toContain(`https://fabiofruto.com${p}`);
  });
});
