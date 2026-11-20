# MyPaste Website

MyPaste 官方宣传站：产品首页、插件协议 v3 开发者文档、插件应用市场目录。参考 uTools 官网的信息组织方式，内容依据 MyPaste 仓库的插件协议与扩展发布索引编写。

这是独立静态站点，不依赖桌面应用运行时，也不读写用户数据。市场页中的目录是发布索引的展示快照，实际安装仍发生在 MyPaste 桌面应用内。

## 页面

- `index.html`：产品首页、核心边界、上手路径。
- `docs/index.html`：开发者文档，覆盖 manifest、命令、表面、容器线格式、服务清单、信任与发布流程。
- `plugins/index.html`：插件应用市场宣传页，可搜索和筛选目录中的扩展。

## 本地运行

```bash
bun install
bun run dev
```

构建：

```bash
bun run build
```

检查类型：

```bash
bun run typecheck
```

构建产物在 `dist/`，可部署到任意静态托管。站点有两条发布路径：Cloudflare Pages 直接部署 `dist/` 到 <https://mypaste.whoops.space/>；GitHub Pages 从专用仓库 `mypaste/mypaste.github.io` 发布同一份产物到 <https://mypaste.github.io/>。`base: "./"` 让产物在根域与子路径下都能工作。

## 线上访问

- 首页：<https://mypaste.whoops.space/> · <https://mypaste.github.io/>
- 开发者文档：<https://mypaste.whoops.space/docs/> · <https://mypaste.github.io/docs/>
- 插件应用市场：<https://mypaste.whoops.space/plugins/> · <https://mypaste.github.io/plugins/>

两条路径服务的是同一份 `dist/`：Cloudflare 直接上传构建产物，GitHub Pages 用 `mypaste/mypaste.github.io` 仓库承载根域地址。不要把 `mypaste-website` 改名为仓库根站点。

## 内容维护

扩展目录来自 `mypaste-extensions-catalog/index.json` 的展示快照，字段与分类写在 `src/data/extensions.ts`。替换扩展说明或增加扩展时，同时更新该文件与页面中的目录日期，并与发布索引逐条核对。

协议正文是本站维护的面向站外读者的编辑版；字段与枚举必须和宿主当前实现一致。设计约定见 `DESIGN.md`。

## 相关仓库

- [MyPaste 宣传站](https://github.com/mypaste/mypaste-website)
- [扩展发布目录](https://github.com/mypaste/mypaste-extensions-catalog)
- [独立扩展仓库](https://github.com/orgs/mypaste/repositories?q=mypaste)
