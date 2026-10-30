"use client";
import { Container, Grid, Stack, Typography } from "@mui/material";
import {
  SiFastapi,
  SiJavascript,
  SiMui,
  SiN8N,
  SiNodedotjs,
  SiOpenai,
  SiPostgresql,
  SiPython,
  SiReact,
  SiReacthookform,
  SiTelegram,
  SiTypescript,
} from "react-icons/si";
import ProjectCard, {
  type ProjectCardProps,
} from "@/components/common/ProjectCard";
import SectionEyebrow from "@/components/common/SectionEyebrow";

const react = { icon: SiReact, name: "React", color: "#61DAFB" };
const mui = { icon: SiMui, name: "Material UI", color: "#007FFF" };
const python = { icon: SiPython, name: "Python", color: "#3776AB" };
const typescript = { icon: SiTypescript, name: "TypeScript", color: "#3178C6" };

const projects: ProjectCardProps[] = [
  {
    imageUrl: "/images/unisecure-home.webp",
    roleChip: "FULL STACK",
    domainChip: "IA",
    badgeText: "UniSecure",
    title: "Sistema de Control de Acceso Universitario",
    description: (
      <>
        Plataforma integral de seguridad con{" "}
        <strong>Reconocimiento Facial y LPR</strong> (Lectura de Placas).
        Gestión de roles (Estudiantes, Profesores, Admin) y reportes de ingreso
        en tiempo real.
      </>
    ),
    technologies: [
      react,
      { icon: SiFastapi, name: "FastAPI", color: "#009688" },
      mui,
      python,
    ],
    demoUrl: "https://unisecure-front.vercel.app/",
    githubUrl: "https://github.com/fabiofruto88/unisecure",
  },
  {
    imageUrl: "/images/medisecure.webp",
    roleChip: "FRONTEND",
    domainChip: "IA",
    badgeText: "MediSecure",
    title: "Sistema de Control de Acceso Hospitalario",
    description: (
      <>
        Plataforma avanzada de seguridad para hospitales con{" "}
        <strong>Reconocimiento Facial y LPR</strong> (Lectura de Placas
        Vehiculares). Protección de áreas críticas, gestión de roles (médicos,
        personal, visitantes) y monitoreo de accesos en tiempo real.
      </>
    ),
    technologies: [
      react,
      mui,
      { icon: SiNodedotjs, name: "Node.js", color: "#339933" },
      python,
    ],
    demoUrl: "https://medisecure-front-gq4c.vercel.app/",
    githubUrl: "https://github.com/fabiofruto88/medisecure-front",
  },
  {
    imageUrl: "/images/umami.webp",
    roleChip: "FRONTEND",
    domainChip: "MARKETING",
    badgeText: "Umami Landing",
    title: "Landing Page para Marca Gastronómica",
    description: (
      <>
        Landing moderna enfocada en <strong>presentación de marca</strong> y{" "}
        <strong>conversión</strong>, con secciones de propuesta de valor,
        servicios/menú, testimonios y llamados a la acción. Diseño{" "}
        <strong>responsive</strong> y UI consistente para una experiencia
        rápida y clara.
      </>
    ),
    technologies: [react, typescript, mui],
    demoUrl: "https://umami-beta-rust-21.vercel.app/",
    githubUrl: "https://github.com/fabiofruto88/umami-landing-front",
  },
  {
    imageUrl: "/images/vaova.webp",
    roleChip: "FRONTEND",
    domainChip: "TECHNICAL TEST",
    badgeText: "VAOVA",
    title: "Gestión de Hoteles (Prueba Técnica)",
    description: (
      <>
        Prueba técnica desarrollada para{" "}
        <strong>demostrar habilidades Frontend</strong> y{" "}
        <strong>buenas prácticas</strong> (arquitectura escalable, tipado con
        TypeScript y componentes reutilizables). Incluye{" "}
        <strong>auth con roles</strong>, CRUD de hoteles/habitaciones y
        galería, con UI <strong>responsive</strong> en Material UI y
        persistencia simulada en LocalStorage.
      </>
    ),
    technologies: [
      react,
      typescript,
      mui,
      { icon: SiReacthookform, name: "Hook Form", color: "#EC5990" },
    ],
    demoUrl: "https://vaova-prueba-tecnica-ts.vercel.app/",
    githubUrl: "https://github.com/fabiofruto88/vaova-prueba-tecnica-ts",
  },
  {
    imageUrl: "/images/quiz.webp",
    roleChip: "FRONTEND",
    domainChip: "Web APP",
    badgeText: "QUIZ APP",
    title: "Quiz Interactivo Personalizable",
    description: (
      <>
        Aplicación de <strong>quiz interactivo</strong> donde puedes practicar
        y subir tus propias preguntas en formato JSON. Incluye{" "}
        <strong>temporizador</strong>, <strong>historial de resultados</strong>
        , opción de <strong>saltar preguntas</strong> y{" "}
        <strong>UI moderna</strong> con Material UI. Permite personalizar el
        número de preguntas y practicar con diferentes temáticas.
      </>
    ),
    technologies: [
      react,
      mui,
      { icon: SiJavascript, name: "JavaScript", color: "#F7DF1E" },
    ],
    demoUrl: "https://quiz-ten-taupe.vercel.app/",
    githubUrl: "https://github.com/fabiofruto88/quiz",
  },
  {
    imageUrl: "/images/rag.webp",
    roleChip: "N8N",
    domainChip: "Automatización",
    badgeText: "RAG BOT",
    title: "RAG en n8n: Bot de Telegram con PGVector + Google Drive",
    description: (
      <>
        Bot en <strong>n8n</strong> con <strong>RAG</strong> para responder en{" "}
        <strong>Telegram</strong> usando documentos de{" "}
        <strong>Google Drive</strong>. Procesa y vectoriza archivos con{" "}
        <strong>OpenAI Embeddings</strong> en <strong>Postgres (PGVector)</strong>
        , incluye deduplicación y sanitización HTML.
      </>
    ),
    technologies: [
      { icon: SiN8N, name: "n8n", color: "#EA4B71" },
      { icon: SiPostgresql, name: "PostgreSQL", color: "#4169E1" },
      { icon: SiOpenai, name: "OpenAI", color: "#000000" },
      { icon: SiTelegram, name: "Telegram Bot API", color: "#26A5E4" },
    ],
    demoUrl: "https://youtu.be/Yrtntm9BK0g?si=pxkBieC9oRgya4VS",
    githubUrl: "https://github.com/fabiofruto88/prueba-tenica-n8n-2025",
  },
];

export default function ProjectsSection() {
  return (
    <Stack
      minHeight="60dvh"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        py: 4,
        bgcolor: "background.paper",
      }}
      id="proyectos"
    >
      <SectionEyebrow>Portafolio Seleccionado</SectionEyebrow>
      <Typography variant="h4" component="h2" sx={{ fontWeight: 700, mb: 5 }}>
        Proyectos personales
      </Typography>
      <Container maxWidth="xl">
        <Grid container spacing={{ xs: 1, md: 2 }}>
          {projects.map((project) => (
            <Grid key={project.badgeText} size={{ xs: 12, sm: 6, md: 4 }}>
              <ProjectCard {...project} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Stack>
  );
}
