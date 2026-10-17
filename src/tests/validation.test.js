import { describe, it, expect } from "vitest";
import { analyzePrompt } from "../core/validation.js";

describe("Validation & Contradiction Detection Engine", () => {
  it("returns info notice when prompt is empty", () => {
    const items = analyzePrompt("", { category: "image", fields: { image: {} } });
    expect(items.some((i) => i.title.includes("Sin prompt"))).toBe(true);
  });

  it("warns about missing key fields in image mode", () => {
    const state = {
      category: "image",
      fields: {
        image: { subject: "portrait of an artist" }
      }
    };
    const items = analyzePrompt("Main subject: portrait of an artist.", state);
    const warn = items.find((i) => i.type === "warn");
    expect(warn).toBeDefined();
    expect(warn.text).toContain("estilo visual");
    expect(warn.text).toContain("iluminación");
  });

  it("detects contradiction between Bokeh and Gran plano general", () => {
    const state = {
      category: "image",
      fields: {
        image: {
          subject: "montaña lejana",
          shot: "Gran plano general",
          dof: "Bokeh"
        }
      }
    };
    const items = analyzePrompt("Sample prompt with bokeh and wide shot", state);
    const err = items.find((i) => i.type === "err");
    expect(err).toBeDefined();
    expect(err.text).toContain("Bokeh");
    expect(err.text).toContain("plano general");
  });

  it("detects contradiction between Silueta and microdetalle", () => {
    const state = {
      category: "image",
      fields: {
        image: {
          subject: "persona en contraluz",
          lighting: "Silueta",
          detail: "microdetalle en poros"
        }
      }
    };
    const items = analyzePrompt("Sample prompt silhouette with microdetail", state);
    const err = items.find((i) => i.type === "err");
    expect(err).toBeDefined();
    expect(err.text).toContain("silueta con microdetalle");
  });

  it("provides correct character and word counts", () => {
    const state = { category: "text", fields: { text: { role: "Writer", objective: "Write story" } } };
    const prompt = "This is a prompt with exactly eight words.";
    const items = analyzePrompt(prompt, state);
    const metrics = items.find((i) => i.title.includes("Métricas"));
    expect(metrics).toBeDefined();
    expect(metrics.text).toContain("8 palabras");
  });

  it("verifies Midjourney aspect ratio flag", () => {
    const state = {
      category: "image",
      models: { image: "midjourney" },
      fields: { image: { aspect: "16:9" } }
    };
    const prompt = "Subject: landscape --ar 16:9 --style raw";
    const items = analyzePrompt(prompt, state);
    expect(items.some((i) => i.title.includes("Midjourney"))).toBe(true);
  });
});
