import { SyntaxError } from "./syntaxErrors.js";

export class UndefinedToken extends SyntaxError {
	constructor() {
		super(`Undefined token`);
	}
}

export class UnexpectedToken extends SyntaxError {
	constructor(token: string) {
		super(`Unexpected token: ${token}`);
	}
}