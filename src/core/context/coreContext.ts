import type { Variable } from "../../shared/models/var.js";
import type { Function } from "../../shared/models/func.js";

export interface CoreContext {
	variables: Record<string, Variable>;	
	functions: Record<string, Function>;
}

export function createCoreContext(): CoreContext {
	return {
		variables: {},
		functions: {},
	};
}