import { createToken } from "chevrotain";

export const StringLiteral = createToken({
	name: "StringLiteral",
	pattern: /"(?:[^\\"]|\\.)*"/,
});
export const NumberLiteral = createToken({
	name: "NumberLiteral",
	pattern: /\d+(\.\d+)?/,
});
export const BooleanLiteral = createToken({
	name: "BooleanLiteral",
	pattern: /true|false/,
});

export const literals = [StringLiteral, NumberLiteral, BooleanLiteral];