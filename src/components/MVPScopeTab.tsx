import type { MVPScope } from "../types";

const GLASS = {
  background: "rgba(139,92,246,0.06)",
  border: "1px solid rgba(139,92,246,0.18)",
  backdropFilter: "blur(16px)",
  WebkitBackdropFilter: "blur(16px)",
  boxShadow: "0 4px 24px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)",
};

export function MVPScopeTab({ scope }: { scope: MVPScope }) {
  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center gap-2 mb-4">
          <span className="w-2 h-2 rounded-full bg-emerald-400" style={{ boxShadow: "0 0 8px rgba(52,211,153,0.6)" }} />
          <h3 className="text-sm font-semibold text-emerald-400 uppercase tracking-widest">In MVP — {scope.included.length} features</h3>
        </div>
        <div className="space-y-3">
          {scope.included.map((f, i) => (
            <div key={i} className="rounded-xl p-5 hover:scale-[1.002] transition-all" style={GLASS}>
              <p className="text-white font-medium text-[15px] mb-1.5">{f.feature}</p>
              <p className="text-zinc-500 text-sm leading-relaxed">{f.reason}</p>
            </div>
          ))}
        </div>
      </div>
      <div>
        <div className="flex items-center gap-2 mb-4">
          <span className="w-2 h-2 rounded-full bg-red-400" style={{ boxShadow: "0 0 8px rgba(248,113,113,0.6)" }} />
          <h3 className="text-sm font-semibold text-red-400 uppercase tracking-widest">Cut for now — {scope.excluded.length} features</h3>
        </div>
        <div className="space-y-3">
          {scope.excluded.map((f, i) => (
            <div key={i} className="rounded-xl p-5 opacity-50" style={{ ...GLASS, background: "rgba(255,255,255,0.02)" }}>
              <p className="text-zinc-400 font-medium text-[15px] mb-1.5 line-through decoration-zinc-600">{f.feature}</p>
              <p className="text-zinc-600 text-sm leading-relaxed">{f.reason}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}