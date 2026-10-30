"use client";

import { Typography } from "@mui/material";
import type { ReactNode } from "react";

export default function SectionEyebrow({ children }: { children: ReactNode }) {
  return (
    <Typography
      variant="body2"
      sx={{
        color: "primary.main",
        letterSpacing: "0.11em",
        fontWeight: 700,
        fontSize: 14,
        textTransform: "uppercase",
        display: "block",
      }}
    >
      {children}
    </Typography>
  );
}
