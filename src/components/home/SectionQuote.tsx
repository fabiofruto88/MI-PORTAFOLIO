"use client";

import dynamic from "next/dynamic";
import { useRef, useState } from "react";
import {
  LuArrowRight,
  LuBot,
  LuLayoutDashboard,
  LuListChecks,
  LuMousePointerClick,
  LuPanelTop,
  LuShoppingBag,
  LuSmartphone,
  LuSparkles,
} from "react-icons/lu";
import { FaWhatsapp } from "react-icons/fa6";
import { gsap, useGSAP, EASE_OUT, prefersReducedMotion } from "./gsap";
import { DELIVERY_NOTE, QUOTE_TYPES, formatCop } from "@/data/quote";
import SplitText from "../reactbits/SplitText";
import styles from "./quote.module.css";

// el cotizador (GSAP, chat, formulario) solo se descarga cuando alguien lo abre
const QuoteModal = dynamic(() => import("./QuoteModal"), { ssr: false });

const TYPE_ICONS: Record<string, React.ReactNode> = {
  landing: <LuPanelTop />,
  custom: <LuLayoutDashboard />,
  store: <LuShoppingBag />,
  mobile: <LuSmartphone />,
  other: <LuSparkles />,
};

const FLOW = [
  { icon: <LuMousePointerClick />, title: "Elige qué construir", text: "Landing, app, tienda u otra idea." },
  { icon: <LuListChecks />, title: "Define objetivo y plazo", text: "Tres respuestas rápidas." },
  { icon: <LuBot />, title: "Afina con el asistente", text: "Opcional. Te hace preguntas sobre tu idea." },
  { icon: <FaWhatsapp />, title: "Envíalo a mi WhatsApp", text: "El mensaje ya va escrito." },
] as const;

/**
 * Cotizador. Escena: la invitación vive en el mismo gris del home. El recorrido de cuatro pasos se dibuja solo, al llegar a la vista, hasta WhatsApp,
 * que es el destino, y los precios cuentan hasta su valor al entrar.
 */
export default function SectionQuote() {
  const root = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [initialType, setInitialType] = useState("");

  const openQuote = (type = "") => {
    setInitialType(type);
    setMounted(true);
    setOpen(true);
  };

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      gsap.from("[data-q]", {
        opacity: 0,
        y: 28,
        duration: 0.8,
        ease: EASE_OUT,
        stagger: 0.08,
        scrollTrigger: { trigger: root.current, start: "top 70%", once: true },
      });

      // el hilo se dibuja solo, una vez, al llegar a la vista; cada nodo se enciende cuando el hilo lo alcanza
      const nodes = gsap.utils.toArray<HTMLElement>("[data-node]");
      const labels = gsap.utils.toArray<HTMLElement>("[data-label]");
      const STEP = 0.75;
      gsap.set(nodes, { scale: 0.82, opacity: 0.35 });
      gsap.set(labels, { opacity: 0.35, y: 10 });
      const rail = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: { trigger: "[data-flow]", start: "top 85%", once: true },
      });
      rail.to("[data-rail]", { "--p": 1, duration: STEP * (nodes.length - 1) }, 0.1);
      nodes.forEach((n, i) => {
        const at = i === 0 ? 0 : STEP * i - 0.1;
        rail.to(n, { scale: 1, opacity: 1, duration: 0.5, ease: EASE_OUT }, at);
        rail.to(labels[i], { opacity: 1, y: 0, duration: 0.5, ease: EASE_OUT }, at + 0.05);
      });

      // los precios cuentan hasta su valor una sola vez
      gsap.utils.toArray<HTMLElement>("[data-num]").forEach((el) => {
        const to = Number(el.dataset.to);
        const n = { v: 0 };
        el.textContent = formatCop(0).replace(" COP", "");
        gsap.to(n, {
          v: to,
          duration: 1.4,
          ease: EASE_OUT,
          onUpdate: () => {
            el.textContent = formatCop(Math.round(n.v / 10_000) * 10_000).replace(" COP", "");
          },
          onComplete: () => {
            el.textContent = formatCop(to).replace(" COP", "");
          },
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
        });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="cotizar" className={styles.section}>
      <div className={styles.head}>
        <SplitText text="Arma tu cotización en dos minutos." tag="h2" textAlign="left" threshold={0.15} rootMargin="0px" className={styles.title} splitType="words" effect="blur" mask delay={80} duration={1.1} />
        <p className={styles.lead} data-q>
          Responde unas preguntas, afina la idea con un asistente y recibe un estimado. El resumen llega a mi WhatsApp ya escrito.
        </p>
        <button type="button" className={styles.cta} data-q onClick={() => openQuote()}>
          Armar mi cotización <LuArrowRight aria-hidden="true" />
        </button>
      </div>

      <ol className={styles.flow} data-flow data-rail aria-label="Cómo funciona el cotizador">
        {FLOW.map((s, i) => (
          <li key={s.title} className={styles.step} data-last={i === FLOW.length - 1}>
            <span className={styles.node} data-node aria-hidden="true">
              {s.icon}
            </span>
            <div className={styles.stepText} data-label>
              <h3 className={styles.stepTitle}>{s.title}</h3>
              <p className={styles.stepBody}>{s.text}</p>
            </div>
          </li>
        ))}
      </ol>

      <ul className={styles.prices}>
        {QUOTE_TYPES.map((t) => (
          <li key={t.id} className={styles.priceItem} data-q>
            <button type="button" className={styles.price} onClick={() => openQuote(t.id)}>
              <span className={styles.badge} aria-hidden="true">
                {TYPE_ICONS[t.id]}
              </span>
              <span className={styles.priceName}>{t.label}</span>
              <span className={styles.priceHint}>{t.hint}</span>
              {t.price ? (
                <span className={styles.priceValue}>
                  <span className={styles.note}>{t.priceNote === "mínimo" ? "Mínimo" : "Desde"}</span>
                  <span className={styles.amount}>
                    <span data-num data-to={t.price}>
                      {formatCop(t.price).replace(" COP", "")}
                    </span>{" "}
                    COP
                  </span>
                </span>
              ) : (
                <span className={styles.priceValue}>
                  <span className={styles.amount}>Lo definimos juntos</span>
                </span>
              )}
              <LuArrowRight className={styles.go} aria-hidden="true" />
            </button>
          </li>
        ))}
      </ul>

      <p className={styles.fine} data-q>
        Precios orientativos en pesos colombianos. {DELIVERY_NOTE}
      </p>

      {mounted && <QuoteModal open={open} initialType={initialType} onClose={() => setOpen(false)} />}
    </section>
  );
}
