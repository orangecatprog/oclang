export function fromCamelToDash(str: string): string {
	return str.replace(/([A-Z])/g, (match) => "-" + match.toLowerCase());
}

export function fromDashToCamel(str: string): string {
	return str.replace(/-([a-z])/g, (match) => match[1].toUpperCase());
}

export function fromCamelToSnake(str: string): string {
	return str.replace(/([A-Z])/g, (match) => "_" + match.toLowerCase());
}

export function fromSnakeToCamel(str: string): string {
	return str.replace(/_([a-z])/g, (match) => match[1].toUpperCase());
}