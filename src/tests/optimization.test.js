import { describe, it, expect } from "vitest";
import { improvePrompt } from "../core/optimization.js";

describe("Optimization Engine ('Mejorar mi prompt')", () => {
  it("structures raw unstructured text with language consistency", () => {
    const rawEs = "Quiero una foto de un auto rojo. Tiene que estar en la calle. Con luces de neón.";
    const resultEs = improvePrompt(rawEs, "structure", "generic", "es");
    expect(resultEs).toContain("## Instrucciones Estructuradas");
    expect(resultEs).toContain("auto rojo");

    const rawEn = "I want a picture of a red car. It must be on the street. With neon lights.";
    const resultEn = improvePrompt(rawEn, "structure", "generic", "en");
    expect(resultEn).toContain("## Structured Instructions");
    expect(resultEn).toContain("Main Subject / Core Goal");
  });

  it("makes vague language precise and professional", () => {
    const raw = "I want a good picture with many people and realistic lighting.";
    const result = improvePrompt(raw, "precise", "generic", "en");
    expect(result).not.toContain("many");
    expect(result).toContain("high-fidelity professional grade");
  });

  it("trims redundant words without losing meaning", () => {
    const raw = "Cyberpunk city futuristic cityscape with cyberpunk towers and city roads.";
    const result = improvePrompt(raw, "trim");
    expect(result).toBeDefined();
    expect(result.length).toBeLessThan(raw.length);
  });

  it("generates technical specifications with consistent language", () => {
    const visualEs = "Fotografía de retrato con luz suave";
    const resEs = improvePrompt(visualEs, "technical", "generic", "es");
    expect(resEs).toContain("[Especificaciones técnicas]");
    expect(resEs).toContain("formato de sensor de 35 mm");

    const visualEn = "Portrait photograph with soft light";
    const resEn = improvePrompt(visualEn, "technical", "generic", "en");
    expect(resEn).toContain("[Technical Specs]");
    expect(resEn).toContain("35mm sensor format");
  });

  it("keeps detailed operation language consistent with selected language", () => {
    const textEs = "Un paisaje montañoso al atardecer";
    const outEs = improvePrompt(textEs, "detailed", "generic", "es");
    expect(outEs).toContain("Detalles adicionales requeridos:");
    expect(outEs).toContain("Profundidad espacial");

    const textEn = "A mountain landscape at sunset";
    const outEn = improvePrompt(textEn, "detailed", "generic", "en");
    expect(outEn).toContain("Additional required details:");
    expect(outEn).toContain("Spatial depth");
    expect(outEn).not.toContain("Detalles adicionales");
  });

  it("condenses into a short version", () => {
    const raw = "Por favor crea una ilustración de un gato con traje espacial flotando en la órbita de Júpiter.";
    const result = improvePrompt(raw, "short");
    expect(result.length).toBeLessThan(raw.length);
    expect(result).toContain("ilustración de un gato con traje espacial");
  });

  it("translates key visual terms and subjects between ES and EN", () => {
    const es = "sujeto principal: dragón de fuego. iluminación: contraluz. estilo visual: cinematográfico.";
    const en = improvePrompt(es, "translate-en");
    expect(en).toContain("main subject: fire dragon");
    expect(en).toContain("cinematic");

    const backEs = improvePrompt("main subject: fire dragon. cinematic", "translate-es");
    expect(backEs).toContain("sujeto principal: dragón de fuego");
    expect(backEs).toContain("cinematográfico");
  });

  it("preserves existing user parameters when adapting to Midjourney", () => {
    // Caso 1: Sin parámetros existentes -> agrega valores predeterminados
    const rawBase = "A majestic lion on a rock";
    const midjourneyDefault = improvePrompt(rawBase, "model-adapt", "midjourney");
    expect(midjourneyDefault).toContain("--ar 16:9");
    expect(midjourneyDefault).toContain("--style raw");
    expect(midjourneyDefault).toContain("--v 6.1");

    // Caso 2: Con proporción vertical existente (--ar 9:16) y versión previa (--v 6.0) -> los conserva
    const rawCustom = "Vertical fashion portrait of a model --ar 9:16 --v 6.0";
    const midjourneyCustom = improvePrompt(rawCustom, "model-adapt", "midjourney");
    expect(midjourneyCustom).toContain("--ar 9:16");
    expect(midjourneyCustom).not.toContain("--ar 16:9");
    expect(midjourneyCustom).toContain("--v 6.0");
    expect(midjourneyCustom).not.toContain("--v 6.1");
    expect(midjourneyCustom).toContain("--style raw");
  });

  it("adapts prompt to Claude with appropriate language tags", () => {
    const raw = "Diseñar una arquitectura de microservicios";
    const claudeEs = improvePrompt(raw, "model-adapt", "claude", "es");
    expect(claudeEs).toContain("<rol>");
    expect(claudeEs).toContain("<tarea>");

    const claudeEn = improvePrompt(raw, "model-adapt", "claude", "en");
    expect(claudeEn).toContain("<role>");
    expect(claudeEn).toContain("<task>");
  });
});
