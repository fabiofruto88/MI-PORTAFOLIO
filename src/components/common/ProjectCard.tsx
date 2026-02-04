"use client";

import * as React from "react";
import {
  alpha,
  Box,
  Chip,
  Divider,
  Link as MuiLink,
  Stack,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";
import Image from "next/image";
import { FiExternalLink } from "react-icons/fi";
import { FaGithub } from "react-icons/fa";
import { BsGlobe2 } from "react-icons/bs";
import { Tech } from "@/types";

export interface ProjectCardProps {
  roleChip: string;
  domainChip: string;
  badgeText: string;
  title: string;
  description: React.ReactNode;
  technologies: Tech[];
  demoUrl?: string;
  githubUrl?: string;
  imageUrl?: string;
  sx?: SxProps<Theme>;
}

function getExternalRel(target?: string): string | undefined {
  if (target === "_blank") return "noopener noreferrer";
  return undefined;
}

export default function ProjectCard(
  props: ProjectCardProps,
): React.ReactElement {
  const theme = useTheme();
  const {
    roleChip,
    domainChip,
    badgeText,
    title,
    description,
    technologies,
    demoUrl,
    githubUrl,
    sx,
    imageUrl,
  } = props;

  const headerBg = `linear-gradient(
    135deg,
    ${alpha(theme.palette.primary.main, 0.38)} 0%,
    ${alpha(theme.palette.primary.light, 0.42)} 45%,
    ${alpha(theme.palette.secondary.main, 0.22)} 100%
  )`;

  return (
    <Box
      component="article"
      aria-label={`Proyecto: ${title}`}
      tabIndex={0}
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderRadius: 2,
        overflow: "hidden",
        border: `1px solid ${theme.palette.divider}`,
        backgroundColor: theme.palette.background.paper,
        boxShadow: `0 8px 24px ${alpha(theme.palette.common.black, 0.08)}`,
        outline: "none",
        transition:
          "transform 160ms ease, box-shadow 160ms ease, border-color 160ms ease",
        "&:hover, &:focus-visible": {
          transform: "translateY(-2px)",
          boxShadow: `0 16px 40px ${alpha(theme.palette.common.black, 0.14)}`,
          borderColor: theme.palette.primary.main,
        },
        ...sx,
      }}
    >
      <Box
        sx={{
          position: "relative",
          height: "clamp(140px, 22vw, 280px)",
          overflow: "hidden",
        }}
      >
        {imageUrl && (
          <Image
            src={imageUrl}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            style={{
              objectFit: "cover",
              zIndex: 0,
              transition: "transform 0.4s ease-out",
            }}
          />
        )}
        <Box
          aria-hidden
          sx={{
            position: "absolute",
            inset: 0,
            background: `radial-gradient(circle at 30% 20%, ${alpha(
              theme.palette.common.white,
              theme.palette.mode === "dark" ? 0.18 : 0.28,
            )}, transparent 55%)`,
          }}
        />

        <Stack
          direction="row"
          spacing={1}
          sx={{
            position: "absolute",
            top: 14,
            left: 14,
            right: 14,
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Chip
            label={roleChip}
            size="small"
            sx={{
              fontWeight: 800,
              letterSpacing: ".04em",
              textTransform: "uppercase",
              color: alpha(theme.palette.common.white, 0.92),
              bgcolor: theme.palette.primary.main,
              border: `1px solid ${alpha(theme.palette.common.white, 0.22)}`,
              backdropFilter: "blur(6px)",
            }}
          />

          <Chip
            label={domainChip}
            size="small"
            sx={{
              fontWeight: 900,
              letterSpacing: ".04em",
              textTransform: "uppercase",
              color: theme.palette.primary.contrastText,
              bgcolor: theme.palette.success.main,
              border: `1px solid ${alpha(theme.palette.common.white, 0.22)}`,
            }}
          />
        </Stack>
      </Box>

      <Stack spacing={1.5} sx={{ p: 3, flexGrow: 1 }}>
        <Typography
          variant="h5"
          component="h3"
          sx={{
            fontWeight: 900,
            color: theme.palette.text.primary,
            lineHeight: 1.1,
            fontSize: { xs: "1.35rem", sm: "1.55rem" },
          }}
        >
          {title}
        </Typography>

        <Typography
          variant="body2"
          component="div"
          sx={{
            color: theme.palette.text.secondary,
            lineHeight: 1.4,
            fontSize: 15.5,
            textAlign: "justify",
            "& strong": {
              color: theme.palette.text.primary,
              fontWeight: 900,
            },
          }}
        >
          {description}
        </Typography>

        <Stack
          direction="row"
          spacing={1}
          useFlexGap
          flexWrap="wrap"
          sx={{ pt: 0.5, marginTop: "auto" }}
        >
          {technologies.map((tech) => {
            const Icon = tech.icon;

            return (
              <Chip
                key={tech.name}
                size="small"
                variant="outlined"
                icon={
                  <Box
                    component="span"
                    sx={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      ml: "6px",
                      "& svg": { display: "block" },
                    }}
                  >
                    <Icon size={16} color={tech.color} />
                  </Box>
                }
                label={tech.name}
                sx={{
                  borderColor: theme.palette.divider,
                  color: theme.palette.text.primary,
                  fontWeight: 700,
                  bgcolor:
                    theme.palette.mode === "dark"
                      ? alpha(theme.palette.common.white, 0.06)
                      : theme.palette.action.hover,
                  "& .MuiChip-icon": { ml: "6px", mr: "-2px" },
                }}
              />
            );
          })}
        </Stack>

        <Divider sx={{ my: 0.5 }} />

        <Stack
          direction="row"
          spacing={2}
          sx={{
            alignItems: "center",
            justifyContent: "flex-start",
            flexWrap: "wrap",
          }}
        >
          <ProjectActionLink
            kind="demo"
            href={demoUrl}
            label="Demo"
            leftIcon={<BsGlobe2 size={18} />}
          />
          <ProjectActionLink
            kind="github"
            href={githubUrl}
            label="GitHub"
            leftIcon={<FaGithub size={18} />}
          />
        </Stack>
      </Stack>
    </Box>
  );
}

