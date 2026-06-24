import { useGenerate } from "./hooks/useGenerate";
import { LandingPage } from "./pages/LandingPage";
import { ResultsPage } from "./pages/ResultPage";
import { LoadingScreen } from "./components/LoadingScreen";

export default function App() {
  const { result, loading, error, generate, reset, lastIdea } = useGenerate();

  if (loading) {
    return <LoadingScreen idea={lastIdea} />;
  }

  if (result) {
    return <ResultsPage result={result} onReset={reset} />;
  }

  return <LandingPage onGenerate={generate} loading={loading} error={error} />;
}