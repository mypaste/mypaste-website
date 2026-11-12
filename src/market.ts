import "./style.css";
import { categories, catalogDate, extensions, type ExtensionCategory, type ExtensionKind } from "./data/extensions";
import { revealSupported as canReveal } from "./shared";

type CategoryFilter = "全部" | ExtensionCategory;
type KindFilter = "全部" | ExtensionKind;

interface FilterState {
  category: CategoryFilter;
  kind: KindFilter;
  query: string;
}

const state: FilterState = {
  category: "全部",
  kind: "全部",
  query: "",
};

function required<T extends Element>(selector: string): T {
  const element = document.querySelector<T>(selector);
  if (!element) throw new Error(`marketplace page is missing ${selector}`);
  return element;
}

const grid = required<HTMLElement>("#extension-grid");
const count = required<HTMLElement>("#result-count");
const search = required<HTMLInputElement>("#extension-search");
const categoryOptions = required<HTMLElement>("#category-options");
const kindOptions = required<HTMLElement>("#kind-options");
const catalogDateNode = document.querySelector<HTMLElement>("[data-catalog-date]");
const catalogCountNode = document.querySelector<HTMLElement>("[data-catalog-count]");
const dialog = required<HTMLDialogElement>("#extension-dialog");
const dialogBody = required<HTMLElement>("#dialog-body");

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function countForCategory(category: CategoryFilter): number {
  return category === "全部"
    ? extensions.length
    : extensions.filter((item) => item.category === category).length;
}

function countForKind(kind: KindFilter): number {
  return kind === "全部"
    ? extensions.length
    : extensions.filter((item) => item.kind === kind).length;
}

function chip(label: string, group: "category" | "kind", value: string, total: number, active: boolean): string {
  return `<button class="filter-chip" type="button" data-filter-group="${group}" data-filter-value="${value}" aria-pressed="${active}"><span>${label}</span><small>${total}</small></button>`;
}

function renderFilters(): void {
  categoryOptions.innerHTML = categories
    .map((item) => chip(item, "category", item, countForCategory(item), state.category === item))
    .join("");
  kindOptions.innerHTML = ([
    ["全部", "全部扩展"],
    ["ui", "表面扩展"],
    ["command", "能力命令"],
  ] as const)
    .map(([value, label]) => chip(label, "kind", value, countForKind(value as KindFilter), state.kind === value))
    .join("");
}

function matches(item: (typeof extensions)[number]): boolean {
  if (state.category !== "全部" && item.category !== state.category) return false;
  if (state.kind !== "全部" && item.kind !== state.kind) return false;
  const query = state.query.trim().toLocaleLowerCase();
  if (!query) return true;
  return [item.name, item.id, item.summary, item.description, item.tag, item.category]
    .join(" ")
    .toLocaleLowerCase()
    .includes(query);
}

function renderCards(): void {
  const visible = extensions.filter(matches);
  count.textContent = `${visible.length} / ${extensions.length} 个扩展 · 目录 ${catalogDate}`;
  if (visible.length === 0) {
    grid.innerHTML = `<div class="empty-state" role="status"><strong>没有匹配的扩展</strong>换一个关键词，或把筛选条件重置为「全部」。</div>`;
    return;
  }
  grid.innerHTML = visible
    .map(
      (item, index) => `
        <article class="extension-card" data-reveal data-delay="${Math.min(index, 5) * 35}" tabindex="0" role="button" data-extension-id="${escapeHtml(item.id)}" aria-label="查看 ${escapeHtml(item.name)} 详情">
          <div class="ext-head">
            <span class="ext-mark" aria-hidden="true">${escapeHtml(item.name.slice(0, 1))}</span>
            <span class="ext-badge ${item.official ? "ext-badge-official" : ""}">${item.official ? "官方 · " : ""}${item.kind === "ui" ? "Surface" : "Command"}</span>
          </div>
          <h3>${escapeHtml(item.name)} <span class="tag">${escapeHtml(item.tag)}</span></h3>
          <span class="ext-id">${escapeHtml(item.id)}</span>
          <p class="ext-summary">${escapeHtml(item.summary)}</p>
          <div class="ext-footer"><span>v${escapeHtml(item.version)} · ${escapeHtml(item.category)}</span><span class="text-link">查看详情 <svg class="icon" aria-hidden="true"><use href="#i-arrow-up-right" /></svg></span></div>
        </article>`,
    )
    .join("");
  revealDynamicCards();
}

