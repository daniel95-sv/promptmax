import { describe, it, expect } from "vitest";
import { getExampleFor, BUILDER_EXAMPLES } from "../data/examples.js";
import { MODEL_PROFILES } from "../data/models.js";

describe("BUILDER_EXAMPLES y getExampleFor", () => {
  it("contiene ejemplos definidos para las 4 categorías principales", () => {
    expect(BUILDER_EXAMPLES.image).toBeDefined();
    expect(BUILDER_EXAMPLES.video).toBeDefined();
    expect(BUILDER_EXAMPLES.text).toBeDefined();
    expect(BUILDER_EXAMPLES.code).toBeDefined();
  });

  it("proporciona un ejemplo específico para cada modelo de imagen", () => {
    MODEL_PROFILES.image.forEach((m) => {
      const ex = getExampleFor("image", m.id);
      expect(ex).toBeDefined();
      expect(ex.subject).toBeTypeOf("string");
      expect(ex.subject.length).toBeGreaterThan(10);
      expect(ex.style).toBeTypeOf("string");
    });
  });

  it("proporciona un ejemplo específico para cada modelo de video", () => {
    MODEL_PROFILES.video.forEach((m) => {
      const ex = getExampleFor("video", m.id);
      expect(ex).toBeDefined();
      expect(ex.concept).toBeTypeOf("string");
      expect(ex.concept.length).toBeGreaterThan(10);
      expect(ex.cameraMotion).toBeTypeOf("string");
    });
  });

  it("proporciona un ejemplo específico para cada modelo de texto", () => {
    MODEL_PROFILES.text.forEach((m) => {
      const ex = getExampleFor("text", m.id);
      expect(ex).toBeDefined();
      expect(ex.role).toBeTypeOf("string");
      expect(ex.task).toBeTypeOf("string");
      expect(ex.task.length).toBeGreaterThan(10);
    });
  });

  it("proporciona un ejemplo específico para cada modelo de programación", () => {
    MODEL_PROFILES.code.forEach((m) => {
      const ex = getExampleFor("code", m.id);
      expect(ex).toBeDefined();
      expect(ex.projectName).toBeTypeOf("string");
      expect(ex.languageFramework).toBeTypeOf("string");
      expect(ex.requirements.length).toBeGreaterThan(10);
    });
  });

  it("recurre al ejemplo genérico si se solicita un modelo desconocido", () => {
    const fallback = getExampleFor("image", "modelo-inexistente");
    expect(fallback).toBeDefined();
    expect(fallback.subject).toBeDefined();
  });
});
