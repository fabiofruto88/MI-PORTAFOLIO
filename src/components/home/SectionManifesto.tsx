"use client";

import { useRef } from "react";
import {
  gsap,
  SplitText,
  useGSAP,
  EASE_OUT,
  prefersReducedMotion,
} from "./gsap";
import styles from "./manifesto.module.css";

const INK = "#0f1013";
const DIM = "rgba(15, 16, 19, 0.16)";
const ACCENT = "#2f55d4";

/**
 * Manifiesto. Escena: la frase se "enciende" palabra por palabra al ritmo
 * del scroll y luego se condensa en las tres palabras que resumen el
 * trabajo (web, móvil, IA), que se ensanchan con el eje de ancho de Archivo.
 * Entra desde la derecha mientras el hero sale por la izquierda.
 */
export default function SectionManifesto() {
  const root = useRef<HTMLElement>(null);
  const pin = useRef<HTMLDivElement>(null);
  const sentence = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const mobile = window.innerWidth < 820;

      const words = SplitText.create(sentence.current!, { type: "words" });
      const keys = words.words.filter((w) => w.closest("[data-key]"));
      const rest = words.words.filter((w) => !w.closest("[data-key]"));
      const giants = SplitText.create("[data-g]", { type: "chars", mask: "chars" });

      // la máscara de cada letra recortaba el acento de "Móvil": se le da aire arriba
      giants.masks.forEach((m) => {
        const el = m as HTMLElement;
        el.style.paddingTop = "0.2em";
        el.style.marginTop = "-0.2em";
        el.style.paddingInline = "0.08em";
        el.style.marginInline = "-0.08em";
      });
      gsap.set(words.words, { color: DIM });
      gsap.set("[data-giants]", { visibility: "visible" });
      gsap.set(giants.chars, { yPercent: 112, "--w": 62 });

      // Entrada: viene de la derecha, el mismo vector con el que sale el hero
      gsap.fromTo(
        sentence.current,
        { xPercent: mobile ? 18 : 34 },
        {
          xPercent: 0,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top bottom", end: "top top", scrub: 1 },
        },
      );

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: () => (mobile ? "+=140%" : "+=170%"),
          pin: pin.current,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // 1. se enciende, palabra a palabra, con borde suave de 3 palabras
      tl.to(words.words, { color: INK, duration: 0.5, stagger: 4 / words.words.length }, 0);
      // 2. las palabras clave toman el acento antes de que el resto se retire
      tl.to(keys, { color: ACCENT, duration: 0.6 }, 4.6);
      tl.to(rest, { opacity: 0, xPercent: -14, duration: 0.8, stagger: 0.03 }, 5.4);
      // 3. la frase se va y las tres palabras se levantan y se ensanchan
      tl.to(sentence.current, { opacity: 0, duration: 0.5 }, 6.8);
      tl.to(
        giants.chars,
        { yPercent: 0, "--w": 118, duration: 1.4, ease: EASE_OUT, stagger: 0.05 },
        6.9,
      );
      tl.to({}, { duration: 0.6 }); // pausa de lectura antes de soltar el pin

      return () => {
        words.revert();
        giants.revert();
      };
    },
    { scope: root },
  );

  return (
    <section ref={root} id="manifiesto" className={styles.section}>
      <h2 className={styles.sr}>Qué hago</h2>
      <div ref={pin} className={styles.pin}>
        <p ref={sentence} className={styles.sentence}>
          Convierto lo que tu negocio necesita en software que funciona: sitios <b data-key>web</b>, apps
          <b data-key>móviles</b> y automatizaciones con <b data-key>IA</b>.
        </p>
        <div className={styles.giants} data-giants aria-hidden="true">
          <span className={styles.giant} data-g>
            Web
          </span>
          <span className={styles.giant} data-g>
            Móvil
          </span>
          <span className={styles.giant} data-g>
            IA
          </span>
        </div>
      </div>
    </section>
  );
}
