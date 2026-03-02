import { execute } from "../../index.js";
import fs from "fs";
export const importStatement = (statement, context) => {
    const fctx = execute(fs.readFileSync(statement.path).toString());
    for (const [key, value] of Object.entries(fctx.variables)) {
        context.variables[key] = value;
    }
    for (const [key, value] of Object.entries(fctx.functions)) {
        context.functions[key] = value;
    }
};
