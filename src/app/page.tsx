"use client";
import HeroSectionImage from "@/components/sections/HeroSectionImage";
import {
  Box,
  Container,
  Grid,
  IconButton,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { FaGithub } from "react-icons/fa";
import { BsInstagram, BsLinkedin } from "react-icons/bs";
import FramerMotionMarquee from "@/components/sections/FramerMotionMarquee";
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
  SiN8N,
  SiVite,
  SiPython,
  SiReacthookform,
  SiPostgresql,
  SiOpenai,
  SiGooglecloud,
  SiTelegram,
} from "react-icons/si";
import { DiHtml5, DiMysql } from "react-icons/di";
import { FcAndroidOs } from "react-icons/fc";
import {
  FaAngular,
  FaAppStoreIos,
  FaBootstrap,
  FaPython,
} from "react-icons/fa";
import CardServices from "@/components/common/CardServices";
import { MdRocketLaunch, MdShoppingCart, MdWeb } from "react-icons/md";
import { HiOutlineDevicePhoneMobile } from "react-icons/hi2";
import {
  ExperienceTimeline,
  ExperienceTimelineItem,
} from "@/components/common/ExperienceTimeline";
import ProjectCard from "@/components/common/ProjectCard";
import RecognitionsSection from "@/components/sections/RecognitionsSection";
import ContactSection from "@/components/sections/ContactSection";

