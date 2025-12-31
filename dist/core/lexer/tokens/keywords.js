import { createToken } from "chevrotain";
export const Output = createToken({ name: "Output", pattern: /print/ });
export const keywords = [Output];
