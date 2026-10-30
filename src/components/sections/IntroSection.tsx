"use client";
import {
  Button,
  Container,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { FaGithub } from "react-icons/fa";
import { BsInstagram, BsLinkedin } from "react-icons/bs";
import HeroSectionImage from "@/components/sections/HeroSectionImage";

const socialLinks = [
  {
    label: "GitHub de Fabio Fruto",
    href: "https://github.com/fabiofruto88",
    icon: FaGithub,
  },
  {
    label: "LinkedIn de Fabio Fruto",
    href: "https://www.linkedin.com/in/fabio-fruto-jimenez/",
    icon: BsLinkedin,
  },
  {
    label: "Instagram de Fabio Fruto",
    href: "https://www.instagram.com/fabiofruto8/",
    icon: BsInstagram,
  },
];

export default function IntroSection() {
  return (
    <Stack
      id="inicio"
      sx={{
        minHeight: "80dvh",
        bgcolor: "background.paper",
        justifyContent: "center",
        alignContent: "center",
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={{ xs: 1, md: 0 }}>
          <Grid size={{ xs: 12, md: 7 }} order={{ xs: 2, sm: 1 }}>
            <Stack
              justifyContent="center"
              alignItems="flex-start"
              sx={{ height: "100%", p: 3 }}
            >
              <Typography variant="h1" sx={{ fontWeight: 700 }}>
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
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontSize: { xs: "1rem", md: "1.125rem" },
                  mb: 5,
                  color: "text.secondary",
                  textAlign: "justify",
                }}
              >
                Convierto tu visión en aplicaciones web y móviles funcionales.
                Especializado en React y React Native para desarrollar
                productos digitales escalables que tu negocio necesita. Desde
                prototipos hasta apps publicadas: arquitecturas limpias, código
                mantenible, proyectos con impacto real
              </Typography>
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={5}
                justifyContent="center"
                alignItems="center"
                display="flex"
                width="100%"
              >
                <Button
                  variant="outlined"
                  sx={{
                    fontWeight: 700,
                    color: "text.primary",
                    border: "2px solid",
                    borderColor: "text.primary",
                    borderRadius: 2,
                    px: { xs: 2, sm: 3 },
                    py: { xs: 1, sm: 2 },
                    width: { xs: "100%", sm: "auto" },
                    fontSize: { xs: "0.9rem", sm: "1rem" },
                  }}
                  href="https://drive.google.com/file/d/1uMMmJpeAWHsTrnZ_coLa1RzXHnzG9Keh/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Descargar CV
                </Button>

                {socialLinks.map(({ label, href, icon: Icon }) => (
                  <IconButton
                    key={href}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    sx={{ width: 50, height: 50, p: 0, color: "text.primary" }}
                  >
                    <Icon size={50} />
                  </IconButton>
                ))}
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
  );
}
