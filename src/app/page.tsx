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
import { SiReact } from "react-icons/si";

export default function Home() {
  const theme = useTheme();

  return (
    <>
      <Container maxWidth="xl" sx={{ py: 8 }}>
        <Grid container spacing={0} sx={{ minHeight: "80dvh" }}>
          <Grid size={{ xs: 12, md: 7 }}>
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
          <Grid size={{ xs: 12, md: 5 }} sx={{ overflow: "hidden" }}>
            <HeroSectionImage />
          </Grid>
        </Grid>
        <FramerMotionMarquee />
        <FramerMotionMarquee
          direction="right"
          speed={50}
          technologies={[{ icon: SiReact, name: "React", color: "#61DAFB" }]}
        />
      </Container>
    </>
  );
}
