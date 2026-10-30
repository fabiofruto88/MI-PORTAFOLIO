import type { Metadata } from "next";
import InfoPage from "@/components/common/InfoPage";
import { aboutPage } from "@/data/site";
import { generateSEO, SITE_URL } from "@/lib/metadata";

export const metadata: Metadata = generateSEO({
  title: `${aboutPage.title} | Fabio Fruto Jimenez`,
  description: aboutPage.description,
  url: `${SITE_URL}${aboutPage.path}`,
});

export default function Page() {
  return <InfoPage page={aboutPage} />;
}
