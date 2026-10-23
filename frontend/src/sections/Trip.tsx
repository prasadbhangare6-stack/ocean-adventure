import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Calendar,
  MapPin,
  Clock,
  Users,
  Waves,
  Award,
  Compass,
  Sparkles,
  BedDouble,
  Ship,
  Coffee,
  Anchor,
  MessageCircle,
  ArrowRight,
  Info,
  type LucideIcon,
} from 'lucide-react';
import { TRIP, WHATSAPP_URL } from '../content';
import { useUI } from '../lib/ui';

const INCLUSION_ICONS: Record<string, LucideIcon> = {
  Waves,
  Award,
  Compass,
  Sparkles,
  BedDouble,
  Ship,
  Coffee,
  Anchor,
};

export default function Trip() {
  const { openTrip } = useUI();
  const [activeDay, setActiveDay] = useState(0);

  const handleViewDetails = () => {
    // Scroll smoothly to dedicated detail experience or open trip modal
    const detailEl = document.getElementById('maldives-detail');
    if (detailEl) {
      detailEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      openTrip();
    }
  };

  return (
    <section id="featured" className="section py-24 md:py-32 lg:py-40" aria-labelledby="trip-title">
      {/* Anchor for backward compatibility */}
      <div id="trip" className="absolute top-0" />

      <div className="mx-auto max-w-[1440px]">
        {/* Section Header */}
        <div data-reveal className="mb-12 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="eyebrow-gold">Upcoming Expeditions</span>
            <span className="rounded-full bg-[#dfba73]/15 px-3 py-0.5 font-sans text-[11px] font-bold uppercase tracking-wider text-[#dfba73]">
              Featured Journey
            </span>
          </div>
          <h2 id="trip-title" className="display mt-3 text-[clamp(2.8rem,5.5vw,5rem)] text-ivory">
            {TRIP.title}
          </h2>
          <p className="mt-3 font-sans text-[16px] text-ivory/80 leading-relaxed">
            Curated small-group scuba diving in Maafushi, Maldives. Guided by {TRIP.hostName} ({TRIP.hostRole}).
          </p>
        </div>

        {/* Main Split Grid */}
        <div className="grid items-center gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16">
          {/* Main Card with Gold Outline & Deep Ocean Background */}
          <div
            data-reveal
            className="gold-panel relative rounded-[32px] p-8 md:p-12 text-ivory shadow-[0_30px_70px_-30px_rgba(0,0,0,0.8)] border border-[#dfba73]/30"
          >
            {/* Quick Metadata Bar */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-[#dfba73]/40 bg-[#dfba73]/10 px-3.5 py-1 font-sans text-[11px] font-bold uppercase tracking-wider text-[#dfba73]">
                {TRIP.groupSize}
              </span>
              <span className="font-sans text-[12px] text-ivory/60">
                Host: <strong className="text-ivory">{TRIP.hostName}</strong>
              </span>
            </div>

            {/* Title & Key Trip Parameters */}
            <h3 className="display mt-5 text-[clamp(2.4rem,4.5vw,4.2rem)] font-normal text-ivory leading-tight">
              {TRIP.title}
            </h3>

            <div className="mt-6 flex flex-wrap items-center gap-y-2.5 gap-x-5 font-sans text-[12.5px] font-semibold uppercase tracking-[0.16em] text-[#f5e4bd]">
              <span className="inline-flex items-center gap-1.5 text-[#dfba73]">
                <Calendar size={16} />
                {TRIP.dates}
              </span>
              <span className="text-[#dfba73]/40">&bull;</span>
              <span className="inline-flex items-center gap-1.5">
                <Clock size={16} className="text-[#dfba73]" />
                {TRIP.duration}
              </span>
              <span className="text-[#dfba73]/40">&bull;</span>
              <span className="inline-flex items-center gap-1.5">
                <MapPin size={15} className="text-[#dfba73]" />
                {TRIP.destination}
              </span>
              <span className="text-[#dfba73]/40">&bull;</span>
              <span className="inline-flex items-center gap-1.5 text-ivory/70">
                <Users size={15} className="text-[#dfba73]" />
                {TRIP.groupSize}
              </span>
            </div>

            <p className="mt-6 font-sans text-[16px] leading-relaxed text-ivory/85">
              {TRIP.description}
            </p>

            {/* Eight Inclusions Grid */}
            <div className="mt-8 border-t border-[#dfba73]/15 pt-6">
              <div className="flex items-center justify-between mb-4">
                <span className="eyebrow-gold">Included In This Trip</span>
                <span className="font-sans text-[11px] uppercase tracking-wider text-ivory/50">8 Key Features</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {TRIP.inclusions.map((inc) => {
                  const Icon = INCLUSION_ICONS[inc.icon] ?? Waves;
                  return (
                    <div
                      key={inc.label}
                      className="group/item flex items-start gap-3 rounded-xl border border-ivory/10 bg-[#020b11]/60 p-3 transition-colors hover:border-[#dfba73]/40 hover:bg-[#020b11]/80"
                    >
                      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-[#dfba73]/15 text-[#dfba73] group-hover/item:bg-[#dfba73]/25 transition-colors">
                        <Icon size={16} />
                      </span>
                      <div>
                        <div className="font-sans text-[13px] font-semibold text-ivory group-hover/item:text-[#f5e4bd]">
                          {inc.label}
                        </div>
                        <div className="font-sans text-[11.5px] text-ivory/65 leading-tight mt-0.5">
                          {inc.detail}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Open Water Course Clarification */}
            <div className="mt-6 rounded-xl border border-[#dfba73]/25 bg-[#03121b]/80 p-4 font-sans text-[13px] text-ivory/80 flex items-start gap-3">
              <Info size={18} className="text-[#dfba73] shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#f5e4bd]">Beginners Welcome:</strong> Beginners can join the Open Water course without previous diving experience. Certification availability, prerequisites, and actual course arrangements must be confirmed with the organiser.
              </div>
            </div>

            {/* Two Prominent Calls to Action: VIEW TRIP DETAILS & BOOK / ENQUIRE ON WHATSAPP */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                className="btn-gold-outline group"
                onClick={handleViewDetails}
                aria-label="View Maldives trip details"
              >
                <span>View Trip Details</span>
                <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
              </button>

              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold group"
              >
                <MessageCircle size={16} className="text-[#03121b]" />
                <span>Book / Enquire on WhatsApp</span>
                <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>

          {/* Large Cinematic Destination Photography */}
          <div data-reveal className="relative">
            <div className="relative overflow-hidden rounded-[32px] border border-[#dfba73]/30 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.8)]">
              <img
                data-parallax
                src="/images/maldives-aerial.jpg"
                alt="Turquoise waters and tropical island sandbanks of Maafushi, Maldives"
                loading="lazy"
                className="aspect-[4/5] w-full scale-105 object-cover md:aspect-[5/4] lg:aspect-[4/5]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#020b11]/90 via-transparent to-[#020b11]/20" aria-hidden="true" />

              <div className="absolute bottom-6 left-6 right-6 text-ivory">
                <span className="eyebrow-gold">Maafushi Island</span>
                <p className="font-serif text-3xl mt-1 text-ivory">South Malé Atoll, Maldives</p>
                <p className="mt-1 font-sans text-[12.5px] text-ivory/75">
                  Crystal-clear lagoons, manta cleaning stations, and vibrant outer reef pinnacles.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 6-Day Detailed Expedition Itinerary Section */}
        <div data-reveal className="mt-16 rounded-[32px] border border-[#dfba73]/25 bg-[#03121b]/80 p-6 md:p-12 backdrop-blur-md">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 border-b border-[#dfba73]/15 pb-6">
            <div>
              <span className="eyebrow-gold">Day-by-Day Journey</span>
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
                    ? 'bg-[#dfba73] text-[#03121b] shadow-md font-bold'
                    : 'border border-ivory/15 bg-ivory/5 text-ivory/80 hover:bg-ivory/15 hover:text-ivory'
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
                className="rounded-2xl border border-[#dfba73]/25 bg-[#020b11]/60 p-6 md:p-8"
              >
                <div className="flex items-center gap-3">
                  <span className="rounded-full bg-[#dfba73]/20 px-3 py-1 font-sans text-[11px] font-bold uppercase tracking-wider text-[#dfba73]">
                    {TRIP.itinerary[activeDay].day}
                  </span>
                  <h4 className="font-serif text-2xl md:text-3xl text-ivory font-medium">
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
