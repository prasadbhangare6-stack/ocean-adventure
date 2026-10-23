import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';

/** Small deterministic PRNG so scenes look identical on every load. */
export function rng(seed: number) {
  let s = (seed * 2654435761) >>> 0 || 1;
  return () => {
    s ^= s << 13;
    s >>>= 0;
    s ^= s >>> 17;
    s ^= s << 5;
    s >>>= 0;
    return s / 4294967296;
  };
}

const UP = new THREE.Vector3(0, 1, 0);

/** Cylinder-like limb between two points. */
export function limbGeo(a: THREE.Vector3, b: THREE.Vector3, r0: number, r1: number = r0, seg = 10) {
  const dir = new THREE.Vector3().subVectors(b, a);
  const len = Math.max(dir.length(), 1e-4);
  const g = new THREE.CylinderGeometry(r1, r0, len, seg, 1, false);
  g.translate(0, len / 2, 0);
  g.applyQuaternion(new THREE.Quaternion().setFromUnitVectors(UP, dir.normalize()));
  g.translate(a.x, a.y, a.z);
  return g;
}

export function ballGeo(c: THREE.Vector3, r: number, sx = 1, sy = 1, sz = 1, seg = 10) {
  const g = new THREE.SphereGeometry(r, seg, Math.max(4, seg >> 1));
  g.scale(sx, sy, sz);
  g.translate(c.x, c.y, c.z);
  return g;
}

/** Merge geometries that may be indexed or non-indexed into one buffer. */
export function mergeAll(geos: THREE.BufferGeometry[]): THREE.BufferGeometry {
  const prepared = geos.map((g) => {
    const n = g.index ? g.toNonIndexed() : g.clone();
    for (const k of Object.keys(n.attributes)) {
      if (k !== 'position' && k !== 'normal' && k !== 'uv') n.deleteAttribute(k);
    }
    if (!n.getAttribute('normal')) n.computeVertexNormals();
    if (!n.getAttribute('uv')) {
      n.setAttribute('uv', new THREE.Float32BufferAttribute(new Float32Array(n.getAttribute('position').count * 2), 2));
    }
    return n;
  });
  const merged = mergeGeometries(prepared, false) as THREE.BufferGeometry;
  prepared.forEach((g) => g.dispose());
  geos.forEach((g) => g.dispose());
  return merged;
}

/** Flip the index winding if the computed normals point inward (checked on average). */
export function ensureOutward(g: THREE.BufferGeometry, center = new THREE.Vector3()) {
  g.computeVertexNormals();
  const pos = g.getAttribute('position');
  const nrm = g.getAttribute('normal');
  let dot = 0;
  const step = Math.max(1, Math.floor(pos.count / 200));
  const v = new THREE.Vector3();
  const n = new THREE.Vector3();
  for (let i = 0; i < pos.count; i += step) {
    v.fromBufferAttribute(pos, i).sub(center);
    n.fromBufferAttribute(nrm, i);
    dot += v.dot(n);
  }
  if (dot < 0 && g.index) {
    const idx = g.index.array as Uint16Array | Uint32Array;
    for (let i = 0; i < idx.length; i += 3) {
      const t = idx[i + 1];
      idx[i + 1] = idx[i + 2];
      idx[i + 2] = t;
    }
    g.index.needsUpdate = true;
    g.computeVertexNormals();
  }
  return g;
}

/** Branching coral colony built from recursive limbs. */
export function coralGeo(seed: number) {
  const r = rng(seed);
  const parts: THREE.BufferGeometry[] = [];
  const grow = (p: THREE.Vector3, dir: THREE.Vector3, len: number, rad: number, depth: number) => {
    const q = p.clone().addScaledVector(dir, len);
    parts.push(limbGeo(p, q, rad * 0.75, rad, 7));
    if (depth > 0) {
      const n = 2 + Math.floor(r() * 2.2);
      for (let i = 0; i < n; i++) {
        const nd = dir
          .clone()
          .add(new THREE.Vector3((r() - 0.5) * 1.1, r() * 0.5, (r() - 0.5) * 1.1))
          .normalize();
        grow(q, nd, len * (0.68 + r() * 0.15), rad * 0.72, depth - 1);
      }
    } else {
      parts.push(ballGeo(q, rad * 2.1, 1, 0.75, 1, 8));
    }
  };
  grow(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 1, 0), 0.95, 0.13, 3);
  return mergeAll(parts);
}

/** Lumpy rock with a stable noise displacement. */
export function rockGeo(seed: number) {
  const g = new THREE.IcosahedronGeometry(1, 2);
  const r = rng(seed);
  const pos = g.getAttribute('position');
  const v = new THREE.Vector3();
  const ph = [r() * 6, r() * 6, r() * 6];
  // share displacement across identical positions so faces stay closed
  const cache = new Map<string, number>();
  for (let i = 0; i < pos.count; i++) {
    v.fromBufferAttribute(pos, i);
    const key = `${v.x.toFixed(4)},${v.y.toFixed(4)},${v.z.toFixed(4)}`;
    let d = cache.get(key);
    if (d === undefined) {
      d =
        1 +
        0.18 * Math.sin(v.x * 3.1 + ph[0]) * Math.cos(v.z * 2.7 + ph[1]) +
        0.12 * Math.sin(v.y * 5.3 + v.x * 2 + ph[2]) +
        0.08 * r();
      cache.set(key, d);
    }
    v.multiplyScalar(d);
    v.y *= 0.62;
    pos.setXYZ(i, v.x, v.y, v.z);
  }
  g.computeVertexNormals();
  return g;
}

