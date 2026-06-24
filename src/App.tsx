import { useGenerate } from "./hooks/useGenerate";
import { LandingPage } from "./pages/LandingPage";
import { ResultsPage } from "./pages/ResultPage";

export default function App() {
  const { result, loading, error, generate, reset } = useGenerate();

  if (result) {
    return <ResultsPage result={result} onReset={reset} />;
  }

  return <LandingPage onGenerate={generate} loading={loading} error={error} />;
}