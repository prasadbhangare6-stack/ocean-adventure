import * as THREE from 'three';

/**
 * Shared, mutable scroll/pointer state. Written by the DOM layer (GSAP ScrollTrigger)
 * and read every frame by the R3F scene. Deliberately not React state, so scrolling
 * never triggers React re-renders.
 */
export const scrollState = {
  /** Raw page progress 0..1 */
  progress: 0,
  /** Eased progress used by the camera */
  smooth: 0,
  /** Snapped progress (reduced motion: moves section to section) */
  snap: 0,
  /** Progress value at which each journey key is reached (same order as KEYS) */
  keyT: [] as number[],
  pointer: { x: 0, y: 0 },
  reduced: false,
  mobile: false,
};

export type JourneyKey = {
  /** DOM anchor id; the key is reached when this section is centred in the viewport */
  anchor: string;
  cam: [number, number, number];
  look: [number, number, number];
  top: string;
  horizon: string;
  bottom: string;
  fog: string;
  density: number;
  sun: number;
  ambient: number;
  shafts: number;
  particles: number;
  rim: number;
};

/**
 * Journey order mirrors the DOM order:
 * hero (surface) -> experiences (descending) -> quote (deep) -> trip (breaks surface, Maldives)
 * -> host (calm shallows) -> gallery (mid-blue reef) -> destinations (island rise)
 * -> why (deep navy) -> testimonials -> contact.
 */
export const KEYS: JourneyKey[] = [
  {
    anchor: 'top',
    cam: [0.2, 0.9, 13],
    look: [1.2, 1.6, -6],
    top: '#1c86ad',
    horizon: '#0b5f80',
    bottom: '#052a3d',
    fog: '#0a4d6b',
    density: 0.018,
    sun: 2.2,
    ambient: 1.0,
    shafts: 0.7,
    particles: 1,
    rim: 1.1,
  },
  {
    anchor: 'experiences',
    cam: [-2.2, -2.5, -14],
    look: [-0.4, -4.5, -34],
    top: '#0c5a7c',
    horizon: '#0a4b67',
    bottom: '#02141f',
    fog: '#06405a',
    density: 0.03,
    sun: 1.2,
    ambient: 0.8,
    shafts: 0.5,
    particles: 1,
    rim: 0.9,
  },
  {
    anchor: 'quote',
    cam: [0.6, -9.6, -52],
    look: [0, -9.4, -66],
    top: '#07324b',
    horizon: '#05263a',
    bottom: '#010a10',
    fog: '#03121b',
    density: 0.04,
    sun: 0.35,
    ambient: 0.45,
    shafts: 0.6,
    particles: 0.9,
    rim: 0.9,
  },
  {
    anchor: 'trip',
    cam: [0, 6.9, -86],
    look: [0, 5.2, -122],
    top: '#bdeff6',
    horizon: '#8edceb',
    bottom: '#2bbfd3',
    fog: '#8edceb',
    density: 0.0075,
    sun: 2.4,
    ambient: 1.5,
    shafts: 0,
    particles: 0.3,
    rim: 0.3,
  },
  {
    anchor: 'host',
    cam: [5.5, 6.6, -98],
    look: [-12, 4.6, -140],
    top: '#d7f4f8',
    horizon: '#a6e6ef',
    bottom: '#4bc7d6',
    fog: '#a6e6ef',
    density: 0.0085,
    sun: 2.2,
    ambient: 1.6,
    shafts: 0,
    particles: 0.2,
    rim: 0.2,
  },
  {
    anchor: 'gallery',
    cam: [-1.8, -3.4, -66],
    look: [0.4, -4.5, -100],
    top: '#0d5f83',
    horizon: '#0a4d6b',
    bottom: '#02131d',
    fog: '#063c59',
    density: 0.026,
    sun: 0.9,
    ambient: 0.7,
    shafts: 0.35,
    particles: 0.9,
    rim: 0.7,
  },
  {
    anchor: 'destinations',
    cam: [0, 7.2, -146],
    look: [0, 6.2, -196],
    top: '#d6f6fa',
    horizon: '#9ee0ec',
    bottom: '#34bdd0',
    fog: '#9ee0ec',
    density: 0.0075,
    sun: 2.6,
    ambient: 1.6,
    shafts: 0,
    particles: 0.2,
    rim: 0.2,
  },
  {
    anchor: 'why',
    cam: [2.2, -9, -170],
    look: [0, -10, -204],
    top: '#0b4d69',
    horizon: '#06334a',
    bottom: '#01090e',
    fog: '#03121b',
    density: 0.035,
    sun: 0.3,
    ambient: 0.5,
    shafts: 0.4,
    particles: 0.8,
    rim: 0.8,
  },
  {
    anchor: 'testimonials',
    cam: [-1, -5, -190],
    look: [0, -6, -224],
    top: '#0c5a7c',
    horizon: '#0a4b67',
    bottom: '#02141f',
    fog: '#063c59',
    density: 0.028,
    sun: 0.8,
    ambient: 0.7,
    shafts: 0.3,
    particles: 0.9,
    rim: 0.6,
  },
  {
    anchor: 'contact',
    cam: [0, -3, -212],
    look: [0, -4, -240],
    top: '#0a4a68',
    horizon: '#063a54',
    bottom: '#02101a',
    fog: '#041c2a',
    density: 0.03,
    sun: 0.6,
    ambient: 0.6,
    shafts: 0.3,
    particles: 0.8,
    rim: 0.5,
  },
];

