import readline from "readline";
import chalk from "chalk";
import { execute } from "../../../core/index.js";

export function repl() {
	console.log(chalk.yellow("Orange Cat REPL v1.0.0"));

	const rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout,
		prompt: chalk.cyan("ocat> "),
	});

	rl.prompt();

	rl.on("line", (line) => {
		const input = line.trim();

		// comandos internos
		if (input === ".exit") {
			rl.close();
			return;
		}

		if (input === ".help") {
			console.log(`
.exit     Exit REPL
.clear    Clear screen
      `);
			rl.prompt();
			return;
		}

		if (input === ".clear") {
			console.clear();
			rl.prompt();
			return;
		}

		execute(input);

		rl.prompt();
	});

	rl.on("close", () => {
		console.log("\nBye!");
		process.exit(0);
	});
}
