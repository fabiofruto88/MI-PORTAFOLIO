import type { Metadata } from "next";
import { Archivo, Geist, Inter } from "next/font/google";
import ThemeProvider from "@/components/providers/ThemeProvider";
import SiteChrome from "@/components/layout/SiteChrome";

import { generateSEO } from "@/lib/metadata";
import { serializeJsonLd, siteJsonLd } from "@/lib/jsonld";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
});
// Display con eje de ancho (wdth 62-125): el titular se estira sin cambiar de familia
const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-archivo",
});
const geist = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist",
});

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
    <html lang="es" data-scroll-behavior="smooth">
      <body
        className={`${inter.className} ${inter.variable} ${archivo.variable} ${geist.variable}`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: serializeJsonLd(siteJsonLd),
          }}
        />
        <ThemeProvider>
          <SiteChrome>{children}</SiteChrome>
        </ThemeProvider>
      </body>
    </html>
  );
}
