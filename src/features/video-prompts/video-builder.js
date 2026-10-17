// ============================================================
// PromptMax - Constructor de Prompts de Video (Skill.md § 7)
// ============================================================

import { OPTS } from "../../data/options.js";
import { renderField, renderChips, renderAccordion } from "../../components/fields.js";
import { toast } from "../../components/toast.js";

export function renderVideoBuilder(container, state, onUpdate) {
  const f = state.fields.video;

  container.appendChild(
    renderAccordion({
      title: "Concepto y escena",
      open: true,
      children: [
        renderField({
          id: "vid-concept",
          label: "Concepto general del video",
          value: f.concept,
          placeholder: "Presentación comercial, escena dramática, documental natural…",
          onInput: (v) => { f.concept = v; onUpdate(); }
        }),
        renderField({
          id: "vid-initialScene",
          label: "Escena o fotograma inicial",
          value: f.initialScene,
          kind: "textarea",
          placeholder: "Cómo inicia el primer fotograma de la toma",
          onInput: (v) => { f.initialScene = v; onUpdate(); }
        }),
        renderField({
          id: "vid-action",
          label: "Acción principal y movimiento",
          value: f.action,
          kind: "textarea",
          placeholder: "Qué sucede a lo largo de la toma",
          onInput: (v) => { f.action = v; onUpdate(); }
        }),
        renderField({
          id: "vid-sequence",
          label: "Secuencia temporal",
          value: f.sequence,
          kind: "textarea",
          placeholder: "Planteamiento → desarrollo → desenlace",
          onInput: (v) => { f.sequence = v; onUpdate(); }
        })
      ]
    })
  );

  container.appendChild(
    renderAccordion({
      title: "Cámara y movimiento",
      children: [
        renderChips({
          label: "Movimiento de cámara",
          value: f.cameraMotion,
          options: OPTS.cameraMotion,
          onChange: (v) => { f.cameraMotion = v; onUpdate(); }
        }),
        renderField({
          id: "vid-speed",
          label: "Velocidad y ritmo",
          value: f.speed,
          placeholder: "movimiento fluido, cámara lenta (slow-mo), travelling acelerado…",
          onInput: (v) => { f.speed = v; onUpdate(); }
        }),
        renderField({
          id: "vid-transitions",
          label: "Transiciones",
          value: f.transitions,
          placeholder: "corte directo, disolución suave, barrido…",
          onInput: (v) => { f.transitions = v; onUpdate(); }
        })
      ]
    })
  );

  container.appendChild(
    renderAccordion({
      title: "Estilo y atmósfera",
      children: [
        renderChips({
          label: "Estilo",
          value: f.style,
          options: OPTS.style,
          onChange: (v) => { f.style = v; onUpdate(); }
        }),
        renderChips({
          label: "Iluminación",
          value: f.lighting,
          options: OPTS.lighting,
          onChange: (v) => { f.lighting = v; onUpdate(); }
        }),
        renderChips({
          label: "Atmósfera",
          value: f.atmosphere,
          options: OPTS.atmosphere,
          onChange: (v) => { f.atmosphere = v; onUpdate(); }
        })
      ]
    })
  );

  container.appendChild(
    renderAccordion({
      title: "Audio y diálogos",
      children: [
        renderField({
          id: "vid-sound",
          label: "Sonido ambiente",
          value: f.sound,
          placeholder: "viento silbando, murmullo urbano, olas rompiendo…",
          onInput: (v) => { f.sound = v; onUpdate(); }
        }),
        renderField({
          id: "vid-dialogue",
          label: "Línea de diálogo hablada (si aplica)",
          value: f.dialogue,
          kind: "textarea",
          placeholder: "Frase exacta que el sujeto pronuncia",
          onInput: (v) => { f.dialogue = v; onUpdate(); }
        }),
        renderField({
          id: "vid-language",
          label: "Idioma del diálogo",
          value: f.language,
          placeholder: "español neutro, inglés americano…",
          onInput: (v) => { f.language = v; onUpdate(); }
        })
      ]
    })
  );

  // Accordion de continuidad y clips con botón integrado
  const continuityChildren = [
    renderField({
      id: "vid-duration",
      label: "Duración deseada",
      value: f.duration,
      placeholder: "5s, 10s, 3 clips de 5s…",
      onInput: (v) => { f.duration = v; onUpdate(); }
    }),
    renderChips({
      label: "Relación de aspecto",
      value: f.aspect,
      options: OPTS.aspect,
      onChange: (v) => { f.aspect = v; onUpdate(); }
    }),
    renderField({
      id: "vid-continuity",
      label: "Reglas de continuidad estricta",
      value: f.continuity,
      kind: "textarea",
      placeholder: "Conservar misma vestimenta, iluminación y rasgos faciales entre tomas",
      onInput: (v) => { f.continuity = v; onUpdate(); }
    }),
    renderField({
      id: "vid-avoid",
      label: "Elementos a evitar",
      value: f.avoid,
      kind: "textarea",
      placeholder: "movimientos erráticos de cámara, saltos temporales, deformaciones",
      onInput: (v) => { f.avoid = v; onUpdate(); }
    })
  ];

  // Botón de alternancia de clips
  const clipBtnWrap = document.createElement("div");
  clipBtnWrap.className = "field";
  clipBtnWrap.style.marginTop = "0.6rem";
  const clipBtn = document.createElement("button");
  clipBtn.type = "button";
  clipBtn.className = "btn small";
  clipBtn.id = "clipToggleBtn";
  const isMultiClip = Boolean(f._multiClip);
  clipBtn.setAttribute("aria-pressed", isMultiClip ? "true" : "false");
  clipBtn.textContent = isMultiClip ? "✓ Modo 3 Clips Continuos Activado" : "🎬 Dividir en 3 Clips con Continuidad Estricta";
  clipBtn.addEventListener("click", () => {
    f._multiClip = !f._multiClip;
    clipBtn.setAttribute("aria-pressed", f._multiClip ? "true" : "false");
    clipBtn.textContent = f._multiClip ? "✓ Modo 3 Clips Continuos Activado" : "🎬 Dividir en 3 Clips con Continuidad Estricta";
    state.dirty = false;
    onUpdate();
    toast(f._multiClip ? "División en clips activada." : "Modo clip único activado.");
  });
  clipBtnWrap.appendChild(clipBtn);
  continuityChildren.unshift(clipBtnWrap);

  container.appendChild(
    renderAccordion({
      title: "Continuidad, duración y clips",
      children: continuityChildren
    })
  );
}
