import { OcatError } from "../coreErrors";

export function isOcatError(obj: any) {
	return obj instanceof OcatError;
}
