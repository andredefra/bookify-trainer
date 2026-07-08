import { useState, useEffect, useRef } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export interface WeightLog {
  id: string;
  date: string;
  weight: number;
  note?: string;
}

const STORAGE_KEY = "weight-logs-data";

// Historical weight trend: gentle downward progress over ~4 months
const getMockWeightLogs = (): WeightLog[] => {
  const today = new Date();
  const entries: Array<{ daysAgo: number; weight: number; note?: string }> = [
    { daysAgo: 120, weight: 82.4, note: "Starting point" },
    { daysAgo: 105, weight: 81.8 },
    { daysAgo: 90, weight: 81.1, note: "Feeling stronger" },
    { daysAgo: 75, weight: 80.5 },
    { daysAgo: 60, weight: 79.8, note: "New nutrition plan" },
    { daysAgo: 45, weight: 79.2 },
    { daysAgo: 30, weight: 78.6 },
    { daysAgo: 14, weight: 78.2 },
    { daysAgo: 3, weight: 78.0, note: "On track" },
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

function hydrate(): WeightLog[] | null {
  try {
    const stored = typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null;
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch (e) {
    console.warn("Failed to hydrate weight-logs-data:", e);
  }
  return null;
}

export function useWeightLogs() {
  const initial = hydrate();
  const [weightLogs, setWeightLogs] = useState<WeightLog[]>(
    initial && initial.length > 0 ? initial : []
  );
  const didMount = useRef(false);
  const needsSeed = useRef(!initial || initial.length === 0);

  // Seed mock history for demo users (no authenticated session) when empty
  useEffect(() => {
    if (!needsSeed.current) return;
    const checkDemoMode = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setWeightLogs(getMockWeightLogs());
      }
    };
    checkDemoMode();
  }, []);

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
