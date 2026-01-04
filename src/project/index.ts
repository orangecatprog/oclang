import fs from 'fs';
import path from 'path';

import { ProjectType, type ProjectSettings } from "./models/project.js";
import { addIf } from '../shared/utils/objects.js';

export function createProject(ps: ProjectSettings) {
	const projectPath = path.resolve(ps.dir);
	
	fs.mkdirSync(path.join(projectPath, "src"), { recursive: true });
	fs.mkdirSync(path.join(projectPath, ".ocat"), { recursive: true });

	const mainFile = path.join(projectPath, "src", "main.ocat");
	if (ps.type !== ProjectType.Lib) {
		fs.writeFileSync(
			mainFile,
			'print("Hello World!")'
		);
	}

	fs.writeFileSync(
		path.join(projectPath, ".ocat", "config.json"),
		JSON.stringify(
			{
				name: ps.name,
				version: "1.0.0",
				description: "",
				...addIf(ps.type !== ProjectType.Lib, { main: path.join("src", "main.ocat") }),
				type: ps.type.toLowerCase(),
			},
			null,
			4
		)
	);
}