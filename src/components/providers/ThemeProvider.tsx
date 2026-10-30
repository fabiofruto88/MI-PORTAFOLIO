"use client";

import { ThemeProvider as MUIThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { lightTheme, darkTheme } from "@/styles/theme";
import {
  useState,
  useEffect,
  createContext,
  useContext,
  useMemo,
  ReactNode,
} from "react";

type ThemeMode = "light" | "dark";

interface ThemeContextType {
  mode: ThemeMode;
  toggleTheme: () => void;
}

const STORAGE_KEY = "theme-mode";

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useThemeMode = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useThemeMode must be used within ThemeProvider");
  }
  return context;
};

function readPreferredMode(): ThemeMode {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "light" || stored === "dark") return stored;
  } catch {
    // localStorage no disponible (modo privado, bloqueado): se usa la preferencia del sistema
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export default function ThemeProvider({ children }: { children: ReactNode }) {
  // El servidor renderiza "light"; la preferencia real se aplica tras hidratar
  // para evitar un mismatch de hidratación.
  const [mode, setMode] = useState<ThemeMode>("light");

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMode(readPreferredMode());
  }, []);

  const toggleTheme = () => {
    const next: ThemeMode = mode === "light" ? "dark" : "light";
    setMode(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // ignorar: la preferencia solo no se persiste
    }
  };

  const theme = useMemo(
    () => (mode === "light" ? lightTheme : darkTheme),
    [mode],
  );

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MUIThemeProvider>
    </ThemeContext.Provider>
  );
}
