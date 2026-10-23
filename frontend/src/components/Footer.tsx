import { InstagramIcon, Wordmark } from './Brand';
import { INSTAGRAM_URL, WHATSAPP_URL } from '../content';
import { useUI } from '../lib/ui';
import { MessageCircle } from 'lucide-react';

export default function Footer() {
  const { goTo } = useUI();
  const links = [
    ['home', 'Home'],
    ['featured', 'Upcoming Trips'],
    ['experiences', 'Dive Experiences'],
    ['host', 'Meet Dr. Purva'],
    ['gallery', 'Gallery'],
    ['about', 'About'],
    ['contact', 'Contact'],
  ] as const;

  return (
    <footer className="relative border-t border-ivory/10 bg-navy/95 px-6 py-14 md:px-12 lg:px-20 text-ivory">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
        <Wordmark dark />

        <nav aria-label="Footer Navigation" className="flex flex-wrap gap-x-6 gap-y-3">
          {links.map(([id, label]) => (
            <button
              key={id}
              onClick={() => goTo(id)}
              className="font-sans text-[12px] font-semibold uppercase tracking-[0.16em] text-ivory/70 transition-colors hover:text-seaglass"
            >
              {label}
            </button>
          ))}
        </nav>

        <div className="flex flex-wrap items-center gap-4">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-ivory/20 px-3.5 py-1.5 font-sans text-[11.5px] font-medium text-ivory/80 transition-colors hover:border-[#25D366] hover:text-[#25D366]"
          >
            <MessageCircle size={15} className="text-[#25D366]" />
            WhatsApp
          </a>

          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 font-sans text-[12px] font-semibold uppercase tracking-[0.16em] text-ivory/80 transition-colors hover:text-seaglass"
          >
            <InstagramIcon className="h-5 w-5" />
            @dr.purvaa
          </a>
        </div>
      </div>

      <div className="mx-auto mt-10 flex max-w-[1440px] flex-col gap-2 border-t border-ivory/10 pt-6 font-sans text-[12px] text-ivory/50 md:flex-row md:justify-between">
        <p>© 2026 PURVA OCEAN ADVENTURES. Flagship Maldives expedition & mindful dive journeys.</p>
        <p>Curated by Dr. Purva. All rights reserved.</p>
      </div>
    </footer>
  );
}
