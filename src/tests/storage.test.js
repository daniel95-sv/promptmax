import { describe, it, expect, beforeEach } from "vitest";
import {
  initialState,
  sanitizeFilename,
  createExportPayload,
  getSavedDrafts,
  saveDraft,
  deleteDraft,
  clearAllDrafts
} from "../core/storage.js";

describe("Storage & Serialization Module", () => {
  let mockStore = {};

  beforeEach(() => {
    mockStore = {};
    globalThis.localStorage = {
      getItem: (k) => (k in mockStore ? mockStore[k] : null),
      setItem: (k, v) => { mockStore[k] = String(v); },
      removeItem: (k) => { delete mockStore[k]; },
      clear: () => { mockStore = {}; }
    };
  });

  it("provides complete initial state for all 4 categories", () => {
    const state = initialState();
    expect(state.category).toBe("image");
    expect(state.language).toBe("en");
    expect(state.fields.image).toBeDefined();
    expect(state.fields.video).toBeDefined();
    expect(state.fields.text).toBeDefined();
    expect(state.fields.code).toBeDefined();
  });

  it("sanitizes filenames safely without dangerous characters", () => {
    expect(sanitizeFilename("Mi Proyecto Increíble!! #1")).toBe("mi-proyecto-increible-1");
    expect(sanitizeFilename("///---Test---///")).toBe("test");
    expect(sanitizeFilename("")).toBe("prompt");
  });

  it("creates valid export JSON payload with metadata", () => {
    const state = initialState();
    state.fields.code.projectName = "TestApp";
    state.category = "code";

    const payload = createExportPayload(state, "Generated prompt text");
    expect(payload.generator).toBe("PromptMax");
    expect(payload.category).toBe("code");
    expect(payload.fields.projectName).toBe("TestApp");
    expect(payload.prompt).toBe("Generated prompt text");
    expect(payload.generatedAt).toBeDefined();
  });

  it("saves, lists, and deletes user drafts locally", () => {
    expect(getSavedDrafts()).toEqual([]);

    const saved = saveDraft({
      title: "Mi Proyecto Cyberpunk",
      category: "image",
      prompt: "Main subject: cyborg ninja in neo tokyo."
    });
    expect(saved.id).toBeDefined();
    expect(saved.title).toBe("Mi Proyecto Cyberpunk");

    const drafts = getSavedDrafts();
    expect(drafts.length).toBe(1);
    expect(drafts[0].title).toBe("Mi Proyecto Cyberpunk");

    deleteDraft(saved.id);
    expect(getSavedDrafts()).toEqual([]);

    saveDraft({ title: "Draft 1" });
    saveDraft({ title: "Draft 2" });
    expect(getSavedDrafts().length).toBe(2);

    clearAllDrafts();
    expect(getSavedDrafts()).toEqual([]);
  });
});
