import { useState } from 'react';
import { ArrowUpRight, BadgeCheck, Sparkles } from 'lucide-react';
import { HOST, INSTAGRAM_ACCOUNTS } from '../content';
import { InstagramIcon } from '../components/Brand';

function Portrait() {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return (
      <div
        className="relative flex aspect-[4/5] w-full flex-col items-center justify-center overflow-hidden rounded-[28px] border border-[#dfba73]/40 bg-gradient-to-b from-[#063c59] via-[#03121b] to-[#020b11] text-ivory"
        role="img"
        aria-label="Portrait placeholder for Dr. Purva Thorat"
      >
        <span className="font-serif text-[7rem] leading-none text-[#dfba73] opacity-80">P</span>
        <p className="mt-3 px-6 text-center font-sans text-[12px] uppercase tracking-wider text-ivory/80 font-semibold">
          Dr. Purva Thorat
        </p>
      </div>
    );
  }
  return (
    <div className="relative group overflow-hidden rounded-[28px] border border-[#dfba73]/40 shadow-[0_30px_70px_-25px_rgba(0,0,0,0.8)]">
      <img
        src={HOST.portrait}
        alt="Dr. Purva Thorat, Physiotherapist, PADI Rescue Diver, and Founder of Purva Ocean Adventures"
        loading="lazy"
        onError={() => setFailed(true)}
        className="aspect-[4/5] w-full rounded-[28px] object-cover transition-transform duration-1000 ease-editorial group-hover:scale-[1.03]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#020b11]/85 via-transparent to-transparent pointer-events-none" />
      <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between text-ivory">
        <span className="font-sans text-[11.5px] font-bold uppercase tracking-widest text-[#dfba73]">
          Expedition Leader
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#03121b]/80 px-3 py-1 font-sans text-[11px] font-medium text-ivory backdrop-blur-md border border-[#dfba73]/30">
          <BadgeCheck size={14} className="text-[#dfba73]" />
          Verified
        </span>
      </div>
    </div>
  );
}

export default function Host() {
  return (
    <section id="host" className="section py-24 md:py-32" aria-labelledby="host-title">
      <div className="gold-panel mx-auto grid max-w-[1440px] items-center gap-12 rounded-[32px] p-8 md:p-14 lg:p-20 text-ivory lg:grid-cols-[0.95fr_1.05fr] lg:gap-20 shadow-2xl border border-[#dfba73]/30">
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
            <span className="eyebrow-gold">{HOST.eyebrow}</span>
            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#dfba73] uppercase tracking-wider bg-[#dfba73]/15 px-2.5 py-0.5 rounded-full border border-[#dfba73]/30">
              <BadgeCheck size={13} className="text-[#dfba73]" />
              Verified Host
            </span>
          </div>

          <h2 id="host-title" className="display mt-4 text-[clamp(2.8rem,5.5vw,5.2rem)] text-ivory font-normal">
            {HOST.name}
          </h2>

          <p className="mt-3 font-sans text-[13.5px] font-bold uppercase tracking-[0.18em] text-[#dfba73]">
            {HOST.title}
          </p>

          <p className="mt-1 font-sans text-[13px] font-medium text-ivory/70">
            {HOST.role}
          </p>

          {/* Philosophy / Story Highlight with exact quote */}
          <div className="mt-7 rounded-2xl border-l-4 border-[#dfba73] bg-[#020b11]/70 p-6 backdrop-blur-sm">
            <p className="eyebrow-gold mb-2 flex items-center gap-1.5">
              <Sparkles size={13} />
              My Story &amp; Philosophy
            </p>
            <blockquote className="font-serif text-[1.4rem] md:text-[1.6rem] italic leading-[1.4] text-ivory/95">
              &ldquo;What started as a personal love for the ocean has grown into a space where I get to share my two biggest passions — diving and meaningful travel.
              <br /><br />
              These trips are not just about ticking destinations, but about real experiences, like-minded people and a deeper connection with the ocean.&rdquo;
            </blockquote>
          </div>

          <p className="mt-6 font-sans text-[15.5px] leading-relaxed text-ivory/80">
            {HOST.bio}
          </p>

          <p className="mt-6 font-hand text-[3rem] leading-none text-[#dfba73]" aria-hidden="true">
            Dr. Purva Thorat
          </p>

          {/* Connect on Instagram links */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href={INSTAGRAM_ACCOUNTS.host.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold group"
            >
              <InstagramIcon className="h-4.5 w-4.5 text-[#03121b]" />
              <span>Connect @dr.purvaa</span>
              <ArrowUpRight size={15} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>

            <a
              href={INSTAGRAM_ACCOUNTS.brand.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold-outline group"
            >
              <InstagramIcon className="h-4.5 w-4.5 text-[#dfba73]" />
              <span>@purvaoceanadventures</span>
              <ArrowUpRight size={15} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
