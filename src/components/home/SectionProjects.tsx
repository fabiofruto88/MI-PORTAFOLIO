"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { LuArrowUpRight, LuBot, LuCode, LuEye, LuGlobe, LuScanFace } from "react-icons/lu";
import type { IconType } from "react-icons";
import { featuredProjects, projectSummaries } from "@/data/site";
import { gsap, useGSAP, EASE_OUT, prefersReducedMotion } from "./gsap";
import SplitText from "../reactbits/SplitText";
import styles from "./projects.module.css";

const ext = { target: "_blank", rel: "noopener noreferrer" } as const;

const categoryIcon: Record<string, IconType> = {
  "Visión por computador": LuScanFace,
  "Sitios web": LuGlobe,
  "Automatización con IA": LuBot,
};

/**
 * Proyectos destacados. Tres casos con el problema que resuelven, no una
 * galería: captura grande, qué hace en una frase, tecnologías y enlaces. El
 * catálogo completo vive en /proyectos.
 * Cada captura se destapa de abajo hacia arriba al entrar (clip-path) y el
 * texto sube escalonado; en táctil no hay hover, solo el estado en reposo.
 */
export default function SectionProjects() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.utils.toArray<HTMLElement>("[data-row]").forEach((row) => {
        const shot = row.querySelector("[data-shot]");
        const bits = row.querySelectorAll("[data-t]");
        const tl = gsap.timeline({ scrollTrigger: { trigger: row, start: "top 78%", once: true } });
        tl.fromTo(
          shot,
          { clipPath: "inset(0 0 100% 0)" },
          { clipPath: "inset(0 0 0% 0)", duration: 1.1, ease: EASE_OUT },
        ).fromTo(
          bits,
          { opacity: 0, y: 22 },
          { opacity: 1, y: 0, duration: 0.7, ease: EASE_OUT, stagger: 0.07, clearProps: "transform,opacity" },
          0.25,
        );
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="proyectos" className={styles.section}>
      <header className={styles.head}>
        <p className={styles.eyebrow}>Trabajo seleccionado</p>
        <SplitText
          text="Proyectos destacados"
          tag="h2"
          textAlign="left"
          threshold={0.15}
          rootMargin="0px"
          className={styles.title}
          splitType="words"
          effect="skew"
          mask
          delay={90}
          duration={1.1}
        />
        <p className={styles.lead}>
          Tres proyectos reales con demo en línea y código público. Los puedes abrir y revisar tú mismo antes de escribirme.
        </p>
      </header>

      <div className={styles.rows}>
        {featuredProjects.map((p, i) => {
          const Icon = categoryIcon[p.category] ?? LuGlobe;
          return (
            <article key={p.title} className={styles.row} data-row data-flip={i % 2 === 1 ? "" : undefined}>
              <a href={p.demoUrl} {...ext} className={styles.shot} aria-label={`Abrir demo de ${p.title}`}>
                <span className={styles.frame} data-shot>
                  <Image
                    src={p.image}
                    alt={`Captura del proyecto ${p.title}`}
                    fill
                    sizes="(max-width: 820px) 92vw, 56vw"
                    className={styles.img}
                  />
                </span>
              </a>
              <div className={styles.info}>
                <p className={styles.kind} data-t>
                  <Icon aria-hidden="true" />
                  {p.category}
                </p>
                <h3 className={styles.name} data-t>
                  {p.title}
                </h3>
                <p className={styles.outcome} data-t>
                  {p.outcome}
                </p>
                <ul className={styles.tags} data-t>
                  {p.tags.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
                <div className={styles.links} data-t>
                  <a href={p.demoUrl} {...ext} className={styles.primary} aria-label={`Ver demo de ${p.title}`}>
                    <LuEye aria-hidden="true" />
                    Ver demo
                  </a>
                  <a href={p.githubUrl} {...ext} className={styles.ghost} aria-label={`Código de ${p.title}`}>
                    <LuCode aria-hidden="true" />
                    Código
                  </a>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <div className={styles.more}>
        <Link href="/proyectos" className={styles.all}>
          Ver los {projectSummaries.length} proyectos
          <LuArrowUpRight aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
