import path from "path";
import { readJSON } from "../../../shared/io/json.js";
import { runfile } from "../../ocat/commands/index.js";
export function run() {
    const projectConfig = readJSON(path.join(".ocat", "config.json"));
    runfile(projectConfig.main, { force: false });
}
