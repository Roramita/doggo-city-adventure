import * as THREE from 'three';

// Helper component for windows
const Window = ({ position }: { position: [number, number, number] }) => (
  <group position={position}>
    <mesh>
      <boxGeometry args={[0.8, 1.2, 0.1]} />
      <meshStandardMaterial color="#87ceeb" />
    </mesh>
    <mesh position={[0, 0, 0.06]}>
      <boxGeometry args={[0.02, 1.2, 0.01]} />
      <meshStandardMaterial color="#333333" />
    </mesh>
    <mesh position={[0, 0, 0.06]}>
      <boxGeometry args={[0.8, 0.02, 0.01]} />
      <meshStandardMaterial color="#333333" />
    </mesh>
  </group>
);

// Helper component for door
const Door = ({ position }: { position: [number, number, number] }) => (
  <group position={position}>
    <mesh>
      <boxGeometry args={[1, 2, 0.1]} />
      <meshStandardMaterial color="#654321" />
    </mesh>
    <mesh position={[0.3, 0, 0.06]}>
      <sphereGeometry args={[0.08, 16, 16]} />
      <meshStandardMaterial color="#ffd700" />
    </mesh>
  </group>
);

// Helper component for balcony
const Balcony = ({ position }: { position: [number, number, number] }) => (
  <group position={position}>
    {/* Balcony floor */}
    <mesh position={[0, 0, 0.8]}>
      <boxGeometry args={[2, 0.1, 1.5]} />
      <meshStandardMaterial color="#888888" />
    </mesh>
    {/* Balcony railing */}
    <mesh position={[0, 0.5, 1.4]}>
      <boxGeometry args={[2, 1, 0.05]} />
      <meshStandardMaterial color="#666666" />
    </mesh>
    {/* Flower pots */}
    <mesh position={[-0.7, 0.2, 1.3]}>
      <cylinderGeometry args={[0.15, 0.15, 0.3, 8]} />
      <meshStandardMaterial color="#d2691e" />
    </mesh>
    <mesh position={[-0.7, 0.45, 1.3]}>
      <sphereGeometry args={[0.2, 8, 8]} />
      <meshStandardMaterial color="#ff69b4" />
    </mesh>
    <mesh position={[0.7, 0.2, 1.3]}>
      <cylinderGeometry args={[0.15, 0.15, 0.3, 8]} />
      <meshStandardMaterial color="#d2691e" />
    </mesh>
    <mesh position={[0.7, 0.45, 1.3]}>
      <sphereGeometry args={[0.2, 8, 8]} />
      <meshStandardMaterial color="#ff1493" />
    </mesh>
  </group>
);

