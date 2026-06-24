import { useState } from "react";
import { ArrowUp } from "lucide-react";
import logo from "../assets/HackthonTeammateLogo.png";
import TextType from "../components/TextType";

interface Props {
  onGenerate: (idea: string) => void;
  loading: boolean;
  error: string | null;
}

export function LandingPage({ onGenerate, loading, error }: Props) {
  const [idea, setIdea] = useState("");

  function handleSubmit() {
    const trimmed = idea.trim();
    if (trimmed.length < 10 || loading) return;
    onGenerate(trimmed);
  }

  function handleKey(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  }

  return (
    <div
      className="min-h-screen bg-[#05070f] text-white flex flex-col items-center justify-center relative overflow-hidden antialiased selection:bg-violet-500/30 w-full"
      style={{ fontFamily: "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif" }}
    >
      {/* Radial glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-x-0 top-0 h-130 bg-[radial-gradient(ellipse_70%_60%_at_50%_-10%,rgba(99,102,241,0.22),transparent)]" />
        <div className="absolute inset-x-0 top-0 h-100 bg-[radial-gradient(ellipse_40%_40%_at_50%_0%,rgba(139,92,246,0.15),transparent)]" />
      </div>

      <main className="relative z-10 flex flex-col items-center text-center px-4 sm:px-8 w-full max-w-2xl mx-auto gap-6 sm:gap-7 py-8">

        {/* Logo + brand */}
        <div className="flex flex-col items-center gap-2">
          <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full border border-violet-500/30 bg-violet-500/10 flex items-center justify-center shadow-[0_0_24px_rgba(139,92,246,0.3)]">
            <img src={logo} alt="HackPilot" className="w-6 h-6 sm:w-7 sm:h-7 object-contain" />
          </div>
          <span className="text-violet-400 font-semibold text-xs sm:text-sm tracking-wide">
            HackPilot
          </span>
        </div>

        {/* Headline */}
        <div className="w-full flex items-center justify-center h-10 sm:h-12">          
          <h1 className="text-[20px] sm:text-[30px] md:text-[36px] font-black tracking-[-0.5px] sm:tracking-[-1px] leading-none text-white text-center whitespace-nowrap">
          <TextType
            text={[
              "Your AI Hackathon Teammate",
              "From Idea to Blueprint",
              "Build Smarter, Ship Faster",
            ]}
            typingSpeed={55}
            deletingSpeed={28}
            pauseDuration={2200}
            cursorCharacter="|"
            cursorClassName="text-violet-400"
            showCursor={true}
            loop={true}
            className="text-white"
          />
        </h1>
        </div>

        {/* Subtitle */}
        <p className="text-zinc-500 text-[13px] sm:text-[15px] leading-relaxed font-normal max-w-xs sm:max-w-md">
          <span className="inline sm:hidden">
            Describe your idea and get product blueprint in seconds.
          </span>
          <span className="hidden sm:inline">
            Describe your idea and get a full project blueprint user stories, architecture, database schema, and sprint plan in seconds.
          </span>
        </p>

        {/* Responsively bounded wrapper with interior breathing space padding */}
        <div className="w-full max-w-[92vw] sm:max-w-xl mx-auto px-1">
          <div className="flex items-center gap-2 sm:gap-3 bg-[#0e1016] border border-white/10 rounded-full p-2 pl-5 pr-2 shadow-xl shadow-black/60 focus-within:border-violet-500/40 transition-colors duration-200">
            <input
              type="text"
              value={idea}
              onChange={(e) => setIdea(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Describe your hackathon idea..."
              disabled={loading}
              className="flex-1 bg-transparent text-zinc-200 placeholder:text-zinc-600 text-[13px] sm:text-[14px] outline-none disabled:opacity-50 min-w-0 py-2.5 pl-2 sm:pl-3"
            />

            <button
              onClick={handleSubmit}
              disabled={loading || idea.trim().length < 10}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-blue-600 hover:bg-blue-500 disabled:bg-zinc-800 disabled:text-zinc-600 text-white flex items-center justify-center transition-all duration-200 shrink-0 shadow-lg shadow-blue-500/20 cursor-pointer"
            >
              {loading ? (
                <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <ArrowUp className="w-3.5 h-3.5 sm:w-4 sm:h-4" strokeWidth={2.5} />
              )}
            </button>

          </div>

          {error && (
            <p className="text-red-400 text-xs mt-3 text-center font-mono">{error}</p>
          )}
        </div>

      </main>
    </div>
  );
}
