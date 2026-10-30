"use client";
import { Container, Grid, Stack, Typography } from "@mui/material";
import { MdRocketLaunch, MdShoppingCart, MdWeb } from "react-icons/md";
import { HiOutlineDevicePhoneMobile } from "react-icons/hi2";
import CardServices from "@/components/common/CardServices";
import SectionEyebrow from "@/components/common/SectionEyebrow";

const services = [
  {
    icon: MdWeb,
    title: "Desarrollo Web",
    description:
      "Sistemas modernos y escalables con React y Next.js, enfocados en performance y SEO técnico.",
  },
  {
    icon: MdRocketLaunch,
    title: "Landing Pages",
    description:
      "Landing pages optimizadas para conversión, con tiempos de carga ultra rápidos y diseño premium.",
  },
  {
    icon: HiOutlineDevicePhoneMobile,
    title: "Apps Android & iOS",
    description: "Desarrollo nativo y multiplataforma con React Native",
  },
  {
    icon: MdShoppingCart,
    title: "Servicios E-commerce",
    description:
      "Tiendas online completas, pasarelas de pago seguras y gestión avanzada de inventario.",
  },
];

export default function ServicesSection() {
  return (
    <Stack
      p={1}
      my={{ xs: 3, md: 1 }}
      sx={{
        minHeight: "60dvh",
        justifyContent: "center",
        alignContent: "center",
        bgcolor: "background.paper",
      }}
      id="servicios"
    >
      <Container maxWidth="xl">
        <SectionEyebrow>Servicios de Desarrollo</SectionEyebrow>
        <Typography variant="h4" component="h2" sx={{ fontWeight: 700 }}>
          Ingeniería de software a medida
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontSize: { xs: "1rem", md: "1.125rem" },
            mb: 6,
            color: "text.secondary",
          }}
        >
          Soluciones digitales robustas construidas con las tecnologías más
          modernas y estándares de la industria.
        </Typography>
        <Grid container spacing={3}>
          {services.map((service) => (
            <Grid key={service.title} size={{ xs: 12, sm: 6, md: 3 }}>
              <CardServices {...service} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Stack>
  );
}
