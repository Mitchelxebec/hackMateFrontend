import type { SprintBoard } from "../types";

const pointColor: Record<number, string> = {
  1: "text-emerald-400", 2: "text-emerald-400",
  3: "text-amber-400",   5: "text-orange-400",
  8: "text-red-400",
};

const typeColor: Record<string, string> = {
  feature: "bg-blue-500/10 text-blue-400",
  chore:   "bg-zinc-500/10 text-zinc-400",
  bug:     "bg-red-500/10 text-red-400",
  design:  "bg-pink-500/10 text-pink-400",
  devops:  "bg-amber-500/10 text-amber-400",
};

export function SprintBoardTab({ board }: { board: SprintBoard }) {
  return (
    <div className="space-y-10">
      {board.sprints.map((sprint, i) => (
        <div key={i}>
          {/* Sprint header */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-5">
            <span className="self-start px-3 py-1 bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-bold rounded-full shrink-0">
              Sprint {sprint.sprintNumber}
            </span>
            <p className="text-zinc-500 text-sm leading-relaxed">{sprint.goal}</p>
          </div>

          <div className="space-y-4">
            {sprint.epics.map((epic, j) => (
              <div key={j} className="bg-white/3 border border-white/8 rounded-2xl overflow-hidden">
                {/* Epic header */}
                <div className="px-4 md:px-6 py-4 border-b border-white/8">
                  <p className="text-white font-semibold text-sm">{epic.epic}</p>
                </div>

                {/* Tasks */}
                <div className="divide-y divide-white/5">
                  {epic.tasks.map((task, k) => (
                    <div key={k} className="px-4 md:px-6 py-4 hover:bg-white/2 transition-colors">
                      {/* Mobile: stacked layout */}
                      <div className="flex items-start gap-3">
                        <span className="text-zinc-700 text-xs font-mono mt-0.5 shrink-0 w-10">
                          {task.id}
                        </span>
                        <div className="flex-1 min-w-0">
                          <p className="text-zinc-300 text-sm leading-relaxed mb-2">
                            {task.title}
                          </p>
                          {/* Badges row — wraps naturally on mobile */}
                          <div className="flex flex-wrap items-center gap-1.5">
                            <span className={`text-[11px] px-2 py-0.5 rounded-md font-medium ${typeColor[task.type] ?? "bg-zinc-500/10 text-zinc-400"}`}>
                              {task.type}
                            </span>
                            <span className="text-[11px] px-2 py-0.5 bg-white/5 text-zinc-500 rounded-md">
                              {task.assignedTo}
                            </span>
                            <span className={`text-[11px] font-bold font-mono ${pointColor[task.storyPoints] ?? "text-zinc-500"}`}>
                              {task.storyPoints}pt
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}