```json
"devDependencies": {
    // 用于命令行交互。
    "@inquirer/prompts": "^3.2.0",
    // Rollup 相关的插件，用于模块打包
    "@rollup/plugin-commonjs": "^25.0.3", // 支持 rollup 打包 commonjs 模块
    "@rollup/plugin-json": "^6.0.1", // 支持 rollup 打包 json 文件
    "@rollup/plugin-node-resolve": "^15.1.0", // 用于帮助 Rollup 解析和处理 Node.js 模块（Node.js 的 CommonJS 模块规范）
    "@rollup/plugin-terser": "^0.4.3", // Rollup 构建过程中对生成的JavaScript 代码进行压缩和混淆，以减小最终输出文件的体积。
    // TypeScript 的类型定义文件
    "@types/fs-extra": "^11.0.2",
    "@types/lodash": "^4.14.199",
    "@types/node": "^16.18.40",
    // 用于发起 HTTP 请求。
    "axios": "^1.5.0",
    // 在命令行中输出彩色文本。
    "chalk": "^4.1.2",
    // 命令行界面的解决方案
    "commander": "^11.0.0",
    // 扩展了标准 fs 模块的文件系统操作
    "fs-extra": "^11.1.1",
    // 一个提供实用函数的 JavaScript 库。
    "lodash": "^4.17.21",
    // 在命令行中显示日志符号。
    "log-symbols": "^4.1.0",
    // 创建可旋转的加载器
    "ora": "5",
    // 估算操作进度。
    "progress-estimator": "^0.3.1",
    // 一个特定于项目或定制的 CLI 工具
    "pure-thin-cli": "^0.1.8",
    "rollup": "^4.6.1",
    "rollup-plugin-dts": "^5.3.0", // 是一个 Rollup 插件，它的主要作用是处理 TypeScript 的声明文件（.d.ts 文件）
    "rollup-plugin-esbuild": "^5.0.0",
    "rollup-plugin-node-externals": "^5.1.2", // 使 rollup 自动识别外部依赖
    "rollup-plugin-typescript2": "^0.36.0", // 支持 rollup 打包 ts 文件
    // 用于 Git 命令的 Node.js 封装。
    "simple-git": "^3.19.1",
    // TypeScript 运行时库。
    "tslib": "^2.6.1",
    "typescript": "^5.2.2"
},
```

```js
|- src/ # 项目资源
    |- command/  # 命令逻辑
    |- utils/   # 公共方法
    |- index.ts  # 命令入口文件
```

命令行交互

- commander：解析命令行指令
- ora：终端加载动画
- progress-estimator：终端加载条动画
- log-symbols：终端输出符号
- chalk：终端字体美化
- @inquirer/prompts：终端输入交互

打包工具

- rollup（打包工具有很多选择，webpack）
- 这里选用 rollup 是因为它相对更适合 npm 包的打包，自己对 webpack5 太熟悉了，跳出自己的舒适圈
- @rollup/plugin-node-resolve：支持 rollup 打包 node.js 模块
- @rollup/plugin-commonjs：支持 rollup 打包 commonjs 模块
- @rollup/plugin-json：支持 rollup 打包 json 文件
- rollup-plugin-typescript2：支持 rollup 打包 ts 文件
- @rollup/plugin-terser：压缩打包代码
- rollup-plugin-node-externals：使 rollup 自动识别外部依赖
  :::warning
  注意这里的 rollup-plugin-node-externals 版本是 5 的版本 不是最新的 6 的版本
  "rollup-plugin-node-externals": "^5.1.2",
  :::
