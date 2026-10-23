import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import type { InstancedMesh } from 'three';
import { coralGeo, rng, rockGeo } from './geometry';

type Placement = { x: number; z: number; s: number; ry: number; variant: number };

/** Coral clusters along two reef zones, kept clear of the central camera corridor. */
function placeReef(seed: number, zFrom: number, zTo: number, clusters: number, variants: number) {
  const r = rng(seed);
  const out: Placement[] = [];
  for (let c = 0; c < clusters; c++) {
    let x = 0;
    do {
      x = (r() - 0.5) * 46;
    } while (Math.abs(x) < 5);
    const z = zFrom + (zTo - zFrom) * r();
    const n = 3 + Math.floor(r() * 4);
    for (let i = 0; i < n; i++) {
      out.push({
        x: x + (r() - 0.5) * 5,
        z: z + (r() - 0.5) * 5,
        s: 0.7 + r() * 1.1,
        ry: r() * Math.PI * 2,
        variant: Math.floor(r() * variants),
      });
    }
  }
  return out;
}

const CORAL_COLORS = ['#e8736b', '#f2a65a', '#d65d8f', '#7fc8b6', '#e9c46a', '#b983d6', '#ff8a5b'];

function CoralSet({ items, geo, seedColor }: { items: Placement[]; geo: THREE.BufferGeometry; seedColor: number }) {
  const ref = useRef<InstancedMesh>(null);
  const mat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#ffffff', roughness: 0.65, metalness: 0 }), []);
  useEffect(() => () => mat.dispose(), [mat]);
  useEffect(() => {
    const im = ref.current;
    if (!im) return;
    const m = new THREE.Matrix4();
    const q = new THREE.Quaternion();
    const p = new THREE.Vector3();
    const s = new THREE.Vector3();
    const c = new THREE.Color();
    const r = rng(seedColor);
    items.forEach((it, i) => {
      const yBase = -14 + 0.1;
      p.set(it.x, yBase, it.z);
      q.setFromAxisAngle(new THREE.Vector3(0, 1, 0), it.ry);
      s.setScalar(it.s);
      m.compose(p, q, s);
      im.setMatrixAt(i, m);
      c.set(CORAL_COLORS[Math.floor(r() * CORAL_COLORS.length)]).multiplyScalar(0.8 + r() * 0.3);
      im.setColorAt(i, c);
    });
    im.instanceMatrix.needsUpdate = true;
    if (im.instanceColor) im.instanceColor.needsUpdate = true;
  }, [items, seedColor]);
  return <instancedMesh ref={ref} args={[geo, mat, items.length]} frustumCulled={false} />;
}

export default function Reef({ mobile = false }: { mobile?: boolean }) {
  const variants = useMemo(() => [coralGeo(11), coralGeo(23), coralGeo(37)], []);
  const rockGeoms = useMemo(() => rockGeo(5), []);

  const zoneA = useMemo(() => placeReef(101, -22, -78, mobile ? 10 : 18, 3), [mobile]);
  const zoneB = useMemo(() => placeReef(202, -150, -214, mobile ? 8 : 14, 3), [mobile]);
  const all = useMemo(() => [...zoneA, ...zoneB], [zoneA, zoneB]);

  const byVariant = useMemo(() => {
    const out: Placement[][] = [[], [], []];
    all.forEach((p) => out[p.variant].push(p));
    return out;
  }, [all]);

  const rocks = useMemo(() => {
    const r = rng(77);
    const out: Placement[] = [];
    for (let i = 0; i < (mobile ? 60 : 140); i++) {
      const z = -20 - r() * 200;
      let x = (r() - 0.5) * 80;
      if (Math.abs(x) < 4) x += 6 * Math.sign(x || 1);
      out.push({ x, z, s: 0.8 + r() * 2.6, ry: r() * 6.28, variant: 0 });
    }
    return out;
  }, [mobile]);

  const rockRef = useRef<InstancedMesh>(null);
  const rockMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#56666b', roughness: 0.95, metalness: 0 }), []);
  useEffect(() => {
    const im = rockRef.current;
    if (!im) return;
    const m = new THREE.Matrix4();
    const q = new THREE.Quaternion();
    const p = new THREE.Vector3();
    const s = new THREE.Vector3();
    const c = new THREE.Color();
    const r = rng(3);
    rocks.forEach((it, i) => {
      p.set(it.x, -14 + it.s * 0.2, it.z);
      q.setFromAxisAngle(new THREE.Vector3(0, 1, 0), it.ry);
      s.set(it.s * 1.2, it.s * 0.9, it.s * 1.1);
      m.compose(p, q, s);
      im.setMatrixAt(i, m);
      c.setHSL(0.55 + r() * 0.05, 0.12 + r() * 0.08, 0.22 + r() * 0.12);
      im.setColorAt(i, c);
    });
    im.instanceMatrix.needsUpdate = true;
    if (im.instanceColor) im.instanceColor.needsUpdate = true;
  }, [rocks]);

  useEffect(
    () => () => {
      variants.forEach((g) => g.dispose());
      rockGeoms.dispose();
      rockMat.dispose();
    },
    [variants, rockGeoms, rockMat],
  );

  return (
    <group>
      {variants.map((g, i) => (
        <CoralSet key={i} items={byVariant[i]} geo={g} seedColor={300 + i} />
      ))}
      <instancedMesh ref={rockRef} args={[rockGeoms, rockMat, rocks.length]} frustumCulled={false} />
    </group>
  );
}
