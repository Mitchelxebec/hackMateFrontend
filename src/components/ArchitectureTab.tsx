import type { Architecture } from "../types";

export function ArchitectureTab({ architecture }: { architecture: Architecture }) {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white/3 border border-white/[0.07] rounded-2xl p-5">
        <p className="text-zinc-600 text-xs uppercase tracking-widest mb-1">Pattern</p>
        <p className="text-violet-400 font-semibold text-sm">{architecture.pattern}</p>
        <p className="text-zinc-400 text-sm mt-3 leading-relaxed">{architecture.overview}</p>
      </div>

      <div>
        <h3 className="text-zinc-500 text-xs uppercase tracking-widest mb-4">Components</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {architecture.components.map((c, i) => (
            <div key={i} className="bg-white/3 border border-white/[0.07] rounded-2xl p-4 hover:border-violet-500/20 transition-colors">
              <div className="flex items-start justify-between mb-2">
                <p className="text-white text-sm font-semibold">{c.name}</p>
                <span className="text-xs px-2 py-0.5 bg-violet-500/10 text-violet-400 border border-violet-500/20 rounded-full shrink-0 ml-2">
                  {c.type}
                </span>
              </div>
              <p className="text-zinc-500 text-xs leading-relaxed mb-3">{c.description}</p>
              <p className="text-zinc-600 text-xs font-mono">{c.techChoice}</p>
              {c.communicatesWith.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {c.communicatesWith.map((dep, j) => (
                    <span key={j} className="text-xs px-1.5 py-0.5 bg-white/4 text-zinc-500 rounded border border-white/6">
                      → {dep}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-2xl p-5">
        <p className="text-emerald-400 text-xs uppercase tracking-widest mb-2">0G Storage Role</p>
        <p className="text-zinc-400 text-sm leading-relaxed">{architecture.storageNote}</p>
      </div>
    </div>
  );
}
