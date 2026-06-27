import { useMemo, useState, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarUI } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import {
  Dumbbell,
  TrendingUp,
  TrendingDown,
  Minus,
  Calendar as CalendarIcon,
  Clock,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  X,
} from "lucide-react";
import { format, subDays, startOfMonth, isWithinInterval, parseISO } from "date-fns";
import { demoWorkoutLogs } from "@/data/training/demoWorkoutLogs";
import type { WorkoutLog, WorkoutExercise, WorkoutSet } from "@/data/training/workoutTypes";
import { safeFormatDate } from "@/utils/safeFormatDate";
import { cn } from "@/lib/utils";

interface ClientItem {
  id: number;
  name: string;
}

interface ClientWorkoutsDialogProps {
  client: ClientItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type Trend = "up" | "down" | "same" | "none";

const PAGE_SIZE = 30;

function exerciseKey(ex: WorkoutExercise) {
  return ex.exerciseDbId?.toLowerCase() || ex.name.toLowerCase().trim();
}

function findPriorExerciseInFull(
  fullSorted: WorkoutLog[],
  currentLogId: string | number,
  ex: WorkoutExercise
): WorkoutExercise | null {
  const key = exerciseKey(ex);
  const idx = fullSorted.findIndex((l) => l.id === currentLogId);
  if (idx === -1) return null;
  for (let i = idx + 1; i < fullSorted.length; i++) {
    const found = fullSorted[i].exercises.find((e) => exerciseKey(e) === key);
    if (found) return found;
  }
  return null;
}

function compareSets(curr: WorkoutSet, prior?: WorkoutSet): { trend: Trend; label: string } {
  if (!prior) return { trend: "none", label: "—" };
  const cw = curr.weight ?? 0;
  const pw = prior.weight ?? 0;
  const cr = curr.actualReps ?? 0;
  const pr = prior.actualReps ?? 0;
  if (cw > pw || (cw === pw && cr > pr)) {
    const dw = cw - pw;
    const dr = cr - pr;
    const parts: string[] = [];
    if (dw) parts.push(`${dw > 0 ? "+" : ""}${dw}kg`);
    if (dr) parts.push(`${dr > 0 ? "+" : ""}${dr} reps`);
    return { trend: "up", label: parts.join(", ") || "better" };
  }
  if (cw < pw || (cw === pw && cr < pr)) {
    const dw = cw - pw;
    const dr = cr - pr;
    const parts: string[] = [];
    if (dw) parts.push(`${dw}kg`);
    if (dr) parts.push(`${dr} reps`);
    return { trend: "down", label: parts.join(", ") || "lower" };
  }
  return { trend: "same", label: "=" };
}

function exerciseSummary(curr: WorkoutExercise, prior: WorkoutExercise | null) {
  if (!prior) return "First time logged";
  const avg = (sets: WorkoutSet[]) => {
    const w = sets.reduce((s, x) => s + (x.weight ?? 0), 0) / Math.max(sets.length, 1);
    const r = sets.reduce((s, x) => s + (x.actualReps ?? 0), 0) / Math.max(sets.length, 1);
    return { w, r };
  };
  const c = avg(curr.setsData);
  const p = avg(prior.setsData);
  const dw = +(c.w - p.w).toFixed(1);
  const dr = +(c.r - p.r).toFixed(1);
  const parts: string[] = [];
  if (dw !== 0) parts.push(`${dw > 0 ? "+" : ""}${dw} kg avg`);
  if (dr !== 0) parts.push(`${dr > 0 ? "+" : ""}${dr} reps avg`);
  if (parts.length === 0) return "Same as last time";
  return `${parts.join(" · ")} vs last time`;
}

function TrendBadge({ trend, label }: { trend: Trend; label: string }) {
  if (trend === "none") return <span className="text-xs text-muted-foreground">—</span>;
  if (trend === "up")
    return (
      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 gap-1 font-medium">
        <TrendingUp className="h-3 w-3" />
        {label}
      </Badge>
    );
  if (trend === "down")
    return (
      <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 gap-1 font-medium">
        <TrendingDown className="h-3 w-3" />
        {label}
      </Badge>
    );
  return (
    <Badge variant="outline" className="bg-gray-50 text-gray-600 border-gray-200 gap-1">
      <Minus className="h-3 w-3" />
      same
    </Badge>
  );
}

type PresetKey = "7d" | "30d" | "3m" | "all" | "custom";

export function ClientWorkoutsDialog({ client, open, onOpenChange }: ClientWorkoutsDialogProps) {
  const fullSorted = useMemo(
    () =>
      [...demoWorkoutLogs].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      ),
    []
  );

