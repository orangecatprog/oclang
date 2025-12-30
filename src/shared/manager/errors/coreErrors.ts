import chalk from "chalk";
import { OcatManager } from "../baseManager";

export class OcatError extends OcatManager {
	constructor(name: string) {
		super(name, chalk.red);
	}
}

export * from "./api";