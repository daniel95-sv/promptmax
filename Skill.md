# PROMPT MAESTRO DE IMPLEMENTACIÓN
## Creador Universal de Prompts Estructurados para Inteligencia Artificial

**Nombre provisional del proyecto:** PromptForge AI  
**Concepto:** Plataforma visual para diseñar, optimizar, estructurar y exportar prompts profesionales para modelos de inteligencia artificial de imagen, video, texto, programación, audio y tareas multimodales.

---

# 1. ROL Y OBJETIVO PRINCIPAL

Actúa como un equipo multidisciplinario de expertos compuesto por:

- Un arquitecto de software especializado en aplicaciones web modernas.
- Un ingeniero experto en prompt engineering e instrucciones para modelos de IA.
- Un diseñador UI/UX especializado en interfaces SaaS.
- Un especialista en generación de imágenes, videos y contenido multimodal.
- Un ingeniero frontend con experiencia en accesibilidad, rendimiento y SEO.
- Un especialista en seguridad, pruebas automatizadas y despliegues de producción.

Tu misión es **diseñar, desarrollar y entregar una aplicación web completa, funcional, moderna y escalable llamada provisionalmente PromptForge AI**, que permita a cualquier usuario construir prompts profesionales mediante controles visuales, formularios inteligentes, opciones desplegables, plantillas y un editor dinámico.

La aplicación debe transformar las elecciones del usuario en instrucciones claras, detalladas, coherentes y optimizadas para el tipo de tarea y la IA seleccionada.

No construyas únicamente una demostración visual ni una interfaz estática. Implementa funcionalidades reales, valida las entradas y garantiza que los controles produzcan resultados útiles.

# 2. VISIÓN DEL PRODUCTO

El usuario debe poder construir un prompt desde cero sin necesidad de conocer términos técnicos.

Por ejemplo, para generar una imagen puede seleccionar:

- Estilo visual: cinematográfico, hiperrealista, anime, editorial, 3D, ilustración, fotografía de producto, entre otros.
- Sujeto principal: persona, personaje, animal, objeto, producto, paisaje o escena.
- Acción y contexto: qué sucede, dónde sucede y qué elementos aparecen.
- Cámara: primer plano, plano medio, plano general, contrapicado, cenital, POV, entre otros.
- Lente: 24 mm, 35 mm, 50 mm, 85 mm, macro y otras opciones pertinentes.
- Iluminación: luz natural, golden hour, iluminación de estudio, contraluz, neón, volumétrica y más.
- Composición: regla de los tercios, simetría, profundidad, espacio negativo y encuadre.
- Paleta de colores, atmósfera, materiales, texturas, nivel de detalle y acabado.
- Relación de aspecto, resolución objetivo y parámetros compatibles con la herramienta elegida.
- Elementos que se deben evitar.
- Referencias visuales y requisitos de consistencia, cuando la herramienta los admita.

A medida que el usuario selecciona opciones y escribe información, el sistema construirá el prompt automáticamente en una caja de texto editable.

La aplicación debe admitir también tareas de video, redacción, análisis, investigación, programación, creación de personajes, guiones, marketing, audio y otras categorías que puedan representarse mediante instrucciones estructuradas.

**Principio fundamental:** no existe un prompt universal que garantice los mejores resultados en todas las IA. La plataforma debe generar el mejor prompt posible para la tarea, el modelo seleccionado, las restricciones técnicas conocidas y el resultado que el usuario desea obtener.

# 3. PÚBLICO OBJETIVO

La aplicación debe ser útil para:

- Principiantes que desean crear buenos prompts sin conocimientos técnicos.
- Diseñadores, ilustradores y fotógrafos.
- Creadores de contenido para redes sociales.
- Usuarios de herramientas de generación de imágenes y videos.
- Desarrolladores de software.
- Profesionales de marketing y publicidad.
- Redactores, investigadores y estudiantes.
- Empresas que necesitan instrucciones repetibles y estructuradas.
- Usuarios avanzados que desean controlar cada detalle de sus prompts.

Diseña una experiencia accesible para principiantes, pero suficientemente potente para profesionales.

# 4. COMPATIBILIDAD MULTIMODELO

Crea un sistema de perfiles de modelos y herramientas organizado por categorías.

Incluye perfiles configurables para herramientas como las siguientes, sin afirmar compatibilidad específica con parámetros que no hayan sido verificados:

**Imágenes y diseño**
- Midjourney.
- Nano Banana y las variantes disponibles de la familia de modelos correspondiente.
- Modelos de generación de imágenes de OpenAI.
- Stable Diffusion y sus implementaciones compatibles.
- FLUX y otras herramientas de generación visual.

**Video**
- Runway.
- Sora.
- Kling.
- Veo.
- Otras herramientas de video que puedan incorporarse mediante perfiles.

**Texto y tareas generales**
- ChatGPT.
- Claude.
- Gemini.
- Otros modelos conversacionales.

**Programación**
- Claude Code.
- Codex.
- Asistentes de programación compatibles.
- Herramientas de generación, revisión, documentación y depuración de código.

