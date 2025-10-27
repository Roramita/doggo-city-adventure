import * as THREE from 'three';

export const City = () => {
  return (
    <group>
      {/* Ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[50, 50]} />
        <meshStandardMaterial color="#696969" />
      </mesh>

      {/* Street */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]} receiveShadow>
        <planeGeometry args={[4, 50]} />
        <meshStandardMaterial color="#404040" />
      </mesh>

      {/* Street lines */}
      {Array.from({ length: 10 }).map((_, i) => (
        <mesh key={i} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, -20 + i * 5]}>
          <planeGeometry args={[0.2, 2]} />
          <meshStandardMaterial color="#FFFF00" />
        </mesh>
      ))}

      {/* Buildings */}
      {/* Building 1 - Tall */}
      <mesh position={[-8, 6, -5]} castShadow>
        <boxGeometry args={[4, 12, 4]} />
        <meshStandardMaterial color="#8B8B8B" />
      </mesh>
      
      {/* Building 2 - Medium */}
      <mesh position={[-8, 4, 3]} castShadow>
        <boxGeometry args={[3, 8, 3]} />
        <meshStandardMaterial color="#A9A9A9" />
      </mesh>

      {/* Building 3 - Short */}
      <mesh position={[-8, 2.5, 10]} castShadow>
        <boxGeometry args={[3.5, 5, 3.5]} />
        <meshStandardMaterial color="#778899" />
      </mesh>

      {/* Building 4 - Tall right side */}
      <mesh position={[8, 5.5, -8]} castShadow>
        <boxGeometry args={[3.5, 11, 3.5]} />
        <meshStandardMaterial color="#696969" />
      </mesh>

      {/* Building 5 - Medium right */}
      <mesh position={[8, 3.5, 2]} castShadow>
        <boxGeometry args={[4, 7, 4]} />
        <meshStandardMaterial color="#A9A9A9" />
      </mesh>

      {/* Shop with cucumbers */}
      <group position={[6, 0, 12]}>
        <mesh position={[0, 1.5, 0]} castShadow>
          <boxGeometry args={[3, 3, 2.5]} />
          <meshStandardMaterial color="#DEB887" />
        </mesh>
        
        {/* Cucumber box */}
        <mesh position={[1.8, 0.3, 0.5]}>
          <boxGeometry args={[0.6, 0.6, 0.6]} />
          <meshStandardMaterial color="#8B4513" />
        </mesh>
        
        {/* Cucumbers */}
        {Array.from({ length: 5 }).map((_, i) => (
          <mesh 
            key={i} 
            position={[
              1.8 + (Math.random() - 0.5) * 0.3,
              0.6 + i * 0.1,
              0.5 + (Math.random() - 0.5) * 0.3
            ]}
          >
            <cylinderGeometry args={[0.08, 0.08, 0.4, 8]} />
            <meshStandardMaterial color="#228B22" />
          </mesh>
        ))}
      </group>

      {/* Park area */}
      <group position={[-15, 0, -15]}>
        {/* Grass */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
          <planeGeometry args={[10, 10]} />
          <meshStandardMaterial color="#32CD32" />
        </mesh>

        {/* Trees */}
        {[
          [-2, 0, -2],
          [2, 0, -2],
          [-2, 0, 2],
          [2, 0, 2],
          [0, 0, 0]
        ].map((pos, i) => (
          <group key={i} position={pos as [number, number, number]}>
            {/* Trunk */}
            <mesh position={[0, 0.75, 0]}>
              <cylinderGeometry args={[0.2, 0.25, 1.5, 8]} />
              <meshStandardMaterial color="#8B4513" />
            </mesh>
            {/* Foliage */}
            <mesh position={[0, 2, 0]}>
              <coneGeometry args={[0.8, 1.5, 8]} />
              <meshStandardMaterial color="#228B22" />
            </mesh>
          </group>
        ))}
      </group>
    </group>
  );
};
