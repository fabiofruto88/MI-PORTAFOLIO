"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { CustomEase } from "gsap/CustomEase";
import { Flip } from "gsap/Flip";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(
  useGSAP,
  ScrollTrigger,
  SplitText,
  DrawSVGPlugin,
  MotionPathPlugin,
  CustomEase,
  Flip,
);

/** Curvas compartidas por todo el home (mismas que los tokens CSS). */
/** Curvas medidas en las referencias (epic.net / uncommondesign.group). */
export const EASE_OUT = CustomEase.create("measuredOut", "0.22,1,0.36,1");
export const EASE_IN_OUT = CustomEase.create("measuredInOut", "0.76,0,0.24,1");
export const EASE_PRESS = CustomEase.create("measuredPress", "0.165,0.84,0.44,1");

const MOTION_KEY = "ff-motion";

/** Elección explícita del visitante en este sitio; null = seguir al sistema. */
export function motionChoice(): "on" | "off" | null {
  // la URL manda (?motion=on|off): sirve aunque el navegador bloquee el almacenamiento
  try {
    const q = new URLSearchParams(window.location.search).get("motion");
    if (q === "on" || q === "off") {
      try {
        window.localStorage.setItem(MOTION_KEY, q);
      } catch {
        // sin almacenamiento: la URL basta para esta carga
      }
      return q;
    }
  } catch {
    // sin window.location: se sigue con el almacenamiento
  }
  try {
    const v = window.localStorage.getItem(MOTION_KEY);
    return v === "on" || v === "off" ? v : null;
  } catch {
    return null;
  }
}

export function setMotionChoice(v: "on" | "off" | null) {
  try {
    if (v) window.localStorage.setItem(MOTION_KEY, v);
    else window.localStorage.removeItem(MOTION_KEY);
  } catch {
    // almacenamiento bloqueado: la elección no se guarda
  }
}

/** El sistema operativo pide reducir movimiento (p. ej. animaciones de Windows apagadas). */
export function systemReducesMotion(): boolean {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Decisión del sitio: la experiencia completa viene activada por defecto,
 * aunque el sistema tenga las animaciones apagadas. Solo se reduce cuando el
 * visitante lo pide con el control "Animaciones" de la barra (o ?motion=off).
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return motionChoice() === "off";
}

export {
  gsap,
  ScrollTrigger,
  SplitText,
  DrawSVGPlugin,
  MotionPathPlugin,
  Flip,
  CustomEase,
  useGSAP,
};
