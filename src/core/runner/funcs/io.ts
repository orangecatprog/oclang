import { UndeclaredVariableError } from "../../../shared/manager/errors/semantic/undefined/undeclared.js";
import { ValueType } from "../../../shared/models/value.js";
import type { PrintStatement } from "../../ast/types/statements/index.js";
import { solveString } from "../utils/string.js";
import * as ctx from "../../../shared/context/globalContext.js";
import type { RunnerFunc } from "./_base.js";

export const printStatement: RunnerFunc<PrintStatement> = (
	statement,
	context,
) => {
	let val;
	switch (statement.value.type) {
		case ValueType.Identifier:
			const id = statement.value.value;
			const varData = context.variables[id];
			if (varData !== undefined) {
				val = varData.value;
			} else {
				new UndeclaredVariableError(id).throw(
					statement.sourceInfo.startLine,
				);
			}
			break;

		case ValueType.String:
			val = solveString(statement.value.value, context, (err) => {
				err.throw(statement.sourceInfo.startLine);
			});
			break;

		default:
			val = statement.value.value;
			break;
	}
	const info = ctx.getService("log");
	info?.info(val);
};
