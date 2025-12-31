import { createToken } from "chevrotain";
import { ValueType } from "../../../shared/models/value.js";
export const VarType = createToken({
    name: "VarType",
    pattern: new RegExp(Object.values(ValueType).join("|")),
});
export const Set = createToken({ name: "Set", pattern: /set/ });
export const Identifier = createToken({
    name: "Identifier",
    pattern: /[a-zA-Z_]\w*/,
});
export const variablesAndConstants = [VarType, Set, Identifier];
