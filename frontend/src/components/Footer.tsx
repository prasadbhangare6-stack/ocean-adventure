import { InstagramIcon, Wordmark } from './Brand';
import { INSTAGRAM_ACCOUNTS, WHATSAPP_URL, WHATSAPP_DISPLAY_NUMBER, BROCHURE_URL } from '../content';
import { useUI } from '../lib/ui';
import { MessageCircle, FileText } from 'lucide-react';

export default function Footer() {
  const { goTo } = useUI();
  const links = [
    ['home', 'Home'],
    ['featured', 'Upcoming Trips'],
    ['maldives-detail', 'Maldives Expedition'],
    ['experiences', 'Dive Experiences'],
    ['host', 'Meet Dr. Purva'],
    ['gallery', 'Gallery'],
    ['about', 'About'],
    ['contact', 'Contact'],
  ] as const;

  return (
    <footer className="relative border-t border-[#dfba73]/20 bg-[#020b11] px-6 py-14 md:px-12 lg:px-20 text-ivory">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
        <Wordmark dark />

        <nav aria-label="Footer Navigation" className="flex flex-wrap gap-x-6 gap-y-3">
          {links.map(([id, label]) => (
            <button
              key={id}
              onClick={() => goTo(id)}
              className="font-sans text-[12px] font-semibold uppercase tracking-[0.16em] text-ivory/70 transition-colors hover:text-[#dfba73]"
            >
              {label}
            </button>
          ))}
        </nav>

        <div className="flex flex-wrap items-center gap-3.5">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-[#25D366]/40 bg-[#25D366]/10 px-3.5 py-1.5 font-sans text-[11.5px] font-medium text-ivory transition-colors hover:border-[#25D366] hover:bg-[#25D366]/25"
          >
            <MessageCircle size={15} className="text-[#25D366]" />
            WhatsApp
          </a>

          <a
            href={BROCHURE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-[#dfba73]/40 bg-[#dfba73]/10 px-3.5 py-1.5 font-sans text-[11.5px] font-medium text-[#dfba73] transition-colors hover:border-[#dfba73] hover:bg-[#dfba73]/25"
          >
            <FileText size={14} />
            Brochure
          </a>

          {/* Both Instagram Accounts */}
          <a
            href={INSTAGRAM_ACCOUNTS.brand.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Brand Instagram profile @purvaoceanadventures"
            className="inline-flex items-center gap-2 rounded-full border border-ivory/20 px-3 py-1.5 font-sans text-[11.5px] font-semibold text-ivory/80 transition-colors hover:border-[#dfba73] hover:text-[#dfba73]"
          >
            <InstagramIcon className="h-4 w-4" />
            <span>@purvaoceanadventures</span>
          </a>

          <a
            href={INSTAGRAM_ACCOUNTS.host.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Dr. Purva Thorat's personal Instagram @dr.purvaa"
            className="inline-flex items-center gap-2 rounded-full border border-ivory/20 px-3 py-1.5 font-sans text-[11.5px] font-semibold text-ivory/80 transition-colors hover:border-[#dfba73] hover:text-[#dfba73]"
          >
            <InstagramIcon className="h-4 w-4" />
            <span>@dr.purvaa</span>
          </a>
        </div>
      </div>

      <div className="mx-auto mt-10 flex max-w-[1440px] flex-col gap-2 border-t border-ivory/10 pt-6 font-sans text-[12px] text-ivory/50 md:flex-row md:justify-between">
        <p>
          &copy; 2026 PURVA OCEAN ADVENTURES. Founded by Dr. Purva Thorat &bull; Maldives Scuba Diving Expedition.
        </p>
        <p>WhatsApp: {WHATSAPP_DISPLAY_NUMBER} &bull; All rights reserved.</p>
      </div>
    </footer>
  );
}
