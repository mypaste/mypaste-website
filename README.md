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

构建产物在 `dist/`，可部署到任意静态托管。GitHub Pages 请把源设置为 GitHub Actions 并构建本仓库；`base: "./"` 让产物支持子路径部署。

## 内容维护

扩展目录来自 `mypaste-code-extensions/dist/index.json` 的展示快照，字段与分类写在 `src/data/extensions.ts`。替换扩展说明或增加扩展时，同时更新该文件与页面中的目录日期，并与发布索引逐条核对。

协议正文不是自动导入 MyPaste 仓库 Markdown，而是面向站外读者的编辑版；字段与枚举必须与 MyPaste 仓库 `docs/PLUGINS.md` 一致。设计约定见 `DESIGN.md`。

## 相关仓库

- [MyPaste](https://github.com/zhanghuid/MyPaste)
- [mypaste-code-extensions](https://github.com/zhanghuid/mypaste-code-extensions)
