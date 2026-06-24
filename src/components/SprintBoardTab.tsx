import type { SprintBoard } from "../types";

const pointColor: Record<number, string> = {
  1: "text-green-400",
  2: "text-green-400",
  3: "text-yellow-400",
  5: "text-orange-400",
  8: "text-red-400",
};

export function SprintBoardTab({ board }: { board: SprintBoard }) {
  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {board.sprints.map((sprint, i) => (
        <div key={i}>
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold rounded-full font-mono-display">
              Sprint {sprint.sprintNumber}
            </span>
            <p className="text-white/50 text-sm">{sprint.goal}</p>
          </div>

          <div className="space-y-4">
            {sprint.epics.map((epic, j) => (
              <div
                key={j}
                className="bg-white/5 border border-white/10 rounded-xl overflow-hidden"
              >
                <div className="px-5 py-3 border-b border-white/10">
                  <p className="text-white text-sm font-semibold">
                    {epic.epic}
                  </p>
                </div>
                <div className="divide-y divide-white/5">
                  {epic.tasks.map((task, k) => (
                    <div
                      key={k}
                      className="flex items-center gap-4 px-5 py-3 hover:bg-white/5 transition-colors"
                    >
                      <span className="text-white/20 text-xs font-mono-display w-14 shrink-0">
                        {task.id}
                      </span>
                      <p className="text-white/80 text-sm flex-1">
                        {task.title}
                      </p>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-xs px-2 py-0.5 bg-white/5 text-white/30 rounded font-mono-display">
                          {task.assignedTo}
                        </span>
                        <span className="text-xs px-2 py-0.5 bg-white/5 text-white/30 rounded">
                          {task.type}
                        </span>
                        <span
                          className={`text-xs font-bold font-mono-display ${pointColor[task.storyPoints] ?? "text-white/40"}`}
                        >
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
