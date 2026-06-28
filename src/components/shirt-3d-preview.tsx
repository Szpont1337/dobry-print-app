"use client";

import { Canvas } from "@react-three/fiber";
import {
  Center,
  Decal,
  OrbitControls,
  useGLTF,
  useTexture,
} from "@react-three/drei";
import { Suspense } from "react";
import * as THREE from "three";
import type { GLTF } from "three-stdlib";

const MODEL_URL = "/models/shirt.glb";

type ShirtGLTF = GLTF & {
  nodes: { T_Shirt_male: THREE.Mesh };
  materials: { lambert1: THREE.MeshStandardMaterial };
};

// Nadruk jako naklejka (decal) rzutowana na klatkę piersiową modelu.
// Pozycja/rotacja dostrojone do tego konkretnego modelu koszulki.
function DesignDecal({
  imageUrl,
  scale,
}: {
  imageUrl: string;
  scale: number;
}) {
  // Configure the texture inside useTexture's onLoad callback — mutating the
  // hook's return value directly during render is disallowed (react-hooks).
  const texture = useTexture(imageUrl, (t) => {
    t.colorSpace = THREE.SRGBColorSpace;
    t.anisotropy = 8;
  });
  // suwak 40–100 → realny rozmiar naklejki na klatce piersiowej
  const decalScale = 0.08 + (scale / 100) * 0.16;
  // Zachowaj proporcje obrazka — decal wpasowany w kwadrat decalScale²
  // (skalar rozciągałby niekwadratowe PNG na kwadrat).
  const img = texture.image as { width?: number; height?: number };
  const aspect = img?.width && img?.height ? img.width / img.height : 1;
  const w = aspect >= 1 ? decalScale : decalScale * aspect;
  const h = aspect >= 1 ? decalScale / aspect : decalScale;
  return (
    <Decal
      position={[0, 0.04, 0.15]}
      rotation={[0, 0, 0]}
      scale={[w, h, decalScale]}
    >
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

function ShirtModel({
  imageUrl,
  scale,
}: {
  imageUrl: string | null;
  scale: number;
}) {
  const { nodes } = useGLTF(MODEL_URL) as unknown as ShirtGLTF;
  return (
    <Center>
      <mesh
        castShadow
        geometry={nodes.T_Shirt_male.geometry}
        dispose={null}
      >
        <meshStandardMaterial color="#ffffff" roughness={1} metalness={0} />
        {imageUrl && <DesignDecal imageUrl={imageUrl} scale={scale} />}
      </mesh>
    </Center>
  );
}

export default function Shirt3DPreview({
  imageUrl,
  scale,
}: {
  imageUrl: string | null;
  scale: number;
}) {
  return (
    <Canvas
      camera={{ position: [0, 0, 2.4], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}
      dpr={[1, 2]}
    >
      <ambientLight intensity={0.7} />
      <directionalLight position={[2, 3, 4]} intensity={1.1} />
      <directionalLight position={[-3, 2, -2]} intensity={0.4} />
      <Suspense fallback={null}>
        <ShirtModel imageUrl={imageUrl} scale={scale} />
      </Suspense>
      <OrbitControls
        enablePan={false}
        minPolarAngle={Math.PI / 2.6}
        maxPolarAngle={Math.PI / 1.9}
        minDistance={1.6}
        maxDistance={3.2}
      />
    </Canvas>
  );
}

useGLTF.preload(MODEL_URL);