**Otras categorías**
- Generación de audio y voz.
- Música.
- Diseño de personajes.
- Storytelling.
- Marketing.
- SEO.
- Investigación.
- Análisis de documentos.
- Automatización de tareas.
- Creación de agentes e instrucciones de sistema.

Organiza las herramientas por categoría, con búsqueda, iconos y una descripción breve.

Cada perfil debe definir, cuando corresponda:

- Nombre del modelo o herramienta.
- Tipo de tareas compatibles.
- Formato de instrucciones recomendado.
- Parámetros admitidos.
- Límites de longitud conocidos.
- Capacidades para imágenes de referencia, archivos, audio o video.
- Restricciones de formato y relación de aspecto.
- Sintaxis especial.
- Fecha de revisión de la información.
- Fuente documental oficial.
- Estado de verificación de sus capacidades.

Si una herramienta no dispone de información suficiente, utiliza un perfil genérico en lugar de inventar parámetros.

Diseña una arquitectura que permita agregar, actualizar, desactivar o corregir perfiles sin reescribir todo el sistema.

# 5. INTERFAZ PRINCIPAL Y EXPERIENCIA VISUAL

Diseña una interfaz moderna, profesional y minimalista, con apariencia de una herramienta SaaS premium.

La interfaz debe incluir:

## A. Encabezado

- Logotipo y nombre de la plataforma.
- Acceso a Inicio.
- Constructor de prompts.
- Biblioteca de plantillas.
- Mis proyectos locales, si se habilita esta función.
- Documentación o guía.
- Selector de idioma.
- Selector de tema claro y oscuro.
- Acceso a ajustes.

## B. Panel de configuración

En la zona principal debe existir un panel visual con controles organizados por secciones.

Utiliza tarjetas, pestañas, acordeones, selectores, botones desplegables, etiquetas seleccionables, controles deslizantes, campos de texto y selectores de color cuando sean apropiados.

Las secciones deben cambiar según la categoría de tarea.

Para imágenes y videos, incluye inicialmente:

1. Modelo de IA.
2. Tipo de contenido.
3. Sujeto principal.
4. Descripción de la escena.
5. Acción o movimiento.
6. Estilo visual.
7. Cámara y encuadre.
8. Lente y perspectiva.
9. Iluminación.
10. Composición.
11. Color y atmósfera.
12. Texturas y materiales.
13. Calidad y acabado.
14. Formato y dimensiones.
15. Elementos que se deben evitar.
16. Referencias e instrucciones de consistencia.
17. Parámetros específicos del modelo.

Para texto y programación, sustituye las opciones visuales por controles relevantes, como rol, objetivo, contexto, entradas, restricciones, formato de salida, criterios de aceptación, ejemplos y pruebas.

No muestres controles irrelevantes para la categoría seleccionada.

## C. Panel de vista previa del prompt

Debe existir una caja de texto amplia y editable donde el usuario vea el prompt completo en tiempo real.

Incluye:

- Actualización automática.
- Edición manual.
- Resaltado visual de las secciones.
- Contador de palabras y caracteres.
- Indicador de longitud.
- Botón para copiar el prompt.
- Botón para generar o regenerar.
- Botón para limpiar.
- Botón para deshacer o rehacer cambios.
- Botón para duplicar.
- Botón para descargar.
- Botón para guardar localmente, si está habilitado.
- Indicador de cambios pendientes.
- Opción para bloquear secciones que el usuario no quiera modificar.

El editor debe permitir editar el resultado sin perder innecesariamente las opciones que lo generaron.

Cuando el usuario modifique manualmente el texto, conserva la diferencia entre las instrucciones generadas y las modificaciones manuales, para que una actualización no sobrescriba accidentalmente su trabajo.

## D. Panel de análisis

Muestra un resumen útil del prompt:

- Objetivo detectado.
- Modelo seleccionado.
- Información que falta.
- Contradicciones detectadas.
- Restricciones importantes.
- Longitud estimada.
- Compatibilidad de parámetros.
- Recomendaciones de mejora.
- Elementos opcionales que podrían añadirse.

Evita mostrar puntuaciones arbitrarias que aparenten medir científicamente la calidad. Si incorporas una puntuación, explica los criterios utilizados y preséntala como una estimación orientativa.

# 6. CONSTRUCTOR VISUAL PARA IMÁGENES

Desarrolla un sistema especializado de generación de prompts visuales.

## A. Sujeto y escena

Permite especificar:

- Quién o qué aparece.
- Cantidad de sujetos.
- Apariencia y características relevantes.
- Edad aparente, vestimenta y accesorios, cuando corresponda.
- Acción, postura y expresión.
- Ubicación.
- Época y contexto.
- Objetos del entorno.
- Fondo.
- Distancia entre elementos.
- Relación entre personajes u objetos.
- Elementos imprescindibles de la escena.

Debe existir un campo libre para describir el concepto en lenguaje natural.

El sistema debe conservar los detalles que el usuario considera obligatorios.

## B. Estilo visual

Incluye categorías como:

