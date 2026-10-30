import type { Metadata } from "next";
import InfoPage from "@/components/common/InfoPage";
import { privacyPage } from "@/data/site";
import { generateSEO, SITE_URL } from "@/lib/metadata";

export const metadata: Metadata = generateSEO({
  title: `${privacyPage.title} | Fabio Fruto Jimenez`,
  description: privacyPage.description,
  url: `${SITE_URL}${privacyPage.path}`,
});

export default function Page() {
  return <InfoPage page={privacyPage} />;
}
