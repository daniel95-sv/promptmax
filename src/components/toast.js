// ============================================================
// PromptMax - Componente Toast de Notificación
// ============================================================

import { $ } from "../utils/dom.js";

let toastTimer = null;

export function toast(msg) {
  const el = $("#toast");
  if (!el) return;
  el.textContent = msg;
  el.classList.add("visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    el.classList.remove("visible");
  }, 2400);
}
