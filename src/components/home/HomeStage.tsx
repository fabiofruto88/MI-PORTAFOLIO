"use client";

import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger, prefersReducedMotion } from "./gsap";
import styles from "./home.module.css";

/**
 * Escenario del home: scroll nativo largo con inercia (Lenis) enlazado a
 * ScrollTrigger. Cada sección posee su propia escena; aquí solo vive el reloj
 * de scroll compartido.
 */
export default function HomeStage({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (prefersReducedMotion()) return;

    const lenis = new Lenis({ lerp: 0.1, anchors: true });
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (t: number) => lenis.raf(t * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // pins y tipografía cambian las posiciones: recalcular al cargar
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    document.fonts?.ready.then(refresh);
    const timer = window.setTimeout(refresh, 1200);

    return () => {
      window.removeEventListener("load", refresh);
      window.clearTimeout(timer);
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);

  return <div className={styles.root}>{children}</div>;
}
