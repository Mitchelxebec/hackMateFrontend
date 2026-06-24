import type { UserStory } from "../types";

const priorityStyles: Record<string, string> = {
  "must-have": "bg-red-500/10 text-red-400 border border-red-500/20",
  "should-have": "bg-amber-500/10 text-amber-400 border border-amber-500/20",
  "nice-to-have": "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
};

export function UserStoriesTab({ stories }: { stories: UserStory[] }) {
  return (
    <div className="max-w-3xl mx-auto space-y-4 flex flex-col gap-5">
      {stories.map((s) => (
        <div
          key={s.id}
          className="bg-white/3 border border-white/8 rounded-2xl p-6 hover:border-violet-500/20 transition-colors"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-mono text-zinc-600">{s.id}</span>
            <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${priorityStyles[s.priority] ?? priorityStyles["nice-to-have"]}`}>
              {s.priority}
            </span>
          </div>

          <p className="text-white text-[15px] leading-relaxed mb-1">
            As a{" "}
            <span className="text-violet-400 font-semibold">{s.role}</span>
            , I want to{" "}
            <span className="text-white font-medium">{s.goal}</span>
          </p>
          <p className="text-zinc-500 text-sm mb-5">so that {s.benefit}</p>

          <div className="space-y-2 border-t border-white/5 pt-4">
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