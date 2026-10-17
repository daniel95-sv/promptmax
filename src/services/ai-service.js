// ============================================================
// PromptMax - Servicio de Integración Opcional con IA (Skill.md § 19)
// ============================================================

/**
 * Interfaz y cliente para integración opcional con servicios de IA.
 * 
 * Cumplimiento con Skill.md § 19:
 * - 100% opcional: la aplicación funciona de forma local y determinista sin API externa.
 * - Sin exposición de credenciales en cliente.
 * - No simula llamadas falsas si no hay un endpoint seguro configurado.
 */

export class AIService {
  constructor(endpoint = null) {
    this.endpoint = endpoint;
  }

  isConfigured() {
    return Boolean(this.endpoint);
  }

  async optimizePrompt(promptText, operation) {
    if (!this.isConfigured()) {
      return {
        success: false,
        source: "local-rules",
        message: "No hay una API de IA externa configurada. Utilizando motor de reglas local determinista."
      };
    }

    try {
      const response = await fetch(this.endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: promptText, operation })
      });
      if (!response.ok) throw new Error(`HTTP error ${response.status}`);
      const data = await response.json();
      return { success: true, source: "ai-api", data };
    } catch (err) {
      return {
        success: false,
        source: "local-rules",
        error: err.message,
        message: "Fallo en la conexión externa. Regresando al motor de reglas local."
      };
    }
  }
}

export const aiService = new AIService();
