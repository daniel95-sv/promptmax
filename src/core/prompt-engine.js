/**
 * Motor inteligente de generación de prompts para PromptMax
 * Cumple con Skill.md Secciones 6, 7, 8, 9, 10, 11, 12, 18.
 */

import { OPTS } from "../data/options.js";

/**
 * Generador de prompts para modelos de Imagen
 */
export function generateImagePrompt(f = {}, model = "generic", lang = "en") {
  const es = lang === "es";
  const parts = [];
  const subjBits = [];

  if (f.subjectCount) subjBits.push(f.subjectCount);
  if (f.subject) subjBits.push(f.subject);
  if (f.appearance) subjBits.push(f.appearance);
  const subjLine = subjBits.join(", ").trim();

  const L = es
    ? {
        subj: "Sujeto principal",
        act: "Acción o pose",
        set: "Escenario",
        era: "Época y contexto",
        bg: "Fondo",
        rel: "Relación entre elementos",
        style: "Estilo visual",
        shot: "Encuadre",
        angle: "Ángulo",
        comp: "Composición",
        lens: "Lente",
        dof: "Profundidad de campo",
        light: "Iluminación",
        color: "Paleta de color",
        atm: "Atmósfera",
        mat: "Materiales y texturas",
        detail: "Nivel de detalle",
        quality: "Acabado",
        inText: "Texto visible en la imagen",
        refs: "Referencias visuales",
        consist: "Consistencia",
        avoid: "Evitar",
        ar: "Relación de aspecto",
        intensity: "intensidad"
      }
    : {
        subj: "Main subject",
        act: "Action or pose",
        set: "Setting",
        era: "Era and context",
        bg: "Background",
        rel: "Relationship between elements",
        style: "Visual style",
        shot: "Shot",
        angle: "Angle",
        comp: "Composition",
        lens: "Lens",
        dof: "Depth of field",
        light: "Lighting",
        color: "Color palette",
        atm: "Mood",
        mat: "Materials and textures",
        detail: "Detail level",
        quality: "Finish",
        inText: "Visible text in image",
        refs: "Visual references",
        consist: "Consistency",
        avoid: "Avoid",
        ar: "Aspect ratio",
        intensity: "intensity"
      };

  if (subjLine) parts.push(`${L.subj}: ${subjLine}.`);
  if (f.action) parts.push(`${L.act}: ${f.action}.`);
  if (f.setting) parts.push(`${L.set}: ${f.setting}.`);
  if (f.era) parts.push(`${L.era}: ${f.era}.`);
  if (f.background) parts.push(`${L.bg}: ${f.background}.`);
  if (f.relationship) parts.push(`${L.rel}: ${f.relationship}.`);
  if (f.style) {
    const styleText = f.styleIntensity
      ? `${f.style} (${L.intensity}: ${f.styleIntensity})`
      : f.style;
    parts.push(`${L.style}: ${styleText}.`);
  }
  if (f.shot) parts.push(`${L.shot}: ${f.shot}.`);
  if (f.angle) parts.push(`${L.angle}: ${f.angle}.`);
  if (f.composition) parts.push(`${L.comp}: ${f.composition}.`);
  if (f.lens) parts.push(`${L.lens}: ${f.lens}.`);
  if (f.dof) parts.push(`${L.dof}: ${f.dof}.`);
  if (f.lighting) parts.push(`${L.light}: ${f.lighting}.`);
  if (f.color) parts.push(`${L.color}: ${f.color}.`);
  if (f.atmosphere) parts.push(`${L.atm}: ${f.atmosphere}.`);
  if (f.materials) parts.push(`${L.mat}: ${f.materials}.`);
  if (f.detail) parts.push(`${L.detail}: ${f.detail}.`);
  if (f.quality) parts.push(`${L.quality}: ${f.quality}.`);
  if (f.inImageText) parts.push(`${L.inText}: "${f.inImageText}".`);
  if (f.references) parts.push(`${L.refs}: ${f.references}.`);
  if (f.consistency) parts.push(`${L.consist}: ${f.consistency}.`);

  let prompt = parts.join(" ");

  // Adaptación específica de parámetros por modelo
  const suffix = [];
  if (f.aspect) {
    if (model === "midjourney") {
      suffix.push(`--ar ${f.aspect}`);
    } else {
      suffix.push(`${L.ar}: ${f.aspect}.`);
    }
  }

  if (model === "midjourney") {
    suffix.push("--style raw");
  }

  if (suffix.length) {
    prompt = prompt ? `${prompt} ${suffix.join(" ")}` : suffix.join(" ");
  }

  // Prompt negativo / exclusiones
  if (f.avoid && f.avoid.trim()) {
    if (model === "midjourney") {
      const noList = f.avoid.trim().replace(/,/g, " ").replace(/\s+/g, " ");
      prompt += ` --no ${noList}`;
    } else if (model === "sdxl") {
      prompt += `\n\n[Negative Prompt]:\n${f.avoid.trim()}`;
    } else {
      prompt += `\n\n${L.avoid}: ${f.avoid.trim()}`;
    }
  }

  return prompt.trim();
}

