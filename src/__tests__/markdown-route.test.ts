import { describe, expect, it } from "vitest";
import { GET } from "@/app/md/[[...path]]/route";

const call = (path: string[] = []) =>
  GET(new Request("https://fabiofruto.com/md"), { params: Promise.resolve({ path }) });

describe("/md route", () => {
  it("devuelve Markdown de la home", async () => {
    const res = await call();
    expect(res.status).toBe(200);
    expect(res.headers.get("content-type")).toMatch(/^text\/markdown/);
    expect(res.headers.get("vary")).toBe("Accept");
    const body = await res.text();
    expect(body).toMatch(/^# Fabio Fruto Jimenez/);
    expect(body.length).toBeGreaterThan(500);
  });
  it.each(["about", "contact", "privacy"])("devuelve Markdown de /%s con más de 500 caracteres", async (p) => {
    const res = await call([p]);
    expect(res.status).toBe(200);
    expect((await res.text()).length).toBeGreaterThan(500);
  });
  it("404 en Markdown con enlaces a llms.txt y sitemap", async () => {
    const res = await call(["__ora-404-probe-abc"]);
    expect(res.status).toBe(404);
    expect(res.headers.get("content-type")).toMatch(/^text\/markdown/);
    expect(res.headers.get("vary")).toBe("Accept");
    const body = await res.text();
    expect(body.length).toBeGreaterThan(20);
    expect(body).toContain("https://fabiofruto.com/llms.txt");
    expect(body).toContain("https://fabiofruto.com/sitemap.xml");
  });
  it("no refleja backticks ni saltos de línea de la ruta", async () => {
    const body = await (await call(["a`b%0Ac"])).text();
    expect(body).not.toMatch(/a`b/);
  });
});
