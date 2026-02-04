"use client";

import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  useScrollTrigger,
  Stack,
  useTheme,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
} from "@mui/material";
import { FiMenu, FiMoon, FiSun, FiX } from "react-icons/fi";
import { useThemeMode } from "@/components/providers/ThemeProvider";
import Link from "next/link";
import { FaCode } from "react-icons/fa";
import { useState } from "react";
import MaterialUISwitch from "../ui/MaterialUISwitch";

export default function Header() {
  const { mode, toggleTheme } = useThemeMode();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 50,
  });

  const links = [
    { label: "INICIO", href: "/#inicio" },
    { label: "SERVICIOS", href: "/#servicios" },
    { label: "EXPERIENCIA", href: "/#experiencia" },
    { label: "PROYECTOS", href: "/#proyectos" },
    { label: "PUBLICACIONES", href: "/#publicaciones" },
  ];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // Contenido del Drawer
  const drawer = (
    <Box
      sx={{
        width: 280,
        height: "100%",
        backgroundColor: "background.default",
      }}
      role="presentation"
    >
      {/* Header del Drawer */}
      <Box
        sx={{
          p: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: 1,
          borderColor: "divider",
        }}
      >
        <Stack direction="row" alignItems="center" spacing={1}>
          <FaCode color={theme.palette.text.primary} size={24} />
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            Fabio Fruto
          </Typography>
        </Stack>
        <IconButton onClick={handleDrawerToggle}>
          <FiX />
        </IconButton>
      </Box>

      {/* Links de navegación */}
      <List sx={{ px: 1, py: 2 }}>
        {links.map((item) => (
          <ListItem key={item.label} disablePadding sx={{ mb: 0.5 }}>
            <ListItemButton
              component={Link}
              href={item.href}
              onClick={handleDrawerToggle}
              sx={{
                borderRadius: 1,
                "&:hover": {
                  backgroundColor: "action.hover",
                  color: "primary.main",
                },
              }}
            >
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{
                  fontWeight: 500,
                  fontSize: "0.95rem",
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Divider sx={{ mx: 2 }} />

      {/* Botones de acción */}
      <Stack spacing={2} sx={{ p: 2 }}>
        <Button
          fullWidth
          variant="contained"
          sx={{
            borderRadius: 2,
            py: 1.5,
            textTransform: "none",
            fontWeight: 600,
          }}
          onClick={() => {
            window.location.href = "/#contacto";
            handleDrawerToggle();
          }}
        >
          CONTACTAR
        </Button>

        <Button
          fullWidth
          variant="outlined"
          startIcon={mode === "dark" ? <FiSun /> : <FiMoon />}
          onClick={toggleTheme}
          sx={{
            borderRadius: 2,
            py: 1.5,
            textTransform: "none",
            fontWeight: 600,
          }}
        >
          {mode === "dark" ? "Modo Claro" : "Modo Oscuro"}
        </Button>
      </Stack>
    </Box>
  );

  return (
    <>
      <AppBar
        position="fixed"
        color="default"
        elevation={trigger ? 4 : 0}
        sx={{
          backgroundColor: "background.default",
          backdropFilter: "blur(10px)",
          transition: "all 0.3s",
        }}
      >
        <Toolbar
          disableGutters
          sx={{
            display: "flex",
            justifyContent: "space-between",
            px: { xs: 2, sm: 3, md: 4 },
          }}
        >
          {/* Logo */}
          <Stack direction="row" alignItems="center" spacing={1}>
            <FaCode color={theme.palette.text.primary} size={24} />
            <Typography
              variant="h6"
              component={Link}
              href="/"
              sx={{
                fontWeight: 700,
                textDecoration: "none",
                color: "text.primary",
                fontSize: { xs: "1rem", sm: "1.25rem" },
              }}
            >
              Fabio Fruto
            </Typography>
          </Stack>

          {/* Navegación Desktop */}
          <Stack
            direction="row"
            spacing={1}
            sx={{
              display: { xs: "none", md: "flex" },
            }}
          >
            {links.map((item) => (
              <Button
                key={item.label}
                component={Link}
                href={item.href}
                sx={{
                  color: "text.primary",
                  fontWeight: 500,
                  "&:hover": { color: "primary.main" },
                  fontSize: "0.875rem",
                }}
              >
                {item.label}
              </Button>
            ))}
          </Stack>

          {/* Acciones Desktop */}
          <Stack
            direction="row"
            alignItems="center"
            spacing={1}
            sx={{
              display: { xs: "none", md: "flex" },
            }}
          >
            <MaterialUISwitch
              checked={mode === "dark"}
              onChange={toggleTheme}
              label=""
              sx={{ m: 1 }}
            />
            <Button
              variant="outlined"
              sx={{
                borderRadius: 2,
                px: 3,
                textTransform: "none",
                fontSize: "0.875rem",
                fontWeight: 600,
              }}
              component={Link}
              href="/#contacto"
            >
              CONTACTAR
            </Button>
          </Stack>

          {/* Botón Hamburguesa Mobile */}
          <IconButton
            color="inherit"
            aria-label="abrir menú"
            edge="end"
            onClick={handleDrawerToggle}
            sx={{
              display: { xs: "flex", md: "none" },
            }}
          >
            <FiMenu size={24} />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Drawer Mobile */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Mejor performance en mobile
        }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: 280,
          },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
}
