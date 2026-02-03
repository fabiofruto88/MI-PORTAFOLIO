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
      {/*     <Container maxWidth="xl" sx={{ py: 8, px: 1.5 }}> */}
      {/*sobre mi  */}
      <Stack
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
      <Stack minHeight="100dvh" spacing={2} alignItems="center" px={1} py={4}>
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
      {/*    </Container> */}
    </>
  );
}
