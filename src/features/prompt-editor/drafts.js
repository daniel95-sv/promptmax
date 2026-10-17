// ============================================================
// PromptMax - Gestor de Borradores Locales (Skill.md § 5.A, § 16)
// ============================================================

import { getSavedDrafts, saveDraft, deleteDraft, clearAllDrafts } from "../../core/storage.js";
import { escapeHtml, $ } from "../../utils/dom.js";
import { toast } from "../../components/toast.js";

export function renderSavedDrafts(onLoadDraft) {
  const container = $("#savedDraftsList");
  if (!container) return;
  const drafts = getSavedDrafts();

  if (drafts.length === 0) {
    container.innerHTML = `<div class="empty">No tienes borradores guardados todavía. Usa el botón «Guardar prompt actual» para archivar tus prompts.</div>`;
    return;
  }

  container.innerHTML = "";
  drafts.forEach((d) => {
    const card = document.createElement("div");
    card.className = "draft-card";
    const dateFormatted = new Date(d.createdAt).toLocaleString();
    card.innerHTML = `
      <div class="meta">
        <strong>${escapeHtml(d.title)}</strong>
        <span>Categoría: ${escapeHtml(d.category.toUpperCase())} · ${dateFormatted}</span>
      </div>
      <div class="actions">
        <button type="button" class="btn small primary load-draft-btn">Cargar</button>
        <button type="button" class="btn small ghost del-draft-btn" title="Eliminar borrador">×</button>
      </div>
    `;

    card.querySelector(".load-draft-btn").addEventListener("click", () => {
      if (typeof onLoadDraft === "function") {
        onLoadDraft(d);
      }
      const dlg = $("#modal-borradores");
      if (dlg && typeof dlg.close === "function") dlg.close();
      toast(`Borrador «${d.title}» cargado.`);
    });

    card.querySelector(".del-draft-btn").addEventListener("click", () => {
      deleteDraft(d.id);
      renderSavedDrafts(onLoadDraft);
      toast("Borrador eliminado.");
    });

    container.appendChild(card);
  });
}

export function handleSaveCurrentDraft(state, currentPromptText) {
  const f = state.fields[state.category];
  const titleHint = f.subject || f.projectName || f.concept || f.role || state.category;
  const userTitle = prompt("Nombre o título para este borrador:", `Borrador ${state.category} - ${titleHint}`);
  if (userTitle === null) return; // cancelado por el usuario

  saveDraft({
    title: userTitle.trim() || `Borrador ${state.category}`,
    category: state.category,
    language: state.language,
    model: state.models[state.category],
    fields: state.fields[state.category],
    prompt: currentPromptText
  });
  renderSavedDrafts();
  toast("Prompt guardado en tus borradores locales.");
}

export { clearAllDrafts };
