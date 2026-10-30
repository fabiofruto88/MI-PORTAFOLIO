import type { Metadata } from "next";
import InfoPage from "@/components/common/InfoPage";
import { contactPage } from "@/data/site";
import { generateSEO, SITE_URL } from "@/lib/metadata";

export const metadata: Metadata = generateSEO({
  title: `${contactPage.title} | Fabio Fruto Jimenez`,
  description: contactPage.description,
  url: `${SITE_URL}${contactPage.path}`,
});

export default function Page() {
  return <InfoPage page={contactPage} />;
}
