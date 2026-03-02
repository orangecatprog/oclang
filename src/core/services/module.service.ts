import type { CoreContext } from "../context/coreContext.js";
import fs from 'fs';
import { execute } from "../index.js";
import * as gctx from "../../shared/context/globalContext.js";

export class ModuleService {
	private loadedModules: Map<string, CoreContext> = new Map();

	loadModule(path: string): CoreContext | null {
		if (this.loadedModules.has(path)) {
			const ctx = this.loadedModules.get(path);
			if (ctx) return ctx;
			else return null;
		}

		if (this.readModule(path)) {
			const text = this.readModule(path);
			const ctx = execute(text);
			this.loadedModules.set(path, ctx);
			return ctx;
		} else {
			return null;
		}
	}

	readModule(path: string): string {
		const verify = (path: string) => {
			if (fs.existsSync(path)) { 
				return fs.readFileSync(path, "utf8");
			} else {
				return null;
			}
		}
		const options = [
			(path:string) => path,
			(path:string) => `${path}.ocat`,
			(path:string) => `${path}.oc`,
		]
		for (const option of options) {
			const file = option(path);
			const text = verify(file);
			if (text) return text;
		}
		return "";
	}

	static register() {
		gctx.pushService(new ModuleService(), "module");
	}

}