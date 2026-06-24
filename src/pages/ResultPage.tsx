import { useState } from "react";
import { ArrowLeft, Copy, Check, BookOpen, Target, Layers, Database, Kanban } from "lucide-react";
import type { GenerateResponse } from "../types";
import { UserStoriesTab } from "../components/UserStoriesTab";
import { MVPScopeTab } from "../components/MVPScopeTab";
import { ArchitectureTab } from "../components/ArchitectureTab";
import { DBSchemaTab } from "../components/DBSchema";
import { SprintBoardTab } from "../components/SprintBoardTab";
import logo from "../assets/HackthonTeammateLogo.png";

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

  async function copySession() {
    await navigator.clipboard.writeText(result.sessionId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div
      className="min-h-screen bg-[#05070f] text-white flex flex-col"
      style={{ fontFamily: "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif" }}
    >
      {/* Top glow */}
      <div className="pointer-events-none fixed inset-x-0 top-0 h-64 bg-[radial-gradient(ellipse_60%_40%_at_50%_-10%,rgba(99,102,241,0.15),transparent)] z-0" />

      {/* Header */}
      <header className="relative z-10 border-b border-white/6 px-4 md:px-10 py-3 md:py-4 flex items-center justify-between bg-[#05070f]/80 backdrop-blur-sm">
        {/* Left side */}
        <div className="flex items-center gap-3 min-w-0">
          {/* Logo */}
          <div className="flex items-center gap-2 shrink-0">
            <div className="w-7 h-7 rounded-full border border-violet-500/30 bg-violet-500/10 flex items-center justify-center">
              <img src={logo} alt="HackPilot" className="w-4 h-4 object-contain" />
            </div>
            <span className="font-bold text-sm text-white">HackPilot</span>
          </div>

          <div className="w-px h-4 bg-white/10 shrink-0" />

          {/* New Plan button — icon only on mobile, label on sm+ */}
          <button
            onClick={onReset}
            className="flex items-center gap-1.5 text-zinc-500 hover:text-white text-sm transition-colors shrink-0"
          >
            <ArrowLeft size={13} />
            <span className="hidden sm:inline">New Plan</span>
          </button>

          {/* Project idea — hidden on mobile */}
          <div className="w-px h-4 bg-white/10 shrink-0 hidden md:block" />
          <p className="text-zinc-600 text-xs truncate hidden md:block max-w-xs lg:max-w-sm">
            {result.projectIdea}
          </p>
        </div>

        {/* Right side — icon only on mobile, label on sm+ */}
        <button
          onClick={copySession}
          className="flex items-center gap-2 px-2.5 py-1.5 border border-white/8 hover:border-violet-500/40 rounded-lg text-xs text-zinc-500 hover:text-violet-400 transition-all shrink-0 ml-3"
        >
          {copied ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
          <span className="hidden sm:inline">{copied ? "Copied!" : "Session ID"}</span>
        </button>
      </header>

      {/* Tab bar */}
      <div className="relative z-10 border-b border-white/6 bg-[#05070f]/80 backdrop-blur-sm overflow-x-auto">
        {/* Center the tabs */}
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

      {/* Content — centered, with generous vertical padding */}
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