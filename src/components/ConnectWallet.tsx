import { useAccount, useConnect, useDisconnect } from "wagmi";
import { injected } from "wagmi/connectors";
import { LogOut, Wallet } from "lucide-react";

export function ConnectWallet() {
  const { address, isConnected } = useAccount();
  const { connect, isPending } = useConnect();
  const { disconnect } = useDisconnect();

  if (isConnected && address) {
    const short = `${address.slice(0, 6)}...${address.slice(-4)}`;
    return (
      <button
        onClick={() => disconnect()}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer"
        style={{
          background: "linear-gradient(135deg,rgba(16,185,129,0.15),rgba(5,150,105,0.2))",
          border: "1px solid rgba(16,185,129,0.35)",
          color: "#6ee7b7",
          backdropFilter: "blur(12px)",
        }}
        title="Disconnect"
      >
        <Wallet size={13} />
        {short}
        <LogOut size={11} className="opacity-60" />
      </button>
    );
  }

  return (
    <button
      onClick={() => connect({ connector: injected() })}
      disabled={isPending}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer disabled:opacity-40"
      style={{
        background: "linear-gradient(135deg,rgba(139,92,246,0.2),rgba(109,40,217,0.25))",
        border: "1px solid rgba(139,92,246,0.4)",
        color: "#c4b5fd",
        backdropFilter: "blur(12px)",
      }}
    >
      <Wallet size={13} />
      {isPending ? "Connecting..." : "Connect Wallet"}
    </button>
  );
}
