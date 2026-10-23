import { ArrowRight, Heart, Waves, Users } from 'lucide-react';
import { ABOUT } from '../content';
import { useUI } from '../lib/ui';

export default function About() {
  const { goTo } = useUI();

  return (
    <section id="about" className="section py-24 md:py-32" aria-labelledby="about-title">
      <div className="panel-ivory mx-auto max-w-[1440px] rounded-[32px] px-6 py-14 text-navy md:px-16 md:py-20 shadow-xl">
        <div data-reveal className="max-w-3xl">
          <p className="eyebrow text-cyan">{ABOUT.eyebrow}</p>
          <h2 id="about-title" className="display mt-4 text-[clamp(2.8rem,5.5vw,5rem)]">
            {ABOUT.title}
          </h2>
          <p className="mt-6 font-serif text-[1.45rem] md:text-[1.75rem] italic leading-[1.35] text-navy/90">
            &ldquo;{ABOUT.lead}&rdquo;
          </p>
          <p className="mt-6 font-sans text-[16px] leading-relaxed text-navy/80">
            {ABOUT.mission}
          </p>
        </div>

        {/* 3 Philosophy Pillars */}
        <div data-stagger className="mt-14 grid gap-6 md:grid-cols-3 md:gap-8 border-t border-navy/10 pt-10">
          <div className="rounded-2xl bg-white/70 p-6 shadow-xs border border-navy/5">
            <span className="grid h-12 w-12 place-items-center rounded-xl bg-ocean text-ivory mb-5">
              <Waves size={22} strokeWidth={1.75} />
            </span>
            <h3 className="font-serif text-[1.7rem] leading-tight text-navy">
              Ocean Conservation First
            </h3>
            <p className="mt-3 font-sans text-[14.5px] leading-relaxed text-navy/75">
              Zero-touch reef ethics and strict wildlife interaction distances. Every expedition is rooted in ocean literacy and active reef preservation.
            </p>
          </div>

          <div className="rounded-2xl bg-white/70 p-6 shadow-xs border border-navy/5">
            <span className="grid h-12 w-12 place-items-center rounded-xl bg-ocean text-ivory mb-5">
              <Heart size={22} strokeWidth={1.75} />
            </span>
            <h3 className="font-serif text-[1.7rem] leading-tight text-navy">
              Science & Mindful Diving
            </h3>
            <p className="mt-3 font-sans text-[14.5px] leading-relaxed text-navy/75">
              Dr. Purva integrates her physiotherapy and rescue diving expertise to teach effortless buoyancy, aquatic body alignment, and calm meditative breathing.
            </p>
          </div>

          <div className="rounded-2xl bg-white/70 p-6 shadow-xs border border-navy/5">
            <span className="grid h-12 w-12 place-items-center rounded-xl bg-ocean text-ivory mb-5">
              <Users size={22} strokeWidth={1.75} />
            </span>
            <h3 className="font-serif text-[1.7rem] leading-tight text-navy">
              Intimate 10-Spot Groups
            </h3>
            <p className="mt-3 font-sans text-[14.5px] leading-relaxed text-navy/75">
              No crowded dive boats or rushed schedules. We cap each expedition at just 10 spots to cultivate deep connections and genuine shared wonder.
            </p>
          </div>
        </div>

        {/* Footer line with signature and CTA */}
        <div data-reveal className="mt-12 flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-t border-navy/10 pt-8">
          <div>
            <p className="font-hand text-[2.6rem] leading-none text-ocean">
              Dr. Purva
            </p>
            <p className="font-sans text-[12px] uppercase tracking-widest text-navy/60 mt-1">
              Expedition Leader & Founder
            </p>
          </div>

          <button
            onClick={() => goTo('contact')}
            className="btn-navy group w-fit"
          >
            <span>Join Our Next Journey</span>
            <ArrowRight size={15} className="text-seaglass transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </section>
  );
}
