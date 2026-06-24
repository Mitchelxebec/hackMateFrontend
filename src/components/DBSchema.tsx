import type { DBSchema } from "../types";

export function DBSchemaTab({ schema }: { schema: DBSchema }) {
  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {schema.tables.map((table, i) => (
        <div key={i} className="bg-white/3 border border-white/[0.07] rounded-2xl overflow-hidden">
          <div className="px-5 py-4 border-b border-white/6 flex items-center justify-between">
            <p className="text-white font-semibold text-sm font-mono">{table.name}</p>
            <p className="text-zinc-600 text-xs">{table.description}</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-white/5">
                  {["Column","Type","Constraints","Notes"].map(h => (
                    <th key={h} className="text-left px-5 py-2.5 text-zinc-600 font-medium">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {table.fields.map((field, j) => (
                  <tr key={j} className="border-b border-white/4 hover:bg-white/2 transition-colors">
                    <td className="px-5 py-3 text-violet-300 font-mono">
                      {field.primaryKey && <span className="text-amber-400 mr-1">🔑</span>}
                      {field.name}
                    </td>
                    <td className="px-5 py-3 text-zinc-400 font-mono">{field.type}</td>
                    <td className="px-5 py-3">
                      <div className="flex flex-wrap gap-1">
                        {field.primaryKey && <span className="px-1.5 py-0.5 bg-amber-500/10 text-amber-400 rounded text-xs">PK</span>}
                        {field.unique && <span className="px-1.5 py-0.5 bg-violet-500/10 text-violet-400 rounded text-xs">UNIQUE</span>}
                        {!field.nullable && <span className="px-1.5 py-0.5 bg-red-500/10 text-red-400 rounded text-xs">NOT NULL</span>}
                        {field.foreignKey && <span className="px-1.5 py-0.5 bg-blue-500/10 text-blue-400 rounded text-xs">FK → {field.foreignKey}</span>}
                        {field.defaultValue && <span className="px-1.5 py-0.5 bg-white/4 text-zinc-500 rounded text-xs font-mono">{field.defaultValue}</span>}
                      </div>
                    </td>
                    <td className="px-5 py-3 text-zinc-600">{field.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {table.indexes && table.indexes.length > 0 && (
            <div className="px-5 py-3 border-t border-white/5 flex items-center gap-2">
              <span className="text-zinc-600 text-xs">Indexes:</span>
              {table.indexes.map((idx, k) => (
                <span key={k} className="text-xs px-2 py-0.5 bg-white/4 text-zinc-500 rounded font-mono">{idx}</span>
              ))}
            </div>
          )}
        </div>
      ))}

      <div className="bg-white/3 border border-white/[0.07] rounded-2xl p-5">
        <p className="text-zinc-600 text-xs uppercase tracking-widest mb-3">Relationships</p>
        <ul className="space-y-2">
          {schema.relationships.map((r, i) => (
            <li key={i} className="text-zinc-400 text-sm flex items-start gap-2">
              <span className="text-violet-500 mt-0.5 shrink-0">→</span> {r}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
