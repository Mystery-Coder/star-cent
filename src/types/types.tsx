export type ThreeSceneProps = {
	asteroidNumber: number;
};

export type Asteroid = {
	id: string;
	full_name: string;
	name: string;
	a: number;
	e: number;
	i: number;
	om: number;
	w: number;
	ma: number;
	class: string;
	// [key: string]: any; for extra unknown fields
};
