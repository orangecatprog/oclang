export enum ProjectType {
	App = "App",
	Lib = "Lib",
}

export interface ProjectSettings {
	name: string;
	dir: string;
	type: ProjectType;
}
