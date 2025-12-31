import { OcatError } from "../coreErrors";
export function isOcatError(obj) {
    return obj instanceof OcatError;
}
