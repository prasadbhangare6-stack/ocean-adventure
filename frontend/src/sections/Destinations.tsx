import { ArrowRight } from 'lucide-react';
import { DESTINATIONS } from '../content';
import { useUI } from '../lib/ui';

export default function Destinations() {
  const { requestInquiry } = useUI();
  return (
    <section id="destinations" className="section flex min-h-[90svh] items-center py-28" aria-labelledby="destinations-title">
      <div className="mx-auto max-w-[1100px] text-center">
        <span data-reveal className="eyebrow-gold">Next Horizons</span>
        <h2 id="destinations-title" data-reveal className="display mt-6 text-[clamp(3.2rem,7vw,6.8rem)] text-ivory [text-shadow:0_2px_30px_rgba(2,11,17,0.7)] font-normal">
          More Destinations<br />
          <span className="italic text-[#dfba73]">Coming Soon</span>
        </h2>
        <ul data-stagger className="mt-10 flex flex-wrap items-center justify-center gap-x-4 gap-y-3 font-serif text-[clamp(1.4rem,2.6vw,2.1rem)] text-ivory/90">
          {DESTINATIONS.map((d, i) => (
            <li key={d} className="flex items-center gap-4">
              <span className={i === DESTINATIONS.length - 1 ? 'italic text-[#dfba73]' : ''}>{d}</span>
              {i < DESTINATIONS.length - 1 && <span className="text-[#dfba73]/40" aria-hidden="true">&bull;</span>}
            </li>
          ))}
        </ul>
        <div data-reveal className="mt-12">
          <button className="btn-gold group" onClick={() => requestInquiry('General Expedition Inquiry')}>
            <span>Be The First To Know</span>
            <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </section>
  );
}
