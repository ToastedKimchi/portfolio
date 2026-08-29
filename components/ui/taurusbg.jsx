import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Center } from '@react-three/drei';

function OptimizedShape() {
    const shaperef = useRef();

    useFrame((state, delta) => {
        if(shaperef.current) {
            shaperef.current.rotation.y += delta * 0.2;
        }
    });

    return (
        <mesh ref={shaperef}>
            <torusGeometry args={[1.6, 0.4, 32, 64]}/>

            <meshPhysicalMaterial
                color="#000000"
                emissive="#3a0007"
                roughness={0.15}
                metalness={0.2}
                clearcoat={1}
                clearcoatRoughness={0.05}
                transmission={0.9}
                thickness={2.5}
                ior={1.5}
            />
        </mesh>
    )
}

export default function TaurusBackground() {
    return (
        <div
            style={{
                position : "fixed",
                inset : 0,
                zIndex : -1,
                background : "#020617",
                width : '100dvw',
                height : '100dvh'
            }}
        >
            <Canvas
                dpr={[1, 1.5]}
                camera={{position : [0,0,6], fov : 45}}
                gl={{antialias : true, alpha : false, powerPreference : "high-performance"}}
            >
                <ambientLight intensity={1.2}/>
                <directionalLight position={[10, 10, 5]} intensity={2} color="#00ffff"/>
                <directionalLight position={[-10, -10, -5]} intensity={3} color="#ff007f"/>

                <color attach="background" args={['#ffffff']} />

                <Center>
                    <OptimizedShape/>
                </Center>

            </Canvas>

        </div>
    );
}