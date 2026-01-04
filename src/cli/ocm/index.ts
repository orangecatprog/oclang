#!/usr/bin/env node
import { Command } from "commander";

import { init, run } from "./commands/index.js";

const program = new Command();

program.name("ocm").description("The Orange Cat manager").version("1.0.0");


program
	.command("initialize")
	.alias("init")
	.description("Initialize a new Orange Cat project")
	.action(async () => { await init() });

program
	.command("run")
	.description("Run the project")
	.action(run);

program.parse();