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
      <div className="panel-ivory mx-auto max-w-[1100px] rounded-[32px] px-6 py-14 text-center text-navy md:px-16 md:py-20">
        <p data-reveal className="eyebrow text-cyan">Testimonials</p>
        <h2 id="testimonials-title" className="sr-only">
          Guest testimonials
        </h2>

        <div aria-live="polite" className="relative mx-auto mt-8 min-h-[260px] max-w-3xl">
          <AnimatePresence mode="wait">
            <motion.figure
              key={index}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.55, ease: [0.22, 0.61, 0.36, 1] }}
            >
              <Quote size={34} className="mx-auto text-seaglass" strokeWidth={1.3} aria-hidden="true" />
              <blockquote className="mt-6 font-serif text-[clamp(1.7rem,3.2vw,2.5rem)] italic leading-[1.3]">&ldquo;{t.quote}&rdquo;</blockquote>
              <figcaption className="mt-8 flex flex-col items-center gap-3">
                <span className="grid h-12 w-12 place-items-center rounded-full bg-navy font-serif text-xl text-ivory" aria-hidden="true">
                  {t.initial}
                </span>
                <span className="font-sans text-[13px] font-semibold uppercase tracking-[0.18em] text-navy/75">{t.author}</span>
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>

        <div className="mt-10 flex items-center justify-center gap-6">
          <button onClick={() => go(-1)} aria-label="Previous testimonial" className="grid h-12 w-12 place-items-center rounded-full border border-navy/25 transition-all hover:border-navy hover:bg-navy hover:text-ivory">
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
                className={`h-2 rounded-full transition-all duration-500 ${i === index ? 'w-8 bg-navy' : 'w-2 bg-navy/30 hover:bg-navy/60'}`}
              />
            ))}
          </div>
          <button onClick={() => go(1)} aria-label="Next testimonial" className="grid h-12 w-12 place-items-center rounded-full border border-navy/25 transition-all hover:border-navy hover:bg-navy hover:text-ivory">
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}
