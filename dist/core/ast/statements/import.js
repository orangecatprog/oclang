import { StatementKind } from "../types/base/index.js";
const importStatement = (statement) => {
    const node = statement.children.importStatement?.[0];
    if (!node)
        return null;
    const stringToken = node.children.StringLiteral?.[0];
    if (!stringToken)
        return null;
    const rawValue = stringToken.image;
    const path = rawValue.slice(1, -1);
    return {
        kind: StatementKind.ImportStatement,
        path,
    };
};
export const importStatements = [importStatement];
