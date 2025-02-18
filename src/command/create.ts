import { input, select } from "@inquirer/prompts";
import { clone } from "../utils/clone";
import path from "path";
import fs from "fs-extra";

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

const isOverwrite = async (projectName: string) => {
  console.warn(`${projectName}文件已存在`);
  return await select({
    message: "是否覆盖？",
    choices: [
      { name: "覆盖", value: true },
      { name: "取消", value: false },
    ],
  });
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
        description: info.description,
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

  // 选择模板
  const templateName = await select({
    message: "请选择模板",
    choices: templateList,
  });
  const info = templates.get(templateName);
  console.log("info", info);
  if (info) {
    clone(info.downloadUrl, projectName, ["-b", info.branch]);
  }

  console.log("create", projectName);
}
