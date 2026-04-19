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
        <h1 className="text-4xl md:text-5xl font-extrabold">Datenschutzerklärung</h1>

        <section className="space-y-4 text-sm leading-relaxed">
          <p>
            Der Schutz Ihrer persönlichen Daten ist uns ein wichtiges Anliegen. Wir verarbeiten
            Ihre Daten daher ausschließlich auf Grundlage der gesetzlichen Bestimmungen
            (DSGVO, TDDDG / ehem. TTDSG, BDSG). In diesen Datenschutzinformationen informieren
            wir Sie über die wichtigsten Aspekte der Datenverarbeitung im Rahmen unserer Website.
          </p>

          <h2 className="text-xl font-bold mt-8">1. Verantwortlicher</h2>
          <p>
            Verantwortlich für die Datenverarbeitung auf dieser Website ist:
            <br />
            Maurice Krüger
            <br />
            [Straße und Hausnummer]
            <br />
            [PLZ Ort]
            <br />
            E-Mail: [E-Mail-Adresse]
          </p>

          <h2 className="text-xl font-bold mt-8">2. Ihre Rechte als Betroffene/r</h2>
          <p>
            Ihnen stehen bezüglich Ihrer bei uns gespeicherten Daten grundsätzlich die Rechte
            auf Auskunft (Art. 15 DSGVO), Berichtigung (Art. 16), Löschung (Art. 17),
            Einschränkung der Verarbeitung (Art. 18), Datenübertragbarkeit (Art. 20) sowie
            Widerspruch (Art. 21) zu. Wenn Sie glauben, dass die Verarbeitung Ihrer Daten
            gegen das Datenschutzrecht verstößt oder Ihre datenschutzrechtlichen Ansprüche
            sonst in einer Weise verletzt worden sind, können Sie sich bei der Aufsichtsbehörde
            beschweren. In Deutschland ist dies die Datenschutzbehörde des jeweiligen
            Bundeslandes. Zur Ausübung Ihrer Rechte kontaktieren Sie uns bitte unter der
            oben genannten E-Mail-Adresse.
          </p>

          <h2 className="text-xl font-bold mt-8">3. Cookies</h2>
          <p>
            Unsere Website verwendet ausschließlich technisch notwendige Cookies, die für den
            Betrieb der Website unverzichtbar sind. Hierzu zählen insbesondere ein
            Session-Cookie für den geschützten Administrationsbereich (<code>/admin</code>)
            sowie Cookies, die Next.js für die sichere Verarbeitung von Formular-Aktionen
            (CSRF-Schutz) setzt. Rechtsgrundlage ist § 25 Abs. 2 Nr. 2 TDDDG bzw.
            Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse am fehlerfreien Betrieb).
          </p>
          <p>
            <strong>Wir setzen keine Tracking-, Analyse- oder Werbe-Cookies ein.</strong> Es
            werden keine Cookies von Drittanbietern gesetzt. Ein Cookie-Banner ist daher nicht
            erforderlich. Sie können das Speichern von Cookies in Ihrem Browser jederzeit
            deaktivieren; der Administrationsbereich ist dann jedoch nicht nutzbar.
          </p>

          <h2 className="text-xl font-bold mt-8">4. Hosting</h2>
          <p>
            Unsere Website wird bei der Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723,
            USA gehostet. Beim Aufruf der Website werden dabei u.&nbsp;a. IP-Adresse, Datum und
            Uhrzeit des Zugriffs, die aufgerufene Seite sowie User-Agent-Informationen in
            Serverlogs verarbeitet, um den Betrieb und die Sicherheit der Website zu
            gewährleisten. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO. Mit Vercel haben
            wir einen Vertrag zur Auftragsverarbeitung (Data Processing Agreement)
            abgeschlossen. Vercel verarbeitet Daten u.&nbsp;a. in der EU; für etwaige
            Übermittlungen in die USA greifen die EU-Standardvertragsklauseln sowie das
            EU-US Data Privacy Framework.
          </p>

          <h2 className="text-xl font-bold mt-8">5. Datenbank</h2>
          <p>
            Zur Speicherung der Inhalte dieser Website (u.&nbsp;a. Veranstaltungen,
            Anmeldungen, Newsletter-Abonnements, Kontaktnachrichten) nutzen wir den
            Managed-Postgres-Dienst Neon (Neon Inc.). Der Datenbank-Server befindet sich in
            einer Region innerhalb der Europäischen Union. Mit Neon besteht ein Vertrag zur
            Auftragsverarbeitung.
          </p>

          <h2 className="text-xl font-bold mt-8">6. Medien und Bilder</h2>
          <p>
            Medien (z.&nbsp;B. Event-Bilder) werden über Vercel Blob Storage ausgeliefert.
            Beim Abruf eines Bildes werden technisch notwendige Verbindungsdaten
            (IP-Adresse, User-Agent) verarbeitet, soweit dies für die Auslieferung
            erforderlich ist.
          </p>

          <h2 className="text-xl font-bold mt-8">7. Schriftarten</h2>
          <p>
            Wir verwenden Schriftarten, die lokal von unserem Server ausgeliefert werden
            (selfhosting über <code>next/font</code>). Es findet <strong>keine Verbindung zu
            Google Fonts oder anderen externen Font-CDN</strong> statt. Es werden hierdurch
            keine personenbezogenen Daten an Dritte übertragen.
          </p>

          <h2 className="text-xl font-bold mt-8">8. Event-Anmeldung</h2>
          <p>
            Wenn Sie sich über unsere Website zu einer Veranstaltung anmelden, verarbeiten
            wir folgende Daten: Vorname, Nachname, E-Mail-Adresse sowie optional Ihren
            Firmennamen und eine Nachricht an uns. Diese Daten werden zur Durchführung der
            Veranstaltung (Teilnehmerverwaltung, Versand von Bestätigungs- und
            Erinnerungsmails) verwendet.
          </p>
          <p>
            Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO (Durchführung vorvertraglicher
            bzw. vertraglicher Maßnahmen). Pflichtfelder sind als solche gekennzeichnet; ohne
            diese Angaben können wir Ihre Anmeldung nicht bearbeiten. Die Daten werden
            gelöscht, sobald sie für den Zweck ihrer Erhebung nicht mehr erforderlich sind
            und keine gesetzlichen Aufbewahrungspflichten entgegenstehen.
          </p>

          <h2 className="text-xl font-bold mt-8">9. Bestätigungs- und Erinnerungs-E-Mails</h2>
          <p>
            Für den Versand transaktionaler E-Mails (Anmeldebestätigung, Event-Erinnerung)
            nutzen wir den Dienst Resend (Resend, Inc., San Francisco, USA). An Resend
            übermitteln wir die für den Versand notwendigen Daten (E-Mail-Adresse, Name,
            Inhalt der Nachricht). Mit Resend besteht ein Vertrag zur Auftragsverarbeitung;
            die Übermittlung in die USA erfolgt auf Grundlage der EU-Standardvertragsklauseln
            sowie des EU-US Data Privacy Framework. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b
            DSGVO.
          </p>

          <h2 className="text-xl font-bold mt-8">10. Newsletter</h2>
          <p>
            Wenn Sie sich zu unserem Newsletter anmelden, verarbeiten wir Ihre
            E-Mail-Adresse ausschließlich, um Ihnen den Newsletter zuzusenden.
            Rechtsgrundlage ist Ihre Einwilligung gemäß Art. 6 Abs. 1 lit. a DSGVO in
            Verbindung mit § 7 Abs. 2 UWG. Um die Gültigkeit Ihrer Einwilligung sicherzustellen,
            nutzen wir das Double-Opt-in-Verfahren: nach der Anmeldung erhalten Sie eine
            Bestätigungs-E-Mail, mit der Sie Ihre Anmeldung bestätigen müssen.
          </p>
          <p>
            Sie können Ihre Einwilligung jederzeit mit Wirkung für die Zukunft widerrufen,
            indem Sie den Abmelde-Link in jedem Newsletter nutzen oder uns eine kurze E-Mail
            senden. Nach Ihrem Widerruf werden Ihre Daten gelöscht bzw. für künftige
            Zusendungen gesperrt.
          </p>

          <h2 className="text-xl font-bold mt-8">11. Kontaktformular</h2>
          <p>
            Wenn Sie uns über unser Kontaktformular eine Nachricht senden, werden Ihr Name,
            Ihre E-Mail-Adresse und der Inhalt der Nachricht zur Bearbeitung Ihrer Anfrage
            und für mögliche Rückfragen bei uns gespeichert. Rechtsgrundlage ist Art. 6
            Abs. 1 lit. b DSGVO (bei vertragsbezogenen Anfragen) bzw. lit. f (unser
            berechtigtes Interesse an der Beantwortung). Diese Daten geben wir nicht ohne
            Ihre Einwilligung weiter. Anfragen werden gelöscht, sobald sie nicht mehr
            erforderlich sind; wir überprüfen die Erforderlichkeit regelmäßig.
          </p>

          <h2 className="text-xl font-bold mt-8">12. Serverlogs</h2>
          <p>
            Bei jedem Zugriff auf unsere Website werden durch unseren Hoster automatisch
            Server-Logdateien erstellt, die technisch notwendige Daten (IP-Adresse, Datum und
            Uhrzeit, aufgerufene Ressource, Referrer, User-Agent) enthalten. Diese werden
            ausschließlich zur Betriebssicherung, Abwehr von Missbrauch und zur Fehleranalyse
            verarbeitet. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO. Die Logs werden
            kurzfristig gespeichert und anschließend automatisch gelöscht.
          </p>

          <h2 className="text-xl font-bold mt-8">13. Keine Analyse-Tools</h2>
          <p>
            Wir verwenden <strong>keine Webanalyse-Dienste</strong> (z.&nbsp;B. Google
            Analytics, Matomo, Plausible etc.) und <strong>keine Social-Media-Plugins</strong>.
            Es findet kein Tracking Ihres Nutzungsverhaltens statt.
          </p>

          <h2 className="text-xl font-bold mt-8">14. Widerspruchsrecht gemäß Art. 21 DSGVO</h2>
          <p>
            Sie haben das Recht, aus Gründen, die sich aus Ihrer besonderen Situation
            ergeben, jederzeit gegen die Verarbeitung Ihrer personenbezogenen Daten, die auf
            Grundlage von Art. 6 Abs. 1 lit. e oder f DSGVO erfolgt, Widerspruch einzulegen.
            Im Fall eines Widerspruchs verarbeiten wir Ihre Daten nicht mehr, es sei denn,
            wir können zwingende schutzwürdige Gründe für die Verarbeitung nachweisen, die
            Ihre Interessen, Rechte und Freiheiten überwiegen, oder die Verarbeitung dient
            der Geltendmachung, Ausübung oder Verteidigung von Rechtsansprüchen.
          </p>

          <h2 className="text-xl font-bold mt-8">15. Änderung dieser Datenschutzerklärung</h2>
          <p>
            Wir behalten uns vor, diese Datenschutzerklärung anzupassen, damit sie stets den
            aktuellen rechtlichen Anforderungen entspricht oder um Änderungen unserer
            Leistungen in der Datenschutzerklärung umzusetzen. Für Ihren erneuten Besuch
            gilt dann die jeweils aktuelle Version.
          </p>

          <p className="mt-12 text-xs text-zinc-500">
            Stand: April 2026. Diese Datenschutzerklärung enthält noch Platzhalter für die
            Kontaktdaten des Verantwortlichen und sollte vor dem produktiven Einsatz
            juristisch geprüft werden.
          </p>
        </section>
      </div>
    </main>
  );
}
