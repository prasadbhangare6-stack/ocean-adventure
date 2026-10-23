import { ArrowUpRight } from 'lucide-react';
import { INSTAGRAM_ACCOUNTS } from '../content';
import { InstagramIcon } from '../components/Brand';

const GALLERY_POSTS = [
  {
    image: '/images/manta-ray.jpg',
    alt: 'Manta ray gliding through Maldivian waters',
    caption: 'Manta moments in South Malé Atoll',
    account: 'brand',
  },
  {
    image: '/images/diver-underwater.jpg',
    alt: 'Scuba diver exploring coral reefs',
    caption: 'Mindful buoyancy & underwater peace',
    account: 'host',
  },
  {
    image: '/images/sea-turtle.jpg',
    alt: 'Sea turtle swimming peacefully',
    caption: 'Encounter with gentle ocean wanderers',
    account: 'brand',
  },
  {
    image: '/images/coral-garden.jpg',
    alt: 'Vibrant coral reef garden',
    caption: 'Preserving fragile coral sanctuaries',
    account: 'host',
  },
  {
    image: '/images/divers-boat.jpg',
    alt: 'Divers on speedboat in Maldives',
    caption: 'Small group camaraderie on the dive deck',
    account: 'brand',
  },
  {
    image: '/images/maldives-aerial.jpg',
    alt: 'Aerial perspective of Maafushi lagoon',
    caption: 'Fifty shades of Maldivian blue',
    account: 'host',
  },
];

export default function Instagram() {
  return (
    <section id="instagram" className="section py-24 md:py-32" aria-labelledby="instagram-title">
      <div className="mx-auto grid max-w-[1440px] gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-16">
        {/* Text & Profile Links */}
        <div data-reveal>
          <span className="grid h-14 w-14 place-items-center rounded-2xl border border-[#dfba73]/40 bg-[#dfba73]/10 text-[#dfba73]">
            <InstagramIcon className="h-6 w-6" />
          </span>

          <span className="eyebrow-gold mt-6 block">Follow The Ocean Journey</span>

          <h2 id="instagram-title" className="display mt-3 text-[clamp(2.8rem,5vw,4.6rem)] text-ivory">
            Follow On Instagram
          </h2>

          <p className="mt-5 max-w-md font-sans text-[16px] leading-relaxed text-ivory/80">
            Dive stories, underwater photography, and the people behind each expedition. Follow both our official expedition space and Dr. Purva's personal journey.
          </p>

          {/* Dual Instagram Profile Cards */}
          <div className="mt-8 space-y-3.5 max-w-md">
            {/* Brand Account */}
            <a
              href={INSTAGRAM_ACCOUNTS.brand.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between rounded-2xl border border-[#dfba73]/25 bg-[#03121b]/80 p-4.5 backdrop-blur-md transition-all duration-300 hover:border-[#dfba73] hover:bg-[#03121b] hover:shadow-[0_10px_25px_rgba(223,186,115,0.15)]"
            >
              <div className="flex items-center gap-3.5">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-[#dfba73]/15 text-[#dfba73] group-hover:scale-105 transition-transform">
                  <InstagramIcon className="h-5 w-5" />
                </span>
                <div>
                  <div className="font-sans text-[11px] font-bold uppercase tracking-wider text-[#dfba73]">
                    Official Brand Account
                  </div>
                  <div className="font-serif text-xl font-medium text-ivory">
                    {INSTAGRAM_ACCOUNTS.brand.handle}
                  </div>
                </div>
              </div>
              <ArrowUpRight size={18} className="text-[#dfba73] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </a>

            {/* Host Account */}
            <a
              href={INSTAGRAM_ACCOUNTS.host.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between rounded-2xl border border-ivory/15 bg-[#03121b]/60 p-4.5 backdrop-blur-md transition-all duration-300 hover:border-[#dfba73] hover:bg-[#03121b] hover:shadow-[0_10px_25px_rgba(223,186,115,0.15)]"
            >
              <div className="flex items-center gap-3.5">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-ivory/10 text-ivory group-hover:scale-105 group-hover:bg-[#dfba73]/15 group-hover:text-[#dfba73] transition-all">
                  <InstagramIcon className="h-5 w-5" />
                </span>
                <div>
                  <div className="font-sans text-[11px] font-bold uppercase tracking-wider text-ivory/60">
                    Dr. Purva Thorat
                  </div>
                  <div className="font-serif text-xl font-medium text-ivory">
                    {INSTAGRAM_ACCOUNTS.host.handle}
                  </div>
                </div>
              </div>
              <ArrowUpRight size={18} className="text-ivory/70 transition-transform duration-300 group-hover:text-[#dfba73] group-hover:translate-x-1 group-hover:-translate-y-1" />
            </a>
          </div>
        </div>

        {/* Real Ocean Media Grid linking to Instagram */}
        <div data-reveal>
          <div data-stagger className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4">
            {GALLERY_POSTS.map((post, idx) => {
              const targetUrl =
                post.account === 'brand' ? INSTAGRAM_ACCOUNTS.brand.url : INSTAGRAM_ACCOUNTS.host.url;
              const handle =
                post.account === 'brand' ? INSTAGRAM_ACCOUNTS.brand.handle : INSTAGRAM_ACCOUNTS.host.handle;
              return (
                <a
                  key={idx}
                  href={targetUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative aspect-square overflow-hidden rounded-[20px] border border-[#dfba73]/20 bg-[#020b11] shadow-lg transition-transform duration-500 hover:-translate-y-1.5 hover:border-[#dfba73]/60"
                  aria-label={`View on Instagram: ${post.caption}`}
                >
                  <img
                    src={post.image}
                    alt={post.alt}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#020b11]/90 via-[#03121b]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3.5" />
                  <div className="absolute inset-0 flex flex-col justify-between p-3.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex justify-end">
                      <span className="grid h-8 w-8 place-items-center rounded-full bg-[#03121b]/80 text-[#dfba73] backdrop-blur-md">
                        <InstagramIcon className="h-4 w-4" />
                      </span>
                    </div>
                    <div>
                      <p className="font-sans text-[10px] font-semibold uppercase tracking-wider text-[#dfba73]">
                        {handle}
                      </p>
                      <p className="font-serif text-[13px] text-ivory leading-tight line-clamp-2 mt-0.5">
                        {post.caption}
                      </p>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
          <p className="mt-4 font-sans text-[12px] text-ivory/55 text-center sm:text-left">
            Authentic photography from our Maldivian expeditions. Click any moment to visit our verified Instagram profiles.
          </p>
        </div>
      </div>
    </section>
  );
}
