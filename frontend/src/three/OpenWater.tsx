import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import type { Group } from 'three';
import { Bubbles, Diver, FishSchool, MantaRay, SeaTurtle, WhaleShark } from './creatures';

/**
 * Hero and open-water subjects. The whale shark circles slowly in a wide orbit above the
 * camera path so it passes overhead as the visitor descends rather than colliding with it.
 */
function SwimmingShark() {
  const ref = useRef<Group>(null);
  const cx = -4;
  const cz = -24;
  const R = 13;
  const theta0 = 1.07;
  const omega = 0.085;
  useFrame(({ clock }) => {
    const g = ref.current;
    if (!g) return;
    const t = clock.elapsedTime;
    const th = theta0 + omega * t;
    g.position.set(cx + R * Math.cos(th), 2.6 + Math.sin(t * 0.2) * 0.35, cz + R * Math.sin(th));
    // velocity direction (tangent) decides heading; local forward is +Z
    const tx = -R * Math.sin(th);
    const tz = R * Math.cos(th);
    g.rotation.set(0.06 * Math.sin(t * 0.3), Math.atan2(tx, tz), 0.05 * Math.sin(t * 0.5));
  });
  return (
    <group ref={ref}>
      <WhaleShark />
    </group>
  );
}

export default function OpenWater({ mobile = false }: { mobile?: boolean }) {
  const schools = useMemo(
    () =>
      mobile
        ? [
            { center: [-7, -1, -42] as [number, number, number], radius: 9, count: 22, seed: 1, color: '#a9c6d1' },
            { center: [8, -5, -62] as [number, number, number], radius: 11, count: 26, seed: 2, color: '#e6c77e' },
          ]
        : [
            { center: [-7, -1, -42] as [number, number, number], radius: 9, count: 44, seed: 1, color: '#a9c6d1' },
            { center: [8, -5, -62] as [number, number, number], radius: 11, count: 48, seed: 2, color: '#e6c77e' },
            { center: [-1, -7, -96] as [number, number, number], radius: 14, count: 40, seed: 3, color: '#6f9aa8' },
          ],
    [mobile],
  );
  return (
    <group>
      <SwimmingShark />
      <group position={[-2.6, -0.5, 5]} rotation={[0, -0.35, 0]}>
        <Diver scale={1.05} />
      </group>
      <Bubbles origin={[-2.0, -0.4, 4.8]} count={mobile ? 14 : 26} />

      {schools.map((s) => (
        <FishSchool key={s.seed} center={s.center} radius={s.radius} count={s.count} seed={s.seed} color={s.color} speed={0.35} />
      ))}

      <SeaTurtle path={[-5, -5, -44, 8, 5]} phase={0} scale={1.5} />
      {!mobile && <SeaTurtle path={[6, -7, -70, 6, 4]} phase={2} scale={1.4} speed={0.1} />}
      <MantaRay path={[-9, -4, -62, 7, 9]} phase={0.5} scale={1.35} />
      {!mobile && <MantaRay path={[9, -3, -100, 9, 6]} phase={3} scale={1.2} speed={0.07} />}

      {/* Diver silhouette for the quote panel, low in the deep water */}
      <group position={[0.5, -11, -64]} rotation={[0, 0.5, 0]}>
        <Diver scale={1.2} suit="#071118" accent="#0c2633" pulse={4} />
      </group>
    </group>
  );
}
