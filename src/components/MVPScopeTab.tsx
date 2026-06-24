import type { MVPScope } from "../types";

export function MVPScopeTab({ scope }: { scope: MVPScope }) {
  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div>
        <div className="flex items-center gap-2 mb-4">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <h3 className="text-sm font-semibold text-emerald-400 uppercase tracking-widest">
            In MVP — {scope.included.length} features
          </h3>
        </div>
        <div className="space-y-3">
          {scope.included.map((f, i) => (
            <div key={i} className="bg-white/3 border border-white/8 rounded-xl p-5 hover:border-emerald-500/20 transition-colors">
              <p className="text-white font-medium text-[15px] mb-1.5">{f.feature}</p>
              <p className="text-zinc-500 text-sm leading-relaxed">{f.reason}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center gap-2 mb-4">
          <span className="w-2 h-2 rounded-full bg-red-400" />
          <h3 className="text-sm font-semibold text-red-400 uppercase tracking-widest">
            Cut for now — {scope.excluded.length} features
          </h3>
        </div>
        <div className="space-y-3">
          {scope.excluded.map((f, i) => (
            <div key={i} className="bg-white/2 border border-white/5 rounded-xl p-5 opacity-50">
              <p className="text-zinc-400 font-medium text-[15px] mb-1.5 line-through decoration-zinc-600">{f.feature}</p>
              <p className="text-zinc-600 text-sm leading-relaxed">{f.reason}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}