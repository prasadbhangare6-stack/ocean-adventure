import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowRight, Menu, MessageCircle, Phone, Mail, X } from 'lucide-react';
import { useUI } from '../lib/ui';
import { InstagramIcon, Wordmark } from './Brand';
import { INSTAGRAM_URL, CONTACT_INFO, WHATSAPP_URL } from '../content';

const NAV = [
  { id: 'home', label: 'Home' },
  { id: 'featured', label: 'Upcoming Trips' },
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
      className="fixed inset-x-0 top-0 z-50 bg-ivory/95 text-navy shadow-[0_2px_16px_rgba(3,18,27,0.08)] backdrop-blur-md"
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
          <Wordmark />
        </a>

        {/* 2. Primary Navigation Menu Links (Desktop) */}
        <nav aria-label="Primary Navigation" className="hidden items-center gap-5 xl:gap-7 lg:flex">
          {NAV.map((n) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              onClick={(e) => {
                e.preventDefault();
                jump(n.id);
              }}
              className="group relative font-sans text-[11.5px] font-semibold uppercase tracking-[0.16em] text-navy/75 transition-colors hover:text-navy"
            >
              {n.label}
              <span className="absolute -bottom-1.5 left-0 h-[2px] w-full origin-left scale-x-0 rounded-full bg-cyan transition-transform duration-300 ease-out group-hover:scale-x-100" />
            </a>
          ))}
        </nav>

        {/* 3. Action Buttons & Quick Links (Top-Right) */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Instagram Profile Button */}
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Dr. Purva's Official Instagram Profile (@dr.purvaa)"
            title="Dr. Purva's Official Instagram Profile (@dr.purvaa)"
            className="group relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-navy/20 bg-ivory text-navy transition-all duration-300 hover:border-navy hover:bg-navy hover:text-ivory"
          >
            <InstagramIcon className="h-4.5 w-4.5 transition-transform duration-300 group-hover:scale-110" />
          </a>

          {/* High-Contrast Call-to-Action (CTA) Button with arrow animation */}
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              requestInquiry();
            }}
            className="group hidden sm:inline-flex items-center gap-2 rounded-full bg-navy px-5 py-2.5 font-sans text-[11.5px] font-bold uppercase tracking-[0.16em] text-ivory shadow-sm transition-all duration-300 ease-editorial hover:-translate-y-0.5 hover:bg-ocean hover:shadow-md"
          >
            <span>Plan Your Trip</span>
            <ArrowRight
              size={15}
              className="text-seaglass transition-transform duration-300 group-hover:translate-x-1.5"
            />
          </a>

          {/* Mobile Menu Hamburger Trigger */}
          <button
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-navy/15 transition-colors hover:bg-navy/5 lg:hidden"
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
            className="overflow-hidden border-t border-navy/10 bg-ivory shadow-2xl lg:hidden"
          >
            <div className="flex flex-col px-6 py-6 max-h-[85vh] overflow-y-auto">
              <p className="eyebrow text-cyan mb-3">Navigation Menu</p>
              <div className="flex flex-col divide-y divide-navy/10">
                {NAV.map((n, i) => (
                  <a
                    key={n.id}
                    href={`#${n.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      jump(n.id);
                    }}
                    className="flex min-h-12 items-center justify-between py-3 text-left font-serif text-2xl font-normal text-navy transition-colors hover:text-ocean"
                  >
                    <span>{n.label}</span>
                    <span className="font-sans text-[11px] uppercase tracking-widest text-navy/40">0{i + 1}</span>
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
                className="group mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-navy py-4 font-sans text-[13px] font-bold uppercase tracking-[0.18em] text-ivory shadow-lg hover:bg-ocean"
              >
                <span>Plan Your Trip</span>
                <ArrowRight size={16} className="text-seaglass transition-transform group-hover:translate-x-1" />
              </a>

              {/* Quick Contact Options */}
              <div className="mt-8 rounded-2xl border border-navy/10 bg-cream/60 p-5">
                <p className="eyebrow text-navy/60 mb-3">Quick Contact</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 rounded-xl bg-white p-3 text-[13px] font-medium text-navy shadow-sm transition hover:bg-seaglass/20"
                  >
                    <MessageCircle size={18} className="text-[#25D366]" />
                    <div>
                      <div className="text-[11px] font-semibold uppercase tracking-wider text-navy/60">WhatsApp</div>
                      <div className="text-[13px] font-bold">{CONTACT_INFO.whatsapp}</div>
                    </div>
                  </a>

                  <a
                    href={`tel:${CONTACT_INFO.phone}`}
                    className="flex items-center gap-3 rounded-xl bg-white p-3 text-[13px] font-medium text-navy shadow-sm transition hover:bg-seaglass/20"
                  >
                    <Phone size={18} className="text-ocean" />
                    <div>
                      <div className="text-[11px] font-semibold uppercase tracking-wider text-navy/60">Phone Call</div>
                      <div className="text-[13px] font-bold">{CONTACT_INFO.phone}</div>
                    </div>
                  </a>

                  <a
                    href={`mailto:${CONTACT_INFO.email}`}
                    className="flex items-center gap-3 rounded-xl bg-white p-3 text-[13px] font-medium text-navy shadow-sm transition hover:bg-seaglass/20"
                  >
                    <Mail size={18} className="text-cyan" />
                    <div>
                      <div className="text-[11px] font-semibold uppercase tracking-wider text-navy/60">Email</div>
                      <div className="text-[13px] font-bold truncate">{CONTACT_INFO.email}</div>
                    </div>
                  </a>

                  <a
                    href={INSTAGRAM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 rounded-xl bg-white p-3 text-[13px] font-medium text-navy shadow-sm transition hover:bg-seaglass/20"
                  >
                    <InstagramIcon className="h-4.5 w-4.5 text-navy" />
                    <div>
                      <div className="text-[11px] font-semibold uppercase tracking-wider text-navy/60">Instagram</div>
                      <div className="text-[13px] font-bold">@dr.purvaa</div>
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
