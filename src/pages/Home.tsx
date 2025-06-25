import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
// import ThreeScene from "../components/ThreeScene";
import { useEffect, useState } from "react";
import type { Asteroid } from "../types/types";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import OrbitAsteroid from "../components/OrbitAsteroid";

export default function Home() {
	const navigate = useNavigate();
	const [asteroids, setAsteroids] = useState<Asteroid[]>([]);
	const ASTERANK_URL =
		"https://www.asterank.com/api/asterank?query={}&limit=15&diameter=true";
	useEffect(() => {
		const getAsteroids = async () => {
			try {
				const res = await fetch(ASTERANK_URL);
				const data: Asteroid[] = await res.json();
				setAsteroids(data);
			} catch (err) {
				console.log("error on asteroid load");
			}
		};
		getAsteroids();
	}, []);

	return (
		<>
			<AppBar
				position="static"
				sx={{ backgroundColor: "rgb(25, 25, 112)", borderRadius: 2 }}
			>
				<Toolbar>
					<Typography variant="h6" sx={{ flexGrow: 1 }}>
						Star Cent - The Riches of Asteroids
					</Typography>
					<Button color="inherit" onClick={() => navigate("/about")}>
						About
					</Button>
				</Toolbar>
			</AppBar>
			<Typography
				component="div"
				sx={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					height: "100vh", // match the canvas height
					width: "100vw", // ensure full width
				}}
			>
				{asteroids.length > 0 ? (
					<Canvas
						style={{
							width: "100%",
							height: "100%",
							// backgroundColor: "black",
							display: "block",
						}}
						camera={{ position: [0, 0, 20], fov: 50 }}
					>
						{/* <Typography>fdfdf</Typography> */}
						<ambientLight intensity={2} />
						<pointLight position={[10, 10, 10]} />
						{asteroids.map((ast) => (
							<OrbitAsteroid
								key={ast.id}
								asteroid={ast}
								scale={5}
								showLines={true}
							/>
						))}
						<OrbitControls />
					</Canvas>
				) : (
					"Loading..."
				)}
			</Typography>

			{/* <div
                    style={{
                        width: "600px",
                        height: "400px",
                        background: "black",
                    }}
                >
                    <ThreeScene asteroidNumber={2} />
                </div> */}
		</>
	);
}
