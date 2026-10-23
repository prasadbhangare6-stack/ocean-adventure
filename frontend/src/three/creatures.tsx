import { useEffect, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import type { Group, InstancedMesh, Mesh } from 'three';
import { ballGeo, ensureOutward, limbGeo, mergeAll, planeZY, rng } from './geometry';

/* ------------------------------------------------------------------ */
/* Whale shark                                                         */
/* ------------------------------------------------------------------ */

const SHARK_L = 9;
const SHARK_R = 1.1;

function sharkRadius(a: number) {
  if (a > 0.78) {
    const k = (a - 0.78) / 0.22;
    return SHARK_R * Math.sqrt(Math.max(0, 1 - k * k));
  }
  return SHARK_R * (0.13 + 0.87 * THREE.MathUtils.smoothstep(a, 0, 0.5));
}

function sharkPoint(a: number, v: number, out = new THREE.Vector3()) {
  const w = sharkRadius(a);
  const c = Math.cos(v);
  const s = Math.sin(v);
  const x = w * Math.sign(c) * Math.pow(Math.abs(c), 0.85);
  const y = w * 0.72 * Math.sign(s) * Math.pow(Math.abs(s), 0.85);
  return out.set(x, y, (a - 0.5) * SHARK_L);
}

/** Swim-wave offset. Stronger toward the tail (negative z). */
function sharkBend(z: number, t: number) {
  const weight = Math.pow(Math.max(0, Math.min(1, 0.5 - z / SHARK_L)), 1.6);
  return 0.85 * weight * Math.sin(t * 1.5 - z * 0.55);
}

function buildSharkBody() {
  const SA = 90;
  const SV = 36;
  const positions: number[] = [];
  const colors: number[] = [];
  const indices: number[] = [];
  const p = new THREE.Vector3();
  const dark = new THREE.Color('#24455a');
  const mid = new THREE.Color('#4f7d8e');
  const pale = new THREE.Color('#ecf6f1');
  const c = new THREE.Color();
  for (let i = 0; i <= SA; i++) {
    const a = i / SA;
    for (let j = 0; j <= SV; j++) {
      const v = (j / SV) * Math.PI * 2;
      sharkPoint(a, v, p);
      positions.push(p.x, p.y, p.z);
      // back is dark blue-grey, flank lighter, belly pale
      const ny = p.y / Math.max(0.001, sharkRadius(a) * 0.72);
      c.copy(dark).lerp(mid, THREE.MathUtils.smoothstep(ny, -0.2, 0.5));
      c.lerp(pale, THREE.MathUtils.smoothstep(-ny, 0.25, 0.75));
      colors.push(c.r, c.g, c.b);
    }
  }
  for (let i = 0; i < SA; i++) {
    for (let j = 0; j < SV; j++) {
      const a = i * (SV + 1) + j;
      const b = a + SV + 1;
      indices.push(a, a + 1, b, a + 1, b + 1, b);
    }
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  g.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
  g.setIndex(indices);
  ensureOutward(g);
  return g;
}

function buildCaudal() {
  const s = new THREE.Shape();
  s.moveTo(0.1, 0.0);
  s.quadraticCurveTo(-0.6, 0.25, -1.1, 0.8);
  s.quadraticCurveTo(-1.5, 1.4, -1.9, 1.7);
  s.quadraticCurveTo(-1.8, 0.6, -1.6, 0.2);
  s.quadraticCurveTo(-1.5, -0.3, -1.4, -0.85);
  s.quadraticCurveTo(-0.9, -0.45, -0.4, -0.25);
  s.quadraticCurveTo(-0.1, -0.1, 0.1, 0.0);
  return planeZY(new THREE.ShapeGeometry(s, 8), 0, 0);
}

function buildDorsal() {
  const s = new THREE.Shape();
  s.moveTo(0.95, 0);
  s.quadraticCurveTo(0.3, 0.7, -0.7, 1.05);
  s.quadraticCurveTo(-0.45, 0.45, -0.95, 0);
  s.lineTo(0.95, 0);
  return planeZY(new THREE.ShapeGeometry(s, 6), 1.4, 0.55);
}

function buildSharkSpots(count: number, seed: number) {
  const r = rng(seed);
  const out: { a: number; v: number; n: THREE.Vector3; scale: THREE.Vector3; q: THREE.Quaternion }[] = [];
  const p = new THREE.Vector3();
  const n = new THREE.Vector3();
  const zAxis = new THREE.Vector3(0, 0, 1);
  for (let i = 0; i < count; i++) {
    const a = 0.1 + r() * 0.72;
    const v = THREE.MathUtils.lerp(Math.PI * 0.28, Math.PI * 0.72, r());
    sharkPoint(a, v, p);
    const w = Math.max(0.01, sharkRadius(a));
    n.set(p.x / w, (p.y / (w * 0.72)) * 0.9, 0).normalize();
    const q = new THREE.Quaternion().setFromUnitVectors(zAxis, n);
    const sc = new THREE.Vector3(0.05 + r() * 0.05, 0.05 + r() * 0.05, 0.012);
    out.push({ a, v, n: n.clone(), scale: sc, q });
  }
  return out;
}

/** Whale shark: procedural body with bending swim wave, spots and fins. Nose faces +Z. */
export function WhaleShark({ radius = 1 }: { radius?: number }) {
  const bodyRef = useRef<Mesh>(null);
  const tailRef = useRef<Group>(null);
  const spotsRef = useRef<InstancedMesh>(null);
  const root = useRef<Group>(null);

  const body = useMemo(() => buildSharkBody(), []);
  const basePos = useMemo(() => Float32Array.from(body.getAttribute('position').array), [body]);
  const caudal = useMemo(() => buildCaudal(), []);
  const dorsal = useMemo(() => buildDorsal(), []);
  const pect = useMemo(() => {
    const g = new THREE.SphereGeometry(1, 16, 10);
    g.scale(0.95, 0.07, 0.34);
    return g;
  }, []);
  const spots = useMemo(() => buildSharkSpots(340, 7), []);
  const spotGeo = useMemo(() => new THREE.SphereGeometry(1, 6, 4), []);

  const mats = useMemo(
    () => ({
      body: new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.48, metalness: 0.0, side: THREE.DoubleSide }),
      fin: new THREE.MeshStandardMaterial({ color: '#2c4d5f', roughness: 0.5, side: THREE.DoubleSide }),
      spot: new THREE.MeshStandardMaterial({ color: '#f0f7f4', roughness: 0.4 }),
    }),
    [],
  );

  useEffect(() => {
    return () => {
      body.dispose();
      caudal.dispose();
      dorsal.dispose();
      pect.dispose();
      spotGeo.dispose();
      Object.values(mats).forEach((m) => m.dispose());
    };
  }, [body, caudal, dorsal, pect, spotGeo, mats]);

  const tmpM = useMemo(() => new THREE.Matrix4(), []);
  const tmpP = useMemo(() => new THREE.Vector3(), []);

  // Assign spot instance matrices once; they are re-posed each frame with the body wave.
  useEffect(() => {
    const im = spotsRef.current;
    if (!im) return;
    spots.forEach((s, i) => {
      tmpP.copy(sharkPoint(s.a, s.v)).addScaledVector(s.n, 0.02);
      tmpM.compose(tmpP, s.q, s.scale);
      im.setMatrixAt(i, tmpM);
    });
    im.instanceMatrix.needsUpdate = true;
  }, [spots, tmpM, tmpP]);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    // subtle body wave
    const bodyGeo = bodyRef.current?.geometry as THREE.BufferGeometry | undefined;
    if (bodyGeo) {
      const pos = bodyGeo.getAttribute('position') as THREE.BufferAttribute;
      const arr = pos.array as Float32Array;
      for (let i = 0; i < arr.length; i += 3) {
        const z = basePos[i + 2];
        arr[i] = basePos[i] + sharkBend(z, t);
      }
      pos.needsUpdate = true;
      bodyGeo.computeVertexNormals();
    }
    if (tailRef.current) {
      const zt = -SHARK_L / 2 + 0.05;
      tailRef.current.position.x = sharkBend(zt, t);
      tailRef.current.rotation.y = Math.sin(t * 1.5 - zt * 0.55) * 0.12;
    }
    const im = spotsRef.current;
    if (im) {
      spots.forEach((s, i) => {
        tmpP.copy(sharkPoint(s.a, s.v)).addScaledVector(s.n, 0.02);
        tmpP.x += sharkBend(tmpP.z, t);
        tmpM.compose(tmpP, s.q, s.scale);
        im.setMatrixAt(i, tmpM);
      });
      im.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <group ref={root} scale={radius}>
      <mesh ref={bodyRef} geometry={body} material={mats.body} />
      <group ref={tailRef} position={[0, 0, -SHARK_L / 2 + 0.05]}>
        <mesh geometry={caudal} material={mats.fin} />
      </group>
      <mesh geometry={dorsal} material={mats.fin} />
      <mesh geometry={pect} material={mats.fin} position={[0.85, -0.5, 2.0]} rotation={[0, 0, -0.45]} />
      <mesh geometry={pect} material={mats.fin} position={[-0.85, -0.5, 2.0]} rotation={[0, 0, 0.45]} />
      <instancedMesh ref={spotsRef} args={[spotGeo, mats.spot, spots.length]} frustumCulled={false} />
    </group>
  );
}

