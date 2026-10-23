import { useEffect, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import type { Mesh, Points } from 'three';
import { env } from './journey';
import { rng } from './geometry';

/* ------------------------------------------------------------------ */
/* Sky / water column gradient dome (follows the camera)              */
/* ------------------------------------------------------------------ */

const domeVert = /* glsl */ `
  varying vec3 vDir;
  void main() {
    vDir = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const domeFrag = /* glsl */ `
  uniform vec3 uTop;
  uniform vec3 uHorizon;
  uniform vec3 uBottom;
  varying vec3 vDir;
  void main() {
    vec3 d = normalize(vDir);
    float h = d.y;
    vec3 c = h > 0.0
      ? mix(uHorizon, uTop, smoothstep(0.0, 0.55, h))
      : mix(uHorizon, uBottom, smoothstep(0.0, -0.35, h));
    gl_FragColor = vec4(c, 1.0);
    #include <colorspace_fragment>
  }
`;

export function SkyDome() {
  const ref = useRef<Mesh>(null);
  const uniforms = useMemo(
    () => ({ uTop: { value: new THREE.Color() }, uHorizon: { value: new THREE.Color() }, uBottom: { value: new THREE.Color() } }),
    [],
  );
  const mat = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms,
        vertexShader: domeVert,
        fragmentShader: domeFrag,
        side: THREE.BackSide,
        depthWrite: false,
        fog: false,
      }),
    [uniforms],
  );
  useEffect(() => () => mat.dispose(), [mat]);
  useFrame(({ camera }) => {
    if (ref.current) ref.current.position.copy(camera.position);
    uniforms.uTop.value.copy(env.top);
    uniforms.uHorizon.value.copy(env.horizon);
    uniforms.uBottom.value.copy(env.bottom);
  });
  return (
    <mesh ref={ref} material={mat} renderOrder={-10} frustumCulled={false}>
      <sphereGeometry args={[400, 32, 20]} />
    </mesh>
  );
}

/* ------------------------------------------------------------------ */
/* Sea surface: translucent from above, shimmering ceiling from below */
/* ------------------------------------------------------------------ */

const surfaceVert = /* glsl */ `
  varying vec3 vW;
  void main() {
    vec4 w = modelMatrix * vec4(position, 1.0);
    vW = w.xyz;
    gl_Position = projectionMatrix * viewMatrix * w;
  }
`;

const surfaceFrag = /* glsl */ `
  uniform float uTime;
  uniform float uBelow;
  varying vec3 vW;
  float wave(vec2 p, float t) {
    return sin(p.x * 0.7 + t * 0.9) * 0.5
         + sin(p.y * 0.55 - t * 0.7) * 0.5
         + sin((p.x + p.y) * 1.6 + t * 1.3) * 0.25;
  }
  void main() {
    float n = wave(vW.xz, uTime);
    vec3 V = normalize(cameraPosition - vW);
    float fres = pow(1.0 - abs(V.y), 2.0);
    bool above = cameraPosition.y > vW.y;
    vec3 col;
    float a;
    if (above) {
      col = mix(vec3(0.27, 0.78, 0.86), vec3(0.78, 0.96, 1.0), fres * 0.6);
      a = 0.34 + fres * 0.25;
    } else {
      // ceiling: bright caustic-like ripples seen from underwater
      float caustic = smoothstep(0.55, 1.0, n) * 0.6 + 0.2;
      col = vec3(0.72, 0.94, 1.0) * (0.55 + caustic * 0.45);
      a = 0.22 + caustic * 0.22;
    }
    gl_FragColor = vec4(col, a * (1.0 - uBelow * 0.0));
    #include <colorspace_fragment>
  }
`;

export function SeaSurface({ y = 6 }: { y?: number }) {
  const ref = useRef<Mesh>(null);
  const uniforms = useMemo(() => ({ uTime: { value: 0 }, uBelow: { value: 0 } }), []);
  const mat = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms,
        vertexShader: surfaceVert,
        fragmentShader: surfaceFrag,
        transparent: true,
        depthWrite: false,
        side: THREE.DoubleSide,
      }),
    [uniforms],
  );
  useEffect(() => () => mat.dispose(), [mat]);
  useFrame(({ clock }) => {
    uniforms.uTime.value = clock.elapsedTime;
  });
  return (
    <mesh ref={ref} material={mat} rotation={[-Math.PI / 2, 0, 0]} position={[0, y, -100]} renderOrder={5} frustumCulled={false}>
      <planeGeometry args={[1400, 1400, 1, 1]} />
    </mesh>
  );
}

/* ------------------------------------------------------------------ */
/* Volumetric-looking light shafts (billboarded soft planes)           */
/* ------------------------------------------------------------------ */

const shaftVert = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const shaftFrag = /* glsl */ `
  uniform float uOpacity;
  uniform float uTime;
  uniform float uSeed;
  varying vec2 vUv;
  void main() {
    float fy = smoothstep(0.0, 0.75, vUv.y);
    float fx = pow(1.0 - abs(vUv.x - 0.5) * 2.0, 1.6);
    float shimmer = 0.85 + 0.15 * sin(uTime * 0.6 + uSeed + vUv.y * 6.0);
    float a = fy * fx * shimmer * uOpacity;
    gl_FragColor = vec4(vec3(0.72, 0.94, 1.0), a);
    #include <colorspace_fragment>
  }
`;

export function LightShafts({ count = 9 }: { count?: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const shafts = useMemo(() => {
    const r = rng(42);
    return Array.from({ length: count }, (_, i) => {
      const z = -6 - (i / count) * 170 - r() * 8;
      return {
        x: (r() - 0.5) * 34,
        z,
        scale: 0.8 + r() * 1.2,
        seed: r() * 10,
      };
    });
  }, [count]);
  const materials = useMemo(
    () =>
      shafts.map(
        (s) =>
          new THREE.ShaderMaterial({
            uniforms: { uOpacity: { value: 0 }, uTime: { value: 0 }, uSeed: { value: s.seed } },
            vertexShader: shaftVert,
            fragmentShader: shaftFrag,
            transparent: true,
            depthWrite: false,
            side: THREE.DoubleSide,
            blending: THREE.AdditiveBlending,
          }),
      ),
    [shafts],
  );
  const geo = useMemo(() => new THREE.PlaneGeometry(5, 36, 1, 1), []);
  useEffect(
    () => () => {
      geo.dispose();
      materials.forEach((m) => m.dispose());
    },
    [geo, materials],
  );
  useFrame(({ clock, camera }) => {
    const t = clock.elapsedTime;
    const group = groupRef.current;
    if (!group) return;
    group.children.forEach((child, i) => {
      const m = materials[i];
      const s = shafts[i];
      const mesh = child as Mesh;
      m.uniforms.uTime.value = t;
      // fade out when camera is above the water
      m.uniforms.uOpacity.value = env.shafts * 0.32 * (1 - env.aboveWater) * (0.8 + 0.2 * Math.sin(t * 0.3 + s.seed));
      mesh.rotation.y = Math.atan2(camera.position.x - s.x, camera.position.z - s.z);
      mesh.rotation.z = 0.12 + Math.sin(t * 0.2 + s.seed) * 0.02;
    });
  });
  return (
    <group ref={groupRef}>
      {shafts.map((s, i) => (
        <mesh key={i} geometry={geo} material={materials[i]} position={[s.x, 6 - 18, s.z]} scale={[s.scale, 1, 1]} renderOrder={3} />
      ))}
    </group>
  );
}

/* ------------------------------------------------------------------ */
/* Suspended plankton / particles (GPU-driven drift)                   */
/* ------------------------------------------------------------------ */

const particleVert = /* glsl */ `
  attribute float aSeed;
  attribute float aSize;
  uniform float uTime;
  uniform float uScale;
  uniform float uOpacity;
  varying float vA;
  void main() {
    vec3 p = position;
    float t = uTime * 0.22 + aSeed * 12.0;
    p.x += sin(t * 0.8 + aSeed * 3.0) * 0.7;
    p.y += sin(t * 0.55 + aSeed * 5.0) * 0.45;
    p.z += cos(t * 0.4 + aSeed * 7.0) * 0.5;
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_PointSize = max(1.0, aSize * uScale / -mv.z);
    gl_Position = projectionMatrix * mv;
    vA = uOpacity * (0.35 + 0.65 * fract(aSeed * 7.31));
  }
`;

const particleFrag = /* glsl */ `
  uniform vec3 uColor;
  varying float vA;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    float a = smoothstep(0.5, 0.0, d);
    gl_FragColor = vec4(uColor, a * vA);
    #include <colorspace_fragment>
  }
