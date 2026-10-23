import { ArrowUpRight } from 'lucide-react';
import { EXPERIENCES, INTERESTS } from '../content';
import { useUI } from '../lib/ui';

export default function Experiences() {
  const { requestInquiry } = useUI();
  return (
    <section id="experiences" className="section py-24 md:py-32" aria-labelledby="experiences-title">
      <div className="mx-auto max-w-[1440px]">
        <div data-reveal className="max-w-2xl">
          <span className="eyebrow-gold">Diver Pathways</span>
          <h2 id="experiences-title" className="display mt-4 text-[clamp(2.8rem,5vw,4.6rem)] text-ivory font-normal">
            Find Your Depth
          </h2>
          <p className="mt-4 font-sans text-[16px] text-ivory/80 leading-relaxed">
            Thoughtfully tailored ocean experiences for every comfort level. Whether you are taking your first breath underwater or drifting through Maldivian channels, you belong here.
          </p>
        </div>

        <div data-stagger className="mt-14 grid gap-6 md:grid-cols-3 md:gap-7">
          {EXPERIENCES.map((e) => (
            <article
              key={e.id}
              className="group flex flex-col overflow-hidden rounded-[26px] border border-[#dfba73]/25 bg-[#03121b]/85 text-ivory shadow-[0_30px_60px_-30px_rgba(0,0,0,0.8)] transition-all duration-700 ease-editorial hover:-translate-y-2 hover:border-[#dfba73]/60 hover:shadow-[0_35px_70px_-20px_rgba(223,186,115,0.18)]"
            >
              <div className="relative aspect-[4/4.2] overflow-hidden bg-[#020b11]">
                <img
                  src={e.image}
                  alt={e.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[1400ms] ease-editorial group-hover:scale-[1.08]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#03121b] via-[#03121b]/40 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
                <span className="absolute top-4 left-4 rounded-full border border-[#dfba73]/30 bg-[#03121b]/85 px-3 py-1 font-sans text-[11px] font-semibold uppercase tracking-wider text-[#dfba73] backdrop-blur-md">
                  {e.level}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-7">
                <h3 className="font-serif text-[2.1rem] leading-snug font-medium text-ivory">{e.title}</h3>
                <p className="mt-3.5 flex-1 font-sans text-[14.5px] leading-relaxed text-ivory/75">{e.text}</p>

                <div className="mt-8 pt-4 border-t border-ivory/10 flex items-center justify-between">
                  <button
                    onClick={() => requestInquiry(e.interest as (typeof INTERESTS)[number])}
                    className="inline-flex items-center gap-2 font-sans text-[12px] font-bold uppercase tracking-[0.18em] text-[#dfba73] transition-colors hover:text-[#f5e4bd]"
                    aria-label={`Enquire about ${e.title}`}
                  >
                    <span>Enquire Level</span>
                    <span className="grid h-9 w-9 place-items-center rounded-full border border-[#dfba73]/40 bg-[#dfba73]/10 transition-all duration-500 group-hover:rotate-45 group-hover:bg-[#dfba73] group-hover:text-[#03121b]">
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
