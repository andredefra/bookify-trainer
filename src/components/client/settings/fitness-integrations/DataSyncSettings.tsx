
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface DataSyncSettingsProps {
  dataSync: {
    steps: boolean;
    heartRate: boolean;
    sleep: boolean;
    workouts: boolean;
  };
  toggleDataSync: (metric: keyof typeof dataSync) => void;
}

export function DataSyncSettings({ dataSync, toggleDataSync }: DataSyncSettingsProps) {
  return (
    <div className="border-t pt-4 mt-4">
      <h3 className="font-medium mb-3">Data Sync Settings</h3>
      <div className="space-y-3">
        <SyncOption
          id="steps-sync"
          title="Steps"
          description="Import daily step count"
          checked={dataSync.steps}
          onChange={() => toggleDataSync("steps")}
        />

        <SyncOption
          id="heart-rate-sync"
          title="Heart Rate"
          description="Import heart rate data"
          checked={dataSync.heartRate}
          onChange={() => toggleDataSync("heartRate")}
        />

        <SyncOption
          id="sleep-sync"
          title="Sleep"
          description="Import sleep tracking data"
          checked={dataSync.sleep}
          onChange={() => toggleDataSync("sleep")}
        />

        <SyncOption
          id="workouts-sync"
          title="Workouts"
          description="Import workouts automatically"
          checked={dataSync.workouts}
          onChange={() => toggleDataSync("workouts")}
        />
      </div>
    </div>
  );
}

interface SyncOptionProps {
  id: string;
  title: string;
  description: string;
  checked: boolean;
  onChange: () => void;
}

function SyncOption({ id, title, description, checked, onChange }: SyncOptionProps) {
  return (
    <div className="flex items-center justify-between">
      <Label htmlFor={id} className="cursor-pointer">
        <div>{title}</div>
        <div className="text-sm text-muted-foreground">
          {description}
        </div>
      </Label>
      <Switch 
        id={id} 
        checked={checked} 
        onCheckedChange={onChange} 
      />
    </div>
  );
}