/** Simple pointed frond/leaf shape in the XY plane. */
export function leafGeo(len: number, width: number) {
  const s = new THREE.Shape();
  s.moveTo(0, 0);
  s.quadraticCurveTo(len * 0.35, width, len, 0);
  s.quadraticCurveTo(len * 0.35, -width * 0.6, 0, 0);
  return new THREE.ShapeGeometry(s, 6);
}

/** Palm tree: curved trunk and fronds. Origin at trunk base. */
export function palmGeo(h: number, lean: number, seed: number) {
  const r = rng(seed);
  const curve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(lean * 0.4, h * 0.45, lean * 0.1),
    new THREE.Vector3(lean, h, lean * 0.3),
  ]);
  const trunk = new THREE.TubeGeometry(curve, 14, 0.16, 6, false);
  // taper trunk toward the top
  const tp = trunk.getAttribute('position');
  const v = new THREE.Vector3();
  for (let i = 0; i < tp.count; i++) {
    v.fromBufferAttribute(tp, i);
    const t = THREE.MathUtils.clamp(v.y / h, 0, 1);
    const s = 1 - t * 0.35;
    tp.setXYZ(i, v.x * s + (1 - s) * 0, v.y, v.z * s);
  }
  trunk.computeVertexNormals();
  const top = curve.getPoint(1);
  const fronds: THREE.BufferGeometry[] = [];
  const count = 8;
  for (let i = 0; i < count; i++) {
    const leaf = leafGeo(2.6 + r() * 0.5, 0.45);
    leaf.rotateZ(-0.1);
    // bend the frond downward
    const lp = leaf.getAttribute('position');
    for (let k = 0; k < lp.count; k++) {
      const x = lp.getX(k);
      lp.setZ(k, -0.12 * x * x);
      lp.setY(k, lp.getY(k) - 0.06 * x * x);
    }
    leaf.computeVertexNormals();
    leaf.rotateX(Math.PI / 2 + 0.1);
    leaf.rotateY((i / count) * Math.PI * 2 + r() * 0.3);
    leaf.translate(top.x, top.y, top.z);
    fronds.push(leaf);
  }
  return { trunk, fronds: mergeAll(fronds) };
}

/** Procedural island: noisy mound with sandy shore, returns geometry with vertex colors. */
export function islandGeo(radius: number, height: number, seed: number, rocky = false) {
  const r = rng(seed);
  const ph = [r() * 6, r() * 6, r() * 6];
  const g = new THREE.CylinderGeometry(radius * 0.94, radius * 1.22, height + 6, 72, 14, false);
  g.translate(0, -3, 0);
  const pos = g.getAttribute('position');
  const colors = new Float32Array(pos.count * 3);
  const c = new THREE.Color();
  const v = new THREE.Vector3();
  const sand = new THREE.Color('#e8d6ad');
  const grass = new THREE.Color(rocky ? '#3f7a4b' : '#2f7d3c');
  const stone = new THREE.Color('#d9cdb4');
  const deepSand = new THREE.Color('#c9b48a');
  for (let i = 0; i < pos.count; i++) {
    v.fromBufferAttribute(pos, i);
    const rad = Math.hypot(v.x, v.z);
    const ang = Math.atan2(v.z, v.x);
    const hill =
      (Math.sin(ang * 3 + ph[0]) * 0.5 + Math.sin(ang * 5 + ph[1]) * 0.35 + Math.cos(ang * 9 + ph[2]) * 0.15 + 1.0) *
      (rocky ? 2.6 : 1.1);
    const top = v.y > 0;
    const edge = THREE.MathUtils.smoothstep(rad, radius * 0.7, radius * 1.02);
    if (top) {
      const h = (1 - edge) * hill * 0.9 + (1 - edge) * (height * 0.5) * (1 - rad / radius);
      v.y = height * 0.85 + h * (rocky ? 1.2 : 0.7) * (1 - edge);
    } else {
      v.y = v.y - 0.0;
    }
    pos.setXYZ(i, v.x, v.y, v.z);
    // colors: grass top, sand at beach band, stone on steep sides
    const beach = THREE.MathUtils.smoothstep(v.y, height * 0.35, height * 0.75);
    c.copy(sand);
    if (rocky) c.lerp(stone, 1 - edge);
    c.lerp(deepSand, 1 - beach);
    const green = top ? THREE.MathUtils.smoothstep(v.y, height * 0.6, height * 0.95) * (1 - edge * 0.9) : 0;
    c.lerp(grass, green * (rocky ? 0.8 : 0.95));
    colors[i * 3] = c.r;
    colors[i * 3 + 1] = c.g;
    colors[i * 3 + 2] = c.b;
  }
  g.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  g.computeVertexNormals();
  return g;
}

/** Side-view hull profile, extruded across the width. */
export function hullGeo() {
  const s = new THREE.Shape();
  s.moveTo(-2.6, 0.0);
  s.lineTo(2.6, 0.0);
  s.quadraticCurveTo(3.4, 0.25, 3.1, 0.9);
  s.lineTo(-2.5, 0.9);
  s.quadraticCurveTo(-2.9, 0.4, -2.6, 0.0);
  const g = new THREE.ExtrudeGeometry(s, { depth: 1.5, bevelEnabled: false, steps: 1 });
  g.translate(0, 0, -0.75);
  return g;
}

/** Remap a ShapeGeometry lying in XY so it lies in the ZY plane at x=0. */
export function planeZY(geo: THREE.BufferGeometry, zOff: number, yOff: number) {
  const p = geo.getAttribute('position');
  for (let i = 0; i < p.count; i++) {
    const x = p.getX(i);
    const y = p.getY(i);
    p.setXYZ(i, 0, y + yOff, x + zOff);
  }
  p.needsUpdate = true;
  geo.computeVertexNormals();
  return geo;
}
