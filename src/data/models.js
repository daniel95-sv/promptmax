/**
 * Perfiles y adaptadores de modelos de Inteligencia Artificial para PromptMax
 * Cumple con especificaciones de Skill.md secciones 4, 18.
 */

export const MODEL_PROFILES = {
  image: [
    {
      id: "generic",
      name: "Genérico",
      cat: "Universal",
      desc: "Estructura descriptiva estándar sin parámetros específicos.",
      syntax: "Lenguaje natural descriptivo",
      parameters: ["aspect", "lighting", "style"],
      supportsNegative: true,
      negativeFormat: "natural",
      lastReviewed: "2026-10",
      verified: true
    },
    {
      id: "midjourney",
      name: "Midjourney",
      cat: "Imagen",
      desc: "Descripción natural + parámetros dedicados (--ar, --style raw, --v, --no).",
      syntax: "--ar, --style raw, --v 6.1, --no",
      parameters: ["--ar", "--v", "--style", "--no", "--c", "--s"],
      supportsNegative: true,
      negativeFormat: "flag", // --no word1 word2
      lastReviewed: "2026-10",
      verified: true
    },
    {
      id: "flux",
      name: "FLUX",
      cat: "Imagen",
      desc: "Prompt descriptivo denso, excelente con texto legible y anatomía detallada.",
      syntax: "Descripción fluida + texto entrecomillado",
      parameters: ["aspect_ratio", "guidance_scale", "prompt"],
      supportsNegative: false,
      negativeFormat: "natural",
      lastReviewed: "2026-10",
      verified: true
    },
    {
      id: "sdxl",
      name: "Stable Diffusion XL",
      cat: "Imagen",
      desc: "Prompt positivo + negative prompt en campo separado con pesos ponderados.",
      syntax: "Positive prompt + Negative prompt",
      parameters: ["positive", "negative", "cfg_scale", "steps"],
      supportsNegative: true,
      negativeFormat: "separate",
      lastReviewed: "2026-10",
      verified: true
    },
    {
      id: "nano-banana",
      name: "Nano Banana",
      cat: "Imagen",
      desc: "Modelos conversacionales visuales orientados a edición guiada por contexto.",
      syntax: "Instrucción conversacional y transformaciones",
      parameters: ["context", "transformation"],
      supportsNegative: true,
      negativeFormat: "natural",
      lastReviewed: "2026-10",
      verified: true
    },
    {
      id: "dalle",
      name: "OpenAI Images",
      cat: "Imagen",
      desc: "Descripción en lenguaje natural, sin parámetros técnicos invasivos.",
      syntax: "Lenguaje natural detallado",
      parameters: ["size", "quality", "style"],
      supportsNegative: false,
      negativeFormat: "natural",
      lastReviewed: "2026-10",
      verified: true
    }
  ],
  video: [
    {
      id: "generic",
      name: "Genérico",
      cat: "Universal",
      desc: "Prompt descriptivo con continuidad temporal, sujeto y movimiento.",
      syntax: "Descripción temporal secuencial",
      parameters: ["duration", "aspect", "motion"],
      maxDurationSec: 10,
      supportsClips: true,
      lastReviewed: "2026-10",
      verified: true
    },
    {
      id: "runway",
      name: "Runway (Gen-3)",
      cat: "Video",
      desc: "Prompt cinematográfico estructurado con lenguaje técnico de cámara y vectores.",
      syntax: "[Camera Motion] + [Subject Action] + [Lighting & Style]",
      parameters: ["motion", "duration", "seed", "interpolate"],
      maxDurationSec: 10,
      supportsClips: true,
      lastReviewed: "2026-10",
      verified: true
    },
    {
      id: "sora",
      name: "Sora",
      cat: "Video",
      desc: "Descripción narrativa con fuerte coherencia de física y persistencia temporal.",
      syntax: "Narrativa temporal + física y movimiento de cámara",
      parameters: ["resolution", "duration", "aspect_ratio"],
      maxDurationSec: 20,
      supportsClips: true,
      lastReviewed: "2026-10",
      verified: true
    },
    {
      id: "kling",
      name: "Kling",
      cat: "Video",
      desc: "Prompt visual dinámico con especificación de velocidad y trayectoria.",
      syntax: "Acción principal + vector de cámara + atmósfera",
      parameters: ["camera", "creativity", "duration"],
      maxDurationSec: 10,
      supportsClips: true,
      lastReviewed: "2026-10",
      verified: true
    },
    {
      id: "veo",
      name: "Veo",
      cat: "Video",
      desc: "Prompt cinematográfico de alta definición con comprensión de sonido y diálogo.",
      syntax: "Cinematografía + Sonido ambiental + Secuencia",
      parameters: ["style", "audio_cue", "duration"],
      maxDurationSec: 15,
      supportsClips: true,
      lastReviewed: "2026-10",
      verified: true
    }
  ],
  text: [
    {
      id: "generic",
      name: "Genérico",
      cat: "Universal",
      desc: "Estructura universal: Rol, Objetivo, Contexto, Tarea, Restricciones y Salida.",
      syntax: "Bloques Markdown estructurados",
      parameters: ["role", "objective", "constraints", "outputFormat"],
      lastReviewed: "2026-10",
      verified: true
    },
    {
      id: "chatgpt",
      name: "ChatGPT",
      cat: "Texto",
      desc: "Instrucciones directas con ejemplos Few-Shot y formato explícito de respuesta.",
      syntax: "Markdown con llamadas a herramientas y pasos",
      parameters: ["system", "developer_message", "format"],
      lastReviewed: "2026-10",
      verified: true
    },
    {
      id: "claude",
      name: "Claude",
      cat: "Texto",
      desc: "Aprovecha etiquetas XML semánticas (<context>, <instructions>, <rules>) y cadena de pensamiento.",
      syntax: "Etiquetas XML + Markdown de alta precisión",
      parameters: ["xml_tags", "scratchpad", "temperature"],
      lastReviewed: "2026-10",
      verified: true
    },
    {
      id: "gemini",
      name: "Gemini",
      cat: "Texto",
      desc: "Instrucciones estructuradas con soporte multimodal y razonamiento en profundidad.",
      syntax: "Encabezados Markdown claros + Criterios de calidad",
      parameters: ["system_instructions", "grounding"],
      lastReviewed: "2026-10",
      verified: true
    }
  ],
  code: [
    {
      id: "generic",
      name: "Genérico",
      cat: "Universal",
      desc: "Prompt técnico con arquitectura, criterios de aceptación verificables y pruebas.",
      syntax: "Especificación técnica estructurada",
      parameters: ["stack", "acceptance", "constraints"],
      lastReviewed: "2026-10",
      verified: true
    },
    {
      id: "claude-code",
      name: "Claude Code",
      cat: "Programación",
      desc: "Instrucciones operativas de terminal: inspección previa, cambios mínimos y verificación con pruebas.",
      syntax: "Flujo: Diagnóstico → Planificación → Implementación → Pruebas",
      parameters: ["workspace_inspection", "non_destructive", "test_execution"],
      lastReviewed: "2026-10",
      verified: true
    },
    {
      id: "codex",
      name: "Codex / Asistentes",
      cat: "Programación",
      desc: "Instrucciones de código enfocadas en contratos de tipos, edge-cases y modularidad.",
      syntax: "Tipado estricto + Casos de prueba unitarios",
      parameters: ["type_safety", "modular_design"],
      lastReviewed: "2026-10",
      verified: true
    }
  ]
};

