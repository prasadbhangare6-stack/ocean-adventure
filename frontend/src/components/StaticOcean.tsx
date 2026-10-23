/** Attractive static fallback shown while the 3D scene loads, or when WebGL is unavailable. */
export default function StaticOcean() {
  return (
    <div aria-hidden="true" className="ocean-fallback fixed inset-0 z-0 overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-[38%] bg-gradient-to-b from-seaglass/50 to-transparent opacity-70" />
      <div className="absolute left-[62%] top-[18%] h-[52%] w-[14%] rotate-[18deg] rounded-full bg-gradient-to-b from-seaglass/25 to-transparent blur-xl" />
      <div className="absolute left-[30%] top-[25%] h-[40%] w-[10%] rotate-[10deg] rounded-full bg-gradient-to-b from-seaglass/20 to-transparent blur-xl" />
      <svg className="absolute bottom-[18%] left-[12%] w-[62%] opacity-25" viewBox="0 0 800 300" fill="none">
        <path d="M20 180 C 200 80, 360 240, 520 150 S 740 90, 800 130" stroke="#8edceb" strokeWidth="2" />
        <path d="M0 230 C 180 150, 340 290, 520 210 S 740 160, 820 200" stroke="#28a8d9" strokeWidth="1.5" />
      </svg>
    </div>
  );
}
