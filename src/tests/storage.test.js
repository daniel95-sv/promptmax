import { describe, it, expect } from "vitest";
import {
  initialState,
  sanitizeFilename,
  createExportPayload
} from "../core/storage.js";

describe("Storage & Serialization Module", () => {
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
});
