import type { Metadata, Viewport } from "next";
import { Archivo, Geist, Inter } from "next/font/google";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v16-appRouter";
import ThemeProvider from "@/components/providers/ThemeProvider";
import SiteChrome from "@/components/layout/SiteChrome";

import { generateSEO, SITE_URL } from "@/lib/metadata";
import { HOME } from "@/data/site";
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

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  ...generateSEO({
    title: HOME.title,
    description:
      "Desarrollador freelance en Barranquilla. Creo sitios web, apps móviles y automatizaciones con IA y te acompaño hasta publicarlos. Proyectos con demo y código.",
    keywords: [
      "desarrollador freelance Barranquilla",
      "desarrollador web Barranquilla",
      "crear página web para negocio",
      "desarrollo de apps móviles Barranquilla",
      "automatización con IA",
      "landing page para restaurante",
      "tienda en línea",
      "desarrollador React Next.js",
      "Fabio Fruto",
    ],
  }),
};

export const viewport: Viewport = {
  themeColor: "#d9dadc",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" data-scroll-behavior="smooth">
      {/* suppressHydrationWarning: extensiones del navegador (ColorZilla agrega cz-shortcut-listen) cambian <body> antes de que React cargue */}
      <body
        className={`${inter.className} ${inter.variable} ${archivo.variable} ${geist.variable}`}
        suppressHydrationWarning
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: serializeJsonLd(siteJsonLd),
          }}
        />
        <AppRouterCacheProvider>
          <ThemeProvider>
            <SiteChrome>{children}</SiteChrome>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
