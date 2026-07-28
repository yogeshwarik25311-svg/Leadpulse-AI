import { useState } from "react";

function Toggle({ label, hint, value, onChange }) {
  return (
    <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 border-b border-zinc-800 py-4 last:border-0">
      <div className="min-w-0">
        <p className="truncate text-sm tracking-tight text-zinc-100">{label}</p>
        <p className="truncate text-xs tracking-tight text-zinc-500">{hint}</p>
      </div>
      <button
        onClick={() => onChange(!value)}
        className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${value ? "bg-violet-600" : "bg-zinc-700"}`}
        aria-pressed={value}
      >
        <span
          className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-all ${value ? "left-[22px]" : "left-0.5"}`}
        />
      </button>
    </div>
  );
}

export default function Settings({ leads, onClear }) {
  const [workspace, setWorkspace] = useState("Growth Team");
  const [depth, setDepth] = useState("deep");
  const [notify, setNotify] = useState(true);
  const [autoEmail, setAutoEmail] = useState(true);

  const exportJson = () => {
    const blob = new Blob([JSON.stringify(leads, null, 2)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "leadpulse-leads.json";
    a.click();
    URL.revokeObjectURL(a.href);
  };

  return (
    <div className="max-w-2xl space-y-6">
      <section className="rounded-2xl border border-zinc-800 bg-panel p-5">
        <h2 className="text-sm font-semibold tracking-tight text-zinc-100">Workspace</h2>
        <label className="mt-4 block">
          <span className="mb-2 block text-xs tracking-tight text-zinc-500">Workspace name</span>
          <input
            value={workspace}
            onChange={(e) => setWorkspace(e.target.value)}
            className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-2.5 text-sm tracking-tight text-zinc-100 outline-none transition-colors focus:border-violet-600"
          />
        </label>
      </section>

      <section className="rounded-2xl border border-zinc-800 bg-panel p-5">
        <h2 className="text-sm font-semibold tracking-tight text-zinc-100">AI analysis depth</h2>
        <div className="mt-4 grid gap-2 sm:grid-cols-3">
          {[
            ["fast", "Fast"],
            ["balanced", "Balanced"],
            ["deep", "Deep"],
          ].map(([id, label]) => (
            <button
              key={id}
              onClick={() => setDepth(id)}
              className={[
                "rounded-xl border px-4 py-2.5 text-sm tracking-tight transition-colors",
                depth === id
                  ? "border-violet-600/50 bg-violet-600/15 text-violet-200"
                  : "border-zinc-800 text-zinc-400 hover:text-zinc-100",
              ].join(" ")}
            >
              {label}
            </button>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-zinc-800 bg-panel px-5">
        <Toggle label="Email notifications" hint="Alert me when a high-value lead lands" value={notify} onChange={setNotify} />
        <Toggle label="Auto-generate cold emails" hint="Draft outreach with every audit" value={autoEmail} onChange={setAutoEmail} />
      </section>

      <section className="rounded-2xl border border-zinc-800 bg-panel p-5">
        <h2 className="text-sm font-semibold tracking-tight text-zinc-100">Data management</h2>
        <p className="mt-1 text-xs tracking-tight text-zinc-500">{leads.length} leads stored locally in this browser.</p>
        <div className="mt-4 flex flex-wrap gap-2">
          <button
            onClick={exportJson}
            className="rounded-xl border border-zinc-800 px-4 py-2.5 text-sm tracking-tight text-zinc-300 transition-colors hover:border-violet-600/50 hover:text-violet-200"
          >
            Export JSON
          </button>
          <button
            onClick={() => window.confirm("Delete all stored leads?") && onClear()}
            className="rounded-xl border border-zinc-800 px-4 py-2.5 text-sm tracking-tight text-zinc-400 transition-colors hover:border-red-500/40 hover:text-red-300"
          >
            Clear all data
          </button>
        </div>
      </section>
    </div>
  );
}

