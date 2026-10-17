// ============================================================
// PromptMax - Panel de Análisis Orientativo (Skill.md § 5.D)
// ============================================================

import { analyzePrompt } from "../../core/validation.js";
import { escapeHtml, $ } from "../../utils/dom.js";

export function renderAnalysis(state, promptText) {
  const c = $("#analysisList");
  if (!c) return;

  const items = analyzePrompt(promptText || "", state);
  c.innerHTML = "";

  items.forEach((it) => {
    const div = document.createElement("div");
    div.className = `analysis-item ${it.type}`;
    const icon =
      it.type === "ok"
        ? `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>`
        : it.type === "warn"
        ? `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`
        : it.type === "err"
        ? `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`
        : `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>`;

    div.innerHTML = `${icon}<div class="body"><strong>${escapeHtml(it.title)}</strong><span class="dim">${escapeHtml(it.text)}</span></div>`;
    c.appendChild(div);
  });
}
