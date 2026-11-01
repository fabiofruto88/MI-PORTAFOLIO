import { SITE_URL } from "@/lib/metadata";
import { educationItems, experienceItems } from "@/data/experience";

import { CONTACT } from "@/data/contact";
import { pricingMarkdown } from "@/data/quote";

export { CONTACT };

export interface PageSection {
  heading: string;
  paragraphs: string[];
}

export interface InfoPageContent {
  path: string;
  title: string;
  description: string;
  intro: string;
  sections: PageSection[];
}

export const aboutPage: InfoPageContent = {
  path: "/about",
  title: "Sobre mí",
  description:
    "Fabio Fruto Jimenez es desarrollador freelance en Barranquilla, Colombia: crea sitios web, apps móviles y automatizaciones con IA, y acompaña cada proyecto hasta su publicación.",
  intro:
    "Soy Fabio Fruto Jimenez, desarrollador de software freelance en Barranquilla, Colombia. Hago sitios web, apps móviles y automatizaciones con IA para negocios y emprendedores, y te acompaño desde la idea hasta la publicación en Google, Google Play o App Store.",
  sections: [
    {
      heading: "Qué hago y para quién",
      paragraphs: [
        "Trabajo como desarrollador independiente desde 2022. Un solo desarrollador cubre tu sitio web, tu app móvil y tus automatizaciones con IA, así que no necesitas coordinar a tres proveedores distintos.",
        "Si tienes un negocio local, te dejo un sitio rápido, listo para aparecer en Google y con un botón para que tus clientes te escriban por WhatsApp. Si tienes una idea, construyo la primera versión de tu app o automatización para que la pruebes con usuarios reales. Si eres una agencia o empresa de desarrollo, me sumo a tu equipo como desarrollador subcontratado.",
        "Participé en proyectos publicados en Google Play y App Store, y cuido el posicionamiento en buscadores, la accesibilidad y los tiempos de carga en cada entrega.",
      ],
    },
    {
      heading: "Experiencia y respaldo académico",
      paragraphs: [
        "Fui desarrollador frontend en CCorbit S.A.S (mayo de 2024 a octubre de 2025), docente catedrático de Fundamentos de Programación en la Institución Universitaria de Barranquilla en Territorios (enero a junio de 2026) y técnico en sistemas en REDSIS (2023).",
        "Mi sistema UniSecure de control de acceso con reconocimiento facial se publicó en ACOFI 2024 (DOI 10.26507/paper.3977) y se presentó en REDCOLSI 2024. Su evolución, MediSecure, se presentó en REDCOLSI 2025.",
        "Soy tecnólogo en Gestión de Sistemas Informáticos y técnico profesional en Mantenimiento de Sistemas Informáticos por la Universidad de Barranquilla (IUB), además de técnico en sistemas del SENA.",
      ],
    },
    {
      heading: "Tecnologías",
      paragraphs: [
        "React, Next.js, React Native, TypeScript, JavaScript, Material UI, Python, FastAPI, MySQL, PostgreSQL, Git, n8n, OpenAI y OpenCV. Cada proyecto del portafolio tiene demo en línea y código público en GitHub para que lo revises.",
      ],
    },
    {
      heading: "Cómo trabajar conmigo",
      paragraphs: [
        "Escríbeme por WhatsApp o correo con lo que necesitas, para cuándo lo quieres y cómo está hoy tu proyecto. Respondo con una propuesta de alcance, plazo y siguientes pasos.",
      ],
    },
  ],
};

