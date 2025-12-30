import { createToken } from "chevrotain";

export const Assign = createToken({ name: "Assign", pattern: /=/ });

export const operators = [Assign];