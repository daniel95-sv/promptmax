// ============================================================
// PromptMax - Catálogo y Perfiles de Modelos (Skill.md § 4, § 18)
// ============================================================

import { MODEL_PROFILES, CATALOG_MODELS_GRID } from "../../data/models.js";
import { escapeHtml } from "../../utils/dom.js";

export function renderModelSelector(container, state, onSelect) {
  const cat = state.category;
  const modelSection = document.createElement("div");
  modelSection.className = "field";

  const ml = document.createElement("div");
  ml.className = "field-label";
  ml.textContent = "Modelo de IA Destino";
  modelSection.appendChild(ml);

  const grid = document.createElement("div");
  grid.className = "model-grid";

  (MODEL_PROFILES[cat] || []).forEach((m) => {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "model-card";
    b.setAttribute("aria-pressed", state.models[cat] === m.id ? "true" : "false");
    b.innerHTML = `<span class="cat">${escapeHtml(m.cat)}</span><span class="name">${escapeHtml(m.name)}</span>`;
    b.title = `${m.desc}\nSintaxis: ${m.syntax}`;

    b.addEventListener("click", () => {
      state.models[cat] = m.id;
      grid.querySelectorAll(".model-card").forEach((card) => {
        card.setAttribute("aria-pressed", card === b ? "true" : "false");
      });
      if (typeof onSelect === "function") {
        onSelect(m);
      }
    });
    grid.appendChild(b);
  });
  modelSection.appendChild(grid);
  container.appendChild(modelSection);
}

export function renderModelCatalog(container) {
  if (!container) return;
  container.innerHTML = "";

  CATALOG_MODELS_GRID.forEach((m) => {
    const card = document.createElement("div");
    card.className = "model-profile";
    card.innerHTML = `
      <div class="mp-head">
        <span class="mp-name">${escapeHtml(m.name)}</span>
        <span class="mp-tag">${escapeHtml(m.cat)}</span>
      </div>
      <p class="mp-desc">${escapeHtml(m.desc)}</p>
      <div class="mp-syntax">${escapeHtml(m.syntax)}</div>
    `;
    container.appendChild(card);
  });
}
