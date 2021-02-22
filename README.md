### storybook + ElementUi + vue 
构建一个简单组件开发架子
 
- **1、plop 创建组件模板生成器**
- **2、storybook 生成文档页面**
- **3、Jest 测试组件单元测试**
- **4、Lerna 发布组件和代码提交[公司仓库不一定能用]**     一个管理工具，用于管理包含多个软件包的，主要是可以发布包和提交代码一起
 
 
### 注意，启动提示找不到Babel
yarn add babel-core@bridge -D -W 安装桥接
 
css/less 图片、音频用户上的可以去掉
所以配置一下
 
```javascript
"moduleNameMapper": {
  "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$"
  : "<rootDir>/__mocks__/fileMock.js",
  "\\.(css|less)$": "identity-obj-proxy"
}
```
 
 
 
 
 
### vue Test Utils 常用API
 
### jest 常用API
 
 
# Rollup
 
- 模块打包器
- Tree-shaking
- 框架组件库更合适
 
安装
 
- Rollup
- rollup-plugin-terser 压缩
- rollup-plugin-vue@5.1.9  (指定版本，最新的是vue3.0)
- vue-template-compiler
 
- @rollup/plugin-json 
- postcss
- rollup-plugin-postcss
- @rollup/plugin-node-resolve （将第三方包打包）
 
 
### 环境变量 
cross-env -D 
 
### 清理文件
learn clean
 
- rimraf -D 清空文件夹插件
 
 
 
## 知识点
 
问题：
 
- 组件中公用的一些公用依赖module的处理方式
- 一键清除每个组件中的 dist 文件
 
 
 
### yarn workspace
 
Yarn 从 1.0 版开始支持 Workspace （工作区）。
 
Workspace 能更好的统一管理有多个项目的仓库，既可在每个项目下使用独立的 package.json 管理依赖，又可便利的享受一条 yarn 命令安装或者升级所有依赖等。更重要的是可以使多个项目共享同一个 `node_modules` 目录，提升开发效率和降低磁盘空间占用。
 
一句话总结就是可以大大简化对多个项目的统一管理。
 
