import simpleGit, { SimpleGitOptions } from "simple-git";
import createLogger from "progress-estimator";
import chalk from "chalk";
import { log } from "./log";
const figlet = require("figlet");

// 初始化进度条
const logger = createLogger({
  spinner: {
    interval: 100,
    frames: ["-", "+", "-"].map((item) => {
      chalk.green(item);
      return item;
    }),
  },
});

const printerForTerminal = async () => {
  const data = await figlet("lau-cli");
  console.log(chalk.rgb(40, 156, 193).visible(data));
};

const gitOptions: Partial<SimpleGitOptions> = {
  baseDir: process.cwd(), // 当前工作目录
  binary: "git",
  maxConcurrentProcesses: 6,
};
export const clone = async (
  url: string,
  projectName: string,
  options: string[]
) => {
  const git = simpleGit(gitOptions);
  try {
    await logger(git.clone(url, projectName, options), "代码下载中...", {
      estimate: 7000, // 预计下载时间
    });

    console.log();
    log.success(chalk.green("√Finished successfully!~"));
    console.log(chalk.blue("==============================="));
    console.log(chalk.blue("===========欢迎使用============"));
    console.log(chalk.blue("==============================="));
    console.log();

    log.success("执行以下命令后启动👇🏻");
    log.info("cd " + chalk.blue("cd"));
    log.info(chalk.yellow("pnpm") + " install");
    log.info(chalk.yellow("pnpm") + " run dev");

    printerForTerminal();
  } catch (error) {
    log.error(chalk.red("代码下载失败~"));
  }
};
