import { createCoreContext } from "../context/coreContext.js";
import { ValueType } from "../../shared/models/value.js";
import { StatementKind } from "./types/base/index.js";
export function buildAst(cst) {
    const statements = cst.children.statement ?? [];
    const ast = [];
    for (const statement of statements) {
        let __tmp = null;
        const __$tmp = () => { if (__tmp)
            ast.push(__tmp); };
        __tmp = printStatement(statement);
        __$tmp();
        __tmp = variableStatement(statement);
        __$tmp();
        __tmp = functionStatement(statement);
        __$tmp();
        __tmp = callStatement(statement);
        __$tmp();
    }
    return ast;
}
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
                }
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
                }
            };
        }
    }
    return null;
};
const variableStatement = (statement) => {
    const varStmt = statement.children.variableStatement?.[0];
    if (varStmt) {
        const typeToken = varStmt.children.VarType?.[0];
        const idToken = varStmt.children.Identifier?.[0];
        const valueToken = varStmt.children.StringLiteral?.[0] ??
            varStmt.children.NumberLiteral?.[0] ??
            varStmt.children.BooleanLiteral?.[0];
        if (!typeToken || !idToken || !valueToken)
            return null;
        const setToken = varStmt.children.Set?.[0];
        const constToken = varStmt.children.Const?.[0];
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
                    isConst: !!constToken,
                }
            },
            set: !!setToken,
        };
    }
    return null;
};
const functionStatement = (statement) => {
    const funcStmt = statement.children.functionStatement?.[0];
    if (funcStmt) {
        const idToken = funcStmt.children.Identifier?.[0];
        if (!idToken)
            return null;
        const id = idToken.image;
        const body = buildAst(funcStmt);
        return {
            kind: StatementKind.FunctionStatement,
            sourceInfo: {
                tokens: funcStmt.children,
                cstNode: funcStmt,
                startLine: funcStmt.startLine,
                endLine: funcStmt.endLine,
                startColumn: funcStmt.startColumn,
                endColumn: funcStmt.endColumn,
            },
            id,
            func: {
                body,
                scope: createCoreContext(),
            }
        };
    }
    return null;
};
const callStatement = (statement) => {
    const callStmt = statement.children.callStatement?.[0];
    if (callStmt) {
        const idToken = callStmt.children.Identifier?.[0];
        if (!idToken)
            return null;
        const id = idToken.image;
        return {
            kind: StatementKind.CallStatement,
            sourceInfo: {
                tokens: callStmt.children,
                cstNode: callStmt,
                startLine: callStmt.startLine,
                endLine: callStmt.endLine,
                startColumn: callStmt.startColumn,
                endColumn: callStmt.endColumn,
            },
            id,
        };
    }
    return null;
};
