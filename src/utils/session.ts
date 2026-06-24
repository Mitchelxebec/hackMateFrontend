import type { GenerateResponse } from "../types";

const STORAGE_KEY = "hackpilot:lastSession";

const REQUIRED_FIELDS: (keyof GenerateResponse)[] = [
  "sessionId", "projectIdea", "generatedAt",
  "userStories", "mvpScope", "architecture", "dbSchema", "sprintBoard",
];

export function saveSession(session: GenerateResponse): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
  } catch {
    // storage unavailable
  }
}

export function getSession(): GenerateResponse | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<GenerateResponse>;
    const isValid = REQUIRED_FIELDS.every((f) => parsed[f] !== undefined);
    if (!isValid) return null;
    return parsed as GenerateResponse;
  } catch {
    return null;
  }
}

export function clearSession(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // no-op
  }
}
