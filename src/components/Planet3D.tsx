import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Stars, MeshDistortMaterial } from '@react-three/drei';
import { useRef, useState, useCallback, useEffect } from 'react';
import * as THREE from 'three';
import type { AstronomyData } from '../types';

// ─── Determine planet personality from astronomical state ─────────────────────
function getPlanetPersonality(astro?: AstronomyData) {
  if (!astro) return { color: '#5b21b6', emissive: '#4c1d95', glow: '#818cf8', label: null };

  if (astro.moon.illumination > 80) {
    // Full Moon — silver-white
    return { color: '#c7d2fe', emissive: '#93c5fd', glow: '#e0f2fe', label: '🌕 Full Moon' };
  }
  if (astro.moon.illumination < 10) {
    // New Moon — deep dark blue
    return { color: '#1e1b4b', emissive: '#312e81', glow: '#4338ca', label: '🌑 New Moon' };
  }
  if (astro.mars.distance < 0.8) {
    // Mars close — red-orange
    return { color: '#9f1239', emissive: '#7f1d1d', glow: '#fb923c', label: '♂ Mars Rising' };
  }
  if (astro.venus.distance < 0.8) {
    // Venus close — warm gold
    return { color: '#713f12', emissive: '#78350f', glow: '#fde68a', label: '♀ Venus Approach' };
  }
  if (astro.mercury.retrograde) {
    // Mercury retrograde — murky green
    return { color: '#14532d', emissive: '#166534', glow: '#86efac', label: '☿ Retrograde' };
  }
  // Default — cosmic purple
  return { color: '#5b21b6', emissive: '#4c1d95', glow: '#818cf8', label: null };
}

// ─── Spark particle that flies outward from click point ───────────────────────
interface Spark {
  id: number;
  position: THREE.Vector3;
  velocity: THREE.Vector3;
  life: number;
  maxLife: number;
  color: THREE.Color;
  size: number;
}

function SparkSystem({ sparks }: { sparks: Spark[] }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummyRef = useRef(new THREE.Object3D());

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    const dummy = dummyRef.current;
    sparks.forEach((spark, i) => {
      spark.position.addScaledVector(spark.velocity, delta);
      spark.velocity.multiplyScalar(0.92); // drag
      spark.life -= delta;

      const scale = Math.max(0, (spark.life / spark.maxLife)) * spark.size;
      dummy.position.copy(spark.position);
      dummy.scale.setScalar(scale);
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);

      const alpha = spark.life / spark.maxLife;
      meshRef.current!.setColorAt(i, spark.color.clone().multiplyScalar(alpha));
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
    if (meshRef.current.instanceColor) meshRef.current.instanceColor.needsUpdate = true;
  });

  if (sparks.length === 0) return null;

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, sparks.length]}>
      <sphereGeometry args={[1, 6, 6]} />
      <meshBasicMaterial vertexColors />
    </instancedMesh>
  );
}

// ─── Ripple ring that expands outward on click ────────────────────────────────
interface RippleRing {
  id: number;
  scale: number;
  opacity: number;
  color: string;
}

function RippleRings({ rings }: { rings: RippleRing[] }) {
  return (
    <>
      {rings.map((ring) => (
        <mesh key={ring.id} rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[ring.scale * 1.8, ring.scale * 1.85, 48]} />
          <meshBasicMaterial
            color={ring.color}
            transparent
            opacity={ring.opacity}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </>
  );
}

// ─── The planet itself ────────────────────────────────────────────────────────
interface RotatingPlanetProps {
  active: boolean;
  squish: number; // 0–1, peaks on click
  personality: ReturnType<typeof getPlanetPersonality>;
  onPlanetClick: (point: THREE.Vector3) => void;
}

function RotatingPlanet({ active, squish, personality, onPlanetClick }: RotatingPlanetProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const atmosphereRef = useRef<THREE.Mesh>(null);
  const matRef = useRef<any>(null);
  const { gl } = useThree();

  // Smooth color interpolation
  const targetColor = new THREE.Color(personality.color);
  const targetEmissive = new THREE.Color(personality.emissive);
  const currentColor = useRef(new THREE.Color(personality.color));
  const currentEmissive = useRef(new THREE.Color(personality.emissive));

  useFrame((state, delta) => {
    if (!meshRef.current || !matRef.current) return;

    // Rotate
    meshRef.current.rotation.y += delta * (active ? 1.4 : 0.2);
    meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.35) * 0.07;

    // Squish scale
    const squishY = 1 - squish * 0.22;
    const squishXZ = 1 + squish * 0.13;
    meshRef.current.scale.set(squishXZ, squishY, squishXZ);

    // Lerp distort for squish feel
    const targetDistort = active ? 0.42 : 0.16 + squish * 0.4;
    matRef.current.distort = THREE.MathUtils.lerp(matRef.current.distort, targetDistort, delta * 5);

    // Color lerp
    currentColor.current.lerp(targetColor, delta * 1.5);
    currentEmissive.current.lerp(targetEmissive, delta * 1.5);
    matRef.current.color = currentColor.current;
    matRef.current.emissive = currentEmissive.current;
    matRef.current.emissiveIntensity = THREE.MathUtils.lerp(
      matRef.current.emissiveIntensity,
      active ? 1.0 : 0.35 + squish * 0.6,
      delta * 4
    );

    if (atmosphereRef.current) {
      atmosphereRef.current.rotation.y -= delta * 0.07;
    }
  });

  const handleClick = useCallback(
    (e: any) => {
      e.stopPropagation();
      const point = e.point as THREE.Vector3;
      onPlanetClick(point);
      gl.domElement.style.cursor = 'pointer';
    },
    [onPlanetClick, gl]
  );

  return (
    <>
      <mesh
        ref={meshRef}
        onClick={handleClick}
        onPointerOver={() => { gl.domElement.style.cursor = 'pointer'; }}
        onPointerOut={() => { gl.domElement.style.cursor = 'auto'; }}
      >
        <sphereGeometry args={[1.8, 64, 64]} />
        <MeshDistortMaterial
          ref={matRef}
          color={personality.color}
          emissive={personality.emissive}
          emissiveIntensity={0.35}
          distort={0.16}
          speed={active ? 5 : 2}
          roughness={0.12}
          metalness={0.35}
        />
      </mesh>

      {/* Atmosphere glow */}
      <mesh ref={atmosphereRef} scale={1.14}>
        <sphereGeometry args={[1.8, 32, 32]} />
        <meshStandardMaterial
          color={personality.glow}
          transparent
          opacity={active ? 0.16 : 0.07}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Outer halo */}
      <mesh scale={1.32}>
        <sphereGeometry args={[1.8, 16, 16]} />
        <meshStandardMaterial
          color={personality.glow}
          transparent
          opacity={active ? 0.05 : 0.02}
          side={THREE.BackSide}
        />
      </mesh>
    </>
  );
}

