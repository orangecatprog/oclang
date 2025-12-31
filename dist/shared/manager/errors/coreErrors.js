import chalk from "chalk";
import { OcatManager } from "../baseManager.js";
export class OcatError extends OcatManager {
    constructor(name) {
        super(name, chalk.red);
    }
}
