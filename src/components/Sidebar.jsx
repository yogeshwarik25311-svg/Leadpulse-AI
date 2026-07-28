const NAV = [
  { id: "dashboard", label: "Dashboard", icon: "M4 5h7v7H4V5Zm9 0h7v4h-7V5ZM4 14h7v5H4v-5Zm9-3h7v8h-7v-8Z" },
  { id: "leads", label: "Leads", icon: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm-8 8a8 8 0 0 1 16 0H4Z" },
  { id: "analytics", label: "Analytics", icon: "M5 20V10m7 10V4m7 16v-6" },
  { id: "settings", label: "Settings", icon: "M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm9-3-2 1 1 2-2 2-2-1-1 2h-3l-1-2-2 1-2-2 1-2-2-1V9l2-1-1-2 2-2 2 1 1-2h3l1 2 2-1 2 2-1 2 2 1v3Z" },
];

export default function Sidebar({ view, setView, open, onClose }) {
  return (
    <>
      {open && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-30 bg-black/70 backdrop-blur-sm md:hidden"
          aria-hidden="true"
        />
      )}

      <aside
        className={[
          "fixed inset-y-0 left-0 z-40 flex w-72 flex-col border-r border-zinc-800 bg-panel",
          "transition-transform duration-300 ease-out",
          open ? "translate-x-0" : "-translate-x-full",
          "md:translate-x-0",
        ].join(" ")}
      >
        <div className="flex h-16 shrink-0 items-center gap-3 border-b border-zinc-800 px-5">
          <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-violet-600 shadow-glow">
            <svg viewBox="0 0 24 24" className="h-5 w-5 stroke-white" fill="none" strokeWidth="2">
              <path d="M3 12h4l2 6 4-14 2 8h6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold tracking-tight text-zinc-50">LeadPulse AI</p>
            <p className="truncate text-[11px] tracking-tight text-zinc-500">Lead intelligence engine</p>
          </div>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto p-3">
          {NAV.map((item) => {
            const active = view === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setView(item.id);
                  onClose();
                }}
                className={[
                  "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm tracking-tight transition-colors",
                  active
                    ? "bg-violet-600/15 text-violet-200 ring-1 ring-violet-600/40"
                    : "text-zinc-400 hover:bg-zinc-800/60 hover:text-zinc-100",
                ].join(" ")}
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d={item.icon} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="shrink-0 border-t border-zinc-800 p-4">
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-3">
            <p className="text-xs font-medium tracking-tight text-zinc-200">Autonomous mode</p>
            <p className="mt-1 text-[11px] leading-relaxed text-zinc-500">
              URL in, full audit out. No manual data entry.
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}

