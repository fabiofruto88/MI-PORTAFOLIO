import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ThemeProvider from "@/components/providers/ThemeProvider";
import Header from "@/components/layout/Header";

import { generateSEO } from "@/lib/metadata";
import "./globals.css";
import Footer from "@/components/layout/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = generateSEO({
  title: "Fabio Fruto",
  description:
    "Desarrollador Full Stack | Portafolio de Proyectos y Habilidades",
  keywords: ["next.js", "react", "typescript", "material-ui", "landing page"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <ThemeProvider>
          <Header />
          <main style={{ minHeight: "100dvh", paddingTop: "64px" }}>
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
