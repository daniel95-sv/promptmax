// ============================================================
// PromptMax - Biblioteca de Plantillas (Skill.md § 13, § 16)
// ============================================================

import { TEMPLATES } from "../../data/templates.js";
import { escapeHtml, $, $$ } from "../../utils/dom.js";

let activeTplFilter = "all";
let tplSearchQuery = "";

export function initTemplatesView(container, onApplyTemplate) {
  // Bind category filter tabs
  $$(".tpl-filter-btn, #templateFilters .tab").forEach((btn) => {
    btn.addEventListener("click", () => {
      activeTplFilter = btn.dataset.catFilter || btn.dataset.filter || "all";
      $$(".tpl-filter-btn, #templateFilters .tab").forEach((x) => {
        const isMatch = x === btn;
        x.setAttribute("aria-pressed", isMatch ? "true" : "false");
        x.setAttribute("aria-selected", isMatch ? "true" : "false");
      });
      renderTemplates(container, onApplyTemplate);
    });
  });

  // Bind search input
  const searchInput = $("#tplSearchInput") || $("#templateSearch");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      tplSearchQuery = e.target.value.trim();
      renderTemplates(container, onApplyTemplate);
    });
  }

  renderTemplates(container, onApplyTemplate);
}

export function renderTemplates(container, onApplyTemplate) {
  if (!container) return;
  container.innerHTML = "";

  const catLabel = { image: "Imagen", video: "Video", text: "Texto", code: "Programación" };

  const filtered = TEMPLATES.filter((tpl) => {
    const matchesCat = activeTplFilter === "all" || tpl.cat === activeTplFilter;
    const q = tplSearchQuery.toLowerCase();
    const matchesSearch =
      !q ||
      tpl.title.toLowerCase().includes(q) ||
      tpl.desc.toLowerCase().includes(q) ||
      (catLabel[tpl.cat] || "").toLowerCase().includes(q);
    return matchesCat && matchesSearch;
  });

  if (filtered.length === 0) {
    container.innerHTML = `<div style="grid-column: 1/-1; padding: 2rem; text-align: center; color: var(--text-dim);">No se encontraron plantillas que coincidan con la búsqueda.</div>`;
    return;
  }

  filtered.forEach((tpl) => {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "tpl-card";
    card.innerHTML = `<span class="tag">${escapeHtml(catLabel[tpl.cat] || tpl.cat)}</span><span class="title">${escapeHtml(tpl.title)}</span><span class="desc">${escapeHtml(tpl.desc)}</span>`;
    card.addEventListener("click", () => {
      if (typeof onApplyTemplate === "function") {
        onApplyTemplate(tpl);
      }
    });
    container.appendChild(card);
  });
}
