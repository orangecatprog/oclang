import { OcatError } from "../../../shared/manager/errors/coreErrors";
import { UndeclaredVariableError } from "../../../shared/manager/errors/semantic/undefined/undeclared";
import type { CoreContext } from "../../context/coreContext";

export function solveString(input: string, context: CoreContext, err: (err: OcatError) => void): string {
	let str: string = input;

	str = str.slice(1, -1);

	str = str.replace(/\$\{([^}]+)\}/g, (match, varName) => {
		const value = context.variables[varName.trim()];
		if (!value) {
			err(new UndeclaredVariableError(varName.trim()));
		}
		return value?.value ?? "";
	});

	return str;
}