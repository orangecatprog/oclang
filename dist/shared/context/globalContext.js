let globalContext = { services: new Map() };
export function pushService(service, name) {
    globalContext.services.set(name, service);
}
export function getService(name) {
    return globalContext.services.get(name);
}
export function get(key) {
    return globalContext[key];
}
export function set(key, value) {
    globalContext[key] = value;
}
export function useArray(key, modify) {
    set(key, modify(get(key)));
}
export function useObject(key, modify) {
    set(key, modify(get(key)));
}
export function useContext(modify) {
    globalContext = modify(globalContext);
}
