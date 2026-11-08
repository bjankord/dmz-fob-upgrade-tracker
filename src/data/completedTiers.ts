import { ref, watch } from "vue";

export const STORAGE_KEY = "fob-tracker:completed-tiers:v1";

/** Stable id for a tier across reloads, e.g. "bank:XII". */
export function tierKey(trackId: string, tierLabel: string): string {
  return `${trackId}:${tierLabel}`;
}

/** Reads stored tier ids, ignoring anything malformed. */
export function parseCompleted(raw: string | null): string[] {
  if (!raw) return [];
  try {
    const value: unknown = JSON.parse(raw);
    return Array.isArray(value) ? value.filter((v): v is string => typeof v === "string") : [];
  } catch {
    return [];
  }
}

function load(): string[] {
  try {
    return parseCompleted(localStorage.getItem(STORAGE_KEY));
  } catch {
    // Storage can be unavailable (private mode, blocked site data).
    return [];
  }
}

function save(keys: string[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(keys));
  } catch {
    // Keep working in memory if storage is unavailable.
  }
}

// One shared list for the whole app, so every tier reads the same state.
// Loaded on first use so importing this module never touches storage.
const completed = ref<string[]>([]);
let loaded = false;

export function useCompletedTiers() {
  if (!loaded) {
    loaded = true;
    completed.value = load();
    watch(completed, save, { deep: true });
  }

  function isCompleted(key: string): boolean {
    return completed.value.includes(key);
  }

  function toggle(key: string): void {
    completed.value = isCompleted(key)
      ? completed.value.filter((k) => k !== key)
      : [...completed.value, key];
  }

  return { isCompleted, toggle };
}
