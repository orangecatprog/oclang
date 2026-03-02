import type { Variable } from "../../../../shared/models/var.js";
import type { Statement, StatementKind } from "../base/index.js";

export interface VariableStatement extends Statement {
	kind: StatementKind.VariableStatement;
	id: string;
	var: Variable;
	set: boolean;
}