import { Metadata } from "next";

export const SITE_URL = "https://fabiofruto.com";
export const SITE_NAME = "Portafolio Profesional de Fabio Fruto Jimenez";

interface SEOProps {
  title: string;
  description: string;
  url?: string;
  keywords?: string[];
  type?: "website" | "article";
}

export function generateSEO({
  title,
  description,
  url = SITE_URL,
  keywords = [],
  type = "website",
}: SEOProps): Metadata {
  return {
    title,
    description,
    keywords,
    authors: [{ name: "Fabio Fruto Jimenez" }],
    creator: "Fabio Fruto Jimenez",
    publisher: "Fabio Fruto Jimenez",

    openGraph: {
      type,
      locale: "es_CO",
      url,
      title,
      description,
      siteName: SITE_NAME,
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
    },

    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },

    alternates: {
      canonical: url,
    },
  };
}
