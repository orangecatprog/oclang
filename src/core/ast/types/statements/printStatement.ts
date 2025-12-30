import type { Value } from "../../../../shared/models/value";
import type { Statement, StatementKind } from "../base";


export interface PrintStatement extends Statement {
	kind: StatementKind.PrintStatement;
	value: Value;
}