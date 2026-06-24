import type { SprintBoard } from "../types";

const pointColor: Record<number, string> = {
  1: "text-emerald-400", 2: "text-emerald-400",
  3: "text-amber-400",   5: "text-orange-400",
  8: "text-red-400",
};

export function SprintBoardTab({ board }: { board: SprintBoard }) {
  return (
    <div className="max-w-5xl mx-auto space-y-10">
      {board.sprints.map((sprint, i) => (
        <div key={i}>
          <div className="flex items-center gap-3 mb-5">
            <span className="px-3 py-1 bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-semibold rounded-full">
              Sprint {sprint.sprintNumber}
            </span>
            <p className="text-zinc-500 text-sm">{sprint.goal}</p>
          </div>

          <div className="space-y-4">
            {sprint.epics.map((epic, j) => (
              <div key={j} className="bg-white/3 border border-white/[0.07] rounded-2xl overflow-hidden">
                <div className="px-5 py-3 border-b border-white/6">
                  <p className="text-white text-sm font-semibold">{epic.epic}</p>
                </div>
                <div className="divide-y divide-white/4">
                  {epic.tasks.map((task, k) => (
                    <div key={k} className="flex items-center gap-4 px-5 py-3 hover:bg-white/2 transition-colors">
                      <span className="text-zinc-700 text-xs font-mono w-14 shrink-0">{task.id}</span>
                      <p className="text-zinc-300 text-sm flex-1">{task.title}</p>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-xs px-2 py-0.5 bg-white/4 text-zinc-500 rounded border border-white/6">
                          {task.assignedTo}
                        </span>
                        <span className="text-xs px-2 py-0.5 bg-white/4 text-zinc-500 rounded border border-white/6">
                          {task.type}
                        </span>
                        <span className={`text-xs font-bold font-mono ${pointColor[task.storyPoints] ?? "text-zinc-500"}`}>
                          {task.storyPoints}pt
                        </span>
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
