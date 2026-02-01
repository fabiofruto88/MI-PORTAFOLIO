/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Box, Typography, Paper, Avatar, Stack, useTheme } from "@mui/material";
import Image from "next/image";
import { MdWorkOutline } from "react-icons/md";
import { BsPcDisplay } from "react-icons/bs";

export default function HeroSectionImage() {
  const theme = useTheme();

  return (
    <Stack
      sx={{
        width: "100%",
        minHeight: { xs: 300, md: 600 },
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: { xs: 5, md: 10 },
      }}
    >
      <Box
        sx={{
          position: "relative",
          width: { xs: "100%", sm: 400, md: 440 },
          height: { xs: 400, sm: 480, md: 520 },
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Imagen principal con relación de aspecto 3:4 usando next/image */}
        <Box
          sx={{
            width: "100%",
            height: "100%",
            position: "relative",
            aspectRatio: "3 / 4",
            borderRadius: 4,
            overflow: "hidden",
            boxShadow: "0 8px 32px 0 rgba(60,60,120,0.13)",
            background: theme.palette.background.default,
          }}
        >
          <Image
            src="/images/profile.webp"
            alt="Profile"
            fill
            style={{ objectFit: "cover", borderRadius: 24 }}
            sizes="(max-width: 600px) 100vw, 440px"
            priority
          />
        </Box>

        {/* Badge experiencia (arriba izquierda) */}
        <Box
          sx={{
            position: "absolute",
            top: 28,
            left: { xs: -35, sm: -50, md: -70 },
            zIndex: 10,
          }}
        >
          <BadgeCard
            title="3+ Años"
            subtitle="EXPERIENCIA"
            icon={
              <MdWorkOutline
                style={{ color: theme.palette.primary.main, fontSize: 28 }}
              />
            }
            theme={theme}
          />
        </Box>

        {/* Badge IEEE (abajo derecha) */}
        <Box
          sx={{
            position: "absolute",
            bottom: 28,
            right: { xs: -35, sm: -50, md: -70 },
            zIndex: 10,
          }}
        >
          <BadgeCard
            title="IUB"
            subtitle="INVESTIGADOR"
            icon={
              <BsPcDisplay
                style={{ color: theme.palette.primary.main, fontSize: 28 }}
              />
            }
            theme={theme}
          />
        </Box>
      </Box>
    </Stack>
  );
}

// Componente reutilizable mejorado
function BadgeCard({
  title,
  subtitle,
  icon,
  theme,
}: {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  theme: any;
}) {
  return (
    <Paper
      elevation={6}
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 2,
        background: theme.palette.background.paper,
        borderRadius: 3,
        px: { xs: 1, md: 2 },
        py: { xs: 1, md: 2 },
        minWidth: { xs: 100, md: 140 },
        boxShadow: "0 8px 32px 0 rgba(60,60,120,0.10)",
      }}
    >
      <Avatar
        sx={{
          bgcolor: theme.palette.background.default,
          width: 40,
          height: 40,
          boxShadow: 1,
        }}
        variant="rounded"
      >
        {icon}
      </Avatar>
      <Box sx={{ textAlign: "left" }}>
        <Typography
          variant="h6"
          fontWeight={700}
          sx={{
            lineHeight: 1,
            color: theme.palette.text.primary,
            fontSize: { xs: 16, md: 20 },
          }}
        >
          {title}
        </Typography>
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ fontWeight: 500, fontSize: { xs: 12, md: 14 } }}
        >
          {subtitle}
        </Typography>
      </Box>
    </Paper>
  );
}
