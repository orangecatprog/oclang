import path from "path";
import { readJSON } from "../../../shared/io/json.js";
import { runfile } from "../../ocat/commands/index.js";
import * as context from "../../../shared/context/globalContext.js";
import { defaultLoggerConfig, LoggerService } from "../../../core/services/log.service.js";
export function run() {
    const projectConfig = readJSON(path.join(".ocat", "config.json"));
    context.set("isProject", true);
    context.set("projectConfig", projectConfig);
    context.set("services", {});
    context.useObject("services", services => {
        return {
            log: new LoggerService(defaultLoggerConfig),
        };
    });
    runfile(projectConfig.main, { force: false });
}
