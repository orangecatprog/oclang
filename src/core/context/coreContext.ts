import type { Variable } from "../../shared/models/var";
import type { Function } from "../../shared/models/func";

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
