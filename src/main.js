/**
 * PromptMax — Controlador principal de interfaz de usuario
 * Cumple con Skill.md Secciones 5, 11, 14, 15, 16, 20, 23.
 */

import { OPTS } from "./data/options.js";
import { MODEL_PROFILES, CATALOG_MODELS_GRID } from "./data/models.js";
import { TEMPLATES } from "./data/templates.js";
import { generatePrompt } from "./core/prompt-engine.js";
import { analyzePrompt } from "./core/validation.js";
import { improvePrompt } from "./core/optimization.js";
import {
  STORAGE_KEYS,
  initialState,
  loadStoredState,
  persistState,
  clearAllLocalData,
  sanitizeFilename,
  createExportPayload,
  safeGet,
  safeSet
} from "./core/storage.js";

// Utilidades DOM
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];

function escapeHtml(str) {
  return String(str || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function toast(msg) {
  const el = $("#toast");
  if (!el) return;
  el.textContent = msg;
  el.setAttribute("data-visible", "");
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => el.removeAttribute("data-visible"), 3200);
}

function downloadText(text, filename, mime = "text/plain") {
  const blob = new Blob([text], { type: `${mime};charset=utf-8` });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

// Estado de la aplicación
let state = loadStoredState();
const undoStack = [];
const redoStack = [];

// ============================================================
// Tema (Claro / Oscuro)
// ============================================================
function applyTheme(t) {
  document.documentElement.setAttribute("data-theme", t);
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute("content", t === "light" ? "#f6f7fb" : "#0b0d12");
  const icon = $("#themeIcon");
  if (icon) {
    icon.innerHTML =
      t === "light"
        ? `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`
        : `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;
  }
}

function initTheme() {
  const stored = safeGet(STORAGE_KEYS.theme);
  const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
  applyTheme(stored || (prefersLight ? "light" : "dark"));

  const toggle = $("#themeToggle");
  if (toggle) {
    toggle.addEventListener("click", () => {
      const current = document.documentElement.getAttribute("data-theme") || "dark";
      const next = current === "light" ? "dark" : "light";
      applyTheme(next);
      safeSet(STORAGE_KEYS.theme, next);
      toast(`Tema ${next === "light" ? "claro" : "oscuro"} activado`);
    });
  }
}

// ============================================================
// Modales y Cookies
// ============================================================
function initConsent() {
  const c = safeGet(STORAGE_KEYS.consent);
  const banner = $("#cookieBanner");
  if (!banner) return;
  if (!c) banner.setAttribute("data-visible", "");

  const accept = $("#cookieAccept");
  const reject = $("#cookieReject");
  if (accept) {
    accept.addEventListener("click", () => {
      safeSet(STORAGE_KEYS.consent, "accepted");
      banner.removeAttribute("data-visible");
      toast("Preferencias guardadas.");
    });
  }
  if (reject) {
    reject.addEventListener("click", () => {
      safeSet(STORAGE_KEYS.consent, "rejected");
      banner.removeAttribute("data-visible");
      toast("Cookies no esenciales rechazadas.");
    });
  }
  const openBtn = $("#openConsent");
  if (openBtn) {
    openBtn.addEventListener("click", (e) => {
      e.preventDefault();
      banner.setAttribute("data-visible", "");
    });
  }
}

function initModals() {
  $$("[data-modal]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const id = btn.dataset.modal;
      const dlg = $(`#modal-${id}`);
      if (dlg && typeof dlg.showModal === "function") dlg.showModal();
    });
  });

  $$(".modal").forEach((dlg) => {
    dlg.addEventListener("click", (e) => {
      if (e.target === dlg) dlg.close();
    });
    const closeBtn = dlg.querySelector("[data-close]");
    if (closeBtn) {
      closeBtn.addEventListener("click", () => dlg.close());
    }
  });
}

