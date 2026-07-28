import { ScoreBadge } from "../components/LeadDetail";

export default function Leads({ leads, query, setQuery, onInspect }) {
  const filtered = leads.filter((l) =>
    `${l.company} ${l.domain} ${l.industry}`.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="space-y-5">
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search every analysed company..."
        className="w-full rounded-xl border border-zinc-800 bg-panel px-4 py-3 text-sm tracking-tight text-zinc-100 outline-none transition-colors placeholder:text-zinc-600 focus:border-violet-600"
      />

      <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-panel">
        <div className="scrollbar-thin overflow-x-auto">
          <table className="w-full min-w-[760px] border-collapse text-left">
            <thead>
              <tr className="border-b border-zinc-800 text-[11px] uppercase tracking-tight text-zinc-500">
                <th className="px-4 py-3 font-medium">Company</th>
                <th className="px-4 py-3 font-medium">Industry</th>
                <th className="px-4 py-3 font-medium">Region</th>
                <th className="px-4 py-3 font-medium">Score</th>
                <th className="px-4 py-3 font-medium text-right">Audit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {filtered.map((lead) => (
                <tr key={lead.id} className="transition-colors hover:bg-zinc-900/50">
                  <td className="px-4 py-3">
                    <p className="text-sm font-medium tracking-tight text-zinc-100">{lead.company}</p>
                    <p className="text-xs tracking-tight text-zinc-500">{lead.domain}</p>
                  </td>
                  <td className="px-4 py-3 text-sm tracking-tight text-zinc-400">{lead.industry}</td>
                  <td className="px-4 py-3 text-sm tracking-tight text-zinc-400">{lead.region}</td>
                  <td className="px-4 py-3"><ScoreBadge tier={lead.tier} score={lead.score} /></td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => onInspect(lead)}
                      className="rounded-lg border border-zinc-800 px-3 py-1.5 text-xs tracking-tight text-zinc-300 transition-colors hover:border-violet-600/50 hover:text-violet-200"
                    >
                      View audit
                    </button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-4 py-12 text-center text-sm tracking-tight text-zinc-500">
                    Nothing here yet — analyse a URL to populate your pipeline.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

