import chalk from "chalk";
import { OcatManager } from "../baseManager";

export class OcatWarning extends OcatManager {
	constructor(name: string) {
		super(name, chalk.yellow);
	}
}