// ============================================================
// Componentes del Formulario Constructor
// ============================================================
function renderField({ id, label, kind = "text", value, placeholder, hint, options, onInput, rows = 3 }) {
  const wrap = document.createElement("div");
  wrap.className = "field";

  const l = document.createElement("label");
  l.setAttribute("for", id);
  l.className = "field-label";
  l.textContent = label;
  wrap.appendChild(l);

  let input;
  if (kind === "textarea") {
    input = document.createElement("textarea");
    input.rows = rows;
    input.className = "textarea";
    input.value = value || "";
    input.placeholder = placeholder || "";
    input.addEventListener("input", (e) => onInput(e.target.value));
  } else if (kind === "select") {
    input = document.createElement("select");
    input.className = "select";
    const blank = document.createElement("option");
    blank.value = "";
    blank.textContent = "— Selecciona una opción —";
    input.appendChild(blank);
    (options || []).forEach((o) => {
      const opt = document.createElement("option");
      opt.value = typeof o === "string" ? o : o.v;
      opt.textContent = typeof o === "string" ? o : o.l;
      if (opt.value === value) opt.selected = true;
      input.appendChild(opt);
    });
    input.addEventListener("change", (e) => onInput(e.target.value));
  } else {
    input = document.createElement("input");
    input.type = "text";
    input.className = "input";
    input.value = value || "";
    input.placeholder = placeholder || "";
    input.addEventListener("input", (e) => onInput(e.target.value));
  }

  input.id = id;
  wrap.appendChild(input);

  if (hint) {
    const h = document.createElement("p");
    h.className = "hint";
    h.textContent = hint;
    wrap.appendChild(h);
  }
  return wrap;
}

function renderChips({ label, value, options, onChange, multi = false, hint }) {
  const wrap = document.createElement("div");
  wrap.className = "field";

  const l = document.createElement("div");
  l.className = "field-label";
  l.textContent = label;
  wrap.appendChild(l);

  const chips = document.createElement("div");
  chips.className = "chips";

  options.forEach((opt) => {
    const v = typeof opt === "string" ? opt : opt.v;
    const labelText = typeof opt === "string" ? opt : opt.l;
    const b = document.createElement("button");
    b.type = "button";
    b.className = "chip";
    b.dataset.value = v;

    const isSel = multi
      ? Array.isArray(value) && value.includes(v)
      : value === v;

    b.setAttribute("aria-pressed", isSel ? "true" : "false");
    b.textContent = labelText;

    b.addEventListener("click", () => {
      let newVal;
      if (multi) {
        const current = [...chips.querySelectorAll('.chip[aria-pressed="true"]')].map(
          (c) => c.dataset.value
        );
        newVal = current.includes(v)
          ? current.filter((x) => x !== v)
          : [...current, v];
      } else {
        const current = chips.querySelector('.chip[aria-pressed="true"]')?.dataset.value;
        newVal = current === v ? "" : v;
      }
      onChange(newVal);

      chips.querySelectorAll(".chip").forEach((c) => {
        const cv = c.dataset.value;
        const sel = multi
          ? Array.isArray(newVal) && newVal.includes(cv)
          : newVal === cv;
        c.setAttribute("aria-pressed", sel ? "true" : "false");
      });
    });

    chips.appendChild(b);
  });

  wrap.appendChild(chips);
  if (hint) {
    const h = document.createElement("p");
    h.className = "hint";
    h.textContent = hint;
    wrap.appendChild(h);
  }
  return wrap;
}

function renderAccordion({ title, open = false, children }) {
  const acc = document.createElement("details");
  acc.className = "acc";
  if (open) acc.open = true;

  const head = document.createElement("summary");
  head.className = "acc-head";
  head.innerHTML = `<span>${escapeHtml(title)}</span>
    <svg class="chev" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>`;
  acc.appendChild(head);

  const body = document.createElement("div");
  body.className = "acc-body";
  children.forEach((c) => body.appendChild(c));
  acc.appendChild(body);
  return acc;
}

