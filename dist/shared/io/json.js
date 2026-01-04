import fs from "fs";
export function readJSON(file) {
    return JSON.parse(fs.readFileSync(file, "utf8"));
}
export function writeJSON(path, data) {
    fs.writeFileSync(path, JSON.stringify(data, null, 4));
}
