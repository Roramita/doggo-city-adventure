import { useState, useEffect, useCallback, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { Dog } from './Dog';
import { Person } from './Person';
import { City } from './City';
import { FoodCan } from './FoodCan';
import { toast } from 'sonner';

interface PersonData {
  id: number;
  position: [number, number, number];
  hairStyle: 'long' | 'short';
  hasChristmasSweater: boolean;
  moveSpeed: number;
  moveRange: { x: [number, number]; z: [number, number] };
}

const barkMessages = [
  "Hallo! Was für ein süßer Hund!",
  "Oh, ein freundlicher Hund!",
  "Möchtest du Futter?",
  "Was für ein niedlicher Welpe!",
  "Guten Tag, kleiner Freund!"
];

export const GameScene = () => {
  const [dogPosition, setDogPosition] = useState<[number, number, number]>([0, 0, 8]);
  const [dogRotation, setDogRotation] = useState(0);
  const [isMoving, setIsMoving] = useState(false);
  const [foodCans, setFoodCans] = useState<Array<{ id: number; position: [number, number, number] }>>([]);
  const keysPressed = useRef<Set<string>>(new Set());
  const canIdCounter = useRef(0);

  const people: PersonData[] = [
    { 
      id: 1, 
      position: [-5, 0, 5], 
      hairStyle: 'long', 
      hasChristmasSweater: true,
      moveSpeed: 0.8,
      moveRange: { x: [-10, -2], z: [0, 10] }
    },
    { 
      id: 2, 
      position: [5, 0, -3], 
      hairStyle: 'short', 
      hasChristmasSweater: false,
      moveSpeed: 1.2,
      moveRange: { x: [2, 10], z: [-8, 5] }
    },
    { 
      id: 3, 
      position: [-3, 0, -5], 
      hairStyle: 'long', 
      hasChristmasSweater: false,
      moveSpeed: 0.6,
      moveRange: { x: [-8, 0], z: [-10, 0] }
    },
    { 
      id: 4, 
      position: [4, 0, 8], 
      hairStyle: 'short', 
      hasChristmasSweater: false,
      moveSpeed: 1.0,
      moveRange: { x: [0, 8], z: [5, 15] }
    },
    { 
      id: 5, 
      position: [-7, 0, -10], 
      hairStyle: 'long', 
      hasChristmasSweater: false,
      moveSpeed: 0.9,
      moveRange: { x: [-12, -2], z: [-15, -5] }
    }
  ];

  const checkPersonNearby = useCallback(() => {
    for (const person of people) {
      const distance = Math.sqrt(
        Math.pow(dogPosition[0] - person.position[0], 2) +
        Math.pow(dogPosition[2] - person.position[2], 2)
      );
      
      if (distance < 2) {
        const message = barkMessages[Math.floor(Math.random() * barkMessages.length)];
        toast(message, {
          description: "Die Person hat etwas gesagt!",
          duration: 3000,
        });

        if (Math.random() > 0.5) {
          const canPosition: [number, number, number] = [
            dogPosition[0] + (Math.random() - 0.5) * 1,
            0,
            dogPosition[2] + (Math.random() - 0.5) * 1
          ];
          setFoodCans(prev => [...prev, { id: canIdCounter.current++, position: canPosition }]);
          toast.success("Eine Dose Futter wurde vor dir hingelegt!");
        }
        break;
      }
    }
  }, [dogPosition]);

  const checkCucumbers = useCallback(() => {
    const cucumberBoxPos = [7.8, 0, 12.5];
    const distance = Math.sqrt(
      Math.pow(dogPosition[0] - cucumberBoxPos[0], 2) +
      Math.pow(dogPosition[2] - cucumberBoxPos[2], 2)
    );
    
    if (distance < 1.5) {
      toast.success("Mmm, leckere Gurken! *mampf*", {
        duration: 2000,
      });
    }
  }, [dogPosition]);

  const checkFoodCans = useCallback(() => {
    setFoodCans(prev => {
      const remaining = prev.filter(can => {
        const distance = Math.sqrt(
          Math.pow(dogPosition[0] - can.position[0], 2) +
          Math.pow(dogPosition[2] - can.position[2], 2)
        );
        
        if (distance < 0.8) {
          toast.success("Leckeres Futter gegessen! *mampf*", {
            duration: 2000,
          });
          return false;
        }
        return true;
      });
      return remaining;
    });
  }, [dogPosition]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      keysPressed.current.add(e.key.toLowerCase());
      
      if (e.key.toLowerCase() === 'v') {
        checkPersonNearby();
        toast("Wuff! Wuff! 🐕", {
          duration: 1500,
        });
      }
      
      if (e.key.toLowerCase() === 'y') {
        checkCucumbers();
        checkFoodCans();
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keysPressed.current.delete(e.key.toLowerCase());
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [checkPersonNearby, checkCucumbers, checkFoodCans]);

  useEffect(() => {
    const moveInterval = setInterval(() => {
      const speed = 0.15;
      let newX = dogPosition[0];
      let newZ = dogPosition[2];
      let newRotation = dogRotation;
      let moving = false;

      if (keysPressed.current.has('arrowup')) {
        newZ -= speed;
        newRotation = 0;
        moving = true;
      }
      if (keysPressed.current.has('arrowdown')) {
        newZ += speed;
        newRotation = Math.PI;
        moving = true;
      }
      if (keysPressed.current.has('arrowleft')) {
        newX -= speed;
        newRotation = Math.PI / 2;
        moving = true;
      }
      if (keysPressed.current.has('arrowright')) {
        newX += speed;
        newRotation = -Math.PI / 2;
        moving = true;
      }

      newX = Math.max(-20, Math.min(20, newX));
      newZ = Math.max(-20, Math.min(20, newZ));

      if (moving) {
        setDogPosition([newX, 0, newZ]);
        setDogRotation(newRotation);
      }
      setIsMoving(moving);
    }, 1000 / 60);

    return () => clearInterval(moveInterval);
  }, [dogPosition, dogRotation]);

  return (
    <div className="w-full h-screen">
      <Canvas shadows camera={{ position: [15, 15, 15], fov: 60 }}>
        <ambientLight intensity={0.6} />
        <directionalLight 
          position={[10, 20, 10]} 
          intensity={1} 
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <pointLight position={[0, 10, 0]} intensity={0.5} />

        <City />
        <Dog position={dogPosition} rotation={dogRotation} isMoving={isMoving} />
        
        {people.map(person => (
          <Person
            key={person.id}
            position={person.position}
            hairStyle={person.hairStyle}
            hasChristmasSweater={person.hasChristmasSweater}
            moveSpeed={person.moveSpeed}
            moveRange={person.moveRange}
          />
        ))}

        {foodCans.map(can => (
          <FoodCan key={can.id} position={can.position} />
        ))}

        <OrbitControls 
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          maxPolarAngle={Math.PI / 2.2}
          minDistance={5}
          maxDistance={40}
        />
      </Canvas>

      <div className="absolute top-4 left-4 bg-card/90 backdrop-blur-sm p-4 rounded-lg border border-border shadow-lg">
        <h2 className="text-lg font-bold text-foreground mb-2">Steuerung</h2>
        <ul className="text-sm text-muted-foreground space-y-1">
          <li>🎮 Pfeiltasten: Bewegen</li>
          <li>🗣️ V: Bellen</li>
          <li>🍽️ Y: Essen</li>
          <li>🖱️ Maus: Kamera drehen</li>
        </ul>
      </div>
    </div>
  );
};
