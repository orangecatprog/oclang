import { OcatError } from "../coreErrors.js";
export class FileDoesntExistError extends OcatError {
    constructor(message) {
        super("FileDoesn'tExistError");
        this.setMessage(message);
    }
}
