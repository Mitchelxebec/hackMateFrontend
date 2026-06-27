import type { Architecture } from "../types";

const GLASS = {
  background: "rgba(139,92,246,0.06)",
  border: "1px solid rgba(139,92,246,0.18)",
  backdropFilter: "blur(16px)",
  WebkitBackdropFilter: "blur(16px)",
  boxShadow: "0 4px 24px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)",
};

export function ArchitectureTab({ architecture }: { architecture: Architecture }) {
  return (
    <div className="space-y-6">
      <div className="rounded-2xl p-6" style={GLASS}>
        <p className="text-xs text-zinc-600 uppercase tracking-widest mb-1">Pattern</p>
        <p className="text-violet-400 font-semibold text-base mb-4">{architecture.pattern}</p>
        <p className="text-zinc-400 text-sm leading-relaxed">{architecture.overview}</p>
      </div>
      <div>
        <p className="text-xs text-zinc-600 uppercase tracking-widest mb-4">Components</p>
        <div className="grid sm:grid-cols-2 gap-3">
          {architecture.components.map((c, i) => (
            <div key={i} className="rounded-xl p-5 hover:scale-[1.01] transition-all" style={GLASS}>
              <div className="flex items-start justify-between gap-3 mb-3">
                <p className="text-white font-semibold text-sm">{c.name}</p>
                <span className="text-[11px] px-2 py-0.5 rounded-full shrink-0"
                  style={{ background: "rgba(124,58,237,0.2)", color: "#c4b5fd", border: "1px solid rgba(124,58,237,0.3)" }}>
                  {c.type}
                </span>
              </div>
              <p className="text-zinc-500 text-xs leading-relaxed mb-3">{c.description}</p>
              <p className="text-zinc-600 text-xs font-mono">{c.techChoice}</p>
              {c.communicatesWith.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-3 pt-3" style={{ borderTop: "1px solid rgba(139,92,246,0.1)" }}>
                  {c.communicatesWith.map((dep, j) => (
                    <span key={j} className="text-[11px] px-2 py-0.5 rounded-md text-zinc-500"
                      style={{ background: "rgba(255,255,255,0.04)" }}>→ {dep}</span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="rounded-xl p-5" style={{
        background: "rgba(124,58,237,0.08)",
        border: "1px solid rgba(124,58,237,0.25)",
        backdropFilter: "blur(16px)",
        boxShadow: "0 0 24px rgba(124,58,237,0.1)",
      }}>
        <p className="text-violet-400 text-xs font-semibold uppercase tracking-widest mb-2">0G Storage Role</p>
        <p className="text-zinc-400 text-sm leading-relaxed">{architecture.storageNote}</p>
      </div>
    </div>
  );
}