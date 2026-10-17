// ============================================================
// PromptMax - Constructor de Prompts de Imagen (Skill.md § 6)
// ============================================================

import { OPTS } from "../../data/options.js";
import { renderField, renderChips, renderAccordion } from "../../components/fields.js";

export function renderImageBuilder(container, state, onUpdate) {
  const f = state.fields.image;

  container.appendChild(
    renderAccordion({
      title: "Sujeto y escena",
      open: true,
      children: [
        renderField({
          id: "img-subject",
          label: "Sujeto principal",
          value: f.subject,
          placeholder: "persona, personaje, animal, producto, edificio…",
          onInput: (v) => { f.subject = v; onUpdate(); }
        }),
        renderField({
          id: "img-subjectCount",
          label: "Cantidad de sujetos",
          value: f.subjectCount,
          placeholder: "1, 2, grupo, multitud…",
          onInput: (v) => { f.subjectCount = v; onUpdate(); }
        }),
        renderField({
          id: "img-appearance",
          label: "Apariencia, rasgos y vestimenta",
          value: f.appearance,
          placeholder: "edad aparente, ropa, expresión facial, accesorios…",
          onInput: (v) => { f.appearance = v; onUpdate(); }
        }),
        renderField({
          id: "img-action",
          label: "Acción o pose",
          value: f.action,
          placeholder: "qué está haciendo el sujeto",
          onInput: (v) => { f.action = v; onUpdate(); }
        }),
        renderField({
          id: "img-setting",
          label: "Escenario o localización",
          value: f.setting,
          placeholder: "dónde sucede la escena",
          onInput: (v) => { f.setting = v; onUpdate(); }
        }),
        renderField({
          id: "img-era",
          label: "Época y contexto temporal",
          value: f.era,
          placeholder: "medieval, cyberpunk 2077, años 80, futuro distante…",
          onInput: (v) => { f.era = v; onUpdate(); }
        }),
        renderField({
          id: "img-background",
          label: "Fondo y entorno",
          value: f.background,
          placeholder: "paisaje montañoso, estudio neutro, calle lluviosa…",
          onInput: (v) => { f.background = v; onUpdate(); }
        }),
        renderField({
          id: "img-relationship",
          label: "Relación y distancia entre elementos",
          value: f.relationship,
          placeholder: "sujeto en primer plano interactuando con el fondo…",
          onInput: (v) => { f.relationship = v; onUpdate(); }
        })
      ]
    })
  );

  container.appendChild(
    renderAccordion({
      title: "Estilo visual",
      children: [
        renderChips({
          label: "Estilo principal",
          value: f.style,
          options: OPTS.style,
          onChange: (v) => { f.style = v; onUpdate(); }
        }),
        renderField({
          id: "img-styleIntensity",
          label: "Intensidad estilística (opcional)",
          value: f.styleIntensity,
          placeholder: "sutil, marcado, extremo…",
          onInput: (v) => { f.styleIntensity = v; onUpdate(); }
        })
      ]
    })
  );

  container.appendChild(
    renderAccordion({
      title: "Cámara y encuadre",
      children: [
        renderChips({
          label: "Plano / Encuadre",
          value: f.shot,
          options: OPTS.shot,
          onChange: (v) => { f.shot = v; onUpdate(); }
        }),
        renderField({
          id: "img-angle",
          label: "Ángulo de cámara",
          value: f.angle,
          placeholder: "a nivel de ojos, contrapicado sutil, cenital…",
          onInput: (v) => { f.angle = v; onUpdate(); }
        })
      ]
    })
  );

  container.appendChild(
    renderAccordion({
      title: "Lente y perspectiva",
      children: [
        renderChips({
          label: "Lente objetivo",
          value: f.lens,
          options: OPTS.lens,
          onChange: (v) => { f.lens = v; onUpdate(); }
        }),
        renderChips({
          label: "Profundidad de campo y desenfoque",
          value: f.dof,
          options: OPTS.dof,
          onChange: (v) => { f.dof = v; onUpdate(); }
        })
      ]
    })
  );

  container.appendChild(
    renderAccordion({
      title: "Iluminación",
      children: [
        renderChips({
          label: "Tipo de luz",
          value: f.lighting,
          options: OPTS.lighting,
          onChange: (v) => { f.lighting = v; onUpdate(); }
        })
      ]
    })
  );

  container.appendChild(
    renderAccordion({
      title: "Composición",
      children: [
        renderChips({
          label: "Regla de composición",
          value: f.composition,
          options: OPTS.composition,
          onChange: (v) => { f.composition = v; onUpdate(); }
        })
      ]
    })
  );

  container.appendChild(
    renderAccordion({
      title: "Color y atmósfera",
      children: [
        renderChips({
          label: "Paleta cromática",
          value: f.color,
          options: OPTS.color,
          onChange: (v) => { f.color = v; onUpdate(); }
        }),
        renderChips({
          label: "Atmósfera / Estado de ánimo",
          value: f.atmosphere,
          options: OPTS.atmosphere,
          onChange: (v) => { f.atmosphere = v; onUpdate(); }
        })
      ]
    })
  );

  container.appendChild(
    renderAccordion({
      title: "Materiales, detalle y acabado",
      children: [
        renderField({
          id: "img-materials",
          label: "Materiales y texturas",
          value: f.materials,
          placeholder: "madera noble, seda, cristal reflectante, metal oxidado…",
          onInput: (v) => { f.materials = v; onUpdate(); }
        }),
        renderField({
          id: "img-detail",
          label: "Nivel de microdetalle",
          value: f.detail,
          placeholder: "microdetalle facial, gotas de rocío, polvo atmosférico…",
          onInput: (v) => { f.detail = v; onUpdate(); }
        }),
        renderField({
          id: "img-quality",
          label: "Acabado final",
          value: f.quality,
          placeholder: "fotográfico 35mm, render editorial, portada de revista…",
          onInput: (v) => { f.quality = v; onUpdate(); }
        })
      ]
    })
  );

  container.appendChild(
    renderAccordion({
      title: "Formato y exclusiones",
      children: [
        renderChips({
          label: "Relación de aspecto",
          value: f.aspect,
          options: OPTS.aspect,
          onChange: (v) => { f.aspect = v; onUpdate(); }
        }),
        renderField({
          id: "img-inImageText",
          label: "Texto visible en la imagen (ideal para FLUX / SDXL)",
          value: f.inImageText,
          placeholder: "Palabra o frase que debe aparecer escrita en la imagen",
          onInput: (v) => { f.inImageText = v; onUpdate(); }
        }),
        renderField({
          id: "img-references",
          label: "Referencias visuales / Consistencia",
          value: f.references,
          placeholder: "Instrucciones de consistencia de personaje o estilo",
          onInput: (v) => { f.references = v; onUpdate(); }
        }),
        renderField({
          id: "img-avoid",
          label: "Elementos a evitar (Negative prompt / --no)",
          value: f.avoid,
          kind: "textarea",
          placeholder: "deformidades, artefactos, piel plástica, baja resolución…",
          onInput: (v) => { f.avoid = v; onUpdate(); }
        })
      ]
    })
  );
}
