"use client";

import { useRef, useState } from "react";
import { gsap, useGSAP, EASE_IN_OUT, prefersReducedMotion } from "./gsap";
import styles from "./loader.module.css";

/** La cortina corre una vez por carga completa de página, no en navegaciones internas. */
let played = false;

/**
 * Cortina de carga. Su único trabajo es dar tiempo a que el retrato 3D
 * construya su relieve. Se levanta hacia arriba con la curva (.76,0,.24,1) y
 * el hero arranca en el primer frame de la subida, no al terminar.
 */
export default function Loader({ onReveal }: { onReveal: () => void }) {
  const root = useRef<HTMLDivElement>(null);
  const count = useRef<HTMLSpanElement>(null);
  const [gone, setGone] = useState(false);

  useGSAP(
    () => {
      if (played || prefersReducedMotion()) {
        onReveal();
        setGone(true);
        return;
      }
      const n = { v: 0 };
      gsap
        .timeline({
          onComplete: () => {
            played = true;
            setGone(true);
          },
        })
        .to(n, {
          v: 100,
          duration: 1.5,
          ease: "power2.inOut",
          onUpdate: () => {
            if (count.current) count.current.textContent = String(Math.round(n.v)).padStart(3, "0");
          },
        })
        .add(onReveal)
        .to(root.current, { clipPath: "inset(0 0 100% 0)", duration: 0.95, ease: EASE_IN_OUT }, "<")
        .to(`.${styles.mark}`, { yPercent: -60, duration: 0.95, ease: EASE_IN_OUT }, "<");
    },
    { scope: root },
  );

  if (gone) return null;

  return (
    <div ref={root} className={styles.curtain} data-loader aria-hidden="true">
      <span className={styles.mark}>Fabio Fruto</span>
      <span ref={count} className={styles.count}>
        000
      </span>
    </div>
  );
}
