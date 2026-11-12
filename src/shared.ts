const year = document.querySelector<HTMLElement>("[data-year]");
if (year) year.textContent = String(new Date().getFullYear());

const page = document.body.dataset.page ?? "home";
const pageLinks = document.querySelectorAll<HTMLAnchorElement>("[data-nav]");
for (const link of pageLinks) {
  if (link.dataset.nav === page) {
    link.classList.add("is-current");
    link.setAttribute("aria-current", "page");
  }
}

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const revealItems = document.querySelectorAll<HTMLElement>("[data-reveal]");
const canReveal = !reducedMotion && "IntersectionObserver" in window;

/* Reveal is progressive enhancement only. Without this class every section is
   fully opaque, so a blocked script, a print render, or a full-page capture
   never shows blank content. */
if (canReveal) document.documentElement.classList.add("has-reveal");
else for (const item of revealItems) item.classList.add("is-visible");

export const revealSupported = canReveal;

if (canReveal) {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const target = entry.target as HTMLElement;
        const delay = Number(target.dataset.delay ?? 0);
        target.style.setProperty("--reveal-delay", `${delay}ms`);
        target.classList.add("is-visible");
        observer.unobserve(target);
      }
    },
    { rootMargin: "0px 0px -40px 0px", threshold: 0.08 },
  );
  for (const item of revealItems) observer.observe(item);
}

const copyButtons = document.querySelectorAll<HTMLButtonElement>("[data-copy]");
for (const button of copyButtons) {
  button.addEventListener("click", async () => {
    const target = document.querySelector<HTMLElement>(button.dataset.copy ?? "");
    if (!target) return;
    try {
      await navigator.clipboard.writeText(target.innerText.trim());
      const previous = button.textContent;
      button.textContent = "已复制";
      button.classList.add("is-copied");
      window.setTimeout(() => {
        button.textContent = previous;
        button.classList.remove("is-copied");
      }, 1400);
    } catch {
      button.textContent = "请手动选择";
      window.setTimeout(() => (button.textContent = "复制代码"), 1400);
    }
  });
}

if (page === "docs") {
  const sections = [...document.querySelectorAll<HTMLElement>(".doc-section[id]")];
  const anchors = [...document.querySelectorAll<HTMLAnchorElement>(".doc-toc a[href^='#']")];
  if ("IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (!visible) return;
        for (const anchor of anchors) {
          const active = anchor.hash.slice(1) === visible.target.id;
          anchor.classList.toggle("is-active", active);
          if (active) anchor.setAttribute("aria-current", "location");
          else anchor.removeAttribute("aria-current");
        }
      },
      { rootMargin: "-100px 0px -65% 0px", threshold: 0 },
    );
    for (const section of sections) sectionObserver.observe(section);
  }
}