export const contactPage: InfoPageContent = {
  path: "/contact",
  title: "Contacto",
  description:
    "Contacta a Fabio Fruto Jimenez, desarrollador freelance en Barranquilla, por WhatsApp o correo para cotizar tu sitio web, app móvil o automatización con IA.",
  intro:
    "Cuéntame qué necesitas y te respondo con una propuesta clara. Atiendo desde Barranquilla, Colombia, sitios web, apps móviles, tiendas en línea y automatizaciones con IA. Elige el canal que prefieras.",
  sections: [
    {
      heading: "Canales de contacto",
      paragraphs: [
        `Correo electrónico: ${CONTACT.email}`,
        `WhatsApp: ${CONTACT.phone} (${CONTACT.whatsappUrl})`,
        `LinkedIn: ${CONTACT.linkedin}`,
        `GitHub: ${CONTACT.github}`,
        `Instagram: ${CONTACT.instagram}`,
      ],
    },
    {
      heading: "Qué incluir en tu mensaje",
      paragraphs: [
        "Para responderte con una propuesta útil, cuéntame qué quieres construir, quién lo usará, si ya existe algo desarrollado, para cuándo lo necesitas y, si lo tienes, un presupuesto de referencia. Si eres una agencia, indícame el alcance del proyecto de tu cliente.",
        "Tu mensaje llega directamente por el canal que elijas y no se almacena en este sitio. También puedes armar tu cotización con el cotizador del inicio, que deja el resumen listo en WhatsApp.",
      ],
    },
    {
      heading: "Temas en los que puedo ayudarte",
      paragraphs: [
        "Sitios web y landing pages con React y Next.js, apps para Android e iOS con React Native, tiendas en línea, automatizaciones con n8n y OpenAI, y clases o asesorías de programación.",
      ],
    },
  ],
};

export const privacyPage: InfoPageContent = {
  path: "/privacy",
  title: "Política de privacidad",
  description:
    "Qué datos trata el portafolio de Fabio Fruto Jimenez: sin cookies de seguimiento, sin cuentas de usuario y con un asistente de IA opcional en el cotizador.",
  intro:
    "Este sitio es un portafolio informativo. Está diseñado para tratar la mínima cantidad de datos posible. Esta página explica qué se guarda, dónde y cómo puedes pedir información. Última actualización: 31 de octubre de 2026.",
  sections: [
    {
      heading: "Datos que se guardan en tu navegador",
      paragraphs: [
        "El sitio no guarda datos en tu navegador, salvo una excepción: en las pocas páginas que incluyen el selector de modo claro u oscuro, tu elección se guarda en el almacenamiento local (localStorage). Ese dato permanece en tu dispositivo, no se envía a ningún servidor y puedes borrarlo limpiando los datos del sitio.",
      ],
    },
    {
      heading: "Cotizador y asistente de IA",
      paragraphs: [
        "El cotizador del inicio arma tu resumen en tu navegador y lo envía por WhatsApp solo cuando tú pulsas el botón final. Este sitio no guarda tus respuestas.",
        "Si usas el asistente de IA del cotizador, el texto que escribes se envía desde el servidor de este sitio a la API de Gemini de Google para generar la respuesta. No incluyas datos sensibles como contraseñas, documentos de identidad o información bancaria. El sitio limita la cantidad de mensajes por persona.",
      ],
    },
    {
      heading: "Lo que este sitio no hace",
      paragraphs: [
        "No usa cookies de seguimiento ni de publicidad, no incluye herramientas de analítica de terceros, no tiene cuentas de usuario y no vende ni comparte datos personales.",
      ],
    },
    {
      heading: "Registros técnicos del hosting",
      paragraphs: [
        "Como cualquier sitio web, el proveedor de hosting puede registrar datos técnicos estándar de cada visita, como la dirección IP, el tipo de navegador y la fecha de la solicitud, con fines de seguridad y funcionamiento. Estos registros los gestiona el proveedor según sus propias políticas.",
      ],
    },
    {
      heading: "Enlaces y servicios externos",
      paragraphs: [
        "El sitio enlaza a servicios de terceros como GitHub, LinkedIn, Instagram, WhatsApp, Google Drive y las demostraciones de proyectos. Al abrirlos, el tratamiento de tus datos se rige por las políticas de cada servicio. Si me escribes por correo o WhatsApp, usaré tus datos únicamente para responderte.",
      ],
    },
    {
      heading: "Consultas y solicitudes",
      paragraphs: [
        `Si tienes preguntas sobre esta política o quieres que elimine una conversación de contacto, escríbeme a ${CONTACT.email}.`,
      ],
    },
  ],
};

export const infoPages = [aboutPage, contactPage, privacyPage] as const;