export default function Home() {
  const theme = useTheme();
  const techStack1 = [
    { icon: SiReact, name: "React", color: "#61DAFB" },
    { icon: SiNextdotjs, name: "Next.js", color: "#000000" },
    { icon: FaAngular, name: "Angular", color: "#DD0031" },
    { icon: DiHtml5, name: "HTML5", color: "#E34F26" },
    { icon: SiCss3, name: "CSS3", color: "#2965F1" },
    { icon: SiJavascript, name: "JavaScript", color: "#F7DF1E" },
    { icon: SiTypescript, name: "TypeScript", color: "#3178C6" },
    { icon: FaPython, name: "Python", color: "#3776AB" },
    { icon: FaAppStoreIos, name: "iOS", color: "#2965F1" },
    { icon: FaBootstrap, name: "Bootstrap", color: "#7952B3" },
  ];
  const techStack2 = [
    { icon: SiN8N, name: "n8n", color: "#eb5175" },
    { icon: SiNodedotjs, name: "Node.js", color: "#339933" },
    { icon: SiExpress, name: "Express", color: "#000000" },
    { icon: SiFastapi, name: "FastAPI", color: "#009688" },
    { icon: DiMysql, name: "MySQL", color: "#4169E1" },
    { icon: SiFirebase, name: "Firebase", color: "#FFCA28" },
    { icon: SiGit, name: "Git", color: "#F05032" },
    { icon: SiDocker, name: "Docker", color: "#2496ED" },
    { icon: FcAndroidOs, name: "Android OS", color: "#3DDC84" },
    { icon: SiOpencv, name: "OpenCV", color: "#5C3EE8" },
  ];
  const experienceItems: ExperienceTimelineItem[] = [
    {
      id: "exp-1",
      company: "Freelance",
      role: "Desarrollador Frontend & Mobile",
      period: "2022 — PRESENTE",
      bullets: [
        "Desarrollo de soluciones web y móviles personalizadas con React.js, Next.js y React Native para diversos clientes y proyectos académicos.",
        "Implementación de arquitecturas escalables, integración de APIs REST y optimización de rendimiento en aplicaciones multiplataforma.",
      ],
    },
    {
      id: "exp-2",
      company: "Institución Universitaria de Barranquilla en Territorios",
      role: "Docente Catedrático – Fundamentos de Programación",
      period: "ENERO 2026 — PRESENTE",
      bullets: [
        "Impartición de Fundamentos de Programación enfocada en análisis de problemas, diseño de algoritmos y estructuras de control.",
        "Formación orientada a la automatización de tareas y optimización de procesos, fortaleciendo habilidades clave para la ingeniería.",
      ],
    },
    {
      id: "exp-3",
      company: "CCorbit S.A.S",
      role: "Desarrollador Frontend",
      period: "MAYO 2024 — OCTUBRE 2025",
      bullets: [
        "Desarrollo de aplicaciones web y móviles con React.js, Next.js y React Native, implementando SSR, SSG y optimización de rendimiento.",
        "Construcción de componentes reutilizables con Material UI y participación en proyectos publicados en Google Play Store y App Store.",
      ],
    },
    {
      id: "exp-4",
      company: "REDSIS",
      role: "Técnico en Sistemas",
      period: "FEBRERO 2023 — JULIO 2023",
      bullets: [
        "Diagnóstico y reparación de dispositivos electrónicos (escáneres POS, impresoras térmicas, computadores).",
        "Instalación de sistemas operativos y gestión de inventario de repuestos mediante software RedsisLAB.",
      ],
    },
  ];
  const educationItems: ExperienceTimelineItem[] = [
    {
      id: "edu-1",
      company: "Universidad de Barranquilla (IUB)",
      role: "Tecnología en Gestión de Sistemas Informáticos",
      period: "2023 — 2025",
      bullets: [
        "Programa con Acreditación de Alta Calidad.",
        "Formación especializada en diseño, desarrollo, configuración y administración de sistemas de información y computación bajo criterios de productividad y desarrollo sostenible.",
        "Competencias en arquitectura de software, bases de datos, desarrollo web/móvil, redes de computadores y gestión de proyectos tecnológicos.",
        "Participación activa en semilleros",
      ],
    },
    {
      id: "edu-2",
      company: "Universidad de Barranquilla (IUB)",
      role: "Técnico Profesional en Mantenimiento de Sistemas Informáticos",
      period: "2020 — 2023",
      bullets: [
        "Programa con Acreditación de Alta Calidad, formando técnicos profesionales capacitados en instalación, programación y mantenimiento de sistemas informáticos.",
        "Desarrollo de competencias en soporte técnico, administración de bases de datos, montaje y mantenimiento de redes de computadores.",
        "Formación práctica en diagnóstico y solución de problemas en infraestructura tecnológica empresarial.",
      ],
    },
    {
      id: "edu-3",
      company: "SENA - Servicio Nacional de Aprendizaje",
      role: "Técnico en Sistemas",
      period: "2020",
      bullets: [
        "Formación técnica profesional en tecnologías de la información y comunicaciones.",
        "Desarrollo de habilidades prácticas en mantenimiento de equipos y soporte técnico.",
      ],
    },
    {
      id: "edu-4",
      company: "Institución Técnica Microempresarial de Soledad (INTEMISOL)",
      role: "Bachiller Técnico",
      period: "2020",
      bullets: [
        "Educación media con énfasis técnico empresarial.",
        "Formación integral que combinó competencias académicas con habilidades técnicas y emprendimiento.",
      ],
    },
  ];
  return (
    <>
      {/*inicio  */}
      <Stack
        id="inicio"
        sx={{ minHeight: "80dvh", bgcolor: theme.palette.background.paper }}
      >
        <Container maxWidth="xl">
          <Grid container spacing={{ xs: 1, md: 0 }}>
            <Grid size={{ xs: 12, md: 7 }} order={{ xs: 2, sm: 1 }}>
              <Stack
                justifyContent="center"
                alignItems="flex-start"
                sx={{ height: "100%", p: 3 }}
              >
                <Typography
                  variant="h1"
                  sx={{
                    fontWeight: 700,
                  }}
                >
                  Fabio Fruto Jimenez
                </Typography>
                <Typography
                  variant="h2"
                  sx={{
                    fontWeight: 500,
                    fontSize: { xs: "1.25rem", sm: "1.5rem", md: "2rem" },
                    mb: 2,
                  }}
                >
                  Desarrollador Software | Creando soluciones digitales
                  innovadoras
                </Typography>{" "}
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: { xs: "1rem", md: "1.125rem" },
                    mb: 5,
                    color: theme.palette.text.secondary,
                    textAlign: "justify",
                  }}
                >
                  Convierto tu visión en aplicaciones web y móviles funcionales.
                  Especializado en React y React Native para desarrollar
                  productos digitales escalables que tu negocio necesita. Desde
                  prototipos hasta apps publicadas: arquitecturas limpias,
                  código mantenible, proyectos con impacto real
                </Typography>
                <Stack
                  direction="row"
                  spacing={5}
                  justifyContent="center"
                  justifyItems="center"
                  alignItems="center"
                  display="flex"
                  width="100%"
                >
                  <IconButton
                    sx={{ width: 50, height: 50, p: 0 }}
                    href="https://github.com/fabiofruto88"
                  >
                    <FaGithub size={50} color={theme.palette.text.primary} />
                  </IconButton>
                  <IconButton
                    sx={{ width: 50, height: 50, p: 0 }}
                    href="https://www.linkedin.com/in/fabio-fruto-jimenez/"
                  >
                    <BsLinkedin size={50} color={theme.palette.text.primary} />
                  </IconButton>
                  <IconButton
                    sx={{ width: 50, height: 50, p: 0 }}
                    href="https://www.instagram.com/fabiofruto8/"
                  >
                    <BsInstagram size={50} color={theme.palette.text.primary} />
                  </IconButton>
                </Stack>
              </Stack>
            </Grid>
            <Grid
              size={{ xs: 12, md: 5 }}
              sx={{ overflow: "hidden" }}
              order={{ xs: 1, sm: 2 }}
            >
              <HeroSectionImage />
            </Grid>
          </Grid>
        </Container>
      </Stack>
      {/* habilidades */}
      <Stack
        sx={{
          minHeight: "50dvh",
          justifyContent: "center",
          alignContent: "center",
        }}
        id="habilidades"
      >
        <Container maxWidth="xl">
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              mb: 2,
              mt: 6,
              textAlign: "center",
            }}
          >
            HABILIDADES
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontSize: { xs: "1rem", md: "1.125rem" },
              mb: 2,
              color: theme.palette.text.secondary,
              textAlign: "center",
            }}
          >
            Experiencia en tecnologías modernas y herramientas de desarrollo
          </Typography>
          <FramerMotionMarquee technologies={techStack1} />
          <FramerMotionMarquee direction="right" technologies={techStack2} />
        </Container>
      </Stack>
      {/* servicios */}
      <Stack
        p={1}
        my={{ xs: 3, md: 1 }}
        sx={{
          minHeight: "80dvh",
          justifyContent: "center",
          alignContent: "center",
          bgcolor: theme.palette.background.paper,
        }}
        id="servicios"
      >
        <Container maxWidth="xl" sx={{}}>
          <Typography
            variant="body2"
            sx={{
              color: "primary.main",
              letterSpacing: "0.11em", // Espaciado entre letras (mayúsculas)
              fontWeight: 700, // Negrita
              fontSize: 14, // Tamaño personalizado
              textTransform: "uppercase", // Mayúsculas
              display: "block", // Ocupa todo el ancho
            }}
          >
            Servicios de Desarrollo
          </Typography>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
            }}
          >
            Ingeniería de software a medida
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontSize: { xs: "1rem", md: "1.125rem" },
              mb: 6,
              color: theme.palette.text.secondary,
            }}
          >
            Soluciones digitales robustas construidas con las tecnologías más
            modernas y estándares de la industria.
          </Typography>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <CardServices
                icon={MdWeb}
                title="Desarrollo Web"
                description="Sistemas modernos y escalables con React y Next.js, enfocados en performance y SEO técnico."
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <CardServices
                icon={MdRocketLaunch}
                title="Landing Pages"
                description="Landing pages optimizadas para conversión, con tiempos de carga ultra rápidos y diseño premium."
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <CardServices
                icon={HiOutlineDevicePhoneMobile}
                title="Apps Android & iOS"
                description="Desarrollo nativo y multiplataforma con React Native"
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <CardServices
                icon={MdShoppingCart}
                title="Servicios E-commerce"
                description="Tiendas online completas, pasarelas de pago seguras y gestión avanzada de inventario."
              />
            </Grid>
          </Grid>
        </Container>
      </Stack>
      {/* experiencia */}
      <Stack
        id="experiencia"
        minHeight="100dvh"
        spacing={2}
        alignItems="center"
        px={1}
        py={4}
      >
        <Typography
          variant="body2"
          sx={{
            color: "primary.main",
            letterSpacing: "0.11em", // Espaciado entre letras (mayúsculas)
            fontWeight: 700, // Negrita
            fontSize: 14, // Tamaño personalizado
            textTransform: "uppercase", // Mayúsculas
            display: "block", // Ocupa todo el ancho
          }}
        >
          Trayectoria
        </Typography>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            fontSize: { xs: 22, sm: 24, md: 26 },
          }}
        >
          Experiencia Profesional
        </Typography>
        <ExperienceTimeline items={experienceItems} />
        <Typography
          variant="body2"
          sx={{
            color: "primary.main",
            letterSpacing: "0.11em", // Espaciado entre letras (mayúsculas)
            fontWeight: 700, // Negrita
            fontSize: 14, // Tamaño personalizado
            textTransform: "uppercase", // Mayúsculas
            display: "block", // Ocupa todo el ancho
          }}
        >
          Trayectoria
        </Typography>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            fontSize: { xs: 22, sm: 24, md: 26 },
          }}
        >
          Educación
        </Typography>
        <ExperienceTimeline items={educationItems} />
      </Stack>
      {/* Proyectos */}
      <Stack
        minHeight="60dvh"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          py: 4,
          bgcolor: theme.palette.background.paper,
        }}
        id="proyectos"
      >
        <Typography
          variant="body2"
          sx={{
            color: "primary.main",
            letterSpacing: "0.11em", // Espaciado entre letras (mayúsculas)
            fontWeight: 700, // Negrita
            fontSize: 14, // Tamaño personalizado
            textTransform: "uppercase", // Mayúsculas
            display: "block", // Ocupa todo el ancho
          }}
        >
          Portafolio Seleccionado
        </Typography>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            mb: 5,
          }}
        >
          Proyectos personales
        </Typography>
        <Container maxWidth="xl">
          <Grid container spacing={{ xs: 1, md: 2 }}>
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <ProjectCard
                imageUrl="/images/unisecure-home.webp" // Make sure you have a screenshot of Unisecure here
                roleChip="FULL STACK"
                domainChip="IA"
                badgeText="UniSecure"
                title="Sistema de Control de Acceso Universitario"
                description={
                  <>
                    Plataforma integral de seguridad con{" "}
                    <strong>Reconocimiento Facial y LPR</strong> (Lectura de
                    Placas). Gestión de roles (Estudiantes, Profesores, Admin) y
                    reportes de ingreso en tiempo real.
                  </>
                }
                technologies={[
                  { icon: SiReact, name: "React", color: "#61DAFB" },
                  { icon: SiFastapi, name: "FastAPI", color: "#009688" },
                  { icon: SiMui, name: "Material UI", color: "#007FFF" },
                  { icon: SiPython, name: "Python", color: "#3776AB" },
                ]}
                demoUrl="https://unisecure-front.vercel.app/"
                githubUrl="https://github.com/fabiofruto88/unisecure"
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <ProjectCard
                imageUrl="/images/medisecure.webp" // Usa una imagen relevante del demo de MediSecure
                roleChip="FRONTEND"
                domainChip="IA"
                badgeText="MediSecure"
                title="Sistema de Control de Acceso Hospitalario"
                description={
                  <>
                    Plataforma avanzada de seguridad para hospitales con{" "}
                    <strong>Reconocimiento Facial y LPR</strong> (Lectura de
                    Placas Vehiculares). Protección de áreas críticas, gestión
                    de roles (médicos, personal, visitantes) y monitoreo de
                    accesos en tiempo real.
                  </>
                }
                technologies={[
                  { icon: SiReact, name: "React", color: "#61DAFB" },
                  { icon: SiMui, name: "Material UI", color: "#007FFF" },
                  { icon: SiNodedotjs, name: "Node.js", color: "#339933" },
                  { icon: SiPython, name: "Python", color: "#3776AB" },
                ]}
                demoUrl="https://medisecure-front-gq4c.vercel.app/" // Actualiza con la URL de demo si tienes una
                githubUrl="https://github.com/fabiofruto88/medisecure-front" // Actualiza con tu repo real
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <ProjectCard
                imageUrl="/images/umami.webp"
                roleChip="FRONTEND"
                domainChip="MARKETING"
                badgeText="Umami Landing"
                title="Landing Page para Marca Gastronómica"
                description={
                  <>
                    Landing moderna enfocada en{" "}
                    <strong>presentación de marca</strong> y{" "}
                    <strong>conversión</strong>, con secciones de propuesta de
                    valor, servicios/menú, testimonios y llamados a la acción.
                    Diseño <strong>responsive</strong> y UI consistente para una
                    experiencia rápida y clara.
                  </>
                }
                technologies={[
                  { icon: SiReact, name: "React", color: "#61DAFB" },
                  { icon: SiTypescript, name: "TypeScript", color: "#3178C6" },
                  { icon: SiMui, name: "Material UI", color: "#007FFF" },
                ]}
                demoUrl="https://umami-beta-rust-21.vercel.app/"
                githubUrl="https://github.com/fabiofruto88/umami-landing-front"
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <ProjectCard
                imageUrl="/images/vaova.webp"
                roleChip="FRONTEND"
                domainChip="TECHNICAL TEST"
                badgeText="VAOVA"
                title="Gestión de Hoteles (Prueba Técnica)"
                description={
                  <>
                    Prueba técnica desarrollada para{" "}
                    <strong>demostrar habilidades Frontend</strong> y{" "}
                    <strong>buenas prácticas</strong> (arquitectura escalable,
                    tipado con TypeScript y componentes reutilizables). Incluye{" "}
                    <strong>auth con roles</strong>, CRUD de
                    hoteles/habitaciones y galería, con UI{" "}
                    <strong>responsive</strong> en Material UI y persistencia
                    simulada en LocalStorage.
                  </>
                }
                technologies={[
                  { icon: SiReact, name: "React", color: "#61DAFB" },
                  { icon: SiTypescript, name: "TypeScript", color: "#3178C6" },
                  { icon: SiMui, name: "Material UI", color: "#007FFF" },
                  {
                    icon: SiReacthookform,
                    name: "Hook Form",
                    color: "#EC5990",
                  },
                ]}
                demoUrl="https://vaova-prueba-tecnica-ts.vercel.app/"
                githubUrl="https://github.com/fabiofruto88/vaova-prueba-tecnica-ts"
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <ProjectCard
                imageUrl="/images/quiz.webp"
                roleChip="FRONTEND"
                domainChip="Web APP"
                badgeText="QUIZ APP"
                title="Quiz Interactivo Personalizable"
                description={
                  <>
                    Aplicación de <strong>quiz interactivo</strong> donde puedes
                    practicar y subir tus propias preguntas en formato JSON.
                    Incluye <strong>temporizador</strong>,{" "}
                    <strong>historial de resultados</strong>, opción de{" "}
                    <strong>saltar preguntas</strong> y{" "}
                    <strong>UI moderna</strong> con Material UI. Permite
                    personalizar el número de preguntas y practicar con
                    diferentes temáticas.
                  </>
                }
                technologies={[
                  { icon: SiReact, name: "React", color: "#61DAFB" },
                  { icon: SiMui, name: "Material UI", color: "#007FFF" },
                  { icon: SiJavascript, name: "JavaScript", color: "#F7DF1E" },
                ]}
                demoUrl="https://quiz-ten-taupe.vercel.app/"
                githubUrl="https://github.com/fabiofruto88/quiz"
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <ProjectCard
                imageUrl="/images/rag.webp"
                roleChip="N8N"
                domainChip="Automatización"
                badgeText="RAG BOT"
                title="RAG en n8n: Bot de Telegram con PGVector + Google Drive"
                description={
                  <>
                    Bot en <strong>n8n</strong> con <strong>RAG</strong> para
                    responder en <strong>Telegram</strong> usando documentos de{" "}
                    <strong>Google Drive</strong>. Procesa y vectoriza archivos
                    con <strong>OpenAI Embeddings</strong> en{" "}
                    <strong>Postgres (PGVector)</strong>, incluye deduplicación
                    y sanitización HTML.
                  </>
                }
                technologies={[
                  { icon: SiN8N, name: "n8n", color: "#EA4B71" },
                  { icon: SiPostgresql, name: "PostgreSQL", color: "#4169E1" },
                  { icon: SiOpenai, name: "OpenAI", color: "#000000" },

                  {
                    icon: SiTelegram,
                    name: "Telegram Bot API",
                    color: "#26A5E4",
                  },
                ]}
                demoUrl="https://youtu.be/Yrtntm9BK0g?si=pxkBieC9oRgya4VS"
                githubUrl="https://github.com/fabiofruto88/prueba-tenica-n8n-2025"
              />
            </Grid>
          </Grid>
        </Container>
      </Stack>
      {/* reconocimientos */}
      <RecognitionsSection />
      {/* contacto */}
      <ContactSection />
    </>
  );
}
