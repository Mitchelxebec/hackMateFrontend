import { useState } from "react";
import { ArrowUp, Zap, Database, GitBranch } from "lucide-react";
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
      className="min-h-screen bg-[#07040f] text-white flex flex-col items-center justify-center relative overflow-hidden antialiased selection:bg-violet-500/30"
      style={{ fontFamily: "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif" }}
    >
      {/* ── Background layers ── */}

      {/* Solid color patches so backdrop-filter has something to blur */}
      <div className="pointer-events-none absolute inset-0">
        {/* Main purple cloud */}
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[600px] h-[500px] rounded-full"
          style={{ background: "radial-gradient(ellipse,rgba(109,40,217,0.5) 0%,rgba(76,29,149,0.2) 50%,transparent 70%)", filter: "blur(60px)" }} />
        {/* Secondary violet bloom */}
        <div className="absolute top-[5%] left-1/2 -translate-x-1/2 w-[400px] h-[300px] rounded-full"
          style={{ background: "radial-gradient(ellipse,rgba(139,92,246,0.35) 0%,transparent 70%)", filter: "blur(40px)" }} />
        {/* Bottom fade */}
        <div className="absolute bottom-0 inset-x-0 h-64"
          style={{ background: "linear-gradient(to top,rgba(7,4,15,0.9),transparent)" }} />
      </div>

      {/* Subtle grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(139,92,246,0.8) 1px,transparent 1px),linear-gradient(90deg,rgba(139,92,246,0.8) 1px,transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* ── Content ── */}
      <main className="relative z-10 flex flex-col items-center text-center px-4 sm:px-8 w-full max-w-2xl mx-auto gap-7 py-10">

        {/* Logo orb */}
        <div className="flex flex-col items-center gap-3">
          <div className="relative">
            {/* Outer glow ring */}
            <div className="absolute inset-0 rounded-full bg-violet-500/20 blur-xl scale-150" />
            {/* Glass orb */}
            <div
              className="relative w-16 h-16 rounded-full flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg,rgba(139,92,246,0.4) 0%,rgba(109,40,217,0.6) 50%,rgba(76,29,149,0.8) 100%)",
                boxShadow: "0 0 40px rgba(139,92,246,0.5), inset 0 1px 0 rgba(255,255,255,0.2), inset 0 -1px 0 rgba(0,0,0,0.3)",
                border: "1px solid rgba(167,139,250,0.3)",
              }}
            >
              <img src={logo} alt="HackPilot" className="w-8 h-8 object-contain drop-shadow-lg" />
            </div>
          </div>
          <span
            className="text-violet-300 font-bold text-sm tracking-[0.15em] uppercase"
            style={{ textShadow: "0 0 20px rgba(139,92,246,0.8)" }}
          >
            HackPilot
          </span>
        </div>

        {/* Headline */}
        <div className="flex items-center justify-center h-10 sm:h-12 w-full">
          <h1 className="text-[20px] sm:text-[30px] md:text-[36px] font-black tracking-[-0.5px] sm:tracking-[-1px] leading-none text-white whitespace-nowrap">
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
        <p className="text-zinc-500 text-[13px] sm:text-[15px] leading-relaxed max-w-xs sm:max-w-md -mt-1">
          <span className="inline sm:hidden">Describe your idea and get a product blueprint in seconds.</span>
          <span className="hidden sm:inline">Describe your idea and get a full project blueprint — user stories, architecture, database schema, and sprint plan in seconds.</span>
        </p>

        {/* Glass input — pill that expands vertically as text grows */}
        <div className="w-full max-w-[92vw] sm:max-w-xl mx-auto">
          <div
            className="flex items-end gap-2 sm:gap-3 p-2 pl-5 pr-2 transition-all duration-300"
            style={{
              borderRadius: "9999px",
              background: "linear-gradient(135deg, rgba(139,92,246,0.08) 0%, rgba(109,40,217,0.12) 100%)",
              border: "1px solid rgba(139,92,246,0.35)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.04) inset, 0 1px 0 rgba(255,255,255,0.1) inset",
            }}
            onFocus={() => {}}
          >
            <textarea
              value={idea}
              onChange={(e) => {
                setIdea(e.target.value);
                const el = e.target as HTMLTextAreaElement;
                el.style.height = "auto";
                el.style.height = el.scrollHeight + "px";
              }}
              onKeyDown={handleKey}
              placeholder="Describe your hackathon idea..."
              disabled={loading}
              rows={1}
              className="flex-1 bg-transparent text-zinc-200 placeholder:text-zinc-600 text-[13px] sm:text-[14px] outline-none disabled:opacity-50 min-w-0 py-2.5 resize-none overflow-hidden leading-relaxed"
              style={{ minHeight: "40px", maxHeight: "200px" }}
            />
            <button
              onClick={handleSubmit}
              disabled={loading || idea.trim().length < 10}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full text-white flex items-center justify-center transition-all duration-200 shrink-0 disabled:opacity-30 cursor-pointer mb-0.5"
              style={{
                background: "linear-gradient(135deg,#7c3aed,#4f46e5)",
                boxShadow: "0 0 20px rgba(124,58,237,0.5), 0 0 40px rgba(124,58,237,0.2)",
              }}
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

        {/* 0G feature pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-1">
          {[
            { icon: Database, label: "Stored on 0G Network" },
            { icon: GitBranch, label: "Permanent artifact hash" },
            { icon: Zap, label: "AI-generated in seconds" },
          ].map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] text-zinc-500"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              <Icon size={11} className="text-violet-500" />
              {label}
            </div>
          ))}
        </div>

      </main>
    </div>
  );
}