"use client";

import Image from "next/image";
import { useState } from "react";
import { LuCode, LuEye } from "react-icons/lu";
import { projectCategories, projectSummaries } from "@/data/site";
import SplitText from "../reactbits/SplitText";
import btn from "./projects.module.css";
import styles from "./proyectos.module.css";

const ext = { target: "_blank", rel: "noopener noreferrer" } as const;

/**
 * Catálogo completo. Un filtro por categoría y tarjetas con lo mismo que los
 * destacados: captura, qué hace en una frase, tecnologías y enlaces. Al
 * filtrar, la rejilla se reconstruye con una entrada corta y escalonada.
 */
export default function ProjectsIndex() {
  const [active, setActive] = useState<string>(projectCategories[0]);
  const shown = projectSummaries.filter((p) => active === "Todos" || p.category === active);

  return (
    <section className={styles.page}>
      <header className={styles.head}>
        <p className={styles.eyebrow}>Portafolio</p>
        <SplitText
          text="Proyectos"
          tag="h1"
          textAlign="left"
          threshold={0.05}
          rootMargin="0px"
          trigger="load"
          className={styles.title}
          splitType="chars"
          effect="skew"
          mask
          delay={45}
          duration={1.1}
        />
        <p className={styles.lead}>
          Sitios web, aplicaciones y automatizaciones con IA. Cada uno tiene demo en línea y código público en GitHub.
        </p>
      </header>

      <div className={styles.filters} role="group" aria-label="Filtrar por categoría">
        {projectCategories.map((c) => (
          <button
            key={c}
            type="button"
            className={styles.chip}
            aria-pressed={active === c}
            onClick={() => setActive(c)}
          >
            {c}
            <span className={styles.count}>
              {c === "Todos" ? projectSummaries.length : projectSummaries.filter((p) => p.category === c).length}
            </span>
          </button>
        ))}
      </div>

      <ul className={styles.grid} key={active}>
        {shown.map((p, i) => (
          <li key={p.title} className={styles.card} style={{ animationDelay: `${i * 55}ms` }}>
            <a href={p.demoUrl} {...ext} className={styles.shot} aria-label={`Abrir demo de ${p.title}`}>
              <Image
                src={p.image}
                alt={`Captura del proyecto ${p.title}`}
                fill
                sizes="(max-width: 820px) 92vw, 46vw"
                className={styles.img}
              />
            </a>
            <div className={styles.body}>
              <p className={styles.kind}>{p.category}</p>
              <h2 className={styles.name}>{p.title}</h2>
              <p className={styles.outcome}>{p.outcome}</p>
              <ul className={styles.tags}>
                {p.tags.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
              <div className={styles.links}>
                <a href={p.demoUrl} {...ext} className={btn.primary} aria-label={`Ver demo de ${p.title}`}>
                  <LuEye aria-hidden="true" />
                  Ver demo
                </a>
                <a href={p.githubUrl} {...ext} className={btn.ghost} aria-label={`Código de ${p.title}`}>
                  <LuCode aria-hidden="true" />
                  Código
                </a>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
