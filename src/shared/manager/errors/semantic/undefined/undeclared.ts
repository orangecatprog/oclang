import { ContextType } from "../../../../../core/context/contextType.js";
import { OcatError } from "../../coreErrors.js";

export class UndeclaredError extends OcatError {
	constructor(varName: string, type: ContextType) {
		super(`Undeclared ${type.toLowerCase()}`);
		this.message = `${type} ${varName} is not declared`;
	}
}

export class UndeclaredVariableError extends UndeclaredError {
	constructor(varName: string) {
		super(varName, ContextType.Variable);
	}
}

export class UndeclaredFunctionError extends UndeclaredError {
	constructor(varName: string) {
		super(varName, ContextType.Function);
	}
}