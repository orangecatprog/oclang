import type { ValueType } from "../../../shared/models/value.js";
import { StatementKind } from "../types/base/index.js";
import type { VariableStatement } from "../types/statements/index.js";
import type { FBuilder } from "./_base.js";

const variableStatement: FBuilder<VariableStatement> = (statement: any) => {
	const varStmt = statement.children.variableStatement?.[0];
	if (!varStmt) return null;

	const typeToken = varStmt.children.VarType?.[0];
	const idToken = varStmt.children.Identifier?.[0];

	const valueToken =
		varStmt.children.StringLiteral?.[0] ??
		varStmt.children.NumberLiteral?.[0] ??
		varStmt.children.BooleanLiteral?.[0];

	if (!typeToken || !idToken || !valueToken) return null;

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
				isConst: false,
			},
		},
		set: false,
	};
};

export const variableStatements = [variableStatement];
