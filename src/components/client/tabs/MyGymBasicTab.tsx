import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Building2, MapPin, LogOut } from "lucide-react";
import { ConnectGymCard, BasicGymConnection } from "./mygym-basic/ConnectGymCard";
import { MembershipPlanCard, MembershipPlan } from "./mygym-basic/MembershipPlanCard";
import { GymTrainersGrid } from "./mygym-basic/GymTrainersGrid";
import { toast } from "sonner";

const CONN_KEY = "basic-client-gym-connection";
const PLAN_KEY = "basic-client-membership";

const EMPTY_PLAN: MembershipPlan = { joinDate: "", expiryDate: "", certificateExpiryDate: "" };

export function MyGymBasicTab() {
  const [connection, setConnection] = useState<BasicGymConnection | null>(null);
  const [plan, setPlan] = useState<MembershipPlan>(EMPTY_PLAN);

  useEffect(() => {
    const c = localStorage.getItem(CONN_KEY);
    if (c) {
      try { setConnection(JSON.parse(c)); } catch {}
    }
    const p = localStorage.getItem(PLAN_KEY);
    if (p) {
      try { setPlan({ ...EMPTY_PLAN, ...JSON.parse(p) }); } catch {}
    }
  }, []);

  const handleConnected = (conn: BasicGymConnection) => {
    localStorage.setItem(CONN_KEY, JSON.stringify(conn));
    setConnection(conn);
  };

  const handleDisconnect = () => {
    localStorage.removeItem(CONN_KEY);
    localStorage.removeItem(PLAN_KEY);
    setConnection(null);
    setPlan(EMPTY_PLAN);
    toast.success("Palestra disconnessa");
  };

  const handleSavePlan = (v: MembershipPlan) => {
    localStorage.setItem(PLAN_KEY, JSON.stringify(v));
    setPlan(v);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">La mia palestra</h1>
        <p className="text-muted-foreground">Connettiti, gestisci il tuo piano e scopri gli allenatori</p>
      </div>

      {!connection ? (
        <ConnectGymCard onConnected={handleConnected} />
      ) : (
        <>
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Building2 className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">{connection.gymName}</CardTitle>
                    <CardDescription className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {connection.gymAddress}
                    </CardDescription>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="bg-green-100 text-green-800">Membro attivo</Badge>
                  <Button variant="ghost" size="sm" onClick={handleDisconnect}>
                    <LogOut className="h-4 w-4 mr-1" /> Disconnetti
                  </Button>
                </div>
              </div>
            </CardHeader>
          </Card>

          <MembershipPlanCard value={plan} onSave={handleSavePlan} />

          <GymTrainersGrid gymId={connection.gymId} />
        </>
      )}
    </div>
  );
}
