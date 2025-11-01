import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface PersonProps {
  position: [number, number, number];
  hairStyle: 'long' | 'short';
  hasChristmasSweater?: boolean;
  moveSpeed: number;
  moveRange: { x: [number, number]; z: [number, number] };
}

export const Person = ({ position: initialPosition, hairStyle, hasChristmasSweater, moveSpeed, moveRange }: PersonProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const direction = useRef(new THREE.Vector3(
    (Math.random() - 0.5) * 2,
    0,
    (Math.random() - 0.5) * 2
  ).normalize());
  const currentPos = useRef(new THREE.Vector3(...initialPosition));

  useFrame((state, delta) => {
    if (groupRef.current) {
      const movement = direction.current.clone().multiplyScalar(moveSpeed * delta);
      currentPos.current.add(movement);

      // Building collision detection
      const buildings = [
        { x: -15, z: -5, width: 5, depth: 5 },
        { x: 15, z: 10, width: 4, depth: 4 },
        { x: -15, z: 15, width: 6, depth: 6 },
        { x: 10, z: 15, width: 5, depth: 4 },
        { x: -8, z: -12, width: 12, depth: 8 },
        { x: 18, z: -8, width: 4, depth: 3 },
        { x: 18, z: -18, width: 8, depth: 6 }
      ];
      
      let validPosition = true;
      for (const building of buildings) {
        const dx = Math.abs(currentPos.current.x - building.x);
        const dz = Math.abs(currentPos.current.z - building.z);
        if (dx < building.width / 2 + 1 && dz < building.depth / 2 + 1) {
          validPosition = false;
          direction.current.negate();
          currentPos.current.sub(movement);
          break;
        }
      }

      if (currentPos.current.x < moveRange.x[0] || currentPos.current.x > moveRange.x[1]) {
        direction.current.x *= -1;
        currentPos.current.x = THREE.MathUtils.clamp(currentPos.current.x, moveRange.x[0], moveRange.x[1]);
      }
      if (currentPos.current.z < moveRange.z[0] || currentPos.current.z > moveRange.z[1]) {
        direction.current.z *= -1;
        currentPos.current.z = THREE.MathUtils.clamp(currentPos.current.z, moveRange.z[0], moveRange.z[1]);
      }

      groupRef.current.position.copy(currentPos.current);
      
      const angle = Math.atan2(direction.current.x, direction.current.z);
      groupRef.current.rotation.y = angle;
    }
  });

  // Random clothing colors for variety
  const tshirtColors = ["#FF6B6B", "#4ECDC4", "#45B7D1", "#FFA07A", "#98D8C8", "#F7DC6F", "#BB8FCE"];
  const randomTshirt = tshirtColors[Math.floor(Math.random() * tshirtColors.length)];
  const bodyColor = hasChristmasSweater ? "#DC143C" : randomTshirt;
  const pantsColor = hasChristmasSweater ? "#2F4F4F" : "#2C3E50";

  // Scale factor to make people bigger
  const scale = 1.5;

  return (
    <group ref={groupRef} position={initialPosition} scale={[scale, scale, scale]}>
      {/* T-shirt */}
      <mesh position={[0, 0.7, 0]}>
        <boxGeometry args={[0.4, 0.6, 0.3]} />
        <meshStandardMaterial color={bodyColor} />
      </mesh>

      {/* Christmas Sweater Decoration */}
      {hasChristmasSweater && (
        <>
          <mesh position={[0, 0.8, 0.16]}>
            <boxGeometry args={[0.15, 0.15, 0.02]} />
            <meshStandardMaterial color="#8B4513" />
          </mesh>
          <mesh position={[-0.05, 0.85, 0.17]}>
            <sphereGeometry args={[0.03, 8, 8]} />
            <meshStandardMaterial color="#FFD700" />
          </mesh>
          <mesh position={[0.05, 0.85, 0.17]}>
            <sphereGeometry args={[0.03, 8, 8]} />
            <meshStandardMaterial color="#FFD700" />
          </mesh>
        </>
      )}

      {/* Head */}
      <mesh position={[0, 1.2, 0]}>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshStandardMaterial color="#FFDAB9" />
      </mesh>

      {/* Eyes with whites */}
      <mesh position={[-0.08, 1.25, 0.18]}>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshStandardMaterial color="#FFFFFF" />
      </mesh>
      <mesh position={[-0.08, 1.25, 0.2]}>
        <sphereGeometry args={[0.02, 8, 8]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
      <mesh position={[0.08, 1.25, 0.18]}>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshStandardMaterial color="#FFFFFF" />
      </mesh>
      <mesh position={[0.08, 1.25, 0.2]}>
        <sphereGeometry args={[0.02, 8, 8]} />
        <meshStandardMaterial color="#000000" />
      </mesh>

      {/* Mouth */}
      <mesh position={[0, 1.15, 0.19]}>
        <boxGeometry args={[0.08, 0.02, 0.01]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>

      {/* Hair - natural and straight */}
      {hairStyle === 'long' ? (
        <>
          {/* Long hair - natural straight style */}
          <mesh position={[0, 1.35, 0]}>
            <boxGeometry args={[0.25, 0.15, 0.25]} />
            <meshStandardMaterial color="#654321" />
          </mesh>
          <mesh position={[0, 1.15, -0.02]}>
            <boxGeometry args={[0.24, 0.35, 0.22]} />
            <meshStandardMaterial color="#654321" />
          </mesh>
          <mesh position={[-0.15, 1.0, 0]}>
            <boxGeometry args={[0.08, 0.4, 0.2]} />
            <meshStandardMaterial color="#654321" />
          </mesh>
          <mesh position={[0.15, 1.0, 0]}>
            <boxGeometry args={[0.08, 0.4, 0.2]} />
            <meshStandardMaterial color="#654321" />
          </mesh>
        </>
      ) : (
        <>
          {/* Short hair - natural cut */}
          <mesh position={[0, 1.35, 0]}>
            <boxGeometry args={[0.24, 0.18, 0.24]} />
            <meshStandardMaterial color="#2c1810" />
          </mesh>
          <mesh position={[0, 1.25, 0.03]}>
            <boxGeometry args={[0.22, 0.22, 0.2]} />
            <meshStandardMaterial color="#2c1810" />
          </mesh>
        </>
      )}

      {/* Arms */}
      <mesh position={[-0.25, 0.7, 0]} rotation={[0, 0, 0.3]}>
        <cylinderGeometry args={[0.06, 0.06, 0.5, 8]} />
        <meshStandardMaterial color="#FFDAB9" />
      </mesh>
      <mesh position={[0.25, 0.7, 0]} rotation={[0, 0, -0.3]}>
        <cylinderGeometry args={[0.06, 0.06, 0.5, 8]} />
        <meshStandardMaterial color="#FFDAB9" />
      </mesh>

      {/* Legs */}
      <mesh position={[-0.1, 0.25, 0]}>
        <cylinderGeometry args={[0.08, 0.08, 0.5, 8]} />
        <meshStandardMaterial color={pantsColor} />
      </mesh>
      <mesh position={[0.1, 0.25, 0]}>
        <cylinderGeometry args={[0.08, 0.08, 0.5, 8]} />
        <meshStandardMaterial color={pantsColor} />
      </mesh>
    </group>
  );
};
