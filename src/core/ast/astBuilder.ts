import type { AnyStatement, PrintStatement } from "./types/statements/index.js";
import { ioStatements } from "./statements/io.js";
import { variableStatements } from "./statements/vars.js";
import { functionStatements } from "./statements/function.js";
import { importStatements } from "./statements/import.js";
import type { FBuilder } from "./statements/_base.js";

export type BuildType = AnyStatement | null;

const possibleStatements: FBuilder<AnyStatement>[] = [
	...ioStatements,
	...variableStatements,
	...functionStatements,
	...importStatements,
];

export function buildAst(cst: any): AnyStatement[] {
	const statements = cst.children.statement ?? [];
	const ast: AnyStatement[] = [];

	for (const node of statements) {
		let built: AnyStatement | null = null;

		for (const builder of possibleStatements) {
			built = builder(node);
			if (built) break;
		}

		if (built) {
			ast.push(built);
		}
	}

	return ast;
}