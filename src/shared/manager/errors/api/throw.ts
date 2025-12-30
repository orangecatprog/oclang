import type { OcatError } from "../coreErrors";

export function throwErr(error: OcatError) {
	console.log(error.toString());
}