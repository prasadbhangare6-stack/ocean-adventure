import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { KEYS, scrollState } from '../three/journey';

gsap.registerPlugin(ScrollTrigger);

/**
 * Maps each journey keyframe to the page progress at which its section sits
 * centred in the viewport. Re-measured on refresh/resize so camera keys always
 * line up with the editorial sections.
 */
export function measureJourney() {
  const vh = window.innerHeight;
  const docH = Math.max(document.documentElement.scrollHeight, vh + 1);
  const range = Math.max(1, docH - vh);
  let prev = -1;
  scrollState.keyT = KEYS.map((k, i) => {
    const el = document.getElementById(k.anchor);
    let t = 0;
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY;
      const centre = top + el.offsetHeight / 2 - vh / 2;
      t = Math.min(1, Math.max(0, centre / range));
    } else if (i > 0) {
      t = prev + 0.02;
    }
    // keep keys strictly increasing so the interpolation never reverses
    t = Math.max(t, prev + 0.0005);
    prev = t;
    return t;
  });
}

/** Wires the whole-page scroll progress to the 3D journey. Returns a cleanup function. */
export function initJourneyScroll(): () => void {
  const trigger = ScrollTrigger.create({
    start: 0,
    end: 'max',
    onUpdate: (self) => {
      scrollState.progress = self.progress;
    },
  });
  const onRefresh = () => measureJourney();
  ScrollTrigger.addEventListener('refresh', onRefresh);
  const onPointer = (e: PointerEvent) => {
    scrollState.pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
    scrollState.pointer.y = (e.clientY / window.innerHeight) * 2 - 1;
  };
  if (!scrollState.reduced && !scrollState.mobile) window.addEventListener('pointermove', onPointer, { passive: true });
  requestAnimationFrame(() => ScrollTrigger.refresh());
  return () => {
    trigger.kill();
    ScrollTrigger.removeEventListener('refresh', onRefresh);
    window.removeEventListener('pointermove', onPointer);
  };
}
