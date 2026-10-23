import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowRight, Menu, MessageCircle, Phone, X, FileText, ExternalLink } from 'lucide-react';
import { useUI } from '../lib/ui';
import { InstagramIcon, Wordmark } from './Brand';
import {
  INSTAGRAM_ACCOUNTS,
  CONTACT_INFO,
  WHATSAPP_URL,
  WHATSAPP_DISPLAY_NUMBER,
  BROCHURE_URL,
} from '../content';

const NAV = [
  { id: 'home', label: 'Home' },
  { id: 'featured', label: 'Upcoming Trips' },
  { id: 'maldives-detail', label: 'Maldives Expedition' },
  { id: 'experiences', label: 'Dive Experiences' },
  { id: 'host', label: 'Meet Dr. Purva' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
];

export default function Header() {
  const { goTo, requestInquiry } = useUI();
  const [open, setOpen] = useState(false);

  const jump = (id: string) => {
    setOpen(false);
    goTo(id);
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 0.61, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50 border-b border-[#dfba73]/15 bg-[#03121b]/92 text-ivory shadow-[0_4px_24px_rgba(2,11,17,0.7)] backdrop-blur-md"
    >
      <div className="mx-auto flex h-[78px] max-w-[1440px] items-center justify-between px-4 sm:px-6 md:px-10">
        {/* 1. Brand Identity (Top-Left) */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            jump('home');
          }}
          className="rounded-lg text-left transition-opacity hover:opacity-90 focus:outline-none"
          aria-label="PURVA OCEAN ADVENTURES, return to home top"
        >
          <Wordmark dark />
        </a>

        {/* 2. Primary Navigation Menu Links (Desktop) */}
        <nav aria-label="Primary Navigation" className="hidden items-center gap-4 xl:gap-6 lg:flex">
          {NAV.map((n) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              onClick={(e) => {
                e.preventDefault();
                jump(n.id);
              }}
              className="group relative font-sans text-[11.5px] font-semibold uppercase tracking-[0.16em] text-ivory/75 transition-colors hover:text-[#dfba73]"
            >
              {n.label}
              <span className="absolute -bottom-1.5 left-0 h-[2px] w-full origin-left scale-x-0 rounded-full bg-[#dfba73] transition-transform duration-300 ease-out group-hover:scale-x-100" />
            </a>
          ))}
        </nav>

        {/* 3. Action Buttons & Quick Links (Top-Right) */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* WhatsApp Direct Action */}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Enquire on WhatsApp (+91-6262323232)"
            title="Chat on WhatsApp (+91-6262323232)"
            className="group relative hidden sm:inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#25D366]/40 bg-[#25D366]/10 text-[#25D366] transition-all duration-300 hover:border-[#25D366] hover:bg-[#25D366] hover:text-white"
          >
            <MessageCircle className="h-4.5 w-4.5 transition-transform duration-300 group-hover:scale-110" />
          </a>

          {/* Instagram Profile Quick Link */}
          <a
            href={INSTAGRAM_ACCOUNTS.brand.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Follow Purva Ocean Adventures on Instagram (@purvaoceanadventures)"
            title="Instagram: @purvaoceanadventures"
            className="group relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-ivory/20 bg-ivory/5 text-ivory transition-all duration-300 hover:border-[#dfba73] hover:bg-[#dfba73]/15 hover:text-[#dfba73]"
          >
            <InstagramIcon className="h-4.5 w-4.5 transition-transform duration-300 group-hover:scale-110" />
          </a>

          {/* High-Contrast Gold Call-to-Action (CTA) Button */}
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              requestInquiry();
            }}
            className="group hidden sm:inline-flex items-center gap-2 rounded-full bg-[#dfba73] px-5 py-2.5 font-sans text-[11.5px] font-bold uppercase tracking-[0.16em] text-[#03121b] shadow-sm transition-all duration-300 ease-editorial hover:-translate-y-0.5 hover:bg-[#edd39b] hover:shadow-[0_8px_20px_rgba(223,186,115,0.35)]"
          >
            <span>Plan Your Trip</span>
            <ArrowRight
              size={15}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </a>

          {/* Mobile Menu Hamburger Trigger */}
          <button
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-ivory/20 text-ivory transition-colors hover:bg-ivory/10 lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-drawer"
            aria-label={open ? 'Close navigation drawer' : 'Open navigation drawer'}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu (Hamburger Animated Drawer) */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-drawer"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 0.61, 0.36, 1] }}
            className="overflow-hidden border-t border-[#dfba73]/20 bg-[#020b11] shadow-2xl lg:hidden"
          >
            <div className="flex flex-col px-6 py-6 max-h-[85vh] overflow-y-auto">
              <span className="eyebrow-gold mb-3 block">Navigation Menu</span>
              <div className="flex flex-col divide-y divide-ivory/10">
                {NAV.map((n, i) => (
                  <a
                    key={n.id}
                    href={`#${n.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      jump(n.id);
                    }}
                    className="flex min-h-12 items-center justify-between py-3 text-left font-serif text-2xl font-normal text-ivory transition-colors hover:text-[#dfba73]"
                  >
                    <span>{n.label}</span>
                    <span className="font-sans text-[11px] uppercase tracking-widest text-[#dfba73]/60">0{i + 1}</span>
                  </a>
                ))}
              </div>

              {/* Plan Your Trip Button in Drawer */}
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  setOpen(false);
                  requestInquiry();
                }}
                className="group mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-[#dfba73] py-4 font-sans text-[13px] font-bold uppercase tracking-[0.18em] text-[#03121b] shadow-lg hover:bg-[#edd39b]"
              >
                <span>Plan Your Trip</span>
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </a>

              {/* Quick Brochure Action in Drawer */}
              <a
                href={BROCHURE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 flex w-full items-center justify-center gap-2 rounded-full border border-[#dfba73]/40 bg-[#dfba73]/10 py-3.5 font-sans text-[12px] font-semibold uppercase tracking-[0.18em] text-[#dfba73] hover:bg-[#dfba73]/20"
              >
                <FileText size={16} />
                <span>View Trip Brochure</span>
                <ExternalLink size={13} />
              </a>

              {/* Quick Contact Options */}
              <div className="mt-8 rounded-2xl border border-[#dfba73]/20 bg-[#03121b] p-5">
                <span className="eyebrow-gold mb-3 block">Direct Contact &amp; Channels</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 rounded-xl border border-ivory/10 bg-[#020b11] p-3 text-[13px] font-medium text-ivory shadow-sm transition hover:border-[#25D366]"
                  >
                    <MessageCircle size={18} className="text-[#25D366]" />
                    <div>
                      <div className="text-[10.5px] font-semibold uppercase tracking-wider text-[#25D366]">WhatsApp</div>
                      <div className="text-[13px] font-bold text-ivory">{WHATSAPP_DISPLAY_NUMBER}</div>
                    </div>
                  </a>

                  <a
                    href={`tel:${CONTACT_INFO.phone}`}
                    className="flex items-center gap-3 rounded-xl border border-ivory/10 bg-[#020b11] p-3 text-[13px] font-medium text-ivory shadow-sm transition hover:border-[#dfba73]"
                  >
                    <Phone size={18} className="text-[#dfba73]" />
                    <div>
                      <div className="text-[10.5px] font-semibold uppercase tracking-wider text-[#dfba73]">Phone Call</div>
                      <div className="text-[13px] font-bold text-ivory">{CONTACT_INFO.phone}</div>
                    </div>
                  </a>

                  <a
                    href={INSTAGRAM_ACCOUNTS.brand.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 rounded-xl border border-ivory/10 bg-[#020b11] p-3 text-[13px] font-medium text-ivory shadow-sm transition hover:border-[#dfba73]"
                  >
                    <InstagramIcon className="h-4.5 w-4.5 text-[#dfba73]" />
                    <div>
                      <div className="text-[10.5px] font-semibold uppercase tracking-wider text-ivory/60">Brand Instagram</div>
                      <div className="text-[13px] font-bold text-ivory">@purvaoceanadventures</div>
                    </div>
                  </a>

                  <a
                    href={INSTAGRAM_ACCOUNTS.host.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 rounded-xl border border-ivory/10 bg-[#020b11] p-3 text-[13px] font-medium text-ivory shadow-sm transition hover:border-[#dfba73]"
                  >
                    <InstagramIcon className="h-4.5 w-4.5 text-[#dfba73]" />
                    <div>
                      <div className="text-[10.5px] font-semibold uppercase tracking-wider text-ivory/60">Dr. Purva Thorat</div>
                      <div className="text-[13px] font-bold text-ivory">@dr.purvaa</div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
