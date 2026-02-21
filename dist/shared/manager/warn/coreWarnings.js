import chalk from "chalk";
import { OcatManager } from "../baseManager";
import { LogLevel } from "../../../core/services/log.service";
export class OcatWarning extends OcatManager {
    constructor(name) {
        super(name, chalk.yellow, LogLevel.Warning);
    }
}
