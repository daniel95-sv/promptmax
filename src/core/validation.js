/**
 * Motor de validación, métricas y detección de contradicciones para PromptMax
 * Cumple con Skill.md Secciones 5.D, 10, 22.
 */

import { MODEL_PROFILES } from "../data/models.js";

export function analyzePrompt(prompt = "", state = {}) {
  const items = [];
  const text = String(prompt || "").trim();

  if (!text) {
    items.push({
      type: "info",
      title: "Sin prompt generado",
      text: "Rellena los campos principales del formulario para estructurar el prompt."
    });
    return items;
  }

  const cat = state.category || "image";
  const f = state.fields?.[cat] || {};
  const modelId = state.models?.[cat] || "generic";

  // A. Objetivo detectado (§ 5.D)
  let detectedGoal = "";
  if (cat === "image") {
    detectedGoal = f.subject ? `Generación visual de «${f.subject}»` : "Generación de imagen visual";
  } else if (cat === "video") {
    detectedGoal = f.concept ? `Producción audiovisual de «${f.concept}»` : "Generación de video continuo";
  } else if (cat === "text") {
    detectedGoal = f.objective ? `Instrucción de texto: «${f.objective.slice(0, 50)}»` : "Redacción / Razonamiento de texto";
  } else if (cat === "code") {
    detectedGoal = f.problem ? `Desarrollo de software: «${f.problem.slice(0, 50)}»` : "Ingeniería de software y código";
  }

  items.push({
    type: "info",
    title: "Objetivo detectado",
    text: detectedGoal
  });

  // B. Modelo seleccionado y verificación (§ 4, § 5.D)
  const modelProfile = (MODEL_PROFILES[cat] || []).find((m) => m.id === modelId);
  const modelName = modelProfile ? modelProfile.name : modelId;
  const verifiedNotice = modelProfile?.verified
    ? `Verificado (${modelProfile.revisionDate}) · ${modelProfile.desc}`
    : "Perfil genérico compatible";

  items.push({
    type: "ok",
    title: `Modelo seleccionado: ${modelName}`,
    text: verifiedNotice
  });

  // C. Detección de campos clave faltantes (§ 5.D)
  const missing = [];
  if (cat === "image") {
    if (!f.subject) missing.push("sujeto principal");
    if (!f.style) missing.push("estilo visual");
    if (!f.lighting) missing.push("iluminación");
    if (!f.shot) missing.push("encuadre / plano");
  } else if (cat === "video") {
    if (!f.concept) missing.push("concepto");
    if (!f.action) missing.push("acción principal");
    if (!f.cameraMotion) missing.push("movimiento de cámara");
  } else if (cat === "text") {
    if (!f.role) missing.push("rol o especialidad");
    if (!f.objective) missing.push("objetivo");
    if (!f.outputFormat) missing.push("formato de salida");
  } else if (cat === "code") {
    if (!f.problem) missing.push("problema a resolver");
    if (!f.stack) missing.push("stack tecnológico");
    if (!f.acceptance) missing.push("criterios de aceptación verificables");
  }

  if (missing.length) {
    items.push({
      type: "warn",
      title: "Información faltante recomendada",
      text: `Para mayor precisión del modelo, añade: ${missing.join(", ")}.`
    });
  } else {
    items.push({
      type: "ok",
      title: "Campos esenciales completos",
      text: "Los parámetros fundamentales de la tarea están definidos."
    });
  }

  // D. Detección de contradicciones técnicas y físicas (§ 5.D, § 6)
  const contradictions = [];
  if (cat === "image") {
    // Bokeh con gran plano general
    if (f.dof && /bokeh|reducida/i.test(f.dof) && (f.shot === "Gran plano general" || f.shot === "Plano general")) {
      contradictions.push("Bokeh pronunciado en plano general: suele ser físicamente contradictorio sin lentes macro colosales.");
    }
    // Silueta con microdetalle facial
    if (f.lighting === "Silueta" && f.detail && /microdetalle|poros|arrugas/i.test(f.detail)) {
      contradictions.push("Iluminación en silueta con microdetalle: la ausencia de luz frontal anula los detalles finos.");
    }
    // Lente macro con gran plano general
    if (f.lens === "Macro" && (f.shot === "Gran plano general" || f.shot === "Plano general")) {
      contradictions.push("Lente Macro configurada para un plano general o panorámico.");
    }
    // Estilos antagónicos simultáneos
    if (f.style && /pixel art/i.test(f.style) && /hiperrealista|fotorrealista/i.test(f.quality || "")) {
      contradictions.push("Estilo Pixel Art combinado con acabado fotorrealista hiperdetallado.");
    }
  } else if (cat === "code") {
    if (f.taskType === "refactor" && f.mustFeatures && f.mustFeatures.length > 50) {
      contradictions.push("Tarea de Refactorización con definición extensa de nuevas funcionalidades obligatorias (sugiere cambio de alcance).");
    }
  }

  if (contradictions.length) {
    items.push({
      type: "err",
      title: "Posibles contradicciones detectadas",
      text: contradictions.join(" ")
    });
  }

  // E. Métricas de longitud y densidad (§ 5.D)
  const chars = text.length;
  const words = text.split(/\s+/).filter(Boolean).length;
  let densityLabel = "Conciso";
  if (words > 120) densityLabel = "Extenso / Detallado";
  else if (words > 40) densityLabel = "Longitud óptima";

  items.push({
    type: "info",
    title: `Métricas del Prompt (${densityLabel})`,
    text: `${chars} caracteres · ${words} palabras.`
  });

  // F. Verificación de compatibilidad de sintaxis por modelo (§ 5.D)
  if (cat === "image") {
    if (modelId === "midjourney") {
      const hasAr = /--ar\s+\d+:\d+/.test(text);
      if (hasAr) {
        items.push({
          type: "ok",
          title: "Sintaxis Midjourney válida",
          text: "Parámetro de relación de aspecto (--ar) inyectado según la especificación oficial."
        });
      }
    } else if (modelId === "sdxl" && f.avoid) {
      items.push({
        type: "info",
        title: "Separación para Stable Diffusion XL",
        text: "SDXL rinde mejor separando el Negative Prompt en su campo dedicado de la UI externa."
      });
    } else if (modelId === "flux" && f.inImageText) {
      items.push({
        type: "ok",
        title: "Optimización FLUX activa",
        text: "Texto en imagen delimitado entre comillas para renderizado tipográfico nativo."
      });
    }
  } else if (cat === "text") {
    if (modelId === "claude") {
      items.push({
        type: "ok",
        title: "Estructura XML para Claude",
        text: "Instrucciones delimitadas por etiquetas semánticas para mayor fidelidad de seguimiento."
      });
    }
  }

  // G. Recomendaciones de mejora (§ 5.D)
  if (words < 15) {
    items.push({
      type: "info",
      title: "Recomendación de mejora",
      text: "Un prompt muy breve puede generar ambigüedad; considera detallar el contexto, estilo o restricciones."
    });
  } else if (!f.avoid && (cat === "image" || cat === "video")) {
    items.push({
      type: "info",
      title: "Elemento opcional sugerido",
      text: "Añadir elementos a evitar (negative prompt) ayuda a prevenir artefactos indeseados."
    });
  }

  return items;
}
