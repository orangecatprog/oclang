import type { Statement, StatementKind } from "../base/index.js";

export interface CallStatement extends Statement {
	kind: StatementKind.CallStatement;
	id: string;
}