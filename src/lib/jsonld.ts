import { CONTACT, projectSummaries, recognitions, services } from "@/data/site";
import { SITE_URL } from "@/lib/metadata";

const PERSON_ID = `${SITE_URL}/#person`;
const ORG_ID = `${SITE_URL}/#organization`;
const SITE_ID = `${SITE_URL}/#website`;

const sameAs = [CONTACT.github, CONTACT.linkedin, CONTACT.instagram];

const BARRANQUILLA = {
  "@type": "City",
  name: "Barranquilla",
  containedInPlace: { "@type": "Country", name: "Colombia" },
};

const address = {
  "@type": "PostalAddress",
  addressLocality: "Barranquilla",
  addressRegion: "Atlántico",
  addressCountry: "CO",
};

export const siteJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": PERSON_ID,
      name: "Fabio Fruto Jimenez",
      url: SITE_URL,
      image: `${SITE_URL}/images/profile.webp`,
      email: `mailto:${CONTACT.email}`,
      jobTitle: "Desarrollador de software freelance",
      description:
        "Desarrollador de software freelance en Barranquilla, Colombia. Crea sitios web, apps móviles y automatizaciones con IA, y acompaña cada proyecto hasta su publicación.",
      address,
      homeLocation: BARRANQUILLA,
      alumniOf: {
        "@type": "CollegeOrUniversity",
        name: "Universidad de Barranquilla (IUB)",
      },
      knowsAbout: [
        "Desarrollo web",
        "Aplicaciones móviles",
        "Automatización con IA",
        "React",
        "Next.js",
        "React Native",
        "TypeScript",
        "Python",
        "FastAPI",
        "n8n",
        "OpenAI",
      ],
      knowsLanguage: "es",
      sameAs,
      worksFor: { "@id": ORG_ID },
    },
    {
      "@type": ["Organization", "ProfessionalService"],
      "@id": ORG_ID,
      name: "Fabio Fruto Jimenez - Desarrollo de Software",
      url: SITE_URL,
      logo: `${SITE_URL}/icon.svg`,
      image: `${SITE_URL}/images/profile.webp`,
      description:
        "Desarrollador freelance en Barranquilla: sitios web, landing pages, apps móviles, tiendas en línea y automatizaciones con IA para negocios, emprendedores y agencias.",
      founder: { "@id": PERSON_ID },
      email: CONTACT.email,
      telephone: CONTACT.phone,
      address,
      areaServed: [BARRANQUILLA, { "@type": "Country", name: "Colombia" }],
      knowsLanguage: "es",
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Servicios de desarrollo de software",
        itemListElement: services.map((s) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: s.title, description: s.description },
        })),
      },
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer service",
        email: CONTACT.email,
        telephone: CONTACT.phone,
        availableLanguage: ["Spanish"],
      },
      sameAs,
    },
    {
      "@type": "WebSite",
      "@id": SITE_ID,
      url: SITE_URL,
      name: "Fabio Fruto Jimenez, desarrollador freelance en Barranquilla",
      inLanguage: "es",
      publisher: { "@id": ORG_ID },
    },
    ...projectSummaries.map((p) => ({
      "@type": "CreativeWork",
      name: p.title,
      description: p.outcome,
      url: p.demoUrl,
      image: `${SITE_URL}${p.image}`,
      author: { "@id": PERSON_ID },
      keywords: p.tags.join(", "),
      codeRepository: p.githubUrl,
      inLanguage: "es",
    })),
    {
      "@type": "ScholarlyArticle",
      headline: recognitions[0].title,
      author: { "@id": PERSON_ID },
      datePublished: "2024",
      isPartOf: { "@type": "Event", name: recognitions[0].venue },
      sameAs: "https://doi.org/10.26507/paper.3977",
      identifier: { "@type": "PropertyValue", propertyID: "DOI", value: "10.26507/paper.3977" },
      inLanguage: "es",
    },
  ],
};

/** Serializa JSON-LD escapando `<` para que no pueda cerrar la etiqueta script. */
export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
