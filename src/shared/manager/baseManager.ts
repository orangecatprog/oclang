import chalk, { type ChalkInstance } from "chalk";

export class OcatManager {
	public name: string;
	public message: string;
	public color: ChalkInstance;

	constructor(name: string, color: ChalkInstance) {
		this.name = name;
		this.message = "";
		this.color = color;
	}

	toString(line: number | undefined = undefined): string {
		return `${this.color.bold(this.name)}${
			line ? chalk.gray(` at line ${line}`) : ""
		}: ${this.color.italic(this.message)}`;
	}

	setMessage(message: string): this {
		this.message = message;
		return this;
	}

	throw(line: number | undefined = undefined): never {
		console.log(this.toString(line));
		process.exit(1);
	}
}
