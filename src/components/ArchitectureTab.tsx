import type { Architecture } from "../types";

export function ArchitectureTab({ architecture }: { architecture: Architecture }) {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="bg-white/3 border border-white/8 rounded-2xl p-6">
        <p className="text-xs text-zinc-600 uppercase tracking-widest mb-1">Pattern</p>
        <p className="text-violet-400 font-semibold text-base mb-4">{architecture.pattern}</p>
        <p className="text-zinc-400 text-sm leading-relaxed">{architecture.overview}</p>
      </div>

      <div>
        <p className="text-xs text-zinc-600 uppercase tracking-widest mb-4">Components</p>
        <div className="grid sm:grid-cols-2 gap-3">
          {architecture.components.map((c, i) => (
            <div key={i} className="bg-white/3 border border-white/8 rounded-xl p-5 hover:border-violet-500/20 transition-colors">
              <div className="flex items-start justify-between gap-3 mb-3">
                <p className="text-white font-semibold text-sm">{c.name}</p>
                <span className="text-[11px] px-2 py-0.5 bg-violet-500/10 text-violet-400 border border-violet-500/20 rounded-full shrink-0">
                  {c.type}
                </span>
              </div>
              <p className="text-zinc-500 text-xs leading-relaxed mb-3">{c.description}</p>
              <p className="text-zinc-600 text-xs font-mono">{c.techChoice}</p>
              {c.communicatesWith.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-white/5">
                  {c.communicatesWith.map((dep, j) => (
                    <span key={j} className="text-[11px] px-2 py-0.5 bg-white/5 text-zinc-500 rounded-md">
                      → {dep}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-violet-500/5 border border-violet-500/15 rounded-xl p-5">
        <p className="text-violet-400 text-xs font-semibold uppercase tracking-widest mb-2">0G Storage Role</p>
        <p className="text-zinc-400 text-sm leading-relaxed">{architecture.storageNote}</p>
      </div>
    </div>
  );
}