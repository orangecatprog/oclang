import type { SourceInfo } from "./source.js";

export enum StatementKind {
	PrintStatement,
	VariableStatement,
	FunctionStatement,
	CallStatement,
	ImportStatement,
}

export interface Statement {
	kind: StatementKind;
	sourceInfo: SourceInfo;
}
