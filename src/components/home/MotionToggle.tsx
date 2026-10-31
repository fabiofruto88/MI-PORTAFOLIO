"use client";

import { useEffect, useState } from "react";
import { prefersReducedMotion, setMotionChoice } from "./gsap";
import styles from "./motion.module.css";

function toggle(reduced: boolean) {
  const next = reduced ? "on" : "off";
  setMotionChoice(next);
  // las escenas se montan una vez: se recarga con la elección también en la URL,
  // para que funcione aunque el navegador no guarde datos del sitio
  const url = new URL(window.location.href);
  url.searchParams.set("motion", next);
  window.location.assign(url.toString());
}

/**
 * Control de movimiento: la experiencia completa viene activa por defecto y el
 * visitante puede reducirla (o volver a activarla) cuando quiera.
 */
export default function MotionToggle() {
  const [reduced, setReduced] = useState<boolean | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setReduced(prefersReducedMotion());
  }, []);

  if (reduced === null) return null;

  return (
    <button
      type="button"
      className={styles.inline}
      aria-pressed={!reduced}
      onClick={() => toggle(!reduced)}
    >
      Animaciones: {reduced ? "no" : "sí"}
    </button>
  );
}
