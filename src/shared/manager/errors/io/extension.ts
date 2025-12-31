import { OcatError } from "../coreErrors.js";

export class ExtensionError extends OcatError {
	constructor(message: string) {
		super("ExtensionError");
		this.setMessage(message);
	}
}