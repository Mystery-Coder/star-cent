import * as THREE from "three";
import { useMemo, useRef, useState } from "react";
import { Line, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import type { Asteroid } from "../types/types";
import { clone } from "three/examples/jsm/utils/SkeletonUtils.js"; //doesn't have types
import { useNavigate } from "react-router-dom";

type Props = {
	asteroid: Asteroid;
	scale?: number;
	showLines: boolean;
};

const modelScaleMap: { [key: number]: number } = {
	1: 0.6,
	2: 0.08,
	3: 0.008,
};

export default function OrbitAsteroid({
	asteroid,
	scale = 5,
	showLines = true,
}: Props) {
	const meshRef = useRef<THREE.Mesh>(null);
	const modelIndex = useMemo(() => Math.floor(Math.random() * 3) + 1, []);
	// const modelIndex = 3;
	const model = useGLTF(`/models/asteroid${modelIndex}.glb`);
	const clonedScene = useMemo(() => clone(model.scene), [model.scene]);

	const navigate = useNavigate();

	//useMemo to memoize expensive calc
	const points = useMemo(() => {
		const a = asteroid.a * scale;
		const e = asteroid.e;
		const b = a * Math.sqrt(1 - e ** 2);

		const orbit2D: THREE.Vector3[] = [];
		for (let i = 0; i <= 180; i++) {
			const theta = (i / 180) * 2 * Math.PI;
			const x = a * Math.cos(theta) - a * e; // center at focus
			const y = b * Math.sin(theta);
			orbit2D.push(new THREE.Vector3(x, y, 0));
		}

		const rad = (deg: number) => (deg * Math.PI) / 180;

		// Apply 3D orbital rotations
		const rotation = new THREE.Matrix4()
			.makeRotationZ(rad(asteroid.om))
			.multiply(new THREE.Matrix4().makeRotationX(rad(asteroid.i)))
			.multiply(new THREE.Matrix4().makeRotationZ(rad(asteroid.w)));

		return orbit2D.map((p) => p.clone().applyMatrix4(rotation));
	}, [asteroid, scale]);

	const [t, setT] = useState(0); // animation progress from 0 to 1

	useFrame((_, delta) => {
		if (!meshRef.current || points.length === 0) return;
		const nextT = (t + delta * 0.025) % 1; // modulo 1 to wrap
		setT(nextT);

		// Interpolate point
		const index = Math.floor(nextT * (points.length - 1));
		const nextIndex = (index + 1) % points.length;

		const p1 = points[index];
		const p2 = points[nextIndex];
		const lerped = p1.clone().lerp(p2, nextT * points.length - index);

		meshRef.current.position.copy(lerped);
		meshRef.current.rotation.y += 0.01;
	});

	return (
		<group>
			{showLines && (
				<Line points={points} color="gray" lineWidth={0.33} />
			)}
			<primitive
				object={clonedScene}
				ref={meshRef}
				scale={modelScaleMap[modelIndex]}
				onClick={() => navigate("/asteroidinfo", { state: asteroid })}
			/>
		</group>
	);
}