- Fotografía hiperrealista.
- Fotografía cinematográfica.
- Fotografía editorial.
- Fotografía publicitaria.
- Fotografía de producto.
- Retrato profesional.
- Documental.
- Cine noir.
- Cyberpunk.
- Fantasía épica.
- Ciencia ficción.
- Anime.
- Manga.
- Ilustración editorial.
- Acuarela.
- Óleo.
- Arte conceptual.
- Render 3D.
- Estilo minimalista.
- Pixel art.
- Diseño isométrico.
- Arquitectura.
- Moda.
- Arte abstracto.

Añade opciones de intensidad o libertad estilística cuando sean útiles.

No combines automáticamente estilos incompatibles. Si el usuario selecciona dos estilos que pueden entrar en conflicto, ofrece una solución de mezcla o solicita que elija uno como principal.

## C. Cámara y encuadre

Incluye opciones como:

- Primerísimo primer plano.
- Primer plano.
- Plano medio.
- Plano americano.
- Plano entero.
- Plano general.
- Gran plano general.
- Vista cenital.
- Vista desde abajo.
- Contrapicado.
- Picado.
- Ángulo a nivel de los ojos.
- Vista subjetiva o POV.
- Cámara sobre el hombro.
- Composición simétrica.
- Encuadre descentrado.
- Perspectiva aérea.

## D. Lentes y perspectiva

Permite seleccionar lentes y efectos de perspectiva apropiados:

- Ultra gran angular.
- 14 mm.
- 24 mm.
- 35 mm.
- 50 mm.
- 85 mm.
- 135 mm.
- Macro.
- Teleobjetivo.
- Profundidad de campo reducida.
- Profundidad de campo amplia.
- Bokeh.
- Perspectiva comprimida.
- Distorsión óptica intencional.

Incluye explicaciones breves sobre el efecto esperado.

Evita afirmar que el modelo simulará físicamente una cámara o lente de manera exacta. Presenta estos parámetros como orientación visual cuando el generador no los controle directamente.

## E. Iluminación

Incluye:

- Luz natural suave.
- Luz dura.
- Luz de ventana.
- Golden hour.
- Blue hour.
- Contraluz.
- Luz lateral.
- Iluminación de estudio.
- Rembrandt.
- Iluminación cinematográfica.
- Luz volumétrica.
- Rayos de luz.
- Luz de neón.
- Luz de vela.
- Iluminación ambiental.
- Alto contraste.
- Clave alta.
- Clave baja.
- Luz difusa.
- Silueta.
- Iluminación de tres puntos.

## F. Composición

Incluye:

- Regla de los tercios.
- Simetría.
- Líneas guía.
- Espacio negativo.
- Capas de profundidad.
- Primer plano, plano medio y fondo.
- Equilibrio visual.
- Encuadre arquitectónico.
- Diagonales dinámicas.
- Centro de interés.
- Distribución de elementos.
- Jerarquía visual.

## G. Color y atmósfera

Permite elegir:

- Paleta cálida.
- Paleta fría.
- Colores pastel.
- Blanco y negro.
- Monocromático.
- Colores complementarios.
- Tonos tierra.
- Colores vibrantes.
- Desaturado.
- Alto contraste.
- Ambiente melancólico.
- Misterioso.
- Alegre.
- Épico.
- Elegante.
- Futurista.
- Nostálgico.
- Realista.
- Onírico.

Incluye selector de colores personalizados cuando sea útil.

## H. Calidad y detalles

Ofrece opciones descriptivas para:

- Materiales y texturas.
- Microdetalle.
- Nitidez.
- Acabado fotográfico.
- Realismo.
- Complejidad de la escena.
- Limpieza visual.
- Nivel de estilización.

No añadas automáticamente frases redundantes como “8K, ultra HD, masterpiece” si no aportan valor o no corresponden al modelo seleccionado.

## I. Parámetros finales

Permite seleccionar:

- Relación de aspecto.
- Orientación vertical, horizontal o cuadrada.
- Dimensiones compatibles.
- Número de variantes, si la herramienta lo admite.
- Semilla, cuando esté disponible.
- Parámetros específicos del modelo.
- Texto visible dentro de la imagen.
- Exclusiones o elementos no deseados.

Valida los parámetros antes de incluirlos en la salida. Nunca añadas sintaxis especial de un modelo a otro modelo incompatible.

# 7. CONSTRUCTOR ESPECIALIZADO PARA VIDEO

Crea un modo de generación de prompts de video que contemple la temporalidad, la continuidad y el movimiento.

Incluye campos para:

- Concepto general.
- Escena inicial.
- Acción principal.
- Secuencia temporal.
- Movimiento de personajes.
- Movimiento de cámara.
- Dirección de movimiento.
- Velocidad y ritmo.
- Transiciones.
- Iluminación.
- Estilo visual.
- Ambiente.
- Sonido ambiente.
- Diálogo.
- Idioma y acento.
- Duración deseada.
- Relación de aspecto.
- Fotograma inicial y final.
- Referencias visuales.
- Continuidad entre clips.
- Elementos que no deben cambiar.

