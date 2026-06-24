import { useEffect, useState } from "react";

const STEPS = [
    { label: "Analysing your idea...", duration: 3000 },
    { label: "Writing user stories...", duration: 6000 },
    { label: "Scoping the MVP...", duration: 5000 },
    { label: "Designing the architecture...", duration: 7000 },
    { label: "Generating DB schema...", duration: 6000 },
    { label: "Planning sprints...", duration: 5000 },
    { label: "Storing on 0G Network...", duration: 4000 },
    { label: "Finalising your blueprint...", duration: 99999 }, // holds until done
];

interface Props {
    idea: string;
}

export function LoadingScreen({ idea }: Props) {
    const [stepIndex, setStepIndex] = useState(0);
    const [dots, setDots] = useState("");

    // Advance steps on a timer
    useEffect(() => {
        if (stepIndex >= STEPS.length - 1) return;
        const step = STEPS[stepIndex];
        if (!step) return;
        const t = setTimeout(() => setStepIndex((i) => i + 1), step.duration);
        return () => clearTimeout(t);
    }, [stepIndex]);

    // Animated dots
    useEffect(() => {
        const t = setInterval(() => {
            setDots((d) => (d.length >= 3 ? "" : d + "."));
        }, 400);
        return () => clearInterval(t);
    }, []);

    const progress = Math.min(((stepIndex + 1) / STEPS.length) * 100, 95);

    return (
        <div
            className="min-h-screen bg-[#05070f] text-white flex flex-col items-center justify-center px-4 relative overflow-hidden"
            style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}
        >
            {/* Glow */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-[radial-gradient(ellipse_60%_40%_at_50%_-10%,rgba(99,102,241,0.2),transparent)]" />

            <div className="relative z-10 w-full max-w-sm flex flex-col items-center gap-8">

                {/* Spinning ring */}
                <div className="relative w-16 h-16">
                    <svg className="w-full h-full animate-spin" viewBox="0 0 64 64">
                        <circle cx="32" cy="32" r="28" fill="none" stroke="rgba(139,92,246,0.15)" strokeWidth="4" />
                        <circle
                            cx="32" cy="32" r="28"
                            fill="none"
                            stroke="rgba(139,92,246,0.8)"
                            strokeWidth="4"
                            strokeLinecap="round"
                            strokeDasharray="44 132"
                        />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-violet-400" />
                    </div>
                </div>

                {/* Current step */}
                <div className="text-center">
                    <p className="text-white font-semibold text-base">
                        {STEPS[stepIndex]?.label ?? "Finalising..."}{dots}
                    </p>
                    <p className="text-zinc-600 text-xs mt-2 max-w-[240px] mx-auto leading-relaxed truncate">
                        {idea}
                    </p>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-white/5 rounded-full h-1 overflow-hidden">
                    <div
                        className="h-full bg-linear-to-r from-violet-600 to-indigo-400 rounded-full transition-all duration-700 ease-out"
                        style={{ width: `${progress}%` }}
                    />
                </div>

                {/* Completed steps */}
                <div className="w-full space-y-2">
                    {STEPS.slice(0, stepIndex).map((s, i) => (
                        <div key={i} className="flex items-center gap-2.5">
                            <span className="w-4 h-4 rounded-full bg-violet-500/20 border border-violet-500/40 flex items-center justify-center shrink-0">
                                <span className="text-violet-400 text-[10px]">✓</span>
                            </span>
                            <span className="text-zinc-600 text-xs">{s.label.replace("...", "")}</span>
                        </div>
                    ))}
                </div>

                <p className="text-zinc-700 text-xs text-center">
                    This usually takes 15–30 seconds
                </p>
            </div>
        </div>
    );
}