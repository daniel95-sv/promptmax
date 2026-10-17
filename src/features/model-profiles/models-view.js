// ============================================================
// PromptMax - Catálogo y Perfiles de Modelos (Skill.md § 4, § 18)
// ============================================================

import { MODEL_PROFILES, CATALOG_MODELS_GRID } from "../../data/models.js";
import { escapeHtml } from "../../utils/dom.js";

export function renderModelSelector(container, state, onSelect, onAutoFill) {
  const cat = state.category;
  const modelSection = document.createElement("div");
  modelSection.className = "field";

  const headerRow = document.createElement("div");
  headerRow.className = "model-header-row";
  headerRow.style.display = "flex";
  headerRow.style.justifyContent = "space-between";
  headerRow.style.alignItems = "center";
  headerRow.style.flexWrap = "wrap";
  headerRow.style.gap = "0.5rem";
  headerRow.style.marginBottom = "0.6rem";

  const ml = document.createElement("div");
  ml.className = "field-label";
  ml.style.marginBottom = "0";
  ml.textContent = "Modelo de IA Destino";
  headerRow.appendChild(ml);

  if (typeof onAutoFill === "function") {
    const autoFillBtn = document.createElement("button");
    autoFillBtn.type = "button";
    autoFillBtn.className = "btn small primary";
    autoFillBtn.id = "autoFillExampleBtn";
    autoFillBtn.title = "Completar automáticamente todos los campos con un ejemplo según la categoría y modelo seleccionado";
    autoFillBtn.innerHTML = `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14" aria-hidden="true" style="margin-right: 4px; vertical-align: -2px;">
        <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z"/>
      </svg>
      Completar con ejemplo
    `;
    autoFillBtn.addEventListener("click", onAutoFill);
    headerRow.appendChild(autoFillBtn);
  }

  modelSection.appendChild(headerRow);

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
