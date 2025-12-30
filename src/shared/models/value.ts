export enum ValueType {
	String = "string",
	Number = "number",
	Boolean = "bool",
	Identifier = "identifier",
}

export interface Value {
	value: string;
	type: ValueType;
}