/* ------------------------------------------------------------------ */
/* Scuba diver                                                         */
/* ------------------------------------------------------------------ */

type DiverProps = {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  suit?: string;
  accent?: string;
  pulse?: number;
};

/** Diver in a horizontal swimming pose; forward is +X. */
export function Diver({ position = [0, 0, 0], rotation = [0, 0, 0], scale = 1, suit = '#14232e', accent = '#1e6f8f', pulse = 0 }: DiverProps) {
  const legL = useRef<Group>(null);
  const legR = useRef<Group>(null);
  const armL = useRef<Group>(null);
  const armR = useRef<Group>(null);
  const bob = useRef<Group>(null);

  const mats = useMemo(
    () => ({
      suit: new THREE.MeshStandardMaterial({ color: suit, roughness: 0.6, metalness: 0.0 }),
      vest: new THREE.MeshStandardMaterial({ color: accent, roughness: 0.55 }),
      tank: new THREE.MeshStandardMaterial({ color: '#b9c8cf', roughness: 0.3, metalness: 0.65 }),
      glass: new THREE.MeshStandardMaterial({ color: '#0a1a24', roughness: 0.06, metalness: 0.5, transparent: true, opacity: 0.92 }),
      skin: new THREE.MeshStandardMaterial({ color: '#b98a6a', roughness: 0.7 }),
      fin: new THREE.MeshStandardMaterial({ color: '#0d1b24', roughness: 0.4, side: THREE.DoubleSide }),
      hose: new THREE.MeshStandardMaterial({ color: '#1d2a30', roughness: 0.7 }),
    }),
    [suit, accent],
  );

  const geo = useMemo(() => {
    const V = (x: number, y: number, z: number) => new THREE.Vector3(x, y, z);
    const torso = new THREE.CapsuleGeometry(0.19, 0.5, 6, 12);
    torso.rotateZ(Math.PI / 2);
    torso.translate(0.08, 0, 0);
    const vest = new THREE.CapsuleGeometry(0.23, 0.36, 6, 12);
    vest.rotateZ(Math.PI / 2);
    vest.scale(1, 0.9, 1.25);
    vest.translate(0.1, 0.03, 0);
    const neck = limbGeo(V(0.36, 0.02, 0), V(0.44, 0.04, 0), 0.07, 0.08, 8);
    const hood = ballGeo(V(0.5, 0.05, 0), 0.165, 1, 0.95, 1, 14);
    const mask = ballGeo(V(0.63, 0.07, 0), 0.1, 0.6, 0.9, 1.5, 10);
    const tank = new THREE.CylinderGeometry(0.11, 0.11, 0.78, 12);
    tank.rotateZ(Math.PI / 2);
    tank.translate(-0.02, 0.27, 0);
    const valve = limbGeo(V(-0.4, 0.26, 0), V(-0.4, 0.34, 0), 0.03, 0.03, 6);
    const hoseMouth = limbGeo(V(0.25, 0.23, 0), V(0.56, 0.03, 0.03), 0.018, 0.018, 5);
    const hoseChest = limbGeo(V(0.12, 0.15, 0.09), V(0.46, 0.0, 0.1), 0.014, 0.014, 5);
    const bcdStrap = limbGeo(V(0.02, 0.2, 0.2), V(0.18, -0.12, 0.2), 0.02, 0.02, 5);
    const bcdStrap2 = limbGeo(V(0.02, 0.2, -0.2), V(0.18, -0.12, -0.2), 0.02, 0.02, 5);

    // legs and arms in local pivot space (pivot at origin)
    const thigh = limbGeo(V(0, 0, 0), V(-0.42, -0.01, 0), 0.1, 0.09, 9);
    const shin = limbGeo(V(-0.42, -0.01, 0), V(-0.82, 0.02, 0), 0.085, 0.07, 9);
    const legBall = ballGeo(V(-0.42, -0.01, 0), 0.095, 1, 1, 1, 8);
    const foot = ballGeo(V(-0.84, 0.02, 0), 0.07, 1.2, 0.8, 0.9, 8);
    const fin = ballGeo(V(-1.1, 0.03, 0), 0.2, 1.1, 0.07, 0.8, 12);
    const upper = limbGeo(V(0, 0, 0), V(0.24, -0.03, 0), 0.065, 0.06, 8);
    const fore = limbGeo(V(0.24, -0.03, 0), V(0.48, 0.0, 0.02), 0.055, 0.05, 8);
    const glove = ballGeo(V(0.5, 0.0, 0.02), 0.07, 1, 0.9, 1, 8);
    const shoulder = ballGeo(V(0, 0, 0), 0.07, 1, 1, 1, 8);
    return {
      torso: mergeAll([torso]),
      vest: mergeAll([vest, bcdStrap, bcdStrap2]),
      neck,
      hood,
      mask,
      tank,
      valve,
      hose: mergeAll([hoseMouth, hoseChest]),
      thigh,
      shin,
      legBall,
      foot,
      fin,
      arm: mergeAll([upper, fore, glove, shoulder]),
    };
  }, []);

  useEffect(() => {
    return () => {
      Object.values(geo).forEach((g) => g.dispose());
      Object.values(mats).forEach((m) => m.dispose());
    };
  }, [geo, mats]);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime + pulse;
    if (legL.current) legL.current.rotation.z = Math.sin(t * 2.4) * 0.32;
    if (legR.current) legR.current.rotation.z = Math.sin(t * 2.4 + Math.PI) * 0.32;
    if (armL.current) armL.current.rotation.z = Math.sin(t * 1.2) * 0.05;
    if (armR.current) armR.current.rotation.z = -Math.sin(t * 1.2) * 0.05;
    if (bob.current) bob.current.position.y = Math.sin(t * 0.9) * 0.05;
  });

  return (
    <group position={position} rotation={rotation} scale={scale}>
      <group ref={bob}>
        <mesh geometry={geo.torso} material={mats.suit} />
        <mesh geometry={geo.vest} material={mats.vest} />
        <mesh geometry={geo.neck} material={mats.suit} />
        <mesh geometry={geo.hood} material={mats.suit} />
        <mesh geometry={geo.mask} material={mats.glass} />
        <mesh geometry={geo.tank} material={mats.tank} />
        <mesh geometry={geo.valve} material={mats.tank} />
        <mesh geometry={geo.hose} material={mats.hose} />
        {/* arms */}
        <group ref={armL} position={[0.3, 0.0, 0.27]}>
          <mesh geometry={geo.arm} material={mats.suit} />
        </group>
        <group ref={armR} position={[0.3, 0.0, -0.27]}>
          <mesh geometry={geo.arm} material={mats.suit} />
        </group>
        {/* legs */}
        <group ref={legL} position={[-0.12, -0.02, 0.12]}>
          <mesh geometry={geo.thigh} material={mats.suit} />
          <mesh geometry={geo.shin} material={mats.suit} />
          <mesh geometry={geo.legBall} material={mats.suit} />
          <mesh geometry={geo.foot} material={mats.suit} />
          <mesh geometry={geo.fin} material={mats.fin} />
        </group>
        <group ref={legR} position={[-0.12, -0.02, -0.12]}>
          <mesh geometry={geo.thigh} material={mats.suit} />
          <mesh geometry={geo.shin} material={mats.suit} />
          <mesh geometry={geo.legBall} material={mats.suit} />
          <mesh geometry={geo.foot} material={mats.suit} />
          <mesh geometry={geo.fin} material={mats.fin} />
        </group>
      </group>
    </group>
  );
}

