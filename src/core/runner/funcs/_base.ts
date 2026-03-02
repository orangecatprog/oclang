import type { CoreContext } from "../../context/coreContext.js";

export type RunnerFunc<T> = (statement: T, ctx: CoreContext) => void;