Ofrece movimientos de cámara como:

- Cámara fija.
- Paneo.
- Inclinación.
- Travelling de acercamiento.
- Travelling de alejamiento.
- Seguimiento del sujeto.
- Órbita.
- Dolly zoom.
- Cámara en mano.
- Movimiento de grúa.
- Perspectiva en primera persona.

Cuando la duración del video sea superior a la que admite la herramienta, ofrece dividir la historia en clips cortos.

Cada clip debe contener:

1. Descripción de la escena.
2. Acción principal.
3. Movimiento de cámara.
4. Duración objetivo.
5. Diálogo y sonido, si corresponde.
6. Condiciones de continuidad.
7. Estado final de la escena.

Incluye una opción de continuidad estricta para que el siguiente clip comience a partir del estado final del clip anterior, conservando posiciones, vestuario, iluminación, objetos, dirección de mirada y otros detalles relevantes.

No afirmes que existe continuidad exacta entre clips independientes si la herramienta no puede garantizarla. Genera instrucciones de continuidad y recomienda utilizar fotogramas de referencia cuando estén disponibles.

# 8. CONSTRUCTOR PARA CHATGPT, CLAUDE, GEMINI Y OTRAS IA DE TEXTO

Crea una interfaz adaptada a tareas de razonamiento, escritura, análisis y productividad.

Permite definir:

- Rol o especialidad.
- Objetivo principal.
- Contexto.
- Audiencia.
- Información de entrada.
- Instrucciones específicas.
- Restricciones.
- Tono.
- Idioma.
- Nivel de profundidad.
- Metodología de trabajo.
- Formato de salida.
- Ejemplos de entrada y salida.
- Criterios de calidad.
- Condiciones de aceptación.
- Qué hacer si faltan datos.
- Qué información no debe inventarse.
- Requisitos de citas y fuentes, si corresponde.
- Herramientas disponibles para el modelo.
- Condiciones para solicitar aclaraciones.

El sistema debe estructurar las instrucciones en bloques claros:

1. Rol.
2. Objetivo.
3. Contexto.
4. Tarea.
5. Datos de entrada.
6. Procedimiento o criterios.
7. Restricciones.
8. Formato de salida.
9. Ejemplos.
10. Validación final.

Utiliza solo las secciones que aporten valor. No fuerces estructuras excesivamente largas en tareas simples.

# 9. CONSTRUCTOR PARA CLAUDE CODE, CODEX Y ASISTENTES DE PROGRAMACIÓN

Añade un modo específico para crear instrucciones de desarrollo de software.

Campos recomendados:

- Nombre del proyecto.
- Problema que debe resolver.
- Tipo de aplicación.
- Stack tecnológico.
- Arquitectura.
- Funcionalidades obligatorias.
- Funcionalidades opcionales.
- Estructura de carpetas.
- Integraciones.
- Modelo de datos.
- API y servicios externos.
- Seguridad.
- Accesibilidad.
- SEO, si aplica.
- Rendimiento.
- Pruebas.
- Despliegue.
- Criterios de aceptación.
- Entregables.
- Restricciones técnicas.
- Archivos o repositorios de referencia.

Permite elegir el tipo de tarea:

- Crear un proyecto nuevo.
- Implementar una funcionalidad.
- Corregir errores.
- Refactorizar código.
- Revisar seguridad.
- Mejorar rendimiento.
- Añadir pruebas.
- Documentar un proyecto.
- Revisar una arquitectura.
- Analizar un repositorio existente.

Genera prompts que exijan analizar el contexto disponible, respetar la arquitectura existente, evitar cambios innecesarios, validar las dependencias y ejecutar las pruebas apropiadas cuando el entorno lo permita.

Incluye criterios de aceptación verificables.

No asumas que el asistente de programación tiene acceso a un repositorio, terminal, archivos o herramientas que no se le hayan proporcionado.

# 10. MOTOR INTELIGENTE DE GENERACIÓN

Implementa un motor de composición de prompts independiente de la interfaz.

No limites el funcionamiento a concatenar cadenas de texto sin estructura.

El motor debe seguir este proceso:

1. Leer las opciones seleccionadas.
2. Interpretar el objetivo del usuario.
3. Normalizar los datos.
4. Identificar información obligatoria y opcional.
5. Detectar contradicciones.
6. Comprobar la compatibilidad con el perfil seleccionado.
7. Ordenar las instrucciones según su importancia.
8. Generar el prompt.
9. Validar la sintaxis y los límites configurados.
10. Presentar el resultado editable.
11. Mostrar recomendaciones cuando sean relevantes.

Implementa reglas deterministas para los controles visuales y deja la generación mediante modelos de lenguaje como una capacidad opcional.

La aplicación debe funcionar sin depender obligatoriamente de una API de IA.

Cuando no exista una API configurada, utiliza el motor local de plantillas y reglas para generar prompts de calidad.

Si se integra un servicio de IA, debe servir para mejorar, analizar, traducir o adaptar los prompts; no debe ser imprescindible para las funciones básicas.

