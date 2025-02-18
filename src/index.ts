import { Command } from "commander";
import { version } from "../package.json";
import { create } from "./command/create";

// 指令名称
const program = new Command("lau");
program.version(version, "-v, --version");

program
  .command("create")
  .description("create a new project")
  .argument("[name]", "项目名称")
  .action((dirName) => {
    create(dirName);
  });

program.parse();
