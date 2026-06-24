import type { Architecture } from "../types";

export function ArchitectureTab({
  architecture,
}: {
  architecture: Architecture;
}) {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white/5 border border-white/10 rounded-xl p-5">
        <p className="text-white/30 text-xs font-mono-display mb-1">Pattern</p>
        <p className="text-cyan-400 font-semibold text-sm">
          {architecture.pattern}
        </p>
        <p className="text-white/60 text-sm mt-3 leading-relaxed">
          {architecture.overview}
        </p>
      </div>

      <div>
        <h3 className="text-white/40 text-xs font-mono-display mb-3 uppercase tracking-widest">
          Components
        </h3>
        <div className="grid md:grid-cols-2 gap-3">
          {architecture.components.map((c, i) => (
            <div
              key={i}
              className="bg-white/5 border border-white/10 rounded-xl p-4"
            >
              <div className="flex items-start justify-between mb-2">
                <p className="text-white text-sm font-semibold">{c.name}</p>
                <span className="text-xs px-2 py-0.5 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-full shrink-0 ml-2">
                  {c.type}
                </span>
              </div>
              <p className="text-white/40 text-xs leading-relaxed mb-3">
                {c.description}
              </p>
              <p className="text-white/30 text-xs font-mono-display">
                {c.techChoice}
              </p>
              {c.communicatesWith.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {c.communicatesWith.map((dep, j) => (
                    <span
                      key={j}
                      className="text-xs px-1.5 py-0.5 bg-white/5 text-white/30 rounded"
                    >
                      → {dep}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-cyan-500/5 border border-cyan-500/20 rounded-xl p-4">
        <p className="text-cyan-400 text-xs font-mono-display mb-1">
          0G Storage Role
        </p>
        <p className="text-white/60 text-sm leading-relaxed">
          {architecture.storageNote}
        </p>
      </div>
    </div>
  );
}
