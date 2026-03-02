import { StatementKind } from "../types/base/index.js";
const variableStatement = (statement) => {
    const varStmt = statement.children.variableStatement?.[0];
    if (!varStmt)
        return null;
    const typeToken = varStmt.children.VarType?.[0];
    const idToken = varStmt.children.Identifier?.[0];
    const valueToken = varStmt.children.StringLiteral?.[0] ??
        varStmt.children.NumberLiteral?.[0] ??
        varStmt.children.BooleanLiteral?.[0];
    if (!typeToken || !idToken || !valueToken)
        return null;
    const type = typeToken.image;
    const id = idToken.image;
    const value = valueToken.image;
    return {
        kind: StatementKind.VariableStatement,
        sourceInfo: {
            tokens: varStmt.children,
            cstNode: varStmt,
            startLine: varStmt.startLine,
            endLine: varStmt.endLine,
            startColumn: varStmt.startColumn,
            endColumn: varStmt.endColumn,
        },
        id,
        var: {
            type,
            value,
            props: {
                isConst: false,
            },
        },
        set: false,
    };
};
export const variableStatements = [variableStatement];
