import { ArrowRight, MapPin, CheckCircle2, MessageCircle, FileText, ExternalLink, Calendar } from 'lucide-react';
import Modal from './Modal';
import { FILM_URL, TRIP, WHATSAPP_URL, BROCHURE_URL } from '../content';
import { useUI } from '../lib/ui';

export function TripModal() {
  const { tripOpen, closeTrip, requestInquiry } = useUI();
  return (
    <Modal open={tripOpen} onClose={closeTrip} label={`${TRIP.title} Expedition Details`} wide>
      <div className="grid md:grid-cols-[0.8fr_1.2fr] max-h-[85vh] overflow-y-auto bg-[#03121b] text-ivory">
        <div className="relative min-h-[280px] overflow-hidden rounded-t-[28px] md:rounded-l-[28px] md:rounded-tr-none">
          <img src="/images/maldives-aerial.jpg" alt={TRIP.title} className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#03121b]/95 via-[#03121b]/50 to-transparent" aria-hidden="true" />
          <div className="absolute bottom-6 left-6 right-6 text-ivory">
            <span className="eyebrow-gold">Featured Expedition</span>
            <p className="font-serif text-3xl md:text-4xl leading-tight mt-1 text-ivory font-normal">{TRIP.title}</p>
            <p className="font-sans text-[12px] font-semibold uppercase tracking-wider text-[#dfba73] mt-2">
              {TRIP.dates} &bull; {TRIP.duration}
            </p>
          </div>
        </div>

        <div className="p-6 md:p-10">
          <div className="flex items-center justify-between">
            <span className="eyebrow-gold">Comprehensive Briefing</span>
            <span className="rounded-full border border-[#dfba73]/40 bg-[#dfba73]/15 px-3 py-1 font-sans text-[11px] font-bold text-[#dfba73] uppercase">
              {TRIP.groupSize}
            </span>
          </div>

          <p className="mt-4 font-sans text-[15px] leading-relaxed text-ivory/80">{TRIP.description}</p>
          <div className="mt-3 flex flex-wrap items-center gap-3 font-sans text-[12.5px] text-ivory/70">
            <span className="flex items-center gap-1.5 text-[#dfba73]">
              <MapPin size={14} />
              {TRIP.destination}
            </span>
            <span>&bull;</span>
            <span className="flex items-center gap-1.5">
              <Calendar size={14} className="text-[#dfba73]" />
              {TRIP.dates}
            </span>
          </div>

          {/* 8 Inclusions */}
          <div className="mt-6 border-t border-[#dfba73]/15 pt-5">
            <span className="eyebrow-gold mb-3 block">Expedition Inclusions</span>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {TRIP.inclusions.map((a) => (
                <li key={a.label} className="flex items-start gap-2.5 rounded-xl border border-ivory/10 bg-[#020b11]/60 p-2.5 font-sans text-[12px] font-medium text-ivory/85">
                  <CheckCircle2 size={15} className="text-[#dfba73] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-ivory">{a.label}: </span>
                    <span className="text-ivory/70">{a.detail}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Day by Day Itinerary */}
          <div className="mt-6 border-t border-[#dfba73]/15 pt-5">
            <span className="eyebrow-gold mb-3 block">6-Day Itinerary Overview</span>
            <div className="space-y-3">
              {TRIP.itinerary.map((it) => (
                <div key={it.day} className="rounded-xl border border-ivory/10 bg-[#020b11]/80 p-3 text-ivory">
                  <div className="flex items-center gap-2">
                    <span className="font-sans text-[11px] font-bold uppercase tracking-wider text-[#03121b] bg-[#dfba73] px-2 py-0.5 rounded-md">
                      {it.day}
                    </span>
                    <span className="font-serif text-[17px] font-medium">{it.title}</span>
                  </div>
                  <p className="font-sans text-[12.5px] text-ivory/75 leading-relaxed mt-1.5">{it.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3.5">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold group w-full sm:w-auto"
            >
              <MessageCircle size={15} className="text-[#03121b]" />
              <span>Enquire on WhatsApp</span>
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
            </a>

            <a
              href={BROCHURE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold-outline w-full sm:w-auto"
            >
              <FileText size={15} />
              <span>View Brochure</span>
              <ExternalLink size={13} />
            </a>

            <button
              className="btn-ghost w-full sm:w-auto"
              onClick={() => {
                closeTrip();
                requestInquiry('Maldives Scuba Diving Trip (22–27 Nov 2026)');
              }}
            >
              Contact Form
            </button>
          </div>
          <p className="mt-3 font-sans text-[11.5px] text-ivory/55">
            Package pricing and confirmed terms are authoritative in the official brochure.
          </p>
        </div>
      </div>
    </Modal>
  );
}

export function FilmModal() {
  const { filmOpen, closeFilm } = useUI();
  return (
    <Modal open={filmOpen} onClose={closeFilm} label="Purva Ocean Adventures film" wide>
      <div className="p-6 pt-14 md:p-10 md:pt-16 bg-[#03121b] text-ivory">
        <span className="eyebrow-gold">Expedition Film</span>
        <h2 className="display mt-4 text-5xl font-normal text-ivory">Watch Film</h2>
        <div className="mt-8 aspect-video overflow-hidden rounded-2xl border border-[#dfba73]/25 bg-[#020b11]">
          {FILM_URL ? (
            <video src={FILM_URL} controls playsInline className="h-full w-full" />
          ) : (
            <div className="grid h-full place-items-center p-8 text-center">
              <div>
                <p className="font-serif text-3xl text-ivory">Coming Soon</p>
                <p className="mt-3 font-sans text-[14px] text-ivory/65">
                  Maldives underwater expedition video will be published shortly.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
}