/* ------------------------------------------------------------------ */
/* Bubbles                                                             */
/* ------------------------------------------------------------------ */

export function Bubbles({ origin, count = 26 }: { origin: [number, number, number]; count?: number }) {
  const ref = useRef<InstancedMesh>(null);
  const geo = useMemo(() => new THREE.SphereGeometry(1, 8, 6), []);
  const mat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: '#cdf3ff', transparent: true, opacity: 0.45, roughness: 0.05, metalness: 0.1 }),
    [],
  );
  const m = useMemo(() => new THREE.Matrix4(), []);
  const seeds = useMemo(() => Array.from({ length: count }, (_, i) => ({ s: (i * 0.618) % 1, x: Math.sin(i * 12.9) * 0.25, z: Math.cos(i * 7.3) * 0.25 })), [count]);
  useEffect(() => () => {
    geo.dispose();
    mat.dispose();
  }, [geo, mat]);
  useFrame(({ clock }) => {
    const im = ref.current;
    if (!im) return;
    const t = clock.elapsedTime;
    seeds.forEach((b, i) => {
      const life = (t * 0.22 + b.s) % 1;
      const size = 0.03 + life * 0.05;
      m.makeScale(size, size, size);
      m.setPosition(origin[0] + b.x + Math.sin(t + i) * 0.08 * life, origin[1] + life * 7, origin[2] + b.z);
      im.setMatrixAt(i, m);
    });
    im.instanceMatrix.needsUpdate = true;
  });
  return <instancedMesh ref={ref} args={[geo, mat, count]} frustumCulled={false} />;
}

