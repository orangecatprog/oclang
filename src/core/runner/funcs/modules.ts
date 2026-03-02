import { execute } from "../../index.js";
import type { ImportStatement } from "../../ast/types/statements/index.js";
import type { RunnerFunc } from "./_base.js";
import fs from "fs";
import * as gctx from "../../../shared/context/globalContext.js";
import type { ModuleService } from "../../services/module.service.js";

export const importStatement: RunnerFunc<ImportStatement> = (
	statement,
	context,
) => {
	const fctx = (gctx.getService("module") as ModuleService).loadModule(statement.path);
	if (!fctx) return;
	for (const [key, value] of Object.entries(fctx.variables)) {
		context.variables[key] = value;
	}
	for (const [key, value] of Object.entries(fctx.functions)) {
		context.functions[key] = value;
	}
};
