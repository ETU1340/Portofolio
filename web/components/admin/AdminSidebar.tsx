'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

const navItems = [
  { href: '/admin/projects', label: 'Projets' },
  { href: '/admin/skills', label: 'Compétences' },
  { href: '/admin/messages', label: 'Messages' },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const logout = async () => {
    await fetch('/api/auth/logout', {
      method: 'POST',
      credentials: 'include',
    });
    router.push('/admin/login');
    router.refresh();
  };

  return (
    <aside className="flex w-56 flex-col border-r border-cyan-500/20 bg-zinc-950 p-6">
      <Link href="/admin/projects" className="mb-8 font-mono text-cyan-400">
        Admin Panel
      </Link>
      <nav className="flex flex-1 flex-col gap-2">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`rounded-lg px-3 py-2 text-sm transition ${
              pathname.startsWith(item.href)
                ? 'bg-cyan-500/10 text-cyan-400'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            {item.label}
          </Link>
        ))}
      </nav>
      <div className="space-y-2 border-t border-zinc-800 pt-4">
        <Link href="/" className="block text-sm text-zinc-500 hover:text-zinc-300">
          ← Vitrine
        </Link>
        <button
          onClick={logout}
          className="text-sm text-red-400 hover:text-red-300"
        >
          Déconnexion
        </button>
      </div>
    </aside>
  );
}
