import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Datenschutzerklärung',
  description: 'Informationen zum Umgang mit personenbezogenen Daten bei PPT-Events.',
};

export default function DatenschutzPage() {
  return (
    <main className="min-h-screen bg-[#FBFCFC] pt-32 pb-24 text-ppt-blue">
      <div className="container mx-auto px-6 lg:px-12 max-w-3xl space-y-6">
        <p className="text-ppt-pink font-bold uppercase tracking-widest text-sm">Rechtliches</p>
        <h1 className="text-4xl md:text-5xl font-extrabold">Datenschutz</h1>

        <section className="space-y-4 text-sm leading-relaxed">
          <h2 className="text-xl font-bold mt-8">1. Verantwortlicher</h2>
          <p>
            Verantwortlich für die Datenverarbeitung auf dieser Website ist:
            <br />
            [Firmenname]
            <br />
            [Straße und Hausnummer]
            <br />
            [PLZ Ort]
            <br />
            E-Mail: [E-Mail-Adresse]
          </p>

          <h2 className="text-xl font-bold mt-8">2. Erhobene Daten bei Event-Anmeldung</h2>
          <p>
            Bei der Anmeldung zu einem Event verarbeiten wir Vorname, Nachname, E-Mail-Adresse
            und optional Firmen- und Nachrichtenangaben. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b
            DSGVO (Vertragsanbahnung) bzw. lit. a (Einwilligung) für optionale Felder.
          </p>

          <h2 className="text-xl font-bold mt-8">3. E-Mail-Versand</h2>
          <p>
            Zur Versendung von Bestätigungs- und Erinnerungsmails nutzen wir den Dienstleister
            Resend. Mit Resend besteht ein Auftragsverarbeitungsvertrag.
          </p>

          <h2 className="text-xl font-bold mt-8">4. Hosting</h2>
          <p>
            Diese Website wird bei Vercel Inc. gehostet; die Datenbank wird bei Neon betrieben.
            Serverlogs werden nur zur Sicherstellung des Betriebs verarbeitet.
          </p>

          <h2 className="text-xl font-bold mt-8">5. Ihre Rechte</h2>
          <p>
            Sie haben das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der
            Verarbeitung, Datenübertragbarkeit und Widerspruch. Kontaktieren Sie uns hierzu
            unter der oben genannten E-Mail-Adresse.
          </p>

          <p className="mt-12 text-xs text-zinc-500">
            Platzhalter-Inhalt. Bitte durch eine vollständige, juristisch geprüfte
            Datenschutzerklärung ersetzen.
          </p>
        </section>
      </div>
    </main>
  );
}
