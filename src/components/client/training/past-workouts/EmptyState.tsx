
export function EmptyState() {
  return (
    <div className="text-center py-10">
      <p className="text-muted-foreground mb-2">No workout logs found</p>
      <p className="text-sm text-muted-foreground">
        Click "Log Workout" to record your first workout
      </p>
    </div>
  );
}