function ProjectActionLink({
  href,
  label,
  leftIcon,
  kind,
}: {
  href?: string;
  label: string;
  leftIcon: React.ReactNode;
  kind: "demo" | "github";
}): React.ReactElement {
  const theme = useTheme();
  const isDisabled = !href;

  const content = (
    <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
      <Box
        aria-hidden
        sx={{
          display: "inline-flex",
          alignItems: "center",
          color: isDisabled
            ? theme.palette.text.disabled
            : theme.palette.text.primary,
        }}
      >
        {leftIcon}
      </Box>

      <Typography
        component="span"
        sx={{
          fontWeight: 800,
          color: isDisabled
            ? theme.palette.text.disabled
            : theme.palette.text.primary,
          letterSpacing: ".01em",
        }}
      >
        {label}
      </Typography>

      <Box
        aria-hidden
        sx={{
          display: "inline-flex",
          alignItems: "center",
          color: isDisabled
            ? theme.palette.text.disabled
            : theme.palette.text.secondary,
        }}
      >
        <FiExternalLink size={16} />
      </Box>
    </Stack>
  );

  if (isDisabled) {
    return (
      <Tooltip
        title={`No hay link de ${kind === "demo" ? "demo" : "GitHub"} disponible`}
      >
        <Box
          sx={{
            cursor: "not-allowed",
            opacity: 0.7,
            userSelect: "none",
            py: 0.5,
          }}
        >
          {content}
        </Box>
      </Tooltip>
    );
  }

  return (
    <MuiLink
      href={href}
      target="_blank"
      rel={getExternalRel("_blank")}
      underline="none"
      aria-label={`${label} (abre en una nueva pestaña)`}
      sx={{
        py: 0.5,
        borderRadius: 2,
        outline: "none",
        transition: "color 140ms ease, background-color 140ms ease",
        "&:hover": { color: theme.palette.primary.main },
        "&:focus-visible": {
          boxShadow: `0 0 0 3px ${alpha(theme.palette.primary.main, 0.22)}`,
          backgroundColor:
            theme.palette.mode === "dark"
              ? alpha(theme.palette.common.white, 0.06)
              : theme.palette.action.hover,
        },
      }}
    >
      {content}
    </MuiLink>
  );
}
