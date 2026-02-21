import { ocatLexer } from "./lexer/tokens.js";
import { OcatParser } from "./parser/parser.js";
import { run } from "./runner/runner.js";
import { createCoreContext } from "./context/coreContext.js";
import { buildAst } from "./ast/astBuilder.js";
import * as ctx from "../shared/context/globalContext.js";
import fs from "fs";

export function execute(code: string) {
	const lexingResult = ocatLexer.tokenize(code);

	const parser = new OcatParser();
	parser.input = lexingResult.tokens;
	const cst = parser.program();
	const ast = buildAst(cst);

	process.on("exit", () => {
		if (ctx.get("isProject")) {
			const logs = ctx.get("services").log.toString();
			fs.writeFileSync(".ocat/logs.txt", logs);
		}
	});

	const context = createCoreContext();
	run(ast, context);
}
