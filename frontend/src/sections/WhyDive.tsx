import { Compass, Heart, LifeBuoy, Users, Waves, type LucideIcon } from 'lucide-react';
import { BENEFITS } from '../content';

const ICONS: Record<string, LucideIcon> = { Waves, Compass, Users, LifeBuoy, Heart };

export default function WhyDive() {
  return (
    <section id="why" className="section py-24 md:py-32" aria-labelledby="why-title">
      <div className="glass-dark mx-auto max-w-[1440px] rounded-[32px] border border-ivory/10 px-6 py-14 md:px-14 md:py-20">
        <div data-reveal className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <p className="eyebrow text-seaglass">Our promise</p>
            <h2 id="why-title" className="display mt-4 text-[clamp(2.8rem,5vw,4.6rem)] text-ivory">
              Why Dive With Us?
            </h2>
          </div>
          <ul data-stagger className="divide-y divide-ivory/12">
            {BENEFITS.map((b) => {
              const Icon = ICONS[b.icon] ?? Waves;
              return (
                <li key={b.title} className="flex items-start gap-6 py-6 first:pt-0 last:pb-0">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-ivory/35 text-ivory">
                    <Icon size={20} strokeWidth={1.25} aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="font-serif text-[1.75rem] leading-tight text-ivory">{b.title}</h3>
                    <p className="mt-1 font-sans text-[15px] leading-relaxed text-ivory/70">{b.text}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