## Reglas de composición

- Priorizar el objetivo principal.
- Conservar los detalles proporcionados por el usuario.
- Eliminar redundancias.
- Evitar instrucciones contradictorias.
- No inventar información que el usuario no haya proporcionado.
- No añadir parámetros incompatibles.
- Diferenciar los requisitos obligatorios de las preferencias.
- Usar términos técnicos precisos cuando aporten valor.
- Adaptar la longitud al propósito.
- Mantener una estructura fácil de editar.
- Producir una salida limpia y lista para copiar.

# 11. GENERACIÓN EN INGLÉS Y EXPERIENCIA EN ESPAÑOL

El idioma de la interfaz y el idioma del prompt deben poder configurarse de forma independiente.

Por defecto:

- Interfaz: español.
- Prompt final para herramientas visuales: inglés.
- Explicaciones de la interfaz: español.
- Prompts para modelos de texto: idioma elegido por el usuario.
- Diálogos y contenido hablado: idioma y variante regional seleccionados por el usuario.

Incluye:

- Botón “Generar en inglés”.
- Botón “Generar en español”.
- Selector de idioma personalizado.
- Opción “Mantener el idioma original”.
- Botón “Traducir sin cambiar el significado”.
- Vista comparativa entre la versión original y la traducida, cuando corresponda.

La traducción no debe cambiar nombres propios, requisitos, acciones, orden temporal, restricciones o parámetros técnicos.

# 12. PROMPT NEGATIVO Y RESTRICCIONES

Añade una sección para definir lo que no debe aparecer o suceder.

Para imágenes, puede incluir elementos visuales no deseados.

Para video, puede incluir errores de continuidad, movimientos no deseados y cambios de identidad.

Para texto, puede definir contenidos que deben excluirse, tono que debe evitarse y afirmaciones que requieren verificación.

Para programación, puede incluir tecnologías prohibidas, modificaciones no autorizadas y restricciones de arquitectura.

Separa el prompt principal de las exclusiones cuando el modelo admita esa separación.

Si la herramienta no admite un campo independiente para prompt negativo, integra las restricciones en lenguaje natural dentro del prompt principal.

No asumas que todos los modelos interpretan de la misma manera los prompts negativos.

# 13. PLANTILLAS PROFESIONALES

Crea una biblioteca inicial de plantillas organizadas por categoría.

Incluye al menos ejemplos para:

**Imagen**
- Retrato cinematográfico.
- Fotografía de producto.
- Publicidad para redes sociales.
- Personaje 3D.
- Anime.
- Arquitectura.
- Paisaje.
- Moda editorial.
- Imagen de marca.
- Miniatura para video.
- Fotografía gastronómica.
- Escena de fantasía.

**Video**
- Anuncio de producto.
- Reel cinematográfico.
- Escena dramática.
- Video de producto.
- Video explicativo.
- Historia dividida en clips.
- Animación de personaje.
- Video con diálogo.
- Secuencia con continuidad visual.

**Texto**
- Artículo SEO.
- Publicación para redes sociales.
- Guion audiovisual.
- Investigación documentada.
- Análisis de documentos.
- Resumen estructurado.
- Estrategia de marketing.
- Plan de contenidos.

**Programación**
- Creación de aplicación web.
- Auditoría de código.
- Corrección de errores.
- Refactorización.
- Creación de API.
- Diseño de base de datos.
- Pruebas automatizadas.
- Documentación técnica.

Cada plantilla debe incluir:

- Nombre.
- Categoría.
- Descripción.
- Modelo o familia recomendada, si existe una justificación.
- Campos editables.
- Valores predeterminados.
- Prompt de ejemplo.
- Instrucciones obligatorias.
- Parámetros específicos compatibles.
- Posibilidad de personalización.

Las plantillas deben servir como punto de partida, no como restricciones rígidas.

# 14. MODO AVANZADO

Incluye un modo avanzado para usuarios experimentados.

Debe permitir:

- Editar el prompt completo.
- Reordenar bloques.
- Activar o desactivar secciones.
- Añadir instrucciones personalizadas.
- Crear variables reutilizables.
- Añadir ejemplos.
- Ajustar la prioridad de requisitos.
- Configurar parámetros del modelo.
- Comparar versiones.
- Bloquear secciones.
- Importar un prompt existente para mejorarlo.
- Dividir prompts extensos.
- Exportar la configuración estructurada.

Cuando el usuario importe un prompt, analiza su estructura sin eliminar automáticamente información.

Muestra los cambios sugeridos y permite aceptar o rechazar cada modificación importante.

# 15. IMPORTAR, MEJORAR Y RECONSTRUIR PROMPTS

Crea una función llamada “Mejorar mi prompt”.

El usuario puede pegar un prompt existente y seleccionar una operación:

- Corregir redacción.
- Hacerlo más preciso.
- Añadir estructura.
- Reducir redundancias.
- Adaptarlo a un modelo concreto.
- Traducirlo.
- Convertirlo en un prompt técnico.
- Crear una versión corta.
- Crear una versión detallada.
- Identificar contradicciones.
- Separarlo en secciones.
- Convertirlo en una plantilla reutilizable.

