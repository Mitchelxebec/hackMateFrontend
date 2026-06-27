import { useEffect, useState } from "react";
import { useGenerate } from "./hooks/useGenerate";
import { LandingPage } from "./pages/LandingPage";
import { ResultsPage } from "./pages/ResultPage";
import { LoadingScreen } from "./components/LoadingScreen";
import { fetchPlanByHash } from "./services/share";
import type { GenerateResponse } from "./types";

export default function App() {
  const { result, loading, error, generate, reset, lastIdea, liveHash } = useGenerate();
  const [sharedPlan, setSharedPlan] = useState<GenerateResponse | null>(null);
  const [sharedLoading, setSharedLoading] = useState(false);
  const [sharedError, setSharedError] = useState<string | null>(null);

  // Handle /plan/:hash route on mount
  useEffect(() => {
    const path = window.location.pathname;
    const match = path.match(/^\/plan\/(.+)$/);
    if (!match) return;

    const hash = decodeURIComponent(match[1]);
    setSharedLoading(true);
    setSharedError(null);

    fetchPlanByHash(hash)
      .then((plan) => setSharedPlan(plan))
      .catch((err) => setSharedError(err instanceof Error ? err.message : "Failed to load plan"))
      .finally(() => setSharedLoading(false));
  }, []);

  // Shared plan view
  if (sharedLoading) return <LoadingScreen idea="Loading shared plan from 0G Storage..." />;

  if (sharedError) {
    return (
      <div className="min-h-screen bg-[#07040f] flex flex-col items-center justify-center text-center px-6"
        style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}>
        <p className="text-zinc-600 text-sm mb-2">Could not load shared plan</p>
        <p className="text-red-400 text-sm mb-6">{sharedError}</p>
        <button
          onClick={() => { window.history.pushState({}, "", "/"); setSharedError(null); }}
          className="text-violet-400 text-sm hover:underline"
        >
          ← Go home
        </button>
      </div>
    );
  }

  if (sharedPlan) {
    return <ResultsPage result={sharedPlan} onReset={() => { window.history.pushState({}, "", "/"); setSharedPlan(null); }} />;
  }

  // Normal app flow
  if (loading) return <LoadingScreen idea={lastIdea} storageHash={liveHash} />;
  if (result)  return <ResultsPage result={result} onReset={reset} />;

  return <LandingPage onGenerate={generate} loading={loading} error={error} />;
}
