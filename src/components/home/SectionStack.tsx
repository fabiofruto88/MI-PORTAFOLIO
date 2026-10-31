"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { skillGroups } from "@/data/site";
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from "./gsap";
import type { StackRig } from "./StackScene";
import styles from "./stack.module.css";
import SplitText from "../reactbits/SplitText";

const StackScene = dynamic(() => import("./StackScene"), { ssr: false });

function supportsWebGL(): boolean {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

/**
 * Stack. Escena: las 18 tecnologías reales flotan en cuatro cúmulos; el scroll
 * gira la esfera hasta cada frente y la lista de al lado sigue al cúmulo activo.
 */
export default function SectionStack() {
  const root = useRef<HTMLElement>(null);
  const list = useRef<HTMLUListElement>(null);
  const rig = useRef<StackRig>({ progress: 0 });
  const [webgl, setWebgl] = useState(false);
  const [narrow, setNarrow] = useState(false);
  const [visible, setVisible] = useState(false);
  const [near, setNear] = useState(false);

  useEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect */
    setNarrow(window.innerWidth < 820);
    if (!prefersReducedMotion() && supportsWebGL()) setWebgl(true);
    /* eslint-enable react-hooks/set-state-in-effect */
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      setVisible(e.isIntersecting);
      if (e.isIntersecting) setNear(true);
    }, { rootMargin: "120px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const items = gsap.utils.toArray<HTMLElement>("[data-group]");
      let current = -1;
      ScrollTrigger.create({
        trigger: root.current,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        onUpdate: (self) => {
          rig.current.progress = self.progress;
          const idx = Math.min(items.length - 1, Math.floor(self.progress * items.length));
          if (idx !== current) {
            current = idx;
            items.forEach((el, i) => el.setAttribute("data-active", String(i === idx)));
          }
        },
      });
      items.forEach((el, i) => el.setAttribute("data-active", String(i === 0)));
    },
    { scope: root },
  );

  return (
    <section ref={root} id="stack" className={styles.section}>
      <div className={styles.pin}>
        <SplitText text="Tecnología para cada frente." tag="h2" textAlign="left" threshold={0.15} rootMargin="0px" className={styles.title} splitType="lines" effect="skew" mask delay={120} duration={1.1} />
        {webgl && near && (
          <div className={styles.stage} aria-hidden="true">
            <StackScene rig={rig} groups={skillGroups} narrow={narrow} visible={visible} />
          </div>
        )}
        <ul ref={list} className={styles.list}>
          {skillGroups.map((g) => (
            <li key={g.group} className={styles.item} data-group>
              <h3 className={styles.group}>{g.group}</h3>
              <p className={styles.skills}>{g.items.join(", ")}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
