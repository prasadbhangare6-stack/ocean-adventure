import { ArrowRight, MapPin, CheckCircle2 } from 'lucide-react';
import Modal from './Modal';
import { FILM_URL, TRIP } from '../content';
import { useUI } from '../lib/ui';

export function TripModal() {
  const { tripOpen, closeTrip, requestInquiry } = useUI();
  return (
    <Modal open={tripOpen} onClose={closeTrip} label={`${TRIP.title} Expedition Details`} wide>
      <div className="grid md:grid-cols-[0.8fr_1.2fr] max-h-[80vh] overflow-y-auto">
        <div className="relative min-h-[260px] overflow-hidden rounded-t-[28px] md:rounded-l-[28px] md:rounded-tr-none">
          <img src="/images/maldives-aerial.jpg" alt={TRIP.title} className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy/85 via-navy/40 to-transparent" aria-hidden="true" />
          <div className="absolute bottom-6 left-6 right-6 text-ivory">
            <span className="eyebrow text-seaglass">Flagship Journey</span>
            <p className="font-serif text-3xl md:text-4xl leading-tight mt-1">{TRIP.title}</p>
            <p className="font-sans text-[12px] font-semibold uppercase tracking-wider text-seaglass mt-2">
              {TRIP.dates} • {TRIP.duration}
            </p>
          </div>
        </div>

        <div className="p-6 md:p-10">
          <div className="flex items-center justify-between">
            <p className="eyebrow text-cyan">Comprehensive Briefing</p>
            <span className="rounded-full bg-cyan/15 px-3 py-1 font-sans text-[11px] font-bold text-ocean uppercase">
              {TRIP.spots}
            </span>
          </div>

          <p className="mt-4 font-sans text-[15px] leading-relaxed text-navy/80">{TRIP.description}</p>
          <p className="mt-2 font-sans text-[13px] text-navy/60 flex items-center gap-1.5">
            <MapPin size={14} className="text-cyan" />
            {TRIP.island}
          </p>

          {/* Inclusions */}
          <div className="mt-6 border-t border-navy/10 pt-5">
            <p className="eyebrow text-navy/60 mb-3">Expedition Inclusions</p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {TRIP.inclusions.map((a) => (
                <li key={a.label} className="flex items-start gap-2.5 font-sans text-[12.5px] font-medium text-navy/85">
                  <CheckCircle2 size={16} className="text-cyan shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-navy">{a.label}: </span>
                    <span className="text-navy/70">{a.detail}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Day by Day Itinerary */}
          <div className="mt-6 border-t border-navy/10 pt-5">
            <p className="eyebrow text-navy/60 mb-3">6-Day Itinerary Overview</p>
            <div className="space-y-3">
              {TRIP.itinerary.map((it) => (
                <div key={it.day} className="rounded-xl bg-cream/60 p-3 text-navy">
                  <div className="flex items-center gap-2">
                    <span className="font-sans text-[11px] font-bold uppercase tracking-wider text-ocean bg-seaglass/30 px-2 py-0.5 rounded-md">
                      {it.day}
                    </span>
                    <span className="font-serif text-[17px] font-semibold">{it.title}</span>
                  </div>
                  <p className="font-sans text-[12.5px] text-navy/75 leading-relaxed mt-1.5">{it.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
            <button
              className="btn-navy group w-full sm:w-auto"
              onClick={() => requestInquiry('Maldives Maafushi Expedition (Nov 22–27, 2026)')}
            >
              Reserve a Spot
              <ArrowRight size={15} className="text-seaglass transition-transform duration-300 group-hover:translate-x-1" />
            </button>
            <span className="font-sans text-[12px] text-navy/55">{TRIP.note}</span>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export function FilmModal() {
  const { filmOpen, closeFilm } = useUI();
  return (
    <Modal open={filmOpen} onClose={closeFilm} label="Purva Ocean Adventures film" wide>
      <div className="p-6 pt-14 md:p-10 md:pt-16">
        <p className="eyebrow text-cyan">The film</p>
        <h2 className="display mt-4 text-5xl">Watch film</h2>
        <div className="mt-8 aspect-video overflow-hidden rounded-2xl bg-navy">
          {FILM_URL ? (
            <video src={FILM_URL} controls playsInline className="h-full w-full" />
          ) : (
            <div className="grid h-full place-items-center p-8 text-center">
              <div>
                <p className="font-serif text-3xl text-ivory">The film is not published yet.</p>
                <p className="mt-3 font-sans text-[14px] text-ivory/65">Set FILM_URL in src/content.ts to attach a video.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
}
