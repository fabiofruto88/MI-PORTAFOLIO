"use client";

import {
  Box,
  Container,
  Grid,
  Typography,
  Stack,
  useTheme,
} from "@mui/material";
import ItemPublicacion from "@/components/common/ItemPublicacion";

import { GiBookmarklet } from "react-icons/gi";
import { HiOutlineTrophy } from "react-icons/hi2";

export default function RecognitionsSection() {
  const theme = useTheme();

  const items = [
    {
      id: 1,
      icon: <GiBookmarklet />,
      badgeLabel: "PUBLICACIÓN ACOFI",
      dateOrSubtitle: "Publicado 2024",
      title:
        '"UNISECURE: Prototipo de Sistema de Acceso Automatizado Mediante Reconocimiento Facial y de Placas Vehiculares"',
      publisher:
        "ACOFI 2024 - Encuentro Internacional de Educación en Ingeniería",
      description:
        "Sistema innovador de automatización de acceso mediante reconocimiento facial y de placas vehiculares para instituciones educativas. DOI: 10.26507/paper.3977. Co-autores: Lourdes De Avila Gutierrez, Jesús David Jiménez Cortinez.",
    },
    {
      id: 2,
      icon: <HiOutlineTrophy />,
      badgeLabel: "PONENCIA NACIONAL",
      dateOrSubtitle: "RedCOLSI 2024",
      title:
        "UniSecure - Sistema de Acceso Automatizado para Instituciones Educativas",
      publisher: "XXVII Encuentro Nacional de Semilleros de Investigación",
      description:
        "Presentación del prototipo UniSecure en el encuentro nacional e internacional de semilleros de investigación. Universidad de la Costa, Barranquilla (9-12 octubre 2024). Rol: Ponente y Desarrollador.",
    },
    {
      id: 3,
      icon: <HiOutlineTrophy />,
      badgeLabel: "PONENCIA NACIONAL",
      dateOrSubtitle: "RedCOLSI 2025",
      title:
        "MediSecure - Sistema de Acceso Automatizado para Instalaciones Médicas",
      publisher: "XXVIII Encuentro Nacional de Semilleros de Investigación",
      description:
        "Evolución del sistema UniSecure adaptado para instalaciones médicas mediante reconocimiento facial y de placas vehiculares. UNIMINUTO, Bogotá (7-10 octubre 2025). Rol: Ponente y Desarrollador.",
    },
  ];

  return (
    <Box
      component="section"
      sx={{
        py: { xs: 8, md: 12 },
        backgroundColor: theme.palette.background.default,
        position: "relative",
        overflow: "hidden",
      }}
      id="publicaciones"
    >
      <Container maxWidth="lg">
        <Grid container spacing={{ xs: 6, md: 8 }} alignItems="center">
          {/* Columna Izquierda: Títulos y Descripción */}
          <Grid size={{ xs: 12, md: 5 }}>
            <Stack spacing={3} sx={{ position: "sticky", top: 100 }}>
              <Typography
                variant="overline"
                sx={{
                  fontWeight: 800,
                  letterSpacing: "0.15em",
                  color: theme.palette.primary.main,
                  fontSize: "0.875rem",
                }}
              >
                EXCELENCIA ACADÉMICA
              </Typography>

              <Typography
                variant="h2"
                sx={{
                  fontWeight: 700,
                  color: theme.palette.text.primary,
                  lineHeight: 1.1,
                }}
              >
                Reconocimientos y Publicaciones
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  color: theme.palette.text.secondary,
                  fontSize: "1.125rem",
                  maxWidth: "480px",
                  lineHeight: 1.7,
                }}
              >
                Contribuciones a la comunidad científica y distinciones en
                ingeniería de software que respaldan mi compromiso con la
                calidad y la innovación constante.
              </Typography>
            </Stack>
          </Grid>

          {/* Columna Derecha: Lista de Tarjetas */}
          <Grid size={{ xs: 12, md: 7 }}>
            <Stack spacing={3}>
              {items.map((item) => (
                <ItemPublicacion
                  key={item.id}
                  icon={item.icon}
                  badgeLabel={item.badgeLabel}
                  dateOrSubtitle={item.dateOrSubtitle}
                  title={item.title}
                  publisher={item.publisher}
                  description={item.description}
                />
              ))}
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
