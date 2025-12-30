import {
	AlreadyDeclaredFunctionError,
	AlreadyDeclaredVariableError,
	CantModifyConstError,
} from "../../shared/manager/errors/semantic/undefined/declared.js";
import {
	UndeclaredFunctionError,
	UndeclaredVariableError,
} from "../../shared/manager/errors/semantic/undefined/undeclared.js";
import { createCoreContext, type CoreContext } from "../context/coreContext.js";
import { ValueType } from "../../shared/models/value.js";
import { solveString } from "./utils/string.js";
import type { AnyStatement, CallStatement, FunctionStatement, PrintStatement, VariableStatement } from "../ast/types/statements/index.js";
import { StatementKind } from "../ast/types/base/statement.js";

export function run(ast: AnyStatement[], context: CoreContext) {

	for (const statement of ast) {
		switch (statement.kind) {
			case StatementKind.PrintStatement:
				printStatement(statement, context);
				break;
			case StatementKind.VariableStatement:
				variableStatement(statement, context);
				break;
			case StatementKind.FunctionStatement:
				functionStatement(statement, context);
				break;
			case StatementKind.CallStatement:
				callStatement(statement, context);
				break;
		}
	}
}

function printStatement(statement: PrintStatement, context: CoreContext) {
	let val;
	switch (statement.value.type) {
		case ValueType.Identifier:
			const id = statement.value.value;
			const varData = context.variables[id];
			if (varData !== undefined) {
				val = varData.value;
			} else {
				new UndeclaredVariableError(id).throw(statement.sourceInfo.startLine);
			}
			break;
		
		case ValueType.String:
			val = solveString(statement.value.value, context, (err) => {
				err.throw(statement.sourceInfo.startLine);
			})
			break;
		
		default:
			val = statement.value.value;
			break;
	}
	console.log(val);
}

function variableStatement(statement: VariableStatement, context: CoreContext) {
	const varId = statement.id;
	if (statement.set) {
		if (!context.variables[varId]) {
			new UndeclaredVariableError(varId).throw(
				statement.sourceInfo.startLine
			);
		}
		if (context.variables[varId]?.props.isConst) {
			new CantModifyConstError(varId).throw(
				statement.sourceInfo.startLine
			);
		}
	} else if (!statement.var.props.isConst) {
		if (context.variables[varId]) {
			new AlreadyDeclaredVariableError(varId).throw(
				statement.sourceInfo.startLine
			);
		}
	}

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
}

function functionStatement(statement: FunctionStatement, context: CoreContext) {
	const idToken = statement.id;
	if (!idToken) return;

	const funcData = context.functions[idToken];
	if (funcData) {
		new AlreadyDeclaredFunctionError(idToken).throw(statement.sourceInfo.startLine);
	}

	const body = statement.func.body ?? [];
	const scope = statement.func.scope;
	context.functions[idToken] = {
		body,
		scope,
	};
}

function callStatement(statement: CallStatement, context: CoreContext) {
	const funcId = statement.id
	if (!funcId) return;

	const funcData = context.functions[funcId];
	if (!funcData) {
		new UndeclaredFunctionError(funcId).throw(statement.sourceInfo.startLine);
	}
	run(funcData.body, context.functions[funcId].scope);
}
