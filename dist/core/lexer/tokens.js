import { Lexer } from "chevrotain";
import { allTokens } from "./tokens/index.js";
export const ocatLexer = new Lexer(allTokens);
