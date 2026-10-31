import type { Metadata } from "next";
import HomeStage from "@/components/home/HomeStage";
import ProjectsIndex from "@/components/home/ProjectsIndex";
import SectionContact from "@/components/home/SectionContact";
import { generateSEO, SITE_URL } from "@/lib/metadata";

export const metadata: Metadata = generateSEO({
  title: "Proyectos | Fabio Fruto Jimenez",
  description:
    "Proyectos de Fabio Fruto Jimenez: sitios web, aplicaciones y automatizaciones con IA, con demo en línea y código público en GitHub.",
  url: `${SITE_URL}/proyectos`,
});

export default function Page() {
  return (
    <HomeStage>
      <ProjectsIndex />
      <SectionContact />
    </HomeStage>
  );
}
