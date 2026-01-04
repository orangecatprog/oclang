import fs from "fs"

export function readJSON(file: string) {
	return JSON.parse(fs.readFileSync(file, "utf8"));
}

export function writeJSON(path: string, data: any) {
	fs.writeFileSync(path, JSON.stringify(data, null, 4));
}