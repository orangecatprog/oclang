import { StatementKind } from "../types/base/index.js";
import type { ImportStatement } from "../types/statements/importStatement.js";
import type { FBuilder } from "./_base.js";

const importStatement: FBuilder<ImportStatement> = (statement: any) => {
	const node = statement.children.importStatement?.[0];
	if (!node) return null;

	const stringToken = node.children.StringLiteral?.[0];
	if (!stringToken) return null;

	const rawValue = stringToken.image;

	const path = rawValue.slice(1, -1) as string;

	return {
		kind: StatementKind.ImportStatement,
		path,
	};
};

export const importStatements = [importStatement];
