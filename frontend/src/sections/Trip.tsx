import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Anchor, BedDouble, Ship, Users, Waves, Compass, Calendar, MapPin, ArrowRight, type LucideIcon } from 'lucide-react';
import { TRIP } from '../content';
import { useUI } from '../lib/ui';

const ICONS: Record<string, LucideIcon> = { Waves, BedDouble, Ship, Users, Anchor, Compass };

export default function Trip() {
  const { openTrip, requestInquiry } = useUI();
  const [activeDay, setActiveDay] = useState(0);

  return (
    <section id="featured" className="section py-24 md:py-32 lg:py-40" aria-labelledby="trip-title">
      {/* Anchor for backward compatibility */}
      <div id="trip" className="absolute top-0" />

      <div className="mx-auto max-w-[1440px]">
        {/* Main Split Grid */}
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          {/* Cream Text Panel */}
          <div data-reveal className="panel-ivory relative rounded-[32px] px-8 py-12 text-navy shadow-[0_30px_70px_-30px_rgba(3,18,27,0.5)] md:px-14 md:py-16">
            <div className="flex flex-wrap items-center gap-3">
              <span className="eyebrow text-cyan">Flagship Expedition</span>
              <span className="rounded-full bg-cyan/15 px-3 py-1 font-sans text-[11px] font-bold uppercase tracking-wider text-ocean">
                {TRIP.spots}
              </span>
            </div>

            <h2 id="trip-title" className="display mt-5 text-[clamp(2.8rem,5.5vw,5.2rem)]">
              {TRIP.title}
            </h2>

            <div className="mt-6 flex flex-wrap items-center gap-y-2 gap-x-4 font-sans text-[12.5px] font-semibold uppercase tracking-[0.18em] text-navy/75">
              <span className="inline-flex items-center gap-1.5 text-ocean">
                <Calendar size={16} />
                {TRIP.dates}
              </span>
              <span className="text-cyan">•</span>
              <span>{TRIP.duration}</span>
              <span className="text-cyan">•</span>
              <span className="inline-flex items-center gap-1.5 text-navy/60">
                <MapPin size={15} />
                {TRIP.island}
              </span>
            </div>

            <p className="mt-6 font-sans text-[16.5px] leading-relaxed text-navy/85">
              {TRIP.description}
            </p>

            {/* Inclusions summary list */}
            <div className="mt-8 border-t border-navy/10 pt-6">
              <p className="eyebrow text-navy/60 mb-4">Expedition Inclusions</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {TRIP.inclusions.map((inc) => {
                  const Icon = ICONS[inc.icon] ?? Waves;
                  return (
                    <div key={inc.label} className="flex items-start gap-3 rounded-xl bg-white/70 p-3 shadow-xs">
                      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-seaglass/30 text-ocean">
                        <Icon size={16} />
                      </span>
                      <div>
                        <div className="font-sans text-[12.5px] font-bold text-navy">{inc.label}</div>
                        <div className="font-sans text-[11.5px] text-navy/65 leading-tight mt-0.5">{inc.detail}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* CTA action buttons */}
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <button
                className="btn-navy group"
                onClick={() => requestInquiry('Maldives Maafushi Expedition (Nov 22–27, 2026)')}
              >
                <span>Reserve 1 of 10 Spots</span>
                <ArrowRight size={15} className="text-seaglass transition-transform group-hover:translate-x-1" />
              </button>

              <button className="btn-outline-navy" onClick={openTrip} aria-haspopup="dialog">
                Full Expedition Modal
              </button>
            </div>

            <p className="mt-4 font-sans text-[12px] text-navy/55">
              {TRIP.note}
            </p>
          </div>

          {/* Tropical Photograph & Aerial Card */}
          <div data-reveal className="relative">
            <div className="relative overflow-hidden rounded-[32px] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.6)]">
              <img
                data-parallax
                src="/images/maldives-aerial.jpg"
                alt="Aerial view of Maafushi turquoise lagoon in Maldives"
                loading="lazy"
                className="aspect-[4/5] w-full scale-105 object-cover md:aspect-[5/4] lg:aspect-[4/5]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-transparent to-transparent" aria-hidden="true" />
              <div className="absolute bottom-6 left-6 right-6 text-ivory">
                <span className="eyebrow text-seaglass">Maafushi Island</span>
                <p className="font-serif text-2xl mt-1">South Malé Atoll, Maldives</p>
              </div>
            </div>
          </div>
        </div>

        {/* 6-Day Detailed Expedition Itinerary Section */}
        <div data-reveal className="mt-16 rounded-[32px] border border-ivory/15 bg-navy/60 p-6 md:p-12 backdrop-blur-md">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 border-b border-ivory/15 pb-6">
            <div>
              <p className="eyebrow text-seaglass">Day-by-Day Journey</p>
              <h3 className="display mt-2 text-[clamp(2.2rem,4vw,3.6rem)] text-ivory">
                The 6-Day Maldives Itinerary
              </h3>
            </div>
            <p className="max-w-md font-sans text-[14px] text-ivory/70">
              Thoughtfully curated balance of morning drift dives, marine biology sessions, tranquil sandbank relaxation, and ocean camaraderie.
            </p>
          </div>

          {/* Day selection tabs */}
          <div className="mt-8 flex flex-wrap gap-2">
            {TRIP.itinerary.map((item, idx) => (
              <button
                key={item.day}
                onClick={() => setActiveDay(idx)}
                className={`relative rounded-full px-4 py-2 font-sans text-[12px] font-semibold uppercase tracking-[0.16em] transition-all duration-300 ${
                  activeDay === idx
                    ? 'bg-seaglass text-navy shadow-md font-bold'
                    : 'bg-ivory/10 text-ivory/80 hover:bg-ivory/20 hover:text-ivory'
                }`}
              >
                {item.day}
              </button>
            ))}
          </div>

          {/* Active day preview card */}
          <div className="mt-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeDay}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35 }}
                className="rounded-2xl border border-ivory/20 bg-ivory/10 p-6 md:p-8"
              >
                <div className="flex items-center gap-3">
                  <span className="rounded-full bg-cyan/20 px-3 py-1 font-sans text-[11px] font-bold uppercase tracking-wider text-seaglass">
                    {TRIP.itinerary[activeDay].day}
                  </span>
                  <h4 className="font-serif text-2xl md:text-3xl text-ivory">
                    {TRIP.itinerary[activeDay].title}
                  </h4>
                </div>
                <p className="mt-4 font-sans text-[15.5px] leading-relaxed text-ivory/85 max-w-3xl">
                  {TRIP.itinerary[activeDay].desc}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
