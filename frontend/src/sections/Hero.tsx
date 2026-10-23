import { motion } from 'motion/react';
import { ArrowRight, Play, Ship, BedDouble, Users, Shield, Sparkles } from 'lucide-react';
import { useUI } from '../lib/ui';
import { TRIP, BRAND } from '../content';

const LINES = ['Explore.', 'Learn.', 'Dive. Belong.'];

const TRUST = [
  { icon: Ship, label: 'Scuba & boat dives' },
  { icon: BedDouble, label: 'Comfortable ocean stays' },
  { icon: Users, label: 'Only 10 spots per trip' },
  { icon: Shield, label: 'Guided by Dr. Purva (PADI Rescue Diver)' },
];

export default function Hero() {
  const { goTo, openFilm } = useUI();
  const ease = [0.22, 0.61, 0.36, 1] as const;

  return (
    <section id="home" className="relative min-h-[100svh] pt-[76px]" aria-labelledby="hero-title">
      {/* Anchor for backwards compatibility */}
      <div id="top" className="absolute top-0" />

      {/* Dynamic ambient ocean video / dynamic overlay */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Soft atmospheric gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-navy/90 via-navy/55 to-navy/35 z-1" />
        <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-navy to-transparent z-1" />
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
            onClick={() => goTo('featured')}
            className="group inline-flex items-center gap-2.5 rounded-full border border-seaglass/30 bg-navy/60 px-4 py-2 backdrop-blur-md transition-all duration-300 hover:border-seaglass hover:bg-navy/80 hover:shadow-[0_0_20px_rgba(142,220,235,0.25)]"
          >
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-seaglass opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan"></span>
            </span>
            <span className="font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-seaglass">
              Next Trip Announcement
            </span>
            <span className="hidden sm:inline font-sans text-[12px] font-medium text-ivory/80">
              {TRIP.title} &bull; {TRIP.dates} ({TRIP.spots})
            </span>
            <ArrowRight size={13} className="text-seaglass transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease }}
          className="eyebrow flex items-center gap-2 text-seaglass"
        >
          <Sparkles size={14} className="text-cyan animate-pulse" />
          {BRAND.tagline}
        </motion.p>

        <h1 id="hero-title" className="display mt-5 text-[clamp(3.4rem,8.4vw,8.4rem)] text-ivory">
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
          className="mt-7 max-w-xl font-sans text-[17px] leading-relaxed text-ivory/85"
        >
          Curated ocean journeys and mindful scuba diving expeditions for curious humans who love the deep blue. Led by Dr. Purva.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.7, ease }}
          className="mt-9 flex flex-col gap-3.5 sm:flex-row"
        >
          <button className="btn-ivory group" onClick={() => goTo('featured')}>
            Explore Upcoming Trips
            <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
          </button>
          <button className="btn-ghost group" onClick={openFilm} aria-haspopup="dialog">
            <Play size={14} className="fill-current text-seaglass" />
            Watch Expedition Film
          </button>
        </motion.div>
      </div>

      {/* Trust indicators */}
      <motion.ul
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2.0 }}
        className="absolute inset-x-0 bottom-0 z-10 mx-auto grid max-w-[1440px] grid-cols-2 gap-x-6 gap-y-4 border-t border-ivory/15 bg-navy/40 backdrop-blur-sm px-6 py-6 md:px-12 lg:grid-cols-4 lg:px-20"
      >
        {TRUST.map(({ icon: Icon, label }) => (
          <li key={label} className="flex items-center gap-3 font-sans text-[12px] font-medium uppercase tracking-[0.14em] text-ivory/80">
            <Icon size={18} strokeWidth={1.5} className="shrink-0 text-seaglass" aria-hidden="true" />
            {label}
          </li>
        ))}
      </motion.ul>
    </section>
  );
}
