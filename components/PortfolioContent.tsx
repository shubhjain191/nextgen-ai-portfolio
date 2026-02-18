import { HeroSection } from "./sections/HeroSection";
import { AboutSection } from "./sections/AboutSection";
import { TestimonialsSection } from "./sections/TestimonialsSection";
import { SkillsSection } from "./sections/SkillsSection";
import { ExperienceSection } from "./sections/ExperienceSection";
import { EducationSection } from "./sections/EducationSection";
import { ProjectsSection } from "./sections/ProjectSection";
import { AchievementsSection } from "./sections/AchievementsSection";
import { ServicesSection } from "./sections/ServicesSection";
import { BlogSection } from "./sections/BlogSection";
import { ContactSection } from "./sections/ContactSection";
import { Footer } from "./sections/Footer";

async function PortfolioContent() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <TestimonialsSection />
      <ExperienceSection />
      <ProjectsSection /> 
      <EducationSection /> 
      {/* <CertificationsSection /> */}
      <AchievementsSection /> 
      <ServicesSection /> 
      <BlogSection /> 
      <ContactSection /> 
      <Footer />
    </>

  );
}

export default PortfolioContent;
