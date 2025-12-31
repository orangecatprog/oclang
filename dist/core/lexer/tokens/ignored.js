import { createToken } from "chevrotain";
export const WhiteSpace = createToken({ name: "WhiteSpace", pattern: /\s+/ });
export const ignored = [WhiteSpace];
