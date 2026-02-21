import type { ValueType } from "../../../shared/models/value";
import { StatementKind } from "../types/base";
import type { FBuilder } from "./base";

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
				},
			},
			set: !!setToken,
		};
	}
	return null;
};

export const variableStatements = [variableStatement];