/* ------------------------------------------------------------------ */
/* Schools of fish                                                     */
/* ------------------------------------------------------------------ */

function fishGeo() {
  const body = new THREE.SphereGeometry(1, 10, 8);
  body.scale(0.11, 0.13, 0.36);
  const tail = new THREE.ConeGeometry(0.13, 0.3, 5);
  tail.rotateX(-Math.PI / 2);
  tail.translate(0, 0, -0.42);
  return mergeAll([body, tail]);
}

type SchoolProps = {
  center: [number, number, number];
  radius: number;
  count: number;
  speed?: number;
  color?: string;
  seed?: number;
  tilt?: number;
};

/** A cohesive school: fish follow an orbit with individual offsets; heading comes from motion. */
export function FishSchool({ center, radius, count, speed = 0.35, color = '#9fb8c4', seed = 1, tilt = 0.4 }: SchoolProps) {
  const ref = useRef<InstancedMesh>(null);
  const geo = useMemo(() => fishGeo(), []);
  const mat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#ffffff', roughness: 0.4, metalness: 0.1 }), []);
  const data = useMemo(() => {
    const r = rng(seed * 991);
    return Array.from({ length: count }, (_, i) => ({
      a: i * 2.399,
      r: radius * (0.35 + r() * 0.65),
      dy: (r() - 0.5) * 2.2,
      ph: r() * 6.28,
    }));
  }, [count, radius, seed]);
  const c = useMemo(() => new THREE.Color(color), [color]);
  const tmpC = useMemo(() => new THREE.Color(), []);

  useEffect(() => {
    const im = ref.current;
    if (!im) return;
    const r = rng(seed * 37);
    for (let i = 0; i < count; i++) {
      tmpC.copy(c).offsetHSL((r() - 0.5) * 0.02, 0, (r() - 0.5) * 0.12);
      im.setColorAt(i, tmpC);
    }
    if (im.instanceColor) im.instanceColor.needsUpdate = true;
  }, [c, count, seed, tmpC]);

  useEffect(() => () => {
    geo.dispose();
    mat.dispose();
  }, [geo, mat]);

  const m = useMemo(() => new THREE.Matrix4(), []);
  const q = useMemo(() => new THREE.Quaternion(), []);
  const s = useMemo(() => new THREE.Vector3(1, 1, 1), []);
  const p0 = useMemo(() => new THREE.Vector3(), []);
  const p1 = useMemo(() => new THREE.Vector3(), []);
  const dir = useMemo(() => new THREE.Vector3(), []);
  const z = useMemo(() => new THREE.Vector3(0, 0, 1), []);

  const pos = (t: number, d: (typeof data)[number], out: THREE.Vector3) => {
    const T = t * speed;
    const cx = center[0] + Math.cos(T * 0.6) * 1.5;
    const cy = center[1] + Math.sin(T * 0.4) * 0.6;
    const cz = center[2] + Math.sin(T * 0.6) * 1.5;
    const ang = d.a + T;
    return out.set(
      cx + Math.cos(ang) * d.r,
      cy + d.dy + Math.sin(T * 1.6 + d.ph) * 0.12 + Math.sin(ang * 0.5) * tilt,
      cz + Math.sin(ang) * d.r * 0.55,
    );
  };

  useFrame(({ clock }) => {
    const im = ref.current;
    if (!im) return;
    const t = clock.elapsedTime;
    data.forEach((d, i) => {
      pos(t, d, p0);
      pos(t + 0.05, d, p1);
      dir.subVectors(p1, p0).normalize();
      q.setFromUnitVectors(z, dir);
      m.compose(p0, q, s);
      im.setMatrixAt(i, m);
    });
    im.instanceMatrix.needsUpdate = true;
  });

  return <instancedMesh ref={ref} args={[geo, mat, count]} frustumCulled={false} />;
}

