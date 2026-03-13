"use client";

import { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

function AbstractShape() {
    const meshRef = useRef<THREE.Mesh>(null);

    // Easing function for smooth rotation
    useFrame((state, delta) => {
        if (!meshRef.current) return;

        // Base continuous rotation
        meshRef.current.rotation.x += delta * 0.1;
        meshRef.current.rotation.y += delta * 0.15;

        // Pointer-based reactive rotation (lerped for smoothness)
        const targetX = (state.pointer.x * Math.PI) / 4;
        const targetY = (state.pointer.y * Math.PI) / 4;

        meshRef.current.rotation.y = THREE.MathUtils.lerp(
            meshRef.current.rotation.y,
            targetX + meshRef.current.rotation.y, // Add to existing rotation
            0.05
        );
        meshRef.current.rotation.x = THREE.MathUtils.lerp(
            meshRef.current.rotation.x,
            -targetY + meshRef.current.rotation.x,
            0.05
        );
    });

    return (
        <Float
            speed={2} // Animation speed, defaults to 1
            rotationIntensity={1} // XYZ rotation intensity, defaults to 1
            floatIntensity={2} // Up/down float intensity, works like a multiplier with floatingRange,defaults to 1
        >
            <mesh ref={meshRef} scale={1.8}>
                <icosahedronGeometry args={[1, 12]} />
                <MeshDistortMaterial
                    color="#7c6aff"
                    envMapIntensity={0.8}
                    clearcoat={1}
                    clearcoatRoughness={0}
                    metalness={0.7}
                    roughness={0.2}
                    distort={0.4}
                    speed={2.5}
                />
            </mesh>
        </Float>
    );
}

export function HeroCanvas() {
    return (
        <div className="absolute inset-0 -z-10 h-full w-full pointer-events-none">
            <Canvas
                camera={{ position: [0, 0, 5], fov: 35 }}
                gl={{ alpha: true, antialias: true }}
                dpr={[1, 2]}
            >
                <Suspense fallback={null}>
                    <Environment preset="city" />
                    <ambientLight intensity={0.5} />
                    <directionalLight position={[10, 10, 5]} intensity={1.5} color="#ffffff" />
                    <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#7c6aff" />

                    <AbstractShape />

                </Suspense>
            </Canvas>
        </div>
    );
}