// ============================================================
// Render del Formulario Dinámico
// ============================================================
function renderBuilder() {
  const c = $("#builderForm");
  if (!c) return;
  c.innerHTML = "";

  const cat = state.category;
  const f = state.fields[cat];

  // Selector de modelo
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
      persistState(state);
      regenerate();
      toast(`Modelo «${m.name}» seleccionado.`);
    });
    grid.appendChild(b);
  });
  modelSection.appendChild(grid);
  c.appendChild(modelSection);

  // Formularios según categoría
  if (cat === "image") {
    c.appendChild(
      renderAccordion({
        title: "Sujeto y escena",
        open: true,
        children: [
          renderField({
            id: "img-subject",
            label: "Sujeto principal",
            value: f.subject,
            placeholder: "persona, personaje, animal, producto, edificio…",
            onInput: (v) => { f.subject = v; persistState(state); regenerate(); }
          }),
          renderField({
            id: "img-subjectCount",
            label: "Cantidad de sujetos",
            value: f.subjectCount,
            placeholder: "1, 2, grupo, multitud…",
            onInput: (v) => { f.subjectCount = v; persistState(state); regenerate(); }
          }),
          renderField({
            id: "img-appearance",
            label: "Apariencia, rasgos y vestimenta",
            value: f.appearance,
            placeholder: "edad aparente, ropa, expresión facial, accesorios…",
            onInput: (v) => { f.appearance = v; persistState(state); regenerate(); }
          }),
          renderField({
            id: "img-action",
            label: "Acción o pose",
            value: f.action,
            placeholder: "qué está haciendo el sujeto",
            onInput: (v) => { f.action = v; persistState(state); regenerate(); }
          }),
          renderField({
            id: "img-setting",
            label: "Escenario o localización",
            value: f.setting,
            placeholder: "dónde sucede la escena",
            onInput: (v) => { f.setting = v; persistState(state); regenerate(); }
          }),
          renderField({
            id: "img-era",
            label: "Época y contexto temporal",
            value: f.era,
            placeholder: "medieval, cyberpunk 2077, años 80, futuro distante…",
            onInput: (v) => { f.era = v; persistState(state); regenerate(); }
          }),
          renderField({
            id: "img-background",
            label: "Fondo y entorno",
            value: f.background,
            placeholder: "paisaje montañoso, estudio neutro, calle lluviosa…",
            onInput: (v) => { f.background = v; persistState(state); regenerate(); }
          }),
          renderField({
            id: "img-relationship",
            label: "Relación y distancia entre elementos",
            value: f.relationship,
            placeholder: "sujeto en primer plano interactuando con el fondo…",
            onInput: (v) => { f.relationship = v; persistState(state); regenerate(); }
          })
        ]
      })
    );

    c.appendChild(
      renderAccordion({
        title: "Estilo visual",
        children: [
          renderChips({
            label: "Estilo principal",
            value: f.style,
            options: OPTS.style,
            onChange: (v) => { f.style = v; persistState(state); regenerate(); }
          }),
          renderField({
            id: "img-styleIntensity",
            label: "Intensidad estilística (opcional)",
            value: f.styleIntensity,
            placeholder: "sutil, marcado, extremo…",
            onInput: (v) => { f.styleIntensity = v; persistState(state); regenerate(); }
          })
        ]
      })
    );

    c.appendChild(
      renderAccordion({
        title: "Cámara y encuadre",
        children: [
          renderChips({
            label: "Plano / Encuadre",
            value: f.shot,
            options: OPTS.shot,
            onChange: (v) => { f.shot = v; persistState(state); regenerate(); }
          }),
          renderField({
            id: "img-angle",
            label: "Ángulo de cámara",
            value: f.angle,
            placeholder: "a nivel de ojos, contrapicado sutil, cenital…",
            onInput: (v) => { f.angle = v; persistState(state); regenerate(); }
          })
        ]
      })
    );

    c.appendChild(
      renderAccordion({
        title: "Lente y perspectiva",
        children: [
          renderChips({
            label: "Lente objetivo",
            value: f.lens,
            options: OPTS.lens,
            onChange: (v) => { f.lens = v; persistState(state); regenerate(); }
          }),
          renderChips({
            label: "Profundidad de campo y desenfoque",
            value: f.dof,
            options: OPTS.dof,
            onChange: (v) => { f.dof = v; persistState(state); regenerate(); }
          })
        ]
      })
    );

    c.appendChild(
      renderAccordion({
        title: "Iluminación",
        children: [
          renderChips({
            label: "Tipo de luz",
            value: f.lighting,
            options: OPTS.lighting,
            onChange: (v) => { f.lighting = v; persistState(state); regenerate(); }
          })
        ]
      })
    );

    c.appendChild(
      renderAccordion({
        title: "Composición",
        children: [
          renderChips({
            label: "Regla de composición",
            value: f.composition,
            options: OPTS.composition,
            onChange: (v) => { f.composition = v; persistState(state); regenerate(); }
          })
        ]
      })
    );

    c.appendChild(
      renderAccordion({
        title: "Color y atmósfera",
        children: [
          renderChips({
            label: "Paleta cromática",
            value: f.color,
            options: OPTS.color,
            onChange: (v) => { f.color = v; persistState(state); regenerate(); }
          }),
          renderChips({
            label: "Atmósfera / Estado de ánimo",
            value: f.atmosphere,
            options: OPTS.atmosphere,
            onChange: (v) => { f.atmosphere = v; persistState(state); regenerate(); }
          })
        ]
      })
    );

    c.appendChild(
      renderAccordion({
        title: "Materiales, detalle y acabado",
        children: [
          renderField({
            id: "img-materials",
            label: "Materiales y texturas",
            value: f.materials,
            placeholder: "madera noble, seda, cristal reflectante, metal oxidado…",
            onInput: (v) => { f.materials = v; persistState(state); regenerate(); }
          }),
          renderField({
            id: "img-detail",
            label: "Nivel de microdetalle",
            value: f.detail,
            placeholder: "microdetalle facial, gotas de rocío, polvo atmosférico…",
            onInput: (v) => { f.detail = v; persistState(state); regenerate(); }
          }),
          renderField({
            id: "img-quality",
            label: "Acabado final",
            value: f.quality,
            placeholder: "fotográfico 35mm, render editorial, portada de revista…",
            onInput: (v) => { f.quality = v; persistState(state); regenerate(); }
          })
        ]
      })
    );

    c.appendChild(
      renderAccordion({
        title: "Formato y exclusiones",
        children: [
          renderChips({
            label: "Relación de aspecto",
            value: f.aspect,
            options: OPTS.aspect,
            onChange: (v) => { f.aspect = v; persistState(state); regenerate(); }
          }),
          renderField({
            id: "img-inImageText",
            label: "Texto visible en la imagen (ideal para FLUX / SDXL)",
            value: f.inImageText,
            placeholder: "Palabra o frase que debe aparecer escrita en la imagen",
            onInput: (v) => { f.inImageText = v; persistState(state); regenerate(); }
          }),
          renderField({
            id: "img-references",
            label: "Referencias visuales / Consistencia",
            value: f.references,
            placeholder: "Instrucciones de consistencia de personaje o estilo",
            onInput: (v) => { f.references = v; persistState(state); regenerate(); }
          }),
          renderField({
            id: "img-avoid",
            label: "Elementos a evitar (Negative prompt / --no)",
            value: f.avoid,
            kind: "textarea",
            placeholder: "deformidades, artefactos, piel plástica, baja resolución…",
            onInput: (v) => { f.avoid = v; persistState(state); regenerate(); }
          })
        ]
      })
    );
  } else if (cat === "video") {
    c.appendChild(
      renderAccordion({
        title: "Concepto y escena",
        open: true,
        children: [
          renderField({
            id: "vid-concept",
            label: "Concepto general del video",
            value: f.concept,
            placeholder: "Presentación comercial, escena dramática, documental natural…",
            onInput: (v) => { f.concept = v; persistState(state); regenerate(); }
          }),
          renderField({
            id: "vid-initialScene",
            label: "Escena o fotograma inicial",
            value: f.initialScene,
            kind: "textarea",
            placeholder: "Cómo inicia el primer fotograma de la toma",
            onInput: (v) => { f.initialScene = v; persistState(state); regenerate(); }
          }),
          renderField({
            id: "vid-action",
            label: "Acción principal y movimiento",
            value: f.action,
            kind: "textarea",
            placeholder: "Qué sucede a lo largo de la toma",
            onInput: (v) => { f.action = v; persistState(state); regenerate(); }
          }),
          renderField({
            id: "vid-sequence",
            label: "Secuencia temporal",
            value: f.sequence,
            kind: "textarea",
            placeholder: "Planteamiento → desarrollo → desenlace",
            onInput: (v) => { f.sequence = v; persistState(state); regenerate(); }
          })
        ]
      })
    );

    c.appendChild(
      renderAccordion({
        title: "Cámara y movimiento",
        children: [
          renderChips({
            label: "Movimiento de cámara",
            value: f.cameraMotion,
            options: OPTS.cameraMotion,
            onChange: (v) => { f.cameraMotion = v; persistState(state); regenerate(); }
          }),
          renderField({
            id: "vid-speed",
            label: "Velocidad y ritmo",
            value: f.speed,
            placeholder: "movimiento fluido, cámara lenta (slow-mo), travelling acelerado…",
            onInput: (v) => { f.speed = v; persistState(state); regenerate(); }
          }),
          renderField({
            id: "vid-transitions",
            label: "Transiciones",
            value: f.transitions,
            placeholder: "corte directo, disolución suave, barrido…",
            onInput: (v) => { f.transitions = v; persistState(state); regenerate(); }
          })
        ]
      })
    );

    c.appendChild(
      renderAccordion({
        title: "Estilo y atmósfera",
        children: [
          renderChips({
            label: "Estilo",
            value: f.style,
            options: OPTS.style,
            onChange: (v) => { f.style = v; persistState(state); regenerate(); }
          }),
          renderChips({
            label: "Iluminación",
            value: f.lighting,
            options: OPTS.lighting,
            onChange: (v) => { f.lighting = v; persistState(state); regenerate(); }
          }),
          renderChips({
            label: "Atmósfera",
            value: f.atmosphere,
            options: OPTS.atmosphere,
            onChange: (v) => { f.atmosphere = v; persistState(state); regenerate(); }
          })
        ]
      })
    );

    c.appendChild(
      renderAccordion({
        title: "Audio y diálogos",
        children: [
          renderField({
            id: "vid-sound",
            label: "Sonido ambiente",
            value: f.sound,
            placeholder: "viento silbando, murmullo urbano, olas rompiendo…",
            onInput: (v) => { f.sound = v; persistState(state); regenerate(); }
          }),
          renderField({
            id: "vid-dialogue",
            label: "Línea de diálogo hablada (si aplica)",
            value: f.dialogue,
            kind: "textarea",
            placeholder: "Frase exacta que el sujeto pronuncia",
            onInput: (v) => { f.dialogue = v; persistState(state); regenerate(); }
          }),
          renderField({
            id: "vid-language",
            label: "Idioma del diálogo",
            value: f.language,
            placeholder: "español neutro, inglés americano…",
            onInput: (v) => { f.language = v; persistState(state); regenerate(); }
          })
        ]
      })
    );

    c.appendChild(
      renderAccordion({
        title: "Continuidad, duración y clips",
        children: [
          renderField({
            id: "vid-duration",
            label: "Duración deseada",
            value: f.duration,
            placeholder: "5s, 10s, 3 clips de 5s…",
            onInput: (v) => { f.duration = v; persistState(state); regenerate(); }
          }),
          renderChips({
            label: "Relación de aspecto",
            value: f.aspect,
            options: OPTS.aspect,
            onChange: (v) => { f.aspect = v; persistState(state); regenerate(); }
          }),
          renderField({
            id: "vid-continuity",
            label: "Reglas de continuidad estricta",
            value: f.continuity,
            kind: "textarea",
            placeholder: "Conservar misma vestimenta, iluminación y rasgos faciales entre tomas",
            onInput: (v) => { f.continuity = v; persistState(state); regenerate(); }
          }),
          renderField({
            id: "vid-avoid",
            label: "Elementos a evitar",
            value: f.avoid,
            kind: "textarea",
            placeholder: "movimientos erráticos de cámara, saltos temporales, deformaciones",
            onInput: (v) => { f.avoid = v; persistState(state); regenerate(); }
          })
        ]
      })
    );
  } else if (cat === "text") {
    c.appendChild(
      renderAccordion({
        title: "Rol y objetivo",
        open: true,
        children: [
          renderField({
            id: "txt-role",
            label: "Rol o especialidad",
            value: f.role,
            placeholder: "Redactor SEO senior, Investigador biomédico, Consultor de marketing…",
            onInput: (v) => { f.role = v; persistState(state); regenerate(); }
          }),
          renderField({
            id: "txt-objective",
            label: "Objetivo principal",
            value: f.objective,
            kind: "textarea",
            placeholder: "Qué debe lograr exactamente la respuesta de la IA",
            onInput: (v) => { f.objective = v; persistState(state); regenerate(); }
          }),
          renderField({
            id: "txt-context",
            label: "Contexto del proyecto",
            value: f.context,
            kind: "textarea",
            placeholder: "Antecedentes, situación actual o información de base",
            onInput: (v) => { f.context = v; persistState(state); regenerate(); }
          }),
          renderField({
            id: "txt-audience",
            label: "Audiencia objetivo",
            value: f.audience,
            placeholder: "Principiantes, directores ejecutivos, técnicos especialistas…",
            onInput: (v) => { f.audience = v; persistState(state); regenerate(); }
          })
        ]
      })
    );

    c.appendChild(
      renderAccordion({
        title: "Tarea e instrucciones específicas",
        children: [
          renderField({
            id: "txt-input",
            label: "Datos o texto de entrada",
            value: f.input,
            kind: "textarea",
            placeholder: "Pega aquí el material de trabajo o la información a procesar",
            onInput: (v) => { f.input = v; persistState(state); regenerate(); }
          }),
          renderField({
            id: "txt-instructions",
            label: "Instrucciones paso a paso (Tarea)",
            value: f.instructions,
            kind: "textarea",
            placeholder: "Pasos secuenciales que el modelo debe seguir",
            onInput: (v) => { f.instructions = v; persistState(state); regenerate(); }
          }),
          renderField({
            id: "txt-methodology",
            label: "Metodología de trabajo",
            value: f.methodology,
            kind: "textarea",
            placeholder: "Análisis FODA, razonamiento paso a paso (Chain of Thought), etc.",
            onInput: (v) => { f.methodology = v; persistState(state); regenerate(); }
          })
        ]
      })
    );

    c.appendChild(
      renderAccordion({
        title: "Tono, restricciones y validación",
        children: [
          renderChips({
            label: "Tono de comunicación",
            value: f.tone,
            options: OPTS.textTone,
            onChange: (v) => { f.tone = v; persistState(state); regenerate(); }
          }),
          renderField({
            id: "txt-depth",
            label: "Nivel de profundidad",
            value: f.depth,
            placeholder: "resumen ejecutivo, análisis detallado, estudio exhaustivo…",
            onInput: (v) => { f.depth = v; persistState(state); regenerate(); }
          }),
          renderField({
            id: "txt-outputFormat",
            label: "Formato de salida",
            value: f.outputFormat,
            kind: "textarea",
            placeholder: "Markdown con H2 y listas, tabla comparativa, JSON válido…",
            onInput: (v) => { f.outputFormat = v; persistState(state); regenerate(); }
          }),
          renderField({
            id: "txt-noInvent",
            label: "Instrucción de no invención (anclaje fáctico)",
            value: f.noInvent,
            kind: "textarea",
            placeholder: "No inventar datos, fuentes, nombres ni estadísticas inexistentes",
            onInput: (v) => { f.noInvent = v; persistState(state); regenerate(); }
          }),
          renderField({
            id: "txt-citations",
            label: "Requisitos de citas y fuentes",
            value: f.citations,
            placeholder: "Citar fuentes verificables y literatura científica",
            onInput: (v) => { f.citations = v; persistState(state); regenerate(); }
          }),
          renderField({
            id: "txt-avoid",
            label: "Elementos a evitar",
            value: f.avoid,
            kind: "textarea",
            placeholder: "relleno, frases vacías, sesgos, suposiciones sin base",
            onInput: (v) => { f.avoid = v; persistState(state); regenerate(); }
          })
        ]
      })
    );
  } else if (cat === "code") {
    c.appendChild(
      renderAccordion({
        title: "Tarea y problema de software",
        open: true,
        children: [
          renderField({
            id: "code-taskType",
            label: "Tipo de tarea",
            kind: "select",
            value: f.taskType,
            options: OPTS.codeTaskType,
            onInput: (v) => { f.taskType = v; persistState(state); regenerate(); }
          }),
          renderField({
            id: "code-projectName",
            label: "Nombre del proyecto",
            value: f.projectName,
            placeholder: "MiProyectoApp",
            onInput: (v) => { f.projectName = v; persistState(state); regenerate(); }
          }),
          renderField({
            id: "code-problem",
            label: "Problema que debe resolver",
            value: f.problem,
            kind: "textarea",
            placeholder: "Describe la necesidad técnica o el error a solucionar",
            onInput: (v) => { f.problem = v; persistState(state); regenerate(); }
          }),
          renderField({
            id: "code-appType",
            label: "Tipo de aplicación",
            value: f.appType,
            placeholder: "Single Page Application (SPA), API REST, CLI, librería…",
            onInput: (v) => { f.appType = v; persistState(state); regenerate(); }
          })
        ]
      })
    );

    c.appendChild(
      renderAccordion({
        title: "Stack y arquitectura",
        children: [
          renderField({
            id: "code-stack",
            label: "Stack tecnológico",
            value: f.stack,
            placeholder: "TypeScript, Vite, React, Vitest, CSS nativo…",
            onInput: (v) => { f.stack = v; persistState(state); regenerate(); }
          }),
          renderField({
            id: "code-architecture",
            label: "Arquitectura y patrones",
            value: f.architecture,
            kind: "textarea",
            placeholder: "Modular por funcionalidades, Clean Architecture, Serverless…",
            onInput: (v) => { f.architecture = v; persistState(state); regenerate(); }
          }),
          renderField({
            id: "code-folderStructure",
            label: "Estructura de carpetas recomendada",
            value: f.folderStructure,
            kind: "textarea",
            placeholder: "src/core, src/components, src/data, src/tests…",
            onInput: (v) => { f.folderStructure = v; persistState(state); regenerate(); }
          })
        ]
      })
    );

    c.appendChild(
      renderAccordion({
        title: "Funcionalidades y calidad",
        children: [
          renderField({
            id: "code-mustFeatures",
            label: "Funcionalidades obligatorias",
            value: f.mustFeatures,
            kind: "textarea",
            placeholder: "1. Autenticación JWT\n2. CRUD de productos\n3. Exportación a CSV",
            onInput: (v) => { f.mustFeatures = v; persistState(state); regenerate(); }
          }),
          renderField({
            id: "code-optionalFeatures",
            label: "Funcionalidades opcionales",
            value: f.optionalFeatures,
            kind: "textarea",
            placeholder: "Modo oscuro automático, filtros avanzados…",
            onInput: (v) => { f.optionalFeatures = v; persistState(state); regenerate(); }
          }),
          renderField({
            id: "code-security",
            label: "Seguridad y prevención",
            value: f.security,
            placeholder: "Sanitización de inputs, prevención XSS, cabeceras CORS, sin eval()",
            onInput: (v) => { f.security = v; persistState(state); regenerate(); }
          }),
          renderField({
            id: "code-tests",
            label: "Estrategia de pruebas automatizadas",
            value: f.tests,
            kind: "textarea",
            placeholder: "Pruebas unitarias con Vitest y E2E con Playwright",
            onInput: (v) => { f.tests = v; persistState(state); regenerate(); }
          })
        ]
      })
    );

    c.appendChild(
      renderAccordion({
        title: "Criterios de aceptación y entrega",
        children: [
          renderField({
            id: "code-acceptance",
            label: "Criterios de aceptación verificables",
            value: f.acceptance,
            kind: "textarea",
            placeholder: "Build pasa sin errores, tests 100% verdes, cero warnings en consola",
            onInput: (v) => { f.acceptance = v; persistState(state); regenerate(); }
          }),
          renderField({
            id: "code-deliverables",
            label: "Entregables esperados",
            value: f.deliverables,
            placeholder: "Código limpio, tests, archivo README con guía de instalación",
            onInput: (v) => { f.deliverables = v; persistState(state); regenerate(); }
          }),
          renderField({
            id: "code-constraints",
            label: "Restricciones técnicas",
            value: f.constraints,
            kind: "textarea",
            placeholder: "No usar dependencias pesadas innecesarias, mantener compatibilidad",
            onInput: (v) => { f.constraints = v; persistState(state); regenerate(); }
          }),
          renderField({
            id: "code-avoid",
            label: "Prácticas a evitar",
            value: f.avoid,
            kind: "textarea",
            placeholder: "código espagueti, librerías abandonadas, mutaciones globales",
            onInput: (v) => { f.avoid = v; persistState(state); regenerate(); }
          })
        ]
      })
    );
  }
}

