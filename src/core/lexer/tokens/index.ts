export * from "./ignored.js";
export * from "./comments.js";
export * from "./keywords.js";
export * from "./literals.js";
export * from "./delimiters.js";
export * from "./vars.js";
export * from "./operators.js";
export * from "./attrs.js";
export * from "./function.js";

import { ignored } from "./ignored.js";
import { comments } from "./comments.js";
import { keywords } from "./keywords.js";
import { literals } from "./literals.js";
import { delimiters } from "./delimiters.js";
import { variablesAndConstants } from "./vars.js";
import { operators } from "./operators.js";
import { attributes } from "./attrs.js";
import { functions } from "./function.js";

export const allTokens = [
	...ignored,
	...comments,
	...keywords,
	...attributes,
	...functions,
	...literals,
	...delimiters,
	...variablesAndConstants,
	...operators,
];