import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { TESTIMONIALS } from '../content';

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const total = TESTIMONIALS.length;
  const t = TESTIMONIALS[index];
  const go = (d: number) => setIndex((i) => (i + d + total) % total);

  return (
    <section id="testimonials" className="section py-24 md:py-32" aria-labelledby="testimonials-title">
      <div className="gold-panel mx-auto max-w-[1100px] rounded-[32px] p-8 md:p-16 lg:p-20 text-center text-ivory border border-[#dfba73]/30">
        <span data-reveal className="eyebrow-gold">Guest Words</span>
        <h2 id="testimonials-title" className="sr-only">
          Guest testimonials
        </h2>

        <div aria-live="polite" className="relative mx-auto mt-8 min-h-[240px] max-w-3xl">
          <AnimatePresence mode="wait">
            <motion.figure
              key={index}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.55, ease: [0.22, 0.61, 0.36, 1] }}
            >
              <Quote size={34} className="mx-auto text-[#dfba73]" strokeWidth={1.3} aria-hidden="true" />
              <blockquote className="mt-6 font-serif text-[clamp(1.7rem,3.2vw,2.5rem)] italic leading-[1.3] text-ivory">&ldquo;{t.quote}&rdquo;</blockquote>
              <figcaption className="mt-8 flex flex-col items-center gap-3">
                <span className="grid h-12 w-12 place-items-center rounded-full bg-[#dfba73] font-serif text-xl font-bold text-[#03121b]" aria-hidden="true">
                  {t.initial}
                </span>
                <span className="font-sans text-[13px] font-semibold uppercase tracking-[0.18em] text-[#dfba73]">{t.author}</span>
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>

        <div className="mt-8 flex items-center justify-center gap-6">
          <button onClick={() => go(-1)} aria-label="Previous testimonial" className="grid h-12 w-12 place-items-center rounded-full border border-ivory/20 text-ivory transition-all hover:border-[#dfba73] hover:bg-[#dfba73]/15 hover:text-[#dfba73]">
            <ChevronLeft size={20} />
          </button>
          <div role="tablist" aria-label="Choose testimonial" className="flex items-center gap-2">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                role="tab"
                aria-selected={i === index}
                aria-label={`Testimonial ${i + 1} of ${total}`}
                onClick={() => setIndex(i)}
                className={`h-2 rounded-full transition-all duration-500 ${i === index ? 'w-8 bg-[#dfba73]' : 'w-2 bg-ivory/30 hover:bg-ivory/60'}`}
              />
            ))}
          </div>
          <button onClick={() => go(1)} aria-label="Next testimonial" className="grid h-12 w-12 place-items-center rounded-full border border-ivory/20 text-ivory transition-all hover:border-[#dfba73] hover:bg-[#dfba73]/15 hover:text-[#dfba73]">
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}
