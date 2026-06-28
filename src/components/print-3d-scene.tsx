"use client";

import { Canvas } from "@react-three/fiber";
import { Center, Decal, OrbitControls, RoundedBox, useTexture } from "@react-three/drei";
import { Suspense, useMemo } from "react";
import * as THREE from "three";

// Rodzaje sylwetek produktów drukowanych budowane proceduralnie (bez modeli
// .glb — żadnych licencji ani megabajtów). Nadruk użytkownika rzutowany jako
// Decal na lico produktu, z zachowaniem proporcji obrazka.
export type PrintShape =
  | "sheet" // ulotka / papier firmowy / plakat / naklejka — cienki arkusz
  | "card" // wizytówka / pocztówka — sztywniejszy kartonik
  | "board" // tablica forex/dibond — gruba, sztywna płyta
  | "rollup" // roll-up na aluminiowym stelażu
  | "banner" // baner PVC z oczkami
  | "folded" // składana ulotka (trifold)
  | "book" // broszura szyta / klejona
  | "book-thick"; // książka szyta nicią

// Najdłuższy bok normalizujemy do TARGET, by każdy produkt wypełniał kadr.
const TARGET = 1.4;

function planeSize(aspect: number): { w: number; h: number } {
  return aspect >= 1
    ? { w: TARGET, h: TARGET / aspect }
    : { w: TARGET * aspect, h: TARGET };
}

// Proporcjonalne dopasowanie nadruku do lica (fit-inside) + suwak rozmiaru.
function fitDecal(
  imgAspect: number,
  faceW: number,
  faceH: number,
  scale: number,
): [number, number] {
  let dw = faceW;
  let dh = faceW / imgAspect;
  if (dh > faceH) {
    dh = faceH;
    dw = faceH * imgAspect;
  }
  const s = 0.55 + (scale / 100) * 0.45; // suwak 40–100 → 0.73–1.0 dopasowania
  return [dw * s, dh * s];
}

function ImageDecal({
  imageUrl,
  scale,
  faceW,
  faceH,
  z,
}: {
  imageUrl: string;
  scale: number;
  faceW: number;
  faceH: number;
  z: number;
}) {
  const texture = useTexture(imageUrl, (t) => {
    t.colorSpace = THREE.SRGBColorSpace;
    t.anisotropy = 8;
  });
  const img = texture.image as { width?: number; height?: number };
  const aspect = img?.width && img?.height ? img.width / img.height : 1;
  const [dw, dh] = fitDecal(aspect, faceW, faceH, scale);
  return (
    <Decal position={[0, 0, z]} rotation={[0, 0, 0]} scale={[dw, dh, 0.4]}>
      <meshStandardMaterial
        map={texture}
        transparent
        roughness={0.85}
        polygonOffset
        polygonOffsetFactor={-1}
        depthTest
        depthWrite={false}
      />
    </Decal>
  );
}

