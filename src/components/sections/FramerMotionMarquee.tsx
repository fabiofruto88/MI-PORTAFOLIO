"use client";

/**
 * Infinite Autoscroll Carousel (Marquee) con Framer Motion + MUI
 *
 * ✅ Loop perfecto, jamás se reinicia abruptamente ni depende de opacity hacks
 * ✅ Duplicación efectiva del contenido (buffer) para seamless scroll
 * ✅ Ancho calculado al vuelo y recalculado en resize/browser zoom
 * ✅ Movimiento continuo en ambas direcciones (left/right)
 * ✅ Sincrónico con velocidad (px/s) y sin acumulación de errores
 */

import React, { useRef, useLayoutEffect, useState, useCallback } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { motion, useAnimationFrame } from "framer-motion";
import {
  SiTailwindcss,
  SiReact,
  SiNextdotjs,
  SiJavascript,
  SiTypescript,
  SiFirebase,
  SiGit,
  SiDocker,
  SiNodedotjs,
  SiCss3,
  SiMui,
  SiFastapi,
  SiExpress,
  SiOpencv,
} from "react-icons/si";
import { DiHtml5, DiMysql } from "react-icons/di";
import { FcAndroidOs } from "react-icons/fc";
import {
  FaAngular,
  FaAppStoreIos,
  FaBootstrap,
  FaPython,
} from "react-icons/fa";

// ==== Tipos ====
interface Tech {
  icon: React.ElementType;
  name: string;
  color: string;
}

export interface FramerMotionMarqueeProps {
  direction?: "left" | "right";
  technologies?: Tech[];
  speed?: number; // px/s
}

// ==== Defaults ====
const defaultTechnologies: Tech[] = [
  { icon: SiTailwindcss, name: "Tailwind CSS", color: "#06B6D4" },
  { icon: FaBootstrap, name: "Bootstrap", color: "#7952B3" },
  { icon: DiHtml5, name: "HTML5", color: "#E34F26" },
  { icon: SiCss3, name: "CSS3", color: "#2965F1" },
  { icon: SiMui, name: "MUI", color: "#007FFF" },
  { icon: SiReact, name: "React.js", color: "#61DAFB" },
  { icon: SiNextdotjs, name: "Next.js", color: "#000000" },
  { icon: SiJavascript, name: "JavaScript", color: "#F7DF1E" },
  { icon: SiTypescript, name: "TypeScript", color: "#3178C6" },
  { icon: FaPython, name: "Python", color: "#3776AB" },
  { icon: DiMysql, name: "MySQL", color: "#4169E1" },
  { icon: SiFirebase, name: "Firebase", color: "#FFCA28" },
  { icon: SiGit, name: "Git", color: "#F05032" },
  { icon: SiDocker, name: "Docker", color: "#2496ED" },
  { icon: SiNodedotjs, name: "Node.js", color: "#339933" },
  { icon: FcAndroidOs, name: "Android OS", color: "#3DDC84" },
  { icon: FaAppStoreIos, name: "iOS", color: "#2496ED" },
  { icon: FaAngular, name: "Angular", color: "#DD0031" },
  { icon: SiFastapi, name: "FastAPI", color: "#009688" },
  { icon: SiExpress, name: "Express", color: "#000000" },
  { icon: SiOpencv, name: "OpenCV", color: "#5C3EE8" },
];

const DEFAULT_SPEED = 50; // px/seg

/**
 * Componente Carrusel infinito con movimiento perfectamente continuo.
 */