/* ------------------------------------------------------------------ */
/* Sea turtle                                                          */
/* ------------------------------------------------------------------ */

export function SeaTurtle({ path, phase = 0, scale = 1, speed = 0.12 }: { path: [number, number, number, number, number]; phase?: number; scale?: number; speed?: number }) {
  // path: [cx, cy, cz, rx, rz] ellipse in XZ
  const root = useRef<Group>(null);
  const fl = useRef<Group>(null);
  const fr = useRef<Group>(null);
  const bl = useRef<Group>(null);
  const br = useRef<Group>(null);
  const mats = useMemo(
    () => ({
      shell: new THREE.MeshStandardMaterial({ color: '#4d5e3a', roughness: 0.55 }),
      skin: new THREE.MeshStandardMaterial({ color: '#8d9a6a', roughness: 0.6 }),
      belly: new THREE.MeshStandardMaterial({ color: '#c9c49a', roughness: 0.6 }),
    }),
    [],
  );
  const geo = useMemo(() => {
    const shell = new THREE.SphereGeometry(0.6, 22, 14);
    shell.scale(1.05, 0.32, 0.86);
    const head = new THREE.SphereGeometry(0.2, 12, 8);
    head.scale(1.1, 0.75, 0.9);
    head.translate(0.78, 0.0, 0);
    const flip = new THREE.SphereGeometry(0.4, 10, 6);
    flip.scale(0.9, 0.08, 0.32);
    flip.translate(0.4, 0, 0);
    const bflip = new THREE.SphereGeometry(0.3, 10, 6);
    bflip.scale(0.7, 0.07, 0.25);
    bflip.translate(-0.3, 0, 0);
    return { shell, head, flip, bflip };
  }, []);
  useEffect(() => () => {
    Object.values(geo).forEach((g) => g.dispose());
    Object.values(mats).forEach((m) => m.dispose());
  }, [geo, mats]);

  const p = useMemo(() => new THREE.Vector3(), []);
  const p2 = useMemo(() => new THREE.Vector3(), []);
  const q = useMemo(() => new THREE.Quaternion(), []);
  const fwd = useMemo(() => new THREE.Vector3(1, 0, 0), []);
  const ang = (t: number) => t * speed + phase;
  const at = (t: number, out: THREE.Vector3) => {
    const a = ang(t);
    return out.set(path[0] + Math.cos(a) * path[3], path[1] + Math.sin(a * 2) * 0.3, path[2] + Math.sin(a) * path[4]);
  };
  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (!root.current) return;
    at(t, p);
    at(t + 0.1, p2);
    const dir = p2.sub(p).normalize();
    q.setFromUnitVectors(fwd, dir);
    root.current.position.copy(p);
    root.current.quaternion.copy(q);
    const flap = Math.sin(t * 1.3 + phase);
    if (fl.current) fl.current.rotation.z = flap * 0.45;
    if (fr.current) fr.current.rotation.z = -flap * 0.45;
    if (bl.current) bl.current.rotation.z = -Math.sin(t * 1.3 + phase + 1) * 0.2;
    if (br.current) br.current.rotation.z = Math.sin(t * 1.3 + phase + 1) * 0.2;
  });

  return (
    <group ref={root} scale={scale}>
      <mesh geometry={geo.shell} material={mats.shell} />
      <mesh geometry={geo.head} material={mats.skin} />
      <group ref={fl} position={[0.25, 0.02, 0.42]}>
        <mesh geometry={geo.flip} material={mats.skin} />
      </group>
      <group ref={fr} position={[0.25, 0.02, -0.42]}>
        <mesh geometry={geo.flip} material={mats.skin} />
      </group>
      <group ref={bl} position={[-0.3, 0.0, 0.35]}>
        <mesh geometry={geo.bflip} material={mats.skin} />
      </group>
      <group ref={br} position={[-0.3, 0.0, -0.35]}>
        <mesh geometry={geo.bflip} material={mats.skin} />
      </group>
    </group>
  );
}

