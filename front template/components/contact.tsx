'use client';

import { useState } from 'react';
import { Mail, Send, MapPin, Phone, Github, Linkedin } from 'lucide-react';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
      setForm({ name: '', email: '', message: '' });
      setTimeout(() => setSent(false), 4000);
    }, 1200);
  };

  return (
    <section id="contact" className="relative py-24 px-6">
      <div className="mx-auto max-w-5xl">
        <div className="mb-12">
          <p className="font-mono text-sm text-neon-green mb-2">
            <span className="text-muted-foreground">$</span> ./contact.sh
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold">Travaillons ensemble</h2>
          <p className="text-muted-foreground mt-3 max-w-2xl">
            Une idée de projet ? Une opportunité de collaboration ? N'hésitez pas
            à me contacter, je réponds généralement sous 24h.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="rounded-xl border border-border bg-card/50 p-6">
              <h3 className="font-mono text-sm font-semibold text-neon-green mb-4">
                // Coordonnées
              </h3>
              <div className="space-y-4">
                {[
                  { icon: Mail, label: 'Email', value: 'alex@carter.dev' },
                  { icon: Phone, label: 'Téléphone', value: '+33 6 12 34 56 78' },
                  { icon: MapPin, label: 'Localisation', value: 'Paris, France' },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-neon-green/10">
                      <Icon className="h-4 w-4 text-neon-green" />
                    </div>
                    <div>
                      <p className="font-mono text-xs text-muted-foreground">
                        {label}
                      </p>
                      <p className="font-mono text-sm text-foreground">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-border bg-card/50 p-6">
              <h3 className="font-mono text-sm font-semibold text-neon-cyan mb-4">
                // Réseaux sociaux
              </h3>
              <div className="flex gap-3">
                {[
                  { Icon: Github, href: 'https://github.com', label: 'GitHub' },
                  {
                    Icon: Linkedin,
                    href: 'https://linkedin.com',
                    label: 'LinkedIn',
                  },
                  { Icon: Mail, href: 'mailto:alex@carter.dev', label: 'Email' },
                ].map(({ Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    target={href.startsWith('mailto') ? undefined : '_blank'}
                    rel={
                      href.startsWith('mailto') ? undefined : 'noopener noreferrer'
                    }
                    className="flex h-11 w-11 items-center justify-center rounded-lg border border-border bg-secondary/50 text-muted-foreground transition-all duration-200 hover:border-neon-green/50 hover:text-neon-green hover:bg-neon-green/5"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="rounded-xl border border-border bg-card/50 p-6 space-y-4"
          >
            <h3 className="font-mono text-sm font-semibold text-neon-green mb-2">
              // Envoyer un message
            </h3>

            <div>
              <label className="font-mono text-xs text-muted-foreground mb-1.5 block">
                Nom
              </label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full rounded-lg border border-border bg-background/50 px-4 py-2.5 font-mono text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-neon-green/50 focus:outline-none focus:ring-1 focus:ring-neon-green/30 transition-colors"
                placeholder="Votre nom"
              />
            </div>

            <div>
              <label className="font-mono text-xs text-muted-foreground mb-1.5 block">
                Email
              </label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full rounded-lg border border-border bg-background/50 px-4 py-2.5 font-mono text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-neon-green/50 focus:outline-none focus:ring-1 focus:ring-neon-green/30 transition-colors"
                placeholder="vous@exemple.com"
              />
            </div>

            <div>
              <label className="font-mono text-xs text-muted-foreground mb-1.5 block">
                Message
              </label>
              <textarea
                required
                rows={4}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full rounded-lg border border-border bg-background/50 px-4 py-2.5 font-mono text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-neon-green/50 focus:outline-none focus:ring-1 focus:ring-neon-green/30 transition-colors resize-none"
                placeholder="Parlez-moi de votre projet..."
              />
            </div>

            <button
              type="submit"
              disabled={loading || sent}
              className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-neon-green px-6 py-3 font-mono text-sm font-semibold text-background transition-all duration-300 hover:glow-green disabled:opacity-60"
            >
              {loading ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-background/30 border-t-background" />
                  Envoi...
                </>
              ) : sent ? (
                'Message envoyé !'
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  Envoyer
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
