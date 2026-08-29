'use client'
import { Suspense, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text3D, Center, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

interface Button3DProps {
    label: string;
    onClick?: () => void;
    color?: string;
    hoverColor?: string;
    textColor?: string;
    width?: string | number;
    height?: string | number;
}

function ButtonMesh({
    label,
    onClick,
    color = '#141417',
    hoverColor = '#F2C230',
    textColor = '#F3F3EF',
}: Omit<Button3DProps, 'width' | 'height'>) {
    const groupRef = useRef<THREE.Group>(null);
    const [hovered, setHovered] = useState(false);
    const [pressed, setPressed] = useState(false);

    useFrame((state) => {
        if (!groupRef.current) return;

        // idle tilt so the side face is always slightly visible even at rest —
        // this alone is most of what separates "3D object" from "flat card"
        const idleY = Math.sin(state.clock.getElapsedTime() * 0.6) * 0.08;
        const targetY = hovered ? 0.35 : idleY; // swings further open on hover
        groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetY, 0.08);

        const targetScale = pressed ? 0.94 : hovered ? 1.08 : 1;
        groupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.15);
    });

    return (
        <group
            ref={groupRef}
            onClick={(e) => {
                e.stopPropagation();
                onClick?.();
            }}
            onPointerOver={(e) => {
                e.stopPropagation();
                setHovered(true);
                document.body.style.cursor = 'pointer';
            }}
            onPointerOut={() => {
                setHovered(false);
                document.body.style.cursor = 'auto';
            }}
            onPointerDown={(e) => {
                e.stopPropagation();
                setPressed(true);
            }}
            onPointerUp={() => setPressed(false)}
        >
            {/* RoundedBox instead of boxGeometry — the rounded bevel is what
                catches light differently across its curve, which reads as
                "solid object" in a way a sharp-edged box never quite does */}
            <RoundedBox args={[1.8, 0.55, 0.28]} radius={0.06} smoothness={4}>
                <meshStandardMaterial
                    color={hovered ? hoverColor : color}
                    roughness={0.35}
                    metalness={0.15}
                />
            </RoundedBox>

            <Center position={[0, 0, 0.15]}>
                <Text3D font="/fonts/Electrolize_Regular.typeface.json" size={0.13} height={0.04} curveSegments={6}>
                    {label}
                    <meshStandardMaterial color={hovered ? '#0A0A0C' : textColor} roughness={0.4} />
                </Text3D>
            </Center>
        </group>
    );
}

export default function Button3D({
    label,
    onClick,
    color,
    hoverColor,
    textColor,
    width = 260,
    height = 120,
}: Button3DProps) {
    return (
        <div style={{ width, height }}>
            <Canvas
                camera={{ position: [1.8, 1.3, 3], fov: 35 }} 
                gl={{ alpha: true, antialias: true }}
                style={{ background: 'transparent' }}
            >
                <ambientLight intensity={0.5} />
                <directionalLight position={[3, 4, 3]} intensity={1.3} castShadow />
                <pointLight position={[-2, -1, 2]} intensity={0.3} color="#46D6E0" />

                <Suspense fallback={null}>
                    <ButtonMesh label={label} onClick={onClick} color={color} hoverColor={hoverColor} textColor={textColor} />
                </Suspense>
            </Canvas>
        </div>
    );
}