import type { UserStory } from "../types";

const priorityStyles: Record<string, string> = {
  "must-have":    "bg-red-500/15 text-red-300 border border-red-500/25",
  "should-have":  "bg-amber-500/15 text-amber-300 border border-amber-500/25",
  "nice-to-have": "bg-emerald-500/15 text-emerald-300 border border-emerald-500/25",
};

const GLASS = {
  background: "rgba(139,92,246,0.06)",
  border: "1px solid rgba(139,92,246,0.18)",
  backdropFilter: "blur(16px)",
  WebkitBackdropFilter: "blur(16px)",
  boxShadow: "0 4px 24px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)",
};

export function UserStoriesTab({ stories }: { stories: UserStory[] }) {
  return (
    <div className="space-y-4">
      {stories.map((s) => (
        <div key={s.id} className="rounded-2xl p-6 transition-all hover:scale-[1.005]" style={GLASS}>
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-mono text-zinc-600">{s.id}</span>
            <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${priorityStyles[s.priority] ?? priorityStyles["nice-to-have"]}`}>
              {s.priority}
            </span>
          </div>
          <p className="text-white text-[15px] leading-relaxed mb-1">
            As a <span className="text-violet-400 font-semibold">{s.role}</span>,{" "}
            <span className="text-white font-medium">{s.goal}</span>
          </p>
          <p className="text-zinc-500 text-sm mb-5">{s.benefit}</p>
          <div className="space-y-2 border-t pt-4" style={{ borderColor: "rgba(139,92,246,0.12)" }}>
            {s.acceptanceCriteria.map((ac, i) => (
              <div key={i} className="flex items-start gap-2.5">
                <span className="text-violet-500 text-xs mt-0.5 shrink-0">✓</span>
                <span className="text-zinc-400 text-sm leading-relaxed">{ac}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}