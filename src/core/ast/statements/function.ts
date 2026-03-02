import { createCoreContext } from "../../context/coreContext.js";
import { buildAst } from "../astBuilder.js";
import { StatementKind } from "../types/base/index.js";
import type { CallStatement } from "../types/statements/callStatement.js";
import type { FunctionStatement } from "../types/statements/functionStatement.js";
import type { FBuilder } from "./_base.js";

const functionStatement: FBuilder<FunctionStatement> = (statement: any) => {
	const funcStmt = statement.children.functionStatement?.[0];
	if (funcStmt) {
		const idToken = funcStmt.children.Identifier?.[0];
		if (!idToken) return null;
		const id = idToken.image;

		const body = buildAst(funcStmt);

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
			},
		};
	}
	return null;
};

const callStatement: FBuilder<CallStatement> = (statement: any) => {
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

export const functionStatements = [functionStatement, callStatement];
