import type { Variable } from "../../../../shared/models/var";
import type { Statement, StatementKind } from "../base";

export interface VariableStatement extends Statement {
	kind: StatementKind.VariableStatement;
	id: string;
	var: Variable;
	set: boolean;
}