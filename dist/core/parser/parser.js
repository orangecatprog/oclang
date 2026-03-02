import { CstParser } from "chevrotain";
import { ValueType } from "../../shared/models/value.js";
import * as token from "../lexer/tokens/index.js";
export class OcatParser extends CstParser {
    constructor() {
        super(token.allTokens, { recoveryEnabled: true });
        this.performSelfAnalysis();
    }
    program = this.RULE("program", () => {
        this.MANY(() => this.SUBRULE(this.statement));
    });
    statement = this.RULE("statement", () => {
        this.OR([
            {
                ALT: () => this.SUBRULE(this.importStatement, {
                    LABEL: "importStatement",
                }),
            },
            {
                ALT: () => this.SUBRULE(this.printStatement, {
                    LABEL: "printStatement",
                }),
            },
            {
                ALT: () => this.SUBRULE(this.variableStatement, {
                    LABEL: "variableStatement",
                }),
            },
            {
                ALT: () => this.SUBRULE(this.functionStatement, {
                    LABEL: "functionStatement",
                }),
            },
            {
                ALT: () => this.SUBRULE(this.callStatement, {
                    LABEL: "callStatement",
                }),
            },
        ]);
    });
    importStatement = this.RULE("importStatement", () => {
        const imp = this.CONSUME(token.Import);
        const path = this.CONSUME(token.StringLiteral);
        // opcional: guardar tokens para el AST
    });
    printStatement = this.RULE("printStatement", () => {
        const output = this.CONSUME(token.Output);
        this.CONSUME(token.LeftParen);
        this.OR([
            ...token.literals.map((lit) => ({
                ALT: () => this.CONSUME(lit, { LABEL: lit.name }),
            })),
            {
                ALT: () => this.CONSUME(token.Identifier, { LABEL: "Identifier" }),
            },
        ]);
        this.CONSUME(token.RightParen);
    });
    variableStatement = this.RULE("variableStatement", () => {
        const typeToken = this.CONSUME(token.VarType);
        const idToken = this.CONSUME(token.Identifier);
        this.CONSUME(token.Assign);
        switch (typeToken.image) {
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
        return {
            typeToken, idToken
        };
    });
    functionStatement = this.RULE("functionStatement", () => {
        const funcKeyword = this.CONSUME(token.Function);
        const idToken = this.CONSUME(token.Identifier);
        this.CONSUME(token.LeftParen);
        this.MANY_SEP({
            SEP: token.Comma,
            DEF: () => {
                this.CONSUME(token.VarType);
                this.CONSUME2(token.Identifier);
            },
        });
        this.CONSUME(token.RightParen);
        this.CONSUME(token.LeftBrace);
        this.MANY(() => this.SUBRULE(this.statement));
        this.CONSUME(token.RightBrace);
    });
    callStatement = this.RULE("callStatement", () => {
        this.CONSUME(token.Call);
        this.CONSUME(token.Identifier);
        this.CONSUME(token.LeftParen);
        this.MANY_SEP({
            SEP: token.Comma,
            DEF: () => {
                this.OR([
                    ...token.literals.map((lit) => ({
                        ALT: () => this.CONSUME(lit),
                    })),
                    { ALT: () => this.CONSUME2(token.Identifier) },
                ]);
            },
        });
        this.CONSUME(token.RightParen);
    });
}