/* ------------------------------------------------------------------ */
/* Manta ray                                                           */
/* ------------------------------------------------------------------ */

function rayWingGeo() {
  const s = new THREE.Shape();
  s.moveTo(0, 1.25);
  s.quadraticCurveTo(1.5, 1.05, 2.3, 0.1);
  s.quadraticCurveTo(1.7, -0.8, 0.55, -1.05);
  s.lineTo(0, -0.7);
  s.lineTo(-0.55, -1.05);
  s.quadraticCurveTo(-1.7, -0.8, -2.3, 0.1);
  s.quadraticCurveTo(-1.5, 1.05, 0, 1.25);
  const g = new THREE.ShapeGeometry(s, 20);
  // remap: shape x (span) -> z, shape y (chord) -> x ; forward is +X
  const p = g.getAttribute('position');
  for (let i = 0; i < p.count; i++) {
    const sx = p.getX(i);
    const sy = p.getY(i);
    p.setXYZ(i, sy, 0, sx);
  }
  g.computeVertexNormals();
  return g;
}

export function MantaRay({ path, phase = 0, scale = 1, speed = 0.08 }: { path: [number, number, number, number, number]; phase?: number; scale?: number; speed?: number }) {
  const root = useRef<Group>(null);
  const wing = useRef<Mesh>(null);
  const geo = useMemo(() => rayWingGeo(), []);
  const base = useMemo(() => Float32Array.from(geo.getAttribute('position').array), [geo]);
  const tail = useMemo(() => {
    const c = new THREE.CylinderGeometry(0.05, 0.01, 3.2, 6);
    c.rotateZ(Math.PI / 2);
    c.translate(-2.4, -0.05, 0);
    return c;
  }, []);
  const mat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#3d6373', roughness: 0.5, side: THREE.DoubleSide }), []);
  const tailMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#2b4753', roughness: 0.6 }), []);
  useEffect(() => () => {
    geo.dispose();
    tail.dispose();
    mat.dispose();
    tailMat.dispose();
  }, [geo, tail, mat, tailMat]);

  const p = useMemo(() => new THREE.Vector3(), []);
  const p2 = useMemo(() => new THREE.Vector3(), []);
  const q = useMemo(() => new THREE.Quaternion(), []);
  const fwd = useMemo(() => new THREE.Vector3(1, 0, 0), []);
  const at = (t: number, out: THREE.Vector3) => {
    const a = t * speed + phase;
    return out.set(path[0] + Math.cos(a) * path[3], path[1] + Math.sin(a * 1.5) * 0.6, path[2] + Math.sin(a) * path[4]);
  };
  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (!root.current) return;
    at(t, p);
    at(t + 0.1, p2);
    q.setFromUnitVectors(fwd, p2.sub(p).normalize());
    root.current.position.copy(p);
    root.current.quaternion.copy(q);
    // wing flap: waves travel from the body to the tips
    const arr = (wing.current?.geometry.getAttribute('position') as THREE.BufferAttribute | undefined)?.array as Float32Array | undefined;
    if (arr && wing.current) {
      for (let i = 0; i < arr.length; i += 3) {
        const z = base[i + 2];
        arr[i + 1] = base[i + 1] + Math.sin(t * 2.2 - Math.abs(z) * 1.1) * 0.14 * Math.abs(z) * 0.5;
      }
      (wing.current.geometry.getAttribute('position') as THREE.BufferAttribute).needsUpdate = true;
      wing.current.geometry.computeVertexNormals();
    }
  });

  return (
    <group ref={root} scale={scale}>
      <mesh ref={wing} geometry={geo} material={mat} />
      <mesh geometry={tail} material={tailMat} />
    </group>
  );
}

