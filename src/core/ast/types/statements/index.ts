import type { FunctionStatement } from "./functionStatement.js";
import type { PrintStatement } from "./printStatement.js";
import type { VariableStatement } from "./variableStatement.js";
import type { CallStatement } from "./callStatement.js";
import type { ImportStatement } from "./importStatement.js";

export * from "./printStatement.js";
export * from "./variableStatement.js";
export * from "./functionStatement.js";
export * from "./callStatement.js";
export * from "./importStatement.js";


export type AnyStatement =
	| PrintStatement
	| VariableStatement
	| FunctionStatement
	| CallStatement
	| ImportStatement;