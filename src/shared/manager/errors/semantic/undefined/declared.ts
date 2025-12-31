import { ContextType } from "../../../../../core/context/contextType.js";
import { OcatError } from "../../coreErrors.js";

export class AlreadyDeclaredError extends OcatError {
	constructor(varName: string, type: ContextType) {
		super(`Already declared ${type.toLowerCase()}`);
		this.setMessage(`${type} ${varName} is already declared`);
	}
}

export class AlreadyDeclaredVariableError extends AlreadyDeclaredError {
	constructor(varName: string) {
		super(varName, ContextType.Variable);
	}
}

export class AlreadyDeclaredFunctionError extends AlreadyDeclaredError {
	constructor(varName: string) {
		super(varName, ContextType.Function);
	}
}

export class CantModifyConstError extends OcatError {
	constructor(varName: string) {
		super(`Can't modify const variable`);
		this.setMessage(`Variable ${varName} is const and can't be modified`);
	}
}