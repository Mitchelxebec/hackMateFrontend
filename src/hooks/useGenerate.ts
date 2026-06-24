import { useState, useEffect } from "react";
import type { GenerateResponse } from "../types";
import { generatePlan } from "../services/api";

const STORAGE_KEY = "hackpilot_last_session";

export function useGenerate() {
  const [result, setResult] = useState<GenerateResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Restore last session on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setResult(JSON.parse(saved) as GenerateResponse);
    } catch {
      // ignore
    }
  }, []);

  async function generate(projectIdea: string) {
    setLoading(true);
    setError(null);
    try {
      const data = await generatePlan(projectIdea);
      setResult(data);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Cannot reach the server — please try again shortly.");
    } finally {
      setLoading(false);
    }
  }

  function reset() {
    setResult(null);
    setError(null);
    localStorage.removeItem(STORAGE_KEY);
  }

  return { result, loading, error, generate, reset };
}