import { NextRequest, NextResponse } from "next/server";
import { prefersMarkdown } from "@/lib/negotiation";

/**
 * Negociación de contenido (acceptmarkdown.com): las solicitudes con
 * `Accept: text/markdown` se reescriben a /md/<ruta>, que responde Markdown
 * (incluidos los 404). El resto sigue sirviendo HTML. Ambas respuestas llevan
 * `Vary: Accept` para que las cachés no mezclen representaciones.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isDocumentRequest = request.method === "GET" || request.method === "HEAD";

  if (isDocumentRequest && prefersMarkdown(request.headers.get("accept"))) {
    const url = request.nextUrl.clone();
    url.pathname = `/md${pathname === "/" ? "" : pathname}`;
    const response = NextResponse.rewrite(url);
    response.headers.append("Vary", "Accept");
    return response;
  }

  const response = NextResponse.next();
  response.headers.append("Vary", "Accept");
  return response;
}

export const config = {
  // Excluye assets internos y archivos con extensión (llms.txt, imágenes, etc.)
  // y la propia ruta /md para evitar bucles de reescritura.
  matcher: ["/((?!_next/|md(?:/|$)|api/|.*\\..*).*)"],
};
