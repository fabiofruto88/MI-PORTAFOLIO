import { CONTACT } from "@/data/contact";

/** Precios orientativos en pesos colombianos (COP). Son estimaciones, no una oferta cerrada. */
export interface QuoteType {
  id: string;
  label: string;
  hint: string;
  /** null = se define en la conversación */
  price: number | null;
  /** "desde" | "mínimo" */
  priceNote: "desde" | "mínimo" | null;
}

export const QUOTE_TYPES: readonly QuoteType[] = [
  { id: "landing", label: "Landing page", hint: "Una página para cotizar, reservar o pedir", price: 2_500_000, priceNote: "desde" },
  { id: "custom", label: "Aplicación a la medida", hint: "Un sistema web con usuarios, datos y reglas propias", price: 5_000_000, priceNote: "desde" },
  { id: "store", label: "Tienda en línea", hint: "Catálogo, pagos e inventario", price: 6_000_000, priceNote: "desde" },
  { id: "mobile", label: "App móvil", hint: "Android e iOS, publicada en las tiendas", price: 10_000_000, priceNote: "mínimo" },
  { id: "other", label: "Otra cosa o no estoy seguro", hint: "Sitio de varias páginas, automatización con IA u otra idea", price: null, priceNote: null },
];

export const QUOTE_GOALS = [
  { id: "sell", label: "Vender o recibir pedidos" },
  { id: "validate", label: "Probar una idea con usuarios reales" },
  { id: "automate", label: "Ahorrar tiempo en tareas repetitivas" },
  { id: "present", label: "Presentar mi negocio en internet" },
] as const;

export const QUOTE_STATES = [
  { id: "ready", label: "Tengo contenido, textos y fotos" },
  { id: "idea", label: "Solo tengo la idea" },
  { id: "existing", label: "Ya existe algo y quiero mejorarlo" },
] as const;

export const QUOTE_DEADLINES = [
  { id: "asap", label: "Lo antes posible" },
  { id: "month", label: "En uno o dos meses" },
  { id: "flexible", label: "Sin prisa" },
] as const;

export const DELIVERY_DAYS = 25;

export const DELIVERY_NOTE = `Entrega estimada de ${DELIVERY_DAYS} días hábiles, si me das toda la información a tiempo y no hay retrasos de tu parte.`;

export interface QuoteAnswers {
  type: string;
  goal: string;
  state: string;
  deadline: string;
  idea: string;
  name: string;
}

export const EMPTY_ANSWERS: QuoteAnswers = { type: "", goal: "", state: "", deadline: "", idea: "", name: "" };

const label = <T extends { id: string; label: string }>(list: readonly T[], id: string) =>
  list.find((i) => i.id === id)?.label ?? "";

export function formatCop(value: number): string {
  return `$${value.toLocaleString("es-CO")} COP`;
}

export function estimateFor(typeId: string): string {
  const t = QUOTE_TYPES.find((i) => i.id === typeId);
  if (!t) return "";
  if (t.price === null || !t.priceNote) return "Se define al conversar el alcance";
  return `${t.priceNote === "mínimo" ? "Mínimo" : "Desde"} ${formatCop(t.price)}`;
}

/** Mensaje de WhatsApp con el resumen de la cotización. Es texto plano y de longitud acotada. */
export function buildWhatsAppMessage(a: QuoteAnswers): string {
  const lines = [
    `Hola Fabio${a.name.trim() ? `, soy ${a.name.trim().slice(0, 60)}` : ""}. Armé mi cotización en tu portafolio.`,
    "",
    `Proyecto: ${label(QUOTE_TYPES, a.type) || "Por definir"}`,
    `Objetivo: ${label(QUOTE_GOALS, a.goal) || "Por definir"}`,
    `Punto de partida: ${label(QUOTE_STATES, a.state) || "Por definir"}`,
    `Cuándo lo necesito: ${label(QUOTE_DEADLINES, a.deadline) || "Por definir"}`,
  ];
  const idea = a.idea.trim().replace(/\s+/g, " ").slice(0, 700);
  if (idea) lines.push(`Mi idea: ${idea}`);
  const est = estimateFor(a.type);
  if (est) lines.push("", `Estimado que vi: ${est}.`);
  lines.push("", "¿Podemos hablar para afinar el alcance?");
  return lines.join("\n");
}

/** Lista Markdown de precios para agentes y buscadores. */
export function pricingMarkdown(): string {
  const rows = QUOTE_TYPES.map((t) => `- **${t.label}**: ${estimateFor(t.id)}. ${t.hint}.`);
  return `${rows.join("\n")}\n\nSon estimaciones en pesos colombianos, no una oferta cerrada. ${DELIVERY_NOTE}`;
}

export function whatsappLink(a: QuoteAnswers): string {
  return `${CONTACT.whatsappUrl}?text=${encodeURIComponent(buildWhatsAppMessage(a))}`;
}
