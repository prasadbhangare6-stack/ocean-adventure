import type { SVGProps } from 'react';

/** Instagram glyph (lucide-react no longer ships brand icons). */
export function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" strokeWidth={2.5} />
    </svg>
  );
}

/**
 * Animated wave brand mark: An evocative circular emblem featuring dual flowing waves
 * and glistening golden sun ray animation that gently undulates to symbolize ocean tides.
 */
export function LogoMark({ className = 'h-10 w-10' }: { className?: string }) {
  return (
    <div className={`relative inline-flex items-center justify-center shrink-0 ${className}`}>
      <svg viewBox="0 0 44 44" className="w-full h-full overflow-visible" aria-hidden="true">
        <defs>
          <linearGradient id="waveGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0B4B6F" />
            <stop offset="100%" stopColor="#020B11" />
          </linearGradient>
          <linearGradient id="crestGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#dfba73" />
            <stop offset="50%" stopColor="#edd39b" />
            <stop offset="100%" stopColor="#c59b4c" />
          </linearGradient>
        </defs>

        {/* Outer badge circle with subtle gold ring */}
        <circle cx="22" cy="22" r="20" fill="url(#waveGrad)" stroke="#dfba73" strokeWidth="1" strokeOpacity="0.45" />

        {/* Animated wave 1 (primary crest) */}
        <g className="animate-wave-flow">
          <path
            d="M6 24 C 11 20, 16 20, 21 24 C 26 28, 31 28, 38 24"
            fill="none"
            stroke="url(#crestGrad)"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
        </g>

        {/* Animated wave 2 (secondary swell, delayed phase) */}
        <g className="animate-wave-flow-reverse opacity-80">
          <path
            d="M7 29 C 12 26, 17 26, 22 29 C 27 32, 32 32, 37 29"
            fill="none"
            stroke="#28A8D9"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </g>

        {/* Golden sun / Pearl dot */}
        <circle cx="22" cy="14" r="2.6" fill="#dfba73" className="animate-pulse" style={{ animationDuration: '3s' }} />
      </svg>
    </div>
  );
}

export function Wordmark({ dark = false }: { dark?: boolean }) {
  return (
    <div className="flex items-center gap-3.5 group">
      <LogoMark className="h-10 w-10 transition-transform duration-500 group-hover:scale-105" />
      <div className="leading-tight">
        <div className={`font-serif text-[18px] md:text-[20px] font-bold tracking-[0.04em] uppercase transition-colors ${dark ? 'text-ivory group-hover:text-[#dfba73]' : 'text-navy group-hover:text-[#dfba73]'}`}>
          PURVA OCEAN ADVENTURES
        </div>
        <div className={`font-sans text-[9px] font-medium tracking-[0.24em] uppercase ${dark ? 'text-ivory/65' : 'text-navy/60'}`}>
          Expeditions &amp; Mindful Diving
        </div>
      </div>
    </div>
  );
}
