import { useEffect, useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import type { DirectionalLight, HemisphereLight } from 'three';
import { env, sampleJourney, scrollState } from './journey';

/** Camera path, colour grading, fog and lighting: all driven by the scroll journey. */
export default function Rig() {
  const { camera, scene } = useThree();
  const hemi = useRef<HemisphereLight>(null);
  const sun = useRef<DirectionalLight>(null);
  const rim = useRef<DirectionalLight>(null);
  const look = useMemo(() => new THREE.Vector3(1.2, 1.6, -6), []);
  const target = useMemo(() => new THREE.Vector3(), []);
  const fog = useMemo(() => new THREE.FogExp2('#0a4d6b', 0.018), []);
  const skyColor = useMemo(() => new THREE.Color(), []);

  useEffect(() => {
    scene.fog = fog;
    scene.background = null;
    return () => {
      scene.fog = null;
    };
  }, [scene, fog]);

  useFrame((_, dt) => {
    const d = Math.min(dt, 0.05);
    // Eased progress: camera glides rather than snapping to the scroll position.
    scrollState.smooth += (scrollState.progress - scrollState.smooth) * (1 - Math.exp(-d * 6));

    // Reduced motion: the camera holds the framing of the current section.
    const T = scrollState.keyT;
    let snap = 0;
    for (let i = 0; i < T.length; i++) if (scrollState.progress >= T[i] - 0.001) snap = T[i];
    scrollState.snap = snap;

    const p = scrollState.reduced ? scrollState.snap : scrollState.smooth;
    sampleJourney(p, scrollState.mobile ? 0.6 : 1);

    const pointerOn = !scrollState.reduced && !scrollState.mobile;
    const px = pointerOn ? scrollState.pointer.x : 0;
    const py = pointerOn ? scrollState.pointer.y : 0;

    target.set(env.cam.x + px * 0.45, env.cam.y - py * 0.25, env.cam.z);
    const k = 1 - Math.exp(-d * 3.2);
    camera.position.lerp(target, k);
    look.lerp(env.look, k);
    camera.lookAt(look);

    fog.color.copy(env.fog);
    fog.density = env.density;

    if (hemi.current) {
      hemi.current.intensity = env.ambient * 0.9;
      skyColor.copy(env.top).lerp(new THREE.Color('#ffffff'), 0.25);
      hemi.current.color.copy(skyColor);
      hemi.current.groundColor.copy(env.bottom);
    }
    if (sun.current) {
      sun.current.intensity = env.sun * 0.85;
    }
    if (rim.current) rim.current.intensity = env.rim * 1.6;
  });

  return (
    <>
      <hemisphereLight ref={hemi} args={['#a8e4ef', '#02131d', 1]} />
      <directionalLight ref={sun} position={[6, 22, 4]} args={['#dff8ff', 1]} />
      <directionalLight ref={rim} position={[-6, 9, -22]} args={['#8ff0ff', 1]} />
    </>
  );
}
