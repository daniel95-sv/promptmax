/**
 * Módulo de almacenamiento local, persistencia y exportación para PromptMax
 * Cumple con Skill.md Secciones 16, 22.
 */

export const STORAGE_KEYS = {
  state: "pm_state_v1",
  theme: "pm_theme",
  consent: "pm_cookie_consent",
  drafts: "pm_saved_drafts"
};

export function initialFields() {
  return {
    image: {
      subject: "",
      subjectCount: "",
      appearance: "",
      action: "",
      setting: "",
      era: "",
      background: "",
      relationship: "",
      style: "",
      styleIntensity: "",
      shot: "",
      angle: "",
      lens: "",
      dof: "",
      lighting: "",
      composition: "",
      color: "",
      atmosphere: "",
      materials: "",
      detail: "",
      quality: "",
      aspect: "16:9",
      resolution: "",
      variations: "",
      seed: "",
      inImageText: "",
      references: "",
      consistency: "",
      avoid: ""
    },
    video: {
      concept: "",
      initialScene: "",
      action: "",
      sequence: "",
      characterMotion: "",
      cameraMotion: "",
      direction: "",
      speed: "",
      transitions: "",
      lighting: "",
      style: "",
      atmosphere: "",
      sound: "",
      dialogue: "",
      language: "es",
      initialFrame: "",
      finalFrame: "",
      references: "",
      continuity: "",
      duration: "10s",
      aspect: "16:9",
      avoid: "",
      _multiClip: false
    },
    text: {
      role: "",
      objective: "",
      context: "",
      audience: "",
      input: "",
      instructions: "",
      methodology: "",
      tone: "Profesional",
      depth: "Detallado",
      constraints: "",
      outputFormat: "Markdown estructurado",
      examples: "",
      quality: "",
      acceptance: "",
      missingInfo: "",
      noInvent: "No inventar datos ni citas bibliográficas.",
      citations: "",
      tools: "",
      askClarifications: "",
      avoid: ""
    },
    code: {
      taskType: "create",
      projectName: "",
      problem: "",
      appType: "",
      stack: "",
      architecture: "",
      folderStructure: "",
      mustFeatures: "",
      optionalFeatures: "",
      integrations: "",
      dataModel: "",
      api: "",
      security: "",
      accessibility: "",
      seo: "",
      performance: "",
      tests: "",
      deployment: "",
      acceptance: "",
      deliverables: "",
      constraints: "",
      references: "",
      avoid: ""
    }
  };
}

export function initialState() {
  return {
    category: "image",
    language: "en",
    models: {
      image: "generic",
      video: "generic",
      text: "generic",
      code: "generic"
    },
    fields: initialFields(),
    dirty: false,
    manualPrompt: ""
  };
}

export function safeGet(key, fallback = null) {
  try {
    const val = localStorage.getItem(key);
    return val !== null ? val : fallback;
  } catch {
    return fallback;
  }
}

export function safeSet(key, value) {
  try {
    localStorage.setItem(key, typeof value === "string" ? value : JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

export function safeDel(key) {
  try {
    localStorage.removeItem(key);
    return true;
  } catch {
    return false;
  }
}

export function loadStoredState() {
  const raw = safeGet(STORAGE_KEYS.state);
  if (!raw) return initialState();
  try {
    const parsed = JSON.parse(raw);
    const base = initialState();
    return {
      category: parsed.category || base.category,
      language: parsed.language || base.language,
      models: { ...base.models, ...(parsed.models || {}) },
      fields: {
        image: { ...base.fields.image, ...(parsed.fields?.image || {}) },
        video: { ...base.fields.video, ...(parsed.fields?.video || {}) },
        text: { ...base.fields.text, ...(parsed.fields?.text || {}) },
        code: { ...base.fields.code, ...(parsed.fields?.code || {}) }
      },
      dirty: Boolean(parsed.dirty),
      manualPrompt: parsed.manualPrompt || ""
    };
  } catch {
    return initialState();
  }
}

export function persistState(state) {
  return safeSet(STORAGE_KEYS.state, JSON.stringify(state));
}

export function clearAllLocalData() {
  try {
    localStorage.removeItem(STORAGE_KEYS.state);
    localStorage.removeItem(STORAGE_KEYS.drafts);
    return true;
  } catch {
    return false;
  }
}

export function sanitizeFilename(name = "prompt") {
  return String(name)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9_-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 50) || "prompt";
}

export function createExportPayload(state, promptText) {
  const cat = state.category;
  return {
    generator: "PromptMax",
    version: "2.0.0",
    generatedAt: new Date().toISOString(),
    category: cat,
    language: state.language,
    model: state.models?.[cat] || "generic",
    fields: state.fields?.[cat] || {},
    prompt: promptText || "",
    isManualEdit: Boolean(state.dirty)
  };
}
