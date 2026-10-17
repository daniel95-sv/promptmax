// ============================================================
// PromptMax - Componentes Modales y Consentimiento
// ============================================================

import { $, $$ } from "../utils/dom.js";
import { getStoredConsent, setStoredConsent } from "../core/storage.js";

export function initConsent() {
  const banner = $("#cookieBanner");
  if (!banner) return;
  if (!getStoredConsent()) {
    banner.classList.add("visible");
  }
  const accept = $("#cookieAccept");
  const reject = $("#cookieReject");
  if (accept) {
    accept.addEventListener("click", () => {
      setStoredConsent("accepted");
      banner.classList.remove("visible");
    });
  }
  if (reject) {
    reject.addEventListener("click", () => {
      setStoredConsent("rejected");
      banner.classList.remove("visible");
    });
  }
}

export function initModals(onModalOpen) {
  $$("[data-modal]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const id = btn.dataset.modal;
      const dlg = $(`#modal-${id}`);
      if (dlg && typeof dlg.showModal === "function") {
        if (typeof onModalOpen === "function") {
          onModalOpen(id);
        }
        dlg.showModal();
      }
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
