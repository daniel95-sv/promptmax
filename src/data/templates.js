/**
 * Biblioteca de plantillas profesionales de PromptMax
 * Cumple con Skill.md Sección 13 en su totalidad (Imagen, Video, Texto y Programación).
 */

export const TEMPLATES = [
  // ==========================================
  // IMAGEN (Skill.md § 13)
  // ==========================================
  {
    id: "tpl-img-cinematic",
    cat: "image",
    title: "Retrato cinematográfico",
    desc: "Iluminación Rembrandt, lente 85 mm, bokeh estético y textura facial realista.",
    data: {
      subject: "persona adulta, mirada introspectiva y profunda",
      subjectCount: "1",
      appearance: "expresión serena, textura natural de la piel, vestimenta sobria de lana oscura",
      style: "Fotografía cinematográfica",
      styleIntensity: "marcado",
      shot: "Primer plano",
      angle: "A nivel de ojos",
      lens: "85 mm",
      dof: "Bokeh",
      lighting: "Rembrandt",
      composition: "Regla de los tercios",
      color: "Paleta cálida",
      atmosphere: "Elegante",
      materials: "lana suave, piel con poros reales, destellos sutiles en la mirada",
      detail: "microdetalle en pestañas y textura de piel",
      quality: "fotográfico 35mm cinematográfico",
      aspect: "3:4",
      avoid: "piel plástica, brillo artificial, desproporción facial, aberración cromática"
    }
  },
  {
    id: "tpl-img-product",
    cat: "image",
    title: "Fotografía de producto premium",
    desc: "Bodegón comercial pulido, iluminación de estudio suave y fondo limpio.",
    data: {
      subject: "frasco de perfume de cristal con tapón metálico dorado",
      subjectCount: "1",
      setting: "superficie reflectante de mármol pulido",
      background: "fondo degradado en tonos crema y beige suave",
      style: "Fotografía de producto",
      shot: "Primer plano",
      lens: "50 mm",
      lighting: "Iluminación de estudio",
      composition: "Simetría",
      color: "Tonos tierra",
      atmosphere: "Elegante",
      materials: "vidrio transparente con refracción realista, metal dorado cepillado",
      detail: "enfoque nítido y microdetalle en grabados",
      quality: "editorial publicitario",
      aspect: "1:1",
      avoid: "huellas dactilares, reflejos no deseados, polvo, distorsión óptica"
    }
  },
  {
    id: "tpl-img-social-thumb",
    cat: "image",
    title: "Miniatura para vídeo de alto impacto",
    desc: "Composición dinámica con alto contraste, sujeto expresivo y espacio para texto.",
    data: {
      subject: "creador de contenido sorprendido señalando hacia la derecha",
      appearance: "expresión de asombro genuino, ropa deportiva de color contrastante",
      style: "Fotografía publicitaria",
      shot: "Plano medio",
      lighting: "Alto contraste",
      composition: "Espacio negativo",
      color: "Vibrante",
      atmosphere: "Alegre",
      aspect: "16:9",
      avoid: "manos deformes, desenfoque de movimiento excesivo, fondo caótico"
    }
  },
  {
    id: "tpl-img-fantasy",
    cat: "image",
    title: "Escena de fantasía épica",
    desc: "Paisaje colosal con iluminación volumétrica, ruinas antiguas y atmósfera mística.",
    data: {
      subject: "templo ancestral en la cima de un risco cubierto de musgo",
      setting: "cordillera neblinosa al atardecer",
      era: "edad mística olvidada",
      style: "Fantasía épica",
      shot: "Gran plano general",
      lighting: "Volumétrica",
      composition: "Capas de profundidad",
      color: "Complementarios",
      atmosphere: "Épico",
      materials: "piedra erosionada, enredaderas bioluminiscentes, cascadas lejanas",
      detail: "alta complejidad de escena",
      aspect: "21:9",
      avoid: "elementos modernos, vehículos, cables, ruido digital"
    }
  },
  {
    id: "tpl-img-anime",
    cat: "image",
    title: "Ilustración Anime / Manga moderno",
    desc: "Línea pulida, cel-shading suave, iluminación de hora mágica y estética Makoto Shinkai.",
    data: {
      subject: "joven estudiante contemplando el horizonte desde la azotea",
      appearance: "uniforme escolar tradicional japonés, cabello movido por la brisa suave",
      setting: "azotea escolar con barandilla metálica",
      background: "cielo de atardecer con nubes cumulonimbus iluminadas",
      style: "Anime",
      shot: "Plano americano",
      lighting: "Golden hour",
      composition: "Líneas guía",
      color: "Pastel",
      atmosphere: "Nostálgico",
      quality: "render anime de alta gama, arte conceptual japonés",
      aspect: "16:9",
      avoid: "3D render hiperrealista, piel fotorrealista, líneas rotas"
    }
  },
  {
    id: "tpl-img-food",
    cat: "image",
    title: "Fotografía gastronómica editorial",
    desc: "Plato gourmet recién preparado, vapor sutil y luz lateral natural de ventana.",
    data: {
      subject: "plato de pasta artesanal fresca con salsa de trufa y virutas de parmesano",
      setting: "mesa de madera rústica con copa de vino y servilleta de lino",
      style: "Fotografía editorial",
      shot: "Primer plano",
      angle: "Picado",
      lens: "50 mm",
      dof: "Profundidad de campo reducida",
      lighting: "Luz de ventana",
      composition: "Equilibrio visual",
      color: "Paleta cálida",
      materials: "textura brillante de la salsa, madera noble, tela de lino crudo",
      detail: "vapor visible sutil ascendiendo",
      aspect: "4:3",
      avoid: "comida artificial, plástico, sobreexposición, colores fríos"
    }
  },
  {
    id: "tpl-img-3d-character",
    cat: "image",
    title: "Personaje 3D estilizado",
    desc: "Render CGI de alta gama estilo largometraje de animación con materiales táctiles.",
    data: {
      subject: "pequeño robot explorador curioso con ojos luminosos expresivos",
      appearance: "carcasa redondeada de cerámica blanca mate con detalles en cobre pulido",
      setting: "taller acogedor iluminado por lámparas cálidas",
      style: "Render 3D",
      shot: "Plano medio",
      lens: "50 mm",
      lighting: "Iluminación de tres puntos",
      composition: "Centro de interés",
      color: "Paleta cálida",
      atmosphere: "Alegre",
      materials: "cerámica mate, cobre pulido, cristal translúcido",
      detail: "microarañazos suaves de uso, oclusión ambiental realista",
      quality: "render 3D Octane / Redshift para cine de animación",
      aspect: "1:1",
      avoid: "artefactos poligonales, textura plana sin relieve, sobreenfoque artificial"
    }
  },
  {
    id: "tpl-img-architecture",
    cat: "image",
    title: "Arquitectura contemporánea y paisajismo",
    desc: "Vivienda moderna minimalista integrada en la naturaleza con líneas limpias.",
    data: {
      subject: "residencia moderna de una sola planta con grandes ventanales de suelo a techo",
      setting: "bosque de coníferas nórdico con lago sereno en primer plano",
      era: "arquitectura de vanguardia siglo XXI",
      style: "Arquitectura",
      shot: "Plano general",
      lens: "24 mm",
      lighting: "Luz natural suave",
      composition: "Encuadre arquitectónico",
      color: "Tonos tierra",
      atmosphere: "Sereno y elegante",
      materials: "hormigón visto arquitectónico, madera de cedro natural y cristal templado",
      detail: "reflejos nítidos sobre la superficie del agua",
      aspect: "16:9",
      avoid: "distorsión en perspectiva de fuga, personas borrosas, cables aéreos"
    }
  },
  {
    id: "tpl-img-fashion",
    cat: "image",
    title: "Moda editorial de alta costura",
    desc: "Estilismo vanguardista, pose dramática y atmósfera de pasarela parisina.",
    data: {
      subject: "modelo de alta costura con vestido escultural de seda drapeada",
      appearance: "maquillaje editorial geométrico, peinado pulido hacia atrás, pose de perfil elegante",
      setting: "estudio minimalista con columnas de mármol travertino",
      style: "Fotografía editorial",
      shot: "Plano entero",
      lens: "85 mm",
      lighting: "Luz dura",
      composition: "Diagonales dinámicas",
      color: "Monocromático",
      atmosphere: "Elegante y vanguardista",
      materials: "seda satinada que atrapa la luz, mármol mate",
      quality: "portada de revista Vogue / Harper's Bazaar",
      aspect: "2:3",
      avoid: "poses rígidas antinaturales, piel sobreexpuesta sin textura"
    }
  },

  // ==========================================
  // VIDEO (Skill.md § 13)
  // ==========================================
  {
    id: "tpl-vid-ad",
    cat: "video",
    title: "Anuncio de producto (10 segundos)",
    desc: "Movimiento de cámara en órbita lenta con iluminación de estudio e iluminación dinámica.",
    data: {
      concept: "Presentación comercial de auriculares inalámbricos futuristas",
      initialScene: "Auriculares levitando en el centro del encuadre en penumbra",
      action: "La luz lateral se enciende gradualmente mientras los auriculares giran suavemente 45 grados mostrando sus acabados de titanio.",
      sequence: "0-3s: Enfoque sutil y encendido de luz suave. 3-7s: Giro continuo y reflejo dinámico. 7-10s: Detención en perfil elegante.",
      cameraMotion: "Órbita",
      speed: "Movimiento fluido y pausado (slow-motion suave)",
      lighting: "Iluminación de estudio",
      style: "Fotografía publicitaria",
      atmosphere: "Elegante",
      sound: "Zumbido sutil electromagnético y notas de sintetizador cristalinas",
      duration: "10s",
      aspect: "16:9",
      continuity: "Mantener el objeto inalterado en escala, material y posición.",
      avoid: "sacudidas de cámara, artefactos de desenfoque temporal, cambios repentinos de luz"
    }
  },
  {
    id: "tpl-vid-reel",
    cat: "video",
    title: "Reel cinematográfico vertical (15 segundos)",
    desc: "Travelling hacia adelante con iluminación Golden Hour para Instagram / TikTok.",
    data: {
      concept: "Caminata urbana cinematográfica hacia el atardecer",
      initialScene: "Sujeto caminando de espaldas por un puente urbano",
      action: "El sujeto avanza con paso seguro mientras el sol dorado se filtra entre los cables del puente.",
      cameraMotion: "Travelling de acercamiento",
      speed: "Velocidad constante y estabilizada (steadicam)",
      lighting: "Golden hour",
      style: "Fotografía cinematográfica",
      atmosphere: "Nostálgico",
      sound: "Murmullo de la ciudad amortiguado y brisa marina",
      duration: "15s",
      aspect: "9:16",
      continuity: "Consistencia de vestimenta, tono de color y peinado en todo el recorrido.",
      avoid: "movimientos erráticos de cámara, saltos temporales, parpadeo de texturas"
    }
  },
  {
    id: "tpl-vid-multiclip",
    cat: "video",
    title: "Secuencia narrativa en 3 clips continuos",
    desc: "Estructura dividida en clips independientes con condiciones de continuidad estricta.",
    data: {
      concept: "Llegada de una exploradora a un puesto de avanzada alienígena",
      initialScene: "Clip 1: Exploradora abre la compuerta presurizada y mira hacia afuera",
      action: "Clip 1 (0-6s): Apertura de escotilla (cámara fija). Clip 2 (6-12s): Salida al exterior desértico (seguimiento lateral). Clip 3 (12-18s): Vista panorámica del horizonte con dos lunas (paneo ascendente).",
      sequence: "Clip 1: Estado final = exploradora de pie en el umbral. Clip 2: Inicia en el umbral y avanza 5 pasos. Clip 3: Inicia al detenerse.",
      cameraMotion: "Seguimiento del sujeto",
      lighting: "Cinematográfica",
      style: "Ciencia ficción",
      atmosphere: "Misterioso",
      sound: "Descompresión neumática, pisadas en arena metálica y viento distante",
      duration: "18s (3 clips x 6s)",
      aspect: "16:9",
      continuity: "El clip N+1 debe iniciar exactamente en el fotograma final del clip N. Mismo traje espacial, mismos accesorios y misma iluminación ambiental.",
      avoid: "cambios en el diseño del traje, inconsistencias en la paleta cromática, saltos de ángulo ilógicos"
    }
  },
  {
    id: "tpl-vid-dramatic",
    cat: "video",
    title: "Escena dramática cinematográfica",
    desc: "Iluminación en clave baja, travelling lento hacia el rostro y atmósfera de suspense.",
    data: {
      concept: "Momento de revelación crucial en un interrogatorio o conflicto",
      initialScene: "Sujeto sentado en penumbra junto a una ventana empapada de lluvia",
      action: "La cámara se acerca milímetro a milímetro mientras el sujeto levanta lentamente la mirada hacia la puerta que se abre con un haz de luz.",
      cameraMotion: "Travelling de acercamiento",
      speed: "Extremadamente lento y medido",
      lighting: "Clave baja",
      style: "Cine noir",
      atmosphere: "Misterioso",
      sound: "Gotas de lluvia golpeando el cristal, respiración pausada y crujido lejano de madera",
      duration: "8s",
      aspect: "21:9",
      continuity: "Mantener coherencia estricta en el reflejo de la lluvia sobre la ventana y posición de las sombras.",
      avoid: "movimientos bruscos, desenfoque accidental, cortes súbitos"
    }
  },
  {
    id: "tpl-vid-explainer",
    cat: "video",
    title: "Video explicativo dinámico",
    desc: "Tomas claras, ritmo didáctico y transiciones limpias para contenido educativo.",
    data: {
      concept: "Demostración visual de un proceso científico o técnico",
      initialScene: "Mano de especialista manipulando un microscopio electrónico en laboratorio pulcro",
      action: "La mano ajusta el dial; la cámara realiza un paneo suave hacia la pantalla adyacente donde se visualizan estructuras moleculares tridimensionales.",
      cameraMotion: "Paneo",
      speed: "Fluido y didáctico",
      lighting: "Luz difusa",
      style: "Documental",
      atmosphere: "Realista",
      sound: "Bip sutil de instrumento electrónico y murmullo suave de ventilación de laboratorio",
      duration: "10s",
      aspect: "16:9",
      continuity: "Bata de laboratorio blanca, guantes de nitrilo azul y disposición del instrumental idéntica.",
      avoid: "sacudidas de cámara, reflejos molestos en pantallas, saltos de montaje"
    }
  },

  // ==========================================
  // TEXTO (Skill.md § 13)
  // ==========================================
  {
    id: "tpl-txt-seo",
    cat: "text",
    title: "Artículo SEO en profundidad",
    desc: "Estructura optimizada con H1, H2, FAQ, datos estructurados y sin relleno.",
    data: {
      role: "Especialista en SEO y redacción de contenido técnico de alto valor",
      objective: "Redactar una guía exhaustiva, accionable y pedagógica sobre el tema proporcionado.",
      context: "El artículo competirá en los primeros puestos de los motores de búsqueda para consultas informacionales.",
      audience: "Profesionales y entusiastas que buscan soluciones prácticas y verificadas.",
      instructions: "Estructurar con H1 llamativo, H2 por subtemas clave, listas con viñetas, tablas comparativas y sección de preguntas frecuentes.",
      tone: "Profesional",
      depth: "Exhaustivo y detallado",
      outputFormat: "Markdown limpio y bien estructurado",
      quality: "Cero párrafos de relleno. Todo concepto debe acompañarse de un ejemplo o paso a seguir.",
      acceptance: "Respeta jerarquía de encabezados, incluye 5 preguntas frecuentes y resumen al final.",
      noInvent: "No inventar datos estadísticos, fuentes ni citas bibliográficas.",
      citations: "Indicar fuentes recomendadas verificables cuando se mencionen cifras.",
      avoid: "frases cliché como 'en el mundo actual', redundancias, generalidades vagas"
    }
  },
  {
    id: "tpl-txt-social",
    cat: "text",
    title: "Publicación viral para redes sociales",
    desc: "Gancho inicial de impacto, desarrollo con formato escaneable y llamada a la acción.",
    data: {
      role: "Copywriter y estratega de contenidos para LinkedIn y X",
      objective: "Generar una publicación que despierte debate profesional y retención de lectura.",
      tone: "Directo",
      depth: "Conciso y de alto impacto",
      outputFormat: "Texto formateado con saltos de línea estratégicos y viñetas breves",
      instructions: "Primera línea: Gancho disruptivo sin caer en clickbait barato. Cuerpo: 4 lecciones o hallazgos clave. Cierre: Pregunta abierta que fomente comentarios.",
      acceptance: "Menos de 280 palabras, lectura rápida y llamada a la acción clara.",
      avoid: "emojis excesivos, autopromoción descarada, jerga vacía de marketing"
    }
  },
  {
    id: "tpl-txt-research",
    cat: "text",
    title: "Investigación documentada y análisis crítico",
    desc: "Marco analítico riguroso con contrastación de fuentes, hipótesis y conclusiones.",
    data: {
      role: "Investigador analítico senior y evaluador crítico",
      objective: "Analizar el estado de la cuestión sobre un problema complejo, identificando consensos y discrepancias.",
      tone: "Técnico",
      depth: "Exhaustivo y analítico",
      outputFormat: "Informe técnico estructurado: Resumen ejecutivo, Metodología, Hallazgos, Discusión de sesgos, Conclusiones.",
      methodology: "Triangulación de perspectivas, distinción estricta entre correlación y causalidad.",
      citations: "Exigir referencias metodológicas y citar literatura científica revisada por pares.",
      noInvent: "Bajo ninguna circunstancia generar datos no respaldados por la evidencia.",
      missingInfo: "Si no hay evidencia concluyente sobre un punto, señalarlo explícitamente como una brecha de conocimiento.",
      avoid: "sesgos de confirmación, conclusiones apresuradas, lenguaje emotivo"
    }
  },
  {
    id: "tpl-txt-script",
    cat: "text",
    title: "Guion audiovisual técnico",
    desc: "Formato a dos columnas (Video / Audio) con indicaciones de plano y duración estimada.",
    data: {
      role: "Guionista audiovisual profesional y director creativo",
      objective: "Escribir un guion técnico completo para video corporativo o documental de 3 minutos.",
      context: "El video servirá de pieza audiovisual central de una campaña institucional.",
      audience: "Clientes corporativos y público general exigente.",
      instructions: "Estructurar tabla de dos columnas: columna izquierda 'VIDEO (Plano, movimiento, elementos en pantalla)' y columna derecha 'AUDIO (Locución / Diálogo, efectos sonoros FX, música de fondo)'. Incluir tiempos estimados en segundos por bloque.",
      tone: "Inspirador y riguroso",
      depth: "Detallado plano a plano",
      outputFormat: "Tabla Markdown de dos columnas con minutaje",
      avoid: "descripciones visuales genéricas, locuciones sin ritmo, pausas no cronometradas"
    }
  },
  {
    id: "tpl-txt-marketing",
    cat: "text",
    title: "Estrategia de marketing y plan de contenidos",
    desc: "Plan integral con análisis de buyer persona, pilares temáticos, canales y métricas clave.",
    data: {
      role: "Director de Marketing y estratega de crecimiento (Growth Strategist)",
      objective: "Diseñar un plan de marketing de contenidos trimestral orientado a conversión y autoridad.",
      context: "Lanzamiento de un nuevo producto SaaS en un mercado competitivo.",
      audience: "Equipos técnicos y líderes de operaciones B2B.",
      instructions: "1. Perfil del buyer persona y puntos de dolor principales. 2. Tres pilares temáticos de contenido. 3. Matriz de canales recomendados (Blog, LinkedIn, Newsletter). 4. Calendario quincenal tipo. 5. KPIs medibles.",
      tone: "Estratégico y accionable",
      depth: "Completo con metas cuantitativas",
      outputFormat: "Documento ejecutivo estructurado en secciones con listas y tablas",
      acceptance: "Cada acción debe vincularse a un KPI medible (CAC, leads calificados, engagement).",
      avoid: "tácticas desactualizadas, consejos genéricos de autoayuda, fórmulas mágicas sin base"
    }
  },

  // ==========================================
  // PROGRAMACIÓN (Skill.md § 13)
  // ==========================================
  {
    id: "tpl-code-webapp",
    cat: "code",
    title: "Arquitectura de aplicación web moderna",
    desc: "Especificación completa con stack, arquitectura modular, pruebas y criterios de aceptación.",
    data: {
      taskType: "create",
      projectName: "PromptMax Core",
      problem: "Proporcionar a los usuarios una interfaz visual para construir y validar prompts de IA sin depender de backend obligatorio.",
      appType: "Single Page Application (SPA)",
      stack: "TypeScript / JavaScript moderno, HTML5 semántico, CSS3 nativo, Vite, Vitest",
      architecture: "Modular organizada por carpetas (data, core, components, tests)",
      mustFeatures: "1. Generador determinista para 4 categorías (imagen, video, texto, código). 2. Detección en tiempo real de contradicciones y advertencias. 3. Persistencia local en localStorage sin telemetría no consentida. 4. Exportación en TXT, MD y JSON.",
      optionalFeatures: "Modo avanzado de variables, historial de versiones locales, división en clips.",
      folderStructure: "src/\n  data/\n  core/\n  components/\n  tests/\npublic/\nindex.html\npackage.json",
      security: "Sanitización estricta de entradas, prevención de XSS, sin uso de eval().",
      accessibility: "Cumplimiento WCAG 2.2 nivel AA, navegación por teclado completa, atributos aria-*.",
      seo: "Metadatos Open Graph, Twitter Cards, JSON-LD schema, robots.txt, sitemap.xml.",
      performance: "Carga inicial rápida, zero dependencias pesadas innecesarias, build optimizado.",
      tests: "Pruebas unitarias completas con Vitest cubriendo todos los generadores, validadores y optimizadores.",
      acceptance: "100% de tests pasando en 'npm test', build sin errores con 'npm run build', interfaz fluida sin errores de consola.",
      deliverables: "Código fuente completo, suite de pruebas automatizadas, documentación README.md y bundle de producción en dist/.",
      constraints: "No usar frameworks backend obligatorios; mantener funcionamiento local en el navegador.",
      avoid: "librerías obsoletas, dependencias infladas, funciones bloqueantes en el hilo principal"
    }
  },
  {
    id: "tpl-code-audit",
    cat: "code",
    title: "Auditoría de seguridad y calidad de código",
    desc: "Inspección sistemática de vulnerabilidades, fuga de memoria y accesibilidad.",
    data: {
      taskType: "audit",
      problem: "Revisar un módulo existente para detectar potenciales vulnerabilidades de inyección, riesgos de seguridad y cuellos de botella.",
      architecture: "Mantener intacta la arquitectura existente sin cambios disruptivos innecesarios.",
      constraints: "No reescribir módulos completos; aportar parches específicos y explicados.",
      security: "Revisar vector XSS en manipulación de innerHTML, validación de schemas JSON importados, gestión segura de almacenamiento local.",
      acceptance: "Informe de auditoría con clasificación de severidad (Alta/Media/Baja), código vulnerable identificado y solución probada.",
      avoid: "modificaciones que rompan retrocompatibilidad sin justificación crítica"
    }
  },
  {
    id: "tpl-code-refactor",
    cat: "code",
    title: "Refactorización limpia y segura",
    desc: "Modularización de código monolítico en módulos desacoplados con garantía de no regresión.",
    data: {
      taskType: "refactor",
      problem: "Separar la lógica del motor de la interfaz de usuario para permitir pruebas unitarias automatizadas y mantenimiento escalable.",
      architecture: "Separación clara: core (lógica pura desacoplada del DOM) y ui (controladores de interfaz).",
      tests: "Ejecutar y validar la suite de pruebas antes y después de cada cambio.",
      constraints: "Comportamiento observable idéntico para el usuario final.",
      acceptance: "Todos los tests en verde, código desacoplado y sin duplicación de lógica.",
      avoid: "cambios cosméticos innecesarios en archivos no relacionados"
    }
  },
  {
    id: "tpl-code-api",
    cat: "code",
    title: "Diseño e implementación de API RESTful",
    desc: "Contrato de API con OpenAPI/Swagger, validación con esquemas y pruebas de integración.",
    data: {
      taskType: "feature",
      projectName: "Servicio de Prompts API",
      problem: "Permitir integración programática de generadores de prompts para clientes externos.",
      appType: "Microservicio RESTful",
      stack: "Node.js / TypeScript, Framework ligero, Zod para validación",
      architecture: "Controlador → Servicio → Repositorio",
      mustFeatures: "Endpoints CRUD versionados (/v1/prompts, /v1/templates), paginación y filtros.",
      security: "Rate limiting, autenticación basada en API Key, cabeceras CORS restrictivas.",
      tests: "Pruebas de endpoints con aserciones sobre códigos HTTP y estructura de payload.",
      acceptance: "Documentación OpenAPI disponible, validación estricta de esquemas y cobertura de tests >85%.",
      avoid: "exposición de trazas de error internas en producción, endpoints no autenticados"
    }
  },
  {
    id: "tpl-code-bugfix",
    cat: "code",
    title: "Corrección de errores y depuración sistemática",
    desc: "Diagnóstico metódico de causa raíz, test de reproducción y parche de mínima invasión.",
    data: {
      taskType: "bugfix",
      projectName: "Parche de Estabilidad",
      problem: "Diagnosticar y corregir un fallo inesperado o excepción no controlada en el flujo de ejecución.",
      stack: "TypeScript / JavaScript, Vitest / Jest",
      architecture: "Respetar la arquitectura y convenciones de codificación existentes.",
      instructions: "1. Reproducir el error mediante un caso de prueba unitario que falle. 2. Identificar la causa raíz sin suposiciones no verificadas. 3. Aplicar la corrección más simple y segura. 4. Comprobar que todos los tests previos sigan pasando.",
      tests: "Incluir test de regresión automatizado que asegure que el fallo no vuelva a producirse.",
      acceptance: "El test de regresión pasa, cero efectos secundarios en módulos vecinos.",
      avoid: "modificar dependencias no relacionadas, reescritura masiva de código"
    }
  },
  {
    id: "tpl-code-db",
    cat: "code",
    title: "Diseño de base de datos y esquema relacional",
    desc: "Esquema normalizado en 3NF con índices estratégicos, integridad referencial y migraciones.",
    data: {
      taskType: "feature",
      projectName: "Esquema Relacional Central",
      problem: "Diseñar el modelo de datos relacional para gestionar usuarios, proyectos, versiones de prompts y auditorías.",
      appType: "Base de Datos Relacional (PostgreSQL / SQLite)",
      stack: "SQL estándar, Migraciones versionadas, Índices B-Tree",
      architecture: "Tercera Forma Normal (3NF) con claves foráneas e integridad referencial estricta.",
      mustFeatures: "Tablas para users, projects, prompt_drafts, templates y audit_logs. Claves primarias UUIDv4.",
      security: "Sin almacenamiento de contraseñas en texto plano (hashing bcrypt/argon2), triggers para updated_at automático.",
      performance: "Índices en columnas de búsqueda frecuente y claves foráneas.",
      acceptance: "Script SQL de migración idempotente y ejecutable sin errores.",
      avoid: "claves foráneas sin índices, tipos de datos inconsistentes, campos nulos no controlados"
    }
  }
];
