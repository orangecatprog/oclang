import { execute } from "../../../core/index.js";
import { ExtensionError } from "../../../shared/manager/errors/io/extension.js";
import chalk from "chalk";

import fs from "fs";
import { FileDoesntExistError } from "../../../shared/manager/errors/io/file.js";

export interface RunCommandOptions {
    force: boolean;
}

export function runfile(file: string, options: RunCommandOptions) {
    if (!file.endsWith(".ocat") && !options.force) { 
		new ExtensionError(
			"File must be a .ocat file. Use -f to force execution with other extensions"
		).throw();
    }

    if (options.force) {
        console.log(chalk.blue(`Running in force mode`));
	}
	
	if(!fs.existsSync(file)) {
		new FileDoesntExistError(`File ${file} doesn't exist`)
			.throw();
	}

    const fileText = fs.readFileSync(file, "utf8");


    execute(fileText);    
}