// Stan pusty: na lico nakładamy lekki placeholder „Twój nadruk", by produkt
// nie był pustą białą bryłą zanim użytkownik wgra grafikę.
function PlaceholderDecal({
  faceW,
  faceH,
  z,
}: {
  faceW: number;
  faceH: number;
  z: number;
}) {
  const texture = useMemo(() => {
    const aspect = faceW / faceH;
    const W = 512;
    const H = Math.round(W / aspect);
    const c = document.createElement("canvas");
    c.width = W;
    c.height = H;
    const ctx = c.getContext("2d")!;
    ctx.fillStyle = "#f3f3f6";
    ctx.fillRect(0, 0, W, H);
    ctx.strokeStyle = "#c9c7d6";
    ctx.lineWidth = 4;
    ctx.setLineDash([14, 12]);
    ctx.strokeRect(10, 10, W - 20, H - 20);
    ctx.setLineDash([]);
    ctx.fillStyle = "#9b97ad";
    ctx.font = `600 ${Math.round(W * 0.07)}px sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("Twój nadruk", W / 2, H / 2);
    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 8;
    return tex;
  }, [faceW, faceH]);
  return (
    <Decal position={[0, 0, z]} rotation={[0, 0, 0]} scale={[faceW, faceH, 0.4]}>
      <meshStandardMaterial
        map={texture}
        transparent
        roughness={0.9}
        polygonOffset
        polygonOffsetFactor={-1}
        depthTest
        depthWrite={false}
      />
    </Decal>
  );
}

function Design(props: {
  imageUrl: string | null;
  scale: number;
  faceW: number;
  faceH: number;
  z: number;
}) {
  const { imageUrl, ...rest } = props;
  return imageUrl ? (
    <ImageDecal imageUrl={imageUrl} {...rest} />
  ) : (
    <PlaceholderDecal faceW={rest.faceW} faceH={rest.faceH} z={rest.z} />
  );
}

// ── Płaskie produkty: arkusz / kartonik / sztywna płyta ──────────────────────
function FlatPanel({
  aspect,
  thickness,
  edgeColor,
  imageUrl,
  scale,
}: {
  aspect: number;
  thickness: number;
  edgeColor: string;
  imageUrl: string | null;
  scale: number;
}) {
  const { w, h } = planeSize(aspect);
  return (
    <group rotation={[-0.12, -0.5, 0]}>
      <RoundedBox
        args={[w, h, thickness]}
        radius={Math.min(w, h) * 0.018}
        smoothness={3}
        castShadow
      >
        <meshStandardMaterial color={edgeColor} roughness={0.8} metalness={0} />
        <Design
          imageUrl={imageUrl}
          scale={scale}
          faceW={w * 0.92}
          faceH={h * 0.92}
          z={thickness / 2}
        />
      </RoundedBox>
    </group>
  );
}

// ── Roll-up: kaseta + maszt + stopa + tkanina z nadrukiem ────────────────────
function Rollup({
  aspect,
  imageUrl,
  scale,
}: {
  aspect: number;
  imageUrl: string | null;
  scale: number;
}) {
  const h = 1.9;
  const w = h * aspect;
  const t = 0.012;
  const baseY = -h / 2 - 0.03;
  return (
    <group rotation={[0, -0.35, 0]}>
      {/* tkanina */}
      <mesh castShadow>
        <boxGeometry args={[w, h, t]} />
        <meshStandardMaterial color="#ffffff" roughness={0.7} metalness={0} />
        <Design
          imageUrl={imageUrl}
          scale={scale}
          faceW={w * 0.94}
          faceH={h * 0.96}
          z={t / 2}
        />
      </mesh>
      {/* aluminiowa stopa */}
      <mesh position={[0, baseY, 0]} castShadow>
        <boxGeometry args={[w * 1.12, 0.06, 0.22]} />
        <meshStandardMaterial color="#c2c5cc" roughness={0.35} metalness={0.8} />
      </mesh>
      {/* maszt podtrzymujący z tyłu */}
      <mesh position={[0, 0, -0.06]}>
        <cylinderGeometry args={[0.012, 0.012, h, 12]} />
        <meshStandardMaterial color="#b9bcc4" roughness={0.4} metalness={0.7} />
      </mesh>
    </group>
  );
}

// ── Baner PVC: płótno z oczkami w narożnikach ───────────────────────────────
function Banner({
  aspect,
  imageUrl,
  scale,
}: {
  aspect: number;
  imageUrl: string | null;
  scale: number;
}) {
  const { w, h } = planeSize(aspect);
  const t = 0.012;
  const gx = w / 2 - 0.06;
  const gy = h / 2 - 0.06;
  const grommets: [number, number][] = [
    [-gx, gy],
    [gx, gy],
    [-gx, -gy],
    [gx, -gy],
    [0, gy],
    [0, -gy],
  ];
  return (
    <group rotation={[0, -0.4, 0]}>
      <mesh castShadow>
        <boxGeometry args={[w, h, t]} />
        <meshStandardMaterial color="#ffffff" roughness={0.85} metalness={0} />
        <Design
          imageUrl={imageUrl}
          scale={scale}
          faceW={w * 0.86}
          faceH={h * 0.86}
          z={t / 2}
        />
      </mesh>
      {grommets.map(([x, y], i) => (
        <mesh key={i} position={[x, y, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.026, 0.01, 10, 20]} />
          <meshStandardMaterial color="#8a8d96" roughness={0.4} metalness={0.7} />
        </mesh>
      ))}
    </group>
  );
}

// ── Składana ulotka (trifold): trzy łamy ustawione harmonijkowo ─────────────
function Folded({
  imageUrl,
  scale,
}: {
  imageUrl: string | null;
  scale: number;
}) {
  const p = 0.46; // szerokość łamu
  const h = 1.12;
  const t = 0.008;
  const ang = 0.6;
  return (
    <group rotation={[-0.05, 0, 0]}>
      {/* łam środkowy z nadrukiem */}
      <mesh castShadow>
        <boxGeometry args={[p, h, t]} />
        <meshStandardMaterial color="#ffffff" roughness={0.8} metalness={0} />
        <Design
          imageUrl={imageUrl}
          scale={scale}
          faceW={p * 0.9}
          faceH={h * 0.92}
          z={t / 2}
        />
      </mesh>
      {/* łam lewy, zawiasowany na lewej krawędzi środkowego */}
      <group position={[-p / 2, 0, 0]} rotation={[0, ang, 0]}>
        <mesh position={[-p / 2, 0, 0]} castShadow>
          <boxGeometry args={[p, h, t]} />
          <meshStandardMaterial color="#f4f4f6" roughness={0.85} metalness={0} />
        </mesh>
      </group>
      {/* łam prawy */}
      <group position={[p / 2, 0, 0]} rotation={[0, -ang, 0]}>
        <mesh position={[p / 2, 0, 0]} castShadow>
          <boxGeometry args={[p, h, t]} />
          <meshStandardMaterial color="#f4f4f6" roughness={0.85} metalness={0} />
        </mesh>
      </group>
    </group>
  );
}

// ── Książka / broszura: okładka + grzbiet + widoczne kartki ─────────────────
function Book({
  aspect,
  depth,
  imageUrl,
  scale,
}: {
  aspect: number;
  depth: number;
  imageUrl: string | null;
  scale: number;
}) {
  const { w, h } = planeSize(aspect);
  return (
    <group rotation={[-0.1, -0.6, 0]}>
      {/* blok kartek — odrobinę mniejszy, kremowy, wystaje na krawędziach */}
      <mesh position={[0.01, 0, 0]}>
        <boxGeometry args={[w * 0.99, h * 0.97, depth * 0.92]} />
        <meshStandardMaterial color="#efe9dc" roughness={1} metalness={0} />
      </mesh>
      {/* okładka */}
      <mesh castShadow>
        <boxGeometry args={[w, h, depth]} />
        <meshStandardMaterial color="#ffffff" roughness={0.7} metalness={0} />
        <Design
          imageUrl={imageUrl}
          scale={scale}
          faceW={w * 0.9}
          faceH={h * 0.92}
          z={depth / 2}
        />
      </mesh>
    </group>
  );
}

function Shape({
  shape,
  aspect,
  imageUrl,
  scale,
}: {
  shape: PrintShape;
  aspect: number;
  imageUrl: string | null;
  scale: number;
}) {
  switch (shape) {
    case "sheet":
      return (
        <FlatPanel
          aspect={aspect}
          thickness={0.01}
          edgeColor="#ffffff"
          imageUrl={imageUrl}
          scale={scale}
        />
      );
    case "card":
      return (
        <FlatPanel
          aspect={aspect}
          thickness={0.025}
          edgeColor="#f7f7f8"
          imageUrl={imageUrl}
          scale={scale}
        />
      );
    case "board":
      return (
        <FlatPanel
          aspect={aspect}
          thickness={0.07}
          edgeColor="#e3e4e8"
          imageUrl={imageUrl}
          scale={scale}
        />
      );
    case "rollup":
      return <Rollup aspect={aspect} imageUrl={imageUrl} scale={scale} />;
    case "banner":
      return <Banner aspect={aspect} imageUrl={imageUrl} scale={scale} />;
    case "folded":
      return <Folded imageUrl={imageUrl} scale={scale} />;
    case "book":
      return (
        <Book aspect={aspect} depth={0.12} imageUrl={imageUrl} scale={scale} />
      );
    case "book-thick":
      return (
        <Book aspect={aspect} depth={0.22} imageUrl={imageUrl} scale={scale} />
      );
  }
}

export default function Print3DScene({
  shape,
  aspect,
  imageUrl,
  scale,
}: {
  shape: PrintShape;
  aspect: number;
  imageUrl: string | null;
  scale: number;
}) {
  return (
    <Canvas
      camera={{ position: [0, 0, 3.8], fov: 30 }}
      gl={{ preserveDrawingBuffer: true }}
      dpr={[1, 2]}
    >
      <ambientLight intensity={0.75} />
      <directionalLight position={[2, 3, 4]} intensity={1.1} />
      <directionalLight position={[-3, 2, -2]} intensity={0.4} />
      <directionalLight position={[0, 0, 5]} intensity={0.35} />
      <Suspense fallback={null}>
        <Center key={shape}>
          <Shape
            shape={shape}
            aspect={aspect}
            imageUrl={imageUrl}
            scale={scale}
          />
        </Center>
      </Suspense>
      <OrbitControls
        enablePan={false}
        minPolarAngle={Math.PI / 3.2}
        maxPolarAngle={Math.PI / 1.7}
        minDistance={2.6}
        maxDistance={6}
      />
    </Canvas>
  );
}
