/**
 * PromptMax — Controlador Principal de la Aplicación
 * Cumple con la Arquitectura Modular de Skill.md (§ 17):
 * - src/app: estado global y tema
 * - src/components: componentes de UI (modales, navegación, campos, toast)
 * - src/features/image-prompts: constructor de imágenes
 * - src/features/video-prompts: constructor de videos
 * - src/features/text-prompts: constructor de texto y razonamiento
 * - src/features/code-prompts: constructor de programación
 * - src/features/prompt-editor: editor, análisis, borradores y optimizador
 * - src/features/templates: catálogo de plantillas
 * - src/features/model-profiles: perfiles de modelos
 * - src/core/prompt-engine: motor de generación desacoplado
 * - src/core/validation: validaciones y contradicciones
 * - src/core/optimization: operaciones de optimización
 * - src/services: servicios externos opcionales
 * - src/utils: utilidades de DOM y archivos
 */

import { getState, resetState, persistState } from "./app/state.js";
import { initTheme } from "./app/theme.js";
import { initConsent, initModals } from "./components/modal.js";
import { initNavigation, syncCategoryTabs } from "./components/navigation.js";
import { toast } from "./components/toast.js";
import { renderImageBuilder } from "./features/image-prompts/image-builder.js";
import { renderVideoBuilder } from "./features/video-prompts/video-builder.js";
import { renderTextBuilder } from "./features/text-prompts/text-builder.js";
import { renderCodeBuilder } from "./features/code-prompts/code-builder.js";
import { renderModelSelector, renderModelCatalog } from "./features/model-profiles/models-view.js";
import { initTemplatesView } from "./features/templates/templates-view.js";
import { initPromptEditor } from "./features/prompt-editor/editor.js";
import { renderSavedDrafts, clearAllDrafts } from "./features/prompt-editor/drafts.js";
import { initImprovePrompt } from "./features/prompt-editor/improve.js";
import { generatePrompt } from "./core/prompt-engine/index.js";
import { $ } from "./utils/dom.js";

document.addEventListener("DOMContentLoaded", () => {
  let state = getState();

  // 1. Inicialización de tema y consentimiento
  initTheme();
  initConsent();

  // 2. Controlador de Editor
  let editorController;

  function onFormUpdate() {
    persistState(state);
    if (editorController) {
      editorController.regenerate();
    }
  }

  // 3. Render dinámico del constructor por categorías
  function renderBuilder() {
    const container = $("#builderForm");
    if (!container) return;
    container.innerHTML = "";

    // Selector de modelo
    renderModelSelector(container, state, (selectedModel) => {
      persistState(state);
      if (editorController) editorController.regenerate();
      toast(`Modelo «${selectedModel.name}» seleccionado.`);
    });

    // Sub-constructor por categoría
    switch (state.category) {
      case "image":
        renderImageBuilder(container, state, onFormUpdate);
        break;
      case "video":
        renderVideoBuilder(container, state, onFormUpdate);
        break;
      case "text":
        renderTextBuilder(container, state, onFormUpdate);
        break;
      case "code":
        renderCodeBuilder(container, state, onFormUpdate);
        break;
      default:
        renderImageBuilder(container, state, onFormUpdate);
    }
  }

  // 4. Inicializar Editor de Prompts
  editorController = initPromptEditor(state, {
    onStateChange: () => persistState(state),
    onReset: () => {
      state = resetState();
      renderBuilder();
      syncCategoryTabs(state.category);
      const editor = $("#promptEditor");
      if (editor) editor.value = "";
      if (editorController) {
        editorController.updateMeta();
        editorController.regenerate();
      }
    }
  });

  // 5. Cargar borrador local en el estado
  function loadDraftIntoState(draft) {
    state.category = draft.category || state.category;
    if (draft.fields) state.fields[draft.category] = { ...draft.fields };
    state.language = draft.language || state.language;
    state.models[draft.category] = draft.model || state.models[draft.category];
    state.manualPrompt = draft.prompt || "";
    state.dirty = Boolean(draft.prompt);

    persistState(state);
    syncCategoryTabs(state.category);
    renderBuilder();
    const editor = $("#promptEditor");
    if (editor) editor.value = draft.prompt || generatePrompt(state);
    if (editorController) {
      editorController.updateMeta();
      editorController.regenerate();
    }

    const constructorEl = document.getElementById("constructor");
    if (constructorEl) constructorEl.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  // 6. Aplicar plantilla en el constructor
  function applyTemplate(tpl) {
    state.category = tpl.cat;
    Object.assign(state.fields[tpl.cat], tpl.data);
    state.dirty = false;
    state.manualPrompt = "";
    persistState(state);
    syncCategoryTabs(state.category);
    renderBuilder();
    if (editorController) editorController.regenerate();
    toast(`Plantilla «${tpl.title}» cargada en el constructor.`);

    const constructorEl = document.getElementById("constructor");
    if (constructorEl) constructorEl.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  // 7. Modales y Borradores
  initModals((modalId) => {
    if (modalId === "borradores") {
      renderSavedDrafts(loadDraftIntoState);
    }
  });

  const clearAllDraftsBtn = $("#clearAllDraftsBtn");
  if (clearAllDraftsBtn) {
    clearAllDraftsBtn.addEventListener("click", () => {
      if (!confirm("¿Deseas eliminar todos los borradores locales guardados?")) return;
      clearAllDrafts();
      renderSavedDrafts(loadDraftIntoState);
      toast("Todos los borradores han sido eliminados.");
    });
  }

  // 8. Navegación, tabs y barra flotante móvil
  initNavigation({
    onCategoryChange: (cat) => {
      state.category = cat;
      state.dirty = false;
      persistState(state);
      renderBuilder();
      if (editorController) editorController.regenerate();
    },
    onCopy: () => {
      if (editorController) editorController.copyPrompt();
    },
    onRegenerate: () => {
      state.dirty = false;
      if (editorController) editorController.regenerate();
      toast("Prompt regenerado desde las opciones visuales.");
    }
  });

  // 9. Inicializar plantillas y catálogo de modelos
  initTemplatesView($("#templatesGrid"), applyTemplate);
  renderModelCatalog($("#modelsGrid"));

  // 10. Módulo "Mejorar mi prompt"
  initImprovePrompt(state, (optimizedText) => {
    const editor = $("#promptEditor");
    if (editor) editor.value = optimizedText;
    state.dirty = true;
    state.manualPrompt = optimizedText;
    if (editorController) {
      editorController.updateMeta();
    }
    persistState(state);
  });

  // 11. Render inicial
  syncCategoryTabs(state.category);
  renderBuilder();

  const editor = $("#promptEditor");
  if (editor) {
    if (state.manualPrompt) {
      editor.value = state.manualPrompt;
    } else {
      editorController.regenerate();
    }
  }
  if (editorController) {
    editorController.updateMeta();
  }
});
