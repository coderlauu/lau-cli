import simpleGit, { SimpleGitOptions } from "simple-git";
import createLogger from "progress-estimator";
import chalk from "chalk";

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
    console.log(chalk.green("√successfully!~"));
    console.log(chalk.blue("==============================="));
    console.log(chalk.blue("===========欢迎使用============"));
    console.log(chalk.blue("==============================="));
    console.log();
    console.log("执行以下命令后启动👇🏻");
    console.log("cd " + chalk.blue("cd"));
    console.log(chalk.yellow("pnpm") + " install");
    console.log(chalk.yellow("pnpm") + " run dev");
  } catch (error) {}
};
