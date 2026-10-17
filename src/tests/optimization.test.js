import { describe, it, expect } from "vitest";
import { improvePrompt } from "../core/optimization.js";

describe("Optimization Engine ('Mejorar mi prompt')", () => {
  it("structures raw unstructured text into bulleted sections", () => {
    const raw = "Quiero una foto de un auto rojo. Tiene que estar en la calle. Con luces de neón.";
    const result = improvePrompt(raw, "structure");
    expect(result).toContain("## Instrucciones Estructuradas");
    expect(result).toContain("auto rojo");
    expect(result).toContain("neón");
  });

  it("makes vague language precise and professional", () => {
    const raw = "I want a good picture with many people and realistic lighting.";
    const result = improvePrompt(raw, "precise");
    expect(result).not.toContain("a lot");
    expect(result).not.toContain("many");
    expect(result).toContain("high-fidelity professional grade");
  });

  it("trims redundant words without losing meaning", () => {
    const raw = "Cyberpunk city futuristic cityscape with cyberpunk towers and city roads.";
    const result = improvePrompt(raw, "trim");
    expect(result).toBeDefined();
    expect(result.length).toBeLessThan(raw.length);
  });

  it("generates technical specifications block", () => {
    const raw = "Fotografía de retrato con luz suave";
    const result = improvePrompt(raw, "technical");
    expect(result).toContain("[Technical Specs]");
    expect(result).toContain("35mm sensor format");
  });

  it("condenses into a short version", () => {
    const raw = "Por favor crea una ilustración de un gato con traje espacial flotando en la órbita de Júpiter. Además agrega estrellas brillantes.";
    const result = improvePrompt(raw, "short");
    expect(result.length).toBeLessThan(raw.length);
    expect(result).toContain("gato con traje espacial");
  });

  it("translates key visual terms between ES and EN", () => {
    const es = "sujeto principal: dragón de fuego. iluminación: contraluz. estilo visual: cinematográfico.";
    const en = improvePrompt(es, "translate-en");
    expect(en).toContain("main subject: dragón de fuego");
    expect(en).toContain("cinematic");

    const backEs = improvePrompt("main subject: phoenix", "translate-es");
    expect(backEs).toContain("sujeto principal: phoenix");
  });

  it("adapts prompt to specific model syntax", () => {
    const raw = "A majestic lion on a rock";
    const midjourney = improvePrompt(raw, "model-adapt", "midjourney");
    expect(midjourney).toContain("--ar 16:9");
    expect(midjourney).toContain("--style raw");

    const claude = improvePrompt(raw, "model-adapt", "claude");
    expect(claude).toContain("<role>");
    expect(claude).toContain("<task>");
  });
});
