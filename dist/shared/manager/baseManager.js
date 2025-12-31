import chalk, {} from "chalk";
export class OcatManager {
    name;
    message;
    color;
    constructor(name, color) {
        this.name = name;
        this.message = "";
        this.color = color;
    }
    toString(line = undefined) {
        return `${this.color.bold(this.name)} ${line && chalk.gray(`at line ${line}`)}: ${this.color.italic(this.message)}`;
    }
    throw(line = undefined) {
        console.log(this.toString(line));
        process.exit(1);
    }
}