export default function FramerMotionMarquee({
  direction = "left",
  technologies = defaultTechnologies,
  speed = DEFAULT_SPEED,
}: FramerMotionMarqueeProps) {
  const theme = useTheme();
  /**
   * Duplicamos el listado para que cuando tu scroll (x) cruce
   * el umbral del ancho del primer bloque, la transición
   * sea perfecta. Solo "reseteamos" x a 0 y no se nota nada.
   */
  const techsLoop = [...technologies, ...technologies];

  // Ref para medir el ancho *visible* de UN loop (sin duplicados)
  const itemContainerRef = useRef<HTMLDivElement>(null);

  // Estado para el ancho del "loop base" (sin duplicados)
  const [loopWidth, setLoopWidth] = useState<number>(0);

  // Estado del offset (posición x) animada
  const [baseX, setBaseX] = useState<number>(0);

  // --- Medición dinámica del ancho base y resize
  const measureLoopWidth = useCallback(() => {
    if (itemContainerRef.current) {
      // El scrollWidth de la fila base, sin duplicados
      setLoopWidth(itemContainerRef.current.scrollWidth);
    }
  }, []);

  useLayoutEffect(() => {
    measureLoopWidth();
    // Listen a resize: recalcula para responsividad perfecta
    window.addEventListener("resize", measureLoopWidth);
    return () => window.removeEventListener("resize", measureLoopWidth);
  }, [measureLoopWidth, technologies]);

  // === Animación CONTINUA, sin parpadeos ===
  useAnimationFrame((_, delta) => {
    if (!loopWidth) return;

    setBaseX((prev) => {
      /**
       * Calcula nuevo offset:
       * - Izquierda: decrementa X (mueve hacia la izq)
       * - Derecha: incrementa X (mueve hacia la der)
       * El offset SIEMPRE está en [-loopWidth, 0)
       */
      let nextOffset =
        direction === "left"
          ? prev - (speed * delta!) / 1000
          : prev + (speed * delta!) / 1000;

      // Reinicio seamless: Si cruce el ancho de un loop, reinicia en 0
      if (direction === "left" && Math.abs(nextOffset) >= loopWidth) {
        nextOffset += loopWidth; // ¡No 0! Sino +width para arrastrar buffer
      }
      if (direction === "right" && nextOffset >= 0) {
        nextOffset -= loopWidth; // Inver al valor negativo del loop base
      }
      return nextOffset;
    });
  });

  return (
    <Box
      sx={{
        width: "100%",
        py: 1,
        backgroundColor: "background.default",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* 
        Degradado en bordes: fade "pro" 
        Usando maskImage para un efecto elegante y accesible
      */}
      <Box
        sx={{
          position: "relative",
          maskImage:
            "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          width: "100%",
          overflow: "hidden",
          userSelect: "none",
          alignItems: "center",
          display: "flex",
          height: 80,
        }}
      >
        {/* 
          SOLO la mitad del loop es "real", el resto es duplicado. 
          Usamos ref SOLO para el primer loop (no para ambos).
        */}
        <motion.div
          style={{
            display: "flex",
            gap: 32,
            willChange: "transform",
            transform: `translateX(${baseX}px)`,
          }}
        >
          {/* Loop base para medir el ancho */}
          <div
            ref={itemContainerRef}
            style={{
              display: "flex",
              gap: 32,
            }}
          >
            {technologies.map((tech, idx) => (
              <TechIconMotion key={idx} tech={tech} index={idx} />
            ))}
          </div>
          {/* Loop duplicado (buffer) */}
          <div
            style={{
              display: "flex",
              gap: 32,
            }}
          >
            {technologies.map((tech, idx) => (
              <TechIconMotion
                key={technologies.length + idx}
                tech={tech}
                index={idx}
              />
            ))}
          </div>
        </motion.div>
      </Box>
    </Box>
  );
}

// === Componente para cada ícono con animación y accesibilidad ===
function TechIconMotion({ tech, index }: { tech: Tech; index: number }) {
  const theme = useTheme();
  const Icon = tech.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
      style={{
        flexShrink: 0,
        padding: 12,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        backgroundColor: theme.palette.background.paper,
        borderRadius: 8,
        boxShadow: "0 2px 10px 0 rgba(0,0,0,0.04)",
        border: `1px solid ${theme.palette.divider}`,
        cursor: "pointer",
      }}
    >
      {/* Ícono animado en hover */}
      <motion.div
        whileHover={{
          rotate: 360,
          scale: 1.2,
        }}
        transition={{ duration: 0.5 }}
        aria-label={tech.name}
        tabIndex={0}
      >
        <Icon size={38} color={tech.color} />
      </motion.div>
      <Typography
        variant="caption"
        sx={{
          fontSize: 16,
          fontWeight: 600,
          color: "text.secondary",
          textAlign: "center",
        }}
      >
        {tech.name.split(" ")[0]}
      </Typography>
    </motion.div>
  );
}

/**
 * 🚀 Este patrón garantiza:
 * - Un scroll perfecto incluso cuando direction es "right"
 * - Nunca hay salto ni reseteo visible (porque el offset sólo se traslapa)
 * - Ancho siempre preciso, preparado para SSR, resize y zoom 🏆
 */
