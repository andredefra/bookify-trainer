
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { 
  Activity, 
  Heart, 
  StepForward, 
  Weight, 
  Scale, 
  LineChart 
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { DataSyncSettings } from "./DataSyncSettings";

interface AppInfo {
  id: string;
  name: string;
  icon: React.ElementType;
  color: string;
  connected: boolean;
  description: string;
}

interface FitnessAppIntegrationProps {
  user: { 
    email: string; 
    type: string; 
    name?: string; 
    plan?: string; 
  };
}

export function FitnessAppIntegration({ user }: FitnessAppIntegrationProps) {
  const [apps, setApps] = useState<AppInfo[]>([
    { 
      id: "fitbit",
      name: "Fitbit", 
      icon: Activity, 
      color: "blue", 
      connected: true,
      description: "Sincronizza i dati di attività fisica dal tuo dispositivo Fitbit"
    },
    { 
      id: "garmin",
      name: "Garmin Connect", 
      icon: Heart, 
      color: "red", 
      connected: false,
      description: "Integrazione con Garmin Connect per tracciare la tua attività sportiva"
    },
    { 
      id: "strava",
      name: "Strava", 
      icon: StepForward, 
      color: "orange", 
      connected: true,
      description: "Condividi i tuoi allenamenti e corri con la community di Strava"
    },
    { 
      id: "apple",
      name: "Apple Health", 
      icon: Weight, 
      color: "green", 
      connected: false,
      description: "Sincronizza i dati di salute e fitness dal tuo iPhone o Apple Watch"
    },
    { 
      id: "samsung", 
      name: "Samsung Health", 
      icon: LineChart, 
      color: "purple", 
      connected: false,
      description: "Collega il tuo account Samsung Health per tracciare la tua attività fisica"
    }
  ]);
  
  const [showDataSettings, setShowDataSettings] = useState<string | null>(null);
  
  const handleConnectToggle = (appId: string) => {
    setApps(apps.map(app => 
      app.id === appId 
        ? { ...app, connected: !app.connected } 
        : app
    ));
    
    const app = apps.find(a => a.id === appId);
    if (app) {
      if (app.connected) {
        toast.success(`Disconnessione da ${app.name} eseguita con successo`);
      } else {
        toast.success(`Connessione a ${app.name} eseguita con successo`);
      }
    }
  };
  
  const handleDataSettingsOpen = (appId: string) => {
    setShowDataSettings(appId);
  };
  
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {apps.map((app) => (
          <div key={app.id} className="border rounded-lg p-4 bg-white">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-full bg-${app.color}-100`}>
                  <app.icon className={`h-5 w-5 text-${app.color}-600`} />
                </div>
                <div>
                  <h3 className="font-medium">{app.name}</h3>
                  <p className="text-sm text-muted-foreground">{app.description}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 ml-auto">
                <div className="flex items-center space-x-2">
                  <Switch 
                    id={`${app.id}-switch`} 
                    checked={app.connected}
                    onCheckedChange={() => handleConnectToggle(app.id)} 
                  />
                  <Label htmlFor={`${app.id}-switch`}>
                    {app.connected ? "Connesso" : "Disconnesso"}
                  </Label>
                </div>
                
                {app.connected && (
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleDataSettingsOpen(app.id)}
                  >
                    Gestisci
                  </Button>
                )}
              </div>
            </div>
            
            {showDataSettings === app.id && (
              <div className="mt-4 pt-4 border-t">
                <DataSyncSettings 
                  appName={app.name}
                  onClose={() => setShowDataSettings(null)}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
