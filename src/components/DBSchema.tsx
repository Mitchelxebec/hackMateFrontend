import type { DBSchema } from "../types";

export function DBSchemaTab({ schema }: { schema: DBSchema }) {
  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {schema.tables.map((table, i) => (
        <div
          key={i}
          className="bg-white/5 border border-white/10 rounded-xl overflow-hidden"
        >
          <div className="px-5 py-3 border-b border-white/10 flex items-center justify-between">
            <p className="text-white font-semibold font-mono-display text-sm">
              {table.name}
            </p>
            <p className="text-white/30 text-xs">{table.description}</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="text-left px-5 py-2 text-white/30 font-medium">
                    Column
                  </th>
                  <th className="text-left px-5 py-2 text-white/30 font-medium">
                    Type
                  </th>
                  <th className="text-left px-5 py-2 text-white/30 font-medium">
                    Constraints
                  </th>
                  <th className="text-left px-5 py-2 text-white/30 font-medium">
                    Notes
                  </th>
                </tr>
              </thead>
              <tbody>
                {table.fields.map((field, j) => (
                  <tr
                    key={j}
                    className="border-b border-white/5 hover:bg-white/5 transition-colors"
                  >
                    <td className="px-5 py-2.5 font-mono-display text-cyan-300">
                      {field.primaryKey && (
                        <span className="text-yellow-400 mr-1">🔑</span>
                      )}
                      {field.name}
                    </td>
                    <td className="px-5 py-2.5 text-white/50 font-mono-display">
                      {field.type}
                    </td>
                    <td className="px-5 py-2.5">
                      <div className="flex flex-wrap gap-1">
                        {field.primaryKey && (
                          <span className="px-1.5 py-0.5 bg-yellow-500/10 text-yellow-400 rounded text-xs">
                            PK
                          </span>
                        )}
                        {field.unique && (
                          <span className="px-1.5 py-0.5 bg-purple-500/10 text-purple-400 rounded text-xs">
                            UNIQUE
                          </span>
                        )}
                        {!field.nullable && (
                          <span className="px-1.5 py-0.5 bg-red-500/10 text-red-400 rounded text-xs">
                            NOT NULL
                          </span>
                        )}
                        {field.foreignKey && (
                          <span className="px-1.5 py-0.5 bg-blue-500/10 text-blue-400 rounded text-xs">
                            FK → {field.foreignKey}
                          </span>
                        )}
                        {field.defaultValue && (
                          <span className="px-1.5 py-0.5 bg-white/5 text-white/30 rounded text-xs font-mono-display">
                            {field.defaultValue}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-5 py-2.5 text-white/30">{field.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {table.indexes && table.indexes.length > 0 && (
            <div className="px-5 py-2.5 border-t border-white/5 flex items-center gap-2">
              <span className="text-white/20 text-xs">Indexes:</span>
              {table.indexes.map((idx, k) => (
                <span
                  key={k}
                  className="text-xs px-2 py-0.5 bg-white/5 text-white/40 rounded font-mono-display"
                >
                  {idx}
                </span>
              ))}
            </div>
          )}
        </div>
      ))}

      <div className="bg-white/5 border border-white/10 rounded-xl p-4">
        <p className="text-white/30 text-xs font-mono-display mb-2 uppercase tracking-widest">
          Relationships
        </p>
        <ul className="space-y-1.5">
          {schema.relationships.map((r, i) => (
            <li
              key={i}
              className="text-white/60 text-sm flex items-start gap-2"
            >
              <span className="text-cyan-400 mt-0.5">→</span> {r}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