/**
 * Generador de prompts para Video
 * Contempla temporalidad, continuidad y división opcional en clips (Skill.md Sección 7).
 */
export function generateVideoPrompt(f = {}, model = "generic", lang = "en", multiClip = false) {
  const es = lang === "es";
  const L = es
    ? {
        concept: "Concepto general",
        scene: "Escena inicial",
        action: "Acción principal",
        seq: "Secuencia temporal",
        chMotion: "Movimiento de personajes",
        camMotion: "Movimiento de cámara",
        dir: "Dirección del movimiento",
        speed: "Velocidad y ritmo",
        trans: "Transiciones",
        light: "Iluminación",
        style: "Estilo visual",
        atm: "Atmósfera",
        sound: "Sonido ambiente",
        dialogue: "Diálogo",
        lang: "idioma",
        initFrame: "Fotograma inicial",
        endFrame: "Fotograma final",
        refs: "Referencias visuales",
        continuity: "Continuidad entre clips",
        duration: "Duración",
        aspect: "Relación de aspecto",
        avoid: "Evitar",
        clipTitle: "División en clips con continuidad estricta",
        clipRule: "Condición de continuidad: El Clip N+1 debe iniciar exactamente a partir del fotograma final del Clip N."
      }
    : {
        concept: "General concept",
        scene: "Opening scene",
        action: "Main action",
        seq: "Temporal sequence",
        chMotion: "Character motion",
        camMotion: "Camera motion",
        dir: "Direction of movement",
        speed: "Speed and pacing",
        trans: "Transitions",
        light: "Lighting",
        style: "Visual style",
        atm: "Mood",
        sound: "Ambient sound",
        dialogue: "Dialogue",
        lang: "language",
        initFrame: "Initial frame",
        endFrame: "Final frame",
        refs: "Visual references",
        continuity: "Continuity between clips",
        duration: "Duration",
        aspect: "Aspect ratio",
        avoid: "Avoid",
        clipTitle: "Multi-clip breakdown with strict continuity",
        clipRule: "Continuity rule: Clip N+1 must start exactly from the final frame of Clip N."
      };

  const parts = [];
  if (f.concept) parts.push(`${L.concept}: ${f.concept}.`);
  if (f.initialScene) parts.push(`${L.scene}: ${f.initialScene}.`);
  if (f.action) parts.push(`${L.action}: ${f.action}.`);
  if (f.sequence) parts.push(`${L.seq}: ${f.sequence}.`);
  if (f.characterMotion) parts.push(`${L.chMotion}: ${f.characterMotion}.`);
  if (f.cameraMotion) parts.push(`${L.camMotion}: ${f.cameraMotion}.`);
  if (f.direction) parts.push(`${L.dir}: ${f.direction}.`);
  if (f.speed) parts.push(`${L.speed}: ${f.speed}.`);
  if (f.transitions) parts.push(`${L.trans}: ${f.transitions}.`);
  if (f.lighting) parts.push(`${L.light}: ${f.lighting}.`);
  if (f.style) parts.push(`${L.style}: ${f.style}.`);
  if (f.atmosphere) parts.push(`${L.atm}: ${f.atmosphere}.`);
  if (f.sound) parts.push(`${L.sound}: ${f.sound}.`);
  if (f.dialogue) {
    const langNote = f.language ? ` (${L.lang}: ${f.language})` : "";
    parts.push(`${L.dialogue}: "${f.dialogue}"${langNote}.`);
  }
  if (f.initialFrame) parts.push(`${L.initFrame}: ${f.initialFrame}.`);
  if (f.finalFrame) parts.push(`${L.endFrame}: ${f.finalFrame}.`);
  if (f.references) parts.push(`${L.refs}: ${f.references}.`);
  if (f.continuity) parts.push(`${L.continuity}: ${f.continuity}.`);
  if (f.duration) parts.push(`${L.duration}: ${f.duration}.`);
  if (f.aspect) parts.push(`${L.aspect}: ${f.aspect}.`);

  let prompt = parts.join(" ");

  // Si se solicita desglose en clips o la duración contiene múltiples clips
  if (multiClip || (f.duration && /clip|clips|\d+\s*x\s*\d+/i.test(f.duration))) {
    const clipsBlock = es
      ? `\n\n### ${L.clipTitle}\n` +
        `> ${L.clipRule}\n\n` +
        `1. **Clip 1 (Inicio)**:\n` +
        `   - Escena: ${f.initialScene || f.concept || "Planteamiento inicial"}\n` +
        `   - Acción: Comienzo de la acción con cámara ${f.cameraMotion || "estabilizada"}.\n` +
        `   - Estado final: Sujeto en posición fija de transición.\n\n` +
        `2. **Clip 2 (Desarrollo)**:\n` +
        `   - Escena: Continuación inmediata desde el fotograma final del Clip 1.\n` +
        `   - Acción: ${f.action || "Desarrollo del movimiento principal"}.\n` +
        `   - Estado final: Culminación del movimiento.\n\n` +
        `3. **Clip 3 (Desenlace)**:\n` +
        `   - Escena: Cierre de la toma conservando luz, vestimenta y atmósfera.\n` +
        `   - Acción: Detención o paneo final.\n` +
        `   - Estado final: Encuadre de resolución.`
      : `\n\n### ${L.clipTitle}\n` +
        `> ${L.clipRule}\n\n` +
        `1. **Clip 1 (Opening)**:\n` +
        `   - Scene: ${f.initialScene || f.concept || "Initial setup"}\n` +
        `   - Action: Beginning of action with ${f.cameraMotion || "steady"} camera motion.\n` +
        `   - Final state: Subject in frozen transitional pose.\n\n` +
        `2. **Clip 2 (Progression)**:\n` +
        `   - Scene: Immediate continuation from Clip 1 final frame.\n` +
        `   - Action: ${f.action || "Main motion execution"}.\n` +
        `   - Final state: Culmination of movement.\n\n` +
        `3. **Clip 3 (Closing)**:\n` +
        `   - Scene: Sequence completion preserving lighting, wardrobe, and atmosphere.\n` +
        `   - Action: Settling motion or final pan.\n` +
        `   - Final state: Resolution frame.`;
    prompt += clipsBlock;
  }

  if (f.avoid && f.avoid.trim()) {
    prompt += `\n\n${L.avoid}: ${f.avoid.trim()}`;
  }

  return prompt.trim();
}

