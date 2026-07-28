import { useCallback, useEffect, useMemo, useState } from "react";
import { analyzeUrl } from "../lib/engine";

const KEY = "leadpulse.leads.v1";

export function useLeads() {
  const [leads, setLeads] = useState([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setLeads(JSON.parse(raw));
    } catch {
      /* ignore corrupted storage */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(KEY, JSON.stringify(leads));
    } catch {
      /* quota exceeded — ignore */
    }
  }, [leads, hydrated]);

  const addUrls = useCallback((urls) => {
    const created = [];
    urls.forEach((u) => {
      try {
        created.push(analyzeUrl(u));
      } catch {
        /* skip invalid line */
      }
    });
    if (created.length) setLeads((prev) => [...created, ...prev]);
    return created;
  }, []);

  const removeLead = useCallback((id) => {
    setLeads((prev) => prev.filter((l) => l.id !== id));
  }, []);

  const clearAll = useCallback(() => setLeads([]), []);

  const stats = useMemo(() => {
    const total = leads.length;
    const high = leads.filter((l) => l.tier === "High Value").length;
    const avg = total ? Math.round(leads.reduce((s, l) => s + l.score, 0) / total) : 0;
    return {
      total,
      high,
      avg,
      conversion: total ? Math.round((high / total) * 100) : 0,
    };
  }, [leads]);

  return { leads, hydrated, addUrls, removeLead, clearAll, stats };
}

