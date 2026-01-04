export enum ProjectType {
	App = "App",
	Lib = "Lib",
}

export interface ProjectSettings {
	name: string;
	dir: string;
	id: string;
	type: ProjectType;
}
