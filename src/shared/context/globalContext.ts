export interface Context {
	[key: string]: any;
}

let globalContext: Context = {};

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