import { useState } from 'react';
import { ArrowUpRight, BadgeCheck } from 'lucide-react';
import { HOST } from '../content';
import { InstagramIcon } from '../components/Brand';

function Portrait() {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return (
      <div
        className="relative flex aspect-[4/5] w-full flex-col items-center justify-center overflow-hidden rounded-[28px] bg-gradient-to-b from-seaglass via-[#1c86ad] to-ocean text-ivory"
        role="img"
        aria-label="Portrait placeholder for Dr. Purva"
      >
        <span className="font-serif text-[8rem] leading-none opacity-90">P</span>
        <p className="mt-3 px-6 text-center font-sans text-[12px] uppercase tracking-wider text-ivory/80 font-semibold">
          Dr. Purva
        </p>
      </div>
    );
  }
  return (
    <div className="relative group overflow-hidden rounded-[28px] shadow-[0_30px_70px_-25px_rgba(3,18,27,0.5)]">
      <img
        src={HOST.portrait}
        alt="Dr. Purva, founder and expedition leader of Purva Ocean Adventures"
        loading="lazy"
        onError={() => setFailed(true)}
        className="aspect-[4/5] w-full rounded-[28px] object-cover transition-transform duration-1000 ease-editorial group-hover:scale-[1.03]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-transparent to-transparent pointer-events-none" />
      <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between text-ivory">
        <span className="font-sans text-[12px] font-semibold uppercase tracking-widest text-seaglass">
          Expedition Leader
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-navy/80 px-3 py-1 font-sans text-[11px] font-medium text-ivory backdrop-blur-md">
          <BadgeCheck size={14} className="text-cyan fill-cyan/20" />
          Verified
        </span>
      </div>
    </div>
  );
}

export default function Host() {
  return (
    <section id="host" className="section py-24 md:py-32" aria-labelledby="host-title">
      <div className="panel-ivory mx-auto grid max-w-[1440px] items-center gap-12 rounded-[32px] px-6 py-14 text-navy md:px-14 md:py-20 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20 shadow-xl">
        {/* Host Portrait */}
        <div data-reveal className="relative">
          <div data-parallax-wrap className="relative">
            <div data-parallax>
              <Portrait />
            </div>
          </div>
        </div>

        {/* Host Profile Info */}
        <div data-reveal>
          <div className="flex items-center gap-2">
            <p className="eyebrow text-cyan">{HOST.eyebrow}</p>
            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-ocean uppercase tracking-wider bg-cyan/15 px-2.5 py-0.5 rounded-full">
              <BadgeCheck size={13} className="text-cyan" />
              Verified Host
            </span>
          </div>

          <h2 id="host-title" className="display mt-4 text-[clamp(2.8rem,5.5vw,5.2rem)]">
            {HOST.name}
          </h2>

          <p className="mt-3 font-sans text-[13px] font-bold uppercase tracking-[0.16em] text-ocean">
            {HOST.credentials}
          </p>

          <p className="mt-1 font-sans text-[13px] font-medium text-navy/60">
            {HOST.role}
          </p>

          {/* Philosophy Highlight */}
          <div className="mt-7 rounded-2xl border-l-4 border-cyan bg-cream/70 p-5 shadow-xs">
            <p className="eyebrow text-navy/55 mb-2">Expedition Philosophy</p>
            <p className="font-serif text-[1.45rem] md:text-[1.65rem] italic leading-[1.35] text-navy/90">
              {HOST.philosophy}
            </p>
          </div>

          <p className="mt-6 font-sans text-[15.5px] leading-relaxed text-navy/80">
            {HOST.bio}
          </p>

          <p className="mt-6 font-hand text-[2.8rem] leading-none text-ocean" aria-hidden="true">
            Dr. Purva
          </p>

          {/* Verified Instagram profile link */}
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href={HOST.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-navy group"
            >
              <InstagramIcon className="h-4.5 w-4.5 text-seaglass" />
              <span>Connect on Instagram @dr.purvaa</span>
              <ArrowUpRight size={15} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <span className="font-sans text-[12px] text-navy/55">Directly verified Instagram account</span>
          </div>
        </div>
      </div>
    </section>
  );
}
