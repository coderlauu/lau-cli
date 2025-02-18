import process from "child_process";
import chalk from "chalk";
import ora from "ora";
import { log } from "../utils/log";

const spinner = ora({
  text: "lau-cli 正在更新.....",
  spinner: {
    interval: 300, // 变换时间 ms
    frames: ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"].map((item) =>
      chalk.blue(item)
    ), // 设置加载动画
  },
});
export function update() {
  spinner.start();
  process.exec("npm install lau-cli@latest", (error) => {
    spinner.stop();
    if (!error) {
      console.log(chalk.blackBright("npm install lau-cli@latest"));
      log.success(chalk.green("更新成功~"));
    } else {
      log.error(chalk.red(error));
    }
  });
}