很多知名的开源项目也使用了 [Yarn Workspace](https://links.jianshu.com/go?to=https%3A%2F%2Fclassic.yarnpkg.com%2Fen%2Fdocs%2Fcli%2Fworkspace%3A)，如 [vue](https://links.jianshu.com/go?to=https%3A%2F%2Fgithub.com%2Fvuejs%2Fvue-next)、[react](https://links.jianshu.com/go?to=https%3A%2F%2Fgithub.com%2Ffacebook%2Freact)、[jest](https://links.jianshu.com/go?to=https%3A%2F%2Fgithub.com%2Ffacebook%2Fjest) 等。
 
 
 
```
projects/
|--project1/
|  |--package.json
|  |--node_modules/
|  |  |--a/
|--project2
|  |--package.json
|  |--node_modules/
|  |  |--a/
|  |  |--project1/
```
 
**project1/package.json:**
 
```
{
  "name": "project1",
  "version": "1.0.0",
  "dependencies": {
    "a": "1.0.0"
  }
}
```
 
**project2/package.json:**
 
```
{
  "name": "project2",
  "version": "1.0.0",
  "dependencies": {
    "a": "1.0.0",
    "project1": "1.0.0"
  }
}
```
 
没有使用 [Yarn Workspace](https://links.jianshu.com/go?to=https%3A%2F%2Fclassic.yarnpkg.com%2Fen%2Fdocs%2Fcli%2Fworkspace%3A) 前，需要分别在 `project1` 和 `project2` 目录下分别执行 `yarn|npm install` 来安装依赖包到各自的 `node_modules` 目录下。或者使用 `yarn|npm upgrade` 来升级依赖的包。
 
这会产生很多不良的问题：
 
1. 如果 project1 和 project2 有相同的依赖项目 a，a 都会各自下载一次，这不仅耗时降低开发效率，还额外占用重复的磁盘空间；当 project 项目比较多的时候，此类问题就会显得十分严重。
2. 如果 project2 依赖 project1，而 project1 并没有发布到 npm 仓库，只是一个本地项目，有两种方式配置依赖：
   1. 使用相对路径（如 file: 协议）在 project2 中指定 project1 的依赖。
   2. 使用 `yarn|npm link` 来配置依赖。
3. 没有一个统一的地方对全部项目进行统一构建等，需要到各个项目内执行 `yarn|npm build` 来构架项目。
 
  使用 [Yarn Workspace](https://links.jianshu.com/go?to=https%3A%2F%2Fclassic.yarnpkg.com%2Fen%2Fdocs%2Fcli%2Fworkspace%3A) 之后，上述问题都能得到很好的解决。而且这是 Yarn 内置的功能，并不需要安装什么其他的包，只需要简单的在 projects 目录（Yarn 称之为 workspace-root）下增加如下内容的 package.json 文件即可。
 
**projects/package.json：**
 
```
{
  "private": true,
  "workspaces": ["project1", "project2"] 
  // 也可以使用通配符设置为 ["project*"]
}
```
 
开源社区则都基本上使用 `"workspaces": ["packages/*"]` 的目录结构，这与 [Lerna](https://links.jianshu.com/go?to=https%3A%2F%2Fgithub.com%2Flerna%2Flerna) 的目录结构一致。
 
CDD的好处
 
- 组件在最大程度被重用
- 并行开发
- 可视化测试
 
 
 
 
 
 
 
处理组件的边界情况
 
- $root
- $parent/$children
- $refs
- provide/inject- 依赖注入
 
$attrs/$listeners
 
- $attrs 可以将父组件设置的class \ style 这样的原生属性不适用传递props方式影响到子组件中，使用v-bind="$attrs"
- $listeners 简化事件绑定，原生事件 组件 v-on="$listeners"
 
快速原型开发
 
npm i -g @vue/cli-service-global
 
vue serve 默认App.vue main.js
 
基于ElementUI二次开发
 
vue add element 安装ElementUi
 
 
 
- 第三方组件
- 基础组件（对自己样式有要求）
- 业务组件（一些人事基础组件）
 
 
 
 
 
 
 
Monorepo
 
- Multirepo(Multiple Repository)
  - 每个包对应一个项目
- Monorepo(Monolithic Repository)
  - 一个项目仓库管理多个模块/包
  - 每个包单独发布单独测试单独依赖
 
某个组件结构
 
|——button
 
|——|—— __ test  __(测试文件)
 
|——|—— dist
 
|——|—— src
 
|——|—— index.js
 
|——|—— LICENSE
 
|——|—— package.json
 
|——|—— README.md
 
基于模板生成包的结构
 
> yarn add plop -W -D  // 安装模板生成器
 
 
 
 
 
 
 
Storybook
 
- 可视化的组件展示凭条
- 在隔离的开发环境中，以交互式的方式展示组件
- 独立开发组件
- 支持框架React.Vue
 
 
 
- 安装（自动安装）
  - npx -p @storybook/cli sb init --type vue（npx -p @storybook/cli sb init 检查框架，并初始化）
  - yarn add vue
  - vue yarn add vue-loader vue-template-compiler --dev
- 手动安装（查看文档）
 
 
 
 
 
 
 
yarn workSpaces(npm 不支持)
 
--- 每个组件包有自己的依赖
 
在package.json 添加
 
```
  "private":true,
  "workspaces":[
    "packages/*"
  ],//数组
```
 
- 给工作区根目录安装开发依赖
  - yarn add jest-D-W      -W 工作区的意思  -D dev
- 给指定工作安装依赖
  - yarn worksapce lg-button add lodash@4 ----lg-button 是文件夹中package.json 的name 包名
- 给所有
  - yarn install
 
 
 
Lerna
 
 Lerna 统一发布npm 包
 
用户管理具有多个包的JS 项目
 
一键代码提交到npm&git
 
 
 
组件单元测试
 
- 提供文件行为文档
- 节省手动测试时间
- 改进重构
 
 
 
Vue Test Utils
 
Jest-----常用API
 
vue-jest
 
babel-jest
 
 
 
yarn add jest @vue/test-utils vue-jest babel-jest -D -W
 
 
 
Rollup
 
- 模块打包器
- Tree-shaking
- 框架组件库更合适
 
安装
 
- Rollup
- rollup-plugin-terser
- rollup-plugin-vue@5.1.9  制定版本，最新的是vue3.0
- vue-template-compiler
 
 
 