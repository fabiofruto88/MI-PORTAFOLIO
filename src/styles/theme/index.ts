"use client";

import { createTheme } from "@mui/material/styles";

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1976d2",
      dark: "#1565c0",
      light: "#42a5f5",
    },
    secondary: {
      main: "#0d1b2a",
    },
    background: {
      default: "#f8fafc",
      paper: "#ffffff",
    },
    text: {
      primary: "#0f172a",
      secondary: "#64748b",
    },
  },
  typography: {
    fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: "clamp(2.5rem, 5vw, 4rem)",
      lineHeight: 1.2,
    },
    h2: {
      fontWeight: 700,
      fontSize: "clamp(2rem, 4vw, 3rem)",
      lineHeight: 1.3,
    },
    h3: {
      fontWeight: 600,
      fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
      lineHeight: 1.4,
    },
    h4: { fontWeight: 600 },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 600,
          borderRadius: 8,
          padding: "10px 24px",
        },
        sizeLarge: {
          padding: "12px 32px",
          fontSize: "1.125rem",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: "0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.06)",
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          paddingLeft: "24px",
          paddingRight: "24px",
        },
      },
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#1976d2",
      dark: "#1565c0",
      light: "#42a5f5",
    },
    secondary: {
      main: "#1e293b",
    },
    background: {
      default: "#0f172a",
      paper: "#1e293b",
    },
    text: {
      primary: "#f1f5f9",
      secondary: "#94a3b8",
    },
  },
  typography: {
    fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: "clamp(2.5rem, 5vw, 4rem)",
      lineHeight: 1.2,
    },
    h2: {
      fontWeight: 700,
      fontSize: "clamp(2rem, 4vw, 3rem)",
      lineHeight: 1.3,
    },
    h3: {
      fontWeight: 600,
      fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
      lineHeight: 1.4,
    },
    h4: { fontWeight: 600 },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 600,
          borderRadius: 8,
          padding: "10px 24px",
        },
        sizeLarge: {
          padding: "12px 32px",
          fontSize: "1.125rem",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: "0 4px 6px rgba(0,0,0,0.3)",
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          paddingLeft: "24px",
          paddingRight: "24px",
        },
      },
    },
  },
});
