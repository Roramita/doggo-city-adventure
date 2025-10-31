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

// Helper component for balcony with more greenery
const Balcony = ({ position }: { position: [number, number, number] }) => (
  <group position={position}>
    {/* Balcony floor */}
    <mesh position={[0, 0, 0.8]}>
      <boxGeometry args={[2.2, 0.1, 1.5]} />
      <meshStandardMaterial color="#888888" />
    </mesh>
    {/* Balcony railing */}
    <mesh position={[0, 0.5, 1.4]}>
      <boxGeometry args={[2.2, 0.08, 0.08]} />
      <meshStandardMaterial color="#ffffff" />
    </mesh>
    <mesh position={[0, 0.9, 1.4]}>
      <boxGeometry args={[2.2, 0.08, 0.08]} />
      <meshStandardMaterial color="#ffffff" />
    </mesh>
    {/* Railing bars */}
    {Array.from({ length: 9 }).map((_, i) => (
      <mesh key={i} position={[-1 + i * 0.25, 0.7, 1.4]}>
        <boxGeometry args={[0.03, 0.4, 0.03]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
    ))}
    
    {/* Flower boxes with plants */}
    {[-0.7, 0, 0.7].map((xPos, idx) => (
      <group key={idx}>
        {/* Flower box */}
        <mesh position={[xPos, 0.25, 1.25]}>
          <boxGeometry args={[0.35, 0.25, 0.2]} />
          <meshStandardMaterial color="#8b4513" />
        </mesh>
        {/* Plants/Flowers */}
        <mesh position={[xPos - 0.1, 0.5, 1.25]}>
          <sphereGeometry args={[0.12, 8, 8]} />
          <meshStandardMaterial color="#ff1493" />
        </mesh>
        <mesh position={[xPos + 0.1, 0.48, 1.25]}>
          <sphereGeometry args={[0.1, 8, 8]} />
          <meshStandardMaterial color="#ffa500" />
        </mesh>
        {/* Green leaves */}
        {Array.from({ length: 6 }).map((_, i) => (
          <mesh 
            key={i}
            position={[
              xPos + (Math.random() - 0.5) * 0.2,
              0.35 + Math.random() * 0.15,
              1.25 + (Math.random() - 0.5) * 0.1
            ]}
          >
            <boxGeometry args={[0.06, 0.08, 0.02]} />
            <meshStandardMaterial color="#228b22" />
          </mesh>
        ))}
      </group>
    ))}
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

      {/* Manhole covers - flat on street only, fewer */}
      {[[-2, 5], [1, -8]].map((pos, i) => (
        <mesh
          key={i}
          rotation={[-Math.PI / 2, 0, 0]}
          position={[pos[0], 0.005, pos[1]]}
          receiveShadow
        >
          <circleGeometry args={[0.6, 16]} />
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
        {/* Windows on all sides - multiple floors */}
        {Array.from({ length: 4 }).map((_, floor) => (
          <group key={floor}>
            {/* Front windows */}
            <Window position={[-1.5, 3 + floor * 2.5, 2.55]} />
            <Window position={[1.5, 3 + floor * 2.5, 2.55]} />
            {/* Back windows */}
            <Window position={[-1.5, 3 + floor * 2.5, -2.55]} />
            <Window position={[1.5, 3 + floor * 2.5, -2.55]} />
            {/* Left side windows */}
            <Window position={[-2.55, 3 + floor * 2.5, -1]} />
            <Window position={[-2.55, 3 + floor * 2.5, 1]} />
            {/* Right side windows */}
            <Window position={[2.55, 3 + floor * 2.5, -1]} />
            <Window position={[2.55, 3 + floor * 2.5, 1]} />
            {floor > 0 && <Balcony position={[0, 2.5 + floor * 2.5, 2]} />}
          </group>
        ))}
      </group>

      {/* Building 2 - Medium building */}
      <group position={[12, 0, 8]}>
        <mesh position={[0, 4, 0]} castShadow receiveShadow>
          <boxGeometry args={[4, 8, 4]} />
          <meshStandardMaterial color="#bbbbbb" />
        </mesh>
        <Door position={[0, 1, 2.05]} />
        {Array.from({ length: 3 }).map((_, floor) => (
          <group key={floor}>
            {/* All sides windows */}
            <Window position={[-1, 2.5 + floor * 2.2, 2.05]} />
            <Window position={[1, 2.5 + floor * 2.2, 2.05]} />
            <Window position={[-1, 2.5 + floor * 2.2, -2.05]} />
            <Window position={[1, 2.5 + floor * 2.2, -2.05]} />
            <Window position={[-2.05, 2.5 + floor * 2.2, 0]} />
            <Window position={[2.05, 2.5 + floor * 2.2, 0]} />
            {floor > 0 && <Balcony position={[0, 2 + floor * 2.2, 1.5]} />}
          </group>
        ))}
      </group>

      {/* Building 3 - Very tall building */}
      <group position={[-12, 0, 12]}>
        <mesh position={[0, 8, 0]} castShadow receiveShadow>
          <boxGeometry args={[6, 16, 6]} />
          <meshStandardMaterial color="#aaaaaa" />
        </mesh>
        <Door position={[0, 1, 3.05]} />
        {Array.from({ length: 6 }).map((_, floor) => (
          <group key={floor}>
            {/* Front windows */}
            <Window position={[-2, 3 + floor * 2.3, 3.05]} />
            <Window position={[0, 3 + floor * 2.3, 3.05]} />
            <Window position={[2, 3 + floor * 2.3, 3.05]} />
            {/* Back windows */}
            <Window position={[-2, 3 + floor * 2.3, -3.05]} />
            <Window position={[0, 3 + floor * 2.3, -3.05]} />
            <Window position={[2, 3 + floor * 2.3, -3.05]} />
            {/* Side windows */}
            <Window position={[-3.05, 3 + floor * 2.3, -1.5]} />
            <Window position={[-3.05, 3 + floor * 2.3, 1.5]} />
            <Window position={[3.05, 3 + floor * 2.3, -1.5]} />
            <Window position={[3.05, 3 + floor * 2.3, 1.5]} />
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

      {/* More trees - expanded */}
      {[
        [12, -8], [18, -12], [15, -7], [19, -10], [13, -13], [17, -8],
        [-15, -8], [-18, -5], [-20, 10], [-22, 5], [20, 8], [22, 12],
        [-8, 18], [8, 20], [10, 22], [-10, 20]
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

      {/* School - large building */}
      <group position={[-18, 0, -8]}>
        <mesh position={[0, 3, 0]} castShadow receiveShadow>
          <boxGeometry args={[12, 6, 8]} />
          <meshStandardMaterial color="#ffd700" />
        </mesh>
        <Door position={[0, 1, 4.05]} />
        {/* School windows */}
        {Array.from({ length: 2 }).map((_, floor) => (
          <group key={floor}>
            {Array.from({ length: 5 }).map((_, i) => (
              <Window key={i} position={[-4.5 + i * 2.25, 1.5 + floor * 2.5, 4.05]} />
            ))}
          </group>
        ))}
        {/* School sign */}
        <mesh position={[0, 5, 4.1]} castShadow>
          <boxGeometry args={[3, 0.8, 0.1]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
      </group>


      {/* Café */}
      <group position={[15, 0, -5]}>
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

      {/* Shopping center */}
      <group position={[18, 0, -12]}>
        <mesh position={[0, 2.5, 0]} castShadow receiveShadow>
          <boxGeometry args={[8, 5, 6]} />
          <meshStandardMaterial color="#87ceeb" />
        </mesh>
        <Door position={[0, 1, 3.05]} />
        {/* Large shopping windows */}
        <Window position={[-2.5, 2, 3.05]} />
        <Window position={[2.5, 2, 3.05]} />
        {/* Sign */}
        <mesh position={[0, 4.5, 3.1]} castShadow>
          <boxGeometry args={[4, 0.6, 0.1]} />
          <meshStandardMaterial color="#ff6600" />
        </mesh>
      </group>
    </group>
  );
};
