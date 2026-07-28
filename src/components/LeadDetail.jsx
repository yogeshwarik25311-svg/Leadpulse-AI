import { useState } from "react";

export function ScoreBadge({ tier, score }) {
  const styles = {
    "High Value": "bg-violet-600/15 text-violet-200 ring-violet-600/40",
    Moderate: "bg-amber-500/10 text-amber-200 ring-amber-500/30",
    Low: "bg-zinc-700/30 text-zinc-300 ring-zinc-600/40",
  }[tier];

  return (
    <span className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium tracking-tight ring-1 ${styles}`}>
      {score} · {tier}
    </span>
  );
}

function Copy({ text }) {
  const [done, setDone] = useState(false);
  return (
    <button
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
          setDone(true);
          setTimeout(() => setDone(false), 1600);
        } catch {
          /* clipboard blocked */
        }
      }}
      className="shrink-0 rounded-lg border border-zinc-800 px-2.5 py-1 text-[11px] tracking-tight text-zinc-400 transition-colors hover:border-violet-600/50 hover:text-violet-200"
    >
      {done ? "Copied" : "Copy"}
    </button>
  );
}

export default function LeadDetail({ lead, onClose, onDelete }) {
  if (!lead) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/75 backdrop-blur-sm">
      <div className="animate-fade-up flex h-full w-full max-w-xl flex-col border-l border-zinc-800 bg-panel">
        <div className="grid shrink-0 grid-cols-[minmax(0,1fr)_auto] items-center gap-4 border-b border-zinc-800 px-5 py-4">
          <div className="min-w-0">
            <h2 className="truncate text-base font-semibold tracking-tight text-zinc-50">{lead.company}</h2>
            <p className="truncate text-xs tracking-tight text-zinc-500">
              {lead.domain} · {lead.industry}
            </p>
          </div>
          <button
            onClick={onClose}
            className="shrink-0 rounded-lg p-2 text-zinc-500 transition-colors hover:bg-zinc-800 hover:text-zinc-200"
            aria-label="Close audit"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div className="scrollbar-thin flex-1 space-y-5 overflow-y-auto p-5">
          <div className="grid grid-cols-2 gap-3">
            {[
              ["Lead score", `${lead.score}/100`],
              ["Tier", lead.tier],
              ["Headcount", lead.employees],
              ["Region", lead.region],
            ].map(([k, v]) => (
              <div key={k} className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-3">
                <p className="text-[11px] tracking-tight text-zinc-500">{k}</p>
                <p className="mt-1 truncate text-sm font-medium tracking-tight text-zinc-100">{v}</p>
              </div>
            ))}
          </div>

          <section className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4">
            <h3 className="text-xs font-semibold uppercase tracking-tight text-zinc-400">Core business pain point</h3>
            <p className="mt-2 text-sm leading-relaxed tracking-tight text-zinc-300">{lead.pain}</p>
          </section>

          <section className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4">
            <h3 className="text-xs font-semibold uppercase tracking-tight text-zinc-400">Recommended pitch</h3>
            <p className="mt-2 text-sm leading-relaxed tracking-tight text-zinc-300">{lead.pitch}</p>
          </section>

          <section className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4">
            <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
              <h3 className="truncate text-xs font-semibold uppercase tracking-tight text-zinc-400">AI cold email</h3>
              <Copy text={lead.email} />
            </div>
            <pre className="scrollbar-thin mt-3 overflow-x-auto whitespace-pre-wrap break-words font-mono text-[12px] leading-relaxed tracking-tight text-zinc-300">
              {lead.email}
            </pre>
          </section>
        </div>

        <div className="shrink-0 border-t border-zinc-800 p-4">
          <button
            onClick={() => {
              onDelete(lead.id);
              onClose();
            }}
            className="w-full rounded-xl border border-zinc-800 px-4 py-2.5 text-sm tracking-tight text-zinc-400 transition-colors hover:border-red-500/40 hover:text-red-300"
          >
            Delete lead
          </button>
        </div>
      </div>
    </div>
  );
}

