import { describe, it, expect } from "vitest";
import {
  generateImagePrompt,
  generateVideoPrompt,
  generateTextPrompt,
  generateCodePrompt,
  generatePrompt
} from "../core/prompt-engine.js";

describe("Prompt Engine - Image Prompts", () => {
  it("generates basic image prompt in English by default", () => {
    const fields = {
      subject: "astronaut looking at Earth",
      style: "Fotografía cinematográfica",
      lighting: "Golden hour",
      aspect: "16:9"
    };
    const prompt = generateImagePrompt(fields, "generic", "en");
    expect(prompt).toContain("Main subject: astronaut looking at Earth.");
    expect(prompt).toContain("Visual style: Fotografía cinematográfica.");
    expect(prompt).toContain("Lighting: Golden hour.");
    expect(prompt).toContain("Aspect ratio: 16:9.");
  });

  it("generates image prompt in Spanish when selected", () => {
    const fields = {
      subject: "león majestuoso en la sabana",
      style: "Fotografía de naturaleza",
      lighting: "Luz natural suave",
      aspect: "3:2"
    };
    const prompt = generateImagePrompt(fields, "generic", "es");
    expect(prompt).toContain("Sujeto principal: león majestuoso en la sabana.");
    expect(prompt).toContain("Iluminación: Luz natural suave.");
    expect(prompt).toContain("Relación de aspecto: 3:2.");
  });

  it("applies Midjourney parameters (--ar, --style raw, --no)", () => {
    const fields = {
      subject: "cyberpunk samurai on a motorcycle",
      aspect: "16:9",
      avoid: "blur, low resolution, bad anatomy"
    };
    const prompt = generateImagePrompt(fields, "midjourney", "en");
    expect(prompt).toContain("--ar 16:9");
    expect(prompt).toContain("--style raw");
    expect(prompt).toContain("--no blur low resolution bad anatomy");
  });

  it("formats SDXL negative prompt in separated block", () => {
    const fields = {
      subject: "portrait of an elderly artist",
      avoid: "plastic skin, cartoon"
    };
    const prompt = generateImagePrompt(fields, "sdxl", "en");
    expect(prompt).toContain("[Negative Prompt]:");
    expect(prompt).toContain("plastic skin, cartoon");
  });
});

describe("Prompt Engine - Video Prompts", () => {
  it("generates continuous video prompt", () => {
    const fields = {
      concept: "drone flying through misty mountains",
      action: "camera ascends revealing a hidden waterfall",
      cameraMotion: "Travelling de acercamiento",
      duration: "10s",
      aspect: "16:9"
    };
    const prompt = generateVideoPrompt(fields, "runway", "en", false);
    expect(prompt).toContain("General concept: drone flying through misty mountains.");
    expect(prompt).toContain("Camera motion: Travelling de acercamiento.");
    expect(prompt).toContain("Duration: 10s.");
  });

  it("generates multi-clip breakdown when multiClip is enabled", () => {
    const fields = {
      concept: "hero journey in three acts",
      initialScene: "warrior standing at the gates",
      action: "she opens the gates and enters the foggy forest",
      cameraMotion: "Seguimiento del sujeto",
      duration: "18s (3 clips)"
    };
    const prompt = generateVideoPrompt(fields, "generic", "es", true);
    expect(prompt).toContain("División en clips con continuidad estricta");
    expect(prompt).toContain("Clip 1 (Inicio)");
    expect(prompt).toContain("Clip 2 (Desarrollo)");
    expect(prompt).toContain("Clip 3 (Desenlace)");
  });
});

describe("Prompt Engine - Text Prompts", () => {
  it("generates structured markdown for text tasks", () => {
    const fields = {
      role: "Senior AI Researcher",
      objective: "Summarize recent breakthroughs in transformer models",
      outputFormat: "Markdown with bullet points",
      avoid: "speculation, marketing hype"
    };
    const prompt = generateTextPrompt(fields, "generic", "en");
    expect(prompt).toContain("## Role or Persona\nSenior AI Researcher");
    expect(prompt).toContain("## Main Objective\nSummarize recent breakthroughs in transformer models");
    expect(prompt).toContain("## Output Format\nMarkdown with bullet points");
    expect(prompt).toContain("## Items to Avoid\nspeculation, marketing hype");
  });

  it("generates XML semantic blocks when model is Claude", () => {
    const fields = {
      role: "Legal Analyst",
      objective: "Review contract terms",
      instructions: "Highlight non-standard indemnity clauses"
    };
    const prompt = generateTextPrompt(fields, "claude", "en");
    expect(prompt).toContain("<role>\nLegal Analyst\n</role>");
    expect(prompt).toContain("<objective>\nReview contract terms\n</objective>");
    expect(prompt).toContain("<instructions>\nHighlight non-standard indemnity clauses\n</instructions>");
  });
});

describe("Prompt Engine - Code Prompts", () => {
  it("generates rigorous software engineering prompt with acceptance criteria", () => {
    const fields = {
      taskType: "create",
      projectName: "PromptMax",
      problem: "Build an accessible visual prompt builder",
      stack: "TypeScript, Vite, Vitest",
      acceptance: "100% tests green, zero console warnings",
      avoid: "bloated dependencies"
    };
    const prompt = generateCodePrompt(fields, "claude-code", "es");
    expect(prompt).toContain("## Tipo de Tarea");
    expect(prompt).toContain("## Nombre del Proyecto\nPromptMax");
    expect(prompt).toContain("## Stack Tecnológico\nTypeScript, Vite, Vitest");
    expect(prompt).toContain("## Criterios de Aceptación Verificables\n100% tests green, zero console warnings");
    expect(prompt).toContain("Directrices de Ejecución Obligatorias");
  });
});

describe("Prompt Engine - Dispatcher", () => {
  it("dispatches correctly to the category handler", () => {
    const state = {
      category: "image",
      language: "en",
      models: { image: "generic" },
      fields: {
        image: { subject: "solar flare over planet" }
      }
    };
    const prompt = generatePrompt(state);
    expect(prompt).toContain("Main subject: solar flare over planet.");
  });
});
