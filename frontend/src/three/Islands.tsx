import { useEffect, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import type { Group } from 'three';
import { hullGeo, islandGeo, palmGeo, rng } from './geometry';

function Island({
  position,
  radius,
  height,
  seed,
  rocky = false,
  palms = 14,
}: {
  position: [number, number, number];
  radius: number;
  height: number;
  seed: number;
  rocky?: boolean;
  palms?: number;
}) {
  const body = useMemo(() => islandGeo(radius, height, seed, rocky), [radius, height, seed, rocky]);
  const palm = useMemo(() => palmGeo(height * 1.6 + 5, 1.1, seed), [height, seed]);
  const r = useMemo(() => rng(seed * 7), [seed]);
  const palmPlacements = useMemo(() => {
    const out: { x: number; z: number; s: number; ry: number }[] = [];
    for (let i = 0; i < palms; i++) {
      const a = r() * Math.PI * 2;
      const d = radius * (0.2 + r() * 0.55);
      out.push({ x: Math.cos(a) * d, z: Math.sin(a) * d, s: 0.8 + r() * 0.4, ry: r() * Math.PI * 2 });
    }
    return out;
    // r is stable per seed
  }, [palms, radius, r]);

  const trunkMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#7a5a3c', roughness: 0.9 }), []);
  const frondMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#2c7a3c', roughness: 0.7, side: THREE.DoubleSide }), []);
  const islandMat = useMemo(() => new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.95, metalness: 0 }), []);
  const lagoonMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#e9dcbc', roughness: 0.8 }), []);
  const lagoonGeo = useMemo(() => {
    const g = new THREE.CircleGeometry(radius * 1.55, 48);
    g.rotateX(-Math.PI / 2);
    return g;
  }, [radius]);
  useEffect(() => {
    return () => {
      body.dispose();
      palm.trunk.dispose();
      palm.fronds.dispose();
      trunkMat.dispose();
      frondMat.dispose();
      islandMat.dispose();
      lagoonMat.dispose();
      lagoonGeo.dispose();
    };
  }, [body, palm, trunkMat, frondMat, islandMat, lagoonMat, lagoonGeo]);

  const topY = height * 0.85;
  return (
    <group position={position}>
      <mesh geometry={body} material={islandMat} />
      <mesh geometry={lagoonGeo} material={lagoonMat} position={[0, 5.85, 0]} />
      {palmPlacements.map((p, i) => (
        <group key={i} position={[p.x, topY + 0.6 * (1 - Math.hypot(p.x, p.z) / radius), p.z]} rotation={[0, p.ry, 0]} scale={p.s}>
          <mesh geometry={palm.trunk} material={trunkMat} />
          <mesh geometry={palm.fronds} material={frondMat} />
        </group>
      ))}
    </group>
  );
}

function Boat({ position, rotation = 0, scale = 1 }: { position: [number, number, number]; rotation?: number; scale?: number }) {
  const ref = useRef<Group>(null);
  const hull = useMemo(() => hullGeo(), []);
  const hullMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#f5f0e7', roughness: 0.5 }), []);
  const cabinGeo = useMemo(() => new THREE.BoxGeometry(2.2, 1.0, 1.3), []);
  const roofGeo = useMemo(() => new THREE.BoxGeometry(2.6, 0.12, 1.7), []);
  const roofMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#28a8d9', roughness: 0.6 }), []);
  const woodMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#b08457', roughness: 0.8 }), []);
  const deckGeo = useMemo(() => new THREE.BoxGeometry(5.6, 0.08, 1.45), []);
  useEffect(
    () => () => {
      hull.dispose();
      hullMat.dispose();
      cabinGeo.dispose();
      roofGeo.dispose();
      roofMat.dispose();
      woodMat.dispose();
      deckGeo.dispose();
    },
    [hull, hullMat, cabinGeo, roofGeo, roofMat, woodMat, deckGeo],
  );
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.position.y = position[1] + Math.sin(clock.elapsedTime * 0.9 + position[0]) * 0.08;
      ref.current.rotation.z = Math.sin(clock.elapsedTime * 0.6) * 0.02;
    }
  });
  return (
    <group ref={ref} position={position} rotation={[0, rotation, 0]} scale={scale}>
      <mesh geometry={hull} material={hullMat} position={[0, -0.25, 0]} />
      <mesh geometry={deckGeo} material={woodMat} position={[0, 0.35, 0]} />
      <mesh geometry={cabinGeo} material={hullMat} position={[-0.4, 1.0, 0]} />
      <mesh geometry={roofGeo} material={roofMat} position={[-0.4, 1.6, 0]} />
    </group>
  );
}

/** Lazy-loaded: island destinations, palms, a limestone island and boats. */
export default function Islands({ mobile = false }: { mobile?: boolean }) {
  return (
    <group>
      <Island position={[0, 0, -120]} radius={16} height={4} seed={5} palms={mobile ? 8 : 16} />
      <Island position={[-18, 0, -204]} radius={14} height={7} seed={9} rocky palms={mobile ? 4 : 8} />
      <Boat position={[-13, 6.1, -104]} rotation={0.4} scale={0.9} />
      <Boat position={[17, 6.1, -194]} rotation={-0.7} scale={0.8} />
    </group>
  );
}
