import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Hero } from '@/components/Hero';
import { ProjectGallery } from '@/components/ProjectGallery';
import { SkillsMatrix } from '@/components/SkillsMatrix';
import { ContactForm } from '@/components/ContactForm';
import { getProjects, getSkills } from '@/lib/api';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const [projects, skills] = await Promise.all([
    getProjects().catch(() => []),
    getSkills().catch(() => []),
  ]);

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <ProjectGallery projects={projects} />
        <SkillsMatrix skills={skills} />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
