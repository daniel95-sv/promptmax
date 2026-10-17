// ============================================================
// PromptMax - Editor de Prompts y Acciones (Skill.md § 5.C, § 14, § 16)
// ============================================================

import { generatePrompt } from "../../core/prompt-engine.js";
import { persistState, createExportPayload } from "../../core/storage.js";
import { downloadText, sanitizeFilename } from "../../utils/file.js";
import { renderAnalysis } from "./analysis.js";
import { handleSaveCurrentDraft } from "./drafts.js";
import { toast } from "../../components/toast.js";
import { $ } from "../../utils/dom.js";

export function initPromptEditor(state, { onStateChange, onReset }) {
  const editor = $("#promptEditor");
  const undoStack = [];
  const redoStack = [];

  function updateMeta() {
    if (!editor) return;
    const v = editor.value;
    const chars = v.length;
    const words = v.trim() ? v.trim().split(/\s+/).length : 0;

    const charEl = $("#charCount");
    if (charEl) charEl.textContent = `${chars} caracteres · ${words} palabras`;

    const mobileBadge = $("#mobilePromptBadge");
    if (mobileBadge) mobileBadge.textContent = `Ver Prompt (${words} palabras)`;

    const ind = $("#dirtyIndicator");
    if (ind) {
      if (state.dirty) {
        ind.textContent = "Modificado manualmente";
        ind.className = "warn";
        editor.setAttribute("data-dirty", "true");
      } else {
        ind.textContent = "";
        ind.className = "";
        editor.removeAttribute("data-dirty");
      }
    }

    const langLabel = $("#promptLangLabel");
    if (langLabel) {
      langLabel.textContent = state.language === "es" ? "Español" : "English";
    }
  }

  function regenerate() {
    const generated = generatePrompt(state);
    if (!state.dirty && editor) {
      editor.value = generated;
      state.manualPrompt = generated;
    }
    updateMeta();
    renderAnalysis(state, editor ? editor.value : "");
    persistState(state);
  }

  if (editor) {
    editor.addEventListener("input", (e) => {
      undoStack.push(state.manualPrompt || "");
      redoStack.length = 0;
      state.manualPrompt = e.target.value;
      state.dirty = true;
      updateMeta();
      renderAnalysis(state, editor.value);
      persistState(state);
    });
  }

  const undoBtn = $("#undoBtn");
  if (undoBtn) {
    undoBtn.addEventListener("click", () => {
      if (undoStack.length === 0) {
        toast("Nada que deshacer.");
        return;
      }
      const prev = undoStack.pop();
      if (editor) {
        redoStack.push(editor.value);
        editor.value = prev;
        state.manualPrompt = prev;
        state.dirty = true;
        updateMeta();
        renderAnalysis(state, editor.value);
        persistState(state);
        toast("Cambio deshecho.");
      }
    });
  }

  const redoBtn = $("#redoBtn");
  if (redoBtn) {
    redoBtn.addEventListener("click", () => {
      if (redoStack.length === 0) {
        toast("Nada que rehacer.");
        return;
      }
      const next = redoStack.pop();
      if (editor) {
        undoStack.push(editor.value);
        editor.value = next;
        state.manualPrompt = next;
        state.dirty = true;
        updateMeta();
        renderAnalysis(state, editor.value);
        persistState(state);
        toast("Cambio rehecho.");
      }
    });
  }

  const regenBtn = $("#regenBtn");
  if (regenBtn) {
    regenBtn.addEventListener("click", () => {
      state.dirty = false;
      regenerate();
      toast("Prompt regenerado desde las opciones visuales.");
    });
  }

  async function copyPrompt() {
    const v = editor ? editor.value : "";
    if (!v.trim()) {
      toast("No hay prompt para copiar.");
      return;
    }
    try {
      await navigator.clipboard.writeText(v);
      toast("Prompt copiado al portapapeles.");
    } catch {
      if (editor) {
        editor.select();
        try {
          document.execCommand("copy");
          toast("Prompt copiado.");
        } catch {
          toast("No se pudo copiar.");
        }
      }
    }
  }

  const copyBtn = $("#copyBtn");
  if (copyBtn) copyBtn.addEventListener("click", copyPrompt);

  const downloadBtn = $("#downloadBtn");
  if (downloadBtn) {
    downloadBtn.addEventListener("click", () => {
      const v = editor ? editor.value : "";
      if (!v.trim()) {
        toast("Nada que descargar.");
        return;
      }
      const f = state.fields[state.category];
      const id = f.subject || f.projectName || f.concept || f.role || state.category;
      downloadText(v, `prompt-${state.category}-${sanitizeFilename(id)}.txt`);
      toast("Descarga iniciada (.txt).");
    });
  }

  const downloadMdBtn = $("#downloadMdBtn");
  if (downloadMdBtn) {
    downloadMdBtn.addEventListener("click", () => {
      const v = editor ? editor.value : "";
      if (!v.trim()) {
        toast("Nada que descargar.");
        return;
      }
      const f = state.fields[state.category];
      const id = f.subject || f.projectName || f.concept || f.role || state.category;
      const mdContent = `# PromptMax — ${state.category.toUpperCase()}\n\n> Modelo: ${state.models[state.category]} | Idioma: ${state.language}\n\n\`\`\`\n${v}\n\`\`\`\n\n---\n*Generado con PromptMax (100% privado y en tu navegador)*`;
      downloadText(mdContent, `prompt-${state.category}-${sanitizeFilename(id)}.md`, "text/markdown");
      toast("Descarga iniciada (.md).");
    });
  }

  const exportJsonBtn = $("#exportJsonBtn");
  if (exportJsonBtn) {
    exportJsonBtn.addEventListener("click", () => {
      const v = editor ? editor.value : "";
      const payload = createExportPayload(state, v);
      downloadText(JSON.stringify(payload, null, 2), `promptmax-${state.category}.json`, "application/json");
      toast("Configuración exportada en JSON.");
    });
  }

  const saveDraftBtn = $("#saveDraftBtn");
  if (saveDraftBtn) {
    saveDraftBtn.addEventListener("click", () => {
      handleSaveCurrentDraft(state, editor ? editor.value : "");
    });
  }

  const saveCurrentDraftBtn = $("#saveCurrentDraftBtn");
  if (saveCurrentDraftBtn) {
    saveCurrentDraftBtn.addEventListener("click", () => {
      handleSaveCurrentDraft(state, editor ? editor.value : "");
    });
  }

  const printBtn = $("#printBtn");
  if (printBtn) {
    printBtn.addEventListener("click", () => window.print());
  }

  const clearBtn = $("#clearBtn");
  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      if (!confirm("¿Deseas reiniciar todos los campos y el prompt generado?")) return;
      if (typeof onReset === "function") onReset();
      toast("Formulario y datos locales limpiados.");
    });
  }

  const langToggle = $("#langToggle");
  if (langToggle) {
    langToggle.addEventListener("click", () => {
      state.language = state.language === "en" ? "es" : "en";
      state.dirty = false;
      persistState(state);
      regenerate();
      toast(`Idioma del prompt cambiado a ${state.language === "es" ? "Español" : "English"}.`);
    });
  }

  return {
    regenerate,
    updateMeta,
    copyPrompt
  };
}
