import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ApiConsole } from '@/components/ApiConsole';

export const metadata = {
  title: 'Console API | Portfolio',
  description: 'Console interactive pour tester l\'API REST',
};

export default function ConsolePage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <ApiConsole />
      </main>
      <Footer />
    </>
  );
}
