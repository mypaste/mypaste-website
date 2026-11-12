export type ExtensionKind = "ui" | "command";

export type ExtensionCategory =
  | "编辑与排版"
  | "格式工具"
  | "数据与管理"
  | "效率工具";

export interface SiteExtension {
  id: string;
  name: string;
  version: string;
  kind: ExtensionKind;
  description: string;
  summary: string;
  category: ExtensionCategory;
  tag: string;
  official: boolean;
}

/**
 * A curated display snapshot of mypaste-extensions-catalog/index.json
 * (generated 2026-11-11). IDs, names, versions, kinds and descriptions are
 * verbatim from the published index. Summary, category and tag belong to this
 * site only; they are not host protocol vocabulary.
 */
export const extensions: SiteExtension[] = [
  { id: "com.mypaste.code-edit", name: "代码编辑", version: "3.7.2", kind: "ui", description: "在本地编辑代码或纯文本：行号、语法高亮、语言识别与格式化都随包提供，所有语言的格式化都在扩展内完成，不依赖本机安装 gofmt、rustfmt、Python、Prettier 或其它工具；本机有 Node 时，CSS、YAML、JavaScript 与 TypeScript 会改用包内 Prettier 或内置脚本，排版更完整，没有也照常可用；顶部是可编辑标题的文档头，「语言」与「格式化」两个下拉按当前语言列出内置格式化与 SQL 压缩；高亮完全本地，不依赖其它能力包。可另存为新的历史条目或复制到剪贴板，原条目保持不变，不联网、不读取其它条目。", summary: "本地编辑代码与纯文本，高亮、格式化另存与复制都在扩展内完成。", category: "编辑与排版", tag: "代码", official: true },
  { id: "com.mypaste.json", name: "JSON 编辑器", version: "3.5.1", kind: "ui", description: "在页面内用 Prettier 排版 JSON：两侧都是可编辑、带行号与语法高亮的代码面板，右侧实时预览左侧，任何一侧都在出错的位置标出错误，说明写在面板下方。美化、压缩、折叠、XML、TypeScript 与复制齐全；折叠把嵌套结构收成一行、可再展开，「保留转义」开关决定结果里 \\uXXXX 与 \\/ 是否还原；粘贴 URL 参数、XML 或 YAML 转换后写在右侧。Prettier 内置于页面，不需要 Node，不联网，复制由宿主执行。", summary: "双栏编辑、实时预览与错误定位，把 JSON 排版放在本地完成。", category: "编辑与排版", tag: "JSON", official: true },
  { id: "com.mypaste.sql", name: "SQL Toolkit", version: "4.2.0", kind: "ui", description: "七种方言的 SQL 工作区：语法高亮、括号与子句顺序诊断、美化与压缩都在页面内完成，不执行 SQL、不联网；方言、关键字大小写与缩进随页面切换，长行默认自动换行，复制由宿主写入剪贴板。", summary: "七种方言的本地 SQL 工作区，支持诊断、美化与压缩。", category: "编辑与排版", tag: "SQL", official: true },
  { id: "com.mypaste.code-card", name: "代码卡片", version: "6.3.0", kind: "ui", description: "把代码或纯文本条目渲染成可分享的卡片图片：整页工作台沿用 carbon.now.sh 的编辑器布局——主题与语言两条下拉、编辑、复制与导出、页面关闭按钮，背景色板与「窗口 / 编辑器」两栏都在设置浮层里。卡片默认跟随宿主主题，另有七套配色、三种窗口框、行号、自动换行、字号、行高、留白与投影，背景可透明或任意十六进制色，导出 1× 或 2×；单行内容先按语言重排再绘制，宽度按真正画出的文字量取，长行默认在页面宽度处折行，不出横向滚动条；点卡片本身就能在卡片里改字，光标落在点到的位置，边打边重绘。卡片完全在本机绘制，不联网、不读取其它条目。", summary: "把代码渲染成可分享的图片卡片，主题、窗口框与导出尺寸可调。", category: "编辑与排版", tag: "分享", official: true },
  { id: "com.mypaste.image-edit", name: "图片编辑", version: "3.0.3", kind: "ui", description: "在本地裁剪、旋转、翻转、标注与马赛克，另存为新的图片条目或复制到剪贴板；原图保持不变。编辑只作用于宿主交给本次命令的那一张图片。", summary: "裁剪、旋转、标注与马赛克，编辑只作用于当前图片。", category: "编辑与排版", tag: "图片", official: true },
  { id: "com.mypaste.diff-view", name: "高亮对比", version: "3.2.2", kind: "ui", description: "把这条文本与屏幕上相邻的一条文本逐行对照：先对齐整行，再只标出真正改动的词。对比在本机完成，不联网；除本次条目外只读相邻的一条文本。", summary: "逐行对照相邻文本，并只标出真正改动的词。", category: "编辑与排版", tag: "对比", official: true },
  { id: "com.mypaste.link-inspector", name: "链接类型", version: "1.0.2", kind: "ui", description: "打开一条链接时自动调用「链接类型识别」能力，展示推断出的 MIME、类别、置信度与判断依据，并直接用合适的渲染器显示图片、音视频、JSON 与文本；渲染前先读服务器响应头的实际类型，路径没有扩展名时也不会被当成网页；抓不到内容时说明原因。可复制 MIME、链接或完整结果；没有安装识别能力时说明原因。", summary: "识别链接指向的资源类型，并用合适的渲染器展示内容。", category: "效率工具", tag: "链接", official: true },
  { id: "com.mypaste.calculator", name: "计算稿纸", version: "1.0.2", kind: "ui", description: "把一条文本当作稿纸逐行实时计算：四则运算、乘方、括号、百分号与角度，常用函数和常量，「名字 = 算式」定义变量，ans 引用上一行结果，# 开头是备注；点结果即复制，可复制全部结果或把整张稿纸保存为新条目。全部在本机计算，不联网，也不读取其它条目。", summary: "把文本当作连续稿纸逐行计算，变量与上一行结果都可引用。", category: "效率工具", tag: "计算", official: true },
  { id: "com.mypaste.timestamp", name: "时间戳", version: "1.0.2", kind: "ui", description: "把当前文本条目解析成多种日期与时间格式：本地时间、UTC、ISO 8601、RFC 2822、Unix 秒/毫秒、星期、ISO 周与多个时区，可逐项复制。内容无法识别时说明原因并回显原文。全部在本机计算，不联网。", summary: "解析成本地时间、UTC、ISO 8601、Unix 时间戳与多个时区。", category: "效率工具", tag: "时间", official: true },
  { id: "com.mypaste.link-mime", name: "链接类型识别", version: "1.0.0", kind: "command", description: "从链接文本推断它指向的资源类型（MIME）：先看 data: 声明与路径扩展名，再看已知站点、链接协议与查询参数，最后按网页兜底；输出 MIME、类别、置信度与判断依据。只读本次条目的文本，不联网、不写剪贴板。", summary: "从链接文本推断 MIME、类别、置信度与判断依据。", category: "效率工具", tag: "MIME", official: true },
  { id: "com.mypaste.sync", name: "同步", version: "1.0.2", kind: "ui", description: "把历史与资产加密后上传到自己的 S3 存储，也可以从远端恢复。归档、加密、S3 签名、凭据与自动上传计划都在扩展自己的进程里完成；数据只经宿主的只读视图读取，连接与恢复仍由宿主确认。凭据只存放在扩展的私有存储中，不进入页面、日志或宿主设置。", summary: "把历史与资产加密同步到自己的 S3，并可远端恢复。", category: "数据与管理", tag: "S3", official: true },
  { id: "com.mypaste.ferry", name: "跨设备同步", version: "3.0.2", kind: "command", description: "在已配对的 Mac 之间同步文本、图片与文件条目：端到端加密、离线排队、经你自己的中继转发；文件与目录由你在落盘前确认。中继只能看到设备 ID、消息大小与时间，看不到正文；扩展密钥由扩展私有目录的文件权限保护；自建中继的 TLS 证书由你负责；接收的文件不做病毒扫描。交互思路参考 PasteFerry（AGPL-3.0），未使用其源码或协议实现。", summary: "在已配对的 Mac 之间端到端加密同步，经自己的中继转发。", category: "数据与管理", tag: "设备", official: true },
  { id: "com.mypaste.data-settings", name: "数据设置", version: "1.0.2", kind: "ui", description: "备份与恢复、历史导入导出、设置文件与诊断；界面由随包扩展提供，文件选择、校验与写入仍由宿主完成。", summary: "备份恢复、历史导入导出、设置文件与诊断的统一设置页。", category: "数据与管理", tag: "数据", official: true },
  { id: "com.mypaste.saved-searches", name: "保存搜索", version: "2.1.0", kind: "command", description: "保存当前查询、修改或删除保存搜索；查询与看板范围都由宿主保存。", summary: "把当前查询与看板范围保存成可复用的搜索。", category: "数据与管理", tag: "搜索", official: true },
  { id: "com.mypaste.boards", name: "看板", version: "2.2.0", kind: "command", description: "新建、编辑、删除看板与成员关系并导出看板；数据、导出对话框与写入都由宿主完成。", summary: "管理看板与成员关系，数据写入由宿主负责。", category: "数据与管理", tag: "看板", official: true },
  { id: "com.mypaste.backup-scheduler", name: "自动备份", version: "2.1.0", kind: "command", description: "触发一次自动备份并读取排程摘要；排程、轮换与归档写入都由宿主完成。", summary: "触发自动备份并查看排程摘要。", category: "数据与管理", tag: "备份", official: true },
  { id: "com.mypaste.history-cleanup", name: "清空历史", version: "1.1.0", kind: "command", description: "清空普通历史，或连同固定项一起清空；选项、原生确认、保留规则与删除都由宿主完成。", summary: "在宿主原生确认与保留规则下清理历史。", category: "数据与管理", tag: "清理", official: true },
  { id: "mypaste.format-json", name: "JSON Format", version: "3.0.2", kind: "command", description: "使用本机 Python 标准库保守格式化 JSON；缩进可在扩展设置里调整，失败时保留原文。", summary: "使用本机 Python 标准库保守格式化 JSON，失败时保留原文。", category: "格式工具", tag: "JSON", official: false },
  { id: "mypaste.format-go", name: "Go Format", version: "3.0.2", kind: "command", description: "使用本机可用工具格式化 Go；依赖缺失或语法错误时保留原文。", summary: "调用本机可用工具格式化 Go，失败时保留原文。", category: "格式工具", tag: "Go", official: false },
  { id: "mypaste.format-html", name: "Html Format", version: "3.0.2", kind: "command", description: "使用本机可用工具格式化 Html；依赖缺失或语法错误时保留原文。", summary: "调用本机可用工具格式化 HTML，失败时保留原文。", category: "格式工具", tag: "HTML", official: false },
  { id: "mypaste.format-javascript", name: "JavaScript Format", version: "3.0.2", kind: "command", description: "使用本机可用工具格式化 JavaScript；依赖缺失或语法错误时保留原文。", summary: "调用本机可用工具格式化 JavaScript，失败时保留原文。", category: "格式工具", tag: "JS", official: false },
  { id: "mypaste.format-php", name: "Php Format", version: "3.0.2", kind: "command", description: "使用本机可用工具格式化 Php；依赖缺失或语法错误时保留原文。", summary: "调用本机可用工具格式化 PHP，失败时保留原文。", category: "格式工具", tag: "PHP", official: false },
  { id: "mypaste.format-python", name: "Python Format", version: "3.0.2", kind: "command", description: "使用本机可用工具格式化 Python；依赖缺失或语法错误时保留原文。", summary: "调用本机可用工具格式化 Python，失败时保留原文。", category: "格式工具", tag: "Python", official: false },
  { id: "mypaste.format-rust", name: "Rust Format", version: "3.0.2", kind: "command", description: "使用本机可用工具格式化 Rust；依赖缺失或语法错误时保留原文。", summary: "调用本机可用工具格式化 Rust，失败时保留原文。", category: "格式工具", tag: "Rust", official: false },
  { id: "mypaste.format-typescript", name: "TypeScript Format", version: "3.0.2", kind: "command", description: "使用本机可用工具格式化 TypeScript；依赖缺失或语法错误时保留原文。", summary: "调用本机可用工具格式化 TypeScript，失败时保留原文。", category: "格式工具", tag: "TS", official: false },
];

export const catalogDate = "2026-11-11";

export const categories: Array<"全部" | ExtensionCategory> = [
  "全部",
  "编辑与排版",
  "格式工具",
  "数据与管理",
  "效率工具",
];
