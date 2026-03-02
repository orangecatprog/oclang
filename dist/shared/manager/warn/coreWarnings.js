import chalk from "chalk";
import { OcatManager } from "../baseManager.js";
import { LogLevel } from "../../../core/services/log.service.js";
export class OcatWarning extends OcatManager {
    constructor(name) {
        super(name, chalk.yellow, LogLevel.Warning);
    }
}