export const services = [
  {
    title: "Sitios web",
    description:
      "Un sitio rápido que se ve bien en el celular, con tus productos, horarios y ubicación, y un botón para que el cliente te escriba por WhatsApp. Lo dejo listo para que Google lo encuentre.",
    steps: ["Búsqueda", "Visita", "Contacto"],
  },
  {
    title: "Landing pages",
    description:
      "Una sola página para una sola acción: cotizar, reservar o pedir. Ejemplo real: Umami, la landing de un restaurante de comida costeña que lleva a pedir por WhatsApp.",
    steps: ["Oferta", "Confianza", "Conversión"],
  },
  {
    title: "Apps móviles",
    description:
      "Tu app para Android y iOS desde un solo código: pedidos, citas o avisos a tus clientes. Yo me encargo también de publicarla en Google Play y App Store.",
    steps: ["Instalación", "Uso", "Avisos"],
  },
  {
    title: "Tiendas en línea",
    description:
      "Catálogo, pagos e inventario en un solo sistema, para que vendas a cualquier hora sin atender cada pedido a mano.",
    steps: ["Catálogo", "Pago", "Pedido"],
  },
  {
    title: "Automatizaciones con IA",
    description:
      "Un asistente que responde preguntas con tus propios documentos y hace por ti las tareas repetitivas. Ejemplo real: un bot de Telegram que consulta tu Google Drive.",
    steps: ["Mensaje", "Asistente", "Tarea lista"],
  },
] as const;

export const projectSummaries = [
  {
    category: "Visión por computador",
    outcome:
      "Controla quién entra a la universidad con el rostro y la placa del vehículo, con reportes en tiempo real. Publicado en ACOFI 2024.",
    featured: true,
    title: "UniSecure: control de acceso universitario",
    description:
      "Plataforma de seguridad con reconocimiento facial y lectura de placas (LPR), gestión de roles y reportes en tiempo real.",
    demoUrl: "https://unisecure-front.vercel.app/",
    githubUrl: "https://github.com/fabiofruto88/unisecure",
    image: "/images/unisecure-home.webp",
    tags: ["React","Python","OpenCV","FastAPI"],
    kind: "Acceso",
  },
  {
    category: "Visión por computador",
    outcome:
      "Controla el acceso a un hospital por rostro y placa, con permisos distintos para médicos, personal y visitantes.",
    featured: false,
    title: "MediSecure: control de acceso hospitalario",
    description:
      "Seguridad para hospitales con reconocimiento facial y LPR, roles de médicos, personal y visitantes.",
    demoUrl: "https://medisecure-front-gq4c.vercel.app/",
    githubUrl: "https://github.com/fabiofruto88/medisecure-front",
    image: "/images/medisecure.webp",
    tags: ["React","Python","OpenCV","Node.js"],
    kind: "Acceso",
  },
  {
    category: "Sitios web",
    outcome:
      "Presenta la marca de un restaurante de comida costeña y lleva al visitante a pedir por WhatsApp.",
    featured: true,
    title: "Umami Landing: marca gastronómica",
    description:
      "Landing responsive enfocada en presentación de marca y conversión con React, TypeScript y Material UI.",
    demoUrl: "https://umami-beta-rust-21.vercel.app/",
    githubUrl: "https://github.com/fabiofruto88/umami-landing-front",
    image: "/images/umami.webp",
    tags: ["React","TypeScript","Material UI"],
    kind: "Landing",
  },
  {
    category: "Aplicaciones web",
    outcome:
      "Panel para administrar hoteles y habitaciones, con usuarios por rol y galería de fotos.",
    featured: false,
    title: "VAOVA: gestión de hoteles (prueba técnica)",
    description:
      "Auth con roles, CRUD de hoteles y habitaciones y galería, con TypeScript y Material UI.",
    demoUrl: "https://vaova-prueba-tecnica-ts.vercel.app/",
    githubUrl: "https://github.com/fabiofruto88/vaova-prueba-tecnica-ts",
    image: "/images/vaova.webp",
    tags: ["React","TypeScript","Material UI"],
    kind: "Prueba técnica",
  },
  {
    category: "Aplicaciones web",
    outcome:
      "Quiz configurable con temporizador e historial de resultados, que cualquiera puede adaptar con sus preguntas.",
    featured: false,
    title: "Quiz interactivo personalizable",
    description:
      "Quiz con preguntas en JSON, temporizador, historial de resultados y UI con Material UI.",
    demoUrl: "https://quiz-ten-taupe.vercel.app/",
    githubUrl: "https://github.com/fabiofruto88/quiz",
    image: "/images/quiz.webp",
    tags: ["React","JavaScript","Material UI"],
    kind: "Web app",
  },
  {
    category: "Automatización con IA",
    outcome:
      "Un bot de Telegram que responde preguntas usando los documentos de Google Drive de tu equipo.",
    featured: true,
    title: "RAG en n8n: bot de Telegram con PGVector",
    description:
      "Bot que responde con documentos de Google Drive usando OpenAI Embeddings y Postgres (PGVector).",
    demoUrl: "https://youtu.be/Yrtntm9BK0g?si=pxkBieC9oRgya4VS",
    githubUrl: "https://github.com/fabiofruto88/prueba-tenica-n8n-2025",
    image: "/images/rag.webp",
    tags: ["n8n","PostgreSQL","OpenAI","Telegram"],
    kind: "Automatización",
  },
];