export const CATALOG_MODELS_GRID = [
  { name: "Midjourney", cat: "Imagen", syntax: "--ar, --style raw, --v 6.1, --no", desc: "Sintaxis artística con parámetros dedicados." },
  { name: "FLUX", cat: "Imagen", syntax: "Descripción fluida + texto visible", desc: "Alta fidelidad anatómica y tipografía precisa." },
  { name: "Stable Diffusion XL", cat: "Imagen", syntax: "Positive Prompt + Negative Prompt", desc: "Control granular de composición y pesos." },
  { name: "Nano Banana", cat: "Imagen", syntax: "Lenguaje natural + contexto", desc: "Edición visual guiada por contexto conversacional." },
  { name: "Veo", cat: "Video", syntax: "Secuencia + audio integrado", desc: "Vídeo HD con física realista y sonido." },
  { name: "Sora", cat: "Video", syntax: "Narrativa temporal + cámara continua", desc: "Persistencia de sujeto y movimientos complejos." },
  { name: "Runway / Kling", cat: "Video", syntax: "Fotograma + vector de cámara", desc: "Control preciso de movimiento y continuidad." },
  { name: "Gemini / Claude / ChatGPT", cat: "Texto", syntax: "Bloques Markdown / XML semántico", desc: "Razonamiento, análisis y redacción estructurada." },
  { name: "Claude Code / Codex", cat: "Programación", syntax: "Especificación + criterios verificables", desc: "Desarrollo seguro, análisis previo y pruebas." }
];