Antes de modificarlo, identifica el objetivo y conserva los detalles esenciales.

Permite visualizar:

- Prompt original.
- Prompt optimizado.
- Cambios principales.
- Información que falta.
- Advertencias de compatibilidad.

Nunca elimines una instrucción importante de forma silenciosa.

# 16. FUNCIONES DE PRODUCTIVIDAD

Implementa:

- Copiar al portapapeles.
- Descargar como TXT.
- Descargar como Markdown.
- Exportar configuración en JSON.
- Imprimir.
- Crear una copia.
- Reiniciar el formulario.
- Guardar plantillas personalizadas localmente.
- Recuperar borradores locales.
- Comparar dos versiones.
- Historial local opcional.
- Favoritos.
- Búsqueda y filtros de plantillas.
- Exportación del prompt con su configuración.
- Vista previa antes de descargar.

Si se utiliza almacenamiento local, ofrece una opción para borrar todos los datos almacenados.

No envíes automáticamente los prompts a servidores externos.

# 17. ARQUITECTURA TÉCNICA

Selecciona un stack moderno, mantenible y compatible con el entorno de despliegue.

Propuesta inicial:

- TypeScript.
- React.
- Vite.
- CSS moderno o Tailwind CSS.
- Componentes accesibles.
- Zod para validación de datos.
- Vitest para pruebas unitarias.
- Playwright para pruebas de extremo a extremo.
- ESLint y Prettier.
- Biblioteca de iconos mantenida y compatible.
- Sistema de exportación basado en funciones nativas o bibliotecas confiables.

Utiliza versiones estables y compatibles al momento de implementar el proyecto.

Si el entorno ya tiene una arquitectura definida, inspecciónala antes de reemplazar tecnologías innecesariamente.

## Arquitectura modular propuesta

Organiza el código por funcionalidades:

- `src/app`: aplicación y configuración general.
- `src/components`: componentes reutilizables.
- `src/features/image-prompts`: constructor de imágenes.
- `src/features/video-prompts`: constructor de videos.
- `src/features/text-prompts`: constructor de texto.
- `src/features/code-prompts`: constructor de programación.
- `src/features/prompt-editor`: editor y comparación.
- `src/features/templates`: biblioteca de plantillas.
- `src/features/model-profiles`: perfiles de herramientas.
- `src/core/prompt-engine`: motor de generación.
- `src/core/validation`: validación.
- `src/core/optimization`: reglas de optimización.
- `src/services`: servicios externos opcionales.
- `src/data`: catálogos y configuraciones.
- `src/hooks`: hooks reutilizables.
- `src/utils`: utilidades.
- `src/tests`: pruebas.
- `public`: recursos estáticos y archivos SEO.

Adapta esta estructura si existe una razón técnica clara para hacerlo.

Separa las reglas de generación de la interfaz. Los modelos, las plantillas y los parámetros deben poder modificarse mediante configuraciones tipadas.

# 18. SISTEMA DE PERFILES Y ADAPTADORES

Crea una interfaz común para todos los perfiles de modelos.

Cada perfil debe describir:

- Capacidades.
- Categorías de tareas.
- Estructura recomendada.
- Campos admitidos.
- Parámetros opcionales.
- Límites conocidos.
- Compatibilidad con entradas multimodales.
- Reglas de salida.
- Documentación oficial.
- Fecha de verificación.

Utiliza adaptadores independientes para transformar la estructura interna del prompt al formato requerido por cada herramienta.

Por ejemplo:

- Un adaptador puede producir lenguaje descriptivo natural.
- Otro puede generar parámetros especiales de imagen.
- Otro puede crear instrucciones estructuradas para programación.
- Otro puede construir una secuencia temporal para video.

No obligues a todos los modelos a compartir una sintaxis idéntica.

Cuando un modelo cambie sus capacidades, el sistema debe permitir actualizar su perfil sin reescribir la lógica principal.

# 19. INTEGRACIÓN OPCIONAL CON IA

Diseña la aplicación para admitir una API de IA opcional en el futuro.

Las funciones avanzadas pueden incluir:

- Interpretación de ideas expresadas en lenguaje natural.
- Recomendaciones contextuales.
- Detección semántica de contradicciones.
- Optimización asistida.
- Adaptación a diferentes modelos.
- Conversión de ideas en campos estructurados.
- Generación de variaciones.
- Explicación de las decisiones de optimización.

Requisitos:

- No exponer claves API en el navegador.
- Utilizar un backend seguro si se conectan servicios que requieren secretos.
- Configurar límites de uso y control de costes.
- Informar al usuario cuando sus datos se envíen a un proveedor externo.
- No enviar información privada innecesaria.
- Permitir utilizar el constructor básico sin una cuenta y sin una API.
- Gestionar errores, tiempos de espera y respuestas incompletas.

No simules una llamada real a una IA cuando no exista una integración configurada.

# 20. EXPERIENCIA DE USUARIO Y DISEÑO RESPONSIVE

