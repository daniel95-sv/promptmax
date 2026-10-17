// ============================================================
// PromptMax - Componentes Reutilizables de Campos y Formularios
// ============================================================

import { escapeHtml } from "../utils/dom.js";

export function renderField({ id, label, kind = "text", value, placeholder, hint, options, onInput, rows = 3 }) {
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

export function renderChips({ label, value, options, onChange, multi = false, hint }) {
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

export function renderAccordion({ title, open = false, children }) {
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
