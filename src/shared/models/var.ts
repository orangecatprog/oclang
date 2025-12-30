export interface Variable {
	type: string;
	value: string;
	props: {
		isConst: boolean;
	}
}