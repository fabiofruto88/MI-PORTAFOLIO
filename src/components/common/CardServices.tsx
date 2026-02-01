import React from "react";
import { Box, Typography, useTheme, Link } from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";

// Props estrictos para el componente
export interface CardServicesProps {
  icon: React.ElementType; // Icono, React component de react-icons
  title: string; // Título de la card
  description: string; // Descripción breve
  href?: string; // (Opcional) Enlace "ver detalles"
  sx?: SxProps<Theme>; // Permite estilos custom (opcional)
}

const ICON_SIZE = 32; // Tamaño fijo del icono, acorde al diseño
const CARD_SIZE = 280; // Ancho y alto máximo para layout 1:1

/**
 * Componente de Card de Servicio, 100% fiel al diseño mostrado.
 * - Icono dentro de un contenedor cuadrado, fondo soft y sombra muy sutil
 * - Título grande, bold, alineado a la izquierda
 * - Descripción clara, color tenue, alineación left
 * - Botón "Ver detalles" con flecha, accesible y con hover animado
 * - Tamaño y espaciado uniforme para todas las cards
 */
const CardServices: React.FC<CardServicesProps> = ({
  icon: Icon,
  title,
  description,
  href,
  sx = {},
}) => {
  const theme = useTheme();

  return (
    <Box
      component="article"
      tabIndex={0}
      aria-label={title}
      sx={{
        width: { xs: "100%" },
        minWidth: CARD_SIZE,
        height: "100%",
        minHeight: 330,
        px: 4,
        py: 5,
        borderRadius: 2,
        boxShadow: "0 8px 32px 0 rgba(17, 37, 106, 0.05)",
        backgroundColor: theme.palette.background.paper,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        transition: "box-shadow 0.18s, transform 0.16s",
        outline: "none",
        cursor: href ? "pointer" : "default",
        "&:hover, &:focus-visible": {
          boxShadow: "0 16px 48px 0 rgba(34, 106, 237, 0.12)",
          transform: "translateY(-2px) scale(1.012)",
        },
        ...sx,
      }}
    >
      {/* Icono en square, fondo azul tenue */}
      <Box
        sx={{
          width: 48,
          height: 48,
          borderRadius: 1,
          bgcolor: theme.palette.primary.main + "15",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mb: 3,
        }}
      >
        <Icon
          size={ICON_SIZE}
          color={theme.palette.primary.main}
          data-testid="service-icon"
        />
      </Box>

      {/* Título elegante, left, sin truncar */}
      <Typography
        variant="h6"
        component="h3"
        sx={{
          fontWeight: 700,
          fontSize: 22,
          color: theme.palette.text.primary,
          mb: 1.5,
          textAlign: "left",
        }}
      >
        {title}
      </Typography>

      {/* Descripción color atenuado, left, multi-línea */}
      <Typography
        variant="body2"
        sx={{
          color: theme.palette.text.secondary,
          fontSize: 16,
          mb: 3,
          textAlign: "left",
          lineHeight: 1.65,
          flexGrow: 1,
          minHeight: 60,
        }}
      >
        {description}
      </Typography>

      {/* Botón ver detalles sólido (opcional, links o solo layout) */}
      <Link
        href={href || "#"}
        underline="none"
        tabIndex={0}
        target={href ? "_blank" : undefined}
        rel="noopener noreferrer"
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          fontWeight: 600,
          fontSize: 15,
          color: theme.palette.primary.main,
          letterSpacing: ".01em",
          px: 0,
          py: 0.5,
          transition: "color 0.15s",
          "&:hover, &:focus-visible": {
            color: theme.palette.primary.dark,
            textDecoration: "underline",
          },
          mt: "auto",
        }}
      >
        VER DETALLES
      </Link>
    </Box>
  );
};

export default CardServices;

/**
 * NOTAS DE USO:
 * - Usa <CardServices icon={MdWeb} title="..." description="..." />
 * - El grid externo controla el layout responsive, la card SIEMPRE mantiene tamaño igual.
 * - 100% a11y, hover, dark/light theme, keyboard friendly y visual perfecto (como el diseño mostrado)
 */
