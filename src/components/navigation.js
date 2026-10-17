// ============================================================
// PromptMax - Navegación Principal, Drawer Móvil y Barra Rápida
// ============================================================

import { $, $$ } from "../utils/dom.js";

export function syncCategoryTabs(activeCategory) {
  $$(".cat-tab").forEach((t) => {
    t.setAttribute("aria-selected", t.dataset.cat === activeCategory ? "true" : "false");
  });
}

export function initNavigation({ onCategoryChange, onCopy, onRegenerate }) {
  // Mobile Menu Toggle
  const mobileMenuBtn = $("#mobileMenuBtn");
  const mobileNav = $("#mobileNav");
  if (mobileMenuBtn && mobileNav) {
    mobileMenuBtn.addEventListener("click", () => {
      const isOpen = mobileNav.getAttribute("data-open") === "true";
      mobileNav.setAttribute("data-open", (!isOpen).toString());
      mobileMenuBtn.setAttribute("aria-expanded", (!isOpen).toString());
    });

    $$(".mobile-nav-link").forEach((link) => {
      link.addEventListener("click", () => {
        mobileNav.setAttribute("data-open", "false");
        mobileMenuBtn.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Tabs de categoría
  $$(".cat-tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      const cat = tab.dataset.cat;
      syncCategoryTabs(cat);
      if (typeof onCategoryChange === "function") {
        onCategoryChange(cat);
      }
    });
  });

  // Mobile Floating Quick Bar Actions
  const mobileQuickCopy = $("#mobileQuickCopy");
  if (mobileQuickCopy && typeof onCopy === "function") {
    mobileQuickCopy.addEventListener("click", onCopy);
  }

  const mobileQuickRegen = $("#mobileQuickRegen");
  if (mobileQuickRegen && typeof onRegenerate === "function") {
    mobileQuickRegen.addEventListener("click", onRegenerate);
  }

  const mobileJumpPrompt = $("#mobileJumpPrompt");
  if (mobileJumpPrompt) {
    mobileJumpPrompt.addEventListener("click", (e) => {
      e.preventDefault();
      const target = $("#promptEditor") || document.querySelector(".preview-wrap");
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    });
  }
}
