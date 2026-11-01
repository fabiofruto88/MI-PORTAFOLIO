import type { Metadata } from "next";
import InfoPage from "@/components/common/InfoPage";
import HomeStage from "@/components/home/HomeStage";
import SectionContact from "@/components/home/SectionContact";
import { aboutPage } from "@/data/site";
import { generateSEO, SITE_URL } from "@/lib/metadata";

export const metadata: Metadata = generateSEO({
  title: "Sobre mí: desarrollador freelance en Barranquilla | Fabio Fruto",
  description: aboutPage.description,
  url: `${SITE_URL}${aboutPage.path}`,
});

export default function Page() {
  return (
    <HomeStage>
      <InfoPage page={aboutPage} />
      <SectionContact />
    </HomeStage>
  );
}
