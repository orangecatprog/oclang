import inquirer from "inquirer";
import chalk, {} from "chalk";
import { chalkText } from "../../utils/chalkText.js";
import { createProject } from "../../../project/index.js";
export async function init() {
    const projectTypes = [{ name: "App", color: chalk.red }, { name: "Lib", color: chalk.yellow }];
    const answers = await inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "How do you want to name your project?",
            default: "my-project",
        },
        {
            type: "input",
            name: "dir",
            message: "Where do you want to create your project?",
            default: "myProject",
        },
        {
            type: "select",
            name: "type",
            message: "What type of project do you want to create?",
            choices: projectTypes
                .map((choice) => chalkText(choice.name, choice.color)),
        }
    ]);
    createProject({
        name: answers.name,
        dir: answers.dir,
        type: answers.type,
    });
}
