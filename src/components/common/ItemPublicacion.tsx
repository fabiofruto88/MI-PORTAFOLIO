"use client";

import { Box, Typography, Chip, useTheme, alpha, Stack } from "@mui/material";
import { ReactNode } from "react";
import { motion } from "framer-motion"; // Opcional: para animación suave al entrar

export interface ItemPublicacionProps {
  icon: ReactNode;
  badgeLabel: string;
  dateOrSubtitle: string;
  title: string;
  publisher: string;
  description: string;
}

/**
 * ItemPublicacion
 * Componente de tarjeta para mostrar reconocimientos, papers o experiencia académica.
 * Sigue el diseño de tarjeta con icono a la izquierda y contenido a la derecha.
 */
export default function ItemPublicacion({
  icon,
  badgeLabel,
  dateOrSubtitle,
  title,
  publisher,
  description,
}: ItemPublicacionProps) {
  const theme = useTheme();

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      sx={{
        p: 3,
        borderRadius: 2,
        border: `1px solid ${theme.palette.divider}`,
        background: theme.palette.background.paper,
        display: "flex",
        gap: 3,
        alignItems: "flex-start",
        transition: "all 0.3s ease",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: `0 10px 30px -10px ${alpha(theme.palette.primary.main, 0.2)}`,
          borderColor: theme.palette.primary.main,
        },
      }}
    >
      {/* Contenedor del Icono */}
      <Box
        sx={{
          flexShrink: 0,
          width: 56,
          height: 56,
          borderRadius: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: alpha(theme.palette.primary.main, 0.15),
          color: theme.palette.primary.light,
          fontSize: "1.5rem",
        }}
      >
        {icon}
      </Box>

      {/* Contenido */}
      <Stack spacing={1} flex={1}>
        <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap">
          <Chip
            label={badgeLabel}
            size="small"
            sx={{
              fontWeight: 700,
              fontSize: "0.7rem",
              height: 24,
              borderRadius: "6px",
              background: theme.palette.primary.main,
              color: "#fff", // Texto blanco siempre para contraste
              "& .MuiChip-label": { px: 1.5 },
            }}
          />
          <Typography
            variant="caption"
            sx={{
              color: theme.palette.text.secondary,
              fontWeight: 500,
              fontSize: "0.8rem",
            }}
          >
            {dateOrSubtitle}
          </Typography>
        </Stack>

        <Box>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              lineHeight: 1.3,
              mb: 0.5,
              color: theme.palette.text.primary,
            }}
          >
            {title}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: alpha(theme.palette.text.primary, 0.7),
              fontWeight: 500,
              mb: 1,
              display: "block",
            }}
          >
            {publisher}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: theme.palette.text.secondary,
              lineHeight: 1.6,
            }}
          >
            {description}
          </Typography>
        </Box>
      </Stack>
    </Box>
  );
}
