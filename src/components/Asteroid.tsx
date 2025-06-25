import { useGLTF } from "@react-three/drei";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Mesh } from "three";

import type { ThreeSceneProps } from "../types/types";

export default function Asteroid({ asteroidNumber }: ThreeSceneProps) {
    const { scene } = useGLTF(`/models/asteroid${asteroidNumber}.glb`);
    const asteroidRef = useRef<Mesh>(null);

    useFrame(() => {
        if (asteroidRef.current) {
            asteroidRef.current.rotation.y += 0.002;
            asteroidRef.current.rotation.x += 0.001;
        }
    });

    return (
        <primitive
            object={scene}
            ref={asteroidRef}
            scale={1}
            position={[0, 0, 0]}
        />
    );
}
