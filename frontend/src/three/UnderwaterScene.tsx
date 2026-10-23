import { Component, lazy, Suspense } from 'react';
import type { ReactNode } from 'react';
import { Canvas } from '@react-three/fiber';
import { Plankton, LightShafts, SeaSurface, Seabed, SkyDome } from './environment';
import OpenWater from './OpenWater';
import Rig from './Rig';

// Secondary scenes are split into their own chunks and only fetched when the scene mounts.
const Reef = lazy(() => import('./Reef'));
const Islands = lazy(() => import('./Islands'));

class SceneBoundary extends Component<{ fallback: ReactNode; children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch(err: unknown) {
    console.warn('3D scene disabled after error:', err);
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

export default function UnderwaterScene({ fallback, mobile, lowPower }: { fallback: ReactNode; mobile: boolean; lowPower: boolean }) {
  const dpr: [number, number] = mobile || lowPower ? [1, 1] : [1, 1.6];
  return (
    <SceneBoundary fallback={fallback}>
      <Canvas
        dpr={dpr}
        camera={{ fov: 42, near: 0.1, far: 700, position: [0.2, 0.9, 13] }}
        gl={{ antialias: !mobile, powerPreference: 'high-performance', alpha: false }}
        onCreated={({ gl }) => {
          gl.setClearColor('#063c59');
        }}
        aria-hidden="true"
        style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}
      >
        <Rig />
        <SkyDome />
        <SeaSurface />
        <LightShafts count={mobile || lowPower ? 4 : 9} />
        <Plankton count={lowPower ? 350 : mobile ? 600 : 1400} />
        <Seabed />
        <OpenWater mobile={mobile || lowPower} />
        <Suspense fallback={null}>
          <Reef mobile={mobile || lowPower} />
          <Islands mobile={mobile || lowPower} />
        </Suspense>
      </Canvas>
    </SceneBoundary>
  );
}
