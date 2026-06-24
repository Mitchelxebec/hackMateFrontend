import type { MVPScope } from "../types";

export function MVPScopeTab({ scope }: { scope: MVPScope }) {
  return (
    <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
      <div>
        <h3 className="text-sm font-semibold text-green-400 mb-3 flex items-center gap-2 font-mono-display">
          <span className="w-2 h-2 rounded-full bg-green-400" />
          In MVP ({scope.included.length})
        </h3>
        <div className="space-y-3">
          {scope.included.map((f, i) => (
            <div
              key={i}
              className="bg-white/5 border border-white/10 rounded-xl p-4"
            >
              <p className="text-white text-sm font-medium mb-1">{f.feature}</p>
              <p className="text-white/40 text-xs leading-relaxed">
                {f.reason}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h3 className="text-sm font-semibold text-red-400 mb-3 flex items-center gap-2 font-mono-display">
          <span className="w-2 h-2 rounded-full bg-red-400" />
          Cut for Now ({scope.excluded.length})
        </h3>
        <div className="space-y-3">
          {scope.excluded.map((f, i) => (
            <div
              key={i}
              className="bg-white/5 border border-white/10 rounded-xl p-4 opacity-50"
            >
              <p className="text-white text-sm font-medium mb-1 line-through decoration-white/30">
                {f.feature}
              </p>
              <p className="text-white/40 text-xs leading-relaxed">
                {f.reason}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
