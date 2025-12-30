import type { AnyStatement } from "../../core/ast/types/statements/index.js";
import type { CoreContext } from "../../core/context/coreContext.js";
import type { ValueType } from "./value.js";
import type { Variable } from "./var.js";

export interface Param {
	type: ValueType;
	name: string;
}

export interface Function {
	body: AnyStatement[];
	scope: CoreContext;
}