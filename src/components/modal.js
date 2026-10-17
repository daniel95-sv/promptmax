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

  $$("[data-consent]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const mode = btn.dataset.consent || "all";
      setStoredConsent(mode);
      banner.classList.remove("visible");
    });
  });

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

  const moreInfo = $("#cookieMoreInfo");
  if (moreInfo) {
    moreInfo.addEventListener("click", () => {
      const dlg = $("#modal-cookies");
      if (dlg && typeof dlg.showModal === "function") dlg.showModal();
    });
  }

  const openConsent = $("#openConsent");
  if (openConsent) {
    openConsent.addEventListener("click", (e) => {
      e.preventDefault();
      banner.classList.add("visible");
      banner.scrollIntoView({ behavior: "smooth", block: "center" });
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
    const closeBtns = dlg.querySelectorAll("[data-close], .modal-close");
    closeBtns.forEach((closeBtn) => {
      closeBtn.addEventListener("click", () => dlg.close());
    });
  });
}
