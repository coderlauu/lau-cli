import { Command } from "commander";
import { version } from "../package.json";
import { create } from "./command/create";
import { update } from "./command/update";

// 指令名称
const program = new Command("lau");
program.version(version, "-v, --version");

program
  .command("update")
  .description("更新脚手架 lau-cli")
  .action(async () => {
    update();
  });

program
  .command("create")
  .description("创建一个新项目")
  .argument("[name]", "项目名称")
  .action((dirName) => {
    create(dirName);
  });

program.parse();
