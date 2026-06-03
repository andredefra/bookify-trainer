import { createContext, useCallback, useContext, useEffect, useMemo, useState, ReactNode } from "react";

export interface SalesEntry {
  id: string;
  type: "Session" | "Package" | "Program" | "Other";
  name: string;
  amount: number;
  date: string;
  notes?: string;
  source: "manual" | "auto";
}

interface SalesEntriesContextValue {
  getEntries: (email: string) => SalesEntry[];
  getTotal: (email: string) => number;
  addEntry: (email: string, entry: Omit<SalesEntry, "id" | "source"> & { source?: SalesEntry["source"] }) => void;
}

const STORAGE_KEY = "trainer-sales-entries";

const SalesEntriesContext = createContext<SalesEntriesContextValue | null>(null);

const normalize = (email: string) => (email || "").trim().toLowerCase();

const SEED_ENTRIES: Record<string, SalesEntry[]> = {
  "a.russo@example.com": [
    {
      id: "seed-arusso-1",
      type: "Package",
      name: "Personal training package",
      amount: 3600,
      date: "2022-09-01T09:00:00Z",
      source: "auto",
    },
  ],
  "emma.thompson@example.com": [
    {
      id: "seed-emma-1",
      type: "Package",
      name: "10-session PT package",
      amount: 1800,
      date: "2023-04-01T09:00:00Z",
      source: "auto",
    },
  ],
  "michael.chen@example.com": [
    {
      id: "seed-michael-1",
      type: "Session",
      name: "Single PT sessions",
      amount: 1200,
      date: "2023-04-10T09:00:00Z",
      source: "auto",
    },
  ],
  "sarah.johnson@example.com": [
    {
      id: "seed-sarah-1",
      type: "Program",
      name: "12-week training program",
      amount: 2700,
      date: "2023-03-20T09:00:00Z",
      source: "auto",
    },
  ],
};

export function SalesEntriesProvider({ children }: { children: ReactNode }) {
  const [entries, setEntries] = useState<Record<string, SalesEntry[]>>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const stored = JSON.parse(raw) as Record<string, SalesEntry[]>;
        // Merge: add seed entries for any client not yet present in storage
        const merged = { ...stored };
        for (const [key, seedList] of Object.entries(SEED_ENTRIES)) {
          if (!merged[key] || merged[key].length === 0) merged[key] = seedList;
        }
        return merged;
      }
    } catch {
      // ignore
    }
    return SEED_ENTRIES;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
    } catch {
      // ignore
    }
  }, [entries]);

  const getEntries = useCallback(
    (email: string) => entries[normalize(email)] ?? [],
    [entries]
  );

  const getTotal = useCallback(
    (email: string) =>
      (entries[normalize(email)] ?? []).reduce((sum, e) => sum + (e.amount || 0), 0),
    [entries]
  );

  const addEntry = useCallback<SalesEntriesContextValue["addEntry"]>((email, entry) => {
    const key = normalize(email);
    if (!key) return;
    setEntries((prev) => ({
      ...prev,
      [key]: [
        {
          ...entry,
          id: `${key}-${Date.now()}`,
          source: entry.source ?? "manual",
        },
        ...(prev[key] ?? []),
      ],
    }));
  }, []);

  const value = useMemo(
    () => ({ getEntries, getTotal, addEntry }),
    [getEntries, getTotal, addEntry]
  );

  return <SalesEntriesContext.Provider value={value}>{children}</SalesEntriesContext.Provider>;
}

export function useSalesEntries() {
  const ctx = useContext(SalesEntriesContext);
  if (!ctx) throw new Error("useSalesEntries must be used within SalesEntriesProvider");
  return ctx;
}
