import IntroSection from "@/components/sections/IntroSection";
import SkillsSection from "@/components/sections/SkillsSection";
import ServicesSection from "@/components/sections/ServicesSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import RecognitionsSection from "@/components/sections/RecognitionsSection";
import AboutSection from "@/components/sections/AboutSection";
import ContactSection from "@/components/sections/ContactSection";

export default function Home() {
  return (
    <>
      <IntroSection />
      <SkillsSection />
      <ServicesSection />
      <ExperienceSection />
      <ProjectsSection />
      <RecognitionsSection />
      <AboutSection />
      <ContactSection />
    </>
  );
}