let revealObserver: IntersectionObserver | null = null;
function revealDynamicCards(): void {
  const nodes = grid.querySelectorAll<HTMLElement>("[data-reveal]");
  if (!canReveal || !("IntersectionObserver" in window)) {
    for (const node of nodes) node.classList.add("is-visible");
    return;
  }
  revealObserver?.disconnect();
  revealObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const target = entry.target as HTMLElement;
        target.style.setProperty("--reveal-delay", `${Number(target.dataset.delay ?? 0)}ms`);
        target.classList.add("is-visible");
        revealObserver?.unobserve(target);
      }
    },
    { rootMargin: "0px 0px -24px 0px", threshold: 0.04 },
  );
  for (const node of nodes) revealObserver.observe(node);
}

function openDetails(id: string): void {
  const item = extensions.find((entry) => entry.id === id);
  if (!item) return;
  dialogBody.innerHTML = `
    <div class="dialog-top">
      <div><span class="eyebrow is-plain">Extension detail</span><h2>${escapeHtml(item.name)}</h2><div class="dialog-id">${escapeHtml(item.id)}</div></div>
      <button class="dialog-close" id="dialog-close" type="button" aria-label="关闭详情"><svg class="icon" aria-hidden="true"><use href="#i-x" /></svg></button>
    </div>
    <div class="dialog-meta"><span class="tag tag-strong">v${escapeHtml(item.version)}</span><span class="tag">${item.kind === "ui" ? "Surface · ui" : "Command"}</span><span class="tag">${escapeHtml(item.category)}</span><span class="tag">${item.official ? "官方包" : "格式工具"}</span></div>
    <p class="dialog-description">${escapeHtml(item.description)}</p>
    <div class="dialog-actions"><a class="button" href="../docs/#quickstart">阅读协议</a><a class="button button-primary" href="../#start">了解安装流程 <svg class="icon" aria-hidden="true"><use href="#i-arrow-up-right" /></svg></a></div>
    <p class="dialog-hint">网页只展示发布索引；实际下载、内容摘要校验和安装都由 MyPaste 宿主完成。</p>`;
  dialogBody.querySelector<HTMLButtonElement>("#dialog-close")?.addEventListener("click", () => dialog.close());
  dialog.showModal();
}

if (catalogDateNode) catalogDateNode.textContent = catalogDate;
if (catalogCountNode) catalogCountNode.textContent = String(extensions.length);

renderFilters();
renderCards();

document.querySelector<HTMLElement>("#filter-groups")?.addEventListener("click", (event) => {
  const button = (event.target as HTMLElement).closest<HTMLButtonElement>("[data-filter-group]");
  if (!button) return;
  const group = button.dataset.filterGroup;
  const value = button.dataset.filterValue;
  if (group === "category") state.category = value as CategoryFilter;
  else if (group === "kind") state.kind = value as KindFilter;
  else return;
  renderFilters();
  renderCards();
});

search.addEventListener("input", () => {
  state.query = search.value;
  renderCards();
});

grid.addEventListener("click", (event) => {
  const card = (event.target as HTMLElement).closest<HTMLElement>("[data-extension-id]");
  if (card?.dataset.extensionId) openDetails(card.dataset.extensionId);
});

grid.addEventListener("keydown", (event) => {
  if (event.key !== "Enter" && event.key !== " ") return;
  const card = (event.target as HTMLElement).closest<HTMLElement>("[data-extension-id]");
  if (!card?.dataset.extensionId) return;
  event.preventDefault();
  openDetails(card.dataset.extensionId);
});

dialog.addEventListener("click", (event) => {
  const target = event.target as HTMLElement;
  if (target === dialog) dialog.close();
});
