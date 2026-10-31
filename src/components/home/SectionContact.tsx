"use client";

import Link from "next/link";
import { useRef } from "react";
import { CONTACT, aboutPage } from "@/data/site";
import { gsap, useGSAP, prefersReducedMotion } from "./gsap";
import styles from "./contact.module.css";
import SplitText from "../reactbits/SplitText";

const ext = { target: "_blank", rel: "noopener noreferrer" } as const;

/**
 * Contacto. Escena: el cierre llega como la misma tarjeta que sube y se abre
 * de Servicios, ahora en tinta (el único cambio de tema de la página fuera de
 * Servicios). "Hablemos." se levanta letra a letra y se ensancha.
 */
export default function SectionContact() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.fromTo(
        root.current,
        { clipPath: "inset(0% 18% 0% 18% round 32px 32px 0 0)" },
        {
          clipPath: "inset(0% 0% 0% 0% round 0px 0px 0 0)",
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top bottom", end: "top 30%", scrub: true },
        },
      );
    },
    { scope: root },
  );

  return (
    <section ref={root} id="contacto" className={styles.section} data-ink>
      <SplitText text="Hablemos." tag="h2" textAlign="left" threshold={0.15} rootMargin="0px" className={styles.title} splitType="chars" effect="pop" delay={55} duration={1.2} hoverEffect="wave" />
      <div className={styles.body}>
        <p className={styles.about}>
          {aboutPage.intro}{" "}
          <Link href="/about" className={styles.more}>
            Sobre mí
          </Link>
        </p>
        <div className={styles.actions}>
          <a href={CONTACT.whatsappUrl} className={styles.primary} {...ext}>
            WhatsApp
          </a>
          <a href={`mailto:${CONTACT.email}`} className={styles.secondary}>
            Correo
          </a>
          <a href={CONTACT.linkedin} className={styles.secondary} {...ext}>
            LinkedIn
          </a>
          <a href={CONTACT.github} className={styles.secondary} {...ext}>
            GitHub
          </a>
          <a href={CONTACT.instagram} className={styles.secondary} {...ext}>
            Instagram
          </a>
        </div>
        <a href={`mailto:${CONTACT.email}`} className={styles.email}>
          {CONTACT.email}
        </a>
      </div>
      <footer className={styles.footer}>
        <span>© {new Date().getFullYear()} Fabio Fruto Jimenez</span>
        <nav aria-label="Páginas del sitio">
          <Link href="/about">Sobre mí</Link>
          <Link href="/contact">Contacto</Link>
          <Link href="/privacy">Privacidad</Link>
        </nav>
      </footer>
    </section>
  );
}
