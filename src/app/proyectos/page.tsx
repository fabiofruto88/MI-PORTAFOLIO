import type { Metadata } from "next";
import HomeStage from "@/components/home/HomeStage";
import ProjectsIndex from "@/components/home/ProjectsIndex";
import SectionContact from "@/components/home/SectionContact";
import { generateSEO, SITE_URL } from "@/lib/metadata";

export const metadata: Metadata = generateSEO({
  title: "Proyectos de desarrollo web, apps e IA | Fabio Fruto",
  description:
    "6 proyectos reales de Fabio Fruto, desarrollador freelance en Barranquilla: landing de restaurante, control de acceso con IA publicado en ACOFI 2024 y bot RAG en n8n. Con demo y código.",
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
