import { ContextType } from "../../../../../core/context/contextType";
import { OcatError } from "../../coreErrors";

export class AlreadyDeclaredError extends OcatError {
	constructor(varName: string, type: ContextType) {
		super(`Already declared ${type.toLowerCase()}`);
		this.message = `${type} ${varName} is already declared`;
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
		this.message = `Variable ${varName} is const and can't be modified`;
	}
}