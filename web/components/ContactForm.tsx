'use client';

import { useState } from 'react';
import { Mail, Send, MapPin, Phone } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@/components/BrandIcons';
import { sendContact } from '@/lib/api';
import type { Profile } from '@/lib/types';

interface ContactFormProps {
  profile: Profile | null;
}

interface ContactFormState {
  senderName: string;
  senderEmail: string;
  subject: string;
  content: string;
}

const emptyForm: ContactFormState = {
  senderName: '',
  senderEmail: '',
  subject: '',
  content: '',
};

export function ContactForm({ profile }: ContactFormProps) {
  const [form, setForm] = useState<ContactFormState>(emptyForm);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>(
    'idle',
  );
  const [error, setError] = useState('');

  const contactEmail = profile?.email ?? 'alex@carter.dev';
  const contactPhone = profile?.phone ?? '+33 6 12 34 56 78';
  const contactLocation = profile?.location ?? 'Paris, France';
  const githubUrl =
    profile?.githubUrl ?? process.env.NEXT_PUBLIC_GITHUB_URL ?? 'https://github.com';
  const linkedinUrl =
    profile?.linkedinUrl ??
    process.env.NEXT_PUBLIC_LINKEDIN_URL ??
    'https://linkedin.com';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setError('');
    try {
      await sendContact(form);
      setStatus('success');
      setForm(emptyForm);
    } catch (err) {
      setStatus('error');
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
    }
  };

  const update =
    (field: keyof ContactFormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [field]: e.target.value }));

  const inputClass =
    'w-full rounded-lg border border-border bg-background/50 px-4 py-2.5 font-mono text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-neon-green/50 focus:outline-none focus:ring-1 focus:ring-neon-green/30 transition-colors';

  return (
    <section id="contact" className="relative py-24 px-6">
      <div className="mx-auto max-w-5xl">
        <div className="mb-12">
          <p className="font-mono text-sm text-neon-green mb-2">
            <span className="text-muted-foreground">$</span> ./contact.sh
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold">Travaillons ensemble</h2>
          <p className="text-muted-foreground mt-3 max-w-2xl">
            Une idée de projet ? Une opportunité de collaboration ? N&apos;hésitez
            pas à me contacter, je réponds généralement sous 24h.
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
                  { icon: Mail, label: 'Email', value: contactEmail },
                  ...(contactPhone
                    ? [{ icon: Phone, label: 'Téléphone', value: contactPhone }]
                    : []),
                  ...(contactLocation
                    ? [{ icon: MapPin, label: 'Localisation', value: contactLocation }]
                    : []),
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
                  { Icon: GithubIcon, href: githubUrl, label: 'GitHub' },
                  { Icon: LinkedinIcon, href: linkedinUrl, label: 'LinkedIn' },
                  {
                    Icon: Mail,
                    href: `mailto:${contactEmail}`,
                    label: 'Email',
                  },
                ].map(({ Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    target={href.startsWith('mailto') ? undefined : '_blank'}
                    rel={
                      href.startsWith('mailto')
                        ? undefined
                        : 'noopener noreferrer'
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
                value={form.senderName}
                onChange={update('senderName')}
                className={inputClass}
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
                value={form.senderEmail}
                onChange={update('senderEmail')}
                className={inputClass}
                placeholder="vous@exemple.com"
              />
            </div>

            <div>
              <label className="font-mono text-xs text-muted-foreground mb-1.5 block">
                Sujet
              </label>
              <input
                type="text"
                required
                value={form.subject}
                onChange={update('subject')}
                className={inputClass}
                placeholder="Objet du message"
              />
            </div>

            <div>
              <label className="font-mono text-xs text-muted-foreground mb-1.5 block">
                Message
              </label>
              <textarea
                required
                rows={4}
                value={form.content}
                onChange={update('content')}
                className={`${inputClass} resize-none`}
                placeholder="Parlez-moi de votre projet..."
              />
            </div>

            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-neon-green px-6 py-3 font-mono text-sm font-semibold text-background transition-all duration-300 hover:glow-green disabled:opacity-60"
            >
              {status === 'loading' ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-background/30 border-t-background" />
                  Envoi...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  Envoyer
                </>
              )}
            </button>
            {status === 'success' && (
              <p className="text-center font-mono text-sm text-neon-green">
                Message envoyé avec succès !
              </p>
            )}
            {status === 'error' && (
              <p className="text-center font-mono text-sm text-destructive">
                {error}
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