/**
 * Generador de prompts para Texto (ChatGPT, Claude, Gemini)
 * Soporta etiquetas semánticas y bloques estructurados (Skill.md Sección 8).
 */
export function generateTextPrompt(f = {}, model = "generic", lang = "es") {
  const es = lang === "es";
  const isClaude = model === "claude";

  if (isClaude) {
    const xmlBlocks = [];
    const addTag = (tag, val) => {
      if (val && String(val).trim()) {
        xmlBlocks.push(`<${tag}>\n${String(val).trim()}\n</${tag}>`);
      }
    };

    addTag("role", f.role);
    addTag("objective", f.objective);
    addTag("context", f.context);
    addTag("audience", f.audience);
    addTag("input_data", f.input);
    addTag("instructions", f.instructions);
    addTag("methodology", f.methodology);
    addTag("tone", f.tone);
    addTag("depth", f.depth);
    addTag("constraints", f.constraints);
    addTag("output_format", f.outputFormat);
    addTag("examples", f.examples);
    addTag("quality_criteria", f.quality);
    addTag("acceptance_criteria", f.acceptance);
    addTag("missing_data_protocol", f.missingInfo);
    addTag("factual_grounding", f.noInvent);
    addTag("citations_and_sources", f.citations);
    addTag("available_tools", f.tools);
    addTag("clarifications", f.askClarifications);
    addTag("restrictions", f.avoid);

    return xmlBlocks.join("\n\n").trim();
  }

  const blocks = [];
  const b = (esLabel, enLabel, val) => {
    if (!val || !String(val).trim()) return;
    blocks.push(`## ${es ? esLabel : enLabel}\n${String(val).trim()}`);
  };

  b("Rol o Especialidad", "Role or Persona", f.role);
  b("Objetivo Principal", "Main Objective", f.objective);
  b("Contexto", "Context", f.context);
  b("Audiencia", "Target Audience", f.audience);
  b("Datos de Entrada", "Input Data", f.input);
  b("Instrucciones Específicas (Tarea)", "Specific Instructions (Task)", f.instructions);
  b("Metodología", "Methodology", f.methodology);
  b("Tono y Estilo", "Tone and Style", f.tone);
  b("Nivel de Profundidad", "Depth Level", f.depth);
  b("Restricciones", "Constraints", f.constraints);
  b("Formato de Salida", "Output Format", f.outputFormat);
  b("Ejemplos", "Examples", f.examples);
  b("Criterios de Calidad", "Quality Criteria", f.quality);
  b("Criterios de Aceptación", "Acceptance Criteria", f.acceptance);
  b("Protocolo ante Información Faltante", "Protocol if Data is Missing", f.missingInfo);
  b("Instrucción de No Invención (Anclaje Fáctico)", "Do Not Hallucinate / Factual Grounding", f.noInvent);
  b("Citas y Fuentes", "Citations and References", f.citations);
  b("Herramientas Disponibles", "Available Tools", f.tools);
  b("Cuándo Solicitar Aclaraciones", "Clarification Conditions", f.askClarifications);
  b("Elementos a Evitar", "Items to Avoid", f.avoid);

  return blocks.join("\n\n").trim();
}

