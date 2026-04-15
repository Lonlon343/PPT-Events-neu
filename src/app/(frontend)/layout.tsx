import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { Header } from "@/components/Header";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ppt-events.de';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'PPT-Events – Pars pro Toto',
    template: '%s | PPT-Events',
  },
  description: 'Spannende Events und inspirierende Menschen. Wir bringen dich auf dein nächstes Level!',
  keywords: ['events', 'leadership', 'finanzielle bildung', 'osnabrück', 'ppt-events', 'pars pro toto'],
  openGraph: {
    type: 'website',
    locale: 'de_DE',
    url: siteUrl,
    siteName: 'PPT-Events',
    title: 'PPT-Events – Gemeinsam Großes erreichen',
    description: 'Spannende Events und inspirierende Menschen. Wir bringen dich auf dein nächstes Level!',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'PPT-Events' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PPT-Events – Pars pro Toto',
    description: 'Spannende Events und inspirierende Menschen.',
  },
  robots: { index: true, follow: true },
  alternates: { canonical: siteUrl },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className="scroll-smooth">
      <body className={`${inter.variable} font-sans bg-ppt-blue text-white antialiased min-h-screen flex flex-col`}>
        <Header />
        {children}
      </body>
    </html>
  );
}
