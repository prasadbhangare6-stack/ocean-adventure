import { ArrowRight } from 'lucide-react';
import { DESTINATIONS } from '../content';
import { useUI } from '../lib/ui';

export default function Destinations() {
  const { requestInquiry } = useUI();
  return (
    <section id="destinations" className="section flex min-h-[90svh] items-center py-28" aria-labelledby="destinations-title">
      <div className="mx-auto max-w-[1100px] text-center">
        <p data-reveal className="eyebrow text-navy">Next horizons</p>
        <h2 id="destinations-title" data-reveal className="display mt-6 text-[clamp(3.2rem,7vw,6.8rem)] text-navy [text-shadow:0_1px_24px_rgba(255,255,255,0.35)]">
          More Destinations<br />
          <span className="italic">Coming Soon</span>
        </h2>
        <ul data-stagger className="mt-10 flex flex-wrap items-center justify-center gap-x-3 gap-y-3 font-serif text-[clamp(1.4rem,2.6vw,2.1rem)] text-navy">
          {DESTINATIONS.map((d, i) => (
            <li key={d} className="flex items-center gap-3">
              <span className={i === DESTINATIONS.length - 1 ? 'italic text-navy/75' : ''}>{d}</span>
              {i < DESTINATIONS.length - 1 && <span className="text-cyan" aria-hidden="true">|</span>}
            </li>
          ))}
        </ul>
        <div data-reveal className="mt-12">
          <button className="btn-navy group" onClick={() => requestInquiry('Upcoming Destinations')}>
            Be the first to know
            <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </section>
  );
}
