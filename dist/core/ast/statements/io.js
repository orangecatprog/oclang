import { ValueType } from "../../../shared/models/value.js";
import { StatementKind } from "../types/base/index.js";
const printStatement = (statement) => {
    const printStmt = statement.children.printStatement?.[0];
    if (printStmt) {
        const strToken = printStmt.children.StringLiteral?.[0];
        if (strToken) {
            return {
                kind: StatementKind.PrintStatement,
                sourceInfo: {
                    tokens: printStmt.children,
                    cstNode: printStmt,
                    startLine: printStmt.startLine,
                    endLine: printStmt.endLine,
                    startColumn: printStmt.startColumn,
                    endColumn: printStmt.endColumn,
                },
                value: {
                    value: strToken.image,
                    type: ValueType.String,
                },
            };
        }
        const idToken = printStmt.children.Identifier?.[0];
        if (idToken) {
            return {
                kind: StatementKind.PrintStatement,
                sourceInfo: {
                    tokens: printStmt.children,
                    cstNode: printStmt,
                    startLine: printStmt.startLine,
                    endLine: printStmt.endLine,
                    startColumn: printStmt.startColumn,
                    endColumn: printStmt.endColumn,
                },
                value: {
                    value: idToken.image,
                    type: ValueType.Identifier,
                },
            };
        }
    }
    return null;
};
export const ioStatements = [printStatement];
