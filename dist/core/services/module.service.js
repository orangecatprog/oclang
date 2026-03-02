import fs from 'fs';
import { execute } from "../index.js";
import * as gctx from "../../shared/context/globalContext.js";
export class ModuleService {
    loadedModules = new Map();
    loadModule(path) {
        if (this.loadedModules.has(path)) {
            const ctx = this.loadedModules.get(path);
            if (ctx)
                return ctx;
            else
                return null;
        }
        if (this.readModule(path)) {
            const text = this.readModule(path);
            const ctx = execute(text);
            this.loadedModules.set(path, ctx);
            return ctx;
        }
        else {
            return null;
        }
    }
    readModule(path) {
        const verify = (path) => {
            if (fs.existsSync(path)) {
                return fs.readFileSync(path, "utf8");
            }
            else {
                return null;
            }
        };
        const options = [
            (path) => path,
            (path) => `${path}.ocat`,
            (path) => `${path}.oc`,
        ];
        for (const option of options) {
            const file = option(path);
            const text = verify(file);
            if (text)
                return text;
        }
        return "";
    }
    static register() {
        gctx.pushService(new ModuleService(), "module");
    }
}
