"use client";
import { Container, Link as MuiLink, Stack, Typography } from "@mui/material";
import NextLink from "next/link";
import SectionEyebrow from "@/components/common/SectionEyebrow";
import { aboutPage } from "@/data/site";

export default function AboutSection() {
  return (
    <Stack id="sobre-mi" sx={{ py: { xs: 6, md: 8 } }}>
      <Container maxWidth="md">
        <Stack spacing={2}>
          <SectionEyebrow>Sobre mí</SectionEyebrow>
          <Typography variant="h4" component="h2" sx={{ fontWeight: 700 }}>
            Desarrollador de software, docente y creador de automatizaciones
          </Typography>
          <Typography variant="body1" sx={{ color: "text.secondary" }}>
            {aboutPage.intro}
          </Typography>
          <Typography variant="body1" sx={{ color: "text.secondary" }}>
            {aboutPage.sections[0].paragraphs[1]}
          </Typography>
          <MuiLink component={NextLink} href="/about" underline="hover">
            Conoce más sobre mí →
          </MuiLink>
        </Stack>
      </Container>
    </Stack>
  );
}
