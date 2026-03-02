import { execute } from "../../index.js";
import type { ImportStatement } from "../../ast/types/statements/index.js";
import type { RunnerFunc } from "./_base.js";
import fs from "fs";

export const importStatement: RunnerFunc<ImportStatement> = (
	statement,
	context,
) => {
	const fctx = execute(fs.readFileSync(statement.path).toString());
	for (const [key, value] of Object.entries(fctx.variables)) {
		context.variables[key] = value;
	}
	for (const [key, value] of Object.entries(fctx.functions)) {
		context.functions[key] = value;
	}
};
