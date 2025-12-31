import { OcatError } from "../coreErrors.js";
export class SyntaxError extends OcatError {
    constructor(message) {
        super("SyntaxError");
        this.message = message;
    }
}
