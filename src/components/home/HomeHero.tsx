"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  gsap,
  SplitText,
  useGSAP,
  EASE_OUT,
  prefersReducedMotion,
} from "./gsap";
import { FaWhatsapp } from "react-icons/fa6";
import { LuLayoutGrid } from "react-icons/lu";
import { HERO_SUB, WHATSAPP_QUOTE_URL } from "@/data/site";
import Loader from "./Loader";
import styles from "./hero.module.css";

const DitherVeil = dynamic(() => import("../reactbits/DitherVeil"), { ssr: false });

function supportsWebGL(): boolean {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

/**
 * Hero. Escena: el retrato es una foto tramada en 1 bit (DitherVeil) en tinta sobre el
 * mismo gris del hero; el cursor la revela a color. Al salir, todo se va hacia la izquierda
 * (la corriente de la película).
 */
export default function HomeHero() {
  const root = useRef<HTMLElement>(null);
  const [webgl, setWebgl] = useState(false);
  const [narrow, setNarrow] = useState(false);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect */
    setNarrow(window.innerWidth < 820);
    /* eslint-enable react-hooks/set-state-in-effect */
    // el retrato tramado espera a que la página termine de pintar: no compite con el primer render
    // en móvil (menos de 768 px) se queda la foto normal; el tramado es de tablet en adelante
    if (window.innerWidth < 768 || prefersReducedMotion() || !supportsWebGL()) return;
    const idle = window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 250));
    const id = idle(() => setWebgl(true));
    return () => {
      if (window.cancelIdleCallback) window.cancelIdleCallback(id);
      else window.clearTimeout(id);
    };
  }, []);

  // Entrada: arranca en el primer frame de la subida de la cortina
  useGSAP(
    () => {
      if (!revealed) return;
      if (prefersReducedMotion()) return;
      const name = SplitText.create("[data-line]", { type: "chars", mask: "chars", aria: "hidden" });
      const tl = gsap.timeline();
      tl.fromTo(
        name.chars,
        { yPercent: 112, "--w": 62 },
        { yPercent: 0, "--w": 125, duration: 1.25, ease: EASE_OUT, stagger: 0.045 },
        0,
      )
        .from(
          "[data-reveal]",
          { clipPath: "inset(0 100% 0 0)", duration: 0.9, ease: EASE_OUT, stagger: 0.12 },
          0.55,
        );
      // Tipografía cinética: cada letra se condensa al acercarse el cursor
      // (eje de ancho de Archivo). Causa y efecto directos con el puntero.
      const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
      let off = () => {};
      if (fine) {
        const setters = name.chars.map((c) => gsap.quickTo(c, "--w", { duration: 0.55, ease: "power3.out" }));
        let raf = 0;
        let px = 0;
        let py = 0;
        const apply = () => {
          raf = 0;
          name.chars.forEach((c, i) => {
            const r = c.getBoundingClientRect();
            const d = Math.hypot(px - (r.left + r.width / 2), py - (r.top + r.height / 2));
            setters[i](125 - 63 * Math.exp(-((d / 230) ** 2)));
          });
        };
        const onMove = (e: PointerEvent) => {
          px = e.clientX;
          py = e.clientY;
          if (!raf) raf = requestAnimationFrame(apply);
        };
        tl.eventCallback("onComplete", () => window.addEventListener("pointermove", onMove, { passive: true }));
        off = () => {
          window.removeEventListener("pointermove", onMove);
          if (raf) cancelAnimationFrame(raf);
        };
      }
      return () => {
        off();
        name.revert();
      };
    },
    { scope: root, dependencies: [revealed] },
  );

  // Salida: vector izquierda, ligado al scroll. Solo en pantallas anchas: en móvil
  // el texto y los botones se quedan quietos para poder leerlos y tocarlos.
  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const mm = gsap.matchMedia();
      mm.add("(min-width: 821px)", () => {
        gsap
          .timeline({
            scrollTrigger: {
              trigger: root.current,
              start: "top top",
              end: "bottom top",
              scrub: 1,
            },
          })
          .to("[data-line='a']", { xPercent: -42, ease: "none" }, 0)
          .to("[data-line='b']", { xPercent: -70, ease: "none" }, 0)
          .to("[data-copy]", { xPercent: -60, opacity: 0, ease: "none" }, 0)
          .to("[data-stage]", { xPercent: -30, ease: "none" }, 0);
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} id="inicio" className={styles.hero} data-scene-step="0">
      <h1 className={styles.name}>
        <span className={styles.line} data-line="a">
          Fabio
        </span>
        <span className={styles.line} data-line="b">
          Fruto
        </span>
        <span className={styles.sr}> Jimenez, desarrollador freelance en Barranquilla: sitios web, apps móviles y automatizaciones con IA</span>
      </h1>

      <div className={styles.stage} data-stage>
        {webgl ? (
          <DitherVeil
            src="/images/profile-cutout.png"
            fit="contain"
            pattern="floyd"
            pixelSize={1}
            inkColor="#0f1013"
            paperColor="#d9dadc"
            rimColor="#2f55d4"
            rim={0.2}
            levels={2}
            contrast={1.15}
            brightness={0.08}
            revealRadius={narrow ? 120 : 180}
            softness={0.6}
            linger={1.2}
            wander
          />
        ) : (
          <Image
            src="/images/profile-color.webp"
            alt="Retrato de Fabio Fruto Jimenez, desarrollador de software"
            fill
            priority
            sizes="(max-width: 820px) 100vw, 50vw"
            style={{ objectFit: "contain", objectPosition: "50% 100%" }}
          />
        )}
      </div>

      <div className={styles.copy} data-copy>
        <p className={styles.sub} data-reveal>
          {HERO_SUB}
        </p>
        <div className={styles.actions} data-reveal>
          <a href={WHATSAPP_QUOTE_URL} className={styles.primary} target="_blank" rel="noopener noreferrer">
            <FaWhatsapp aria-hidden="true" />
            Cotizar por WhatsApp
          </a>
          <Link href="/#proyectos" className={styles.secondary}>
            <LuLayoutGrid aria-hidden="true" />
            Ver proyectos reales
          </Link>
        </div>
      </div>

      <Loader onReveal={() => setRevealed(true)} />
      <noscript>
        <style>{"[data-loader]{display:none!important}"}</style>
      </noscript>
    </section>
  );
}
