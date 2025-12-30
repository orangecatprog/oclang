import { createToken, Lexer } from "chevrotain";

export const Const = createToken({
	name: "Const",
	pattern: /const/,
});

export const attributes = [Const];