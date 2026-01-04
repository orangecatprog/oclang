import type { ChalkInstance } from "chalk";

export function chalkText(text: string, color: ChalkInstance) {
	return {
		name: color(text),
		value: text
	}
}