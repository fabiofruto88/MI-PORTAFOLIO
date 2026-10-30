import { NextRequest } from "next/server";
import { describe, expect, it } from "vitest";
import { proxy } from "@/proxy";

const req = (path: string, accept?: string) =>
  new NextRequest(`https://fabiofruto.com${path}`, {
    headers: accept ? { accept } : {},
  });

describe("proxy", () => {
  it("reescribe / a /md con Accept: text/markdown y añade Vary: Accept", () => {
    const res = proxy(req("/", "text/markdown"));
    expect(res.headers.get("x-middleware-rewrite")).toBe("https://fabiofruto.com/md");
    expect(res.headers.get("vary")).toContain("Accept");
  });
  it("reescribe rutas anidadas", () => {
    const res = proxy(req("/about", "text/markdown"));
    expect(res.headers.get("x-middleware-rewrite")).toBe("https://fabiofruto.com/md/about");
  });
  it("sirve HTML sin reescribir y con Vary: Accept", () => {
    const res = proxy(req("/", "text/html"));
    expect(res.headers.get("x-middleware-rewrite")).toBeNull();
    expect(res.headers.get("vary")).toContain("Accept");
  });
});
