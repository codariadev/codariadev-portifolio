"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

function HeroAnimation() {
  const pointsRef = useRef<THREE.Points>(null!);

  const sphere = useMemo(() => {
    const count = 5000;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = 2 * Math.PI * Math.random();
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 1.5;
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);
      positions.set([x, y, z], i * 3);
    }
    return positions;
  }, []);

  const originalPositions = useMemo(() => sphere.slice(), [sphere]);

 useFrame(({ clock }, delta) => {
    if (!pointsRef.current) return;

    if (pointsRef.current.scale.x < 1) {
      pointsRef.current.scale.addScalar(delta * 1.5);
      
      if (pointsRef.current.scale.x > 1) pointsRef.current.scale.setScalar(1);
    } 
    else {
      const t = clock.getElapsedTime();
      const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;

      for (let i = 0; i < positions.length; i += 3) {
        const transition = Math.min((clock.getElapsedTime() - 0.5), 2);
        const wave = Math.sin(t * 1.5 + originalPositions[i] * 5) * 0.02 * transition;
        
        positions[i] = originalPositions[i] * (1 + wave);
        positions[i + 1] = originalPositions[i + 1] * (1 + wave);
        positions[i + 2] = originalPositions[i + 2] * (1 + wave);
      }
      pointsRef.current.geometry.attributes.position.needsUpdate = true;

      pointsRef.current.rotation.y += delta * 0.1;
      pointsRef.current.rotation.x += delta * 0.05;
    }
  });

  return (
    <Points 
      ref={pointsRef}
      positions={sphere} 
      stride={3} 
      frustumCulled={false}
      scale={0}
    >
      <PointMaterial
        transparent
        color="#87ceeb"
        size={0.02}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.8}
      />
    </Points>
  );
}

export default function OrbContainer() {
  return (
    <div style={{ width: "100%", height: "500px" }}>
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={0.5} />
        <HeroAnimation />
      </Canvas>
    </div>
  );
}