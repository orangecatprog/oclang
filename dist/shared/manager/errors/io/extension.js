import { OcatError } from "../coreErrors.js";
export class ExtensionError extends OcatError {
    constructor(message) {
        super("ExtensionError");
        this.setMessage(message);
    }
}
