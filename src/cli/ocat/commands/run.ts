import { execute } from "../../../core/index.js";
import { OcatError } from "../../../shared/manager/errors/coreErrors.js";

import chalk from "chalk";

import fs from "fs";

export interface RunCommandOptions {
    force: boolean;
}

export function runfile(file: string, options: RunCommandOptions) {
    if (!file.endsWith(".ocat") && !options.force) { 
        new OcatError("File must be a .ocat file. Use -f to force execution with other extensions")
            .throw();
        process.exit(1);
    }

    if (options.force) {
        console.log(chalk.blue(`Running in force mode`));
    }

    const fileText = fs.readFileSync(file, "utf8");


    execute(fileText);    
}