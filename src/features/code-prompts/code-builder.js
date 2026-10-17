// ============================================================
// PromptMax - Constructor de Prompts de Programación (Skill.md § 9)
// ============================================================

import { OPTS } from "../../data/options.js";
import { renderField, renderAccordion } from "../../components/fields.js";

export function renderCodeBuilder(container, state, onUpdate) {
  const f = state.fields.code;

  container.appendChild(
    renderAccordion({
      title: "Tarea y problema de software",
      open: true,
      children: [
        renderField({
          id: "code-taskType",
          label: "Tipo de tarea",
          kind: "select",
          value: f.taskType,
          options: OPTS.codeTaskType,
          onInput: (v) => { f.taskType = v; onUpdate(); }
        }),
        renderField({
          id: "code-projectName",
          label: "Nombre del proyecto",
          value: f.projectName,
          placeholder: "MiProyectoApp",
          onInput: (v) => { f.projectName = v; onUpdate(); }
        }),
        renderField({
          id: "code-problem",
          label: "Problema que debe resolver",
          value: f.problem,
          kind: "textarea",
          placeholder: "Describe la necesidad técnica o el error a solucionar",
          onInput: (v) => { f.problem = v; onUpdate(); }
        }),
        renderField({
          id: "code-appType",
          label: "Tipo de aplicación",
          value: f.appType,
          placeholder: "Single Page Application (SPA), API REST, CLI, librería…",
          onInput: (v) => { f.appType = v; onUpdate(); }
        })
      ]
    })
  );

  container.appendChild(
    renderAccordion({
      title: "Stack y arquitectura",
      children: [
        renderField({
          id: "code-stack",
          label: "Stack tecnológico",
          value: f.stack,
          placeholder: "TypeScript, Vite, React, Vitest, CSS nativo…",
          onInput: (v) => { f.stack = v; onUpdate(); }
        }),
        renderField({
          id: "code-architecture",
          label: "Arquitectura y patrones",
          value: f.architecture,
          kind: "textarea",
          placeholder: "Modular por funcionalidades, Clean Architecture, Serverless…",
          onInput: (v) => { f.architecture = v; onUpdate(); }
        }),
        renderField({
          id: "code-folderStructure",
          label: "Estructura de carpetas recomendada",
          value: f.folderStructure,
          kind: "textarea",
          placeholder: "src/core, src/components, src/data, src/tests…",
          onInput: (v) => { f.folderStructure = v; onUpdate(); }
        })
      ]
    })
  );

  container.appendChild(
    renderAccordion({
      title: "Funcionalidades y calidad",
      children: [
        renderField({
          id: "code-mustFeatures",
          label: "Funcionalidades obligatorias",
          value: f.mustFeatures,
          kind: "textarea",
          placeholder: "1. Autenticación JWT\n2. CRUD de productos\n3. Exportación a CSV",
          onInput: (v) => { f.mustFeatures = v; onUpdate(); }
        }),
        renderField({
          id: "code-optionalFeatures",
          label: "Funcionalidades opcionales",
          value: f.optionalFeatures,
          kind: "textarea",
          placeholder: "Modo oscuro automático, filtros avanzados…",
          onInput: (v) => { f.optionalFeatures = v; onUpdate(); }
        }),
        renderField({
          id: "code-security",
          label: "Seguridad y prevención",
          value: f.security,
          placeholder: "Sanitización de inputs, prevención XSS, cabeceras CORS, sin eval()",
          onInput: (v) => { f.security = v; onUpdate(); }
        }),
        renderField({
          id: "code-tests",
          label: "Estrategia de pruebas automatizadas",
          value: f.tests,
          kind: "textarea",
          placeholder: "Pruebas unitarias con Vitest y E2E con Playwright",
          onInput: (v) => { f.tests = v; onUpdate(); }
        })
      ]
    })
  );

  container.appendChild(
    renderAccordion({
      title: "Criterios de aceptación y entrega",
      children: [
        renderField({
          id: "code-acceptance",
          label: "Criterios de aceptación verificables",
          value: f.acceptance,
          kind: "textarea",
          placeholder: "Build pasa sin errores, tests 100% verdes, cero warnings en consola",
          onInput: (v) => { f.acceptance = v; onUpdate(); }
        }),
        renderField({
          id: "code-deliverables",
          label: "Entregables esperados",
          value: f.deliverables,
          placeholder: "Código limpio, tests, archivo README con guía de instalación",
          onInput: (v) => { f.deliverables = v; onUpdate(); }
        }),
        renderField({
          id: "code-constraints",
          label: "Restricciones técnicas",
          value: f.constraints,
          kind: "textarea",
          placeholder: "No usar dependencias pesadas innecesarias, mantener compatibilidad",
          onInput: (v) => { f.constraints = v; onUpdate(); }
        }),
        renderField({
          id: "code-avoid",
          label: "Prácticas a evitar",
          value: f.avoid,
          kind: "textarea",
          placeholder: "código espagueti, librerías abandonadas, mutaciones globales",
          onInput: (v) => { f.avoid = v; onUpdate(); }
        })
      ]
    })
  );
}
