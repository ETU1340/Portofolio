import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { GridBackground } from '@/components/GridBackground';
import { ProjectGallery } from '@/components/ProjectGallery';
import { SkillsMatrix } from '@/components/SkillsMatrix';
import { ContactForm } from '@/components/ContactForm';
import { getProjects, getSkills, getProfile } from '@/lib/api';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const [projects, skills, profile] = await Promise.all([
    getProjects().catch(() => []),
    getSkills().catch(() => []),
    getProfile().catch(() => null),
  ]);

  return (
    <>
      <GridBackground />
      <Navbar />
      <main className="relative flex-1">
        <Hero profile={profile} />
        <About profile={profile} />
        <SkillsMatrix skills={skills} />
        <ProjectGallery projects={projects} />
        <ContactForm profile={profile} />
      </main>
      <Footer />
    </>
  );
}