export const featuredProjects = projectSummaries.filter((p) => p.featured);

export const projectCategories = [
  "Todos",
  ...Array.from(new Set(projectSummaries.map((p) => p.category))),
] as const;

export const recognitions = [
  {
    kind: "Publicación",
    label: "ACOFI 2024",
    title:
      "UNISECURE: Prototipo de Sistema de Acceso Automatizado Mediante Reconocimiento Facial y de Placas Vehiculares",
    venue: "ACOFI 2024 - Encuentro Internacional de Educación en Ingeniería",
    description:
      "Sistema de automatización de acceso mediante reconocimiento facial y de placas vehiculares para instituciones educativas. DOI: 10.26507/paper.3977. Co-autores: Lourdes De Avila Gutierrez, Jesús David Jiménez Cortinez.",
  },
  {
    kind: "Ponencia nacional",
    label: "RedCOLSI 2024",
    title:
      "UniSecure - Sistema de Acceso Automatizado para Instituciones Educativas",
    venue: "XXVII Encuentro Nacional de Semilleros de Investigación",
    description:
      "Presentación del prototipo UniSecure en el encuentro nacional e internacional de semilleros de investigación. Universidad de la Costa, Barranquilla (9-12 octubre 2024). Rol: ponente y desarrollador.",
  },
  {
    kind: "Ponencia nacional",
    label: "RedCOLSI 2025",
    title:
      "MediSecure - Sistema de Acceso Automatizado para Instalaciones Médicas",
    venue: "XXVIII Encuentro Nacional de Semilleros de Investigación",
    description:
      "Evolución del sistema UniSecure adaptado para instalaciones médicas mediante reconocimiento facial y de placas vehiculares. UNIMINUTO, Bogotá (7-10 octubre 2025). Rol: ponente y desarrollador.",
  },
] as const;

export const stats = [
  { value: 2, suffix: "+", label: "años de experiencia" },
  { value: projectSummaries.length, suffix: "", label: "proyectos con demo y código" },
  { value: recognitions.length, suffix: "", label: "publicaciones y ponencias" },
] as const;

export const skillGroups = [
  { group: "Frontend", items: ["React", "Next.js", "TypeScript", "JavaScript", "Material UI", "HTML5", "CSS3"] },
  { group: "Móvil", items: ["React Native", "Android", "iOS"] },
  { group: "Backend y datos", items: ["Python", "FastAPI", "MySQL", "PostgreSQL"] },
  { group: "IA y automatización", items: ["n8n", "OpenAI", "OpenCV", "PGVector"] },
] as const;

export const CONTACT_BLURB =
  "Cuéntame qué necesitas, para cuándo lo quieres y cómo está hoy tu proyecto. Te respondo con una propuesta clara: alcance, plazo y siguientes pasos.";

export const CONTACT_AGENCY =
  "¿Eres una agencia o una empresa de desarrollo? También trabajo como desarrollador subcontratado en los proyectos de tus clientes.";

export const HOME = {
  title: "Desarrollador freelance en Barranquilla | Web, apps e IA",
  summary:
    "Fabio Fruto Jimenez es desarrollador de software freelance en Barranquilla, Colombia. Crea sitios web, apps móviles y automatizaciones con IA para negocios y emprendedores, y acompaña cada proyecto desde la idea hasta su publicación.",
};