// ─── Scene root ───────────────────────────────────────────────────────────────
interface SceneProps {
  active: boolean;
  personality: ReturnType<typeof getPlanetPersonality>;
}

function Scene({ active, personality }: SceneProps) {
  const [sparks, setSparks] = useState<Spark[]>([]);
  const [rings, setRings] = useState<RippleRing[]>([]);
  const [squish, setSquish] = useState(0);
  const sparkIdRef = useRef(0);
  const ringIdRef = useRef(0);
  const squishRef = useRef(0);

  // Decay squish each frame
  useFrame((_, delta) => {
    squishRef.current = Math.max(0, squishRef.current - delta * 3.5);
    setSquish(squishRef.current);

    // Age sparks
    setSparks((prev) => prev.filter((s) => s.life > 0).map((s) => ({ ...s, life: s.life - delta })));
    // Age rings
    setRings((prev) =>
      prev
        .filter((r) => r.opacity > 0)
        .map((r) => ({ ...r, scale: r.scale + delta * 1.8, opacity: r.opacity - delta * 1.4 }))
    );
  });

  const handlePlanetClick = useCallback(
    (point: THREE.Vector3) => {
      squishRef.current = 1;

      // Spawn sparks
      const glowColor = new THREE.Color(personality.glow);
      const baseColor = new THREE.Color(personality.color);
      const newSparks: Spark[] = Array.from({ length: 18 }, () => {
        const dir = new THREE.Vector3(
          (Math.random() - 0.5) * 2,
          (Math.random() - 0.5) * 2,
          (Math.random() - 0.5) * 2
        )
          .normalize()
          .multiplyScalar(2.5 + Math.random() * 2);
        return {
          id: sparkIdRef.current++,
          position: point.clone(),
          velocity: dir,
          life: 0.6 + Math.random() * 0.5,
          maxLife: 0.6 + Math.random() * 0.5,
          color: Math.random() > 0.5 ? glowColor.clone() : baseColor.clone(),
          size: 0.05 + Math.random() * 0.08,
        };
      });

      // Spawn ripple rings
      const newRings: RippleRing[] = [
        { id: ringIdRef.current++, scale: 1, opacity: 0.7, color: personality.glow },
        { id: ringIdRef.current++, scale: 0.9, opacity: 0.5, color: personality.color },
      ];

      setSparks((prev) => [...prev.slice(-60), ...newSparks]);
      setRings((prev) => [...prev.slice(-8), ...newRings]);
    },
    [personality]
  );

  return (
    <>
      <ambientLight intensity={0.22} />
      <pointLight position={[6, 5, 5]} intensity={2.8} color={personality.glow} />
      <pointLight position={[-6, -4, 4]} intensity={1.4} color="#67e8f9" />
      <pointLight position={[0, -8, 2]} intensity={0.5} color={personality.color} />
      <Stars
        radius={90}
        depth={60}
        count={4500}
        factor={3.5}
        saturation={0.8}
        fade
        speed={active ? 1.5 : 0.4}
      />
      <RotatingPlanet
        active={active}
        squish={squish}
        personality={personality}
        onPlanetClick={handlePlanetClick}
      />
      <SparkSystem sparks={sparks} />
      <RippleRings rings={rings} />
    </>
  );
}

// ─── Exported component ───────────────────────────────────────────────────────
interface Planet3DProps {
  active?: boolean;
  astro?: AstronomyData;
}

export default function Planet3D({ active = false, astro }: Planet3DProps) {
  const personality = getPlanetPersonality(astro);

  return (
    <div className="relative w-full" style={{ height: '320px' }}>
      <Canvas camera={{ position: [0, 0, 5.5], fov: 48 }}>
        <Scene active={active} personality={personality} />
      </Canvas>
      {personality.label && (
        <div
          className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-mono tracking-widest pointer-events-none"
          style={{
            background: 'rgba(0,0,0,0.5)',
            border: `1px solid ${personality.glow}44`,
            color: personality.glow,
          }}
        >
          {personality.label}
        </div>
      )}
    </div>
  );
}
