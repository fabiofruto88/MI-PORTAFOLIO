import type { Metadata } from "next";
import InfoPage from "@/components/common/InfoPage";
import HomeStage from "@/components/home/HomeStage";
import SectionContact from "@/components/home/SectionContact";
import { privacyPage } from "@/data/site";
import { generateSEO, SITE_URL } from "@/lib/metadata";

export const metadata: Metadata = generateSEO({
  title: `${privacyPage.title} | Fabio Fruto Jimenez`,
  description: privacyPage.description,
  url: `${SITE_URL}${privacyPage.path}`,
});

export default function Page() {
  return (
    <HomeStage>
      <InfoPage page={privacyPage} />
      <SectionContact />
    </HomeStage>
  );
}
