export function addIf<T>(cond: boolean, value: T) {
	return cond ? value : undefined;
}

export function addIfElse<T>(cond: boolean, value: T, elseValue: T) {
	return cond ? value : elseValue;
}
