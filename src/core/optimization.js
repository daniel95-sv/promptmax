/**
 * Motor de optimización y transformación de prompts ("Mejorar mi prompt")
 * Cumple con Skill.md Sección 15.
 */

export function improvePrompt(input = "", op = "structure", model = "generic", lang = "en") {
  const text = String(input || "").trim();
  if (!text) return "";

  switch (op) {
    case "structure": {
      // Divide en oraciones y genera bloques estructurados con viñetas
      const sentences = text
        .split(/(?<=[.!?])\s+|\n+/)
        .map((s) => s.trim().replace(/^[-*•]\s*/, ""))
        .filter(Boolean);

      if (sentences.length <= 1) {
        return `## Objetivo Principal\n${text}\n\n## Criterios de Ejecución\n- Mantener coherencia y estilo.\n- Sin elementos superfluos.`;
      }

      const header = "## Instrucciones Estructuradas";
      const bullets = sentences.map((s, idx) => {
        if (idx === 0) return `### 1. Sujeto / Objetivo Central\n- ${s}`;
        if (idx === 1) return `### 2. Contexto y Detalles\n- ${s}`;
        return `- ${s}`;
      });
      return `${header}\n\n${bullets.join("\n\n")}`;
    }

    case "precise": {
      // Elimina ambigüedades y palabras débiles reemplazándolas por términos específicos
      let out = text
        .replace(/\b(a lot of|many|some|various|several|un montón de|muchos|algunos|varios)\b/gi, "precisely specified")
        .replace(/\b(good|nice|great|bueno|bonito|genial)\b/gi, "high-fidelity professional grade")
        .replace(/\b(realistic|realista)\b/gi, "photorealistic 8k octane render texture")
        .replace(/\b(very|muy|super)\s+/gi, "")
        .replace(/\b(etc\.?|y más|and so on)\b/gi, "")
        .replace(/\s+/g, " ")
        .trim();
      return out;
    }

    case "trim": {
      // Elimina redundancias, muletillas y palabras repetidas consecutivas
      const words = text.split(/\s+/);
      const seen = new Set();
      const filtered = [];

      for (const w of words) {
        const clean = w.toLowerCase().replace(/[^\p{L}\p{N}]/gu, "");
        if (clean.length > 3 && seen.has(clean)) {
          continue; // omitir repetición redundante
        }
        if (clean.length > 3) seen.add(clean);
        filtered.push(w);
      }
      return filtered.join(" ").replace(/\s{2,}/g, " ").trim();
    }

    case "technical": {
      // Eleva la redacción a parámetros y terminología técnica según el contexto
      const isVisual = /(image|foto|cámara|luz|render|color|shot|scene)/i.test(text);
      if (isVisual) {
        return `${text}\n\n[Technical Specs]: 35mm sensor format, f/2.8 aperture, balanced dynamic range, volumetric ambient lighting, chromatic aberration control, clean tonal grading.`;
      }
      return `[Specification]:\n${text}\n\n[Constraints]: Deterministic execution, strict adherence to architectural contracts, zero side-effects, unit test coverage required.`;
    }

    case "short": {
      // Versión condensada: retiene la primera oración esencial o las palabras clave
      const sentences = text.split(/(?<=[.!?])\s+/);
      const mainSentence = sentences[0] || text;
      // Remueve preámbulos innecesarios
      const condensed = mainSentence.replace(/^(por favor|quiero que|genera|crea|create|please|make)\s+/i, "");
      return condensed.charAt(0).toUpperCase() + condensed.slice(1);
    }

    case "detailed": {
      // Expande la descripción añadiendo dimensiones sensoriales, lumínicas y de calidad
      return (
        `${text}\n\n` +
        `Detalles adicionales requeridos:\n` +
        `- Profundidad espacial y separación clara entre primer plano, plano medio y fondo.\n` +
        `- Iluminación natural suave con gradientes de sombra coherentes.\n` +
        `- Texturas tangibles y microdetalle de acabado profesional.`
      );
    }

    case "translate-en": {
      // Diccionario contextual básico para traducción rápida sin API externa
      const dict = [
        [/\bsujeto principal\b/gi, "main subject"],
        [/\bestilo visual\b/gi, "visual style"],
        [/\biluminación\b/gi, "lighting"],
        [/\bencuadre\b/gi, "framing"],
        [/\bprimer plano\b/gi, "close-up shot"],
        [/\bplano general\b/gi, "wide shot"],
        [/\bpersona\b/gi, "person"],
        [/\bfondo\b/gi, "background"],
        [/\batardecer\b/gi, "sunset golden hour"],
        [/\bcinematográfico\b/gi, "cinematic"],
        [/\belegante\b/gi, "elegant"],
        [/\bevitar\b/gi, "avoid"],
        [/\bcalidad\b/gi, "quality"],
        [/\bdetallado\b/gi, "detailed"]
      ];

      let translated = text;
      dict.forEach(([rgx, repl]) => {
        translated = translated.replace(rgx, repl);
      });
      return translated;
    }

    case "translate-es": {
      const dict = [
        [/\bmain subject\b/gi, "sujeto principal"],
        [/\bvisual style\b/gi, "estilo visual"],
        [/\blighting\b/gi, "iluminación"],
        [/\bframing\b/gi, "encuadre"],
        [/\bclose-up shot\b/gi, "primer plano"],
        [/\bwide shot\b/gi, "plano general"],
        [/\bbackground\b/gi, "fondo"],
        [/\bcinematic\b/gi, "cinematográfico"],
        [/\belegant\b/gi, "elegante"],
        [/\bavoid\b/gi, "evitar"]
      ];

      let translated = text;
      dict.forEach(([rgx, repl]) => {
        translated = translated.replace(rgx, repl);
      });
      return translated;
    }

    case "model-adapt": {
      if (model === "midjourney") {
        let clean = text.replace(/--ar\s+\d+:\d+/g, "").replace(/--v\s+[\d.]+/g, "").trim();
        return `${clean} --ar 16:9 --style raw --v 6.1`;
      }
      if (model === "claude") {
        return `<role>\nExpert specialist\n</role>\n\n<task>\n${text}\n</task>\n\n<rules>\n- Be precise, factual, and clear.\n- Do not fabricate information.\n</rules>`;
      }
      if (model === "sdxl") {
        return `Positive Prompt:\n${text}, masterpiece, 8k, highly detailed\n\nNegative Prompt:\nugly, deformed, disfigured, low quality, blurry, watermark`;
      }
      return text;
    }

    default:
      return text;
  }
}
