import { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/metadata";
import { infoPages } from "@/data/site";

// Actualizar al publicar cambios de contenido; evita que cambie en cada build.
const LAST_MODIFIED = new Date("2026-10-29");

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 1,
    },
    ...infoPages.map((page) => ({
      url: `${SITE_URL}${page.path}`,
      lastModified: LAST_MODIFIED,
      changeFrequency: "yearly" as const,
      priority: 0.5,
    })),
  ];
}
