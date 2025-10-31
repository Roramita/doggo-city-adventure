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

      {/* Hair - softer rounded style */}
      {hairStyle === 'long' ? (
        <>
          {/* Top of head - rounded */}
          <mesh position={[0, 1.38, 0]}>
            <sphereGeometry args={[0.18, 12, 12]} />
            <meshStandardMaterial color="#654321" />
          </mesh>
          {/* Side hair - softer */}
          <mesh position={[-0.15, 1.15, 0]}>
            <sphereGeometry args={[0.12, 10, 10]} />
            <meshStandardMaterial color="#654321" />
          </mesh>
          <mesh position={[0.15, 1.15, 0]}>
            <sphereGeometry args={[0.12, 10, 10]} />
            <meshStandardMaterial color="#654321" />
          </mesh>
          {/* Lower side hair */}
          <mesh position={[-0.15, 0.95, 0]}>
            <sphereGeometry args={[0.1, 10, 10]} />
            <meshStandardMaterial color="#654321" />
          </mesh>
          <mesh position={[0.15, 0.95, 0]}>
            <sphereGeometry args={[0.1, 10, 10]} />
            <meshStandardMaterial color="#654321" />
          </mesh>
          {/* Back hair - rounded */}
          <mesh position={[0, 1.2, -0.15]}>
            <sphereGeometry args={[0.15, 10, 10]} />
            <meshStandardMaterial color="#654321" />
          </mesh>
          <mesh position={[0, 1.0, -0.15]}>
            <sphereGeometry args={[0.13, 10, 10]} />
            <meshStandardMaterial color="#654321" />
          </mesh>
        </>
      ) : (
        <>
          {/* Top for short hair - rounded */}
          <mesh position={[0, 1.38, 0]}>
            <sphereGeometry args={[0.16, 12, 12]} />
            <meshStandardMaterial color="#654321" />
          </mesh>
          {/* Back short hair */}
          <mesh position={[0, 1.28, -0.12]}>
            <sphereGeometry args={[0.12, 10, 10]} />
            <meshStandardMaterial color="#654321" />
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
