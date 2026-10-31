"use client";

import { useRef } from "react";
import { recognitions } from "@/data/site";
import { gsap, useGSAP, EASE_OUT, prefersReducedMotion } from "./gsap";
import styles from "./recognitions.module.css";
import SplitText from "../reactbits/SplitText";

/**
 * Publicaciones. Escena: tres filas tipográficas que se abren con un barrido
 * al entrar; al pasar el cursor o enfocar una fila se despliega su detalle
 * (en táctil todo queda abierto). Es el único bloque de lista de la página.
 */
export default function SectionRecognitions() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.utils.toArray<HTMLElement>("[data-row]").forEach((row) => {
        gsap.fromTo(
          row,
          { clipPath: "inset(0 100% 0 0)" },
          {
            clipPath: "inset(0 0% 0 0)",
            duration: 1.2,
            ease: EASE_OUT,
            scrollTrigger: { trigger: row, start: "top 85%", once: true },
          },
        );
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="publicaciones" className={styles.section}>
      <SplitText text="Publicaciones y ponencias" tag="h2" textAlign="left" threshold={0.15} rootMargin="0px" className={styles.title} splitType="words" effect="blur" mask delay={80} duration={1.1} />
      <div className={styles.rows}>
        {recognitions.map((r) => (
          <article key={r.title} className={styles.row} data-row tabIndex={0}>
            <h3 className={styles.label}>{r.label}</h3>
            <p className={styles.kind}>{r.kind}</p>
            <div className={styles.more}>
              <div className={styles.inner}>
                <p className={styles.name}>{r.title}</p>
                <p className={styles.venue}>{r.venue}</p>
                <p className={styles.text}>{r.description}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
