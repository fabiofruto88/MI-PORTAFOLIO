"use client";

import { useRef } from "react";
import { educationItems, experienceItems } from "@/data/experience";
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from "./gsap";
import styles from "./experience.module.css";
import SplitText from "../reactbits/SplitText";

const clean = (s: string) => s.replace(/ — /g, " - ");

const stops = [
  ...experienceItems.map((it) => ({ ...it, kind: "Experiencia" })),
  ...educationItems.map((it) => ({ ...it, kind: "Formación" })),
];

/**
 * Experiencia. Escena: el scroll vertical se vuelve avance horizontal
 * (pan con pin, ease none). La línea de progreso crece con el recorrido y
 * los años enormes se desplazan más lento que el texto (paralaje).
 * El avance es hacia la izquierda: la misma corriente del resto de la página.
 */
export default function SectionExperience() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      // el título (SplitText) crea su propio trigger antes que el pin: se recalcula con fuentes y layout listos
      let alive = true;
      document.fonts?.ready.then(() => alive && ScrollTrigger.refresh());
      const settle = window.setTimeout(() => alive && ScrollTrigger.refresh(), 600);
      const mm = gsap.matchMedia();
      mm.add("(min-width: 821px)", () => {
        const distance = () => track.current!.scrollWidth - window.innerWidth;
        const pan = gsap.to(track.current, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
            anticipatePin: 1,
          },
        });
        gsap.to(bar.current, {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: () => `+=${distance()}`,
            scrub: true,
            invalidateOnRefresh: true,
          },
        });
        // los años viajan más lento que el contenido: profundidad sin 3D
        gsap.utils.toArray<HTMLElement>("[data-year]").forEach((el) => {
          gsap.to(el, {
            x: 28,
            ease: "none",
            scrollTrigger: {
              trigger: el.closest("[data-stop]"),
              containerAnimation: pan,
              start: "left 100%",
              end: "right 0%",
              scrub: true,
            },
          });
        });
      });

      return () => {
        alive = false;
        window.clearTimeout(settle);
        mm.revert();
      };
    },
    { scope: root },
  );

  return (
    <section ref={root} id="experiencia" className={styles.section}>
      <div ref={track} className={styles.track}>
        <div className={styles.lead}>
          <SplitText text="Trayectoria" tag="h2" textAlign="left" threshold={0.15} rootMargin="0px" className={styles.heading} splitType="chars" effect="wave" delay={45} duration={1.3} />
        </div>
        {stops.map((s) => (
          <article key={s.id} className={styles.stop} data-stop>
            <p className={styles.year} data-year>
              {clean(s.period)}
            </p>
            <h3 className={styles.role}>{s.role}</h3>
            <p className={styles.company}>
              {s.kind}. {s.company}
            </p>
            <p className={styles.text}>{s.bullets[0]}</p>
          </article>
        ))}
      </div>
      <span ref={bar} className={styles.bar} aria-hidden="true" />
    </section>
  );
}
