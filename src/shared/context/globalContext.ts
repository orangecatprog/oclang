import type { LoggerService } from "../../core/services/log.service.js";

export interface Context {
	[key: string]: any;
	services: Map<string, any>;
}

let globalContext: Context = { services: new Map() };

export function pushService(service: any, name: string) {
	if (globalContext.services.has(name)) return;
	globalContext.services.set(name, service);
}

export function getService(name: string) {
	return globalContext.services.get(name);
}

export function get(key: string) {
	return globalContext[key];
}

export function set(key: string, value: any) {
	globalContext[key] = value;
}

export function useArray(key: string, modify: (array: any[]) => any[]) {
	set(key, modify(get(key)));
}

export function useObject(key: string, modify: (object: any) => any) {
	set(key, modify(get(key)));
}

export function useContext(modify: (context: Context) => Context) {
	globalContext = modify(globalContext);
}