import chalk, {} from "chalk";
import * as ctx from "../context/globalContext.js";
export class OcatManager {
    name;
    message;
    color;
    level;
    constructor(name, color, level) {
        this.name = name;
        this.message = "";
        this.color = color;
        this.level = level;
    }
    toString(line = undefined) {
        return `${this.color.bold(this.name)}${line ? chalk.gray(` at line ${line}`) : ""}: ${this.color.italic(this.message)}`;
    }
    build(line = undefined) {
        return `${this.name}${line ?? ""}: ${this.message}`;
    }
    setMessage(message) {
        this.message = message;
        return this;
    }
    throw(line = undefined) {
        const log = ctx.get("services")?.log;
        const message = this.build(line);
        log?.log(message, this.level, this.toString(line));
        process.exit(1);
    }
}
