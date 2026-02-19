import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ThemeProvider from "@/components/providers/ThemeProvider";
import Header from "@/components/layout/Header";

import { generateSEO } from "@/lib/metadata";
import "./globals.css";
import Footer from "@/components/layout/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = generateSEO({
  title: "Fabio Fruto - Portafolio Profesional",
  description:
    "Portafolio de Fabio Fruto, desarrollador full stack especializado en React, Next.js y React Native. Construye landing pages, e-commerce y apps móviles, integra automatizaciones con n8n y OpenAI y comparte experiencia docente, publicaciones y reconocimientos.",
  keywords: [
    "Fabio Fruto",
    "desarrollador full stack",
    "React",
    "Next.js",
    "React Native",
    "n8n automation",
    "apps móviles",
    "landing pages",
    "proyectos IA",
    "docente programación",
  ],
  url: "https://fabiofruto.com",
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
