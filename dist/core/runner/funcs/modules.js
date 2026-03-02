import { execute } from "../../index.js";
import fs from "fs";
import * as gctx from "../../../shared/context/globalContext.js";
export const importStatement = (statement, context) => {
    const fctx = gctx.getService("module").loadModule(statement.path);
    if (!fctx)
        return;
    for (const [key, value] of Object.entries(fctx.variables)) {
        context.variables[key] = value;
    }
    for (const [key, value] of Object.entries(fctx.functions)) {
        context.functions[key] = value;
    }
};
