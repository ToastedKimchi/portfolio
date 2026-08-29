// components/ui/projectPreview.tsx
'use client'
import { Canvas } from '@react-three/fiber';
import { useGLTF, OrbitControls, Center, Environment } from '@react-three/drei';

function Model({ path }: { path: string }) {
    const { scene } = useGLTF(path);
    return <primitive object={scene} />;
}

export default function ProjectPreview({ modelPath, scale }: { modelPath: string, scale : number }) {
    return (
        <Canvas
            camera={{ position: [0, 0, 2.5], fov: 40 }}
            gl={{ alpha: true, antialias: true }}
            style={{ background: 'transparent' }}
        >
            <ambientLight intensity={0.7} />
            <directionalLight position={[3, 4, 2]} intensity={1} />
            <Center scale={scale}>
                <Model path={modelPath} />
            </Center>
            <Environment preset="studio" />
            <OrbitControls
                autoRotate
                autoRotateSpeed={1.4}
                enableZoom={false}
                enablePan={false}
                maxPolarAngle={Math.PI / 2}
            />
        </Canvas>
    );
}