import { ArrowUpRight } from 'lucide-react';
import { INSTAGRAM_URL } from '../content';
import { InstagramIcon } from '../components/Brand';

const TILES = Array.from({ length: 6 }, (_, i) => i);

/**
 * No authorised feed is connected, so the grid shows neutral tiles that link to the profile.
 * It does NOT display posts from the account. Connect an official embed or approved images later.
 */
export default function Instagram() {
  return (
    <section id="instagram" className="section py-24 md:py-32" aria-labelledby="instagram-title">
      <div className="mx-auto grid max-w-[1440px] gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-20">
        <div data-reveal>
          <span className="grid h-14 w-14 place-items-center rounded-full border border-ivory/30 text-ivory">
            <InstagramIcon className="h-6 w-6" />
          </span>
          <h2 id="instagram-title" className="display mt-6 text-[clamp(2.8rem,5vw,4.6rem)] text-ivory">
            Follow the Journey
          </h2>
          <p className="mt-6 max-w-md font-sans text-[16px] leading-relaxed text-ivory/80">
            Dive stories, ocean moments and the people behind each expedition, shared on Instagram between trips.
          </p>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ivory group mt-9"
          >
            <InstagramIcon className="h-4 w-4" />
            Follow on Instagram
            <ArrowUpRight size={15} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        <div data-reveal>
          <div data-stagger className="grid grid-cols-3 gap-3 md:gap-4">
            {TILES.map((i) => (
              <a
                key={i}
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Instagram post placeholder ${i + 1}, opens the profile`}
                className="group relative aspect-square overflow-hidden rounded-[18px] bg-gradient-to-br from-[#1c86ad] via-[#0a4b67] to-[#03121b] text-ivory transition-transform duration-500 hover:-translate-y-1"
              >
                <span className="absolute inset-0 opacity-25 [background:radial-gradient(circle_at_30%_20%,#8edceb_0_2px,transparent_3px)_0_0/22px_22px]" aria-hidden="true" />
                <span className="absolute inset-0 grid place-items-center opacity-60 transition-opacity duration-500 group-hover:opacity-100">
                  <InstagramIcon className="h-7 w-7" />
                </span>
              </a>
            ))}
          </div>
          <p className="mt-4 font-sans text-[12px] leading-relaxed text-ivory/55">
            Placeholder tiles. The live feed is not connected, so no posts or counts are shown here.
          </p>
        </div>
      </div>
    </section>
  );
}
