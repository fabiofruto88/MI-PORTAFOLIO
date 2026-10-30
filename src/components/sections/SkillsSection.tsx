"use client";
import { Container, Stack, Typography } from "@mui/material";
import { SiN8N, SiReact, SiNextdotjs, SiJavascript, SiTypescript, SiGit, SiCss3, SiFastapi, SiOpencv } from "react-icons/si";
import { DiHtml5, DiMysql } from "react-icons/di";
import { FcAndroidOs } from "react-icons/fc";
import { FaAppStoreIos, FaBootstrap, FaPython } from "react-icons/fa";
import FramerMotionMarquee from "@/components/sections/FramerMotionMarquee";

const techStack1 = [
  { icon: SiReact, name: "React", color: "#61DAFB" },
  { icon: SiNextdotjs, name: "Next.js", color: "#000000" },
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
  { icon: SiFastapi, name: "FastAPI", color: "#009688" },
  { icon: DiMysql, name: "MySQL", color: "#4169E1" },
  { icon: SiGit, name: "Git", color: "#F05032" },
  { icon: FcAndroidOs, name: "Android OS", color: "#3DDC84" },
  { icon: SiOpencv, name: "OpenCV", color: "#5C3EE8" },
];

export default function SkillsSection() {
  return (
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
          component="h2"
          sx={{ fontWeight: 700, mb: 2, mt: 6, textAlign: "center" }}
        >
          HABILIDADES
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontSize: { xs: "1rem", md: "1.125rem" },
            mb: 2,
            color: "text.secondary",
            textAlign: "center",
          }}
        >
          Experiencia en tecnologías modernas y herramientas de desarrollo
        </Typography>
        <FramerMotionMarquee technologies={techStack1} />
        <FramerMotionMarquee direction="right" technologies={techStack2} />
      </Container>
    </Stack>
  );
}
