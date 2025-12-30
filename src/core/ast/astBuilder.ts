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
import { StatementKind } from "./types/base/index.js";
import type { AnyStatement, PrintStatement } from "./types/statements/index.js";
import { isNoSubstitutionTemplateLiteral } from "typescript";

export type BuildType = AnyStatement | null;

export function buildAst(cst: any): AnyStatement[] {
	const statements = cst.children.statement ?? [];
	const ast: AnyStatement[] = [];

	for (const statement of statements) {
		let __tmp: BuildType = null;
		const __$tmp = () => { if (__tmp) ast.push(__tmp); }
		__tmp = printStatement(statement);
		__$tmp();
		__tmp = variableStatement(statement);
		__$tmp();
		__tmp = functionStatement(statement);
		__$tmp();
		__tmp = callStatement(statement);
		__$tmp();
	}

	return ast;
}

export type FBuilder = (statement: any) => AnyStatement | null;

const printStatement: FBuilder = (statement: any) => {
	const printStmt = statement.children.printStatement?.[0];
	if (printStmt) {
		const strToken = printStmt.children.StringLiteral?.[0];
		if (strToken) {
			return {
				kind: StatementKind.PrintStatement,
				sourceInfo: {
					tokens: printStmt.children,
					cstNode: printStmt,
					startLine: printStmt.startLine,
					endLine: printStmt.endLine,
					startColumn: printStmt.startColumn,
					endColumn: printStmt.endColumn,
				},
				value: {
					value: strToken.image,
					type: ValueType.String,
				}
			} as PrintStatement;
		}

		const idToken = printStmt.children.Identifier?.[0];
		if (idToken) {
			return {
				kind: StatementKind.PrintStatement,
				sourceInfo: {
					tokens: printStmt.children,
					cstNode: printStmt,
					startLine: printStmt.startLine,
					endLine: printStmt.endLine,
					startColumn: printStmt.startColumn,
					endColumn: printStmt.endColumn,
				},
				value: {
					value: idToken.image,
					type: ValueType.Identifier,
				}
			}
		}
	}
	return null;
}

const variableStatement: FBuilder = (statement: any) => {
	const varStmt = statement.children.variableStatement?.[0];
	if (varStmt) {
		const typeToken = varStmt.children.VarType?.[0];
		const idToken = varStmt.children.Identifier?.[0];
		const valueToken =
			varStmt.children.StringLiteral?.[0] ??
			varStmt.children.NumberLiteral?.[0] ??
			varStmt.children.BooleanLiteral?.[0];

		if (!typeToken || !idToken || !valueToken) return null;

		const setToken = varStmt.children.Set?.[0];
		const constToken = varStmt.children.Const?.[0];

		const type = typeToken.image as ValueType;
		const id = idToken.image;
		const value: string = valueToken.image;
		return {
			kind: StatementKind.VariableStatement,
			sourceInfo: {
				tokens: varStmt.children,
				cstNode: varStmt,
				startLine: varStmt.startLine,
				endLine: varStmt.endLine,
				startColumn: varStmt.startColumn,
				endColumn: varStmt.endColumn,
			},
			id,
			var: {
				type,
				value,
				props: {
					isConst: !!constToken,
				}
			},
			set: !!setToken,
		}
	}
	return null;
}

const functionStatement: FBuilder = (statement: any) => {
	const funcStmt = statement.children.functionStatement?.[0];
	if (funcStmt) {
		const idToken = funcStmt.children.Identifier?.[0];
		if (!idToken) return null;
		const id = idToken.image;

		const body = funcStmt.children.statement ?? [];

		return {
			kind: StatementKind.FunctionStatement,
			sourceInfo: {
				tokens: funcStmt.children,
				cstNode: funcStmt,
				startLine: funcStmt.startLine,
				endLine: funcStmt.endLine,
				startColumn: funcStmt.startColumn,
				endColumn: funcStmt.endColumn,
			},
			id,
			func: {
				body,
				scope: createCoreContext(),
			}
		}
	}
	return null
}

const callStatement: FBuilder = (statement: any) => {
	const callStmt = statement.children.callStatement?.[0];
	if (callStmt) {
		const idToken = callStmt.children.Identifier?.[0];
		if (!idToken) return null;
		const id = idToken.image;

		return {
			kind: StatementKind.CallStatement,
			sourceInfo: {
				tokens: callStmt.children,
				cstNode: callStmt,
				startLine: callStmt.startLine,
				endLine: callStmt.endLine,
				startColumn: callStmt.startColumn,
				endColumn: callStmt.endColumn,
			},
			id,
		};
	}
	return null;
};
