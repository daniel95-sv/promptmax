// ============================================================
// PromptMax - Estado Global de la Aplicación (src/app/state.js)
// ============================================================

import {
  initialState,
  loadStoredState,
  persistState,
  clearAllLocalData
} from "../core/storage.js";

let appState = loadStoredState();

export function getState() {
  return appState;
}

export function setState(newState) {
  appState = newState;
  persistState(appState);
  return appState;
}

export function resetState() {
  clearAllLocalData();
  appState = initialState();
  return appState;
}

export { initialState, loadStoredState, persistState, clearAllLocalData };
