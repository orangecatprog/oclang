import { AlreadyDeclaredFunctionError } from "../../shared/manager/errors/semantic/undefined/declared.js";
import {
	UndeclaredFunctionError,
	UndeclaredVariableError,
} from "../../shared/manager/errors/semantic/undefined/undeclared.js";
import type {
	AnyStatement,
	CallStatement,
	FunctionStatement,
	PrintStatement,
	VariableStatement,
} from "../ast/types/statements/index.js";
import { StatementKind } from "../ast/types/base/statement.js";
import type { RunnerFunc } from "./funcs/_base.js";
// import { coreContext as context } from "../context/coreContext.js";
import { printStatement } from "./funcs/io.js";
import { variableStatement } from "./funcs/variables.js";
import { callStatement, functionStatement } from "./funcs/functions.js";
import type { CoreContext } from "../context/coreContext.js";
import { importStatement } from "./funcs/modules.js";

const statementMap = new Map<StatementKind, RunnerFunc<any>>([
	[StatementKind.PrintStatement, printStatement],
	[StatementKind.VariableStatement, variableStatement],
	[StatementKind.FunctionStatement, functionStatement],
	[StatementKind.CallStatement, callStatement],
	[StatementKind.ImportStatement, importStatement],
]);

export function run(ast: AnyStatement[], context: CoreContext) {
	for (const statement of ast) {
		const runner = statementMap.get(statement.kind);

		if (!runner) {
			throw new Error(`No runner for statement kind: ${statement.kind}`);
		}

		runner(statement, context);
	}
	return context;
}
