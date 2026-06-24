import { useState } from "react";
import { ArrowLeft, Copy, Check, BookOpen, Target, Layers, Database, Kanban } from "lucide-react";
import type { GenerateResponse } from "../types";
import { UserStoriesTab } from "../components/UserStoriesTab";
import { MVPScopeTab } from "../components/MVPScopeTab";
import { ArchitectureTab } from "../components/ArchitectureTab";
import { DBSchemaTab } from "../components/DBSchema";
import { SprintBoardTab } from "../components/SprintBoardTab";

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
    <div className="min-h-screen bg-[#03040a] text-white flex flex-col">
      {/* Header */}
      <header className="border-b border-white/10 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-xs font-bold">H</div>
            <span className="font-semibold text-sm">HackPilot</span>
          </div>
          <div className="w-px h-4 bg-white/10" />
          <button onClick={onReset} className="flex items-center gap-1.5 text-white/40 hover:text-white text-sm transition-colors">
            <ArrowLeft size={13} /> New Plan
          </button>
          <div className="w-px h-4 bg-white/10" />
          <p className="text-white/70 text-sm truncate max-w-sm">{result.projectIdea}</p>
        </div>

        <button
          onClick={copySession}
          className="flex items-center gap-2 px-3 py-1.5 border border-white/10 rounded-lg text-xs text-white/40 hover:text-white hover:border-white/20 transition-all"
        >
          {copied ? <Check size={12} className="text-green-400" /> : <Copy size={12} />}
          {copied ? "Copied!" : "Session ID"}
        </button>
      </header>

      {/* Tabs */}
      <div className="border-b border-white/10 px-6 bg-[#03040a]">
        <div className="flex gap-0">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex items-center gap-2 px-5 py-3.5 text-sm font-medium border-b-2 transition-all ${
                activeTab === id
                  ? "border-cyan-400 text-white"
                  : "border-transparent text-white/30 hover:text-white/60"
              }`}
            >
              <Icon size={13} />
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <main className="flex-1 overflow-auto p-6">
        {activeTab === "stories" && <UserStoriesTab stories={result.userStories} />}
        {activeTab === "mvp"     && <MVPScopeTab scope={result.mvpScope} />}
        {activeTab === "arch"    && <ArchitectureTab architecture={result.architecture} />}
        {activeTab === "db"      && <DBSchemaTab schema={result.dbSchema} />}
        {activeTab === "sprint"  && <SprintBoardTab board={result.sprintBoard} />}
      </main>
    </div>
  );
}