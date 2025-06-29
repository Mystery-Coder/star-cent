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

	//Value and economic
	profit: number;
	price: number;
	dv: number;
	closeness: number;

	//For composition
	spec?: string;
	spec_B?: string;
	spec_T?: string;
	albedo?: number;
	H?: number;
	UB?: number;
	BV?: number;

	neo?: "Y" | "N";
	pha?: "Y" | "N";
};
