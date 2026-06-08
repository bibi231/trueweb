"use client";

import { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, MeshDistortMaterial, Float, Icosahedron, TorusKnot } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";

function FloatingShape({ position, color, size = 1, speed = 1 }: { position: [number, number, number]; color: string; size?: number; speed?: number }) {
  const meshRef = useRef<THREE.Mesh>(null!);
  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = state.clock.elapsedTime * 0.12 * speed;
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.08 * speed;
  });

  return (
    <Float speed={2 * speed} rotationIntensity={0.3} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position}>
        <Icosahedron args={[size, 1]}>
          <MeshDistortMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.6}
            metalness={0.8}
            roughness={0.1}
            distort={0.2}
            speed={2}
            transparent
            opacity={0.7}
            wireframe={false}
          />
        </Icosahedron>
      </mesh>
    </Float>
  );
}

function RotatingKnot() {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.x = state.clock.elapsedTime * 0.05;
    ref.current.rotation.y = state.clock.elapsedTime * 0.08;
  });
  return (
    <Float speed={1} rotationIntensity={0.1} floatIntensity={0.3}>
      <mesh ref={ref} position={[3, -1, -2]}>
        <TorusKnot args={[0.6, 0.18, 128, 16]}>
          <meshStandardMaterial
            color="#00d4d4"
            emissive="#00a8a8"
            emissiveIntensity={0.5}
            metalness={0.9}
            roughness={0.05}
            transparent
            opacity={0.5}
          />
        </TorusKnot>
      </mesh>
    </Float>
  );
}

export function Scene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 55 }}
      gl={{ antialias: true, alpha: true }}
      style={{ position: "absolute", inset: 0, zIndex: 0 }}
      dpr={[1, 1.5]}
    >
      <fog attach="fog" args={["#050507", 12, 22]} />
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={2} color="#00d4d4" />
      <pointLight position={[-5, -3, -5]} intensity={1} color="#6366f1" />

      <Suspense fallback={null}>
        <FloatingShape position={[-3.5, 1.5, -1]} color="#00d4d4" size={0.7} speed={0.9} />
        <FloatingShape position={[3, 2, -3]} color="#6366f1" size={0.5} speed={1.2} />
        <FloatingShape position={[-2, -2, -2]} color="#00a8a8" size={0.4} speed={0.7} />
        <FloatingShape position={[1.5, -1.5, 1]} color="#818cf8" size={0.35} speed={1.4} />
        <RotatingKnot />
      </Suspense>

      <EffectComposer>
        <Bloom luminanceThreshold={0.2} luminanceSmoothing={0.9} intensity={1.2} />
      </EffectComposer>

      <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI * 0.6} minPolarAngle={Math.PI * 0.4} autoRotate autoRotateSpeed={0.4} />
    </Canvas>
  );
}
