import { useState } from "react";
import {
  ArrowLeft, Copy, Check, BookOpen, Target,
  Layers, Database, Kanban, Download, Share2, ExternalLink, ShieldCheck,
} from "lucide-react";
import { useAccount, useSignMessage } from "wagmi";
import type { GenerateResponse } from "../types";
import { UserStoriesTab }  from "../components/UserStoriesTab";
import { MVPScopeTab }     from "../components/MVPScopeTab";
import { ArchitectureTab } from "../components/ArchitectureTab";
import { DBSchemaTab }     from "../components/DBSchema";
import { SprintBoardTab }  from "../components/SprintBoardTab";
import { ConnectWallet }   from "../components/ConnectWallet";
import logo                from "../assets/HackthonTeammateLogo.png";
import { exportToPDF }     from "../lib/exportPDF";
import { buildShareUrl }   from "../services/share";

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
  const [copied,    setCopied]    = useState(false);
  const [shared,    setShared]    = useState(false);
  const [exporting, setExporting] = useState(false);
  const [sig,       setSig]       = useState<string | null>(null);
  const [signing,   setSigning]   = useState(false);

  const { address, isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();

  async function handleExport() {
    setExporting(true);
    try { await exportToPDF(result); }
    finally { setExporting(false); }
  }

  async function copySession() {
    await navigator.clipboard.writeText(result.sessionId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  async function shareVia0G() {
    if (!result.storageHash) return;
    await navigator.clipboard.writeText(buildShareUrl(result.storageHash));
    setShared(true);
    setTimeout(() => setShared(false), 2500);
  }

  async function handleSign() {
    if (!result.storageHash || !address) return;
    setSigning(true);
    try {
      // wagmi v3 signMessageAsync — account is optional when wallet is connected
      const signature = await signMessageAsync({
        message: `I own this HackPilot plan.\nHash: ${result.storageHash}\nAddress: ${address}`,
      } as Parameters<typeof signMessageAsync>[0]);
      setSig(signature);
    } catch {
      // user rejected
    } finally {
      setSigning(false);
    }
  }

  /* ── button styles ── */
  const S = {
    green:  { background:"linear-gradient(135deg,rgba(16,185,129,0.15),rgba(5,150,105,0.2))",  border:"1px solid rgba(16,185,129,0.35)",   color:"#34d399", backdropFilter:"blur(12px)" } as React.CSSProperties,
    blue:   { background:"linear-gradient(135deg,rgba(59,130,246,0.15),rgba(37,99,235,0.2))",  border:"1px solid rgba(59,130,246,0.35)",   color:"#93c5fd", backdropFilter:"blur(12px)" } as React.CSSProperties,
    violet: { background:"linear-gradient(135deg,rgba(124,58,237,0.3),rgba(79,70,229,0.3))",   border:"1px solid rgba(139,92,246,0.4)",    color:"#c4b5fd", backdropFilter:"blur(12px)" } as React.CSSProperties,
    amber:  { background:"linear-gradient(135deg,rgba(234,179,8,0.15),rgba(202,138,4,0.2))",   border:"1px solid rgba(234,179,8,0.35)",    color:"#fde047", backdropFilter:"blur(12px)" } as React.CSSProperties,
    ghost:  { border:"1px solid rgba(255,255,255,0.08)", color:"rgba(161,161,170,0.7)" }        as React.CSSProperties,
  };

  return (
    <div className="min-h-screen text-white flex flex-col relative overflow-hidden"
      style={{ fontFamily:"'Plus Jakarta Sans', system-ui, sans-serif", background:"#07040f" }}>

      {/* Background */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full"
          style={{ background:"radial-gradient(ellipse,rgba(109,40,217,0.4) 0%,rgba(76,29,149,0.15) 50%,transparent 70%)", filter:"blur(70px)" }} />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[300px] rounded-full"
          style={{ background:"radial-gradient(ellipse,rgba(139,92,246,0.25) 0%,transparent 70%)", filter:"blur(50px)" }} />
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage:"linear-gradient(rgba(139,92,246,0.8) 1px,transparent 1px),linear-gradient(90deg,rgba(139,92,246,0.8) 1px,transparent 1px)", backgroundSize:"48px 48px" }} />
      </div>

      {/* ── Header ── */}
      <header className="z-10 sticky top-0 px-3 md:px-8 py-3 flex items-center justify-between gap-2"
        style={{ background:"rgba(7,4,15,0.8)", backdropFilter:"blur(20px)", WebkitBackdropFilter:"blur(20px)", borderBottom:"1px solid rgba(139,92,246,0.15)" }}>

        {/* Left */}
        <div className="flex items-center gap-2 min-w-0 shrink">
          <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
            style={{ background:"linear-gradient(135deg,rgba(139,92,246,0.4),rgba(109,40,217,0.7))", border:"1px solid rgba(167,139,250,0.3)", boxShadow:"0 0 12px rgba(139,92,246,0.4)" }}>
            <img src={logo} alt="HackPilot" className="w-4 h-4 object-contain" />
          </div>
          <span className="font-bold text-sm text-white hidden sm:inline shrink-0">HackPilot</span>
          <div className="w-px h-4 shrink-0 hidden sm:block" style={{ background:"rgba(139,92,246,0.2)" }} />
          <button onClick={onReset} className="flex items-center gap-1 text-zinc-500 hover:text-white text-xs transition-colors shrink-0">
            <ArrowLeft size={13} /><span className="hidden sm:inline">New Plan</span>
          </button>
          <p className="text-zinc-600 text-xs truncate hidden xl:block max-w-[220px]">{result.projectIdea}</p>
        </div>

        {/* Right */}
        <div className="flex items-center gap-1 shrink-0">

          {/* ConnectWallet — always visible */}
          <ConnectWallet />

          {/* Sign proof — only when connected + has storageHash + not yet signed */}
          {isConnected && result.storageHash && !sig && (
            <button onClick={handleSign} disabled={signing}
              className="flex items-center gap-1.5 px-2 md:px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer disabled:opacity-40"
              style={S.amber} title="Sign to prove ownership">
              {signing
                ? <span className="w-3 h-3 border border-amber-400/30 border-t-amber-400 rounded-full animate-spin" />
                : <ShieldCheck size={13} />}
              <span className="hidden md:inline">{signing ? "Signing..." : "Sign proof"}</span>
            </button>
          )}

          {/* Signed indicator */}
          {sig && (
            <div className="flex items-center gap-1.5 px-2 md:px-3 py-1.5 rounded-lg text-xs font-semibold"
              style={S.amber} title="Ownership proved">
              <Check size={13} />
              <span className="hidden md:inline">Proved</span>
            </div>
          )}

          {/* Share via 0G */}
          {result.storageHash && (
            <button onClick={shareVia0G}
              className="flex items-center gap-1.5 px-2 md:px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer"
              style={shared ? { ...S.green, color:"#6ee7b7" } : S.green}
              title="Share via 0G Storage">
              {shared ? <Check size={13} /> : <Share2 size={13} />}
              <span className="hidden md:inline">{shared ? "Copied!" : "Share"}</span>
            </button>
          )}

          {/* Verify on-chain */}
          {result.storageHash && (
            <a href={`https://storagescan-newton.0g.ai/file?root=${result.storageHash}`}
              target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-2 md:px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
              style={S.blue} title="View file on 0G Storage explorer">
              <ExternalLink size={13} />
              <span className="hidden md:inline">Verify</span>
            </a>
          )}

          {/* Export PDF */}
          <button onClick={handleExport} disabled={exporting}
            className="flex items-center gap-1.5 px-2 md:px-3 py-1.5 rounded-lg text-xs font-semibold transition-all disabled:opacity-40 cursor-pointer"
            style={S.violet} title="Export PDF">
            {exporting
              ? <span className="w-3 h-3 border border-violet-400/30 border-t-violet-400 rounded-full animate-spin" />
              : <Download size={13} />}
            <span className="hidden md:inline">{exporting ? "..." : "PDF"}</span>
          </button>

          {/* Copy session ID */}
          <button onClick={copySession}
            className="flex items-center justify-center w-8 h-8 rounded-lg transition-all hover:border-violet-500/40"
            style={S.ghost} title="Copy Session ID">
            {copied ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
          </button>
        </div>
      </header>

      {/* ── Tab bar ── */}
      <div className="relative z-10 overflow-x-auto"
        style={{ background:"rgba(7,4,15,0.6)", backdropFilter:"blur(16px)", WebkitBackdropFilter:"blur(16px)", borderBottom:"1px solid rgba(139,92,246,0.12)" }}>
        <div className="max-w-3xl mx-auto px-2 md:px-0">
          <div className="flex">
            {TABS.map(({ id, label, icon: Icon }) => (
              <button key={id} onClick={() => setActiveTab(id)}
                className={`flex items-center gap-1.5 px-3 md:px-5 py-3.5 text-xs md:text-sm font-medium border-b-2 transition-all whitespace-nowrap ${
                  activeTab === id ? "border-violet-500 text-white" : "border-transparent text-zinc-600 hover:text-zinc-300"
                }`}>
                <Icon size={12} />
                <span className="hidden sm:inline">{label}</span>
                <span className="sm:hidden">{label.split(" ")[0]}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Content ── */}
      <main className="relative z-10 flex-1 overflow-auto">
        <div className="max-w-3xl mx-auto px-4 md:px-6 py-8">
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
