import { Terminal, Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="relative mt-auto border-t border-border/60 py-8 px-6">
      <div className="mx-auto max-w-5xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 font-mono text-sm text-muted-foreground">
          <Terminal className="h-4 w-4 text-neon-green" />
          <span className="text-neon-green">alex</span>
          <span>.dev</span>
        </div>

        <p className="font-mono text-xs text-muted-foreground flex items-center gap-1.5">
          Conçu avec <Heart className="h-3 w-3 text-neon-green" /> et Next.js
        </p>

        <p className="font-mono text-xs text-muted-foreground">
          © {new Date().getFullYear()} Alex Carter. Tous droits réservés.
        </p>
      </div>
    </footer>
  );
}