/**
 * Generador de prompts para Programación (Claude Code, Codex, Asistentes)
 * Genera especificaciones técnicas de software con criterios verificables (Skill.md Sección 9).
 */
export function generateCodePrompt(f = {}, model = "generic", lang = "es") {
  const es = lang === "es";
  const taskObj = OPTS.codeTaskType.find((t) => t.v === f.taskType) || {};
  const taskLabel = taskObj.l || (es ? "Tarea de desarrollo" : "Development task");

  const blocks = [];
  const b = (esLabel, enLabel, val) => {
    if (!val || !String(val).trim()) return;
    blocks.push(`## ${es ? esLabel : enLabel}\n${String(val).trim()}`);
  };

  blocks.push(`## ${es ? "Tipo de Tarea" : "Task Type"}\n${taskLabel}`);
  b("Nombre del Proyecto", "Project Name", f.projectName);
  b("Problema que debe Resolver", "Problem to Solve", f.problem);
  b("Tipo de Aplicación", "Application Type", f.appType);
  b("Stack Tecnológico", "Tech Stack", f.stack);
  b("Arquitectura y Patrones", "Architecture & Patterns", f.architecture);
  b("Estructura de Carpetas", "Folder Structure", f.folderStructure);
  b("Funcionalidades Obligatorias", "Mandatory Features", f.mustFeatures);
  b("Funcionalidades Opcionales", "Optional Features", f.optionalFeatures);
  b("Integraciones", "Integrations", f.integrations);
  b("Modelo de Datos", "Data Model", f.dataModel);
  b("API y Servicios Externos", "API & External Services", f.api);
  b("Seguridad", "Security", f.security);
  b("Accesibilidad (A11y)", "Accessibility (A11y)", f.accessibility);
  b("SEO", "SEO", f.seo);
  b("Rendimiento", "Performance", f.performance);
  b("Estrategia de Pruebas", "Testing Strategy", f.tests);
  b("Despliegue y Entorno", "Deployment & Environment", f.deployment);
  b("Criterios de Aceptación Verificables", "Verifiable Acceptance Criteria", f.acceptance);
  b("Entregables Esperados", "Expected Deliverables", f.deliverables);
  b("Restricciones Técnicas", "Technical Constraints", f.constraints);
  b("Archivos o Repositorios de Referencia", "Reference Files / Repositories", f.references);
  b("Prácticas Prohibidas (Evitar)", "Prohibited Practices (Avoid)", f.avoid);

  const finalInstructions = es
    ? `## Directrices de Ejecución Obligatorias\n` +
      `- Analiza el contexto y el repositorio disponible antes de proponer cambios.\n` +
      `- Respeta la arquitectura existente y las convenciones de estilo del proyecto.\n` +
      `- No inventes dependencias, variables de entorno ni APIs no documentadas.\n` +
      `- Implementa código modular, limpio, tipado y autodocumentado.\n` +
      `- Ejecuta y valida las pruebas automatizadas cuando el entorno lo permita.`
    : `## Mandatory Execution Guidelines\n` +
      `- Inspect available context and repository before proposing changes.\n` +
      `- Respect existing architecture, conventions, and style.\n` +
      `- Do not hallucinate dependencies, env vars, or undocumented APIs.\n` +
      `- Write modular, clean, typed, and self-documenting code.\n` +
      `- Run and verify automated test suites whenever the environment allows.`;

  blocks.push(finalInstructions);

  return blocks.join("\n\n").trim();
}

/**
 * Despachador principal según estado de la aplicación
 */
export function generatePrompt(state) {
  if (!state) return "";
  const { category, language, models, fields } = state;
  const model = models?.[category] || "generic";
  const f = fields?.[category] || {};

  switch (category) {
    case "image":
      return generateImagePrompt(f, model, language);
    case "video":
      return generateVideoPrompt(f, model, language, f._multiClip);
    case "text":
      return generateTextPrompt(f, model, language);
    case "code":
      return generateCodePrompt(f, model, language);
    default:
      return "";
  }
}