/** Interpolated environment values, read by scene components every frame. */
export const env = {
  cam: new THREE.Vector3(),
  look: new THREE.Vector3(),
  top: new THREE.Color(),
  horizon: new THREE.Color(),
  bottom: new THREE.Color(),
  fog: new THREE.Color(),
  density: 0.02,
  sun: 1,
  ambient: 1,
  shafts: 0.5,
  particles: 1,
  rim: 1,
  /** 0 = underwater, 1 = breaking/above the surface; used by the surface shader */
  aboveWater: 0,
};

const KEY_COLORS = KEYS.map((k) => ({
  top: new THREE.Color(k.top),
  horizon: new THREE.Color(k.horizon),
  bottom: new THREE.Color(k.bottom),
  fog: new THREE.Color(k.fog),
}));

const tmpA = new THREE.Vector3();
const tmpB = new THREE.Vector3();

function smooth(u: number) {
  return u * u * (3 - 2 * u);
}

/** Sample the journey at page progress p, writing into env. `strength` scales camera travel. */
export function sampleJourney(p: number, strength: number) {
  const T = scrollState.keyT;
  const n = KEYS.length;
  if (T.length !== n) return;
  let i = 0;
  while (i < n - 2 && p > T[i + 1]) i++;
  const a = KEYS[i];
  const b = KEYS[Math.min(i + 1, n - 1)];
  const ta = T[i];
  const tb = T[Math.min(i + 1, n - 1)];
  const u = tb > ta ? smooth(THREE.MathUtils.clamp((p - ta) / (tb - ta), 0, 1)) : p >= tb ? 1 : 0;
  const ca = KEY_COLORS[i];
  const cb = KEY_COLORS[Math.min(i + 1, n - 1)];

  tmpA.set(a.cam[0], a.cam[1], a.cam[2]);
  tmpB.set(b.cam[0], b.cam[1], b.cam[2]);
  env.cam.lerpVectors(tmpA, tmpB, u);
  tmpA.set(a.look[0], a.look[1], a.look[2]);
  tmpB.set(b.look[0], b.look[1], b.look[2]);
  env.look.lerpVectors(tmpA, tmpB, u);

  // mobile: shorter camera path, keeps the hero framing
  if (strength !== 1) {
    const hero = KEYS[0].cam;
    env.cam.set(
      hero[0] + (env.cam.x - hero[0]) * strength,
      hero[1] + (env.cam.y - hero[1]) * strength,
      hero[2] + (env.cam.z - hero[2]) * strength,
    );
  }

  env.top.lerpColors(ca.top, cb.top, u);
  env.horizon.lerpColors(ca.horizon, cb.horizon, u);
  env.bottom.lerpColors(ca.bottom, cb.bottom, u);
  env.fog.lerpColors(ca.fog, cb.fog, u);
  env.density = THREE.MathUtils.lerp(a.density, b.density, u);
  env.sun = THREE.MathUtils.lerp(a.sun, b.sun, u);
  env.ambient = THREE.MathUtils.lerp(a.ambient, b.ambient, u);
  env.shafts = THREE.MathUtils.lerp(a.shafts, b.shafts, u);
  env.particles = THREE.MathUtils.lerp(a.particles, b.particles, u);
  env.rim = THREE.MathUtils.lerp(a.rim, b.rim, u);
  // 0 when underwater, 1 in the air above the surface (trip/host/destinations)
  env.aboveWater = THREE.MathUtils.lerp(a.cam[1] > 6 ? 1 : 0, b.cam[1] > 6 ? 1 : 0, u);
}
