import type { Metadata } from "next";
import InfoPage from "@/components/common/InfoPage";
import { contactPage } from "@/data/site";
import { generateSEO, SITE_URL } from "@/lib/metadata";

export const metadata: Metadata = generateSEO({
  title: "Contacto y cotización por WhatsApp | Fabio Fruto",
  description: contactPage.description,
  url: `${SITE_URL}${contactPage.path}`,
});

export default function Page() {
  return <InfoPage page={contactPage} />;
}
