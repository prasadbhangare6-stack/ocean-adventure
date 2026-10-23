import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const EASE = 'power3.out';

/**
 * Editorial scroll reveals, image parallax and the hero's scrubbed exit.
 * Everything is skipped under reduced motion so content is simply visible.
 */
export function setupReveals(reduced: boolean): () => void {
  const ctx = gsap.context(() => {
    if (reduced) return;

    gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {
      gsap.fromTo(
        el,
        { y: 44, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.1,
          ease: EASE,
          clearProps: 'transform',
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        },
      );
    });

    gsap.utils.toArray<HTMLElement>('[data-stagger]').forEach((group) => {
      gsap.fromTo(
        Array.from(group.children),
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: EASE,
          stagger: 0.12,
          clearProps: 'transform',
          scrollTrigger: { trigger: group, start: 'top 86%', once: true },
        },
      );
    });

    // Subtle depth on images: they drift slightly against the scroll.
    gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach((el) => {
      gsap.fromTo(
        el,
        { yPercent: -5 },
        {
          yPercent: 5,
          ease: 'none',
          scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true },
        },
      );
    });

    // Hero copy recedes as the visitor begins the descent (scrubbed).
    gsap.to('#hero-copy', {
      y: -120,
      opacity: 0,
      ease: 'none',
      scrollTrigger: { trigger: '#top', start: 'top top', end: 'bottom 45%', scrub: true },
    });
  });
  ScrollTrigger.refresh();
  return () => ctx.revert();
}
