import type { AnyStatement, PrintStatement } from "./types/statements/index.js";
import { ioStatements } from "./statements/io.js";
import { variableStatements } from "./statements/vars.js";
import { functionStatements } from "./statements/function.js";

export type BuildType = AnyStatement | null;


const possibleStatements = [
	...ioStatements,
	...variableStatements,
	...functionStatements,
]
export function buildAst(cst: any): AnyStatement[] {
	const statements = cst.children.statement ?? [];
	const ast: AnyStatement[] = [];

	for (const statement of possibleStatements) {
		let __tmp: BuildType = null;
		const __$tmp = () => { if (__tmp) ast.push(__tmp); }
		for (const builder of statements) {
			__tmp = builder(statement);
			__$tmp();
		}
	}

	return ast;
}