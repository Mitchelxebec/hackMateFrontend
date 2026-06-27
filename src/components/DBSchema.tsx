import type { DBSchema } from "../types";

const GLASS = {
  background: "rgba(139,92,246,0.06)",
  border: "1px solid rgba(139,92,246,0.18)",
  backdropFilter: "blur(16px)",
  WebkitBackdropFilter: "blur(16px)",
  boxShadow: "0 4px 24px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)",
};

const DIVIDER = { borderColor: "rgba(139,92,246,0.12)" };

export function DBSchemaTab({ schema }: { schema: DBSchema }) {
  return (
    <div className="space-y-6">
      {schema.tables.map((table, i) => (
        <div key={i} className="rounded-2xl overflow-hidden" style={GLASS}>
          {/* Table header */}
          <div className="px-4 md:px-6 py-4 border-b" style={DIVIDER}>
            <p className="text-white font-semibold font-mono text-sm">{table.name}</p>
            <p className="text-zinc-500 text-xs mt-0.5">{table.description}</p>
          </div>

          {/* Desktop table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b" style={DIVIDER}>
                  {["Column","Type","Constraints","Notes"].map(h => (
                    <th key={h} className="text-left px-6 py-3 text-zinc-600 font-medium">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {table.fields.map((field, j) => (
                  <tr key={j} className="border-b hover:bg-white/3 transition-colors" style={DIVIDER}>
                    <td className="px-6 py-3 font-mono text-violet-300">
                      {field.primaryKey && <span className="text-amber-400 mr-1.5">🔑</span>}
                      {field.name}
                    </td>
                    <td className="px-6 py-3 text-zinc-500 font-mono">{field.type}</td>
                    <td className="px-6 py-3">
                      <div className="flex flex-wrap gap-1">
                        {field.primaryKey && <span className="px-1.5 py-0.5 bg-amber-500/10 text-amber-400 rounded text-[10px]">PK</span>}
                        {field.unique && <span className="px-1.5 py-0.5 bg-violet-500/10 text-violet-400 rounded text-[10px]">UNIQUE</span>}
                        {!field.nullable && <span className="px-1.5 py-0.5 bg-red-500/10 text-red-400 rounded text-[10px]">NOT NULL</span>}
                        {field.foreignKey && <span className="px-1.5 py-0.5 bg-blue-500/10 text-blue-400 rounded text-[10px]">FK → {field.foreignKey}</span>}
                        {field.defaultValue && <span className="px-1.5 py-0.5 bg-white/5 text-zinc-500 rounded text-[10px] font-mono">{field.defaultValue}</span>}
                      </div>
                    </td>
                    <td className="px-6 py-3 text-zinc-600">{field.notes ?? "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile: card per field */}
          <div className="md:hidden">
            {table.fields.map((field, j) => (
              <div key={j} className="px-4 py-4 border-b" style={DIVIDER}>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-violet-300 text-sm">
                    {field.primaryKey && <span className="text-amber-400 mr-1">🔑</span>}
                    {field.name}
                  </span>
                  <span className="text-zinc-600 font-mono text-xs">{field.type}</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {field.primaryKey && <span className="px-1.5 py-0.5 bg-amber-500/10 text-amber-400 rounded text-[10px]">PK</span>}
                  {field.unique && <span className="px-1.5 py-0.5 bg-violet-500/10 text-violet-400 rounded text-[10px]">UNIQUE</span>}
                  {!field.nullable && <span className="px-1.5 py-0.5 bg-red-500/10 text-red-400 rounded text-[10px]">NOT NULL</span>}
                  {field.foreignKey && <span className="px-1.5 py-0.5 bg-blue-500/10 text-blue-400 rounded text-[10px]">FK → {field.foreignKey}</span>}
                </div>
                {field.notes && <p className="text-zinc-600 text-xs mt-1.5">{field.notes}</p>}
              </div>
            ))}
          </div>

          {/* Indexes */}
          {table.indexes && table.indexes.length > 0 && (
            <div className="px-4 md:px-6 py-3 border-t flex flex-wrap items-start gap-2" style={DIVIDER}>
              <span className="text-zinc-600 text-xs shrink-0 mt-0.5">Indexes:</span>
              <div className="flex flex-col gap-1">
                {table.indexes.map((idx, k) => (
                  <span key={k} className="text-[11px] text-zinc-500 font-mono">{idx}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}

      {/* Relationships */}
      <div className="rounded-2xl p-4 md:p-6" style={GLASS}>
        <p className="text-zinc-500 text-xs uppercase tracking-widest mb-4">Relationships</p>
        <ul className="space-y-2.5">
          {schema.relationships.map((r, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="text-violet-500 mt-0.5 shrink-0">→</span>
              <span className="text-zinc-400 text-sm leading-relaxed">{r}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
