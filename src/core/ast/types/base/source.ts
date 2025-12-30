import type { CstNode, IToken } from "chevrotain";

export interface SourceInfo {
	startLine: number;
	endLine: number;

	startColumn: number;
	endColumn: number;

	tokens: IToken[];
	cstNode?: CstNode;
}
