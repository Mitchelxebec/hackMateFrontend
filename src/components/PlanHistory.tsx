import { Clock, ChevronRight, ExternalLink } from "lucide-react";
import type { PlanRecord } from "../lib/history";

interface Props {
  records: PlanRecord[];
  onSelect: (record: PlanRecord) => void;
}

function timeAgo(ts: string): string {
  const diff = Date.now() - new Date(ts).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

export function PlanHistory({ records, onSelect }: Props) {
  if (records.length === 0) return null;

  return (
    <div className="w-full max-w-xl mx-auto mt-8">
      <div className="flex items-center gap-2 mb-3">
        <Clock size={12} className="text-zinc-600" />
        <span className="text-zinc-600 text-[11px] font-semibold tracking-wide uppercase">
          Past Plans
        </span>
        <span className="text-zinc-700 text-[11px]">({records.length})</span>
      </div>

      <div className="space-y-1.5 max-h-[220px] overflow-y-auto scrollbar-thin">
        {records.map((r) => (
          <button
            key={r.id}
            onClick={() => onSelect(r)}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-left transition-all cursor-pointer group"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <div
              className="w-1.5 h-1.5 rounded-full shrink-0"
              style={{ background: r.storageHash ? "#34d399" : "rgba(139,92,246,0.4)" }}
            />
            <div className="flex-1 min-w-0">
              <p className="text-zinc-300 text-[13px] font-medium truncate leading-snug">
                {r.idea}
              </p>
              <p className="text-zinc-600 text-[11px] mt-0.5 flex items-center gap-2">
                <span>{timeAgo(r.timestamp)}</span>
                {r.storageHash && (
                  <span className="flex items-center gap-0.5 text-emerald-600">
                    <ExternalLink size={9} />
                    stored
                  </span>
                )}
              </p>
            </div>
            <ChevronRight size={14} className="text-zinc-700 group-hover:text-zinc-500 transition-colors shrink-0" />
          </button>
        ))}
      </div>
    </div>
  );
}