export const City = () => {
  return (
    <group>
      {/* Ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
        <planeGeometry args={[60, 60]} />
        <meshStandardMaterial color="#88cc88" />
      </mesh>

      {/* Street */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[8, 60]} />
        <meshStandardMaterial color="#444444" />
      </mesh>

      {/* Street lines */}
      {Array.from({ length: 12 }).map((_, i) => (
        <mesh
          key={i}
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, 0.01, -25 + i * 5]}
        >
          <planeGeometry args={[0.3, 2]} />
          <meshStandardMaterial color="#ffff00" />
        </mesh>
      ))}

      {/* Manhole covers */}
      {[[-15, 5], [10, -8], [-5, 15]].map((pos, i) => (
        <mesh
          key={i}
          rotation={[-Math.PI / 2, 0, 0]}
          position={[pos[0], 0.02, pos[1]]}
          receiveShadow
        >
          <cylinderGeometry args={[0.6, 0.6, 0.1, 16]} />
          <meshStandardMaterial color="#555555" />
        </mesh>
      ))}

      {/* Building 1 - Tall apartment building */}
      <group position={[-12, 0, 0]}>
        <mesh position={[0, 6, 0]} castShadow receiveShadow>
          <boxGeometry args={[5, 12, 5]} />
          <meshStandardMaterial color="#cccccc" />
        </mesh>
        {/* Door */}
        <Door position={[0, 1, 2.55]} />
        {/* Windows - multiple floors */}
        {Array.from({ length: 4 }).map((_, floor) => (
          <group key={floor}>
            <Window position={[-1.5, 3 + floor * 2.5, 2.55]} />
            <Window position={[1.5, 3 + floor * 2.5, 2.55]} />
            {floor > 0 && <Balcony position={[0, 2.5 + floor * 2.5, 2]} />}
          </group>
        ))}
      </group>

      {/* Building 2 - Medium building */}
      <group position={[12, 0, -5]}>
        <mesh position={[0, 4, 0]} castShadow receiveShadow>
          <boxGeometry args={[4, 8, 4]} />
          <meshStandardMaterial color="#bbbbbb" />
        </mesh>
        <Door position={[0, 1, 2.05]} />
        {Array.from({ length: 3 }).map((_, floor) => (
          <group key={floor}>
            <Window position={[-1, 2.5 + floor * 2.2, 2.05]} />
            <Window position={[1, 2.5 + floor * 2.2, 2.05]} />
            {floor > 0 && <Balcony position={[0, 2 + floor * 2.2, 1.5]} />}
          </group>
        ))}
      </group>

      {/* Building 3 - Very tall building */}
      <group position={[-10, 0, -12]}>
        <mesh position={[0, 8, 0]} castShadow receiveShadow>
          <boxGeometry args={[6, 16, 6]} />
          <meshStandardMaterial color="#aaaaaa" />
        </mesh>
        <Door position={[0, 1, 3.05]} />
        {Array.from({ length: 6 }).map((_, floor) => (
          <group key={floor}>
            <Window position={[-2, 3 + floor * 2.3, 3.05]} />
            <Window position={[0, 3 + floor * 2.3, 3.05]} />
            <Window position={[2, 3 + floor * 2.3, 3.05]} />
            {floor > 0 && floor % 2 === 0 && <Balcony position={[0, 2.5 + floor * 2.3, 2.5]} />}
          </group>
        ))}
      </group>

      {/* Shop with cucumbers and more food */}
      <group position={[10, 0, 15]}>
        <mesh position={[0, 1.8, 0]} castShadow receiveShadow>
          <boxGeometry args={[5, 3.6, 4]} />
          <meshStandardMaterial color="#8b4513" />
        </mesh>
        {/* Shop windows */}
        <Window position={[-1.5, 1.8, 2.05]} />
        <Window position={[1.5, 1.8, 2.05]} />
        <Door position={[0, 1, 2.05]} />
        
        {/* Food boxes outside */}
        {/* Cucumber box */}
        <mesh position={[-1.5, 0.3, 3]} castShadow receiveShadow>
          <boxGeometry args={[0.8, 0.6, 0.8]} />
          <meshStandardMaterial color="#654321" />
        </mesh>
        {Array.from({ length: 5 }).map((_, i) => (
          <mesh
            key={`cucumber-${i}`}
            position={[
              -1.5 + (Math.random() - 0.5) * 0.4,
              0.6 + i * 0.15,
              3 + (Math.random() - 0.5) * 0.4
            ]}
            rotation={[Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI]}
            castShadow
          >
            <cylinderGeometry args={[0.08, 0.08, 0.4, 8]} />
            <meshStandardMaterial color="#2d5016" />
          </mesh>
        ))}

        {/* Tomato box */}
        <mesh position={[0, 0.3, 3]} castShadow receiveShadow>
          <boxGeometry args={[0.8, 0.6, 0.8]} />
          <meshStandardMaterial color="#654321" />
        </mesh>
        {Array.from({ length: 6 }).map((_, i) => (
          <mesh
            key={`tomato-${i}`}
            position={[
              (Math.random() - 0.5) * 0.4,
              0.6 + (i % 3) * 0.2,
              3 + (Math.random() - 0.5) * 0.4
            ]}
            castShadow
          >
            <sphereGeometry args={[0.12, 8, 8]} />
            <meshStandardMaterial color="#ff4444" />
          </mesh>
        ))}

        {/* Banana box */}
        <mesh position={[1.5, 0.3, 3]} castShadow receiveShadow>
          <boxGeometry args={[0.8, 0.6, 0.8]} />
          <meshStandardMaterial color="#654321" />
        </mesh>
        {Array.from({ length: 4 }).map((_, i) => (
          <mesh
            key={`banana-${i}`}
            position={[
              1.5 + (Math.random() - 0.5) * 0.3,
              0.6 + i * 0.15,
              3 + (Math.random() - 0.5) * 0.3
            ]}
            rotation={[0, 0, Math.PI / 4]}
            castShadow
          >
            <cylinderGeometry args={[0.06, 0.08, 0.5, 6]} />
            <meshStandardMaterial color="#ffff00" />
          </mesh>
        ))}
      </group>

      {/* Park */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[15, 0.02, -10]} receiveShadow>
        <planeGeometry args={[12, 12]} />
        <meshStandardMaterial color="#66aa66" />
      </mesh>

      {/* More trees */}
      {[
        [12, -8],
        [18, -12],
        [15, -7],
        [19, -10],
        [13, -13],
        [17, -8]
      ].map((pos, i) => (
        <group key={i} position={[pos[0], 0, pos[1]]}>
          <mesh position={[0, 1.2, 0]} castShadow>
            <cylinderGeometry args={[0.25, 0.3, 2.4, 8]} />
            <meshStandardMaterial color="#654321" />
          </mesh>
          <mesh position={[0, 3, 0]} castShadow>
            <coneGeometry args={[1.5, 3, 8]} />
            <meshStandardMaterial color="#2d5016" />
          </mesh>
        </group>
      ))}

      {/* Sidewalks */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-6, 0.01, 0]} receiveShadow>
        <planeGeometry args={[2, 60]} />
        <meshStandardMaterial color="#999999" />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[6, 0.01, 0]} receiveShadow>
        <planeGeometry args={[2, 60]} />
        <meshStandardMaterial color="#999999" />
      </mesh>

      {/* Traffic light */}
      <group position={[5, 0, 8]}>
        <mesh position={[0, 2, 0]} castShadow>
          <cylinderGeometry args={[0.1, 0.1, 4, 8]} />
          <meshStandardMaterial color="#333333" />
        </mesh>
        <mesh position={[0, 4.5, 0]} castShadow>
          <boxGeometry args={[0.4, 1.2, 0.3]} />
          <meshStandardMaterial color="#222222" />
        </mesh>
        <mesh position={[0, 5, 0.16]}>
          <circleGeometry args={[0.12, 16]} />
          <meshStandardMaterial color="#ff0000" emissive="#ff0000" emissiveIntensity={0.5} />
        </mesh>
        <mesh position={[0, 4.5, 0.16]}>
          <circleGeometry args={[0.12, 16]} />
          <meshStandardMaterial color="#ffff00" />
        </mesh>
        <mesh position={[0, 4, 0.16]}>
          <circleGeometry args={[0.12, 16]} />
          <meshStandardMaterial color="#00ff00" emissive="#00ff00" emissiveIntensity={0.8} />
        </mesh>
      </group>

      {/* Café */}
      <group position={[-15, 0, 12]}>
        <mesh position={[0, 1.5, 0]} castShadow receiveShadow>
          <boxGeometry args={[4, 3, 3]} />
          <meshStandardMaterial color="#d2691e" />
        </mesh>
        <Window position={[-1, 1.5, 1.55]} />
        <Window position={[1, 1.5, 1.55]} />
        <Door position={[0, 1, 1.55]} />
        
        {/* Café tables and chairs outside */}
        {[[-1.5, 2.5], [1.5, 2.5], [0, 3.5]].map((pos, i) => (
          <group key={i} position={[pos[0], 0, pos[1]]}>
            {/* Table */}
            <mesh position={[0, 0.4, 0]} castShadow>
              <cylinderGeometry args={[0.4, 0.4, 0.05, 16]} />
              <meshStandardMaterial color="#ffffff" />
            </mesh>
            <mesh position={[0, 0.2, 0]} castShadow>
              <cylinderGeometry args={[0.05, 0.05, 0.4, 8]} />
              <meshStandardMaterial color="#888888" />
            </mesh>
            {/* Chairs */}
            {[[0.5, 0], [-0.5, 0], [0, 0.5], [0, -0.5]].map((chairPos, j) => (
              <group key={j} position={[chairPos[0], 0.25, chairPos[1]]}>
                <mesh castShadow>
                  <boxGeometry args={[0.3, 0.05, 0.3]} />
                  <meshStandardMaterial color="#8b4513" />
                </mesh>
                <mesh position={[0, 0.25, -0.1]} castShadow>
                  <boxGeometry args={[0.3, 0.4, 0.05]} />
                  <meshStandardMaterial color="#8b4513" />
                </mesh>
              </group>
            ))}
          </group>
        ))}
      </group>
    </group>
  );
};
