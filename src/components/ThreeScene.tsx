import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import Asteroid from "./Asteroid";
import type { ThreeSceneProps } from "../types/types";

// const getFOV = (asteroidNumber: number) => {
//     switch (asteroidNumber) {
//         case 1:
//             return 60;
//         case 2:
//             return 100;
//     }
// };

export default function ThreeScene({ asteroidNumber }: ThreeSceneProps) {
	return (
		<Canvas camera={{ position: [0, 0, 4], fov: 70 }}>
			<ambientLight intensity={0.1} />
			<directionalLight position={[5, 5, 5]} intensity={1} />
			<Asteroid asteroidNumber={asteroidNumber} />
			<OrbitControls enableZoom minDistance={2} maxDistance={50} />
			<Environment preset="sunset" />
		</Canvas>
	);
}
