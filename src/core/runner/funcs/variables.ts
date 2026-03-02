import {
	AlreadyDeclaredVariableError,
	CantModifyConstError,
} from "../../../shared/manager/errors/semantic/undefined/declared.js";
import { UndeclaredVariableError } from "../../../shared/manager/errors/semantic/undefined/undeclared.js";
import { ValueType } from "../../../shared/models/value.js";
import type { VariableStatement } from "../../ast/types/statements/index.js";
import { solveString } from "../utils/string.js";
import type { RunnerFunc } from "./_base.js";

export const variableStatement: RunnerFunc<VariableStatement> = (
	statement,
	context,
) => {

	const varId = statement.id;

	/*if (statement.set) {
		if (!context.variables[varId]) {
			new UndeclaredVariableError(varId).throw(
				statement.sourceInfo.startLine,
			);
		}
		if (context.variables[varId]?.props.isConst) {
			new CantModifyConstError(varId).throw(
				statement.sourceInfo.startLine,
			);
		}
	} else if (!statement.var.props.isConst) {
		if (context.variables[varId]) {
			new AlreadyDeclaredVariableError(varId).throw(
				statement.sourceInfo.startLine,
			);
		}
	}*/

	let value: string = statement.var.value;

	switch (statement.var.type) {
		case ValueType.String:
			value = solveString(value, context, (err) => {
				err.throw(statement.sourceInfo.startLine);
			});
			break;
		default:
			break;
	}

	context.variables[varId] = {
		type: statement.var.type,
		value,
		props: {
			isConst: !!statement.var.props.isConst,
		},
	};

};
