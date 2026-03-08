import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, MeshDistortMaterial } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';

function RotatingPlanet({ active }: { active: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const atmosphereRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * (active ? 1.2 : 0.25);
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.4) * 0.08;
    }
    if (atmosphereRef.current) {
      atmosphereRef.current.rotation.y -= delta * 0.08;
      atmosphereRef.current.rotation.z += delta * 0.04;
    }
  });

  return (
    <>
      <mesh ref={meshRef}>
        <sphereGeometry args={[1.8, 64, 64]} />
        <MeshDistortMaterial
          color="#5b21b6"
          emissive="#4c1d95"
          emissiveIntensity={active ? 0.9 : 0.35}
          distort={active ? 0.45 : 0.18}
          speed={active ? 5 : 1.8}
          roughness={0.15}
          metalness={0.4}
        />
      </mesh>

      {/* Inner glow ring */}
      <mesh ref={atmosphereRef} scale={1.12}>
        <sphereGeometry args={[1.8, 32, 32]} />
        <meshStandardMaterial
          color="#818cf8"
          transparent
          opacity={active ? 0.18 : 0.08}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Outer halo */}
      <mesh scale={1.28}>
        <sphereGeometry args={[1.8, 16, 16]} />
        <meshStandardMaterial
          color="#67e8f9"
          transparent
          opacity={active ? 0.06 : 0.025}
          side={THREE.BackSide}
        />
      </mesh>
    </>
  );
}

interface Planet3DProps {
  active?: boolean;
}

export default function Planet3D({ active = false }: Planet3DProps) {
  return (
    <div style={{ width: '100%', height: '320px' }}>
      <Canvas camera={{ position: [0, 0, 5.5], fov: 48 }}>
        <ambientLight intensity={0.25} />
        <pointLight position={[6, 5, 5]} intensity={2.5} color="#a78bfa" />
        <pointLight position={[-6, -4, 4]} intensity={1.2} color="#67e8f9" />
        <pointLight position={[0, -8, 2]} intensity={0.6} color="#f0abfc" />
        <Stars
          radius={90}
          depth={60}
          count={4500}
          factor={3.5}
          saturation={0.8}
          fade
          speed={active ? 1.5 : 0.4}
        />
        <RotatingPlanet active={active} />
      </Canvas>
    </div>
  );
}