`;

export function Plankton({ count = 1200, color = '#d6f6ff' }: { count?: number; color?: string }) {
  const ref = useRef<Points>(null);
  const geo = useMemo(() => {
    const r = rng(9);
    const pos = new Float32Array(count * 3);
    const seed = new Float32Array(count);
    const size = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (r() - 0.5) * 60;
      pos[i * 3 + 1] = -16 + r() * 26;
      pos[i * 3 + 2] = 22 - r() * 250;
      seed[i] = r();
      size[i] = 0.05 + Math.pow(r(), 3) * 0.16; // mostly tiny, a few larger near-camera motes
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    g.setAttribute('aSeed', new THREE.BufferAttribute(seed, 1));
    g.setAttribute('aSize', new THREE.BufferAttribute(size, 1));
    return g;
  }, [count]);
  const mat = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: {
          uTime: { value: 0 },
          uScale: { value: 600 },
          uOpacity: { value: 0.8 },
          uColor: { value: new THREE.Color(color) },
        },
        vertexShader: particleVert,
        fragmentShader: particleFrag,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    [color],
  );
  useEffect(
    () => () => {
      geo.dispose();
      mat.dispose();
    },
    [geo, mat],
  );
  useFrame(({ clock, size, viewport }) => {
    mat.uniforms.uTime.value = clock.elapsedTime;
    const fovRad = THREE.MathUtils.degToRad(42);
    mat.uniforms.uScale.value = (size.height * viewport.dpr * 0.5) / Math.tan(fovRad * 0.5);
    mat.uniforms.uOpacity.value = 0.85 * env.particles;
  });
  return <points ref={ref} geometry={geo} material={mat} frustumCulled={false} renderOrder={4} />;
}

/* ------------------------------------------------------------------ */
/* Seabed                                                              */
/* ------------------------------------------------------------------ */

export function Seabed({ y = -14 }: { y?: number }) {
  const geo = useMemo(() => {
    const g = new THREE.PlaneGeometry(340, 520, 90, 130);
    g.rotateX(-Math.PI / 2);
    const p = g.getAttribute('position');
    for (let i = 0; i < p.count; i++) {
      const x = p.getX(i);
      const z = p.getZ(i);
      const h =
        Math.sin(x * 0.16) * 0.7 +
        Math.sin(z * 0.09 + x * 0.05) * 0.9 +
        Math.sin(z * 0.27) * 0.25 +
        Math.cos(x * 0.4 + z * 0.1) * 0.15;
      p.setY(i, h);
    }
    g.computeVertexNormals();
    return g;
  }, []);
  const mat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#2a4b55', roughness: 1, metalness: 0 }), []);
  useEffect(
    () => () => {
      geo.dispose();
      mat.dispose();
    },
    [geo, mat],
  );
  return <mesh geometry={geo} material={mat} position={[0, y, -120]} receiveShadow={false} />;
}
