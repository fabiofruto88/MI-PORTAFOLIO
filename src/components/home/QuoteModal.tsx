"use client";

import { useEffect, useRef, useState } from "react";
import {
  LuArrowLeft,
  LuArrowRight,
  LuCheck,
  LuLayoutDashboard,
  LuPanelTop,
  LuShoppingBag,
  LuSmartphone,
  LuSparkles,
  LuX,
} from "react-icons/lu";
import { FaWhatsapp } from "react-icons/fa6";
import { gsap, useGSAP, EASE_OUT } from "./gsap";
import {
  DELIVERY_NOTE,
  EMPTY_ANSWERS,
  QUOTE_DEADLINES,
  QUOTE_GOALS,
  QUOTE_STATES,
  QUOTE_TYPES,
  buildWhatsAppMessage,
  estimateFor,
  formatCop,
  whatsappLink,
  type QuoteAnswers,
} from "@/data/quote";
import { MAX_MESSAGE_CHARS, MAX_USER_TURNS, type ChatMessage } from "@/lib/quote-chat";
import styles from "./quoteModal.module.css";

const TYPE_ICONS: Record<string, React.ReactNode> = {
  landing: <LuPanelTop />,
  custom: <LuLayoutDashboard />,
  store: <LuShoppingBag />,
  mobile: <LuSmartphone />,
  other: <LuSparkles />,
};

const STEPS = ["Proyecto", "Objetivo", "Punto de partida", "Plazo", "Tu idea", "Resumen"] as const;
const LAST = STEPS.length - 1;
const GREETING = "Cuéntame en una o dos frases qué quieres construir y para quién. Te haré un par de preguntas para afinarlo.";

interface Props {
  open: boolean;
  initialType: string;
  onClose: () => void;
}

