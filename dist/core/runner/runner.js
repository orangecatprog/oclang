import { AlreadyDeclaredFunctionError } from "../../shared/manager/errors/semantic/undefined/declared.js";
import { UndeclaredFunctionError, UndeclaredVariableError, } from "../../shared/manager/errors/semantic/undefined/undeclared.js";
import { StatementKind } from "../ast/types/base/statement.js";
// import { coreContext as context } from "../context/coreContext.js";
import { printStatement } from "./funcs/io.js";
import { variableStatement } from "./funcs/variables.js";
import { callStatement, functionStatement } from "./funcs/functions.js";
const statementMap = new Map([
    [StatementKind.PrintStatement, printStatement],
    [StatementKind.VariableStatement, variableStatement],
    [StatementKind.FunctionStatement, functionStatement],
    [StatementKind.CallStatement, callStatement],
]);
export function run(ast, context) {
    for (const statement of ast) {
        const runner = statementMap.get(statement.kind);
        if (!runner) {
            throw new Error(`No runner for statement kind: ${statement.kind}`);
        }
        runner(statement, context);
    }
    return context;
}
