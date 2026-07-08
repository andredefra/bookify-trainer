import { useState, useEffect, useRef } from "react";
import { toast } from "sonner";

export interface WeightLog {
  id: string;
  date: string;
  weight: number;
  note?: string;
}

const STORAGE_KEY = "weight-logs-data";

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
  const [weightLogs, setWeightLogs] = useState<WeightLog[]>(() => hydrate());
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
