// src/layouts/components/Footer.tsx
"use client";

import {
  Box,
  Container,
  Grid,
  IconButton,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import NextLink from "next/link";
import {
  FaEnvelope,
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaTiktok,
} from "react-icons/fa";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      {new Date().getFullYear()}{" "}
      <Link component={NextLink} color="inherit" href="/">
        Fabio Fruto
      </Link>
      . Todos los derechos reservados.
    </Typography>
  );
}

const socialLinks = [
  {
    label: "GitHub",
    icon: <FaGithub size={32} />,
    href: "https://github.com/fabiofruto88",
  },
  {
    label: "LinkedIn",
    icon: <FaLinkedin size={32} />,
    href: "https://www.linkedin.com/in/fabio-fruto-jimenez/",
  },
  {
    label: "Instagram",
    icon: <FaInstagram size={32} />,
    href: "https://www.instagram.com/fabiofruto8/",
  },
  {
    label: "TikTok",
    icon: <FaTiktok size={32} />,
    href: "https://www.tiktok.com/@koodi0808",
  },
];

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "background.paper",
        borderTop: "1px solid",
        borderColor: "divider",
        py: { xs: 2, md: 2 },
        mt: "auto",
        width: "100%",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Container maxWidth={false} sx={{ px: { xs: 4, md: 8 } }}>
        <Grid
          container
          spacing={2}
          alignItems="center"
          justifyContent="space-between"
        >
          {/* Section 1: Brand & Contact */}
          <Grid size={{ xs: 12, md: 6, lg: 5 }}>
            <Stack spacing={2} sx={{ textAlign: { xs: "center", md: "left" } }}>
              <Box>
                <Typography
                  variant="h3"
                  component="h2"
                  color="text.primary"
                  sx={{
                    fontWeight: 800,
                    letterSpacing: "-0.03em",
                    mb: 1,
                  }}
                >
                  Fabio Fruto
                </Typography>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{
                    fontSize: "0.95rem",
                    lineHeight: 1.6,
                    maxWidth: { xs: "100%", md: 500 },
                    mx: { xs: "auto", md: 0 },
                  }}
                >
                  Transformo ideas en soluciones digitales de alto impacto.
                  Especializado en desarrollo web, interfaces intuitivas y
                  arquitecturas escalables que potencian el crecimiento de tu
                  negocio.
                </Typography>
              </Box>

              <Link
                href="mailto:fabiofruto3@gmail.com"
                color="text.primary"
                underline="none"
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: { xs: "center", md: "flex-start" },
                  gap: 1.5,
                  fontSize: "1.2rem",
                  fontWeight: 600,
                  transition: "color 0.2s",
                  "&:hover": { color: "primary.main" },
                }}
              >
                <FaEnvelope size={24} /> fabiofruto3@gmail.com
              </Link>
            </Stack>
          </Grid>

          {/* Section 2: Social Icons (Big & Bold) */}
          <Grid size={{ xs: 12, md: 6, lg: 5 }}>
            <Stack
              direction="row"
              spacing={1.5}
              justifyContent={{ xs: "center", md: "flex-end" }}
              flexWrap="wrap"
            >
              {socialLinks.map((item) => (
                <IconButton
                  key={item.label}
                  component="a"
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.label}
                  sx={{
                    p: 1.5,
                    color: "text.primary",
                    border: "1px solid",
                    borderColor: "divider",
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    "&:hover": {
                      color: "primary.main",
                      borderColor: "primary.main",
                      transform: "translateY(-4px)",
                      bgcolor: "action.hover",
                    },
                  }}
                >
                  {item.icon}
                </IconButton>
              ))}
            </Stack>
          </Grid>
        </Grid>

        <Box
          sx={{
            mt: { xs: 4, md: 6 },
            pt: 3,
            borderTop: "1px solid",
            borderColor: "divider",
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Copyright />
        </Box>
      </Container>
    </Box>
  );
}
