import type { AnyStatement } from "../types/statements/index.js";

export type FBuilder<T> = (statement: any) => T | null;
