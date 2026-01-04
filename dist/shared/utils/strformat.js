export function fromCamelToDash(str) {
    return str.replace(/([A-Z])/g, (match) => "-" + match.toLowerCase());
}
export function fromDashToCamel(str) {
    return str.replace(/-([a-z])/g, (match) => match[1].toUpperCase());
}
export function fromCamelToSnake(str) {
    return str.replace(/([A-Z])/g, (match) => "_" + match.toLowerCase());
}
export function fromSnakeToCamel(str) {
    return str.replace(/_([a-z])/g, (match) => match[1].toUpperCase());
}