  const [preset, setPreset] = useState<PresetKey>("all");
  const [from, setFrom] = useState<Date | undefined>(undefined);
  const [to, setTo] = useState<Date | undefined>(undefined);
  const [exerciseFilter, setExerciseFilter] = useState<string>("all");
  const [page, setPage] = useState(1);
  const [openMonths, setOpenMonths] = useState<Record<string, boolean>>({});
  const [openDays, setOpenDays] = useState<Record<string, boolean>>({});

  // Reset when dialog opens for a new client
  useEffect(() => {
    if (open) {
      setPreset("all");
      setFrom(undefined);
      setTo(undefined);
      setExerciseFilter("all");
      setPage(1);
      setOpenMonths({});
      setOpenDays({});
    }
  }, [open, client?.id]);

  const applyPreset = (p: PresetKey) => {
    setPreset(p);
    setPage(1);
    const now = new Date();
    if (p === "7d") {
      setFrom(subDays(now, 7));
      setTo(now);
    } else if (p === "30d") {
      setFrom(subDays(now, 30));
      setTo(now);
    } else if (p === "3m") {
      setFrom(subDays(now, 90));
      setTo(now);
    } else if (p === "all") {
      setFrom(undefined);
      setTo(undefined);
    }
  };

  // Build exercise options from full history
  const exerciseOptions = useMemo(() => {
    const map = new Map<string, string>();
    fullSorted.forEach((l) =>
      l.exercises.forEach((e) => {
        const k = exerciseKey(e);
        if (!map.has(k)) map.set(k, e.name);
      })
    );
    return Array.from(map.entries()).sort((a, b) => a[1].localeCompare(b[1]));
  }, [fullSorted]);

