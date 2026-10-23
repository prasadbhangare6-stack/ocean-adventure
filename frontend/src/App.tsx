import { lazy, Suspense, useEffect, useState } from 'react';
import { MotionConfig } from 'motion/react';
import { scrollState } from './three/journey';
import { initJourneyScroll } from './lib/scroll';
import { setupReveals } from './lib/reveal';
import { UIProvider } from './lib/ui';
import StaticOcean from './components/StaticOcean';
import Header from './components/Header';
import Footer from './components/Footer';
import { FilmModal, TripModal } from './components/Modals';
import Hero from './sections/Hero';
import Trip from './sections/Trip';
import Experiences from './sections/Experiences';
import Quote from './sections/Quote';
import Host from './sections/Host';
import Instagram from './sections/Instagram';
import Gallery from './sections/Gallery';
import Destinations from './sections/Destinations';
import WhyDive from './sections/WhyDive';
import Testimonials from './sections/Testimonials';
import About from './sections/About';
import Contact from './sections/Contact';

// The 3D world (three.js + R3F) is its own chunk and mounts after first paint.
const UnderwaterScene = lazy(() => import('./three/UnderwaterScene'));

type Caps = { reduced: boolean; mobile: boolean; webgl: boolean; lowPower: boolean };

function detectCapabilities(): Caps {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const coarse = window.matchMedia('(pointer: coarse)').matches;
  const mobile = window.innerWidth < 768 || (coarse && window.innerWidth < 1024);
  let webgl = false;
  try {
    const c = document.createElement('canvas');
    webgl = !!(c.getContext('webgl2') || c.getContext('webgl'));
  } catch {
    webgl = false;
  }
  const lowPower = (navigator.hardwareConcurrency ?? 8) <= 4;
  return { reduced, mobile, webgl, lowPower };
}

export default function App() {
  const [caps] = useState<Caps>(detectCapabilities);

  useEffect(() => {
    scrollState.reduced = caps.reduced;
    scrollState.mobile = caps.mobile;
    const stopJourney = initJourneyScroll();
    const stopReveals = setupReveals(caps.reduced);
    return () => {
      stopReveals();
      stopJourney();
    };
  }, [caps]);

  return (
    <MotionConfig reducedMotion="user">
      <UIProvider reducedMotion={caps.reduced}>
        {/* Background layer: static ocean first, then the real-time 3D journey */}
        {caps.webgl ? (
          <Suspense fallback={<StaticOcean />}>
            <UnderwaterScene fallback={<StaticOcean />} mobile={caps.mobile} lowPower={caps.lowPower} />
          </Suspense>
        ) : (
          <StaticOcean />
        )}
        <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[1] bg-[radial-gradient(120%_90%_at_50%_40%,transparent_55%,rgba(3,18,27,0.45)_100%)]" />

        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[90] focus:rounded-full focus:bg-ivory focus:px-5 focus:py-3 focus:text-navy">
          Skip to content
        </a>
        <Header />
        <main id="main" className="relative z-10">
          <Hero />
          <Trip />
          <Experiences />
          <Quote />
          <Host />
          <Instagram />
          <Gallery />
          <Destinations />
          <WhyDive />
          <Testimonials />
          {/* About section: placed second-to-last, right before Contact */}
          <About />
          {/* Contact section: placed last */}
          <Contact />
        </main>
        <Footer />
        <TripModal />
        <FilmModal />
      </UIProvider>
    </MotionConfig>
  );
}
