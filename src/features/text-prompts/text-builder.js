// ============================================================
// PromptMax - Constructor de Prompts de Texto y Razonamiento (Skill.md § 8)
// ============================================================

import { OPTS } from "../../data/options.js";
import { renderField, renderChips, renderAccordion } from "../../components/fields.js";

export function renderTextBuilder(container, state, onUpdate) {
  const f = state.fields.text;

  container.appendChild(
    renderAccordion({
      title: "Rol y objetivo",
      open: true,
      children: [
        renderField({
          id: "txt-role",
          label: "Rol o especialidad",
          value: f.role,
          placeholder: "Redactor SEO senior, Investigador biomédico, Consultor de marketing…",
          onInput: (v) => { f.role = v; onUpdate(); }
        }),
        renderField({
          id: "txt-objective",
          label: "Objetivo principal",
          value: f.objective,
          kind: "textarea",
          placeholder: "Qué debe lograr exactamente la respuesta de la IA",
          onInput: (v) => { f.objective = v; onUpdate(); }
        }),
        renderField({
          id: "txt-context",
          label: "Contexto del proyecto",
          value: f.context,
          kind: "textarea",
          placeholder: "Antecedentes, situación actual o información de base",
          onInput: (v) => { f.context = v; onUpdate(); }
        }),
        renderField({
          id: "txt-audience",
          label: "Audiencia objetivo",
          value: f.audience,
          placeholder: "Principiantes, directores ejecutivos, técnicos especialistas…",
          onInput: (v) => { f.audience = v; onUpdate(); }
        })
      ]
    })
  );

  container.appendChild(
    renderAccordion({
      title: "Tarea e instrucciones específicas",
      children: [
        renderField({
          id: "txt-input",
          label: "Datos o texto de entrada",
          value: f.input,
          kind: "textarea",
          placeholder: "Pega aquí el material de trabajo o la información a procesar",
          onInput: (v) => { f.input = v; onUpdate(); }
        }),
        renderField({
          id: "txt-instructions",
          label: "Instrucciones paso a paso (Tarea)",
          value: f.instructions,
          kind: "textarea",
          placeholder: "Pasos secuenciales que el modelo debe seguir",
          onInput: (v) => { f.instructions = v; onUpdate(); }
        }),
        renderField({
          id: "txt-methodology",
          label: "Metodología de trabajo",
          value: f.methodology,
          kind: "textarea",
          placeholder: "Análisis FODA, razonamiento paso a paso (Chain of Thought), etc.",
          onInput: (v) => { f.methodology = v; onUpdate(); }
        })
      ]
    })
  );

  container.appendChild(
    renderAccordion({
      title: "Tono, restricciones y validación",
      children: [
        renderChips({
          label: "Tono de comunicación",
          value: f.tone,
          options: OPTS.textTone,
          onChange: (v) => { f.tone = v; onUpdate(); }
        }),
        renderField({
          id: "txt-depth",
          label: "Nivel de profundidad",
          value: f.depth,
          placeholder: "resumen ejecutivo, análisis detallado, estudio exhaustivo…",
          onInput: (v) => { f.depth = v; onUpdate(); }
        }),
        renderField({
          id: "txt-outputFormat",
          label: "Formato de salida",
          value: f.outputFormat,
          kind: "textarea",
          placeholder: "Markdown con H2 y listas, tabla comparativa, JSON válido…",
          onInput: (v) => { f.outputFormat = v; onUpdate(); }
        }),
        renderField({
          id: "txt-noInvent",
          label: "Instrucción de no invención (anclaje fáctico)",
          value: f.noInvent,
          kind: "textarea",
          placeholder: "No inventar datos, fuentes, nombres ni estadísticas inexistentes",
          onInput: (v) => { f.noInvent = v; onUpdate(); }
        }),
        renderField({
          id: "txt-citations",
          label: "Requisitos de citas y fuentes",
          value: f.citations,
          placeholder: "Citar fuentes verificables y literatura científica",
          onInput: (v) => { f.citations = v; onUpdate(); }
        }),
        renderField({
          id: "txt-avoid",
          label: "Elementos a evitar",
          value: f.avoid,
          kind: "textarea",
          placeholder: "relleno, frases vacías, sesgos, suposiciones sin base",
          onInput: (v) => { f.avoid = v; onUpdate(); }
        })
      ]
    })
  );
}
