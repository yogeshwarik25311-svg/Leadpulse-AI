import { ScoreBadge } from "../components/LeadDetail";

function Metric({ label, value, hint }) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-panel p-5">
      <p className="text-xs tracking-tight text-zinc-500">{label}</p>
      <p className="mt-2 text-3xl font-semibold tracking-tight text-zinc-50">{value}</p>
      <p className="mt-1 text-[11px] tracking-tight text-zinc-600">{hint}</p>
    </div>
  );
}

export default function Dashboard({ leads, stats, query, setQuery, onInspect, onNew }) {
  const filtered = leads.filter((l) =>
    `${l.company} ${l.domain} ${l.industry}`.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Metric label="Total leads" value={stats.total} hint="Analysed in this workspace" />
        <Metric label="High value" value={stats.high} hint="Score 78 and above" />
        <Metric label="Conversion rate" value={`${stats.conversion}%`} hint="High-value share of pipeline" />
        <Metric label="Average score" value={stats.avg} hint="Across all audits" />
      </div>

      <div className="rounded-2xl border border-zinc-800 bg-panel">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-b border-zinc-800 p-4 sm:flex sm:justify-between">
          <h2 className="truncate text-sm font-semibold tracking-tight text-zinc-100">Recent leads</h2>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search companies..."
            className="w-full max-w-xs rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2 text-xs tracking-tight text-zinc-100 outline-none transition-colors placeholder:text-zinc-600 focus:border-violet-600"
          />
        </div>

        {filtered.length === 0 ? (
          <div className="p-10 text-center">
            <p className="text-sm tracking-tight text-zinc-400">
              {leads.length ? "No leads match that search." : "No leads yet."}
            </p>
            {!leads.length && (
              <button
                onClick={onNew}
                className="mt-4 rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-medium tracking-tight text-white shadow-glow transition-colors hover:bg-violet-500"
              >
                Analyse your first lead
              </button>
            )}
          </div>
        ) : (
          <ul className="divide-y divide-zinc-800">
            {filtered.slice(0, 8).map((lead) => (
              <li
                key={lead.id}
                className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 p-4 transition-colors hover:bg-zinc-900/50"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium tracking-tight text-zinc-100">{lead.company}</p>
                  <p className="truncate text-xs tracking-tight text-zinc-500">
                    {lead.domain} · {lead.industry}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-3">
                  <span className="hidden sm:block">
                    <ScoreBadge tier={lead.tier} score={lead.score} />
                  </span>
                  <button
                    onClick={() => onInspect(lead)}
                    className="rounded-lg border border-zinc-800 px-3 py-1.5 text-xs tracking-tight text-zinc-300 transition-colors hover:border-violet-600/50 hover:text-violet-200"
                  >
                    Inspect
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

