export default function Analytics({ leads, stats }) {
  const tiers = ["High Value", "Moderate", "Low"].map((tier) => ({
    tier,
    count: leads.filter((l) => l.tier === tier).length,
  }));

  const industries = Object.entries(
    leads.reduce((acc, l) => ({ ...acc, [l.industry]: (acc[l.industry] || 0) + 1 }), {})
  ).sort((a, b) => b[1] - a[1]);

  const max = Math.max(1, ...tiers.map((t) => t.count));

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-3">
        {[
          ["Average score", stats.avg],
          ["Pipeline size", stats.total],
          ["High-value share", `${stats.conversion}%`],
        ].map(([label, value]) => (
          <div key={label} className="rounded-2xl border border-zinc-800 bg-panel p-5">
            <p className="text-xs tracking-tight text-zinc-500">{label}</p>
            <p className="mt-2 text-3xl font-semibold tracking-tight text-zinc-50">{value}</p>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-zinc-800 bg-panel p-5">
        <h2 className="text-sm font-semibold tracking-tight text-zinc-100">Lead distribution by tier</h2>
        <div className="mt-5 space-y-4">
          {tiers.map((t) => (
            <div key={t.tier}>
              <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-3 text-xs tracking-tight">
                <span className="truncate text-zinc-400">{t.tier}</span>
                <span className="shrink-0 text-zinc-500">{t.count}</span>
              </div>
              <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-zinc-800">
                <div
                  className="h-full rounded-full bg-violet-600 transition-all duration-500"
                  style={{ width: `${(t.count / max) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-zinc-800 bg-panel p-5">
        <h2 className="text-sm font-semibold tracking-tight text-zinc-100">Score histogram</h2>
        <div className="mt-6 flex h-40 items-end gap-2">
          {leads.slice(0, 24).map((l) => (
            <div key={l.id} className="flex min-w-0 flex-1 flex-col items-center gap-2">
              <div
                title={`${l.company} · ${l.score}`}
                className="w-full rounded-t bg-violet-600/70 transition-all duration-500 hover:bg-violet-500"
                style={{ height: `${l.score}%` }}
              />
            </div>
          ))}
          {leads.length === 0 && (
            <p className="w-full self-center text-center text-sm tracking-tight text-zinc-500">
              Charts populate once you analyse leads.
            </p>
          )}
        </div>
      </div>

      <div className="rounded-2xl border border-zinc-800 bg-panel p-5">
        <h2 className="text-sm font-semibold tracking-tight text-zinc-100">Top industries</h2>
        <ul className="mt-4 space-y-2">
          {industries.slice(0, 6).map(([name, count]) => (
            <li key={name} className="grid grid-cols-[minmax(0,1fr)_auto] gap-3 text-sm tracking-tight">
              <span className="truncate text-zinc-300">{name}</span>
              <span className="shrink-0 text-zinc-500">{count}</span>
            </li>
          ))}
          {industries.length === 0 && <li className="text-sm tracking-tight text-zinc-500">No data yet.</li>}
        </ul>
      </div>
    </div>
  );
}
