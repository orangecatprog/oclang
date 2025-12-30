import type { FunctionStatement } from "./functionStatement";
import type { PrintStatement } from "./printStatement";
import type { VariableStatement } from "./variableStatement";
import type { CallStatement } from "./callStatement";

export * from "./printStatement";
export * from "./variableStatement";
export * from "./functionStatement";
export * from "./callStatement";


export type AnyStatement =
	| PrintStatement
	| VariableStatement
	| FunctionStatement
	| CallStatement;