import type { Statement, StatementKind } from "../base/index.js";
import type { Function } from "../../../../shared/models/func.js";

export interface FunctionStatement extends Statement {
	kind: StatementKind.FunctionStatement;
	id: string;
	func: Function;
}