import type { SourceInfo } from "./source";

export enum StatementKind {
	PrintStatement,
	VariableStatement,
	FunctionStatement,
	CallStatement,
}

export interface Statement {
	kind: StatementKind;
	sourceInfo: SourceInfo;
}
