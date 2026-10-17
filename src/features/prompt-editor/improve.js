// ============================================================
// PromptMax - Módulo "Mejorar mi prompt" (Skill.md § 15)
// ============================================================

import { improvePrompt } from "../../core/optimization.js";
import { toast } from "../../components/toast.js";
import { $, $$ } from "../../utils/dom.js";

export function initImprovePrompt(state, onApplyToEditor) {
  let currentOp = "structure";

  $$(".improve-actions [data-op]").forEach((b) => {
    b.addEventListener("click", () => {
      currentOp = b.dataset.op;
      $$(".improve-actions [data-op]").forEach((x) =>
        x.setAttribute("aria-pressed", x === b ? "true" : "false")
      );
    });
  });

  const improveBtn = $("#improveBtn");
  if (improveBtn) {
    improveBtn.addEventListener("click", () => {
      const input = $("#importInput");
      const out = $("#improveOutput");
      if (!input || !out) return;
      const text = input.value;
      if (!text.trim()) {
        toast("Pega un prompt primero para mejorarlo.");
        return;
      }
      out.value = improvePrompt(text, currentOp, state.models[state.category], state.language);
      toast("Prompt optimizado.");
    });
  }

  const improveCopy = $("#improveCopy");
  if (improveCopy) {
    improveCopy.addEventListener("click", async () => {
      const out = $("#improveOutput");
      const v = out ? out.value : "";
      if (!v) {
        toast("No hay texto optimizado que copiar.");
        return;
      }
      try {
        await navigator.clipboard.writeText(v);
        toast("Copiado al portapapeles.");
      } catch {
        toast("No se pudo copiar.");
      }
    });
  }

  const improveUse = $("#improveUse");
  if (improveUse) {
    improveUse.addEventListener("click", () => {
      const out = $("#improveOutput");
      const v = out ? out.value : "";
      if (!v) {
        toast("No hay texto para aplicar.");
        return;
      }
      if (typeof onApplyToEditor === "function") {
        onApplyToEditor(v);
      }
      const constructorEl = document.getElementById("constructor");
      if (constructorEl) {
        constructorEl.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      toast("Prompt optimizado cargado en el editor.");
    });
  }
}
