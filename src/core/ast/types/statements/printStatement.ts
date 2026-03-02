import type { Value } from "../../../../shared/models/value.js";
import type { Statement, StatementKind } from "../base/index.js";


export interface PrintStatement extends Statement {
	kind: StatementKind.PrintStatement;
	value: Value;
}