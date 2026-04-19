'use client';

import { useState } from 'react';
import { Link2, Check } from 'lucide-react';

type EventShareButtonsProps = {
  url: string;
  title: string;
};

export function EventShareButtons({ url, title }: EventShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const input = document.createElement('input');
      input.value = url;
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const whatsappHref = `https://wa.me/?text=${encodeURIComponent(`${title}\n${url}`)}`;

  return (
    <div className="space-y-3">
      <p className="text-xs font-semibold uppercase tracking-widest text-ppt-blue/70">
        Teilen
      </p>
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={copyLink}
          className="flex items-center gap-2 rounded-full border border-ppt-blue/20 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-wide text-ppt-blue transition hover:border-ppt-pink/40 hover:text-ppt-pink"
        >
          {copied ? <Check size={14} /> : <Link2 size={14} />}
          {copied ? 'Kopiert' : 'Link kopieren'}
        </button>
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white transition hover:opacity-90"
        >
          <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true">
            <path d="M.057 24l1.687-6.163A11.867 11.867 0 010 11.945C0 5.36 5.367 0 11.954 0a11.86 11.86 0 018.413 3.488 11.81 11.81 0 013.48 8.413c-.003 6.585-5.37 11.945-11.892 11.945a11.94 11.94 0 01-5.7-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.886a9.825 9.825 0 001.51 5.26L3.5 19.6l3.154-1.41zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.371-.025-.521-.075-.149-.669-1.611-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.371s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.71.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.247-.694.247-1.289.173-1.413z"/>
          </svg>
          WhatsApp
        </a>
      </div>
    </div>
  );
}
