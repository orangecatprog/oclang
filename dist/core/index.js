import { ocatLexer } from "./lexer/tokens.js";
import { OcatParser } from "./parser/parser.js";
import { run } from "./runner/runner.js";
import { createCoreContext } from "./context/coreContext.js";
import { buildAst } from "./ast/astBuilder.js";
import * as gctx from "../shared/context/globalContext.js";
import fs from "fs";
import { defaultLoggerConfig, LoggerService } from "./services/log.service.js";
import { ModuleService } from "./services/module.service.js";
export function execute(code) {
    const lexingResult = ocatLexer.tokenize(code);
    const parser = new OcatParser();
    parser.input = lexingResult.tokens;
    const cst = parser.program();
    const ast = buildAst(cst);
    process.on("exit", () => {
        if (gctx.get("isProject")) {
            const logs = gctx.get("services").log.toString();
            fs.writeFileSync(".ocat/logs.txt", logs);
        }
    });
    let config = defaultLoggerConfig;
    if (gctx.get("isProject") && fs.existsSync(".ocat/logcfg.json")) {
        const cfgText = fs.readFileSync(".ocat/logcfg.json", "utf8");
        config = JSON.parse(cfgText);
    }
    LoggerService.register(config);
    ModuleService.register();
    const ctx = run(ast, createCoreContext());
    return ctx;
}