La aplicación debe ofrecer una experiencia excelente en escritorio, tablet y móvil.

En escritorio, utiliza un diseño de dos columnas:

- Izquierda: controles de configuración.
- Derecha: editor, resultado y análisis.

En dispositivos pequeños, reorganiza los paneles verticalmente e incluye navegación accesible entre secciones.

Requisitos de diseño:

- Interfaz limpia.
- Jerarquía visual clara.
- Espaciado consistente.
- Tipografía legible.
- Contraste suficiente.
- Estados de carga y error.
- Mensajes de validación claros.
- Confirmaciones de acciones destructivas.
- Transiciones discretas.
- Atajos de teclado útiles.
- Accesibilidad por teclado.
- Etiquetas accesibles.
- Compatibilidad con lectores de pantalla.
- Preferencia de movimiento reducido.
- Tema claro y oscuro.
- Estados vacíos útiles.
- Diseño sin elementos decorativos que interfieran con el trabajo.

No utilices ventanas emergentes innecesarias ni llenes la pantalla de controles visibles al mismo tiempo. Agrupa las opciones avanzadas en secciones plegables.

# 21. SEO Y PRESENCIA EN INTERNET

Optimiza las páginas públicas para buscadores.

Incluye:

- Títulos y descripciones únicos.
- Jerarquía correcta de encabezados.
- URLs claras.
- Canonical.
- Open Graph.
- Metadatos para compartir.
- Sitemap.
- Robots.txt.
- Rendimiento optimizado.
- Imágenes con dimensiones y texto alternativo apropiados.
- Contenido introductorio útil.
- Preguntas frecuentes.
- Página de ayuda.
- Documentación de funciones.
- Enlaces internos.
- Datos estructurados cuando sean apropiados y verificables.

No agregues datos estructurados engañosos ni valoraciones ficticias.

Separa las páginas públicas indexables del contenido generado por el usuario. No indexar borradores privados ni información personal accidentalmente.

Crea páginas informativas para categorías como generador de prompts de imágenes, generador de prompts de video y creador de prompts para programación, siempre que ofrezcan contenido útil y diferenciado.

# 22. SEGURIDAD Y PRIVACIDAD

Aplica las mejores prácticas de seguridad web.

- Validar las entradas.
- Escapar contenido dinámico.
- Prevenir XSS.
- Evitar la ejecución de código arbitrario.
- No utilizar `eval` para interpretar prompts o plantillas.
- Sanitizar archivos importados.
- Validar el tipo y tamaño de los archivos aceptados.
- No exponer secretos.
- Mantener dependencias actualizadas.
- Configurar cabeceras de seguridad apropiadas.
- Evitar la transmisión de datos innecesarios.
- No almacenar prompts en servidores por defecto.
- Informar sobre cualquier integración externa.
- Permitir eliminar los datos locales.
- No recopilar información personal sin necesidad.

La aplicación debe seguir funcionando de forma útil aunque el usuario no quiera guardar nada.

# 23. ACCESIBILIDAD Y CALIDAD

Apunta a WCAG 2.2 nivel AA.

Comprueba:

- Navegación por teclado.
- Contraste.
- Etiquetas y nombres accesibles.
- Orden lógico del foco.
- Mensajes de error comprensibles.
- Tamaño adecuado de las áreas interactivas.
- Compatibilidad con lectores de pantalla.
- Zoom y escalado de texto.
- Diseño responsive.
- Estados visibles de selección.
- Alternativas a las interacciones que dependan únicamente del color.

# 24. RENDIMIENTO

La aplicación debe cargar rápido y responder sin retrasos perceptibles en interacciones normales.

Optimiza:

- Tamaño de JavaScript.
- Carga de componentes.
- Dependencias.
- Fuentes.
- Imágenes.
- Renderizado de formularios.
- Actualización del editor.
- Procesamiento de plantillas.
- Almacenamiento local.

Evita recalcular todo el proyecto cada vez que el usuario modifica un campo pequeño.

Utiliza técnicas de renderizado y carga diferida cuando realmente aporten valor.

No introduzcas bibliotecas pesadas para funciones que puedan implementarse de forma sencilla y segura.

# 25. PRUEBAS AUTOMATIZADAS

Crea pruebas unitarias para:

- Generación de prompts.
- Validación de entradas.
- Adaptadores de modelos.
- Reglas de compatibilidad.
- Traducción y normalización.
- Contadores de longitud.
- Detección de contradicciones.
- Importación y exportación.
- Guardado y recuperación local.
- Limpieza de datos.

Crea pruebas de integración para verificar que los controles actualizan correctamente el prompt.

Crea pruebas E2E para comprobar que el usuario puede:

1. Seleccionar una categoría.
2. Elegir un modelo.
3. Completar los campos.
4. Generar un prompt.
5. Editarlo manualmente.
6. Copiarlo.
7. Exportarlo.
8. Cambiar de categoría.
9. Recuperar o borrar un borrador local.
10. Utilizar la aplicación en un dispositivo móvil.