// ============================================================
// Regenerar y Análisis
// ============================================================
function regenerate() {
  const generated = generatePrompt(state);
  const editor = $("#promptEditor");

  if (!state.dirty && editor) {
    editor.value = generated;
    state.manualPrompt = generated;
  }
  updateMeta();
  renderAnalysis();
  persistState(state);
}

function updateMeta() {
  const editor = $("#promptEditor");
  if (!editor) return;
  const v = editor.value;
  const chars = v.length;
  const words = v.trim() ? v.trim().split(/\s+/).length : 0;

  const charEl = $("#charCount");
  if (charEl) charEl.textContent = `${chars} caracteres · ${words} palabras`;

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

function renderAnalysis() {
  const editor = $("#promptEditor");
  const c = $("#analysisList");
  if (!editor || !c) return;

  const items = analyzePrompt(editor.value, state);
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

// ============================================================
// Biblioteca de Plantillas con Filtro y Búsqueda (Skill.md 13, 16)
// ============================================================
let activeTplFilter = "all";
let tplSearchQuery = "";

function renderTemplates() {
  const c = $("#templatesGrid");
  if (!c) return;
  c.innerHTML = "";

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
    c.innerHTML = `<div style="grid-column: 1/-1; padding: 2rem; text-align: center; color: var(--text-dim);">No se encontraron plantillas que coincidan con la búsqueda.</div>`;
    return;
  }

  filtered.forEach((tpl) => {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "tpl-card";
    card.innerHTML = `<span class="tag">${escapeHtml(catLabel[tpl.cat] || tpl.cat)}</span><span class="title">${escapeHtml(tpl.title)}</span><span class="desc">${escapeHtml(tpl.desc)}</span>`;
    card.addEventListener("click", () => applyTemplate(tpl));
    c.appendChild(card);
  });
}

function applyTemplate(tpl) {
  state.category = tpl.cat;
  Object.assign(state.fields[tpl.cat], tpl.data);
  state.dirty = false;
  state.manualPrompt = "";
  persistState(state);
  syncCategoryTabs();
  renderBuilder();
  regenerate();
  toast(`Plantilla «${tpl.title}» cargada en el constructor.`);

  const constructorEl = document.getElementById("constructor");
  if (constructorEl) {
    constructorEl.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

// ============================================================
// Catálogo de Modelos (Grid inferior)
// ============================================================
function renderModelCatalog() {
  const grid = $("#modelsGrid");
  if (!grid) return;
  grid.innerHTML = "";

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
    grid.appendChild(card);
  });
}

// ============================================================
// Sincronización de Pestañas de Categoría
// ============================================================
function syncCategoryTabs() {
  $$(".cat-tab").forEach((tab) => {
    const isSel = tab.dataset.cat === state.category;
    tab.setAttribute("aria-pressed", isSel ? "true" : "false");
  });
}

// ============================================================
// Event Listeners y Productividad (Skill.md Sección 16)
// ============================================================
function bindEvents() {
  // Tabs de categoría
  $$(".cat-tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      state.category = tab.dataset.cat;
      state.dirty = false;
      persistState(state);
      syncCategoryTabs();
      renderBuilder();
      regenerate();
    });
  });

  // Editor manual con pila de deshacer
  const editor = $("#promptEditor");
  if (editor) {
    editor.addEventListener("input", (e) => {
      undoStack.push(state.manualPrompt || editor.value);
      if (undoStack.length > 30) undoStack.shift();
      state.dirty = true;
      state.manualPrompt = e.target.value;
      updateMeta();
      renderAnalysis();
      persistState(state);
    });
  }

  // Botón Regenerar
  const regenBtn = $("#regenBtn");
  if (regenBtn) {
    regenBtn.addEventListener("click", () => {
      state.dirty = false;
      regenerate();
      toast("Prompt regenerado desde las opciones visuales.");
    });
  }

  // Botón Copiar
  const copyBtn = $("#copyBtn");
  if (copyBtn) {
    copyBtn.addEventListener("click", async () => {
      const v = editor ? editor.value : "";
      if (!v.trim()) {
        toast("No hay prompt para copiar.");
        return;
      }
      try {
        await navigator.clipboard.writeText(v);
        toast("Prompt copiado al portapapeles.");
      } catch {
        editor.select();
        try {
          document.execCommand("copy");
          toast("Prompt copiado.");
        } catch {
          toast("No se pudo copiar.");
        }
      }
    });
  }

  // Botón Descargar TXT
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

  // Botón Descargar Markdown (.md) - Skill.md Sección 16
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

  // Botón Exportar JSON
  const exportJsonBtn = $("#exportJsonBtn");
  if (exportJsonBtn) {
    exportJsonBtn.addEventListener("click", () => {
      const v = editor ? editor.value : "";
      const payload = createExportPayload(state, v);
      downloadText(JSON.stringify(payload, null, 2), `promptmax-${state.category}.json`, "application/json");
      toast("Configuración exportada en JSON.");
    });
  }

  // Botón Imprimir
  const printBtn = $("#printBtn");
  if (printBtn) {
    printBtn.addEventListener("click", () => {
      window.print();
    });
  }

  // Botón Limpiar / Reiniciar
  const clearBtn = $("#clearBtn");
  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      if (!confirm("¿Deseas reiniciar todos los campos y el prompt generado?")) return;
      state = initialState();
      clearAllLocalData();
      renderBuilder();
      syncCategoryTabs();
      if (editor) editor.value = "";
      updateMeta();
      renderAnalysis();
      toast("Formulario y datos locales limpiados.");
    });
  }

  // Botón Cambiar Idioma de salida (ES / EN)
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

  // Multi-clip toggle para video (Skill.md Sección 7)
  const clipToggleBtn = $("#clipToggleBtn");
  if (clipToggleBtn) {
    clipToggleBtn.addEventListener("click", () => {
      const cur = Boolean(state.fields.video._multiClip);
      state.fields.video._multiClip = !cur;
      clipToggleBtn.setAttribute("aria-pressed", (!cur).toString());
      state.dirty = false;
      persistState(state);
      regenerate();
      toast(!cur ? "Modo división en clips de video activado." : "Modo clip único activado.");
    });
  }

  // Sección "Mejorar mi prompt" (Skill.md Sección 15)
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
      if (editor) editor.value = v;
      state.dirty = true;
      state.manualPrompt = v;
      updateMeta();
      persistState(state);

      const constructorEl = document.getElementById("constructor");
      if (constructorEl) {
        constructorEl.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      toast("Prompt optimizado cargado en el editor.");
    });
  }

  // Filtros de plantillas por categoría
  $$(".tpl-filter-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      $$(".tpl-filter-btn").forEach((b) => b.setAttribute("aria-pressed", "false"));
      btn.setAttribute("aria-pressed", "true");
      activeTplFilter = btn.dataset.catFilter || "all";
      renderTemplates();
    });
  });

  // Búsqueda en plantillas
  const searchInput = $("#tplSearchInput");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      tplSearchQuery = e.target.value.trim();
      renderTemplates();
    });
  }
}

// ============================================================
// Inicialización
// ============================================================
export function init() {
  initTheme();
  initConsent();
  initModals();

  const yearEl = $("#year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  renderModelCatalog();
  renderTemplates();
  bindEvents();
  syncCategoryTabs();
  renderBuilder();

  const editor = $("#promptEditor");
  if (editor) {
    editor.value = state.manualPrompt || generatePrompt(state);
  }
  updateMeta();
  renderAnalysis();
}

// Arrancar cuando el DOM esté listo
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
