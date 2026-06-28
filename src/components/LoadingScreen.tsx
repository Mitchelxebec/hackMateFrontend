import { useEffect, useState } from "react";
import logo from "../assets/HackthonTeammateLogo.png";

const STEPS = [
  { label: "Analysing your idea", icon: "🔍" },
  { label: "Writing user stories", icon: "📝" },
  { label: "Scoping the MVP", icon: "🎯" },
  { label: "Designing the architecture", icon: "🏗️" },
  { label: "Generating DB schema", icon: "🗄️" },
  { label: "Planning sprints", icon: "📋" },
  { label: "Storing on 0G Network", icon: "⛓️" },
  { label: "Finalising your blueprint", icon: "✨" },
];

const STEP_DURATION = 3200;

interface Props {
  idea: string;
  storageHash?: string;
}

function Particle({ index }: { index: number }) {
  const size = Math.random() * 3 + 1;
  const x = Math.random() * 100;
  const delay = Math.random() * 8;
  const duration = Math.random() * 6 + 6;

  return (
    <div
      className="absolute rounded-full"
      style={{
        width: size,
        height: size,
        left: `${x}%`,
        bottom: "-10px",
        background: index % 3 === 0 ? "rgba(139,92,246,0.6)" : index % 3 === 1 ? "rgba(16,185,129,0.4)" : "rgba(167,139,250,0.3)",
        boxShadow: index % 3 === 0 ? "0 0 6px rgba(139,92,246,0.4)" : "0 0 4px rgba(16,185,129,0.3)",
        animation: `floatUp ${duration}s ease-in-out ${delay}s infinite`,
      }}
    />
  );
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

  useEffect(() => {
    if (!storageHash) return;
    const t = setTimeout(() => setHashVisible(true), 300);
    return () => clearTimeout(t);
  }, [storageHash]);

  const GLASS = {
    background: "rgba(139,92,246,0.07)",
    border: "1px solid rgba(139,92,246,0.2)",
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
    boxShadow: "0 8px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)",
  };

  return (
    <div
      className="min-h-screen bg-[#07040f] text-white flex flex-col items-center justify-center px-6 relative overflow-hidden"
      style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}
    >
      <style>{`
        @keyframes floatUp {
          0% { transform: translateY(0) scale(1); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(-100vh) scale(0.5); opacity: 0; }
        }
        @keyframes breathe {
          0%, 100% { transform: scale(1); opacity: 0.6; }
          50% { transform: scale(1.15); opacity: 1; }
        }
        @keyframes slideUp {
          0% { transform: translateY(20px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        @keyframes slideDown {
          0% { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(-20px); opacity: 0; }
        }
        @keyframes glowPulse {
          0%, 100% { box-shadow: 0 0 20px rgba(139,92,246,0.3), 0 0 40px rgba(139,92,246,0.1); }
          50% { box-shadow: 0 0 30px rgba(139,92,246,0.6), 0 0 60px rgba(139,92,246,0.2); }
        }
        @keyframes checkIn {
          0% { transform: scale(0); opacity: 0; }
          60% { transform: scale(1.2); }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes hashReveal {
          0% { opacity: 0; transform: translateY(12px) scale(0.95); filter: blur(4px); }
          100% { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
        }
      `}</style>

      {/* Floating particles */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {Array.from({ length: 18 }).map((_, i) => (
          <Particle key={i} index={i} />
        ))}
      </div>

      {/* Background blooms */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full"
          style={{ background: "radial-gradient(ellipse,rgba(109,40,217,0.4) 0%,rgba(76,29,149,0.15) 50%,transparent 70%)", filter: "blur(70px)" }} />
        <div className="absolute top-[0%] left-1/2 -translate-x-1/2 w-[400px] h-[300px] rounded-full"
          style={{ background: "radial-gradient(ellipse,rgba(139,92,246,0.25) 0%,transparent 70%)", filter: "blur(50px)" }} />
        {storageHash && (
          <div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full transition-all duration-1000"
            style={{
              background: "radial-gradient(ellipse,rgba(16,185,129,0.2) 0%,transparent 70%)",
              filter: "blur(60px)",
              opacity: hashVisible ? 1 : 0,
              transform: hashVisible ? "scale(1)" : "scale(0.8)",
            }}
          />
        )}
        <div className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "linear-gradient(rgba(139,92,246,0.8) 1px,transparent 1px),linear-gradient(90deg,rgba(139,92,246,0.8) 1px,transparent 1px)",
            backgroundSize: "48px 48px",
          }} />
      </div>

      {/* Main glass card */}
      <div className="relative z-10 w-full max-w-md rounded-3xl p-8 flex flex-col items-center gap-6" style={GLASS}>

        {/* Logo with breathing ring */}
        <div className="flex flex-col items-center gap-2">
          <div className="relative">
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background: "radial-gradient(circle,rgba(139,92,246,0.3),transparent 70%)",
                animation: "breathe 3s ease-in-out infinite",
              }}
            />
            <div
              className="relative w-14 h-14 rounded-full flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg,rgba(139,92,246,0.4),rgba(109,40,217,0.7))",
                border: "1px solid rgba(167,139,250,0.4)",
                animation: storageHash ? "none" : "glowPulse 3s ease-in-out infinite",
                boxShadow: storageHash
                  ? "0 0 32px rgba(16,185,129,0.5)"
                  : "0 0 32px rgba(139,92,246,0.5)",
              }}>
              <img src={logo} alt="HackPilot" className="w-8 h-8 object-contain" />
            </div>
          </div>
          <span
            className="font-bold text-sm tracking-wide"
            style={{ color: storageHash ? "#6ee7b7" : "#c4b5fd" }}
          >
            HackPilot
          </span>
        </div>

        {/* Idea in a pill */}
        {idea && (
          <div
            className="w-full rounded-2xl px-4 py-3 text-center"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <p className="text-[13px] leading-relaxed line-clamp-2" style={{ color: "rgba(255,255,255,0.5)" }}>
              "{idea}"
            </p>
          </div>
        )}

        {/* Current step with slide animation */}
        <div className="flex flex-col items-center gap-4 w-full">
          {/* Spinner */}
          <div className="relative flex items-center justify-center">
            <div
              className="absolute w-16 h-16 rounded-full animate-ping"
              style={{
                background: storageHash ? "rgba(16,185,129,0.2)" : "rgba(139,92,246,0.15)",
                animation: "ping 2s cubic-bezier(0, 0, 0.2, 1) infinite",
              }}
            />
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
            <div className="absolute w-3 h-3 rounded-full"
              style={{
                background: storageHash ? "radial-gradient(circle,#6ee7b7,#10b981)" : "radial-gradient(circle,#c4b5fd,#7c3aed)",
                boxShadow: storageHash ? "0 0 12px rgba(16,185,129,0.9)" : "0 0 12px rgba(167,139,250,0.8)",
              }} />
          </div>

          {/* Step label with slide transition */}
          <div className="h-10 flex items-center justify-center overflow-hidden relative w-full">
            {storageHash ? (
              <p
                className="text-lg font-bold text-emerald-400"
                style={{ animation: "slideUp 0.5s ease-out" }}
              >
                Blueprint ready! ✨
              </p>
            ) : (
              <div className="relative w-full text-center">
                <p
                  key={stepIndex}
                  className="text-base font-semibold"
                  style={{
                    animation: "slideUp 0.45s ease-out",
                    color: "rgba(255,255,255,0.9)",
                  }}
                >
                  {STEPS[stepIndex]?.icon} {STEPS[stepIndex]?.label}{dots}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Segmented step dots */}
        {!storageHash && (
          <div className="flex items-center gap-1.5 w-full justify-center">
            {STEPS.map((_, i) => (
              <div
                key={i}
                className="rounded-full transition-all duration-500"
                style={{
                  width: i === stepIndex ? 20 : i < stepIndex ? 6 : 6,
                  height: 4,
                  background: i === stepIndex
                    ? "linear-gradient(90deg,#7c3aed,#a78bfa)"
                    : i < stepIndex
                      ? "rgba(139,92,246,0.4)"
                      : "rgba(255,255,255,0.08)",
                  boxShadow: i === stepIndex ? "0 0 8px rgba(167,139,250,0.6)" : "none",
                }}
              />
            ))}
          </div>
        )}

        {/* 0G Hash reveal */}
        {storageHash && (
          <div
            className="w-full rounded-2xl p-4"
            style={{
              background: "rgba(16,185,129,0.06)",
              border: "1px solid rgba(16,185,129,0.25)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              boxShadow: "0 0 24px rgba(16,185,129,0.12), inset 0 1px 0 rgba(255,255,255,0.04)",
              opacity: hashVisible ? 1 : 0,
              animation: hashVisible ? "hashReveal 0.7s ease-out" : "none",
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
              <div
                key={i}
                className="flex items-center gap-3"
                style={{
                  animation: "checkIn 0.4s ease-out",
                  animationDelay: "0s",
                  animationFillMode: "both",
                }}
              >
                <div
                  className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                  style={{
                    background: "rgba(16,185,129,0.15)",
                    border: "1px solid rgba(16,185,129,0.4)",
                  }}
                >
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
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
