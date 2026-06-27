import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Dumbbell, TrendingUp, TrendingDown, Minus, Calendar, Clock } from "lucide-react";
import { demoWorkoutLogs } from "@/data/training/demoWorkoutLogs";
import type { WorkoutLog, WorkoutExercise, WorkoutSet } from "@/data/training/workoutTypes";
import { safeFormatDate } from "@/utils/safeFormatDate";

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

function exerciseKey(ex: WorkoutExercise) {
  return ex.exerciseDbId?.toLowerCase() || ex.name.toLowerCase().trim();
}

function findPriorExercise(
  logs: WorkoutLog[],
  currentIndex: number,
  ex: WorkoutExercise
): WorkoutExercise | null {
  const key = exerciseKey(ex);
  for (let i = currentIndex + 1; i < logs.length; i++) {
    const found = logs[i].exercises.find((e) => exerciseKey(e) === key);
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
  if (trend === "none") {
    return <span className="text-xs text-muted-foreground">—</span>;
  }
  if (trend === "up") {
    return (
      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 gap-1 font-medium">
        <TrendingUp className="h-3 w-3" />
        {label}
      </Badge>
    );
  }
  if (trend === "down") {
    return (
      <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 gap-1 font-medium">
        <TrendingDown className="h-3 w-3" />
        {label}
      </Badge>
    );
  }
  return (
    <Badge variant="outline" className="bg-gray-50 text-gray-600 border-gray-200 gap-1">
      <Minus className="h-3 w-3" />
      same
    </Badge>
  );
}

export function ClientWorkoutsDialog({ client, open, onOpenChange }: ClientWorkoutsDialogProps) {
  // Sorted newest first
  const logs = [...demoWorkoutLogs].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[85vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Dumbbell className="h-5 w-5 text-primary" />
            Workouts {client ? `— ${client.name}` : ""}
          </DialogTitle>
          <DialogDescription>
            Daily workouts logged by the client, with progression vs the previous time the same exercise was performed.
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="flex-1 pr-4 -mr-2">
          {logs.length === 0 ? (
            <div className="text-center py-10 text-muted-foreground">
              No workouts logged yet.
            </div>
          ) : (
            <div className="space-y-4 pb-2">
              {logs.map((log, idx) => (
                <div key={log.id} className="border rounded-lg p-4 bg-card">
                  <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
                    <div>
                      <h3 className="font-semibold text-base">{log.name}</h3>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground mt-0.5">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {safeFormatDate(log.date, "EEE, MMM d, yyyy")}
                        </span>
                        {log.duration && (
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {log.duration}
                          </span>
                        )}
                      </div>
                    </div>
                    <Badge variant="secondary">
                      {log.exercises.length} exercise{log.exercises.length === 1 ? "" : "s"}
                    </Badge>
                  </div>

                  <div className="space-y-3">
                    {log.exercises.map((ex) => {
                      const prior = findPriorExercise(logs, idx, ex);
                      return (
                        <div key={ex.id} className="border rounded-md p-3 bg-muted/20">
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
                                <span className={
                                  exerciseSummary(ex, prior).startsWith("+")
                                    ? "text-green-700"
                                    : exerciseSummary(ex, prior).startsWith("-")
                                    ? "text-red-700"
                                    : "text-muted-foreground"
                                }>
                                  {exerciseSummary(ex, prior)}
                                </span>
                              ) : (
                                <span className="text-muted-foreground">First time logged</span>
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
                                      <td className="py-1.5 pr-2 font-medium">{s.setNumber}</td>
                                      <td className="py-1.5 pr-2 text-muted-foreground">{s.targetReps}</td>
                                      <td className="py-1.5 pr-2">{s.actualReps ?? "—"}</td>
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
              ))}
            </div>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
