import type { UserStory } from "../types";

const priorityColor = {
  "must-have": "bg-red-500/10 text-red-400 border-red-500/20",
  "should-have": "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  "nice-to-have": "bg-green-500/10 text-green-400 border-green-500/20",
};

export function UserStoriesTab({ stories }: { stories: UserStory[] }) {
  return (
    <div className="max-w-4xl mx-auto space-y-4">
      {stories.map((s) => (
        <div
          key={s.id}
          className="bg-[#141414] border border-white/10 rounded-xl p-5"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-white/30 text-xs font-mono">{s.id}</span>
            <span
              className={`text-xs px-2 py-0.5 rounded-full border ${priorityColor[s.priority]}`}
            >
              {s.priority}
            </span>
          </div>
          <p className="text-white text-sm mb-1">
            As a <span className="text-indigo-400 font-medium">{s.role}</span>,
            I want to <span className="text-white font-medium">{s.goal}</span>
          </p>
          <p className="text-white/40 text-sm mb-4">so that {s.benefit}</p>
          <div className="space-y-1.5">
            {s.acceptanceCriteria.map((ac, i) => (
              <div
                key={i}
                className="flex items-start gap-2 text-xs text-white/50"
              >
                <span className="text-indigo-400 mt-0.5">✓</span>
                {ac}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
