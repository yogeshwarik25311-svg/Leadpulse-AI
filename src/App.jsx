import { useState } from "react";
import Sidebar from "./components/Sidebar";
import NewLeadModal from "./components/NewLeadModal";
import LeadDetail from "./components/LeadDetail";
import Dashboard from "./views/Dashboard";
import Leads from "./views/Leads";
import Analytics from "./views/Analytics";
import Settings from "./views/Settings";
import { useLeads } from "./hooks/useLeads";

const TITLES = {
  dashboard: ["Dashboard", "Live pipeline intelligence at a glance"],
  leads: ["Leads", "Every company your engine has audited"],
  analytics: ["Analytics", "Performance and distribution insights"],
  settings: ["Settings", "Workspace, AI depth, and data controls"],
};

export default function App() {
  const [view, setView] = useState("dashboard");
  const [navOpen, setNavOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [query, setQuery] = useState("");

  const { leads, addUrls, removeLead, clearAll, stats } = useLeads();
  const [title, subtitle] = TITLES[view];

  return (
    <div className="min-h-screen w-full bg-app">
      <Sidebar view={view} setView={setView} open={navOpen} onClose={() => setNavOpen(false)} />

      <div className="md:pl-72">
        <header className="sticky top-0 z-20 grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 border-b border-zinc-800 bg-app/85 px-4 py-3 backdrop-blur-md sm:px-6">
          <button
            onClick={() => setNavOpen(true)}
            className="shrink-0 rounded-lg border border-zinc-800 p-2 text-zinc-300 transition-colors hover:text-zinc-100 md:hidden"
            aria-label="Open navigation"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
            </svg>
          </button>

          <div className="min-w-0">
            <h1 className="truncate text-base font-semibold tracking-tight text-zinc-50 sm:text-lg">{title}</h1>
            <p className="hidden truncate text-xs tracking-tight text-zinc-500 sm:block">{subtitle}</p>
          </div>

          <button
            onClick={() => setModalOpen(true)}
            className="shrink-0 rounded-xl bg-violet-600 px-3 py-2 text-xs font-medium tracking-tight text-white shadow-glow transition-colors hover:bg-violet-500 sm:px-4 sm:text-sm"
          >
            <span className="sm:hidden">New</span>
            <span className="hidden sm:inline">Analyse New Lead</span>
          </button>
        </header>

        <main className="p-4 sm:p-6">
          {view === "dashboard" && (
            <Dashboard
              leads={leads}
              stats={stats}
              query={query}
              setQuery={setQuery}
              onInspect={setSelected}
              onNew={() => setModalOpen(true)}
            />
          )}
          {view === "leads" && (
            <Leads leads={leads} query={query} setQuery={setQuery} onInspect={setSelected} />
          )}
          {view === "analytics" && <Analytics leads={leads} stats={stats} />}
          {view === "settings" && <Settings leads={leads} onClear={clearAll} />}
        </main>
      </div>

      <NewLeadModal open={modalOpen} onClose={() => setModalOpen(false)} onAnalyze={addUrls} />
      <LeadDetail lead={selected} onClose={() => setSelected(null)} onDelete={removeLead} />
    </div>
  );
}

