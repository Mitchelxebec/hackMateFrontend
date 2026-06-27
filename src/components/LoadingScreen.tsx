import { useEffect, useState } from "react";
import logo from "../assets/HackthonTeammateLogo.png";

const STEPS = [
  { label: "Analysing your idea" },
  { label: "Writing user stories" },
  { label: "Scoping the MVP" },
  { label: "Designing the architecture" },
  { label: "Generating DB schema" },
  { label: "Planning sprints" },
  { label: "Storing on 0G Network" },
  { label: "Finalising your blueprint" },
];

const STEP_DURATION = 3200;

interface Props {
  idea: string;
  storageHash?: string;
}

export function LoadingScreen({ idea, storageHash }: Props) {
  const [stepIndex, setStepIndex] = useState(0);
  const [dots, setDots] = useState("");
  const [hashVisible, setHashVisible] = useState(false);

  useEffect(() => {
    if (stepIndex >= STEPS.length - 1) return;
    const t = setTimeout(() => setStepIndex((i) => i + 1), STEP_DURATION);
    return () => clearTimeout(t);
  }, [stepIndex]);

  useEffect(() => {
    const t = setInterval(() => setDots((d) => (d.length >= 3 ? "" : d + ".")), 400);
    return () => clearInterval(t);
  }, []);

  // Show hash with a small delay for dramatic effect
  useEffect(() => {
    if (!storageHash) return;
    const t = setTimeout(() => setHashVisible(true), 300);
    return () => clearTimeout(t);
  }, [storageHash]);

  const progress = Math.min(((stepIndex + 1) / STEPS.length) * 100, storageHash ? 100 : 95);

  const GLASS = {
    background: "rgba(139,92,246,0.07)",
    border: "1px solid rgba(139,92,246,0.2)",
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
    boxShadow: "0 8px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)",
  };

  const HASH_GLASS = {
    background: "rgba(16,185,129,0.06)",
    border: "1px solid rgba(16,185,129,0.25)",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    boxShadow: "0 0 24px rgba(16,185,129,0.12), inset 0 1px 0 rgba(255,255,255,0.04)",
  };

  return (
    <div
      className="min-h-screen bg-[#07040f] text-white flex flex-col items-center justify-center px-6 relative overflow-hidden"
      style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}
    >
      {/* Background — same as landing */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full"
          style={{ background: "radial-gradient(ellipse,rgba(109,40,217,0.4) 0%,rgba(76,29,149,0.15) 50%,transparent 70%)", filter: "blur(70px)" }} />
        <div className="absolute top-[0%] left-1/2 -translate-x-1/2 w-[400px] h-[300px] rounded-full"
          style={{ background: "radial-gradient(ellipse,rgba(139,92,246,0.25) 0%,transparent 70%)", filter: "blur(50px)" }} />
        {/* Emerald bloom when hash arrives */}
        {storageHash && (
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full transition-opacity duration-1000"
            style={{ background: "radial-gradient(ellipse,rgba(16,185,129,0.2) 0%,transparent 70%)", filter: "blur(60px)", opacity: hashVisible ? 1 : 0 }} />
        )}
        <div className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "linear-gradient(rgba(139,92,246,0.8) 1px,transparent 1px),linear-gradient(90deg,rgba(139,92,246,0.8) 1px,transparent 1px)",
            backgroundSize: "48px 48px",
          }} />
      </div>

      {/* Main glass card */}
      <div className="relative z-10 w-full max-w-md rounded-3xl p-8 flex flex-col items-center gap-6" style={GLASS}>

        {/* Logo */}
        <div className="flex flex-col items-center gap-2">
          <div className="w-14 h-14 rounded-full flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg,rgba(139,92,246,0.4),rgba(109,40,217,0.7))",
              border: "1px solid rgba(167,139,250,0.4)",
              boxShadow: "0 0 32px rgba(139,92,246,0.5)",
            }}>
            <img src={logo} alt="HackPilot" className="w-8 h-8 object-contain" />
          </div>
          <span className="text-violet-400 font-semibold text-sm tracking-wide">HackPilot</span>
        </div>

        {/* Idea */}
        {idea && (
          <p className="text-center text-sm leading-relaxed px-2 line-clamp-2" style={{ color: "rgba(255,255,255,0.45)" }}>
            {idea}
          </p>
        )}

        {/* Spinner + current step */}
        <div className="flex flex-col items-center gap-3 w-full">
          <div className="relative flex items-center justify-center">
            <div className="absolute w-16 h-16 rounded-full animate-ping opacity-30"
              style={{ background: storageHash ? "rgba(16,185,129,0.3)" : "rgba(139,92,246,0.2)" }} />
            <svg className="w-14 h-14 animate-spin" viewBox="0 0 56 56" style={{ animationDuration: "1.2s" }}>
              <circle cx="28" cy="28" r="24" fill="none" stroke="rgba(139,92,246,0.12)" strokeWidth="3" />
              <circle cx="28" cy="28" r="24" fill="none" stroke="url(#spinGrad)" strokeWidth="3"
                strokeLinecap="round" strokeDasharray="38 114" />
              <defs>
                <linearGradient id="spinGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor={storageHash ? "#10b981" : "#7c3aed"} />
                  <stop offset="100%" stopColor={storageHash ? "#34d399" : "#a78bfa"} />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute w-3 h-3 rounded-full transition-all duration-500"
              style={{
                background: storageHash ? "radial-gradient(circle,#6ee7b7,#10b981)" : "radial-gradient(circle,#c4b5fd,#7c3aed)",
                boxShadow: storageHash ? "0 0 12px rgba(16,185,129,0.9)" : "0 0 12px rgba(167,139,250,0.8)",
              }} />
          </div>

          <p className="text-white font-semibold text-base text-center">
            {storageHash ? "Blueprint ready!" : `${STEPS[stepIndex]?.label ?? "Finalising"}${dots}`}
          </p>
        </div>

        {/* Progress bar */}
        <div className="w-full h-1 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
          <div className="h-full rounded-full transition-all duration-700 ease-out"
            style={{
              width: `${progress}%`,
              background: storageHash
                ? "linear-gradient(90deg,#10b981,#34d399)"
                : "linear-gradient(90deg,#7c3aed,#a78bfa)",
              boxShadow: storageHash ? "0 0 8px rgba(52,211,153,0.7)" : "0 0 8px rgba(167,139,250,0.6)",
            }} />
        </div>

        {/* 0G Hash reveal */}
        {storageHash && (
          <div
            className="w-full rounded-2xl p-4 transition-all duration-700"
            style={{
              ...HASH_GLASS,
              opacity: hashVisible ? 1 : 0,
              transform: hashVisible ? "translateY(0)" : "translateY(8px)",
            }}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-emerald-400 text-xs font-semibold tracking-wide uppercase">
                Stored on 0G Network
              </span>
            </div>
            <p className="text-zinc-400 text-[11px] font-mono break-all leading-relaxed">
              {storageHash}
            </p>
          </div>
        )}

        {/* Completed steps */}
        {!storageHash && (
          <div className="w-full space-y-2">
            {STEPS.slice(0, stepIndex).map((s, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                  style={{ background: "rgba(139,92,246,0.2)", border: "1px solid rgba(139,92,246,0.4)" }}>
                  <span className="text-violet-400 text-[10px] font-bold">✓</span>
                </div>
                <span className="text-zinc-600 text-xs">{s.label}</span>
              </div>
            ))}
          </div>
        )}

        <p className="text-zinc-700 text-xs">
          {storageHash ? "Redirecting to your blueprint..." : "Usually takes 15–30 seconds"}
        </p>
      </div>
    </div>
  );
}
