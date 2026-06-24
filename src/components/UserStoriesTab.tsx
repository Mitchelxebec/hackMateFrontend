import type { UserStory } from "../types";

const priorityColor: Record<string, string> = {
  "must-have":    "bg-red-500/10 text-red-400 border border-red-500/20",
  "should-have":  "bg-amber-500/10 text-amber-400 border border-amber-500/20",
  "nice-to-have": "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
};

export function UserStoriesTab({ stories }: { stories: UserStory[] }) {
  return (
    <div className="max-w-4xl mx-auto space-y-4">
      {stories.map((s) => (
        <div key={s.id} className="bg-white/3 border border-white/[0.07] rounded-2xl p-5 hover:border-violet-500/20 transition-colors">
          <div className="flex items-center justify-between mb-3">
            <span className="text-zinc-600 text-xs font-mono">{s.id}</span>
            <span className={`text-xs px-2.5 py-0.5 rounded-full ${priorityColor[s.priority] ?? priorityColor["nice-to-have"]}`}>
              {s.priority}
            </span>
          </div>
          <p className="text-white text-sm mb-1">
            As a <span className="text-violet-400 font-medium">{s.role}</span>,{" "}
            I want to <span className="text-white font-medium">{s.goal}</span>
          </p>
          <p className="text-zinc-500 text-sm mb-4">so that {s.benefit}</p>
          <div className="space-y-1.5">
            {s.acceptanceCriteria.map((ac, i) => (
              <div key={i} className="flex items-start gap-2 text-xs text-zinc-500">
                <span className="text-violet-500 mt-0.5 shrink-0">✓</span>
                {ac}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
