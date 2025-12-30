import { createToken } from "chevrotain";

export const Function = createToken({
	name: "Function",
	pattern: /func/,
});

export const Call = createToken({
	name: "Call",
	pattern: /call/,
});

export const functions = [Function, Call];