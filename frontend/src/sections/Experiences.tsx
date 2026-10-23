import { ArrowUpRight } from 'lucide-react';
import { EXPERIENCES, INTERESTS } from '../content';
import { useUI } from '../lib/ui';

export default function Experiences() {
  const { requestInquiry } = useUI();
  return (
    <section id="experiences" className="section py-24 md:py-32" aria-labelledby="experiences-title">
      <div className="mx-auto max-w-[1440px]">
        <div data-reveal className="max-w-2xl">
          <p className="eyebrow text-seaglass">Dive Experiences</p>
          <h2 id="experiences-title" className="display mt-4 text-[clamp(2.8rem,5vw,4.6rem)] text-ivory">
            Find Your Depth
          </h2>
          <p className="mt-4 font-sans text-[16px] text-ivory/75 leading-relaxed">
            Thoughtfully tailored ocean experiences for every comfort level. Whether you are taking your first breath underwater or drifting through Maldivian channels, you belong here.
          </p>
        </div>

        <div data-stagger className="mt-14 grid gap-6 md:grid-cols-3 md:gap-7">
          {EXPERIENCES.map((e) => (
            <article
              key={e.id}
              className="group flex flex-col overflow-hidden rounded-[26px] bg-ivory text-navy shadow-[0_30px_60px_-30px_rgba(0,0,0,0.6)] transition-all duration-700 ease-editorial hover:-translate-y-2 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.7)]"
            >
              <div className="relative aspect-[4/4.2] overflow-hidden bg-cream">
                <img
                  src={e.image}
                  alt={e.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[1400ms] ease-editorial group-hover:scale-[1.08]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                <span className="absolute top-4 left-4 rounded-full bg-navy/80 px-3 py-1 font-sans text-[11px] font-semibold uppercase tracking-wider text-ivory backdrop-blur-md">
                  {e.level}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-7">
                <h3 className="font-serif text-[2.1rem] leading-none font-medium">{e.title}</h3>
                <p className="mt-4 flex-1 font-sans text-[15px] leading-relaxed text-navy/75">{e.text}</p>

                <div className="mt-8 pt-4 border-t border-navy/10 flex items-center justify-between">
                  <button
                    onClick={() => requestInquiry(e.interest as (typeof INTERESTS)[number])}
                    className="inline-flex items-center gap-2 font-sans text-[12px] font-bold uppercase tracking-[0.18em] text-ocean transition-colors hover:text-cyan"
                    aria-label={`Enquire about ${e.title}`}
                  >
                    <span>Enquire Level</span>
                    <span className="grid h-9 w-9 place-items-center rounded-full border border-ocean/30 transition-all duration-500 group-hover:rotate-45 group-hover:bg-ocean group-hover:text-ivory">
                      <ArrowUpRight size={16} />
                    </span>
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
