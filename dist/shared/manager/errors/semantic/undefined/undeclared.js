import { ContextType } from "../../../../../core/context/contextType.js";
import { OcatError } from "../../coreErrors.js";
export class UndeclaredError extends OcatError {
    constructor(varName, type) {
        super(`Undeclared ${type.toLowerCase()}`);
        this.setMessage(`${type} ${varName} is not declared`);
    }
}
export class UndeclaredVariableError extends UndeclaredError {
    constructor(varName) {
        super(varName, ContextType.Variable);
    }
}
export class UndeclaredFunctionError extends UndeclaredError {
    constructor(varName) {
        super(varName, ContextType.Function);
    }
}
