import chalk from "chalk";
import { OcatManager } from "../baseManager";
export class OcatWarning extends OcatManager {
    constructor(name) {
        super(name, chalk.yellow);
    }
}
