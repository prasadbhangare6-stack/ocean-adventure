import { ArrowRight, Heart, Waves, Users } from 'lucide-react';
import { ABOUT } from '../content';
import { useUI } from '../lib/ui';

export default function About() {
  const { goTo } = useUI();

  return (
    <section id="about" className="section py-24 md:py-32" aria-labelledby="about-title">
      <div className="gold-panel mx-auto max-w-[1440px] rounded-[32px] p-8 md:p-16 lg:p-20 text-ivory shadow-2xl border border-[#dfba73]/30">
        <div data-reveal className="max-w-3xl">
          <span className="eyebrow-gold">{ABOUT.eyebrow}</span>
          <h2 id="about-title" className="display mt-4 text-[clamp(2.8rem,5.5vw,5rem)] text-ivory font-normal">
            {ABOUT.title}
          </h2>
          <p className="mt-6 font-serif text-[1.45rem] md:text-[1.75rem] italic leading-[1.35] text-[#f5e4bd]">
            &ldquo;{ABOUT.lead}&rdquo;
          </p>
          <p className="mt-6 font-sans text-[16px] leading-relaxed text-ivory/80">
            {ABOUT.mission}
          </p>
        </div>

        {/* 3 Philosophy Pillars */}
        <div data-stagger className="mt-14 grid gap-6 md:grid-cols-3 md:gap-8 border-t border-[#dfba73]/15 pt-10">
          <div className="rounded-2xl border border-[#dfba73]/20 bg-[#020b11]/70 p-6 backdrop-blur-sm transition-all hover:border-[#dfba73]/50">
            <span className="grid h-12 w-12 place-items-center rounded-xl bg-[#dfba73]/15 text-[#dfba73] mb-5">
              <Waves size={22} strokeWidth={1.75} />
            </span>
            <h3 className="font-serif text-[1.7rem] leading-tight text-ivory font-normal">
              Ocean Conservation First
            </h3>
            <p className="mt-3 font-sans text-[14.5px] leading-relaxed text-ivory/70">
              Zero-touch reef etiquette and strict wildlife interaction distances. Every expedition is rooted in ocean literacy, delicate reef respect, and active preservation.
            </p>
          </div>

          <div className="rounded-2xl border border-[#dfba73]/20 bg-[#020b11]/70 p-6 backdrop-blur-sm transition-all hover:border-[#dfba73]/50">
            <span className="grid h-12 w-12 place-items-center rounded-xl bg-[#dfba73]/15 text-[#dfba73] mb-5">
              <Heart size={22} strokeWidth={1.75} />
            </span>
            <h3 className="font-serif text-[1.7rem] leading-tight text-ivory font-normal">
              Aquatic Wellness &amp; Ergonomics
            </h3>
            <p className="mt-3 font-sans text-[14.5px] leading-relaxed text-ivory/70">
              Dr. Purva Thorat integrates her physiotherapy and rescue diving expertise to coach effortless buoyancy, calm breathing rhythms, and relaxed underwater body alignment.
            </p>
          </div>

          <div className="rounded-2xl border border-[#dfba73]/20 bg-[#020b11]/70 p-6 backdrop-blur-sm transition-all hover:border-[#dfba73]/50">
            <span className="grid h-12 w-12 place-items-center rounded-xl bg-[#dfba73]/15 text-[#dfba73] mb-5">
              <Users size={22} strokeWidth={1.75} />
            </span>
            <h3 className="font-serif text-[1.7rem] leading-tight text-ivory font-normal">
              Maximum 10 Participants
            </h3>
            <p className="mt-3 font-sans text-[14.5px] leading-relaxed text-ivory/70">
              No crowded dive decks or hurried schedules. We cap each expedition at just 10 participants to cultivate deep connections and genuine shared wonder.
            </p>
          </div>
        </div>

        {/* Footer line with signature and CTA */}
        <div data-reveal className="mt-12 flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-t border-[#dfba73]/15 pt-8">
          <div>
            <p className="font-hand text-[2.8rem] leading-none text-[#dfba73]">
              Dr. Purva Thorat
            </p>
            <p className="font-sans text-[12px] uppercase tracking-widest text-ivory/60 mt-1">
              Founder &amp; PADI Rescue Diver
            </p>
          </div>

          <button
            onClick={() => goTo('contact')}
            className="btn-gold group w-fit"
          >
            <span>Join Our Next Journey</span>
            <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </section>
  );
}
