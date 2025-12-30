import { CstParser } from "chevrotain";
import { ValueType } from "../../shared/models/value.js";
import * as token from "../lexer/tokens/index.js";

export class OcatParser extends CstParser {
	constructor() {
		super(token.allTokens, {
			recoveryEnabled: true,
		});
		this.performSelfAnalysis();
	}

	public program = this.RULE("program", () => {
		this.MANY(() => this.SUBRULE(this.statement));
	});

	public statement = this.RULE("statement", () => {
		this.OR([
			{
				ALT: () =>
					this.SUBRULE(this.printStatement, {
						LABEL: "printStatement",
					}),
			},
			{
				ALT: () =>
					this.SUBRULE(this.variableStatement, {
						LABEL: "variableStatement",
					}),
			},
			{
				ALT: () =>
					this.SUBRULE(this.functionStatement, {
						LABEL: "functionStatement",
					}),
			},
			{
				ALT: () =>
					this.SUBRULE(this.callStatement, {
						LABEL: "callStatement",
					}),
			},
		]);
	});

	public printStatement = this.RULE("printStatement", () => {
		this.CONSUME(token.Output);
		this.CONSUME(token.LeftParen);
		this.OR([
			...token.literals.map((lit) => ({
				ALT: () => this.CONSUME(lit, { LABEL: lit.name }),
			})),
			{
				ALT: () =>
					this.CONSUME(token.Identifier, { LABEL: "Identifier" }),
			},
		]);
		this.CONSUME(token.RightParen);
	});

	public variableStatement = this.RULE("variableStatement", () => {
		this.OPTION(() => {
			this.OR([
				{ ALT: () => this.CONSUME(token.Set, { LABEL: "Set" }) },
				{ ALT: () => this.CONSUME(token.Const, { LABEL: "Const" }) },
			]);
		});
		const type = this.CONSUME(token.VarType).image as ValueType;
		this.CONSUME(token.Identifier);
		this.CONSUME(token.Assign);

		switch (type) {
			case ValueType.String:
				this.CONSUME(token.StringLiteral);
				break;
			case ValueType.Number:
				this.CONSUME(token.NumberLiteral);
				break;
			case ValueType.Boolean:
				this.CONSUME(token.BooleanLiteral);
				break;
		}
	});

	public functionStatement = this.RULE("functionStatement", () => {
		this.CONSUME(token.Function);
		this.CONSUME(token.Identifier);
		this.CONSUME(token.LeftBrace);
		this.MANY(() => this.SUBRULE(this.statement));
		this.CONSUME(token.RightBrace);
	});

	public callStatement = this.RULE("callStatement", () => {
		this.CONSUME(token.Call);
		this.CONSUME(token.Identifier);
	});
}