export const HERO_SUB =
  "Desarrollador freelance en Barranquilla. Hago sitios web, apps móviles y automatizaciones con IA, y te acompaño de la idea a la publicación.";

export const WHATSAPP_QUOTE_URL = `${CONTACT.whatsappUrl}?text=${encodeURIComponent(
  "Hola Fabio, vi tu portafolio y quiero cotizar un proyecto. Necesito: ",
)}`;

function toMarkdownPage(page: InfoPageContent): string {
  const sections = page.sections
    .map((s) => `## ${s.heading}\n\n${s.paragraphs.join("\n\n")}`)
    .join("\n\n");
  return `# ${page.title}\n\n${page.intro}\n\n${sections}\n\n${navFooter()}\n`;
}

function navFooter(): string {
  return `---\n\n[Inicio](${SITE_URL}/) · [Sobre mí](${SITE_URL}/about) · [Contacto](${SITE_URL}/contact) · [Privacidad](${SITE_URL}/privacy) · [llms.txt](${SITE_URL}/llms.txt) · [Sitemap](${SITE_URL}/sitemap.xml)`;
}

function timeline(items: typeof experienceItems): string {
  return items
    .map(
      (i) =>
        `### ${i.role} — ${i.company}\n\n${i.period}\n\n${i.bullets.map((b) => `- ${b}`).join("\n")}`,
    )
    .join("\n\n");
}

export function homeMarkdown(): string {
  return `# Fabio Fruto Jimenez

${HOME.summary}

## Servicios

${services.map((s) => `- **${s.title}**: ${s.description}`).join("\n")}

## Experiencia profesional

${timeline(experienceItems)}

## Educación

${timeline(educationItems)}

## Precios orientativos

${pricingMarkdown()}

## Proyectos

Catálogo completo en [/proyectos](${SITE_URL}/proyectos).

${projectSummaries
  .map(
    (p) =>
      `- **${p.title}**: ${p.description} [Demo](${p.demoUrl}) · [Código](${p.githubUrl})`,
  )
  .join("\n")}

## Publicaciones y ponencias

${recognitions
  .map((r) => `- **${r.title}** (${r.kind}, ${r.label}): ${r.description}`)
  .join("\n")}

## Tecnologías

${skillGroups.map((g) => `- **${g.group}**: ${g.items.join(", ")}`).join("\n")}

## Contacto

- Correo: ${CONTACT.email}
- WhatsApp: ${CONTACT.whatsappUrl}
- LinkedIn: ${CONTACT.linkedin}
- GitHub: ${CONTACT.github}

${navFooter()}
`;
}

export function projectsMarkdown(): string {
  const items = projectSummaries.map(
    (p) =>
      `## ${p.title}

${p.category}. ${p.outcome}

${p.description}

Tecnologías: ${p.tags.join(", ")}

[Demo](${p.demoUrl}) · [Código](${p.githubUrl})`,
  );
  return `# Proyectos de Fabio Fruto Jimenez

Software real con demo y código público.

${items.join("\n\n")}

${navFooter()}
`;
}

/** Devuelve el Markdown de una ruta conocida, o null si la ruta no existe. */
export function markdownForPath(pathname: string): string | null {
  const normalized = pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
  if (normalized === "/") return homeMarkdown();
  if (normalized === "/proyectos") return projectsMarkdown();
  const page = infoPages.find((p) => p.path === normalized);
  return page ? toMarkdownPage(page) : null;
}

export function notFoundMarkdown(pathname: string): string {
  return `# 404: página no encontrada

La ruta \`${pathname.replace(/[`\r\n]/g, "")}\` no existe en ${SITE_URL}. Revisa el índice del sitio para encontrar lo que buscas.

- [Inicio](${SITE_URL}/): resumen del portafolio, servicios, experiencia y proyectos
- [Proyectos](${SITE_URL}/proyectos)
- [Sobre mí](${SITE_URL}/about)
- [Contacto](${SITE_URL}/contact)
- [Privacidad](${SITE_URL}/privacy)
- [llms.txt](${SITE_URL}/llms.txt): guía para agentes de IA
- [Sitemap](${SITE_URL}/sitemap.xml): lista de todas las páginas
`;
}
