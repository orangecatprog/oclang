import { createToken } from "chevrotain";

export const Output = createToken({ name: "Output", pattern: /print/ });

export const Import = createToken({ name: "Import", pattern: /import/ });

export const keywords = [Output, Import];