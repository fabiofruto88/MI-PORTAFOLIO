import { CONTACT } from "@/data/site";
import { SITE_URL } from "@/lib/metadata";

const PERSON_ID = `${SITE_URL}/#person`;
const ORG_ID = `${SITE_URL}/#organization`;
const SITE_ID = `${SITE_URL}/#website`;

const sameAs = [CONTACT.github, CONTACT.linkedin, CONTACT.instagram];

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
      jobTitle: "Desarrollador de software",
      description:
        "Desarrollador de software full stack especializado en React, Next.js y React Native.",
      knowsAbout: ["React", "Next.js", "React Native", "TypeScript", "n8n"],
      knowsLanguage: "es",
      sameAs,
      worksFor: { "@id": ORG_ID },
    },
    {
      "@type": "Organization",
      "@id": ORG_ID,
      name: "Fabio Fruto Jimenez - Desarrollo de Software",
      url: SITE_URL,
      logo: `${SITE_URL}/icon.svg`,
      description:
        "Desarrollo de software a medida: aplicaciones web, apps móviles, landing pages, e-commerce y automatizaciones.",
      founder: { "@id": PERSON_ID },
      email: CONTACT.email,
      telephone: CONTACT.phone,
      address: { "@type": "PostalAddress", addressCountry: "CO" },
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
      name: "Portafolio Profesional de Fabio Fruto Jimenez",
      inLanguage: "es",
      publisher: { "@id": ORG_ID },
    },
  ],
};

/** Serializa JSON-LD escapando `<` para que no pueda cerrar la etiqueta script. */
export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
