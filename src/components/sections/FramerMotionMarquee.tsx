"use client";

/**
 * Infinite Autoscroll Carousel (Marquee) con Framer Motion + MUI
 *
 * - 100% seamless, sin "salto" ni "parpadeos" en el bucle
 * - Usa cálculo dinámico del ancho del listado
 * - Reutiliza la referencia del contenedor para calcular movimiento
 * - Interpolación lineal, velocidad custom, duplicación seamless
 * - Responsivo y listo para producción
 *
 * NOTA:
 * El bug clásico del salto ocurre porque animas un % fijo y el contenido no
 * llena el espacio, causando "parpadeo". Aquí, el ancho y scroll se calculan
 * en tiempo real y la animación nunca se reinicia abruptamente.
 */

import React, { useRef, useLayoutEffect, useState } from "react";
import { Box, Container, Typography, Stack, useTheme } from "@mui/material";
import { motion, useAnimationFrame } from "framer-motion";
import {
  SiTailwindcss,
  SiRedux,
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
} from "react-icons/si";
import { DiHtml5, DiMysql } from "react-icons/di";
import { FcAndroidOs } from "react-icons/fc";
import {
  FaAngular,
  FaAppStoreIos,
  FaBootstrap,
  FaPython,
} from "react-icons/fa";

// =========================================
// Definición tecnológica (puedes extenderla)
// =========================================

interface Tech {
  icon: React.ElementType;
  name: string;
  color: string;
}

const technologies: Tech[] = [
  { icon: SiTailwindcss, name: "Tailwind CSS", color: "#06B6D4" },
  { icon: FaBootstrap, name: "Bootstrap", color: "#7952B3" },
  { icon: DiHtml5, name: "HTML5", color: "#E34F26" },
  { icon: SiCss3, name: "CSS3", color: "#2965F1" },
  { icon: SiMui, name: "MUI", color: "#007FFF" },
  { icon: SiRedux, name: "Redux", color: "#764ABC" },
  { icon: SiReact, name: "React.js", color: "#61DAFB" },
  { icon: SiNextdotjs, name: "Next.js", color: "#000000" },
  { icon: SiJavascript, name: "JavaScript", color: "#F7DF1E" },
  { icon: SiTypescript, name: "TypeScript", color: "#3178C6" },
  { icon: DiMysql, name: "MySQL", color: "#4169E1" },
  { icon: SiFirebase, name: "Firebase", color: "#FFCA28" },
  { icon: SiGit, name: "Git", color: "#F05032" },
  { icon: SiDocker, name: "Docker", color: "#2496ED" },
  { icon: SiNodedotjs, name: "Node.js", color: "#339933" },
  { icon: FcAndroidOs, name: "Android OS", color: "#3DDC84" },
  { icon: FaAppStoreIos, name: "iOS", color: "#2496ED" },
];

// =======================================================
// Componente Principal: Carousel infinito, auto-scroll
// =======================================================

export interface FramerMotionMarqueeProps {
  direction?: "left" | "right";
  technologies?: Tech[];
  speed?: number; // px/sec
}

const defaultTechnologies = [
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
];

const DEFAULT_SPEED = 50;

export default function FramerMotionMarquee({
  direction = "left",
  technologies = defaultTechnologies,
  speed = DEFAULT_SPEED,
}: FramerMotionMarqueeProps) {
  const theme = useTheme();
  // Duplicar para seamless loop (el "truco")
  const techsLoop = [...technologies, ...technologies];
  // Ref para medir dinamicamente el ancho del carrete
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  // Track el offset del scroll (x)
  const [baseX, setBaseX] = useState(0);

  // Calcular el ancho real del contenido para loop perfecto
  useLayoutEffect(() => {
    if (scrollerRef.current) {
      setWidth(scrollerRef.current.scrollWidth / 2); // solo la mitad gracias a duplicado
    }
  }, [technologies]);

  // Animación de x infinitamente, sin parpadeos
  useAnimationFrame((_, delta) => {
    if (!width) return;
    setBaseX((prev) => {
      let next =
        direction === "left"
          ? prev - (speed * delta!) / 1000
          : prev + (speed * delta!) / 1000;
      if (Math.abs(next) >= width) {
        next = 0;
      }
      return next;
    });
  });

  return (
    <Box
      sx={{
        width: "100%",
        py: 1,
        backgroundColor: "background.default",

        position: "relative",
      }}
    >
      {/* Capa de degradado en los bordes (fade-out, responsivo) */}
      <Box
        sx={{
          position: "relative",
          maskImage:
            "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          width: "100%",
          userSelect: "none",
          alignItems: "center",
          display: "flex",
        }}
      >
        <motion.div
          ref={scrollerRef}
          style={{
            display: "flex",
            gap: 32,
            willChange: "transform",
            transform: `translateX(${baseX}px)`,
          }}
        >
          {techsLoop.map((tech, index) => (
            <TechIconMotion
              key={index}
              tech={tech}
              index={index % technologies.length}
            />
          ))}
        </motion.div>
      </Box>
    </Box>
  );
}

// =======================================================
// Componente para cada icono (con microanimación y hover)
// =======================================================

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
      <motion.div
        whileHover={{
          rotate: 360,
          scale: 1.2,
        }}
        transition={{ duration: 0.5 }}
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
 * Este patrón elimina micro-parpadeos y reinicios abruptos en el loop, usando
 * la duplicación + cálculo real del ancho ocupado. Si agregas más ítems o cambias
 * el tamaño de los íconos, el efecto sigue siendo perfectamente infinito.
 */
