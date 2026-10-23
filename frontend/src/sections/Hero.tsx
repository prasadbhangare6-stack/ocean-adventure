import { motion } from 'motion/react';
import { ArrowRight, Ship, BedDouble, Users, Shield, Sparkles, MessageCircle, FileText } from 'lucide-react';
import { useUI } from '../lib/ui';
import { TRIP, BRAND, WHATSAPP_URL, BROCHURE_URL } from '../content';

const LINES = ['Explore.', 'Learn.', 'Dive. Belong.'];

const TRUST = [
  { icon: Ship, label: 'Speedboat & Guided Dives' },
  { icon: BedDouble, label: 'Beachside Stays on Maafushi' },
  { icon: Users, label: 'Maximum 10 Participants' },
  { icon: Shield, label: 'Led by Dr. Purva Thorat (PADI Rescue Diver)' },
];

export default function Hero() {
  const { goTo } = useUI();
  const ease = [0.22, 0.61, 0.36, 1] as const;

  return (
    <section id="home" className="relative min-h-[100svh] pt-[76px]" aria-labelledby="hero-title">
      {/* Anchor for backwards compatibility */}
      <div id="top" className="absolute top-0" />

      {/* Dynamic ambient ocean video / dynamic overlay */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Soft atmospheric gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#020b11]/92 via-[#03121b]/60 to-[#020b11]/45 z-1" />
        <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#03121b] to-transparent z-1" />
      </div>

      <div id="hero-copy" className="relative z-10 mx-auto flex min-h-[calc(100svh-76px)] max-w-[1440px] flex-col justify-center px-6 pb-40 pt-8 md:px-12 lg:px-20 lg:pb-44">
        {/* Next Trip Announcement Badge */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease }}
          className="mb-6 flex flex-wrap items-center gap-3"
        >
          <button
            onClick={() => goTo('maldives-detail')}
            className="group inline-flex items-center gap-2.5 rounded-full border border-[#dfba73]/40 bg-[#03121b]/80 px-4 py-2 backdrop-blur-md transition-all duration-300 hover:border-[#dfba73] hover:bg-[#03121b] hover:shadow-[0_0_24px_rgba(223,186,115,0.25)]"
          >
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#dfba73] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#dfba73]"></span>
            </span>
            <span className="font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-[#dfba73]">
              Next Expedition Announcement
            </span>
            <span className="hidden sm:inline font-sans text-[12px] font-medium text-ivory/85">
              {TRIP.title} &bull; {TRIP.dates} ({TRIP.groupSize})
            </span>
            <ArrowRight size={13} className="text-[#dfba73] transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease }}
          className="eyebrow flex items-center gap-2 text-[#dfba73]"
        >
          <Sparkles size={14} className="text-[#dfba73] animate-pulse" />
          {BRAND.tagline}
        </motion.p>

        <h1 id="hero-title" className="display mt-5 text-[clamp(3.4rem,8.4vw,8.4rem)] text-ivory font-normal leading-none tracking-tight">
          {LINES.map((line, i) => (
            <span key={line} className="block overflow-hidden pb-[0.06em]">
              <motion.span
                className="block"
                initial={{ y: '105%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 1.1, delay: 0.7 + i * 0.16, ease }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.5, ease }}
          className="mt-7 max-w-xl font-sans text-[17px] md:text-[18px] leading-relaxed text-ivory/85"
        >
          Curated ocean journeys and mindful scuba diving expeditions for curious humans who love the deep blue. Founded and led by <strong className="text-[#f5e4bd]">Dr. Purva Thorat</strong> (Physiotherapist &amp; PADI Rescue Diver).
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.7, ease }}
          className="mt-9 flex flex-wrap gap-3.5"
        >
          <button className="btn-gold group" onClick={() => goTo('maldives-detail')}>
            <span>Explore Maldives Trip</span>
            <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
          </button>

          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold-outline group"
          >
            <MessageCircle size={16} />
            <span>Enquire on WhatsApp</span>
          </a>

          <a
            href={BROCHURE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost group"
          >
            <FileText size={15} className="text-[#dfba73]" />
            <span>Trip Brochure</span>
          </a>
        </motion.div>
      </div>

      {/* Trust indicators */}
      <motion.ul
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2.0 }}
        className="absolute inset-x-0 bottom-0 z-10 mx-auto grid max-w-[1440px] grid-cols-2 gap-x-6 gap-y-4 border-t border-[#dfba73]/20 bg-[#020b11]/80 backdrop-blur-md px-6 py-5 md:px-12 lg:grid-cols-4 lg:px-20"
      >
        {TRUST.map(({ icon: Icon, label }) => (
          <li key={label} className="flex items-center gap-3 font-sans text-[11.5px] font-medium uppercase tracking-[0.14em] text-ivory/80">
            <Icon size={18} strokeWidth={1.5} className="shrink-0 text-[#dfba73]" aria-hidden="true" />
            {label}
          </li>
        ))}
      </motion.ul>
    </section>
  );
}
