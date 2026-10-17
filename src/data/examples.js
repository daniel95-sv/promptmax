// ============================================================
// PromptMax - Catálogo de Ejemplos por Categoría y Modelo de IA
// Permite autocompletar todos los campos del constructor según
// la categoría activa y el modelo de IA seleccionado por el usuario.
// ============================================================

export const BUILDER_EXAMPLES = {
  image: {
    midjourney: {
      subject: "frasco de perfume de cristal facetado con tapón metálico dorado y relieves botánicos",
      subjectCount: "1",
      appearance: "cristal transparente de alta refracción, líquido ambarino interior y finos grabados florales en oro cepillado",
      setting: "superficie reflectante de mármol pulido oscuro rodeada de gotas de agua cristalina y pétalos de orquídea húmedos",
      background: "fondo en penumbra suave con degradado cálido y partículas de luz suspendidas en contraluz",
      style: "Fotografía de producto",
      shot: "Primer plano",
      composition: "Simetría",
      lens: "85 mm",
      lighting: "Iluminación de estudio",
      colorPalette: "Tonos tierra",
      mood: "Elegante",
      materials: "vidrio óptico, mármol negro con vetas blancas, latón dorado pulido",
      details: "microgotas de condensación nítidas, destellos especulares en las aristas y refracción realista de cáusticas",
      finish: "editorial publicitario de alta gama",
      avoid: "deformaciones, reflejos quemados, baja resolución, tipografía ilegible, saturación excesiva",
      aspect: "16:9"
    },
    flux: {
      subject: "cafetería retro-futurista con un letrero de neón que dice \"PROMPTMAX ESPRESSO\" en la fachada",
      subjectCount: "grupo de 3 personas visibles en el interior",
      appearance: "arquitectura de líneas aerodinámicas con cristaleras amplias, madera cálida y detalles cromados",
      setting: "calle adoquinada mojada tras una llovizna crepuscular",
      background: "siluetas de rascacielos art déco iluminados bajo un cielo violeta y azul cobalto",
      style: "Cinematográfico",
      shot: "Plano medio general",
      composition: "Punto de fuga central",
      lens: "35 mm",
      lighting: "Luces de neón",
      colorPalette: "Neón y cyberpunk",
      mood: "Nostálgico",
      materials: "tubos de neón de gas real, adoquines de granito mojado, acero cromado",
      details: "texto tipográfico perfectamente legible y nítido en el letrero de neón, reflejos de charcos en el suelo",
      finish: "estilo cinematográfico 35mm con grano sutil",
      avoid: "texto distorsionado, letras fusionadas, aberración cromática agresiva, rostros borrosos",
      aspect: "16:9"
    },
    sdxl: {
      subject: "caballero guerrero con armadura de placas de obsidiana y filigrana de plata",
      subjectCount: "1",
      appearance: "capa de terciopelo desgastada por el viento, mirada decidida y espada ceremonial en reposo",
      setting: "meseta rocosa en lo alto de una montaña sobre un mar de nubes",
      background: "cielo de tormenta épico con relámpagos lejanos y picos montañosos escarpados",
      style: "Fantasía oscura",
      shot: "Plano medio",
      composition: "Regla de los tercios",
      lens: "50 mm",
      lighting: "Contraluz",
      colorPalette: "Monocromático cálido",
      mood: "Épico",
      materials: "metal forjado a mano, obsidiana pulida, cuero curtido envejecido",
      details: "grabados rúnicos en la hoja de la espada, remaches visibles en la armadura y tela desgastada",
      finish: "ilustración digital hiperdetallada de fantasía épica",
      avoid: "anatomía deforme, manos con dedos adicionales, texturas borrosas, artefactos de compresión",
      aspect: "3:2"
    },
    "nano-banana": {
      subject: "pequeño robot explorador esférico de color amarillo mate con un lente óptico azul",
      subjectCount: "1",
      appearance: "chasis esmaltado con pequeños rayones de uso, antenas retráctiles y luz guía frontal",
      setting: "superficie desértica alienígena con arena rojiza y formaciones de cristales minerales azulados",
      background: "dos lunas gigantes visibles en el cielo crepuscular color ámbar",
      style: "Sci-Fi realista",
      shot: "Primer plano",
      composition: "Espacio negativo",
      lens: "85 mm",
      lighting: "Hora dorada",
      colorPalette: "Complementarios",
      mood: "Misterioso",
      materials: "aluminio anodizado amarillo, cristal de cuarzo mineral, arena volcánica",
      details: "polvo fino acumulado en las juntas mecánicas, reflejo de las dos lunas en el lente principal",
      finish: "render cinematográfico fotorrealista",
      avoid: "deformaciones en la geometría esférica, texturas plásticas planas, desenfoque artificial excesivo",
      aspect: "1:1"
    },
    dalle: {
      subject: "invernadero botánico victoriano repleto de flores exóticas brillantes y helechos gigantes",
      subjectCount: "escenario arquitectónico botánico",
      appearance: "estructura de hierro forjado blanco y paneles de cristal curvo con humedad interior",
      setting: "interior cálido e iluminado por rayos de sol filtrados a través de las hojas",
      background: "jardín exterior con niebla matutina visible a través de los cristales",
      style: "Fotografía arquitectónica",
      shot: "Plano general",
      composition: "Simetría",
      lens: "24 mm",
      lighting: "Luz natural difusa",
      colorPalette: "Tonos pastel",
      mood: "Pacífico",
      materials: "hierro forjado esmaltado, vidrio con condensación, vegetación exuberante",
      details: "haces de luz volumétricos atravesando la niebla, mariposas multicolores en vuelo estático",
      finish: "fotografía editorial de arquitectura paisajística",
      avoid: "colores sobresaturados artificiales, plantas deformadas, perspectivas imposibles",
      aspect: "16:9"
    },
    generic: {
      subject: "reloj de bolsillo mecánico de época abierto mostrando sus engranajes de latón",
      subjectCount: "1",
      appearance: "caja de bronce grabada a mano con manecillas de acero azulado y rubíes sintéticos visibles",
      setting: "mesa de madera noble antigua con planos de cartografía marítima y una brújula",
      background: "estudio de anticuario con estanterías de libros encuadernados en cuero desenfocados",
      style: "Fotografía macro",
      shot: "Primer plano",
      composition: "Regla de los tercios",
      lens: "100 mm macro",
      lighting: "Luz cenital suave",
      colorPalette: "Monocromático cálido",
      mood: "Nostálgico",
      materials: "latón dorado, acero pavonado, cristal de zafiro, papel pergamino",
      details: "inscripciones microscópicas en el dial, dientes de engranaje nítidos con microbiseles",
      finish: "macrofotografía fotorrealista de alta definición",
      avoid: "engranajes fundidos sin dientes, números romanos incorrectos, desenfoque borroso no intencional",
      aspect: "4:3"
    }
  },

  video: {
    runway: {
      concept: "Coche deportivo clásico recorriendo una carretera costera sinuosa al atardecer",
      initialScene: "Plano cerrado de la rueda girando sobre el asfalto mojado con el mar embravecido reflejado en la llanta",
      action: "La cámara se eleva en un travelling continuo y fluido mientras el vehículo acelera trazando la curva del acantilado hacia el sol poniente",
      sequence: "Plano cerrado de detalle en rueda → travelling lateral dinámico en paralelo al vehículo → grúa ascendente a plano general costero",
      cameraMotion: "Travelling lateral",
      speed: "movimiento fluido y constante a 60 fps con ligera desaceleración cinematográfica en la curva",
      transitions: "corte directo cinematográfico",
      style: "Cinematográfico analógico 35mm con grano sutil",
      lighting: "Hora dorada con sol bajo en horizonte produciendo destellos anamórficos sutiles",
      atmosphere: "Épica, nostálgica y ventosa con bruma marina en suspensión",
      sound: "rugido grave de motor bóxer acelerando, silbido del viento y rumor continuo del oleaje contra las rocas",
      dialogue: "",
      language: "español neutro",
      duration: "10s",
      aspect: "16:9",
      continuity: "conservar idéntica tonalidad dorada, vestimenta del conductor y reflejos en la carrocería entre fotogramas",
      avoid: "movimientos espasmódicos de cámara, deformación de la carrocería, saltos temporales, desenfoque involuntario",
      _multiClip: false
    },
    sora: {
      concept: "Ballena jorobada luminiscente navegando a través de nubes de tormenta en el cielo nocturno",
      initialScene: "Cámara fija contemplando un banco de nubes oscuras iluminadas por relámpagos internos",
      action: "La ballena emerge majestuosamente de la nube dejando un rastro de partículas bioluminiscentes doradas y sumergiéndose en el siguiente banco nuboso",
      sequence: "Aparición pausada rompiendo la niebla → ondulación del cuerpo en vuelo suave → inmersión elegante en la masa de nubes",
      cameraMotion: "Travelling hacia adelante (Dolly in)",
      speed: "ritmo lento y majestuoso en cámara lenta (slow-motion)",
      transitions: "disolución suave",
      style: "Realismo fantástico hiperdetallado",
      lighting: "Destellos de relámpagos fríos en contraste con la bioluminiscencia cálida de la criatura",
      atmosphere: "Onírica, sobrecogedora y mágica",
      sound: "canto profundo y resonante de ballena con eco atmosférico y trueno sordo a la distancia",
      dialogue: "",
      language: "español neutro",
      duration: "15s",
      aspect: "16:9",
      continuity: "mantener estricta persistencia física de la densidad de las nubes y el patrón bioluminiscente del lomo",
      avoid: "deformaciones anatómicas bruscas, cambios súbitos en la iluminación, saltos de escala",
      _multiClip: false
    },
    veo: {
      concept: "Escena de diálogo íntimo entre dos astronautas en la cúpula de observación de una estación orbital",
      initialScene: "Astronauta de perfil contemplando la curvatura de la Tierra iluminada por el amanecer",
      action: "El segundo astronauta entra en cuadro flotando en gravedad cero, se detiene a su lado y pronuncia su línea",
      sequence: "Contemplación estática en plano medio → aproximación flotante suave → intercambio de miradas y diálogo sincronizado",
      cameraMotion: "Cámara lenta flotante",
      speed: "movimiento natural en microgravedad",
      transitions: "corte directo",
      style: "Hiperrealismo documental espacial",
      lighting: "Luz solar brillante proyectada a través del cristal con sombras marcadas en el interior de la cabina",
      atmosphere: "Silenciosa, reflexiva y contemplativa",
      sound: "zumbido tenue de los sistemas de soporte vital y respiración tranquila dentro del traje",
      dialogue: "Hemos tardado años en llegar aquí, pero el viaje apenas comienza.",
      language: "español neutro",
      duration: "8s",
      aspect: "16:9",
      continuity: "conservar orientación física de gravedad cero, cascos con reflejos coordinados y sincronización labial precisa",
      avoid: "saltos en la posición flotante, artefactos en el reflejo del cristal, voz desincronizada",
      _multiClip: false
    },
    kling: {
      concept: "Maestro artesano forjando una espada katana con chispas incandescentes en un taller tradicional japonés",
      initialScene: "Primer plano extremo del martillo impactando sobre el lingote de acero al rojo vivo",
      action: "Lluvia de chispas en todas direcciones mientras la cámara gira 90 grados alrededor del yunque capturando la concentración del herrero",
      sequence: "Impacto con emisión de chispas → paneo circular dinámico → plano medio del herrero levantando de nuevo el martillo",
      cameraMotion: "Panorámica orbital",
      speed: "velocidad cinematográfica con captura precisa de partículas a alta velocidad",
      transitions: "corte directo",
      style: "Cinematográfico dramático con alto contraste",
      lighting: "Iluminación cálida proveniente del fuego de la fragua y el metal incandescente",
      atmosphere: "Intensa, artesanal y llena de humo suspendido",
      sound: "golpe metálico rítmico y rotundo, crujido del carbón encendido y respiración concentrada",
      dialogue: "",
      language: "japonés con subtítulos / español neutro",
      duration: "6s",
      aspect: "9:16",
      continuity: "mantener temperatura de color del metal incandescente y posición de las herramientas en el taller",
      avoid: "chispas que desaparecen bruscamente, manos con anatomía irregular, pérdida de nitidez en el foco del impacto",
      _multiClip: false
    },
    generic: {
      concept: "Documental natural: leopardo de las nieves acechando en una cresta rocosa del Himalaya",
      initialScene: "Plano medio del felino inmóvil camuflado contra las rocas cubiertas de nieve",
      action: "El felino da tres pasos sigilosos hacia adelante, se detiene y fija su mirada penetrante hacia la cámara",
      sequence: "Acecho estático inicial → avance pausado y calculado sobre la nieve → primer plano de su mirada atenta",
      cameraMotion: "Zoom lento hacia adelante",
      speed: "movimiento pausado y extremadamente sigiloso",
      transitions: "corte directo",
      style: "Documental de vida salvaje de alta definición (estilo BBC Planet Earth)",
      lighting: "Luz natural fría de montaña con cielo nublado",
      atmosphere: "Tensa, solitaria y gélida",
      sound: "viento gélido silbando en las alturas y leve crujido de nieve compactada bajo las patas",
      dialogue: "",
      language: "español neutro",
      duration: "10s",
      aspect: "16:9",
      continuity: "conservar el patrón exacto de manchas del pelaje y la dirección del viento entre tomas",
      avoid: "movimientos robotizados, deformación en las extremidades, desenfoque del sujeto principal",
      _multiClip: false
    }
  },

  text: {
    claude: {
      role: "Especialista sénior en arquitectura de software y diseño de sistemas distribuidos",
      context: "Estamos migrando un monolito legado en producción que procesa 15.000 transacciones por segundo hacia una arquitectura basada en eventos (EDA) con Kafka y microservicios en Go.",
      task: "Diseña la estrategia de particionamiento de tópicos, el patrón de outbox transaccional para garantizar entrega at-least-once sin duplicados, y el plan de migración paso a paso sin tiempo de inactividad.",
      constraints: "Latencia p99 inferior a 120ms, idempotencia estricta en consumidores, compatibilidad retroactiva de esquemas con Avro y Schema Registry.",
      audience: "Equipo de ingeniería principal, líderes técnicos y directores de arquitectura tecnológica",
      tone: "Técnico, riguroso, analítico y pragmático",
      format: "Documento de decisión arquitectónica (ADR) con diagramas Mermaid, tablas de análisis de riesgos y contratos de datos",
      reasoningApproach: "Desglose sistemático primero: análisis de cuello de botella → alternativas evaluadas con pros/contras → solución recomendada",
      cot: true,
      examples: "Incluye un ejemplo completo de implementación del Transactional Outbox Pattern en SQL y Go con manejo de fallos.",
      evaluationCriteria: "Garantía de cero pérdida de datos en caídas de red, sobrecarga computacional mínima y plan de rollback explícito.",
      avoid: "generalidades abstractas, asunciones sin justificación técnica, soluciones que requieran downtime del servicio"
    },
    chatgpt: {
      role: "Estratega sénior de crecimiento de producto y monetización SaaS B2B",
      context: "Nuestra startup de analítica para desarrolladores cuenta con 50.000 usuarios en capa gratuita, pero la tasa de conversión a planes de pago empresariales está estancada en el 1.2%.",
      task: "Elabora una auditoría integral del embudo de conversión, rediseña la matriz de empaquetado de características (Feature Packaging) y define una secuencia de incorporación orientada al valor (Product-Led Growth).",
      constraints: "No degradar la propuesta de valor para la comunidad de código abierto; los cambios deben poder implementarse en un trimestre.",
      audience: "Fundadores, VP de Producto y equipo de Marketing de Crecimiento",
      tone: "Estratégico, directo, orientado a métricas y procesable",
      format: "Informe ejecutivo con resúmenes ejecutivos, tablas comparativas de precios antes/después y KPIs cuantitativos de éxito",
      reasoningApproach: "Identificar los momentos de fricción clave ('Aha moment') y contrastar modelos de precios basados en uso vs basados en asientos.",
      cot: true,
      examples: "Proporciona 3 ejemplos de disparadores de actualización dentro del producto ('Paywalls basados en valor').",
      evaluationCriteria: "Incremento proyectado del ARR en un 25% y reducción del ciclo de ventas en 15 días.",
      avoid: "consejos genéricos de marketing digital, descuentos agresivos que devalúen la marca, terminología vacía"
    },
    gemini: {
      role: "Investigador científico en biotecnología computacional y modelado molecular",
      context: "Análisis de afinidad de unión y perfil farmacocinético (ADMET) de un panel de inhibidores alostéricos dirigidos a la cinasa oncogénica KRAS G12D.",
      task: "Evalúa los datos de docking molecular, predice los residuos clave en el bolsillo alostérico responsables de la selectividad y propone 3 modificaciones químicas racionales.",
      constraints: "Las moléculas optimizadas deben mantener una masa molecular < 500 Da y un LogP entre 1.5 y 3.0 para asegurar biodisponibilidad oral.",
      audience: "Químicos médicos, farmacólogos y evaluadores de comités de investigación preclínica",
      tone: "Científico, exhaustivo, basado en evidencia empírica",
      format: "Artículo técnico con nomenclatura IUPAC, coordenadas de interacción clave y referencias metodológicas",
      reasoningApproach: "Razonamiento causal de estructura-actividad (SAR) con análisis de enlaces de hidrógeno y puentes salinos.",
      cot: true,
      examples: "Cita un caso análogo validado con PDB ID y constante de disociación Ki confirmada.",
      evaluationCriteria: "Coherencia biofísica estricta, reproducibilidad del razonamiento y viabilidad de síntesis química en laboratorio.",
      avoid: "conclusiones sin soporte termodinámico, suposiciones de solubilidad no justificadas, errores en numeración de residuos"
    },
    generic: {
      role: "Consultor experto en comunicación corporativa y gestión de crisis",
      context: "Una compañía de tecnología financiera ha detectado una interrupción no planificada de su pasarela de pagos durante 45 minutos en hora punta.",
      task: "Redacta el plan de comunicación para clientes afectados, la declaración pública para medios de comunicación y el memorándum interno para el comité de dirección.",
      constraints: "Transparencia absoluta sin generar pánico innecesario; cumplir con las regulaciones de notificación financiera en menos de 2 horas.",
      audience: "Clientes afectados, medios de prensa y junta directiva",
      tone: "Empático, firme, transparente y resolutivo",
      format: "Plantilla de comunicación multi-canal con cronograma de publicación minuto a minuto",
      reasoningApproach: "Estructura en 3 fases: Reconocimiento del incidente → Medidas de contención aplicadas → Compensación y prevención futura.",
      cot: false,
      examples: "Incluye una sección de preguntas frecuentes (FAQ) con respuestas directas.",
      evaluationCriteria: "Mitigación del impacto reputacional, claridad en las compensaciones y cumplimiento regulatorio estricto.",
      avoid: "lenguaje defensivo o evasivo, culpar a proveedores externos, términos técnicos confusos para el usuario final"
    }
  },

  code: {
    "claude-code": {
      projectName: "PromptMax CLI & Core Engine",
      languageFramework: "TypeScript 5.6 / Node.js 22 LTS / ESM nativo",
      taskType: "Refactorización modular e implementación de motor CLI con validación",
      architecture: "Arquitectura hexagonal desacoplada con adaptadores de modelo independientes y contratos de interfaz estrictos",
      requirements: "1. Inspección previa obligatoria del espacio de trabajo antes de modificar código.\n2. Diseñar un comando interactivo que procese archivos de configuración YAML/JSON.\n3. Implementar caché en disco con algoritmo LRU y persistencia atómica.\n4. Manejo robusto de errores con códigos de salida POSIX estándar.",
      conventions: "TypeScript estricto con `noImplicitAny: true`, funciones puras testables, JSDoc explicativo en cada API pública, importaciones con extensión `.js` según norma ESM.",
      testing: "100% de cobertura en funciones de generación y validación usando Vitest. Ejecución de suite de tests en modo watch y verificación en CI.",
      performance: "Tiempo de arranque inferior a 80ms, streaming directo en stdout para prompts grandes sin duplicación en memoria heap.",
      security: "Validación rigurosa de rutas contra Path Traversal (`path.resolve`), sanitización de entradas de usuario, cero llamadas inseguras a `eval()` o shells externas.",
      avoid: "reescritura masiva de archivos completos sin justificación, dependencias externas innecesarias, mutación directa de objetos globales"
    },
    codex: {
      projectName: "SaaS Multi-tenant Subscription & Webhook Service",
      languageFramework: "Go 1.23 / PostgreSQL 16 con pgx / Docker",
      taskType: "Desarrollo de microservicio transaccional con control de concurrencia",
      architecture: "Clean Architecture con capas: Domain, UseCases, Repositories y HTTP Handlers con enrutador chi",
      requirements: "1. Procesamiento idempotente de webhooks de pago (Stripe) mediante tabla de deduplicación con bloqueo pesimista.\n2. Endpoint gRPC y REST para validación de permisos por plan en < 15ms.\n3. Middleware de telemetría con OpenTelemetry (trazas, métricas y logs estructurados en JSON).\n4. Migraciones de base de datos seguras con rollback automático.",
      conventions: "Standard Go Project Layout, nombres idiomáticos, control explícito de errores (`if err != nil`), structs inmutables donde aplique.",
      testing: "Tests unitarios con mocks generados (mockery) y tests de integración con bases de datos reales mediante Testcontainers.",
      performance: "Soporte para 5.000 peticiones concurrentes por segundo con pooling de conexiones optimizado y memoria heap contenida.",
      security: "Verificación de firmas criptográficas HMAC SHA-256 en webhooks entrantes, sanitización de consultas con SQL parametrizado, headers seguros OWASP.",
      avoid: "goroutines huérfanas sin context cancellation, dependencias cíclicas, panic() en controladores HTTP"
    },
    generic: {
      projectName: "Design System UI Components Library",
      languageFramework: "React 19 / TypeScript / CSS Modules / Vite",
      taskType: "Creación de librería de componentes accesibles de alto rendimiento",
      architecture: "Componentes desacoplados tipo compound components (Tabs, Accordion, Modal, Dropdown) con soporte headless",
      requirements: "1. Cumplimiento estricto del estándar WAI-ARIA 1.2 en todos los componentes interactivos.\n2. Gestión de foco por teclado accesible (Tab, Shift+Tab, Arrow keys, Escape).\n3. Modo oscuro nativo mediante variables CSS personalizables.\n4. Soporte para servidor (SSR) sin advertencias de hidratación.",
      conventions: "Exportaciones named exports, props documentadas con interfaces TypeScript, cero dependencias pesadas de estilos en runtime.",
      testing: "Pruebas de renderizado y accesibilidad con Vitest, React Testing Library y axe-core.",
      performance: "Bundle de componentes con tree-shaking garantizado, tamaño por componente < 3kB gzipped.",
      security: "Sanitización obligatoria de contenido HTML dinámico, protección contra XSS en renderizado de texto de usuario.",
      avoid: "estilos inline rígidos, manipulación directa de DOM fuera del ciclo de vida de React, romper navegación accesible por teclado"
    }
  }
};

/**
 * Obtiene el preset de ejemplo más adecuado según la categoría y el modelo de IA.
 * Si no hay un ejemplo específico para el modelo, recurre al ejemplo genérico de la categoría.
 */
export function getExampleFor(category, modelId) {
  const catExamples = BUILDER_EXAMPLES[category] || BUILDER_EXAMPLES.image;
  if (modelId && catExamples[modelId]) {
    return JSON.parse(JSON.stringify(catExamples[modelId]));
  }
  if (catExamples.generic) {
    return JSON.parse(JSON.stringify(catExamples.generic));
  }
  const firstKey = Object.keys(catExamples)[0];
  return JSON.parse(JSON.stringify(catExamples[firstKey]));
}
