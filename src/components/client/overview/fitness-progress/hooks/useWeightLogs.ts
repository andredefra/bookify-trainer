import { useState, useEffect, useRef } from "react";
import { toast } from "sonner";

export interface WeightLog {
  id: string;
  date: string;
  weight: number;
  note?: string;
}

const STORAGE_KEY = "weight-logs-data";
const SEED_FLAG = "weight-logs-seeded-v2";

// Historical weight trend ending at 82 kg (matches "Lose Weight" goal current).
const getMockWeightLogs = (): WeightLog[] => {
  const today = new Date();
  const entries: Array<{ daysAgo: number; weight: number; note?: string }> = [
    { daysAgo: 120, weight: 84.5, note: "Starting point" },
    { daysAgo: 105, weight: 84.0 },
    { daysAgo: 90,  weight: 83.4, note: "Feeling stronger" },
    { daysAgo: 75,  weight: 83.0 },
    { daysAgo: 60,  weight: 82.7, note: "New nutrition plan" },
    { daysAgo: 45,  weight: 82.4 },
    { daysAgo: 30,  weight: 82.2 },
    { daysAgo: 14,  weight: 82.1 },
    { daysAgo: 3,   weight: 82.0, note: "On track" },
  ];
  return entries.map((e, i) => {
    const d = new Date(today);
    d.setDate(d.getDate() - e.daysAgo);
    return {
      id: `mock-weight-${i}`,
      date: d.toISOString().split("T")[0],
      weight: e.weight,
      note: e.note,
    };
  });
};

function hydrate(): WeightLog[] {
  try {
    const stored = typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null;
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch (e) {
    console.warn("Failed to hydrate weight-logs-data:", e);
  }
  return [];
}

export function useWeightLogs() {
  const [weightLogs, setWeightLogs] = useState<WeightLog[]>(() => {
    const initial = hydrate();
    if (typeof window === "undefined") return initial;
    const seeded = localStorage.getItem(SEED_FLAG);
    // Reseed if history is a stub (<3 entries) and we haven't seeded v2 yet
    if (!seeded && initial.length < 3) {
      const mocks = getMockWeightLogs();
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(mocks));
        localStorage.setItem(SEED_FLAG, "1");
      } catch {}
      return mocks;
    }
    return initial;
  });
  const didMount = useRef(false);

  useEffect(() => {
    if (!didMount.current) {
      didMount.current = true;
      return;
    }
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(weightLogs));
    } catch (e) {
      console.warn("Failed to persist weight-logs-data:", e);
    }
  }, [weightLogs]);

  const addWeightLog = (data: { date?: string; weight: number; note?: string }) => {
    const log: WeightLog = {
      id: `weight-log-${Date.now()}`,
      date: data.date || new Date().toISOString().split('T')[0],
      weight: Number(data.weight),
      note: data.note,
    };
    setWeightLogs(prev => [...prev, log]);
    return log;
  };

  const deleteWeightLog = (id: string) => {
    setWeightLogs(prev => prev.filter(l => l.id !== id));
    toast.success("Weight log deleted");
  };

  return { weightLogs, addWeightLog, deleteWeightLog };
}
