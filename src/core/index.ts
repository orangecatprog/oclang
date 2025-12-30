import { ocatLexer } from "./lexer/tokens";
import { OcatParser } from "./parser/parser";
import { run } from "./runner/runner";
import { createCoreContext } from "./context/coreContext";
import { buildAst } from "./ast/astBuilder";

export function execute(code: string) {
	const lexingResult = ocatLexer.tokenize(code);

	const parser = new OcatParser();
	parser.input = lexingResult.tokens;
	const cst = parser.program();
	const ast = buildAst(cst, );

	const context = createCoreContext();
	run(ast, context);
}
