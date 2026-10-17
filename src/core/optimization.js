/**
 * Motor de optimización y transformación de prompts ("Mejorar mi prompt")
 * Cumple con Skill.md Sección 15.
 *
 * Características principales:
 * - Operaciones deterministas ejecutadas 100% en el navegador (privacidad total).
 * - Coherencia lingüística estricta (respeto de 'es' o 'en' en títulos, instrucciones y especificaciones).
 * - Preservación de parámetros existentes del usuario en adaptadores de modelo (ej. Midjourney --ar, --v).
 * - Diccionario ampliado de traducción rápida de términos clave con indicación explícita de modo offline.
 */

// Diccionario contextual ampliado para traducción rápida sin APIs externas (Modo local)
export const GLOSSARY_ES_EN = [
  // Términos estructurales de prompt
  [/\bsujeto principal\b/gi, "main subject"],
  [/\bestilo visual\b/gi, "visual style"],
  [/\biluminaci[oó]n de estudio\b/gi, "studio lighting"],
  [/\biluminaci[oó]n natural\b/gi, "natural lighting"],
  [/\biluminaci[oó]n volum[eé]trica\b/gi, "volumetric lighting"],
  [/\biluminaci[oó]n\b/gi, "lighting"],
  [/\bencuadre\b/gi, "framing"],
  [/\bprimer plano extremo\b/gi, "extreme close-up shot"],
  [/\bprimer plano\b/gi, "close-up shot"],
  [/\bplano medio general\b/gi, "medium wide shot"],
  [/\bplano medio\b/gi, "medium shot"],
  [/\bplano general\b/gi, "wide shot"],
  [/\bplano cenital\b/gi, "top-down overhead view"],
  [/\bvista de pájaro\b/gi, "bird's-eye view"],
  [/\bángulo bajo\b/gi, "low-angle shot"],
  [/\bprofundidad de campo\b/gi, "depth of field"],
  [/\bdesenfoque de fondo\b/gi, "shallow depth of field bokeh"],
  [/\bregla de los tercios\b/gi, "rule of thirds"],
  [/\bsimetr[ií]a\b/gi, "symmetry"],
  [/\bpunto de fuga\b/gi, "vanishing point"],
  [/\bespacio negativo\b/gi, "negative space"],
  [/\bpaleta de colores\b/gi, "color palette"],
  [/\bhora dorada\b/gi, "golden hour sunset"],
  [/\batardecer\b/gi, "sunset"],
  [/\bamanecer\b/gi, "sunrise dawn"],
  [/\bcontraluz\b/gi, "backlit backlight"],
  [/\bluz cenital\b/gi, "zenith overhead light"],
  [/\bluces de ne[oó]n\b/gi, "neon lighting"],
  [/\bcinematogr[aá]fico\b/gi, "cinematic"],
  [/\bfotorrealista\b/gi, "photorealistic"],
  [/\belegante\b/gi, "elegant"],
  [/\bminimalista\b/gi, "minimalist"],
  [/\bfantas[ií]a oscura\b/gi, "dark fantasy"],
  [/\bhiperrealista\b/gi, "hyper-detailed photorealistic"],
  [/\bresoluci[oó]n\b/gi, "resolution"],
  [/\bcalidad\b/gi, "quality"],
  [/\bdetallado\b/gi, "detailed"],
  [/\btextura\b/gi, "texture"],
  [/\bmateriales\b/gi, "materials"],
  [/\bacabado\b/gi, "finish"],
  [/\bevitar\b/gi, "avoid"],
  [/\brestricciones\b/gi, "constraints"],
  [/\bobjetivo\b/gi, "objective"],
  [/\bcontexto\b/gi, "context"],
  [/\btarea\b/gi, "task"],
  [/\breglas\b/gi, "rules"],
  [/\bejemplos\b/gi, "examples"],
  [/\bcriterios de evaluaci[oó]n\b/gi, "evaluation criteria"],
  [/\bformato de salida\b/gi, "output format"],
  // Sujetos y elementos frecuentes
  [/\bdrag[oó]n de fuego\b/gi, "fire dragon"],
  [/\bdrag[oó]n\b/gi, "dragon"],
  [/\bcaballero\b/gi, "knight"],
  [/\bgato espacial\b/gi, "astronaut cat in spacesuit"],
  [/\bgato\b/gi, "cat"],
  [/\bperro\b/gi, "dog"],
  [/\bpersona\b/gi, "person"],
  [/\bmujer\b/gi, "woman"],
  [/\bhombre\b/gi, "man"],
  [/\bniño\b/gi, "child"],
  [/\brobot explorador\b/gi, "explorer robot"],
  [/\brobot\b/gi, "robot"],
  [/\bcoche deportivo\b/gi, "sports car"],
  [/\bcoche\b/gi, "car"],
  [/\bauto\b/gi, "car"],
  [/\bveh[ií]culo\b/gi, "vehicle"],
  [/\bciudad futurista\b/gi, "futuristic city"],
  [/\bciudad\b/gi, "city"],
  [/\bbosque\b/gi, "forest"],
  [/\bmonta[nñ]a\b/gi, "mountain"],
  [/\bmar\b/gi, "ocean sea"],
  [/\bplaya\b/gi, "beach"],
  [/\brascacielos\b/gi, "skyscrapers"],
  [/\bcastillo\b/gi, "castle"],
  [/\bfondo\b/gi, "background"],
  [/\bprimer plano\b/gi, "foreground"],
  [/\bcielo nocturno\b/gi, "night sky with stars"],
  [/\bcielo\b/gi, "sky"],
  [/\bnubes\b/gi, "clouds"],
  [/\ballena\b/gi, "whale"],
  [/\bleopardo\b/gi, "leopard"],
  [/\ble[oó]n\b/gi, "lion"],
  [/\barmadura\b/gi, "armor"],
  [/\bespada\b/gi, "sword"],
  [/\bvidrio\b/gi, "glass"],
  [/\bm[aá]rmol\b/gi, "marble"],
  [/\boro\b/gi, "gold"],
  [/\bplata\b/gi, "silver"],
  [/\bbronce\b/gi, "bronze"],
  [/\bhierro\b/gi, "iron"],
  [/\bmadera\b/gi, "wood"]
];

