"use client";

import { Canvas } from "@react-three/fiber";
import { Decal, OrbitControls, useTexture } from "@react-three/drei";
import { Suspense } from "react";
import * as THREE from "three";

type BagKind = "bag" | "tote";

// Torby budujemy proceduralnie (box + uchwyty z łuków torusa) — bez modeli
// .glb nie ma kwestii licencji ani dodatkowych megabajtów do pobrania.
const KINDS: Record<
  BagKind,
  {
    /** [szer, wys, głęb] korpusu */
    body: [number, number, number];
    bodyColor: string;
    handleColor: string;
    /** promień łuku uchwytu i grubość rurki */
    handleRadius: number;
    handleTube: number;
    /** odsunięcie uchwytów od środka w osi Z (przód/tył) */
    handleZ: number;
    /** środek nadruku w osi Y (względem środka korpusu) */
    decalY: number;
  }
> = {
  bag: {
    body: [1.0, 1.25, 0.5],
    bodyColor: "#ffffff",
    // skręcany papierowy uchwyt — naturalny brąz
    handleColor: "#c9a36b",
    handleRadius: 0.17,
    handleTube: 0.022,
    handleZ: 0.17,
    decalY: -0.05,
  },
  tote: {
    body: [1.0, 1.05, 0.22],
    // naturalna, niebielona bawełna
    bodyColor: "#f6f1e6",
    handleColor: "#efe8da",
    handleRadius: 0.3,
    handleTube: 0.03,
    handleZ: 0.0,
    decalY: -0.08,
  },
};

// Nadruk z zachowaniem proporcji obrazka (fit-inside) — jak na koszulce.
function DesignDecal({
  imageUrl,
  scale,
  y,
  z,
}: {
  imageUrl: string;
  scale: number;
  y: number;
  z: number;
}) {
  // Configure the texture inside useTexture's onLoad callback — mutating the
  // hook's return value directly during render is disallowed (react-hooks).
  const texture = useTexture(imageUrl, (t) => {
    t.colorSpace = THREE.SRGBColorSpace;
    t.anisotropy = 8;
  });
  // suwak 40–100 → szerokość nadruku na ściance (korpus ma szerokość 1.0)
  const decalScale = 0.22 + (scale / 100) * 0.4;
  const img = texture.image as { width?: number; height?: number };
  const aspect = img?.width && img?.height ? img.width / img.height : 1;
  const w = aspect >= 1 ? decalScale : decalScale * aspect;
  const h = aspect >= 1 ? decalScale / aspect : decalScale;
  return (
    <Decal position={[0, y, z]} rotation={[0, 0, 0]} scale={[w, h, 0.3]}>
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

function BagModel({
  kind,
  imageUrl,
  scale,
}: {
  kind: BagKind;
  imageUrl: string | null;
  scale: number;
}) {
  const cfg = KINDS[kind];
  const [bw, bh, bd] = cfg.body;
  const topY = bh / 2;
  return (
    <group position={[0, -0.08, 0]}>
      <mesh castShadow>
        <boxGeometry args={[bw, bh, bd]} />
        <meshStandardMaterial
          color={cfg.bodyColor}
          roughness={1}
          metalness={0}
        />
        {imageUrl && (
          <DesignDecal
            imageUrl={imageUrl}
            scale={scale}
            y={cfg.decalY}
            z={bd / 2}
          />
        )}
      </mesh>
      {/* uchwyty: łuki torusa nad górną krawędzią, przód i tył */}
      {[cfg.handleZ, -cfg.handleZ].map((z) => (
        <mesh key={z} position={[0, topY, z]}>
          <torusGeometry
            args={[cfg.handleRadius, cfg.handleTube, 12, 32, Math.PI]}
          />
          <meshStandardMaterial
            color={cfg.handleColor}
            roughness={0.9}
            metalness={0}
          />
        </mesh>
      ))}
    </group>
  );
}

export default function Bag3DPreview({
  kind,
  imageUrl,
  scale,
}: {
  kind: BagKind;
  imageUrl: string | null;
  scale: number;
}) {
  return (
    <Canvas
      camera={{ position: [0, 0, 3.6], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}
      dpr={[1, 2]}
    >
      <ambientLight intensity={0.7} />
      <directionalLight position={[2, 3, 4]} intensity={1.1} />
      <directionalLight position={[-3, 2, -2]} intensity={0.4} />
      <Suspense fallback={null}>
        <BagModel kind={kind} imageUrl={imageUrl} scale={scale} />
      </Suspense>
      <OrbitControls
        enablePan={false}
        minPolarAngle={Math.PI / 2.6}
        maxPolarAngle={Math.PI / 1.9}
        minDistance={2.4}
        maxDistance={5}
      />
    </Canvas>
  );
}
