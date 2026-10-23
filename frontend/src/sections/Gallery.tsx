import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { GALLERY, GALLERY_CATEGORIES, type GalleryCategory } from '../content';

export default function Gallery() {
  const [filter, setFilter] = useState<GalleryCategory>('All');
  const [active, setActive] = useState<number | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const items = useMemo(() => {
    if (filter === 'All') return GALLERY;
    return GALLERY.filter((g) => g.category === filter);
  }, [filter]);

  const current = active !== null ? items[active] : undefined;

  const open = (i: number, el: HTMLElement) => {
    triggerRef.current = el;
    setActive(i);
  };

  const close = useCallback(() => {
    setActive(null);
    window.setTimeout(() => triggerRef.current?.focus(), 0);
  }, []);

  const prev = useCallback(() => setActive((i) => (i === null ? 0 : (i - 1 + items.length) % items.length)), [items.length]);
  const next = useCallback(() => setActive((i) => (i === null ? 0 : (i + 1) % items.length)), [items.length]);

  useEffect(() => {
    if (current) {
      closeRef.current?.focus();
      const onKey = (e: KeyboardEvent) => {
        if (e.key === 'Escape') close();
        if (e.key === 'ArrowLeft') prev();
        if (e.key === 'ArrowRight') next();
      };
      window.addEventListener('keydown', onKey);
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        window.removeEventListener('keydown', onKey);
        document.body.style.overflow = prevOverflow;
      };
    }
  }, [current, close, prev, next]);

  return (
    <section id="gallery" className="section py-24 md:py-32" aria-labelledby="gallery-title">
      <div className="gold-panel mx-auto max-w-[1440px] rounded-[32px] p-8 md:p-14 lg:p-20 text-ivory shadow-xl border border-[#dfba73]/30">
        {/* Header & Category Filter Tabs */}
        <div data-reveal className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <span className="eyebrow-gold">Visual Collection</span>
            <h2 id="gallery-title" className="display mt-4 text-[clamp(2.8rem,5vw,4.6rem)] text-ivory font-normal">
              Ocean Gallery
            </h2>
            <p className="mt-3 font-sans text-[15px] text-ivory/80 max-w-xl">
              Glimpses from past journeys across Maldivian reefs, pelagic highways, coral sanctuaries, and the inspiring community of divers.
            </p>
          </div>

          {/* Interactive Filter Tabs: All, Underwater, Corals, Marine Life, Divers */}
          <div
            role="group"
            aria-label="Filter photo gallery categories"
            className="flex flex-wrap items-center gap-2 rounded-2xl bg-[#020b11]/80 p-1.5 border border-[#dfba73]/20"
          >
            {GALLERY_CATEGORIES.map((f) => {
              const on = filter === f;
              return (
                <button
                  key={f}
                  aria-pressed={on}
                  onClick={() => {
                    setFilter(f);
                    setActive(null);
                  }}
                  className={`relative rounded-xl px-4 py-2 font-sans text-[12px] font-bold uppercase tracking-[0.14em] transition-all duration-300 ${
                    on ? 'text-[#03121b]' : 'text-ivory/70 hover:text-ivory hover:bg-ivory/10'
                  }`}
                >
                  {on && (
                    <motion.span
                      layoutId="filter-pill"
                      className="absolute inset-0 rounded-xl bg-[#dfba73] shadow-sm"
                      transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                    />
                  )}
                  <span className="relative z-10">{f}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Gallery Grid */}
        <motion.ul layout className="mt-12 grid grid-cols-2 gap-3.5 md:grid-cols-3 md:gap-5">
          <AnimatePresence mode="popLayout">
            {items.map((g, i) => (
              <motion.li
                key={g.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.45, ease: [0.22, 0.61, 0.36, 1] }}
                className={i === 0 ? 'col-span-2 md:col-span-1 md:row-span-2' : ''}
              >
                <button
                  onClick={(e) => open(i, e.currentTarget)}
                  aria-label={`Open photo: ${g.caption}`}
                  className="group relative block w-full h-full overflow-hidden rounded-[22px] border border-[#dfba73]/20 bg-[#020b11] text-left shadow-sm hover:border-[#dfba73]/60 hover:shadow-lg transition-all"
                >
                  <img
                    src={g.src}
                    alt={g.alt}
                    loading="lazy"
                    className={`w-full object-cover transition-transform duration-[1200ms] ease-editorial group-hover:scale-[1.07] ${
                      i === 0 ? 'h-full min-h-[300px] md:aspect-[3/4]' : 'aspect-[4/3] md:aspect-[4/3.2]'
                    }`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#020b11]/90 via-[#03121b]/20 to-transparent opacity-85 transition-opacity group-hover:opacity-95" />

                  <div className="absolute inset-x-0 bottom-0 p-4 md:p-5">
                    <span className="inline-block rounded-full bg-[#dfba73]/20 border border-[#dfba73]/30 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#dfba73] backdrop-blur-xs mb-1.5">
                      {g.category}
                    </span>
                    <p className="font-serif text-[17px] md:text-[20px] font-medium leading-snug text-ivory">
                      {g.caption}
                    </p>
                  </div>
                </button>
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {current && (
          <motion.div
            key="lightbox"
            role="dialog"
            aria-modal="true"
            aria-label={`${current.caption} viewer`}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-[#020b11]/95 p-4 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={close}
          >
            <button
              ref={closeRef}
              onClick={(e) => {
                e.stopPropagation();
                close();
              }}
              aria-label="Close viewer"
              className="absolute right-4 top-4 grid h-12 w-12 place-items-center rounded-full bg-ivory/10 text-ivory transition-colors hover:bg-ivory/20 md:right-8 md:top-8"
            >
              <X size={22} />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              aria-label="Previous image"
              className="absolute left-3 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-ivory/10 text-ivory transition-colors hover:bg-ivory/20 md:left-8"
            >
              <ChevronLeft size={24} />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              aria-label="Next image"
              className="absolute right-3 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-ivory/10 text-ivory transition-colors hover:bg-ivory/20 md:right-8"
            >
              <ChevronRight size={24} />
            </button>

            <AnimatePresence mode="wait">
              <motion.figure
                key={current.id}
                initial={{ opacity: 0, y: 12, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4, ease: [0.22, 0.61, 0.36, 1] }}
                className="max-h-full max-w-5xl flex flex-col items-center"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={current.src}
                  alt={current.alt}
                  className="max-h-[75svh] w-auto max-w-full rounded-[20px] object-contain shadow-2xl border border-[#dfba73]/30"
                />
                <figcaption className="mt-4 text-center">
                  <div className="font-serif text-2xl text-ivory">{current.caption}</div>
                  <div className="mt-1 font-sans text-[12px] uppercase tracking-[0.2em] text-[#dfba73]">
                    {current.category} <span className="mx-2 text-ivory/40">•</span> Photo {(active ?? 0) + 1} of {items.length}
                  </div>
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
