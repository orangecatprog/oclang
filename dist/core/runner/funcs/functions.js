import { AlreadyDeclaredFunctionError } from "../../../shared/manager/errors/semantic/undefined/declared.js";
import { UndeclaredFunctionError } from "../../../shared/manager/errors/semantic/undefined/undeclared.js";
import { run } from "../runner.js";
export const functionStatement = (statement, context) => {
    const idToken = statement.id;
    if (!idToken)
        return;
    const funcData = context.functions[idToken];
    if (funcData) {
        new AlreadyDeclaredFunctionError(idToken).throw(statement.sourceInfo.startLine);
    }
    const body = statement.func.body ?? [];
    const scope = statement.func.scope;
    context.functions[idToken] = {
        body,
        scope,
    };
};
export const callStatement = (statement, context) => {
    const funcId = statement.id;
    if (!funcId)
        return;
    const funcData = context.functions[funcId];
    if (!funcData) {
        new UndeclaredFunctionError(funcId).throw(statement.sourceInfo.startLine);
    }
    run(funcData.body, funcData.scope);
};