export const GLOSSARY_EN_ES = [
  [/\bmain subject\b/gi, "sujeto principal"],
  [/\bvisual style\b/gi, "estilo visual"],
  [/\bstudio lighting\b/gi, "iluminación de estudio"],
  [/\bnatural lighting\b/gi, "iluminación natural"],
  [/\bvolumetric lighting\b/gi, "iluminación volumétrica"],
  [/\blighting\b/gi, "iluminación"],
  [/\bframing\b/gi, "encuadre"],
  [/\bextreme close-up shot\b/gi, "primer plano extremo"],
  [/\bclose-up shot\b/gi, "primer plano"],
  [/\bmedium wide shot\b/gi, "plano medio general"],
  [/\bmedium shot\b/gi, "plano medio"],
  [/\bwide shot\b/gi, "plano general"],
  [/\btop-down overhead view\b/gi, "plano cenital"],
  [/\bbird's-eye view\b/gi, "vista de pájaro"],
  [/\blow-angle shot\b/gi, "ángulo bajo"],
  [/\bdepth of field\b/gi, "profundidad de campo"],
  [/\brule of thirds\b/gi, "regla de los tercios"],
  [/\bsymmetry\b/gi, "simetría"],
  [/\bnegative space\b/gi, "espacio negativo"],
  [/\bcolor palette\b/gi, "paleta de colores"],
  [/\bgolden hour sunset\b/gi, "hora dorada al atardecer"],
  [/\bsunset\b/gi, "atardecer"],
  [/\bsunrise\b/gi, "amanecer"],
  [/\bbacklit backlight\b/gi, "contraluz"],
  [/\bneon lighting\b/gi, "luces de neón"],
  [/\bcinematic\b/gi, "cinematográfico"],
  [/\bphotorealistic\b/gi, "fotorrealista"],
  [/\belegant\b/gi, "elegante"],
  [/\bminimalist\b/gi, "minimalista"],
  [/\bdark fantasy\b/gi, "fantasía oscura"],
  [/\bhyper-detailed\b/gi, "hiperdetallado"],
  [/\bbackground\b/gi, "fondo"],
  [/\bforeground\b/gi, "primer plano"],
  [/\bavoid\b/gi, "evitar"],
  [/\bconstraints\b/gi, "restricciones"],
  [/\bobjective\b/gi, "objetivo"],
  [/\bcontext\b/gi, "contexto"],
  [/\btask\b/gi, "tarea"],
  [/\brules\b/gi, "reglas"],
  [/\bexamples\b/gi, "ejemplos"],
  [/\bevaluation criteria\b/gi, "criterios de evaluación"],
  [/\boutput format\b/gi, "formato de salida"],
  [/\bfire dragon\b/gi, "dragón de fuego"],
  [/\bdragon\b/gi, "dragón"],
  [/\bknight\b/gi, "caballero"],
  [/\bastronaut cat\b/gi, "gato espacial con traje"],
  [/\bcat\b/gi, "gato"],
  [/\bdog\b/gi, "perro"],
  [/\bperson\b/gi, "persona"],
  [/\bwoman\b/gi, "mujer"],
  [/\bman\b/gi, "hombre"],
  [/\bchild\b/gi, "niño"],
  [/\bexplorer robot\b/gi, "robot explorador"],
  [/\brobot\b/gi, "robot"],
  [/\bsports car\b/gi, "coche deportivo"],
  [/\bcar\b/gi, "coche"],
  [/\bvehicle\b/gi, "vehículo"],
  [/\bfuturistic city\b/gi, "ciudad futurista"],
  [/\bcity\b/gi, "ciudad"],
  [/\bforest\b/gi, "bosque"],
  [/\bmountain\b/gi, "montaña"],
  [/\bocean\b/gi, "mar océano"],
  [/\bbeach\b/gi, "playa"],
  [/\bskyscrapers\b/gi, "rascacielos"],
  [/\bcastle\b/gi, "castillo"],
  [/\bnight sky\b/gi, "cielo nocturno"],
  [/\bsky\b/gi, "cielo"],
  [/\bclouds\b/gi, "nubes"],
  [/\bwhale\b/gi, "ballena"],
  [/\bleopard\b/gi, "leopardo"],
  [/\blion\b/gi, "león"],
  [/\barmor\b/gi, "armadura"],
  [/\bsword\b/gi, "espada"]
];

/**
 * Detecta el idioma principal predominante del texto de entrada.
 */
function detectTextLanguage(text, defaultLang = "en") {
  if (!text) return defaultLang;
  const esMatches = (text.match(/\b(el|la|los|las|un|una|de|del|en|con|por|para|sujeto|iluminación|estilo|fondo|evitar)\b/gi) || []).length;
  const enMatches = (text.match(/\b(the|a|an|of|in|with|for|by|subject|lighting|style|background|avoid|shot)\b/gi) || []).length;
  if (esMatches > enMatches) return "es";
  if (enMatches > esMatches) return "en";
  return defaultLang;
}

export function improvePrompt(input = "", op = "structure", model = "generic", lang = "en") {
  const text = String(input || "").trim();
  if (!text) return "";

  // Determinar idioma efectivo para la salida
  const effectiveLang = lang === "es" || lang === "en" ? lang : detectTextLanguage(text, "en");

  switch (op) {
    case "structure": {
      // Divide en oraciones y genera bloques estructurados con viñetas en el idioma coherente
      const sentences = text
        .split(/(?<=[.!?])\s+|\n+/)
        .map((s) => s.trim().replace(/^[-*•]\s*/, ""))
        .filter(Boolean);

      if (effectiveLang === "es") {
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
      } else {
        if (sentences.length <= 1) {
          return `## Primary Objective\n${text}\n\n## Execution Criteria\n- Maintain coherence and visual/textual style.\n- Eliminate superfluous elements.`;
        }
        const header = "## Structured Instructions";
        const bullets = sentences.map((s, idx) => {
          if (idx === 0) return `### 1. Main Subject / Core Goal\n- ${s}`;
          if (idx === 1) return `### 2. Context & Details\n- ${s}`;
          return `- ${s}`;
        });
        return `${header}\n\n${bullets.join("\n\n")}`;
      }
    }

    case "precise": {
      // Elimina ambigüedades y palabras débiles reemplazándolas por términos específicos según el idioma
      let out = text;
      if (effectiveLang === "es") {
        out = out
          .replace(/\b(un mont[oó]n de|muchos|algunos|varios|bastantes)\b/gi, "especificado con precisión cuantitativa")
          .replace(/\b(bueno|bonito|genial|lindo|adecuado)\b/gi, "de alta fidelidad y acabado profesional")
          .replace(/\b(realista)\b/gi, "fotorrealista de alta definición 8k con texturas nítidas")
          .replace(/\b(muy|s[uú]per)\s+/gi, "")
          .replace(/\b(etc\.?|y m[aá]s|y cosas as[ií])\b/gi, "")
          .replace(/\s+/g, " ")
          .trim();
      } else {
        out = out
          .replace(/\b(a lot of|many|some|various|several|a bunch of)\b/gi, "precisely specified")
          .replace(/\b(good|nice|great|decent|fine)\b/gi, "high-fidelity professional grade")
          .replace(/\b(realistic)\b/gi, "photorealistic 8k octane render texture")
          .replace(/\b(very|super)\s+/gi, "")
          .replace(/\b(etc\.?|and so on|and more)\b/gi, "")
          .replace(/\s+/g, " ")
          .trim();
      }
      return out;
    }

    case "trim": {
      // Elimina redundancias, muletillas y repeticiones consecutivas
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
      // Eleva la redacción a parámetros y terminología técnica respetando el idioma objetivo
      const isVisual = /(image|photo|portrait|foto|c[aá]mara|camera|luz|light|render|color|shot|scene|imagen|fotograf[ií]a|paisaje|landscape)/i.test(text);
      if (effectiveLang === "es") {
        if (isVisual) {
          return `${text}\n\n[Especificaciones técnicas]: formato de sensor de 35 mm, apertura f/2.8, rango dinámico equilibrado, iluminación volumétrica ambiental, control estricto de aberración cromática, gradación tonal limpia.`;
        }
        return `[Especificación]:\n${text}\n\n[Restricciones técnicas]: Ejecución determinista, cumplimiento de contratos arquitectónicos, funciones puras sin efectos secundarios colaterales, cobertura de pruebas unitarias verificable.`;
      } else {
        if (isVisual) {
          return `${text}\n\n[Technical Specs]: 35mm sensor format, f/2.8 aperture, balanced dynamic range, volumetric ambient lighting, chromatic aberration control, clean tonal grading.`;
        }
        return `[Specification]:\n${text}\n\n[Constraints]: Deterministic execution, strict adherence to architectural contracts, zero side-effects, unit test coverage required.`;
      }
    }

    case "short": {
      // Versión condensada: retiene la primera oración esencial o las palabras clave
      const sentences = text.split(/(?<=[.!?])\s+/);
      const mainSentence = sentences[0] || text;
      const condensed = mainSentence.replace(/^(por favor|quiero que|genera|crea|create|please|make)\s+/i, "");
      return condensed.charAt(0).toUpperCase() + condensed.slice(1);
    }

    case "detailed": {
      // Expande la descripción con dimensiones sensoriales y de calidad manteniendo consistencia idiomática
      if (effectiveLang === "es") {
        return (
          `${text}\n\n` +
          `Detalles adicionales requeridos:\n` +
          `- Profundidad espacial y separación clara entre primer plano, plano medio y fondo.\n` +
          `- Iluminación natural suave con gradientes de sombra coherentes.\n` +
          `- Texturas tangibles y microdetalle de acabado profesional.`
        );
      } else {
        return (
          `${text}\n\n` +
          `Additional required details:\n` +
          `- Spatial depth and distinct separation between foreground, midground, and background.\n` +
          `- Soft natural lighting with consistent shadow gradients.\n` +
          `- Tangible micro-textures with professional-grade finishing.`
        );
      }
    }

    case "translate-en": {
      // Traducción por diccionario local sin enviar datos a servidores externos
      let translated = text;
      GLOSSARY_ES_EN.forEach(([rgx, repl]) => {
        translated = translated.replace(rgx, repl);
      });
      return translated;
    }

    case "translate-es": {
      // Traducción por diccionario local sin enviar datos a servidores externos
      let translated = text;
      GLOSSARY_EN_ES.forEach(([rgx, repl]) => {
        translated = translated.replace(rgx, repl);
      });
      return translated;
    }

    case "model-adapt": {
      if (model === "midjourney") {
        // Preservar los parámetros ya configurados por el usuario (--ar, --v, --style, etc.)
        let result = text;

        const hasAr = /--ar\s+\d+:\d+/i.test(result);
        const hasV = /--v\s+[\d.]+/i.test(result);
        const hasStyle = /--style\s+\S+/i.test(result);

        const paramsToAdd = [];
        if (!hasAr) paramsToAdd.push("--ar 16:9");
        if (!hasStyle) paramsToAdd.push("--style raw");
        if (!hasV) paramsToAdd.push("--v 6.1");

        if (paramsToAdd.length > 0) {
          result = `${result.trim()} ${paramsToAdd.join(" ")}`;
        }
        return result.trim();
      }

      if (model === "claude") {
        if (effectiveLang === "es") {
          return `<rol>\nEspecialista sénior\n</rol>\n\n<tarea>\n${text}\n</tarea>\n\n<reglas>\n- Sé preciso, riguroso y objetivo.\n- No inventes datos ni asunciones sin verificar.\n</reglas>`;
        }
        return `<role>\nExpert specialist\n</role>\n\n<task>\n${text}\n</task>\n\n<rules>\n- Be precise, factual, and clear.\n- Do not fabricate information.\n</rules>`;
      }

      if (model === "sdxl") {
        if (effectiveLang === "es") {
          return `Prompt Positivo:\n${text}, obra maestra, 8k, hiperdetallado, acabado profesional\n\nPrompt Negativo:\nfeo, deforme, desfigurado, baja calidad, borroso, marca de agua`;
        }
        return `Positive Prompt:\n${text}, masterpiece, 8k, highly detailed, professional finish\n\nNegative Prompt:\nugly, deformed, disfigured, low quality, blurry, watermark`;
      }

      return text;
    }

    default:
      return text;
  }
}
