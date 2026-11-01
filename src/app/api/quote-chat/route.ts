import { NextRequest, NextResponse } from "next/server";
import {
  MAX_OUTPUT_TOKENS,
  systemPromptFor,
  cleanReply,
  createLimiter,
  validateMessages,
} from "@/lib/quote-chat";

export const runtime = "nodejs";

// Frenos para cuidar la cuota gratuita: por persona (IP) y global por día.
const perMinute = createLimiter(5, 60_000);
const perIpDay = createLimiter(30, 24 * 60 * 60_000);
const globalDay = createLimiter(400, 24 * 60 * 60_000);

const json = (body: Record<string, unknown>, status = 200) =>
  NextResponse.json(body, { status, headers: { "Cache-Control": "no-store" } });

export async function POST(request: NextRequest) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return json({ error: "El asistente no está disponible ahora." }, 503);

  const origin = request.headers.get("origin");
  if (origin && new URL(origin).host !== request.nextUrl.host) return json({ error: "Origen no permitido." }, 403);

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "anon";
  if (!perMinute.take(ip) || !perIpDay.take(ip) || !globalDay.take("all")) {
    return json({ error: "Hay muchas consultas ahora. Envía tu resumen a Fabio por WhatsApp." }, 429);
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return json({ error: "Solicitud inválida." }, 400);
  }
  const checked = validateMessages((body as { messages?: unknown })?.messages);
  if (!checked.ok) return json({ error: checked.error }, 400);

  const model = process.env.GEMINI_MODEL || "gemini-3.5-flash-lite";
  try {
    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-goog-api-key": apiKey },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: systemPromptFor(checked.messages.filter((m) => m.role === "user").length) }] },
        contents: checked.messages.map((m) => ({
          role: m.role === "assistant" ? "model" : "user",
          parts: [{ text: m.content }],
        })),
        generationConfig: { maxOutputTokens: MAX_OUTPUT_TOKENS, temperature: 0.4 },
      }),
      signal: AbortSignal.timeout(15_000),
    });
    if (!res.ok) return json({ error: "El asistente no respondió. Puedes continuar sin él." }, 502);
    const data = (await res.json()) as { candidates?: { content?: { parts?: { text?: string }[] } }[] };
    const text = (data.candidates?.[0]?.content?.parts ?? []).map((p) => p.text ?? "").join("");
    return json({ reply: cleanReply(text) });
  } catch {
    return json({ error: "El asistente no respondió. Puedes continuar sin él." }, 502);
  }
}
