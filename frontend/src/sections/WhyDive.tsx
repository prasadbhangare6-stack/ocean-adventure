import { Compass, Heart, LifeBuoy, Users, Waves, type LucideIcon } from 'lucide-react';
import { BENEFITS } from '../content';

const ICONS: Record<string, LucideIcon> = { Waves, Compass, Users, LifeBuoy, Heart };

export default function WhyDive() {
  return (
    <section id="why" className="section py-24 md:py-32" aria-labelledby="why-title">
      <div className="gold-panel mx-auto max-w-[1440px] rounded-[32px] p-8 md:p-14 lg:p-20 border border-[#dfba73]/30">
        <div data-reveal className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <span className="eyebrow-gold">Our Philosophy</span>
            <h2 id="why-title" className="display mt-4 text-[clamp(2.8rem,5vw,4.6rem)] text-ivory font-normal">
              Why Dive With Us?
            </h2>
            <p className="mt-4 font-sans text-[16px] text-ivory/75 leading-relaxed">
              We believe in ocean journeys that transform us. Safe, mindful, respectful of marine habitats, and limited to just 10 participants.
            </p>
          </div>
          <ul data-stagger className="divide-y divide-[#dfba73]/15">
            {BENEFITS.map((b) => {
              const Icon = ICONS[b.icon] ?? Waves;
              return (
                <li key={b.title} className="flex items-start gap-6 py-6 first:pt-0 last:pb-0">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-[#dfba73]/35 bg-[#dfba73]/10 text-[#dfba73]">
                    <Icon size={20} strokeWidth={1.5} aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="font-serif text-[1.75rem] leading-tight text-ivory font-medium">{b.title}</h3>
                    <p className="mt-1 font-sans text-[15px] leading-relaxed text-ivory/75">{b.text}</p>
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
