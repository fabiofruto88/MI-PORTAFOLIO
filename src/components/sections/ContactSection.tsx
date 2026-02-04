"use client";

import {
  Box,
  Button,
  Container,
  Typography,
  useTheme,
  alpha,
} from "@mui/material";
import { motion } from "framer-motion";
import Link from "next/link"; // Opcional, si el botón lleva a una página o mailto

export default function ContactSection() {
  const theme = useTheme();

  return (
    <Box
      component="section"
      sx={{
        py: { xs: 8, md: 12 },
        position: "relative",
        overflow: "hidden",
        backgroundColor: theme.palette.background.paper, // Se adapta al fondo general
      }}
      id="contacto"
    >
      <Container maxWidth="md" sx={{ position: "relative", zIndex: 1 }}>
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          sx={{
            // Fondo estilo "Deep Space" / Midnight Blue
            background: `linear-gradient(135deg, #0f172a 0%, #1e293b 100%)`,
            // Opcional: un toque de azul más brillante en la esquina superior derecha para volumen
            backgroundImage: `radial-gradient(circle at 90% 10%, ${alpha(
              theme.palette.primary.main,
              0.15,
            )} 0%, transparent 40%), linear-gradient(135deg, #0f172a 0%, #172554 100%)`,

            borderRadius: { xs: 4, md: 6 }, // Bordes muy redondeados
            p: { xs: 4, md: 8 },
            textAlign: "center",
            color: "#fff",
            boxShadow: `0 20px 40px -10px ${alpha(theme.palette.common.black, 0.5)}`,
            border: "1px solid rgba(255, 255, 255, 0.05)",
          }}
        >
          {/* Título */}
          <Typography
            variant="h2"
            sx={{
              fontWeight: 800,
              fontSize: { xs: "1.75rem", md: "2.5rem" },
              mb: 3,
              lineHeight: 1.2,
            }}
          >
            ¿Tienes un desafío técnico para mí?
          </Typography>

          {/* Descripción */}
          <Typography
            variant="body1"
            sx={{
              fontSize: { xs: "1rem", md: "1.125rem" },
              color: alpha("#fff", 0.7), // Texto gris claro/blanco opaco
              maxWidth: "600px",
              mx: "auto",
              mb: 6,
              lineHeight: 1.6,
            }}
          >
            Disponible para proyectos de desarrollo de software a medida
          </Typography>

          {/* Botón de Acción (CTA) */}
          <Button
            component={Link}
            href="mailto:fabiofruto3@gmail.com" // Reemplazar con tu acción real
            variant="contained"
            size="large"
            sx={{
              backgroundColor: "#ffffff",
              color: "#0f172a", // Texto oscuro para contraste máximo
              fontWeight: 700,
              fontSize: "0.875rem",
              letterSpacing: "0.05em",
              borderRadius: "50px", // Botón tipo píldora
              px: 5,
              py: 1.5,
              textTransform: "uppercase",
              boxShadow: "0 4px 14px 0 rgba(255,255,255,0.3)",
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
              "&:hover": {
                backgroundColor: "#f8fafc",
                transform: "scale(1.05)",
                boxShadow: "0 6px 20px 0 rgba(255,255,255,0.4)",
              },
            }}
          >
            Hablemos Hoy
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
