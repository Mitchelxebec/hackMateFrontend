import type { GenerateResponse } from "../types";

export interface PlanRecord {
  id: string;
  idea: string;
  timestamp: string;
  storageHash?: string;
  sessionId: string;
}

function historyKey(address?: string): string {
  return address ? `hackpilot_history_${address.toLowerCase()}` : "hackpilot_history";
}

export function loadHistory(address?: string): PlanRecord[] {
  try {
    const key = historyKey(address);
    const raw = localStorage.getItem(key);
    if (raw) return JSON.parse(raw);
    // Fallback to anonymous key for backward compatibility
    if (address) {
      const fallback = localStorage.getItem("hackpilot_history");
      if (fallback) return JSON.parse(fallback);
    }
    return [];
  } catch {
    return [];
  }
}

export function addToHistory(plan: GenerateResponse, address?: string): void {
  const record: PlanRecord = {
    id: plan.sessionId,
    idea: plan.projectIdea,
    timestamp: plan.generatedAt,
    storageHash: plan.storageHash,
    sessionId: plan.sessionId,
  };
  const list = loadHistory(address);
  const filtered = list.filter((h) => h.id !== record.id);
  filtered.unshift(record);
  localStorage.setItem(historyKey(address), JSON.stringify(filtered));
  localStorage.setItem(`hackpilot_plan_${plan.sessionId}`, JSON.stringify(plan));
}

export function getPlanById(id: string): GenerateResponse | null {
  try {
    return JSON.parse(localStorage.getItem(`hackpilot_plan_${id}`) || "null");
  } catch {
    return null;
  }
}

export function removeFromHistory(id: string, address?: string): void {
  const list = loadHistory(address);
  localStorage.setItem(historyKey(address), JSON.stringify(list.filter((h) => h.id !== id)));
  localStorage.removeItem(`hackpilot_plan_${id}`);
}
