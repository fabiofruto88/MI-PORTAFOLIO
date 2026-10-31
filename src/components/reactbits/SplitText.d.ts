import type { ComponentType, ElementType } from "react";

export interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  ease?: string | ((t: number) => number);
  splitType?: "chars" | "words" | "lines" | string;
  from?: Record<string, unknown>;
  to?: Record<string, unknown>;
  threshold?: number;
  rootMargin?: string;
  textAlign?: "left" | "center" | "right" | "justify" | "start" | "end";
  tag?: ElementType;
  staggerFrom?: "start" | "end" | "center" | "edges" | "random";
  mask?: boolean;
  effect?: "rise" | "fade" | "blur" | "flip" | "pop" | "skew" | "wave";
  trigger?: "view" | "load" | "hover" | "click";
  loop?: boolean;
  loopDelay?: number;
  hoverEffect?: "none" | "lift" | "wave";
  color?: string;
  accentColor?: string;
  onLetterAnimationComplete?: () => void;
}

declare const SplitText: ComponentType<SplitTextProps>;
export default SplitText;
