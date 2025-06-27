import { Typography } from "@mui/material";
import type { Asteroid } from "../types/types";
import { useLocation } from "react-router-dom";
export default function AsteroidInfo() {
	const loc = useLocation();
	const asteroid: Asteroid = loc.state;
	console.log(asteroid.name);

	return <Typography sx={{ color: "white" }}>Asteroid Info</Typography>;
}