/** Cotizador: pasos cortos, chat opcional con IA y mensaje listo para WhatsApp. */
export default function QuoteModal({ open, initialType, onClose }: Props) {
  const dialog = useRef<HTMLDialogElement>(null);
  const body = useRef<HTMLDivElement>(null);
  const price = useRef<HTMLSpanElement>(null);
  const log = useRef<HTMLDivElement>(null);
  const dir = useRef(1);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<QuoteAnswers>(EMPTY_ANSWERS);
  const [chat, setChat] = useState<ChatMessage[]>([]);
  const [draft, setDraft] = useState("");
  const [sending, setSending] = useState(false);
  const [chatError, setChatError] = useState("");

  // abre y cierra el <dialog> nativo: foco atrapado, Esc y capa inerte vienen gratis.
  // No se toca el overflow de <html>: bloquearlo hace saltar el scroll con Lenis. Se guarda
  // la posición y se devuelve si el navegador la mueve al abrir o cerrar.
  const scrollY = useRef(0);
  useEffect(() => {
    const el = dialog.current;
    if (!el) return;
    const restore = () => {
      const y = scrollY.current;
      window.scrollTo({ top: y, behavior: "instant" });
      requestAnimationFrame(() => window.scrollTo({ top: y, behavior: "instant" }));
    };
    if (open && !el.open) {
      scrollY.current = window.scrollY;
      setStep(initialType ? 1 : 0);
      setAnswers({ ...EMPTY_ANSWERS, type: initialType });
      setChat([]);
      setDraft("");
      setChatError("");
      el.showModal();
      restore();
    }
    if (!open && el.open) {
      el.close();
      restore();
    }
  }, [open, initialType]);

  // el fondo detrás del modal no hace scroll: la rueda y el gesto solo mueven el contenido del modal
  useEffect(() => {
    const el = dialog.current;
    if (!el) return;
    const stop = (e: Event) => {
      if (e.target === el) e.preventDefault();
    };
    el.addEventListener("wheel", stop, { passive: false });
    el.addEventListener("touchmove", stop, { passive: false });
    return () => {
      el.removeEventListener("wheel", stop);
      el.removeEventListener("touchmove", stop);
    };
  }, []);

  const go = (next: number) => {
    dir.current = next >= step ? 1 : -1;
    setStep(Math.max(0, Math.min(LAST, next)));
  };

  // Cada paso entra desde el lado hacia el que avanzas: el movimiento confirma la dirección
  useGSAP(
    () => {
      if (!open || !body.current) return;
      gsap.fromTo(
        body.current,
        { opacity: 0, x: 28 * dir.current },
        { opacity: 1, x: 0, duration: 0.38, ease: EASE_OUT },
      );
      gsap.from("[data-opt]", { opacity: 0, y: 10, duration: 0.34, ease: EASE_OUT, stagger: 0.05, delay: 0.06 });
      if (step === LAST && price.current) {
        const t = QUOTE_TYPES.find((i) => i.id === answers.type);
        if (t?.price) {
          const n = { v: 0 };
          gsap.to(n, {
            v: t.price,
            duration: 0.9,
            ease: EASE_OUT,
            onUpdate: () => {
              if (price.current) price.current.textContent = formatCop(Math.round(n.v / 10_000) * 10_000);
            },
            onComplete: () => {
              if (price.current) price.current.textContent = formatCop(t.price!);
            },
          });
        }
      }
    },
    { scope: dialog, dependencies: [step, open] },
  );

  useEffect(() => {
    log.current?.scrollTo({ top: log.current.scrollHeight, behavior: "smooth" });
  }, [chat, sending]);

  const pick = (key: keyof QuoteAnswers, value: string) => {
    setAnswers((a) => ({ ...a, [key]: value }));
    window.setTimeout(() => go(step + 1), 220);
  };

  const userTurns = chat.filter((m) => m.role === "user").length;

  const send = async () => {
    const text = draft.trim();
    if (!text || sending || userTurns >= MAX_USER_TURNS) return;
    const next: ChatMessage[] = [...chat, { role: "user", content: text }];
    setChat(next);
    setDraft("");
    setChatError("");
    setSending(true);
    setAnswers((a) => ({ ...a, idea: [a.idea, text].filter(Boolean).join(" / ").slice(0, 700) }));
    try {
      const res = await fetch("/api/quote-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });
      const data = (await res.json()) as { reply?: string; error?: string };
      if (!res.ok || !data.reply) throw new Error(data.error || "Error");
      setChat([...next, { role: "assistant", content: data.reply }]);
    } catch (e) {
      setChatError(e instanceof Error && e.message !== "Error" ? e.message : "El asistente no respondió. Puedes continuar sin él.");
    } finally {
      setSending(false);
    }
  };

  const typeName = QUOTE_TYPES.find((t) => t.id === answers.type)?.label;
  const hasPrice = !!QUOTE_TYPES.find((t) => t.id === answers.type)?.price;

  const options = (
    list: readonly { id: string; label: string; hint?: string }[],
    key: keyof QuoteAnswers,
    icons?: Record<string, React.ReactNode>,
  ) => (
    <div className={styles.options} role="radiogroup">
      {list.map((o) => (
        <button
          key={o.id}
          type="button"
          role="radio"
          aria-checked={answers[key] === o.id}
          data-opt
          className={styles.option}
          onClick={() => pick(key, o.id)}
        >
          {icons && <span className={styles.optIcon}>{icons[o.id]}</span>}
          <span className={styles.optText}>
            <span className={styles.optLabel}>{o.label}</span>
            {o.hint && <span className={styles.optHint}>{o.hint}</span>}
          </span>
          {answers[key] === o.id && <LuCheck className={styles.optCheck} aria-hidden="true" />}
        </button>
      ))}
    </div>
  );

  return (
    <dialog
      ref={dialog}
      className={styles.dialog}
      aria-labelledby="quote-title"
      data-lenis-prevent
      onClose={() => {
        onClose();
        const y = scrollY.current;
        window.scrollTo({ top: y, behavior: "instant" });
        requestAnimationFrame(() => window.scrollTo({ top: y, behavior: "instant" }));
      }}
      onClick={(e) => {
        if (e.target === dialog.current) dialog.current?.close();
      }}
    >
      <div className={styles.shell}>
        <header className={styles.top}>
          <div className={styles.progress} aria-hidden="true">
            {STEPS.map((s, i) => (
              <span key={s} className={styles.seg} data-on={i <= step} />
            ))}
          </div>
          <p className={styles.stepName}>
            Paso {step + 1} de {STEPS.length}: {STEPS[step]}
          </p>
          <button type="button" className={styles.close} onClick={() => dialog.current?.close()} aria-label="Cerrar cotizador">
            <LuX aria-hidden="true" />
          </button>
        </header>

        <div ref={body} className={styles.body} data-fill={step === 4}>
          {step === 0 && (
            <>
              <h2 id="quote-title" className={styles.title}>¿Qué quieres construir?</h2>
              {options(QUOTE_TYPES, "type", TYPE_ICONS)}
            </>
          )}
          {step === 1 && (
            <>
              <h2 id="quote-title" className={styles.title}>¿Qué quieres lograr con esto?</h2>
              {options(QUOTE_GOALS, "goal")}
            </>
          )}
          {step === 2 && (
            <>
              <h2 id="quote-title" className={styles.title}>¿Con qué cuentas hoy?</h2>
              {options(QUOTE_STATES, "state")}
            </>
          )}
          {step === 3 && (
            <>
              <h2 id="quote-title" className={styles.title}>¿Para cuándo lo necesitas?</h2>
              {options(QUOTE_DEADLINES, "deadline")}
            </>
          )}
          {step === 4 && (
            <>
              <h2 id="quote-title" className={styles.title}>Cuéntame tu idea</h2>
              <div className={styles.chat}>
              <div ref={log} className={styles.log} role="log" aria-live="polite">
                <p className={styles.bubbleBot}>{GREETING}</p>
                {chat.map((m, i) => (
                  <p key={i} className={m.role === "user" ? styles.bubbleMe : styles.bubbleBot}>
                    {m.content}
                  </p>
                ))}
                {sending && (
                  <p className={`${styles.bubbleBot} ${styles.typing}`} role="status" aria-label="El asistente está escribiendo">
                    <span />
                    <span />
                    <span />
                  </p>
                )}
              </div>
              {chatError && <p className={styles.error} role="alert">{chatError}</p>}
              <form
                className={styles.composer}
                onSubmit={(e) => {
                  e.preventDefault();
                  void send();
                }}
              >
                <label htmlFor="quote-draft" className={styles.srOnly}>Tu mensaje</label>
                <textarea
                  id="quote-draft"
                  value={draft}
                  maxLength={MAX_MESSAGE_CHARS}
                  rows={2}
                  disabled={sending || userTurns >= MAX_USER_TURNS}
                  placeholder={userTurns >= MAX_USER_TURNS ? "Listo, ya tengo lo necesario." : "Ej: una app para que mis clientes reserven citas"}
                  onChange={(e) => setDraft(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      void send();
                    }
                  }}
                />
                <button type="submit" className={styles.send} disabled={sending || !draft.trim() || userTurns >= MAX_USER_TURNS}>
                  Enviar
                </button>
              </form>
              <p className={styles.fine}>
                El asistente solo ayuda a definir tu proyecto. {userTurns}/{MAX_USER_TURNS} mensajes.
              </p>
              </div>
            </>
          )}
          {step === LAST && (
            <>
              <h2 id="quote-title" className={styles.title}>Tu resumen</h2>
              <div className={styles.estimate}>
                <p className={styles.estLabel}>{typeName ?? "Tu proyecto"}</p>
                {hasPrice ? (
                  <p className={styles.estPrice}>
                    <span className={styles.estNote}>{QUOTE_TYPES.find((t) => t.id === answers.type)?.priceNote === "mínimo" ? "Mínimo" : "Desde"}</span>{" "}
                    <span ref={price}>{estimateFor(answers.type).replace(/^(Desde|Mínimo) /, "")}</span>
                  </p>
                ) : (
                  <p className={styles.estPrice}>{estimateFor(answers.type) || "A definir"}</p>
                )}
                <p className={styles.estFine}>Precio orientativo. {DELIVERY_NOTE}</p>
              </div>
              <label htmlFor="quote-name" className={styles.fieldLabel}>Tu nombre (opcional)</label>
              <input
                id="quote-name"
                className={styles.input}
                value={answers.name}
                maxLength={60}
                autoComplete="given-name"
                onChange={(e) => setAnswers((a) => ({ ...a, name: e.target.value }))}
              />
              <pre className={styles.preview}>{buildWhatsAppMessage(answers)}</pre>
            </>
          )}
        </div>

        <footer className={styles.foot}>
          {step > 0 ? (
            <button type="button" className={styles.back} onClick={() => go(step - 1)}>
              <LuArrowLeft aria-hidden="true" /> Atrás
            </button>
          ) : (
            <span />
          )}
          {step === 4 && (
            <button type="button" className={styles.next} onClick={() => go(LAST)}>
              {userTurns > 0 ? "Ver mi resumen" : "Saltar este paso"} <LuArrowRight aria-hidden="true" />
            </button>
          )}
          {step === LAST && (
            <a className={styles.wa} href={whatsappLink(answers)} target="_blank" rel="noopener noreferrer">
              <FaWhatsapp aria-hidden="true" /> Enviar por WhatsApp
            </a>
          )}
        </footer>
      </div>
    </dialog>
  );
}
