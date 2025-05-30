
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface DataSyncSettings {
  steps: boolean;
  heartRate: boolean;
  sleep: boolean;
  workouts: boolean;
  bodyComposition: boolean;
  weight: boolean;
}

interface DataSyncSettingsProps {
  dataSync: DataSyncSettings;
  toggleDataSync: (metric: keyof DataSyncSettings) => void;
  appName?: string;
}

export function DataSyncSettings({ dataSync, toggleDataSync, appName }: DataSyncSettingsProps) {
  return (
    <div className="border-t pt-4 mt-4">
      <h3 className="font-medium mb-3">
        Data Sync Settings
        {appName && <span className="text-muted-foreground text-sm ml-2">({appName})</span>}
      </h3>
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
          id="workouts-sync"
          title="Workouts"
          description="Import workouts automatically"
          checked={dataSync.workouts}
          onChange={() => toggleDataSync("workouts")}
        />

        <SyncOption
          id="weight-sync"
          title="Weight"
          description="Import weight measurements from smart scales"
          checked={dataSync.weight}
          onChange={() => toggleDataSync("weight")}
        />

        <SyncOption
          id="body-composition-sync"
          title="Body Composition"
          description="Import BMI, body fat %, muscle mass from smart scales"
          checked={dataSync.bodyComposition}
          onChange={() => toggleDataSync("bodyComposition")}
        />

        <SyncOption
          id="sleep-sync"
          title="Sleep"
          description="Import sleep tracking data"
          checked={dataSync.sleep}
          onChange={() => toggleDataSync("sleep")}
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
