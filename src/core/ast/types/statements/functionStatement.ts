import type { Statement, StatementKind } from "../base";
import type { Function } from "../../../../shared/models/func";

export interface FunctionStatement extends Statement {
	kind: StatementKind.FunctionStatement;
	id: string;
	func: Function;
}