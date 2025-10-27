import * as THREE from 'three';

interface FoodCanProps {
  position: [number, number, number];
}

export const FoodCan = ({ position }: FoodCanProps) => {
  return (
    <group position={position}>
      <mesh position={[0, 0.15, 0]}>
        <cylinderGeometry args={[0.15, 0.15, 0.3, 16]} />
        <meshStandardMaterial color="#C0C0C0" />
      </mesh>
      <mesh position={[0, 0.31, 0]}>
        <cylinderGeometry args={[0.16, 0.16, 0.02, 16]} />
        <meshStandardMaterial color="#FFD700" />
      </mesh>
    </group>
  );
};
