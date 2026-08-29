'use client'
import React, { useRef, useState, useCallback, Suspense, Component } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Center, Text3D } from '@react-three/drei';
import * as THREE from 'three';

class Text3DErrorBoundary extends Component {
  state = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error) {
    console.error(
      'Text Render Failed',
      error
    );
  }
  render() {
    if (this.state.hasError) return null; 
    return this.props.children;
  }
}

function FloatingText({ pointer, isHovered }) {
  const groupRef = useRef();
  const current = useRef(new THREE.Vector2(0, 0));

  useFrame((state, delta) => {
    const safeDelta = Math.min(delta, 0.1);
    const targetX = isHovered ? pointer.current.x * 0.6 : 0;
    const targetY = isHovered ? pointer.current.y * 0.6 : 0;

    current.current.x = THREE.MathUtils.lerp(current.current.x, targetX, safeDelta * 4);
    current.current.y = THREE.MathUtils.lerp(current.current.y, targetY, safeDelta * 4);

    if (groupRef.current) {
      const t = state.clock.getElapsedTime();
      groupRef.current.rotation.x = Math.sin(t * 0.5) * 0.25; 
      groupRef.current.rotation.y = Math.sin(t * 0.1) * 0.15 + current.current.x * 0.3;
      groupRef.current.position.x = current.current.x;
      groupRef.current.position.y = current.current.y;
    }
  });

  return (
    <group ref={groupRef}>
      <Center>
        <Text3D
          font="/fontjson/Electrolize_Regular.json"
          size={0.3}
          height={0.1}
          curveSegments={12}
          bevelEnabled
          bevelThickness={0.01}
          bevelSize={0.02}
          bevelOffset={0}
          bevelSegments={5}
        >
          Jinuka Waduge
          <meshToonMaterial attach="material-0" color="#F8333C" />
          <meshToonMaterial attach="material-1" color="#DBD5B5" />
          <meshToonMaterial attach="material-2" color="#44AF69" />

        </Text3D>
      </Center>
    </group>
  );
}

export default function Render3DText() {
  const containerRef = useRef(null);
  const pointer = useRef(new THREE.Vector2(0, 0));
  const [isHovered, setIsHovered] = useState(false);

  const handlePointerMove = useCallback((e) => {
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    pointer.current.set(x, y);
  }, []);

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={() => setIsHovered(false)}
      style={{
        position: 'relative',
        background: 'transparent',
        width: '100%',
        height: '100%',
      }}
    >
      <Text3DErrorBoundary>
        <Canvas
          dpr={[1, 1.5]}
          camera={{ position: [0, 0, 6], fov: 8 }}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}  
        >   
          <ambientLight intensity={0.6} />
          <directionalLight position={[10, 10, 10]} intensity={3.5} color="#00ffff" />
          <directionalLight position={[-10, -10, -5]} intensity={1.5} color="#ff007f" />

          <Suspense fallback={null}>
            <FloatingText pointer={pointer} isHovered={isHovered} />
          </Suspense>

        </Canvas>
      </Text3DErrorBoundary>
    </div>
  );
}