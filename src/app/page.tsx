"use client";
import HeroSectionImage from "@/components/sections/HeroSectionImage";
import {
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
} from "react-icons/si";
import { DiHtml5, DiMysql } from "react-icons/di";
import { FcAndroidOs } from "react-icons/fc";
import {
  FaAngular,
  FaAppStoreIos,
  FaBootstrap,
  FaPython,
} from "react-icons/fa";

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
  ];
  const techStack2 = [
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

  return (
    <>
      <Container maxWidth="xl" sx={{ py: 8, px: 0 }}>
        <Grid container spacing={{ xs: 1, md: 0 }} sx={{ minHeight: "80dvh" }}>
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
              {/*  <Typography
                variant="h1"
                sx={{
                  fontWeight: 700,
                }}
              >
                Desarrollo de apps{" "}
                <Typography
                  component="span"
                  color="primary"
                  variant="h1"
                  sx={{ fontStyle: "oblique" }}
                >
                  impactantes
                </Typography>
              </Typography> */}
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
                  mb: 2,
                  color: theme.palette.text.secondary,
                  textAlign: "justify",
                }}
              >
                Convierto tu visión en aplicaciones web y móviles funcionales.
                Especializado en React y React Native para desarrollar productos
                digitales escalables que tu negocio necesita. Desde prototipos
                hasta apps publicadas: arquitecturas limpias, código mantenible,
                proyectos con impacto real
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
        <Stack>
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
        </Stack>
      </Container>
    </>
  );
}
