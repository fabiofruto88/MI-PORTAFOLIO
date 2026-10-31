"use client";

import { useEffect, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

export interface StackRig {
  /** 0 → 1 a lo largo del pin de la sección. */
  progress: number;
}

interface Props {
  rig: React.RefObject<StackRig>;
  groups: readonly { group: string; items: readonly string[] }[];
  narrow: boolean;
  visible: boolean;
}

const INK = "#0f1013";
const ACCENT = "#2f55d4";

function labelTexture(text: string, color: string, font: string) {
  const dpr = 2;
  const size = 44 * dpr;
  const c = document.createElement("canvas");
  const ctx = c.getContext("2d")!;
  ctx.font = `600 ${size}px ${font}`;
  const w = Math.ceil(ctx.measureText(text).width) + 24 * dpr;
  c.width = w;
  c.height = size * 1.6;
  ctx.font = `600 ${size}px ${font}`;
  ctx.fillStyle = color;
  ctx.textBaseline = "middle";
  ctx.fillText(text, 12 * dpr, c.height / 2);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  return { tex, aspect: c.width / c.height };
}

interface Node {
  sprite: THREE.Sprite;
  ink: THREE.CanvasTexture;
  accent: THREE.CanvasTexture;
  group: number;
  base: THREE.Vector3;
  scale: number;
}

/** Cuatro cúmulos (uno por frente) en los vértices de un tetraedro. */
const CENTERS = [
  new THREE.Vector3(1, 1, 1),
  new THREE.Vector3(-1, -1, 1),
  new THREE.Vector3(-1, 1, -1),
  new THREE.Vector3(1, -1, -1),
].map((v) => v.normalize().multiplyScalar(2.5));

function Constellation({ rig, groups, narrow }: Omit<Props, "visible">) {
  const holder = useRef<THREE.Group>(null);
  const nodes = useRef<Node[]>([]);
  const lines = useRef<THREE.LineSegments[]>([]);
  const pointer = useRef({ x: 0, y: 0, sx: 0, sy: 0 });
  const rotY = useRef(0);
  const rotX = useRef(0);
  const { viewport } = useThree();

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useEffect(() => {
    const root = holder.current;
    if (!root) return;
    let cancelled = false;
    const disposables: { dispose: () => void }[] = [];
    const font = getComputedStyle(document.body).getPropertyValue("--font-geist").trim() || "system-ui";
    const family = `${font}, system-ui, sans-serif`;

    (document.fonts?.ready ?? Promise.resolve()).then(() => {
      if (cancelled) return;
      groups.forEach((g, gi) => {
        const center = CENTERS[gi % CENTERS.length];
        const pts: THREE.Vector3[] = [];
        // cada cúmulo vive en el plano que mira a la cámara cuando está activo:
        // una columna en zigzag, para que las etiquetas no puedan solaparse
        const nrm = center.clone().normalize();
        const up = Math.abs(nrm.y) > 0.95 ? new THREE.Vector3(1, 0, 0) : new THREE.Vector3(0, 1, 0);
        const u = new THREE.Vector3().crossVectors(up, nrm).normalize();
        const v = new THREE.Vector3().crossVectors(nrm, u).normalize();
        const count = g.items.length;
        g.items.forEach((item, ni) => {
          const p = center
            .clone()
            .addScaledVector(u, (ni % 2 ? 1 : -1) * 0.62)
            .addScaledVector(v, ((count - 1) / 2 - ni) * 0.5);
          const ink = labelTexture(item, INK, family);
          const accent = labelTexture(item, ACCENT, family);
          disposables.push(ink.tex, accent.tex);
          const mat = new THREE.SpriteMaterial({ map: ink.tex, transparent: true, depthWrite: false });
          disposables.push(mat);
          const sprite = new THREE.Sprite(mat);
          const scale = 0.34;
          sprite.scale.set(scale * ink.aspect, scale, 1);
          sprite.position.copy(p);
          root.add(sprite);
          nodes.current.push({ sprite, ink: ink.tex, accent: accent.tex, group: gi, base: p.clone(), scale });
          pts.push(p);
        });
        const seg: THREE.Vector3[] = [];
        for (let i = 0; i < pts.length; i++) {
          seg.push(pts[i], pts[(i + 1) % pts.length]);
          seg.push(pts[i], center);
        }
        const geo = new THREE.BufferGeometry().setFromPoints(seg);
        const mat = new THREE.LineBasicMaterial({ color: ACCENT, transparent: true, opacity: 0.15 });
        disposables.push(geo, mat);
        const line = new THREE.LineSegments(geo, mat);
        root.add(line);
        lines.current.push(line);
      });
    });

    return () => {
      cancelled = true;
      nodes.current.forEach((n) => root.remove(n.sprite));
      lines.current.forEach((l) => root.remove(l));
      nodes.current = [];
      lines.current = [];
      disposables.forEach((d) => d.dispose());
    };
  }, [groups]);

  useFrame(({ camera }, delta) => {
    const root = holder.current;
    if (!root) return;
    const p = pointer.current;
    p.sx += (p.x - p.sx) * 0.06;
    p.sy += (p.y - p.sy) * 0.06;

    const n = groups.length;
    const f = Math.min(0.999, Math.max(0, rig.current.progress)) * n;
    const active = Math.floor(f);
    // orienta el cúmulo activo hacia la cámara
    const c = CENTERS[active % CENTERS.length];
    const targetY = -Math.atan2(c.x, c.z);
    const targetX = Math.atan2(c.y, Math.hypot(c.x, c.z)) * 0.6;
    const k = 1 - Math.pow(0.001, delta);
    let dy = targetY - rotY.current;
    dy = Math.atan2(Math.sin(dy), Math.cos(dy));
    rotY.current += dy * k * 0.9;
    rotX.current += (targetX - rotX.current) * k * 0.9;
    root.rotation.y = rotY.current + p.sx * 0.18;
    root.rotation.x = rotX.current + p.sy * 0.1;
    const fit = narrow ? 0.55 : Math.min(0.9, viewport.width / 10);
    root.scale.setScalar(fit);
    camera.position.set(p.sx * 0.12, -p.sy * 0.08, 7.5);
    camera.lookAt(0, 0, 0);

    nodes.current.forEach((nd) => {
      const on = nd.group === active;
      const mat = nd.sprite.material as THREE.SpriteMaterial;
      const target = on ? 1 : 0.28;
      mat.opacity += (target - mat.opacity) * k;
      const map = on ? nd.accent : nd.ink;
      if (mat.map !== map) {
        mat.map = map;
        mat.needsUpdate = true;
      }
      const s = on ? 1.18 : 1;
      const cur = nd.sprite.scale.y / nd.scale;
      const ns = cur + (s - cur) * k;
      nd.sprite.scale.set(nd.scale * ns * (nd.sprite.scale.x / nd.sprite.scale.y), nd.scale * ns, 1);
    });
    lines.current.forEach((l, i) => {
      const mat = l.material as THREE.LineBasicMaterial;
      mat.opacity += ((i === active ? 0.55 : 0.1) - mat.opacity) * k;
    });
  });

  return <group ref={holder} />;
}

/** Constelación de habilidades: el scroll gira la esfera hasta cada frente. */
export default function StackScene({ rig, groups, narrow, visible }: Props) {
  return (
    <Canvas
      camera={{ position: [0, 0, 7.5], fov: 34 }}
      dpr={[1, 1.75]}
      frameloop={visible ? "always" : "never"}
      gl={{ antialias: true, alpha: true }}
    >
      <Constellation rig={rig} groups={groups} narrow={narrow} />
    </Canvas>
  );
}