Verifica que no se pierdan datos por actualizaciones involuntarias y que los errores se comuniquen correctamente.

# 26. DESPLIEGUE Y DOCUMENTACIÓN

Prepara el proyecto para desplegarse en una plataforma moderna de hosting estático, como Cloudflare Pages, Vercel o Netlify.

Si se necesita backend para una integración opcional, documenta su despliegue por separado.

Incluye:

- README.md.
- Requisitos del entorno.
- Instrucciones de instalación.
- Comandos de desarrollo.
- Comandos de compilación.
- Variables de entorno.
- Guía de despliegue.
- Guía para añadir modelos.
- Guía para crear plantillas.
- Guía de contribución.
- Configuración de lint.
- Pruebas automatizadas.
- Flujo de integración continua.
- Registro de decisiones técnicas relevantes.

No incluyas secretos reales en el repositorio.

# 27. CRITERIOS DE ACEPTACIÓN

La implementación se considerará completa cuando:

1. La interfaz sea funcional en escritorio y móvil.
2. El usuario pueda elegir una categoría y un modelo.
3. Los controles visuales generen un prompt coherente.
4. El prompt se actualice al cambiar las opciones.
5. El usuario pueda editarlo manualmente.
6. El sistema detecte errores y contradicciones relevantes.
7. Las opciones específicas de un modelo no aparezcan indiscriminadamente en otros.
8. Exista un modo de imágenes.
9. Exista un modo de video.
10. Exista un modo de texto.
11. Exista un modo de programación.
12. Se pueda copiar el resultado.
13. Se pueda descargar el prompt.
14. Existan plantillas reutilizables.
15. Se pueda importar un prompt para mejorarlo.
16. El sistema admita inglés y español.
17. La aplicación básica funcione sin API externa.
18. No se expongan secretos ni se envíen datos sin informar.
19. Las funciones principales tengan pruebas.
20. Exista documentación de instalación y despliegue.
21. El sistema permita agregar nuevos perfiles de modelos.
22. No se inventen capacidades o parámetros no verificados.
23. Los datos locales puedan eliminarse.
24. El resultado sea una aplicación real, no una maqueta.

# 28. PLAN DE IMPLEMENTACIÓN

Desarrolla el proyecto por fases, manteniendo una versión funcional en cada una.

**Fase 1 — Núcleo funcional**
- Estructura del proyecto.
- Diseño responsive.
- Constructor de imágenes.
- Editor de prompts.
- Generación mediante reglas locales.
- Copiar y exportar.
- Plantillas iniciales.

**Fase 2 — Más categorías**
- Constructor de video.
- Constructor de texto.
- Constructor de programación.
- Perfiles y adaptadores de modelos.
- Validación de parámetros.

**Fase 3 — Herramientas avanzadas**
- Importar y mejorar prompts.
- Detección de contradicciones.
- Comparación de versiones.
- Variables y bloques reutilizables.
- Historial local opcional.

**Fase 4 — Inteligencia asistida**
- Integración opcional con una API.
- Interpretación de lenguaje natural.
- Recomendaciones contextuales.
- Optimización asistida.
- Adaptación avanzada por modelo.

**Fase 5 — Calidad y lanzamiento**
- Pruebas completas.
- Auditoría de seguridad.
- Accesibilidad.
- SEO.
- Rendimiento.
- Documentación.
- Despliegue.

Prioriza una base funcional y estable antes de incorporar funciones complejas.

# 29. INSTRUCCIÓN FINAL PARA LA IA DESARROLLADORA

Analiza todos los requisitos antes de comenzar.

Si tienes acceso a un repositorio existente, inspecciona su estructura, dependencias, convenciones y funcionalidades antes de modificarlo.

Después:

1. Define la arquitectura.
2. Implementa la interfaz y los componentes.
3. Desarrolla el motor de generación.
4. Configura los perfiles y las plantillas.
5. Implementa las funciones de edición y exportación.
6. Añade validaciones.
7. Ejecuta las pruebas disponibles.
8. Corrige los errores encontrados.
9. Verifica la compilación.
10. Documenta cómo ejecutar y desplegar el proyecto.

No te limites a entregar un plan, pseudocódigo o ejemplos aislados. Implementa los archivos y funcionalidades necesarios dentro del entorno disponible.

No afirmes que una función está terminada si solo existe visualmente o si no puede utilizarse.

No inventes resultados de pruebas, integraciones, documentación oficial ni compatibilidades.

Cuando una decisión técnica no esté especificada, elige la opción más sencilla, segura, mantenible y coherente con el objetivo.

Si un requisito es ambiguo pero no bloquea el desarrollo, utiliza una decisión razonable y documenta el criterio. Solicita aclaraciones únicamente cuando la información faltante impida implementar correctamente una función esencial.

**Resultado final esperado:** una plataforma profesional, intuitiva y extensible para construir prompts estructurados, técnicamente sólidos y adaptados a distintas herramientas de inteligencia artificial, desde una única interfaz visual, sin obligar al usuario a aprender ingeniería de prompts antes de empezar.

