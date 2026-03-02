import { ioStatements } from "./statements/io.js";
import { variableStatements } from "./statements/vars.js";
import { functionStatements } from "./statements/function.js";
import { importStatements } from "./statements/import.js";
const possibleStatements = [
    ...ioStatements,
    ...variableStatements,
    ...functionStatements,
    ...importStatements,
];
export function buildAst(cst) {
    const statements = cst.children.statement ?? [];
    const ast = [];
    for (const node of statements) {
        let built = null;
        for (const builder of possibleStatements) {
            built = builder(node);
            if (built)
                break;
        }
        if (built) {
            ast.push(built);
        }
    }
    return ast;
}
