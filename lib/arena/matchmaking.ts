// Feature flag: toggle bot mode without affecting PvP logic
export const ENABLE_BOT_MODE = true;

export type GameMode = "bot" | "pvp";

export interface RadarState {
  activePlayers: number;
}

const BOT_DELAY_MIN = 4000;
const BOT_DELAY_MAX = 10000;

let radarListeners: Array<(count: number) => void> = [];

export function subscribeRadar(fn: (count: number) => void): () => void {
  radarListeners.push(fn);
  return () => { radarListeners = radarListeners.filter((l) => l !== fn); };
}

function notifyRadar(count: number) {
  radarListeners.forEach((fn) => fn(count));
}

// Simulate radar — counts fluctuate to feel alive
let radarInterval: ReturnType<typeof setInterval> | null = null;

export function startRadarSimulation() {
  if (radarInterval) return;
  notifyRadar(Math.floor(Math.random() * 3) + 1);
  radarInterval = setInterval(() => {
    notifyRadar(Math.floor(Math.random() * 5) + 1);
  }, 4000);
}

export function stopRadarSimulation() {
  if (radarInterval) { clearInterval(radarInterval); radarInterval = null; }
}

export function getBotSolveTime(): number {
  return BOT_DELAY_MIN + Math.random() * (BOT_DELAY_MAX - BOT_DELAY_MIN);
}
