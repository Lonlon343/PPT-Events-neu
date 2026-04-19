import Link from 'next/link';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ppt-blue text-white/80 border-t border-white/10">
      <div className="container mx-auto px-6 lg:px-12 max-w-6xl py-12 grid gap-8 md:grid-cols-3">
        <div>
          <p className="text-ppt-pink font-bold uppercase tracking-widest text-xs mb-3">
            Pars pro Toto
          </p>
          <p className="text-sm leading-relaxed">
            PPT-Events – gemeinsam Großes erreichen. Leadership, Finanzen, Netzwerk.
          </p>
        </div>

        <nav className="space-y-2 text-sm">
          <p className="uppercase tracking-widest text-xs text-white/60 mb-3">Navigation</p>
          <Link href="/" className="block hover:text-ppt-pink transition-colors">Start</Link>
          <Link href="/veranstaltungen" className="block hover:text-ppt-pink transition-colors">Veranstaltungen</Link>
          <Link href="/kontakt" className="block hover:text-ppt-pink transition-colors">Kontakt</Link>
        </nav>

        <nav className="space-y-2 text-sm">
          <p className="uppercase tracking-widest text-xs text-white/60 mb-3">Rechtliches</p>
          <Link href="/impressum" className="block hover:text-ppt-pink transition-colors">Impressum</Link>
          <Link href="/datenschutz" className="block hover:text-ppt-pink transition-colors">Datenschutz</Link>
        </nav>
      </div>

      <div className="border-t border-white/10">
        <div className="container mx-auto px-6 lg:px-12 max-w-6xl py-6 text-xs text-white/50 flex flex-col md:flex-row justify-between gap-2">
          <p>© {year} PPT-Events. Alle Rechte vorbehalten.</p>
          <p>Made with ❤️ in Osnabrück.</p>
        </div>
      </div>
    </footer>
  );
}
