#!/usr/bin/env node
import { Command } from "commander";

import { runfile } from "./commands/index.js";

const program = new Command();

program
  .name("ocat")
  .description("The Orange Cat language compiler")
  .version("1.0.0");

program
  .command("run")
  .description("Run a file. This file must be a .ocat file")
  .argument("<file>", "The file to run")
  .option("-f, --force", "Force the execution with other extensions")
  .action(runfile);

program.parse();