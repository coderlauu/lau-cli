import { input, select } from "@inquirer/prompts";
import { clone } from "../utils/clone";
import path from "path";
import fs from "fs-extra";
import { name, version } from "../../package.json";
import axios, { AxiosResponse } from "axios";
import { gt } from "lodash";
import chalk from "chalk";
import { log } from "../utils/log";

export interface TemplateInfo {
  name: string; // 模板名称
  downloadUrl: string; // 模板下载地址
  description: string; // 模板描述
  branch: string; // 模板分支
}

export const templates: Map<string, TemplateInfo> = new Map([
  [
    "Vite-Vue3-Typescript-template",
    {
      name: "Vite-Vue3-Typescript-template",
      downloadUrl: "https://gitee.com/sohucw/admin-pro.git",
      description: "Vite+Vue3+Typescript模板",
      branch: "dev11",
    },
  ],
  [
    "Vite-Vue3-temp",
    {
      name: "Vite-Vue3-Typescript-template",
      downloadUrl: "https://gitee.com/sohucw/admin-pro.git",
      description: "Vite+Vue3+Typescript模板",
      branch: "dev10",
    },
  ],
]);

export const isOverwrite = async (projectName: string) => {
  console.warn(`${projectName}文件已存在`);
  return await select({
    message: "是否覆盖？",
    choices: [
      { name: "覆盖", value: true },
      { name: "取消", value: false },
    ],
  });
};

export const getNpmInfo = async (npmName: string) => {
  const npmUrl = `https://registry.npmjs.org/${name}`;
  let res = {};
  try {
    res = await axios.get(npmUrl);
  } catch (error) {
    console.error(error);
  }
  return res;
};
export const getNpmLatestVersion = async (name: string) => {
  const { data } = (await getNpmInfo(name)) as AxiosResponse;
  return data["dist-tags"].latest;
};

export const checkVersion = async (name: string, version: string) => {
  // 获取远端的版本
  const latestVersion = await getNpmLatestVersion(name);
  const needUpdate = gt(latestVersion, version);
  if (needUpdate) {
    log.warn(
      `检查到lau最新版本：${chalk.blue(
        latestVersion
      )}，当前版本是：${chalk.blackBright(version)}`
    );
    log.info(
      `可使用：${chalk.yellow(
        "npm install lau-cli@latest"
      )}，或者使用：${chalk.yellow("lau update")}更新`
    );
  }
  return needUpdate;
};

// 定义哪些项目要从远程拉取模板
export async function create(projectName?: string) {
  // 初始化模板列表
  const templateList = Array.from(templates).map(
    (template: [string, TemplateInfo]) => {
      const [name, info] = template;
      return {
        name,
        value: name,
        description: "  " + info.description,
      };
    }
  );

  // 输入模板名称
  if (!projectName) {
    projectName = await input({ message: "请输入项目名称" });
  }

  const filePath = path.resolve(process.cwd(), projectName);
  if (fs.existsSync(filePath)) {
    const run = await isOverwrite(filePath);
    if (run) {
      await fs.remove(filePath);
    } else {
      return;
    }
  }

  // 检查版本更新
  await checkVersion(name, version);

  // 选择模板
  const templateName = await select({
    message: "请选择模板",
    choices: templateList,
  });
  const info = templates.get(templateName);
  if (info) {
    clone(info.downloadUrl, projectName, ["-b", info.branch]);
  }
}
