import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Impressum',
  description: 'Angaben gemäß § 5 TMG für PPT-Events.',
};

export default function ImpressumPage() {
  return (
    <main className="min-h-screen bg-[#FBFCFC] pt-32 pb-24 text-ppt-blue">
      <div className="container mx-auto px-6 lg:px-12 max-w-3xl space-y-6">
        <p className="text-ppt-pink font-bold uppercase tracking-widest text-sm">Rechtliches</p>
        <h1 className="text-4xl md:text-5xl font-extrabold">Impressum</h1>

        <section className="space-y-2 text-sm leading-relaxed">
          <h2 className="text-xl font-bold mt-8">Angaben gemäß § 5 TMG</h2>
          <p>
            [Firmenname]
            <br />
            [Straße und Hausnummer]
            <br />
            [PLZ Ort]
          </p>

          <h2 className="text-xl font-bold mt-8">Vertreten durch</h2>
          <p>[Name der vertretungsberechtigten Person]</p>

          <h2 className="text-xl font-bold mt-8">Kontakt</h2>
          <p>
            Telefon: [Telefonnummer]
            <br />
            E-Mail: [E-Mail-Adresse]
          </p>

          <h2 className="text-xl font-bold mt-8">Umsatzsteuer-ID</h2>
          <p>[USt-IdNr. nach § 27a UStG]</p>

          <h2 className="text-xl font-bold mt-8">Redaktionell verantwortlich</h2>
          <p>
            [Name]
            <br />
            [Anschrift wie oben]
          </p>

          <p className="mt-12 text-xs text-zinc-500">
            Platzhalter-Inhalt. Bitte durch die tatsächlichen Angaben ersetzen.
          </p>
        </section>
      </div>
    </main>
  );
}
