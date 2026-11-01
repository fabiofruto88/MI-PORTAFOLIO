"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, type ReactNode } from "react";
import { LuArrowRight, LuArrowUpRight, LuMail } from "react-icons/lu";
import { FaGithub, FaInstagram, FaLinkedinIn, FaWhatsapp } from "react-icons/fa6";
import { CONTACT } from "@/data/contact";
import { WHATSAPP_QUOTE_URL, type InfoPageContent } from "@/data/site";
import { gsap, useGSAP, prefersReducedMotion } from "@/components/home/gsap";
import SplitText from "@/components/reactbits/SplitText";
import styles from "./info.module.css";

const URL_PATTERN = /(https?:\/\/[^\s)]+)/g;
const EMAIL_PATTERN = /([\w.+-]+@[\w-]+\.[\w.]+)/g;
const ext = { target: "_blank", rel: "noopener noreferrer" } as const;

function renderRichText(text: string): ReactNode[] {
  return text.split(URL_PATTERN).map((chunk, i) => {
    if (/^https?:\/\//.test(chunk)) {
      return (
        <a key={i} href={chunk} {...ext} className={styles.inline}>
          {chunk}
        </a>
      );
    }
    return chunk.split(EMAIL_PATTERN).map((part, j) =>
      /^[\w.+-]+@[\w-]+\.[\w.]+$/.test(part) ? (
        <a key={`${i}-${j}`} href={`mailto:${part}`} className={styles.inline}>
          {part}
        </a>
      ) : (
        part
      ),
    );
  });
}

type Variant = "about" | "contact" | "privacy";

const CHANNELS = [
  {
    key: "whatsapp",
    label: "WhatsApp",
    value: "+57 300 254 9872",
    note: "La vía más rápida para cotizar",
    href: WHATSAPP_QUOTE_URL,
    aria: "Escribir por WhatsApp al +57 300 254 9872",
    Icon: FaWhatsapp,
    external: true,
  },
  {
    key: "email",
    label: "Correo",
    value: CONTACT.email,
    note: null,
    href: `mailto:${CONTACT.email}`,
    aria: `Escribir un correo a ${CONTACT.email}`,
    Icon: LuMail,
    external: false,
  },
  {
    key: "linkedin",
    label: "LinkedIn",
    value: "fabio-fruto-jimenez",
    note: null,
    href: CONTACT.linkedin,
    aria: "Abrir el perfil de LinkedIn de Fabio Fruto",
    Icon: FaLinkedinIn,
    external: true,
  },
  {
    key: "github",
    label: "GitHub",
    value: "fabiofruto88",
    note: null,
    href: CONTACT.github,
    aria: "Abrir el perfil de GitHub de Fabio Fruto",
    Icon: FaGithub,
    external: true,
  },
  {
    key: "instagram",
    label: "Instagram",
    value: "@fabiofruto8",
    note: null,
    href: CONTACT.instagram,
    aria: "Abrir el perfil de Instagram de Fabio Fruto",
    Icon: FaInstagram,
    external: true,
  },
] as const;

function Channels() {
  return (
    <ul className={styles.channels} aria-label="Canales de contacto">
      {CHANNELS.map(({ key, label, value, note, href, aria, Icon, external }) => (
        <li key={key} className={`${styles.channelItem} ${key === "whatsapp" ? styles.channelMain : ""}`} data-reveal>
          <a href={href} aria-label={aria} className={styles.channel} {...(external ? ext : {})}>
            <span className={styles.channelIcon}>
              <Icon aria-hidden="true" />
            </span>
            <span className={styles.channelText}>
              <span className={styles.channelLabel}>{label}</span>
              <span className={styles.channelValue}>{value}</span>
              {note && <span className={styles.channelNote}>{note}</span>}
            </span>
            <LuArrowUpRight aria-hidden="true" className={styles.channelArrow} />
          </a>
        </li>
      ))}
    </ul>
  );
}

function variantOf(path: string): Variant {
  if (path === "/about") return "about";
  if (path === "/contact") return "contact";
  return "privacy";
}

/**
 * Páginas internas (/about, /contact, /privacy) con el mismo mundo del home:
 * papel frío, tinta y un solo azul. El título entra letra a letra; cada bloque
 * sube una sola vez al entrar en pantalla. Privacidad queda quieta y legible.
 */
export default function InfoPage({ page }: { page: InfoPageContent }) {
  const root = useRef<HTMLElement>(null);
  const variant = variantOf(page.path);
  const sections =
    variant === "contact" ? page.sections.filter((s) => s.heading !== "Canales de contacto") : page.sections;

  useGSAP(
    () => {
      if (prefersReducedMotion() || variant === "privacy") return;
      const lead = root.current?.querySelector("[data-lead]");
      if (lead) gsap.from(lead, { opacity: 0, y: 18, duration: 0.9, delay: 0.35, ease: "measuredOut" });
      const photo = root.current?.querySelector("[data-photo]");
      if (photo) {
        gsap.fromTo(
          photo,
          { clipPath: "inset(100% 0% 0% 0% round 22px)", scale: 1.04 },
          { clipPath: "inset(0% 0% 0% 0% round 22px)", scale: 1, duration: 1.3, delay: 0.2, ease: "measuredInOut" },
        );
      }
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 28,
          duration: 0.8,
          ease: "measuredOut",
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        });
      });
    },
    { scope: root },
  );

  return (
    <article ref={root} className={`${styles.page} ${styles[variant]}`}>
      <header className={styles.head}>
        <div className={styles.headText}>
          <p className={styles.eyebrow}>Fabio Fruto</p>
          <SplitText
            text={page.title}
            tag="h1"
            textAlign="left"
            threshold={0.05}
            rootMargin="0px"
            trigger="load"
            className={styles.title}
            splitType={variant === "privacy" ? "words" : "chars"}
            effect={variant === "privacy" ? "fade" : "skew"}
            mask={variant !== "privacy"}
            delay={variant === "privacy" ? 60 : 45}
            duration={variant === "privacy" ? 0.7 : 1.1}
          />
          <p className={styles.lead} data-lead>
            {page.intro}
          </p>
        </div>
        {variant === "about" && (
          <div className={styles.photo} data-photo>
            <Image
              src="/images/profile-color.webp"
              alt="Retrato de Fabio Fruto Jimenez"
              fill
              priority
              sizes="(max-width: 767px) 80vw, 34vw"
              className={styles.photoImg}
            />
          </div>
        )}
      </header>

      {variant === "contact" && <Channels />}

      <div className={styles.sections}>
        {sections.map((section, i) => {
          const isStack = variant === "about" && section.heading === "Tecnologías";
          return (
            <section
              key={section.heading}
              className={`${styles.block} ${isStack ? styles.stack : ""} ${variant === "about" && i === 1 ? styles.card : ""}`}
              data-reveal
            >
              <h2 className={styles.heading}>{section.heading}</h2>
              <div className={styles.copy}>
                {section.paragraphs.map((p) => (
                  <p key={p} className={styles.para}>
                    {renderRichText(p)}
                  </p>
                ))}
              </div>
            </section>
          );
        })}
      </div>

      {variant === "about" && (
        <div className={styles.cta} data-reveal>
          <Link href="/proyectos" className={styles.ctaPrimary}>
            Ver proyectos
            <LuArrowRight aria-hidden="true" />
          </Link>
          <p className={styles.ctaNote}>Sitios, apps y automatizaciones con demo en línea y código en GitHub.</p>
        </div>
      )}
    </article>
  );
}
