"use client";

import Link from "next/link";
import { useRef } from "react";
import { ScrollTrigger, useGSAP } from "./gsap";
import styles from "./nav.module.css";

const links = [
  { label: "Proyectos", href: "/#proyectos" },
  { label: "Experiencia", href: "/#experiencia" },
  { label: "Sobre mí", href: "/about" },
];

/** Barra de una sola línea: marca, tres destinos y la acción principal. */
export default function HomeNav() {
  const header = useRef<HTMLElement>(null);

  // sobre un panel oscuro ([data-ink]) la barra invierte sus colores
  useGSAP(() => {
    const check = () => {
      const el = header.current;
      if (!el) return;
      const dark = document
        .elementsFromPoint(window.innerWidth / 2, 34)
        .some((n) => n.closest("[data-ink]"));
      el.dataset.dark = String(dark);
    };
    const st = ScrollTrigger.create({ start: 0, end: "max", onUpdate: check, onRefresh: check });
    check();
    return () => st.kill();
  });

  return (
    <header ref={header} className={styles.nav}>
      <Link href="/" className={styles.brand}>
        Fabio Fruto
      </Link>
      <nav className={styles.links} aria-label="Principal">
        {links.map((l) =>
          l.href.startsWith("/#") ? (
            <Link key={l.href} href={l.href} className={styles.link}>
              {l.label}
            </Link>
          ) : (
            // enlace de documento: dispara la View Transition entre páginas
            <a key={l.href} href={l.href} className={styles.link}>
              {l.label}
            </a>
          ),
        )}
      </nav>
      <Link href="/#contacto" className={styles.cta}>
        Escríbeme
      </Link>
    </header>
  );
}
