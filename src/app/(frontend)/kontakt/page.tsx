import type { Metadata } from 'next';
import { ContactClient } from '@/app/(frontend)/kontakt/ContactClient';

export const metadata: Metadata = {
  title: 'Kontakt',
  description: 'Kontaktiere PPT-Events für Fragen und Eventanfragen.',
};

export default function KontaktPage() {
  return (
    <main className="min-h-screen bg-[#FBFCFC] pt-32 pb-24 text-ppt-blue">
      <div className="container mx-auto max-w-5xl px-6">
        <div className="grid gap-12 lg:grid-cols-[1.1fr,0.9fr]">
          <div className="space-y-6">
            <p className="text-ppt-pink font-bold uppercase tracking-widest text-sm">Kontakt</p>
            <h1 className="text-4xl md:text-5xl font-extrabold">
              Lass uns gemeinsam dein nächstes Event planen
            </h1>
            <p className="text-zinc-500 leading-relaxed">
              Schreib uns gern eine Nachricht – wir melden uns zeitnah mit allen
              Details zurück. Alternativ erreichst du uns direkt per Mail.
            </p>

            <div className="rounded-3xl border border-black/5 bg-white p-6 shadow-sm space-y-3">
              <p className="text-sm font-semibold uppercase tracking-wide text-ppt-blue/70">
                PPT-Events · Pars pro Toto
              </p>
              <p className="text-sm">E-Mail: support@ppt-events.de</p>
              <p className="text-sm">Instagram: @pptevents</p>
            </div>
          </div>

          <ContactClient />
        </div>
      </div>
    </main>
  );
}
