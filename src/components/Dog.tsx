import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface DogProps {
  position: [number, number, number];
  rotation: number;
  isMoving: boolean;
}

export const Dog = ({ position, rotation, isMoving }: DogProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const tailRef = useRef<THREE.Mesh>(null);
  const leftEarRef = useRef<THREE.Mesh>(null);
  const rightEarRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (tailRef.current && isMoving) {
      tailRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 8) * 0.5 + 0.3;
    } else if (tailRef.current) {
      tailRef.current.rotation.x = 0.3;
    }

    if (leftEarRef.current && rightEarRef.current) {
      const bounce = Math.sin(state.clock.elapsedTime * 6) * 0.1;
      leftEarRef.current.position.y = 0.55 + bounce;
      rightEarRef.current.position.y = 0.55 + bounce;
    }
  });

  useEffect(() => {
    if (groupRef.current) {
      groupRef.current.position.set(...position);
      groupRef.current.rotation.y = rotation;
    }
  }, [position, rotation]);

  return (
    <group ref={groupRef}>
      {/* Body */}
      <mesh position={[0, 0.3, 0]}>
        <boxGeometry args={[0.6, 0.4, 0.8]} />
        <meshStandardMaterial color="#D2691E" />
      </mesh>

      {/* Head */}
      <mesh position={[0, 0.6, 0.3]}>
        <boxGeometry args={[0.5, 0.5, 0.5]} />
        <meshStandardMaterial color="#D2691E" />
      </mesh>

      {/* Snout */}
      <mesh position={[0, 0.5, 0.6]}>
        <boxGeometry args={[0.3, 0.2, 0.3]} />
        <meshStandardMaterial color="#CD853F" />
      </mesh>

      {/* Nose */}
      <mesh position={[0, 0.55, 0.75]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color="#000000" />
      </mesh>

      {/* Left Eye */}
      <group position={[-0.15, 0.65, 0.5]}>
        <mesh>
          <sphereGeometry args={[0.12, 16, 16]} />
          <meshStandardMaterial color="#FFFFFF" />
        </mesh>
        <mesh position={[0, 0, 0.1]}>
          <sphereGeometry args={[0.06, 16, 16]} />
          <meshStandardMaterial color="#000000" />
        </mesh>
      </group>

      {/* Right Eye */}
      <group position={[0.15, 0.65, 0.5]}>
        <mesh>
          <sphereGeometry args={[0.12, 16, 16]} />
          <meshStandardMaterial color="#FFFFFF" />
        </mesh>
        <mesh position={[0, 0, 0.1]}>
          <sphereGeometry args={[0.06, 16, 16]} />
          <meshStandardMaterial color="#000000" />
        </mesh>
      </group>

      {/* Left Ear */}
      <mesh ref={leftEarRef} position={[-0.2, 0.55, 0.2]} rotation={[0, 0, -0.3]}>
        <boxGeometry args={[0.15, 0.3, 0.1]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>

      {/* Right Ear */}
      <mesh ref={rightEarRef} position={[0.2, 0.55, 0.2]} rotation={[0, 0, 0.3]}>
        <boxGeometry args={[0.15, 0.3, 0.1]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>

      {/* Tail */}
      <mesh ref={tailRef} position={[0, 0.4, -0.5]} rotation={[0.3, 0, 0]}>
        <cylinderGeometry args={[0.08, 0.05, 0.5, 8]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>

      {/* Legs */}
      <mesh position={[-0.2, 0.05, 0.25]}>
        <cylinderGeometry args={[0.08, 0.08, 0.3, 8]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
      <mesh position={[0.2, 0.05, 0.25]}>
        <cylinderGeometry args={[0.08, 0.08, 0.3, 8]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
      <mesh position={[-0.2, 0.05, -0.25]}>
        <cylinderGeometry args={[0.08, 0.08, 0.3, 8]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
      <mesh position={[0.2, 0.05, -0.25]}>
        <cylinderGeometry args={[0.08, 0.08, 0.3, 8]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
    </group>
  );
};