  // Filter
  const filtered = useMemo(() => {
    return fullSorted.filter((l) => {
      const d = parseISO(l.date);
      if (from && to) {
        if (!isWithinInterval(d, { start: startOfMonth(from) > from ? from : from, end: to })) {
          // simpler: just compare bounds
        }
        if (d < new Date(from.setHours(0, 0, 0, 0)) || d > new Date(to.setHours(23, 59, 59, 999))) {
          return false;
        }
      } else if (from && d < from) return false;
      else if (to && d > to) return false;

      if (exerciseFilter !== "all") {
        const has = l.exercises.some((e) => exerciseKey(e) === exerciseFilter);
        if (!has) return false;
      }
      return true;
    });
  }, [fullSorted, from, to, exerciseFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const paged = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  // Group by month
  const grouped = useMemo(() => {
    const g: Record<string, { label: string; logs: WorkoutLog[] }> = {};
    paged.forEach((l) => {
      const d = parseISO(l.date);
      const key = format(d, "yyyy-MM");
      if (!g[key]) g[key] = { label: format(d, "MMMM yyyy"), logs: [] };
      g[key].logs.push(l);
    });
    return Object.entries(g).sort(([a], [b]) => (a < b ? 1 : -1));
  }, [paged]);

  // Default first month expanded; first day of first month expanded
  useEffect(() => {
    if (grouped.length > 0) {
      setOpenMonths((prev) => {
        const next = { ...prev };
        grouped.forEach(([k], i) => {
          if (next[k] === undefined) next[k] = i === 0;
        });
        return next;
      });
      setOpenDays((prev) => {
        const next = { ...prev };
        grouped.forEach(([, { logs }], gi) => {
          logs.forEach((log, li) => {
            const id = String(log.id);
            if (next[id] === undefined) next[id] = gi === 0 && li === 0;
          });
        });
        return next;
      });
    }
  }, [grouped]);

  const expandAll = () => {
    const m: Record<string, boolean> = {};
    const d: Record<string, boolean> = {};
    grouped.forEach(([k, { logs }]) => {
      m[k] = true;
      logs.forEach((l) => (d[String(l.id)] = true));
    });
    setOpenMonths(m);
    setOpenDays(d);
  };

  const collapseAll = () => {
    const m: Record<string, boolean> = {};
    const d: Record<string, boolean> = {};
    grouped.forEach(([k, { logs }]) => {
      m[k] = false;
      logs.forEach((l) => (d[String(l.id)] = false));
    });
    setOpenMonths(m);
    setOpenDays(d);
  };

  const resetFilters = () => {
    applyPreset("all");
    setExerciseFilter("all");
  };

  const hasActiveFilters = preset !== "all" || exerciseFilter !== "all";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl h-[85vh] overflow-hidden flex flex-col p-0">
        <DialogHeader className="shrink-0 p-6 pb-3 border-b">
          <DialogTitle className="flex items-center gap-2">
            <Dumbbell className="h-5 w-5 text-primary" />
            Workouts {client ? `— ${client.name}` : ""}
          </DialogTitle>
          <DialogDescription>
            Daily workouts logged by the client, with progression vs the previous time the same exercise was performed.
          </DialogDescription>
        </DialogHeader>

        {/* Toolbar */}
        <div className="shrink-0 border-b bg-muted/30 px-6 py-3 space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            {/* Presets */}
            <div className="flex flex-wrap gap-1">
              {([
                ["7d", "Last 7d"],
                ["30d", "Last 30d"],
                ["3m", "Last 3m"],
                ["all", "All time"],
              ] as [PresetKey, string][]).map(([k, label]) => (
                <Button
                  key={k}
                  size="sm"
                  variant={preset === k ? "default" : "outline"}
                  className="h-8 text-xs"
                  onClick={() => applyPreset(k)}
                >
                  {label}
                </Button>
              ))}
            </div>

            <div className="h-6 w-px bg-border mx-1 hidden sm:block" />

            {/* From / To */}
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  size="sm"
                  variant="outline"
                  className={cn("h-8 text-xs gap-1", !from && "text-muted-foreground")}
                >
                  <CalendarIcon className="h-3 w-3" />
                  {from ? format(from, "MMM d, yyyy") : "From"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 pointer-events-auto" align="start">
                <CalendarUI
                  mode="single"
                  selected={from}
                  onSelect={(d) => {
                    setFrom(d);
                    setPreset("custom");
                    setPage(1);
                  }}
                  initialFocus
                  className="p-3 pointer-events-auto"
                />
              </PopoverContent>
            </Popover>

            <Popover>
              <PopoverTrigger asChild>
                <Button
                  size="sm"
                  variant="outline"
                  className={cn("h-8 text-xs gap-1", !to && "text-muted-foreground")}
                >
                  <CalendarIcon className="h-3 w-3" />
                  {to ? format(to, "MMM d, yyyy") : "To"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 pointer-events-auto" align="start">
                <CalendarUI
                  mode="single"
                  selected={to}
                  onSelect={(d) => {
                    setTo(d);
                    setPreset("custom");
                    setPage(1);
                  }}
                  initialFocus
                  className="p-3 pointer-events-auto"
                />
              </PopoverContent>
            </Popover>

            {/* Exercise filter */}
            <Select
              value={exerciseFilter}
              onValueChange={(v) => {
                setExerciseFilter(v);
                setPage(1);
              }}
            >
              <SelectTrigger className="h-8 text-xs w-[200px]">
                <SelectValue placeholder="All exercises" />
              </SelectTrigger>
              <SelectContent className="max-h-[300px]">
                <SelectItem value="all">All exercises</SelectItem>
                {exerciseOptions.map(([k, name]) => (
                  <SelectItem key={k} value={k}>
                    {name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {hasActiveFilters && (
              <Button size="sm" variant="ghost" className="h-8 text-xs gap-1" onClick={resetFilters}>
                <X className="h-3 w-3" />
                Reset
              </Button>
            )}
          </div>

          <div className="flex items-center justify-between gap-2 flex-wrap">
            <div className="text-xs text-muted-foreground">
              Showing {paged.length} of {filtered.length} session{filtered.length === 1 ? "" : "s"}
              {filtered.length !== fullSorted.length && ` (${fullSorted.length} total)`}
            </div>
            {filtered.length > 0 && (
              <div className="flex gap-1">
                <Button size="sm" variant="ghost" className="h-7 text-xs" onClick={expandAll}>
                  Expand all
                </Button>
                <Button size="sm" variant="ghost" className="h-7 text-xs" onClick={collapseAll}>
                  Collapse all
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 min-h-0 overflow-y-auto px-6 py-4">
          {filtered.length === 0 ? (
            <div className="text-center py-10 text-muted-foreground space-y-3">
              <div>No workouts in this range.</div>
              {hasActiveFilters && (
                <Button variant="outline" size="sm" onClick={resetFilters}>
                  Reset filters
                </Button>
              )}
            </div>
          ) : (
            <div className="space-y-4 pb-2">
              {grouped.map(([monthKey, { label, logs }]) => {
                const isOpen = openMonths[monthKey] ?? false;
                return (
                  <Collapsible
                    key={monthKey}
                    open={isOpen}
                    onOpenChange={(o) => setOpenMonths((prev) => ({ ...prev, [monthKey]: o }))}
                  >
                    <CollapsibleTrigger className="w-full flex items-center justify-between p-2 rounded-md bg-muted/40 hover:bg-muted transition-colors">
                      <div className="flex items-center gap-2">
                        <ChevronDown
                          className={cn("h-4 w-4 transition-transform", !isOpen && "-rotate-90")}
                        />
                        <span className="font-semibold text-sm">{label}</span>
                        <Badge variant="secondary" className="ml-1">
                          {logs.length}
                        </Badge>
                      </div>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="space-y-2 pt-2 pl-2">
                      {logs.map((log) => {
                        const dayId = String(log.id);
                        const dayOpen = openDays[dayId] ?? false;
                        return (
                          <Collapsible
                            key={log.id}
                            open={dayOpen}
                            onOpenChange={(o) => setOpenDays((prev) => ({ ...prev, [dayId]: o }))}
                          >
                            <CollapsibleTrigger className="w-full flex items-center justify-between p-3 rounded-md border bg-card hover:bg-muted/40 transition-colors text-left">
                              <div className="flex items-center gap-2 min-w-0">
                                <ChevronDown
                                  className={cn(
                                    "h-4 w-4 shrink-0 transition-transform",
                                    !dayOpen && "-rotate-90"
                                  )}
                                />
                                <div className="min-w-0">
                                  <div className="font-medium text-sm truncate">
                                    {safeFormatDate(log.date, "EEE, MMM d")} · {log.name}
                                  </div>
                                  <div className="flex items-center gap-3 text-xs text-muted-foreground mt-0.5">
                                    {log.duration && (
                                      <span className="flex items-center gap-1">
                                        <Clock className="h-3 w-3" />
                                        {log.duration}
                                      </span>
                                    )}
                                    <span>
                                      {log.exercises.length} exercise
                                      {log.exercises.length === 1 ? "" : "s"}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </CollapsibleTrigger>
                            <CollapsibleContent>
                              <div className="border border-t-0 rounded-b-md p-3 bg-card -mt-px">
                                <div className="space-y-3">
                                  {log.exercises
                                    .filter((ex) =>
                                      exerciseFilter === "all"
                                        ? true
                                        : exerciseKey(ex) === exerciseFilter
                                    )
                                    .map((ex) => {
                                      const prior = findPriorExerciseInFull(fullSorted, log.id, ex);
                                      return (
                                        <div
                                          key={ex.id}
                                          className="border rounded-md p-3 bg-muted/20"
                                        >
                                          <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
                                            <div>
                                              <div className="font-medium text-sm">{ex.name}</div>
                                              {ex.muscleGroups && ex.muscleGroups.length > 0 && (
                                                <div className="text-xs text-muted-foreground">
                                                  {ex.muscleGroups.join(" · ")}
                                                </div>
                                              )}
                                            </div>
                                            <div className="text-xs font-medium">
                                              {prior ? (
                                                <span
                                                  className={
                                                    exerciseSummary(ex, prior).startsWith("+")
                                                      ? "text-green-700"
                                                      : exerciseSummary(ex, prior).startsWith("-")
                                                      ? "text-red-700"
                                                      : "text-muted-foreground"
                                                  }
                                                >
                                                  {exerciseSummary(ex, prior)}
                                                </span>
                                              ) : (
                                                <span className="text-muted-foreground">
                                                  First time logged
                                                </span>
                                              )}
                                            </div>
                                          </div>

                                          <div className="overflow-x-auto">
                                            <table className="w-full text-xs">
                                              <thead>
                                                <tr className="text-muted-foreground text-left border-b">
                                                  <th className="py-1.5 pr-2 font-normal">Set</th>
                                                  <th className="py-1.5 pr-2 font-normal">Target</th>
                                                  <th className="py-1.5 pr-2 font-normal">Reps</th>
                                                  <th className="py-1.5 pr-2 font-normal">Weight</th>
                                                  <th className="py-1.5 pr-2 font-normal">vs prior</th>
                                                </tr>
                                              </thead>
                                              <tbody>
                                                {ex.setsData.map((s, i) => {
                                                  const priorSet = prior?.setsData[i];
                                                  const cmp = compareSets(s, priorSet);
                                                  return (
                                                    <tr key={i} className="border-b last:border-0">
                                                      <td className="py-1.5 pr-2 font-medium">
                                                        {s.setNumber}
                                                      </td>
                                                      <td className="py-1.5 pr-2 text-muted-foreground">
                                                        {s.targetReps}
                                                      </td>
                                                      <td className="py-1.5 pr-2">
                                                        {s.actualReps ?? "—"}
                                                      </td>
                                                      <td className="py-1.5 pr-2">
                                                        {s.weight != null ? `${s.weight} kg` : "—"}
                                                      </td>
                                                      <td className="py-1.5 pr-2">
                                                        <TrendBadge trend={cmp.trend} label={cmp.label} />
                                                      </td>
                                                    </tr>
                                                  );
                                                })}
                                              </tbody>
                                            </table>
                                          </div>
                                        </div>
                                      );
                                    })}
                                </div>
                              </div>
                            </CollapsibleContent>
                          </Collapsible>
                        );
                      })}
                    </CollapsibleContent>
                  </Collapsible>
                );
              })}
            </div>
          )}
        </div>

        {/* Pagination footer */}
        {filtered.length > PAGE_SIZE && (
          <div className="shrink-0 border-t px-6 py-3 flex items-center justify-between bg-muted/20">
            <div className="text-xs text-muted-foreground">
              Page {safePage} of {totalPages}
            </div>
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="outline"
                className="h-8"
                disabled={safePage <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Prev
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="h-8"
                disabled={safePage >= totalPages}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              >
                Next
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
