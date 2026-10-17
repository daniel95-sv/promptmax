# PromptMax (PromptForge AI)

> **Creador Universal de Prompts Estructurados para Inteligencia Artificial**  
> Diseña, optimiza, valida y exporta prompts profesionales para modelos de imagen, video, texto y programación mediante controles visuales y reglas deterministas. 100% privado y ejecutado en tu navegador.

[![Build & Deploy](https://img.shields.io/badge/Build-Passing-22c55e.svg)](https://github.com/daniel95-sv/promptmax)
[![Tests](https://img.shields.io/badge/Tests-26%20Passed-6366f1.svg)](https://github.com/daniel95-sv/promptmax)
[![WCAG](https://img.shields.io/badge/Accessibility-WCAG%202.2%20AA-06b6d4.svg)](#accesibilidad)
[![License](https://img.shields.io/badge/License-MIT-gray.svg)](LICENSE)

---

## 📋 Tabla de Contenidos

1. [Descripción y Visión](#descripción-y-visión)
2. [Características Principales](#características-principales)
3. [Modelos y Compatibilidad](#modelos-y-compatibilidad)
4. [Arquitectura Técnica](#arquitectura-técnica)
5. [Requisitos del Entorno](#requisitos-del-entorno)
6. [Instalación y Uso Local](#instalación-y-uso-local)
7. [Pruebas Automatizadas](#pruebas-automatizadas)
8. [Compilación para Producción](#compilación-para-producción)
9. [Guía de Extensión](#guía-de-extensión)
   - [Cómo Añadir Nuevos Modelos de IA](#cómo-añadir-nuevos-modelos-de-ia)
   - [Cómo Crear Nuevas Plantillas](#cómo-crear-nuevas-plantillas)
10. [Seguridad y Privacidad](#seguridad-y-privacidad)
11. [Despliegue](#despliegue)
12. [Registro de Decisiones Técnicas](#registro-de-decisiones-técnicas)

---

## 🎯 Descripción y Visión

**PromptMax** resuelve la disparidad entre modelos de Inteligencia Artificial mediante una interfaz visual unificada. No existe un prompt universal válido para todas las herramientas: cada familia de modelos interpreta los parámetros, tokens y directrices de forma distinta.

PromptMax transforma especificaciones en lenguaje natural mediante controles visuales accesibles (selectores, tags, campos reactivos y acordeones) y las traduce con adaptadores dedicados para:
- **Imágenes**: Midjourney, FLUX, Stable Diffusion XL, Nano Banana, DALL-E.
- **Video**: Runway Gen-3, Sora, Kling, Veo (con división continua en clips).
- **Texto y Razonamiento**: ChatGPT, Claude (bloques semánticos XML), Gemini.
- **Programación y Asistentes**: Claude Code, Codex, Asistentes de terminal con directrices de seguridad y criterios de aceptación verificables.

---

## ✨ Características Principales

- **Constructor Visual Multicategoría**: Formularios inteligentes específicos que adaptan sus secciones según la categoría activa.
- **Motor Determinista Offline**: Generación instantánea en el navegador sin depender de claves de API externas ni servidores intermediarios.
- **Detección de Contradicciones y Advertencias en Tiempo Real**: Alerta sobre conflictos visuales o técnicos (ej. *Bokeh* con *Gran Plano General*, o *Silueta* con *Microdetalle*).
- **Herramienta "Mejorar mi Prompt"**:
  - Estructuración en viñetas y bloques.
  - Mayor precisión técnica eliminando términos ambiguos.
  - Eliminación de redundancias y palabras de relleno.
  - Especificación técnica profesional (lentes, sensores, contratos de arquitectura).
  - Versión concisa de alto impacto.
  - Expansión detallada con atmósfera y microdetalle.
  - Traducción contextual (Español ⇄ Inglés).
  - Adaptación automática a sintaxis del modelo activo.
- **Biblioteca de Plantillas Filtrable y Buscable**: Más de 14 plantillas profesionales categorizadas con buscador en tiempo real.
- **Herramientas de Productividad**:
  - Copiado instantáneo al portapapeles.
  - Descarga directa en texto plano (`.txt`).
  - **Descarga estructurada en Markdown (`.md`)**.
  - **Exportación de configuración en JSON (`.json`)**.
  - Impresión optimizada (`window.print()`).
  - Cambio instantáneo de idioma de salida (Español / Inglés).
- **Diseño Moderno & Accesible**:
  - Tema Claro y Oscuro con detección de preferencias del sistema (`prefers-color-scheme`).
  - Navegación por teclado completa y cumplimiento WCAG 2.2 AA.
  - 100% responsive en móvil, tableta y escritorio.

---

## 🤖 Modelos y Compatibilidad

| Categoría | Modelo | Sintaxis Soportada | Parámetros Dedicados |
| :--- | :--- | :--- | :--- |
| **Imagen** | **Midjourney** | `--ar [x:y]`, `--style raw`, `--v 6.1`, `--no` | Relación de aspecto, exclusiones en flag |
| **Imagen** | **FLUX** | Lenguaje natural denso + tipografía entrecomillada | Texto visible en imagen, fidelidad anatómica |
| **Imagen** | **SDXL** | Positive Prompt + Negative Prompt separado | Separación limpia de términos de exclusión |
| **Imagen** | **OpenAI / DALL-E** | Descripción fluida y contextual | Sin flags técnicos invasivos |
| **Video** | **Runway Gen-3** | `[Camera Motion] + [Action] + [Lighting]` | Movimiento de cámara, velocidad, duración |
| **Video** | **Sora** | Narrativa temporal y física continua | Persistencia de sujeto, física de fluidos |
| **Video** | **Veo** | Cinematografía + Audio integrado | Sonido ambiente, diálogos con acento |
| **Texto** | **Claude** | Etiquetas XML semánticas `<role>`, `<task>`, `<rules>` | Razonamiento guiado y reducción de alucinaciones |
| **Texto** | **ChatGPT / Gemini** | Encabezados Markdown y Few-Shot examples | Estructura H2/H3 y criterios de aceptación |
| **Código** | **Claude Code** | Análisis previo → Plan → Implementación → Tests | Criterios verificables y seguridad de repo |
| **Código** | **Codex / Asistentes** | Contratos de tipos, casos de prueba y modularidad | Restricciones de stack y cobertura de tests |

---

## 🏛 Arquitectura Técnica

El proyecto sigue una arquitectura modular desacoplada:

```
PromptMax/
├── public/                 # Recursos estáticos y SEO
│   ├── robots.txt          # Reglas para motores de búsqueda
│   └── sitemap.xml         # Mapa del sitio XML
├── src/
│   ├── data/
│   │   ├── models.js       # Perfiles de IA, parámetros y capacidades
│   │   ├── options.js      # Catálogos de estilos, cámaras, lentes, etc.
│   │   └── templates.js    # Plantillas profesionales preconfiguradas
│   ├── core/
│   │   ├── prompt-engine.js# Motor puro de composición de prompts
│   │   ├── validation.js   # Detección de contradicciones y métricas
│   │   ├── optimization.js # Transformaciones de "Mejorar mi prompt"
│   │   └── storage.js      # Persistencia local y serialización JSON
│   ├── tests/              # Suite de pruebas automatizadas
│   │   ├── prompt-engine.test.js
│   │   ├── validation.test.js
│   │   ├── optimization.test.js
│   │   └── storage.test.js
│   └── main.js             # Controlador DOM y eventos de la interfaz
├── index.html              # Interfaz web responsiva semántica
├── package.json            # Scripts de build, test y dependencias
├── vite.config.js          # Configuración del empaquetador Vite
└── Skill.md                # Especificación maestra de requerimientos
```

---

## 💻 Requisitos del Entorno

- **Node.js**: v18.0.0 o superior (recomendado v20+ o v24).
- **NPM**: v9.0.0 o superior.
- **Navegador**: Cualquier navegador moderno compatible con ES2022 (Chrome, Firefox, Safari, Edge).

---

## 🚀 Instalación y Uso Local

1. **Clonar el repositorio**:
   ```bash
   git clone https://github.com/daniel95-sv/promptmax.git
   cd promptmax
   ```

2. **Instalar dependencias**:
   ```bash
   npm install
   ```

3. **Iniciar servidor de desarrollo**:
   ```bash
   npm run dev
   ```
   Abre [http://localhost:5173](http://localhost:5173) en tu navegador.

---

## 🧪 Pruebas Automatizadas

PromptMax incluye una suite completa de pruebas unitarias configurada con **Vitest**:

```bash
npm test
```

### Cobertura de pruebas:
- **`prompt-engine.test.js`**: Generación de prompts para las 4 categorías, inyección de flags Midjourney (`--ar`, `--no`), formato Claude XML y reglas de software.
- **`validation.test.js`**: Validación de campos faltantes, detección de contradicciones visuales (*Bokeh* + *Gran plano general*, *Silueta* + *Microdetalle*) y métricas de palabras/caracteres.
- **`optimization.test.js`**: Las 9 operaciones de transformación y optimización de prompts.
- **`storage.test.js`**: Persistencia, sanitización de nombres de archivo y exportación de payload JSON.

---

## 📦 Compilación para Producción

Para generar el bundle optimizado y minificado:

```bash
npm run build
```

El resultado se genera en la carpeta `dist/` listo para desplegar en cualquier servidor estático.

Para previsualizar el build de producción localmente:
```bash
npm run preview
```

---

## 🛠 Guía de Extensión

### Cómo Añadir Nuevos Modelos de IA
Edita [src/data/models.js](src/data/models.js) y añade la configuración en `MODEL_PROFILES[categoria]`:

```javascript
{
  id: "mi-nuevo-modelo",
  name: "Nombre del Modelo",
  cat: "Imagen", // o "Video", "Texto", "Programación"
  desc: "Breve descripción de capacidades.",
  syntax: "Sintaxis recomendada",
  parameters: ["param1", "param2"],
  supportsNegative: true,
  lastReviewed: "2026-10",
  verified: true
}
```

### Cómo Crear Nuevas Plantillas
Edita [src/data/templates.js](src/data/templates.js) e inserta un nuevo objeto en el array `TEMPLATES`:

```javascript
{
  id: "tpl-mi-plantilla",
  cat: "image", // "image" | "video" | "text" | "code"
  title: "Nombre de la plantilla",
  desc: "Descripción de lo que logra.",
  data: {
    subject: "Descripción del sujeto...",
    style: "Fotografía cinematográfica",
    lighting: "Rembrandt",
    aspect: "16:9"
  }
}
```

---

## 🔒 Seguridad y Privacidad

- **Zero Telemetría no consentida**: No se envían datos ni prompts a servidores externos.
- **Almacenamiento Local Seguro**: Todos los borradores se almacenan exclusivamente en el `localStorage` del dispositivo del usuario.
- **Derecho de Supresión Total**: Botón «Limpiar» para purgar instantáneamente el almacenamiento local.
- **Sin `eval()`**: Cero interpretación de código arbitrario. Prevención estricta de XSS mediante escapado HTML en todas las inyecciones dinámicas.

---

## 🌐 Despliegue

### Despliegue en Cloudflare Pages
1. Conecta el repositorio de GitHub en el panel de Cloudflare Pages.
2. Comando de compilación: `npm run build`
3. Directorio de salida: `dist`

### Despliegue en Vercel / Netlify
- Build Command: `npm run build`
- Output Directory: `dist`

---

## 📝 Registro de Decisiones Técnicas (ADR)

1. **Modularización ES6 pura con Vite**: Desacoplamiento del motor matemático/textual de la capa de presentación DOM para permitir pruebas unitarias sin emulación pesada de navegador.
2. **Generación Determinista sin API externa obligatoria**: Asegura disponibilidad 100%, coste cero para el usuario y máxima velocidad sin latencia de red.
3. **Formatos de exportación nativos**: Implementación de descargas directas en `.txt`, `.md` y `.json` usando `Blob` y URLs de objeto revocables para garantizar compatibilidad universal en navegadores.
4. **Cumplimiento estricto de Skill.md**: Implementación integral de las 29 secciones y los 24 criterios de aceptación definidos en el pliego de requerimientos.

---

© 2026 PromptMax — Proyecto de código abierto.
