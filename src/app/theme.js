// ============================================================
// PromptMax - Gestión de Tema Claro / Oscuro
// ============================================================

import { $ } from "../utils/dom.js";
import { getStoredTheme, setStoredTheme } from "../core/storage.js";

export function applyTheme(t) {
  document.documentElement.setAttribute("data-theme", t);
  const metaTheme = $('meta[name="theme-color"]');
  if (metaTheme) metaTheme.content = t === "dark" ? "#0b0d12" : "#f6f7fb";

  const icon = $("#themeIcon");
  if (icon) {
    if (t === "light") {
      icon.innerHTML = `<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>`;
    } else {
      icon.innerHTML = `<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>`;
    }
  }
}

export function initTheme() {
  const current = getStoredTheme();
  applyTheme(current);

  const toggle = $("#themeToggle");
  if (toggle) {
    toggle.addEventListener("click", () => {
      const now = document.documentElement.getAttribute("data-theme") === "light" ? "dark" : "light";
      applyTheme(now);
      setStoredTheme(now);
    });
  }
}
