import type { AnyStatement } from "../types/statements";

export type FBuilder = (statement: any) => AnyStatement | null;