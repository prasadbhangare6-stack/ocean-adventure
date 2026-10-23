import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { INTERESTS } from '../content';

type Interest = (typeof INTERESTS)[number];

type UIContextValue = {
  reducedMotion: boolean;
  interest: Interest;
  setInterest: (i: Interest) => void;
  openTrip: () => void;
  openFilm: () => void;
  requestInquiry: (interest?: Interest) => void;
  goTo: (id: string) => void;
  tripOpen: boolean;
  filmOpen: boolean;
  closeTrip: () => void;
  closeFilm: () => void;
};

const UIContext = createContext<UIContextValue | null>(null);

export function UIProvider({ children, reducedMotion }: { children: ReactNode; reducedMotion: boolean }) {
  const [interest, setInterest] = useState<Interest>(INTERESTS[0]);
  const [tripOpen, setTripOpen] = useState(false);
  const [filmOpen, setFilmOpen] = useState(false);

  const goTo = useCallback(
    (id: string) => {
      const aliasMap: Record<string, string> = {
        top: 'home',
        trip: 'featured',
      };
      const targetId = aliasMap[id] || id;
      const el = document.getElementById(targetId) || document.getElementById(id);
      if (!el) return;
      el.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' });
    },
    [reducedMotion],
  );

  const requestInquiry = useCallback(
    (i?: Interest) => {
      if (i) setInterest(i);
      setTripOpen(false);
      setFilmOpen(false);
      // Give a closing modal a moment before scrolling.
      window.setTimeout(() => goTo('contact'), 60);
    },
    [goTo],
  );

  const value = useMemo<UIContextValue>(
    () => ({
      reducedMotion,
      interest,
      setInterest,
      openTrip: () => setTripOpen(true),
      openFilm: () => setFilmOpen(true),
      requestInquiry,
      goTo,
      tripOpen,
      filmOpen,
      closeTrip: () => setTripOpen(false),
      closeFilm: () => setFilmOpen(false),
    }),
    [reducedMotion, interest, requestInquiry, goTo, tripOpen, filmOpen],
  );

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}

export function useUI() {
  const ctx = useContext(UIContext);
  if (!ctx) throw new Error('useUI must be used inside UIProvider');
  return ctx;
}
