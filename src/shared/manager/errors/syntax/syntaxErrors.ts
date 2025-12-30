import { OcatError } from "../coreErrors.js";

export class SyntaxError extends OcatError {
	constructor(message: string) {
		super("SyntaxError");
		this.message = message;
	}
}