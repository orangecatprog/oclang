import chalk, { type ChalkInstance } from "chalk";
import * as ctx from "../context/globalContext.js";
import type { LogLevel } from "../../core/services/log.service.js";

export class OcatManager {
	public name: string;
	public message: string;
	public color: ChalkInstance;
	public level: LogLevel;
	public printFn: (message: string) => void;

	constructor(name: string, color: ChalkInstance, level: LogLevel) {
		this.name = name;
		this.message = "";
		this.color = color;
		this.level = level;
		this.printFn = console.log;
	}

	toString(line: number | undefined = undefined): string {
		return `${this.color.bold(this.name)}${
			line ? chalk.gray(` at line ${line}`) : ""
		}: ${this.color.italic(this.message)}`;
	}

	build(line: number | undefined = undefined): string {
		return `${this.name}${line ?? ""}: ${this.message}`;
	}

	setMessage(message: string): this {
		this.message = message;
		return this;
	}

	throw(line: number | undefined = undefined): never {
		const log = ctx.get("services")?.log;
		const message = this.build(line);
		log?.log(message, this.level, this.toString(line));
		process.exit(1);
	}
}
