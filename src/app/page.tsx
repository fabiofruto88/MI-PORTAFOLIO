import HomeStage from "@/components/home/HomeStage";
import HomeHero from "@/components/home/HomeHero";
import SectionManifesto from "@/components/home/SectionManifesto";
import SectionServices from "@/components/home/SectionServices";
import SectionStack from "@/components/home/SectionStack";
import SectionExperience from "@/components/home/SectionExperience";
import SectionProjects from "@/components/home/SectionProjects";
import SectionRecognitions from "@/components/home/SectionRecognitions";
import SectionContact from "@/components/home/SectionContact";

export default function Home() {
  return (
    <HomeStage>
      <HomeHero />
      <SectionManifesto />
      <SectionServices />
      <SectionStack />
      <SectionExperience />
      <SectionProjects />
      <SectionRecognitions />
      <SectionContact />
    </HomeStage>
  );
}
