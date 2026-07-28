import { useEffect, useRef, useState } from "react";
import { ANALYSIS_STEPS, normalizeUrl } from "../lib/engine";

export default function NewLeadModal({ open, onClose, onAnalyze }) {
  const [mode, setMode] = useState("single");
  const [url, setUrl] = useState("");
  const [bulk, setBulk] = useState("");
  const [error, setError] = useState("");
  const [step, setStep] = useState(-1);
  const inputRef = useRef(null);
  const timers = useRef([]);

  useEffect(() => {
    if (open) {
      setMode("single");
      setUrl("");
      setBulk("");
      setError("");
      setStep(-1);
      const t = setTimeout(() => inputRef.current?.focus(), 80);
      return () => clearTimeout(t);
    }
  }, [open]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && step === -1 && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, step, onClose]);

  if (!open) return null;

  const running = step >= 0;

  const submit = (e) => {
    e.preventDefault();
    if (running) return;

    const urls =
      mode === "single"
        ? [url]
        : bulk.split("\n").map((l) => l.trim()).filter(Boolean);

    const valid = urls.filter((u) => normalizeUrl(u));
    if (!valid.length) {
      setError(mode === "single" ? "Enter a valid website URL, e.g. stripe.com" : "Add at least one valid URL, one per line.");
      return;
    }

    setError("");
    setStep(0);
    timers.current.forEach(clearTimeout);
    timers.current = ANALYSIS_STEPS.map((_, i) =>
      setTimeout(() => setStep(i), 420 * (i + 1))
    );
    timers.current.push(
      setTimeout(() => {
        onAnalyze(valid);
        setStep(-1);
        onClose();
      }, 420 * (ANALYSIS_STEPS.length + 1))
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/75 p-0 backdrop-blur-sm sm:items-center sm:p-6">
      <div
        role="dialog"
        aria-modal="true"
        className="animate-fade-up w-full max-w-lg overflow-hidden rounded-t-2xl border border-zinc-800 bg-panel shadow-glow sm:rounded-2xl"
      >
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 border-b border-zinc-800 px-5 py-4">
          <div className="min-w-0">
            <h2 className="truncate text-base font-semibold tracking-tight text-zinc-50">Analyse New Lead</h2>
            <p className="truncate text-xs tracking-tight text-zinc-500">Drop a URL. We handle the rest.</p>
          </div>
          <button
            onClick={onClose}
            disabled={running}
            className="shrink-0 rounded-lg p-2 text-zinc-500 transition-colors hover:bg-zinc-800 hover:text-zinc-200 disabled:opacity-40"
            aria-label="Close"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {running ? (
          <div className="space-y-4 p-6">
            <div className="flex items-center gap-3">
              <span className="h-2.5 w-2.5 animate-ping rounded-full bg-violet-500" />
              <p className="text-sm font-medium tracking-tight text-zinc-100">Running autonomous audit</p>
            </div>
            <ul className="space-y-2.5">
              {ANALYSIS_STEPS.map((s, i) => (
                <li
                  key={s}
                  className={[
                    "flex items-start gap-3 text-sm tracking-tight transition-colors",
                    i < step ? "text-zinc-500" : i === step ? "text-violet-200" : "text-zinc-700",
                  ].join(" ")}
                >
                  <span
                    className={[
                      "mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full",
                      i < step ? "bg-zinc-600" : i === step ? "bg-violet-500" : "bg-zinc-800",
                    ].join(" ")}
                  />
                  <span className="min-w-0">{s}</span>
                </li>
              ))}
            </ul>
            <div className="h-1 w-full overflow-hidden rounded-full bg-zinc-800">
              <div
                className="h-full rounded-full bg-violet-600 transition-all duration-300"
                style={{ width: `${((step + 1) / ANALYSIS_STEPS.length) * 100}%` }}
              />
            </div>
          </div>
        ) : (
          <form onSubmit={submit} className="p-5">
            <div className="mb-4 inline-flex rounded-xl border border-zinc-800 bg-zinc-900/60 p-1">
              {[
                ["single", "Single URL"],
                ["bulk", "Bulk paste"],
              ].map(([id, label]) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setMode(id)}
                  className={[
                    "rounded-lg px-3 py-1.5 text-xs font-medium tracking-tight transition-colors",
                    mode === id ? "bg-violet-600 text-white" : "text-zinc-400 hover:text-zinc-100",
                  ].join(" ")}
                >
                  {label}
                </button>
              ))}
            </div>

            {mode === "single" ? (
              <label className="block">
                <span className="mb-2 block text-xs font-medium tracking-tight text-zinc-400">Website URL</span>
                <input
                  ref={inputRef}
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="stripe.com"
                  inputMode="url"
                  autoComplete="off"
                  className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-sm tracking-tight text-zinc-100 outline-none transition-colors placeholder:text-zinc-600 focus:border-violet-600"
                />
              </label>
            ) : (
              <label className="block">
                <span className="mb-2 block text-xs font-medium tracking-tight text-zinc-400">
                  Paste URLs — one per line
                </span>
                <textarea
                  value={bulk}
                  onChange={(e) => setBulk(e.target.value)}
                  rows={6}
                  placeholder={"stripe.com\nvercel.com\nhttps://linear.app"}
                  className="w-full resize-none rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 font-mono text-xs leading-relaxed text-zinc-100 outline-none transition-colors placeholder:text-zinc-600 focus:border-violet-600"
                />
              </label>
            )}

            {error && <p className="mt-2 text-xs tracking-tight text-red-400">{error}</p>}

            <button
              type="submit"
              className="mt-5 w-full rounded-xl bg-violet-600 px-4 py-3 text-sm font-medium tracking-tight text-white shadow-glow transition-colors hover:bg-violet-500"
            >
              Run autonomous analysis
            </button>
            <p className="mt-3 text-center text-[11px] tracking-tight text-zinc-600">
              No company names, industries, or messages required.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}

