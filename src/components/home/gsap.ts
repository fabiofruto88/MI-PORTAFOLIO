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

/**
 * Las animaciones están siempre activas. Muchos equipos Windows reportan
 * "reducir movimiento" sin que su dueño lo haya pedido, así que el sitio no
 * depende de esa señal del sistema. Salida de emergencia: ?motion=off.
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return new URLSearchParams(window.location.search).get("motion") === "off";
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
