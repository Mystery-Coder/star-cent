import { Container, Typography } from "@mui/material";
import type { Asteroid } from "../types/types";
import { useLocation } from "react-router-dom";
import ThreeScene from "../components/ThreeScene";
export default function AsteroidInfo() {
	const loc = useLocation();
	const asteroid: Asteroid = loc.state.asteroid;
	const asteroidNumber: number = loc.state.asteroidNumber;
	console.log(asteroid.profit);

	return (
		<Container
			sx={{
				color: "white",
				alignItems: "center",
				display: "flex",
				justifyContent: "center",
				flexDirection: "column",
			}}
		>
			<Typography variant="h3">
				Info on Asteriod: {asteroid.name}
			</Typography>
			<div
				style={{
					width: "800px",
					height: "600px",
					border: "1px solid white",
					margin: "10px",
				}}
			>
				<ThreeScene asteroidNumber={asteroidNumber} />
			</div>
			<Typography>
				{asteroid.profit} {asteroid.closeness} km
			</Typography>
		</Container>
	);
}
