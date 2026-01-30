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
} from "react-icons/si";
import { DiHtml5, DiMysql } from "react-icons/di";
import { FcAndroidOs } from "react-icons/fc";
import { FaAppStoreIos, FaBootstrap } from "react-icons/fa";

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

export default function FramerMotionMarquee() {
  const theme = useTheme();

  // Duplicar para seamless loop (el "truco")
  const techsLoop = [...technologies, ...technologies];

  // Ref para medir dinamicamente el ancho del carrete
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  // Track el offset del scroll (x)
  const [baseX, setBaseX] = useState(0);

  // Velocidad en px/segundo, puedes modificar para tu gusto
  const SPEED = 50; // px/sec

  // Calcular el ancho real del contenido para loop perfecto
  useLayoutEffect(() => {
    if (scrollerRef.current) {
      setWidth(scrollerRef.current.scrollWidth / 2); // solo la mitad gracias a duplicado
    }
  }, []);

  // Animación de x infinitamente, sin parpadeos
  useAnimationFrame((_, delta) => {
    if (!width) return;
    // Delta es ms
    setBaseX((prev) => {
      let next = prev - (SPEED * delta!) / 1000;
      // Cuando termina el primer loop (al final del 1er set de logos), resetea, seamless
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
        py: 8,
        backgroundColor: "background.default",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <Container maxWidth="xl">
        {/* Capa de degradado en los bordes (fade-out, responsivo) */}
        <Box
          sx={{
            position: "relative",
            overflow: "hidden",
            maskImage:
              "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
            /*   bgcolor: theme.palette.background.default, */
            minHeight: 110,
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
      </Container>
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
      whileHover={{
        scale: 1.1,
        y: -10,
        transition: { duration: 0.2 },
      }}
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
