"use client";

import { Stack, Typography } from "@mui/material";
import { ExperienceTimeline } from "@/components/common/ExperienceTimeline";
import SectionEyebrow from "@/components/common/SectionEyebrow";
import { educationItems, experienceItems } from "@/data/experience";

const headingSx = { fontWeight: 700, fontSize: { xs: 22, sm: 24, md: 26 } };

export default function ExperienceSection() {
  return (
    <Stack
      id="experiencia"
      minHeight="100dvh"
      spacing={2}
      alignItems="center"
      px={1}
      py={4}
    >
      <SectionEyebrow>Trayectoria</SectionEyebrow>
      <Typography variant="h4" component="h2" sx={headingSx}>
        Experiencia Profesional
      </Typography>
      <ExperienceTimeline items={experienceItems} />
      <SectionEyebrow>Trayectoria</SectionEyebrow>
      <Typography variant="h4" component="h2" sx={headingSx}>
        Educación
      </Typography>
      <ExperienceTimeline items={educationItems} />
    </Stack>
  );
}
