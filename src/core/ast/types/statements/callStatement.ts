import type { Value } from "../../../../shared/models/value";
import type { Statement, StatementKind } from "../base";

export interface CallStatement extends Statement {
	kind: StatementKind.CallStatement;
	id: string;
}