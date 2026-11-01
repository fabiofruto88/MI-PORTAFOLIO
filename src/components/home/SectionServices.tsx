"use client";

import Link from "next/link";
import { createElement, useRef } from "react";
import { services } from "@/data/site";
import { gsap, SplitText, useGSAP, EASE_OUT, prefersReducedMotion } from "./gsap";
import {
  LuBell, LuBot, LuCalendarCheck, LuCheckCheck, LuMessagesSquare, LuCreditCard, LuDownload, LuGlobe, LuLayoutGrid, LuMegaphone,
  LuMessageCircle, LuMousePointerClick, LuPackageCheck, LuSearch, LuShieldCheck, LuShoppingBag,
  LuSmartphone, LuTarget,
} from "react-icons/lu";
import type { IconType } from "react-icons";
import { scenes } from "./ServiceScenes";
import styles from "./services.module.css";

/** Icono del servicio y uno por paso (misma secuencia que la escena). */
const icons: { main: IconType; steps: IconType[] }[] = [
  { main: LuGlobe, steps: [LuSearch, LuMousePointerClick, LuMessageCircle] },
  { main: LuTarget, steps: [LuMegaphone, LuShieldCheck, LuCalendarCheck] },
  { main: LuSmartphone, steps: [LuDownload, LuMousePointerClick, LuBell] },
  { main: LuShoppingBag, steps: [LuLayoutGrid, LuCreditCard, LuPackageCheck] },
  { main: LuBot, steps: [LuMessagesSquare, LuBot, LuCheckCheck] },
];

/** Mismo corte que services.module.css: en móvil y en horizontal baja el panel es más alto que la pantalla y no se apila. */
const STACK_QUERY = "(min-width: 821px) and (min-height: 700px)";

/**
 * Servicios. Escena: la sección llega como una tarjeta que sube y se abre
 * (scale + clip-path, receta de racing.porsche.com) y los cuatro servicios
 * se apilan con el patrón sticky-stack: cada panel nuevo cubre al anterior,
 * que se encoge. El título se ensancha con el eje de ancho al llegar.
 */
export default function SectionServices() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const panels = gsap.utils.toArray<HTMLElement>("[data-panel]");
      const mm = gsap.matchMedia();

      gsap.fromTo(
        root.current,
        { clipPath: "inset(0% 24% 0% 24% round 32px)", scale: 0.95 },
        {
          clipPath: "inset(0% 0% 0% 0% round 0px)",
          scale: 1,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top bottom", end: "top top", scrub: true },
        },
      );

      const splits: SplitText[] = [];
      panels.forEach((panel, i) => {
        const title = panel.querySelector("[data-title]") as HTMLElement;
        const split = SplitText.create(title, { type: "words", mask: "words" });
        splits.push(split);
                gsap.set(split.words, { yPercent: 110, "--w": 62 });
        gsap.to(split.words, {
          yPercent: 0,
          "--w": 118,
          ease: EASE_OUT,
          stagger: 0.12,
          scrollTrigger: { trigger: panel, start: "top 70%", end: "top 15%", scrub: 1 },
        });

        // el panel anterior se encoge cuando llega el siguiente (solo con el sticky-stack activo)
        if (i < panels.length - 1) {
          mm.add(STACK_QUERY, () => {
            gsap.to(panel, {
              scale: 0.92,
              ease: "none",
              scrollTrigger: { trigger: panels[i + 1], start: "top bottom", end: "top top", scrub: true },
            });
          });
        }
      });

      return () => {
        mm.revert();
        splits.forEach((s) => s.revert());
      };
    },
    { scope: root },
  );

  return (
    <section ref={root} id="servicios" className={styles.section}>
      <h2 className={styles.sr}>Servicios</h2>
      {services.map((s, i) => (
        <article
          key={s.title}
          className={`${styles.panel} ${styles[`p${i}`]}`}
          data-panel
          data-ink={i === 2 || i === 3 ? "" : undefined}
        >
          <h3 className={styles.title} data-title>
            {s.title}
          </h3>
          <span className={styles.badge} aria-hidden="true">
            {createElement(icons[i].main)}
          </span>
          <div className={styles.scene}>{createElement(scenes[i])}</div>
          <div className={styles.copy}>
            <ol className={styles.steps}>
              {s.steps.map((t, k) => (
                <li key={t}>
                  {createElement(icons[i].steps[k])}
                  {t}
                </li>
              ))}
            </ol>
            <p className={styles.desc}>{s.description}</p>
            {i === services.length - 1 && (
              <Link href="/#contacto" className={styles.cta}>
                Hablemos de tu proyecto
              </Link>
            )}
          </div>
        </article>
      ))}
    </section>
  );
}
