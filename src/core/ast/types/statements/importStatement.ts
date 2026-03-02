import type { StatementKind } from "../base/index.js";

export interface ImportStatement {
	kind: StatementKind.ImportStatement;
	path: string;
}