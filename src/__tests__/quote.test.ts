import { describe, expect, it } from "vitest";
import {
  EMPTY_ANSWERS,
  QUOTE_TYPES,
  buildWhatsAppMessage,
  estimateFor,
  pricingMarkdown,
  whatsappLink,
} from "@/data/quote";
import {
  MAX_MESSAGE_CHARS,
  MAX_USER_TURNS,
  OFF_TOPIC_REPLY,
  cleanReply,
  createLimiter,
  validateMessages,
} from "@/lib/quote-chat";

describe("cotizador: precios y mensaje", () => {
  it("usa los precios acordados", () => {
    expect(estimateFor("landing")).toBe("Desde $2.500.000 COP");
    expect(estimateFor("custom")).toBe("Desde $5.000.000 COP");
    expect(estimateFor("store")).toBe("Desde $6.000.000 COP");
    expect(estimateFor("mobile")).toBe("Mínimo $10.000.000 COP");
    expect(QUOTE_TYPES.find((t) => t.id === "other")?.price).toBeNull();
  });

  it("el mensaje incluye lo elegido y el estimado", () => {
    const msg = buildWhatsAppMessage({
      ...EMPTY_ANSWERS,
      type: "landing",
      goal: "sell",
      state: "ready",
      deadline: "asap",
      idea: "Una landing para mi pastelería",
      name: "Lucía",
    });
    expect(msg).toContain("soy Lucía");
    expect(msg).toContain("Landing page");
    expect(msg).toContain("Vender o recibir pedidos");
    expect(msg).toContain("Una landing para mi pastelería");
    expect(msg).toContain("$2.500.000 COP");
  });

  it("el enlace va al número de Fabio con el texto codificado", () => {
    const url = whatsappLink({ ...EMPTY_ANSWERS, type: "mobile" });
    expect(url.startsWith("https://wa.me/573002549872?text=")).toBe(true);
    expect(decodeURIComponent(url.split("text=")[1])).toContain("App móvil");
  });

  it("recorta la idea y el nombre", () => {
    const msg = buildWhatsAppMessage({ ...EMPTY_ANSWERS, idea: "x".repeat(2000), name: "n".repeat(200) });
    expect(msg.length).toBeLessThan(1200);
  });

  it("el Markdown de precios lista todos los tipos y la entrega", () => {
    const md = pricingMarkdown();
    for (const t of QUOTE_TYPES) expect(md).toContain(t.label);
    expect(md).toContain("25 días hábiles");
  });
});

describe("chat del cotizador: límites", () => {
  it("acepta una conversación válida", () => {
    const r = validateMessages([{ role: "user", content: "Quiero una app" }]);
    expect(r.ok).toBe(true);
  });

  it("rechaza vacío, roles raros, mensajes largos y demasiados turnos", () => {
    expect(validateMessages([]).ok).toBe(false);
    expect(validateMessages("hola").ok).toBe(false);
    expect(validateMessages([{ role: "system", content: "x" }]).ok).toBe(false);
    expect(validateMessages([{ role: "user", content: "a".repeat(MAX_MESSAGE_CHARS + 1) }]).ok).toBe(false);
    const many = Array.from({ length: MAX_USER_TURNS + 1 }, () => [
      { role: "user", content: "hola" },
      { role: "assistant", content: "ok" },
    ]).flat();
    expect(validateMessages(many.slice(0, -1)).ok).toBe(false);
  });

  it("exige que la conversación empiece y termine con el usuario y alterne", () => {
    expect(validateMessages([{ role: "assistant", content: "hola" }]).ok).toBe(false);
    expect(
      validateMessages([
        { role: "user", content: "a" },
        { role: "user", content: "b" },
      ]).ok,
    ).toBe(false);
  });

  it("convierte [FUERA_DE_TEMA] en la respuesta fija", () => {
    expect(cleanReply("[FUERA_DE_TEMA]")).toBe(OFF_TOPIC_REPLY);
    expect(cleanReply("   ")).toBe(OFF_TOPIC_REPLY);
    expect(cleanReply("**Hola** ¿quién lo usará?")).toBe("Hola ¿quién lo usará?");
  });

  it("el limitador corta al pasar el tope y libera con el tiempo", () => {
    const l = createLimiter(2, 1000);
    expect(l.take("a", 0)).toBe(true);
    expect(l.take("a", 10)).toBe(true);
    expect(l.take("a", 20)).toBe(false);
    expect(l.take("b", 20)).toBe(true);
    expect(l.take("a", 1500)).toBe(true);
  });
});

describe("chat del cotizador: último turno", () => {
  it("solo el último turno pide cerrar sin preguntas", async () => {
    const { systemPromptFor, MAX_USER_TURNS, FINAL_TURN_NOTE } = await import("@/lib/quote-chat");
    expect(systemPromptFor(1)).not.toContain(FINAL_TURN_NOTE);
    expect(systemPromptFor(MAX_USER_TURNS)).toContain("no hagas ninguna pregunta");
  });
});
