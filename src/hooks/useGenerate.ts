import { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import type { GenerateResponse } from "../types";
import { generatePlan } from "../services/api";
import { addToHistory } from "../lib/history";

const STORAGE_KEY = "hackpilot_last_session";

export function useGenerate() {
  const [result, setResult] = useState<GenerateResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastIdea, setLastIdea] = useState("");
  const [liveHash, setLiveHash] = useState<string | undefined>(undefined);
  const { address } = useAccount();

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
    setLastIdea(projectIdea);
    setLiveHash(undefined);
    try {
      const data = await generatePlan(projectIdea);
      if (data.storageHash) setLiveHash(data.storageHash);
      await new Promise((r) => setTimeout(r, 1200));
      setResult(data);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      addToHistory(data, address);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  function loadPlan(plan: GenerateResponse) {
    setResult(plan);
    setError(null);
    setLastIdea(plan.projectIdea);
    setLiveHash(plan.storageHash);
  }

  function reset() {
    setResult(null);
    setError(null);
    setLiveHash(undefined);
    localStorage.removeItem(STORAGE_KEY);
  }

  return { result, loading, error, generate, loadPlan, reset, lastIdea, liveHash };
}
