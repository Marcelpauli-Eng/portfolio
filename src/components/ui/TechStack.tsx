"use client";

import { useMemo, useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, useTexture } from "@react-three/drei";
import { Physics, RigidBody, RapierRigidBody } from "@react-three/rapier";
import * as THREE from "three";

type TechConfig = {
    id: string;
    color: string;
    textureUrl: string;
};

// Available technologies with their corresponding SVG logos in public/logos/
const availableTechs: TechConfig[] = [
    { id: "react", color: "#61DAFB", textureUrl: "/logos/react-original.svg" },
    { id: "js", color: "#F7DF1E", textureUrl: "/logos/javascript-original.svg" },
    { id: "ts", color: "#3178C6", textureUrl: "/logos/typescript-original.svg" },
    { id: "three", color: "#ffffff", textureUrl: "/logos/threejs-original.svg" },
    { id: "php", color: "#4F5D95", textureUrl: "/logos/php-original.svg" },
    { id: "angular", color: "#DD0031", textureUrl: "/logos/angularjs-original.svg" },
];

function TechBall({ position, textureUrl }: { position: [number, number, number]; textureUrl: string }) {
    const rigidBodyRef = useRef<RapierRigidBody>(null);

    // Load texture for the material
    const texture = useTexture(textureUrl);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.wrapS = THREE.ClampToEdgeWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;
    texture.repeat.set(1.5, 1.5);
    texture.offset.set(-0.25, -0.25);

    const vec = useMemo(() => new THREE.Vector3(), []);

    useFrame(() => {
        if (rigidBodyRef.current) {
            const translation = rigidBodyRef.current.translation();
            const currentPos = new THREE.Vector3(translation.x, translation.y, translation.z);

            vec.set(0, 0, 0).sub(currentPos).normalize().multiplyScalar(0.8);

            rigidBodyRef.current.applyImpulse(vec, true);
        }
    });

    const handlePointerEnter = () => {
        if (rigidBodyRef.current) {
            const hitForce = 150;
            const spinForce = 50;
            const impulse = {
                x: (Math.random() - 0.5) * hitForce,
                y: (Math.random() - 0.5) * hitForce,
                z: (Math.random() - 0.5) * hitForce,
            };
            const torque = {
                x: (Math.random() - 0.5) * spinForce,
                y: (Math.random() - 0.5) * spinForce,
                z: (Math.random() - 0.5) * spinForce,
            };

            rigidBodyRef.current.applyImpulse(impulse, true);
            rigidBodyRef.current.applyTorqueImpulse(torque, true);
        }
    };

    return (
        <RigidBody
            ref={rigidBodyRef}
            colliders="ball"
            restitution={0.6}
            friction={0.5}
            linearDamping={2}
            angularDamping={1}
            position={position}
        >
            <group onPointerEnter={handlePointerEnter}>
                {/* Base White Pearl Sphere */}
                <mesh castShadow receiveShadow>
                    <sphereGeometry args={[1, 64, 64]} />
                    <meshStandardMaterial
                        color="#ffffff"
                        roughness={0.05}
                        metalness={0.1}
                    />
                </mesh>

                {/* Transparent Logo Shell */}
                <mesh>
                    <sphereGeometry args={[1.01, 64, 64]} />
                    <meshStandardMaterial
                        map={texture}
                        transparent={true}
                        roughness={0.05}
                        metalness={0.1}
                        depthWrite={false}
                    />
                </mesh>
            </group>
        </RigidBody>
    );
}

export default function TechStack() {
    // Generate random balls using the available tech configs
    const balls = useMemo(() => {
        return Array.from({ length: 15 }).map((_, i) => {
            const tech = availableTechs[i % availableTechs.length];
            return {
                id: `ball-${i}`,
                textureUrl: tech.textureUrl,
                position: [
                    (Math.random() - 0.5) * 2,
                    (Math.random() - 0.5) * 2,
                    (Math.random() - 0.5) * 2
                ] as [number, number, number],
            };
        });
    }, []);

    return (
        <section className="relative w-full h-screen bg-black overflow-hidden flex flex-col items-center justify-center pointer-events-auto">

            {/* Background Graphic Text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-0">
                <h2 className="text-[15vw] leading-none font-black text-[#222] text-center uppercase tracking-tighter">
                    MY TECH<br />STACK
                </h2>
            </div>

            {/* 3D Canvas wrapper */}
            <div className="absolute inset-0 z-10">
                <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 12], fov: 50 }}>
                    <Environment preset="city" />
                    <ambientLight intensity={0.4} />
                    <directionalLight
                        position={[10, 10, 10]}
                        castShadow
                        intensity={2}
                        shadow-bias={-0.0001}
                    />

                    {/* Suspense is required because useTexture loads assets asynchronously */}
                    <Suspense fallback={null}>
                        <Physics gravity={[0, 0, 0]}>
                            {balls.map((ball) => (
                                <TechBall
                                    key={ball.id}
                                    textureUrl={ball.textureUrl}
                                    position={ball.position}
                                />
                            ))}
                        </Physics>
                    </Suspense>
                </Canvas>
            </div>

            {/* Foreground Information */}
            <div className="absolute bottom-10 left-10 md:bottom-20 md:left-20 z-20 pointer-events-none">
                <h3 className="text-3xl md:text-5xl font-bold text-white tracking-tighter uppercase">
                    Interact <span className="text-purple-500">with them</span>
                </h3>
                <p className="text-zinc-400 mt-2 font-medium max-w-xs">
                    Hover to bump the physics objects.
                </p>
            </div>

        </section>
    );
}
