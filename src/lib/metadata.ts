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
  image = "/images/og-image.jpg",
  url = "https://tudominio.com",
  keywords = [],
  type = "website",
}: SEOProps): Metadata {
  const siteTitle = `${title} | Portafolio Profesional`;

  return {
    title: siteTitle,
    description,
    keywords: keywords.join(", "),
    authors: [{ name: "Fabio Fruto" }],
    creator: "Fabio Fruto",
    publisher: "Fabio Fruto",

    openGraph: {
      type,
      locale: "es_ES",
      url,
      title: siteTitle,
      description,
      siteName: "Portafolio Profesional de Fabio Fruto",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
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
