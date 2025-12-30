import { createToken, Lexer } from "chevrotain";

export const LineComment = createToken({
	name: "LineComment",
	pattern: /\/\/[^\n]*/,
	group: Lexer.SKIPPED,
});
export const BlockComment = createToken({
	name: "BlockComment",
	pattern: /\/\*[\s\S]*?\*\//,
	group: Lexer.SKIPPED,
});

export const comments = [LineComment, BlockComment];