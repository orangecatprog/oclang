import { OcatError } from "../../../shared/manager/errors/coreErrors.js";
import { UndeclaredVariableError } from "../../../shared/manager/errors/semantic/undefined/undeclared.js";
export function solveString(input, context, err) {
    let str = input;
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
