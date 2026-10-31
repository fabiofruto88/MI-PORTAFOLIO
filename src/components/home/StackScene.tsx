"use client";

import { useEffect, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { createElement, type ComponentType } from "react";
import type { IconBaseProps } from "react-icons";
import {
  SiAndroid,
  SiCss3,
  SiFastapi,
  SiHtml5,
  SiIos,
  SiJavascript,
  SiMui,
  SiMysql,
  SiN8N,
  SiNextdotjs,
  SiOpenai,
  SiOpencv,
  SiPostgresql,
  SiPython,
  SiReact,
  SiTypescript,
} from "react-icons/si";
import { LuWaypoints } from "react-icons/lu";

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

const ICONS: Record<string, ComponentType<IconBaseProps>> = {
  React: SiReact,
  "Next.js": SiNextdotjs,
  TypeScript: SiTypescript,
  JavaScript: SiJavascript,
  "Material UI": SiMui,
  HTML5: SiHtml5,
  CSS3: SiCss3,
  "React Native": SiReact,
  Android: SiAndroid,
  iOS: SiIos,
  Python: SiPython,
  FastAPI: SiFastapi,
  MySQL: SiMysql,
  PostgreSQL: SiPostgresql,
  n8n: SiN8N,
  OpenAI: SiOpenai,
  OpenCV: SiOpencv,
  PGVector: LuWaypoints,
};

/** Color oficial de cada marca. */
const BRAND: Record<string, string> = {
  React: "#61DAFB",
  "Next.js": "#0f1013",
  TypeScript: "#3178C6",
  JavaScript: "#F7DF1E",
  "Material UI": "#007FFF",
  HTML5: "#E34F26",
  CSS3: "#1572B6",
  "React Native": "#61DAFB",
  Android: "#3DDC84",
  iOS: "#0f1013",
  Python: "#3776AB",
  FastAPI: "#009688",
  MySQL: "#4479A1",
  PostgreSQL: "#4169E1",
  n8n: "#EA4B71",
  OpenAI: "#0f1013",
  OpenCV: "#5C3EE8",
  PGVector: "#336791",
};

/** Dibuja el icono de la tecnología en un canvas (tinta o acento) y lo usa como textura. */
async function iconTexture(name: string, color: string): Promise<{ tex: THREE.CanvasTexture; aspect: number }> {
  const { renderToStaticMarkup } = await import("react-dom/server");
  const Icon = ICONS[name] ?? SiReact;
  const px = 128;
  let svg = renderToStaticMarkup(createElement(Icon, { size: px, color }));
  if (!svg.includes("xmlns=")) svg = svg.replace("<svg", '<svg xmlns="http://www.w3.org/2000/svg"');
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const c = document.createElement("canvas");
      c.width = c.height = px * 2;
      const ctx = c.getContext("2d")!;
      // silueta del logo en color papel, ensanchada: las líneas terminan siguiendo su forma
      const sil = document.createElement("canvas");
      sil.width = sil.height = px * 2;
      const sctx = sil.getContext("2d")!;
      sctx.drawImage(img, px * 0.25, px * 0.25, px * 1.5, px * 1.5);
      sctx.globalCompositeOperation = "source-in";
      sctx.fillStyle = "#d9dadc";
      sctx.fillRect(0, 0, sil.width, sil.height);
      for (const r of [5, 10, 15]) {
        for (let k = 0; k < 28; k++) {
          const t = (k / 28) * Math.PI * 2;
          ctx.drawImage(sil, Math.cos(t) * r, Math.sin(t) * r);
        }
      }
      ctx.drawImage(img, px * 0.25, px * 0.25, px * 1.5, px * 1.5);
      const tex = new THREE.CanvasTexture(c);
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.anisotropy = 4;
      resolve({ tex, aspect: 1 });
    };
    img.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
  });
}

interface Node {
  sprite: THREE.Sprite;
  ink: THREE.CanvasTexture;
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

    const names = groups.flatMap((g) => g.items);
    Promise.all(names.map((n) => iconTexture(n, BRAND[n] ?? INK))).then((tex) => {
      if (cancelled) {
        tex.forEach((t) => t.tex.dispose());
        return;
      }
      const made = new Map<string, (typeof tex)[number]>();
      names.forEach((n, i) => made.set(n, tex[i]));
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
        const cols = count > 6 ? 3 : count > 2 ? 2 : count;
        const rows = Math.ceil(count / cols);
        g.items.forEach((item, ni) => {
          const col = ni % cols;
          const row = Math.floor(ni / cols);
          // la última fila incompleta se centra
          const inRow = row === rows - 1 ? count - row * cols : cols;
          const p = center
            .clone()
            .addScaledVector(u, (col - (inRow - 1) / 2) * 0.95)
            .addScaledVector(v, ((rows - 1) / 2 - row) * 0.9);
          const ink = made.get(item)!;
          disposables.push(ink.tex);
          const mat = new THREE.SpriteMaterial({ map: ink.tex, transparent: true, depthWrite: false, depthTest: false });
          disposables.push(mat);
          const sprite = new THREE.Sprite(mat);
          sprite.renderOrder = 2;
          const scale = 0.58;
          sprite.scale.set(scale * ink.aspect, scale, 1);
          sprite.position.copy(p);
          root.add(sprite);
          nodes.current.push({ sprite, ink: ink.tex, group: gi, base: p.clone(), scale });
          pts.push(p);
        });
        const seg: THREE.Vector3[] = [];
        for (let i = 0; i < pts.length; i++) {
          seg.push(pts[i], pts[(i + 1) % pts.length]);
          seg.push(pts[i], center);
        }
        const geo = new THREE.BufferGeometry().setFromPoints(seg);
        const mat = new THREE.LineBasicMaterial({ color: ACCENT, transparent: true, opacity: 0.15, depthTest: false });
        disposables.push(geo, mat);
        const line = new THREE.LineSegments(geo, mat);
        line.renderOrder = 1;
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
      const target = on ? 1 : 0.5;
      mat.opacity += (target - mat.opacity) * k;
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
