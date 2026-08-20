import { PortfolioLayout } from "@/components/portfolio-layout"
import { AboutSection } from "@/components/about-section"
import { SkillsSection } from "@/components/skills-section"
import { ProjectsSection } from "@/components/projects-section"
import { PublicationsSection } from "@/components/publications-section"
import { ContactSection } from "@/components/contact-section"
import { LikeWidget } from "@/components/like-widget"
import { personalData } from "@/lib/data"

export default function Home() {
  return (
    <PortfolioLayout>
      <div className="space-y-16 pb-16">
        <AboutSection data={personalData} />
        <SkillsSection skills={personalData.skills} />
        <ProjectsSection />
        <PublicationsSection />
        <div className="grid gap-6 md:grid-cols-2">
          <ContactSection />
          <div className="flex flex-col">
            <LikeWidget />
          </div>
        </div>
      </div>
    </PortfolioLayout>
  )
}
