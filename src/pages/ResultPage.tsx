import { useState } from "react";
import { ArrowLeft, Copy, Check, BookOpen, Target, Layers, Database, Kanban, Download, Share2, ExternalLink } from "lucide-react";
import type { GenerateResponse } from "../types";
import { UserStoriesTab } from "../components/UserStoriesTab";
import { MVPScopeTab } from "../components/MVPScopeTab";
import { ArchitectureTab } from "../components/ArchitectureTab";
import { DBSchemaTab } from "../components/DBSchema";
import { SprintBoardTab } from "../components/SprintBoardTab";
import logo from "../assets/HackthonTeammateLogo.png";
import { exportToPDF } from "../lib/exportPDF";
import { buildShareUrl } from "../services/share";

interface Props {
  result: GenerateResponse;
  onReset: () => void;
}

const TABS = [
  { id: "stories", label: "User Stories", icon: BookOpen },
  { id: "mvp",     label: "MVP Scope",    icon: Target   },
  { id: "arch",    label: "Architecture", icon: Layers   },
  { id: "db",      label: "DB Schema",    icon: Database },
  { id: "sprint",  label: "Sprint Board", icon: Kanban   },
] as const;

type TabId = (typeof TABS)[number]["id"];

export function ResultsPage({ result, onReset }: Props) {
  const [activeTab, setActiveTab] = useState<TabId>("stories");
  const [copied, setCopied] = useState(false);
  const [shared, setShared] = useState(false);
  const [exporting, setExporting] = useState(false);

  async function handleExport() {
    setExporting(true);
    try {
      await exportToPDF(result);
    } finally {
      setExporting(false);
    }
  }

  async function copySession() {
    await navigator.clipboard.writeText(result.sessionId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  async function shareVia0G() {
    if (!result.storageHash) return;
    const url = buildShareUrl(result.storageHash);
    await navigator.clipboard.writeText(url);
    setShared(true);
    setTimeout(() => setShared(false), 2500);
  }

  return (
    <div
      className="min-h-screen text-white flex flex-col relative overflow-hidden"
      style={{
        fontFamily: "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif",
        background: "#07040f",
      }}
    >
      {/* ── Background — same as landing ── */}
      <div className="pointer-events-none fixed inset-0 z-0">
        {/* Main purple cloud */}
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full"
          style={{ background: "radial-gradient(ellipse,rgba(109,40,217,0.4) 0%,rgba(76,29,149,0.15) 50%,transparent 70%)", filter: "blur(70px)" }} />
        {/* Secondary bloom */}
        <div className="absolute top-[0%] left-1/2 -translate-x-1/2 w-[400px] h-[300px] rounded-full"
          style={{ background: "radial-gradient(ellipse,rgba(139,92,246,0.25) 0%,transparent 70%)", filter: "blur(50px)" }} />
        {/* Grid */}
        <div className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "linear-gradient(rgba(139,92,246,0.8) 1px,transparent 1px),linear-gradient(90deg,rgba(139,92,246,0.8) 1px,transparent 1px)",
            backgroundSize: "48px 48px",
          }} />
      </div>

      {/* ── Header ── */}
      <header
        className="relative z-10 px-4 md:px-10 py-3 md:py-4 flex items-center justify-between"
        style={{
          background: "rgba(7,4,15,0.7)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(139,92,246,0.15)",
          boxShadow: "0 1px 0 rgba(255,255,255,0.04)",
        }}
      >
        {/* Left */}
        <div className="flex items-center gap-3 min-w-0">
          <div className="flex items-center gap-2 shrink-0">
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg,rgba(139,92,246,0.4),rgba(109,40,217,0.7))",
                border: "1px solid rgba(167,139,250,0.3)",
                boxShadow: "0 0 12px rgba(139,92,246,0.4)",
              }}
            >
              <img src={logo} alt="HackPilot" className="w-4 h-4 object-contain" />
            </div>
            <span className="font-bold text-sm text-white">HackPilot</span>
          </div>

          <div className="w-px h-4 shrink-0" style={{ background: "rgba(139,92,246,0.2)" }} />

          <button onClick={onReset} className="flex items-center gap-1.5 text-zinc-500 hover:text-white text-sm transition-colors shrink-0">
            <ArrowLeft size={13} />
            <span className="hidden sm:inline">New Plan</span>
          </button>

          <div className="w-px h-4 shrink-0 hidden md:block" style={{ background: "rgba(139,92,246,0.2)" }} />
          <p className="text-zinc-600 text-xs truncate hidden md:block max-w-xs lg:max-w-sm">{result.projectIdea}</p>
        </div>

        {/* Right — icon-only on mobile, labeled on sm+ */}
        <div className="flex items-center gap-1.5 shrink-0 ml-2">
          {/* Share via 0G */}
          {result.storageHash && (
            <button
              onClick={shareVia0G}
              className="flex items-center gap-1.5 px-2 sm:px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer"
              style={{
                background: "linear-gradient(135deg,rgba(16,185,129,0.15),rgba(5,150,105,0.2))",
                border: "1px solid rgba(16,185,129,0.35)",
                color: shared ? "#6ee7b7" : "#34d399",
                backdropFilter: "blur(12px)",
              }}
              title="Share via 0G Storage"
            >
              {shared ? <Check size={13} /> : <Share2 size={13} />}
              <span className="hidden sm:inline">{shared ? "Copied!" : "Share via 0G"}</span>
            </button>
          )}

          {/* Verify on-chain */}
          {result.storageHash && (
            <a
              href={`https://chainscan-galileo.0g.ai/tx/${result.storageHash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-2 sm:px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
              style={{
                background: "linear-gradient(135deg,rgba(59,130,246,0.15),rgba(37,99,235,0.2))",
                border: "1px solid rgba(59,130,246,0.35)",
                color: "#93c5fd",
                backdropFilter: "blur(12px)",
              }}
              title="Verify on 0G block explorer"
            >
              <ExternalLink size={13} />
              <span className="hidden sm:inline">Verify on-chain</span>
            </a>
          )}

          {/* Export PDF */}
          <button
            onClick={handleExport}
            disabled={exporting}
            className="flex items-center gap-1.5 px-2 sm:px-3 py-1.5 rounded-lg text-xs font-semibold transition-all disabled:opacity-40 cursor-pointer"
            style={{
              background: "linear-gradient(135deg,rgba(124,58,237,0.3),rgba(79,70,229,0.3))",
              border: "1px solid rgba(139,92,246,0.4)",
              color: "#c4b5fd",
              backdropFilter: "blur(12px)",
            }}
            title="Export PDF"
          >
            {exporting
              ? <span className="w-3 h-3 border border-violet-400/30 border-t-violet-400 rounded-full animate-spin" />
              : <Download size={13} />
            }
            <span className="hidden sm:inline">{exporting ? "Exporting..." : "Export PDF"}</span>
          </button>

          {/* Session ID copy */}
          <button
            onClick={copySession}
            className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-xs text-zinc-500 hover:text-violet-400 transition-all"
            style={{ border: "1px solid rgba(255,255,255,0.08)" }}
            title="Copy Session ID"
          >
            {copied ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
          </button>
        </div>
      </header>

      {/* ── Tab bar ── */}
      <div
        className="relative z-10 overflow-x-auto"
        style={{
          background: "rgba(7,4,15,0.6)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          borderBottom: "1px solid rgba(139,92,246,0.12)",
        }}
      >
        <div className="max-w-3xl mx-auto px-4 md:px-0">
          <div className="flex gap-0">
            {TABS.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex items-center gap-2 px-4 md:px-5 py-4 text-sm font-medium border-b-2 transition-all whitespace-nowrap ${
                  activeTab === id
                    ? "border-violet-500 text-white"
                    : "border-transparent text-zinc-600 hover:text-zinc-300"
                }`}
              >
                <Icon size={13} />
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Content ── */}
      <main className="relative z-10 flex-1 overflow-auto">
        <div className="max-w-3xl mx-auto px-4 md:px-6 py-10">
          {activeTab === "stories" && <UserStoriesTab stories={result.userStories} />}
          {activeTab === "mvp"     && <MVPScopeTab scope={result.mvpScope} />}
          {activeTab === "arch"    && <ArchitectureTab architecture={result.architecture} />}
          {activeTab === "db"      && <DBSchemaTab schema={result.dbSchema} />}
          {activeTab === "sprint"  && <SprintBoardTab board={result.sprintBoard} />}
        </div>
      </main>
    </div>
  );
}