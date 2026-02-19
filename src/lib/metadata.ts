import { Metadata } from "next";

interface SEOProps {
  title: string;
  description: string;
  image?: string;
  url?: string;
  keywords?: string[];
  type?: "website" | "article";
}

export function generateSEO({
  title,
  description,
  url = "https://fabiofruto.com",
  keywords = [],
  type = "website",
}: SEOProps): Metadata {
  const siteTitle = `${title} | Desarrollador de software`;

  return {
    title: siteTitle,
    description,
    keywords: keywords.join(", "),
    authors: [{ name: "Fabio Fruto Jimenez" }],
    creator: "Fabio Fruto Jimenez",
    publisher: "Fabio Fruto Jimenez",

    openGraph: {
      type,
      locale: "es_ES",
      url,
      title: siteTitle,
      description,
      siteName: "Portafolio Profesional de Fabio Fruto Jimenez",
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
