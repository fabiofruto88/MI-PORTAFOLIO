"use client";

import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  useScrollTrigger,
} from "@mui/material";
import { FiMenu, FiMoon, FiSun } from "react-icons/fi";
import { useThemeMode } from "@/components/providers/ThemeProvider";
import Link from "next/link";

export default function Header() {
  const { mode, toggleTheme } = useThemeMode();
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 50,
  });

  return (
    <AppBar
      position="fixed"
      color="default"
      elevation={trigger ? 4 : 0}
      sx={{
        backgroundColor: trigger
          ? "background.paper"
          : "rgba(255, 255, 255, 0.8)",
        backdropFilter: "blur(10px)",
        transition: "all 0.3s",
      }}
    >
      <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
        <Typography
          variant="h6"
          component={Link}
          href="/"
          sx={{
            fontWeight: 700,
            textDecoration: "none",
            color: "text.primary",
          }}
        >
          MiLanding
        </Typography>

        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
          <Button component={Link} href="/servicios" color="inherit">
            Servicios
          </Button>
          <Button component={Link} href="/nosotros" color="inherit">
            Nosotros
          </Button>
          <Button component={Link} href="/contacto" variant="contained">
            Contacto
          </Button>
          <IconButton onClick={toggleTheme} color="inherit">
            {mode === "dark" ? <FiSun /> : <FiMoon />}
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
