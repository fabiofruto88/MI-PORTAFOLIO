/**
 * Devuelve true cuando el header Accept prefiere text/markdown sobre text/html
 * (RFC 9110, sección 12.5.1: valores q y empates a favor de Markdown).
 */
export function prefersMarkdown(accept: string | null | undefined): boolean {
  if (!accept) return false;

  let markdownQ = 0;
  let htmlQ = 0;

  for (const part of accept.split(",")) {
    const [rawType, ...params] = part.trim().split(";");
    const type = rawType.trim().toLowerCase();
    let q = 1;
    for (const param of params) {
      const [key, value] = param.trim().split("=");
      if (key?.trim().toLowerCase() === "q") {
        const parsed = Number.parseFloat(value ?? "");
        q = Number.isFinite(parsed) ? parsed : 0;
      }
    }
    if (type === "text/markdown") markdownQ = Math.max(markdownQ, q);
    if (type === "text/html") htmlQ = Math.max(htmlQ, q);
  }

  return markdownQ > 0 && markdownQ >= htmlQ;
}
