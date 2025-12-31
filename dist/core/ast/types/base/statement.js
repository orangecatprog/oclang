export var StatementKind;
(function (StatementKind) {
    StatementKind[StatementKind["PrintStatement"] = 0] = "PrintStatement";
    StatementKind[StatementKind["VariableStatement"] = 1] = "VariableStatement";
    StatementKind[StatementKind["FunctionStatement"] = 2] = "FunctionStatement";
    StatementKind[StatementKind["CallStatement"] = 3] = "CallStatement";
})(StatementKind || (StatementKind = {}));
