import { useMemo, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Building2, MapPin, Search, FileText } from "lucide-react";
import { toast } from "sonner";
import type { MembershipPlan } from "./MembershipPlanCard";

export interface BasicGymConnection {
  gymId: string;
  gymName: string;
  gymAddress: string;
  city: string;
  connectedAt: string;
}

const DEMO_GYMS: BasicGymConnection[] = [
  { gymId: "fitlife", gymName: "FitLife Gym", gymAddress: "Via Roma 10, Milano", city: "Milano", connectedAt: "" },
  { gymId: "powerhouse", gymName: "PowerHouse Studio", gymAddress: "Corso Italia 45, Milano", city: "Milano", connectedAt: "" },
  { gymId: "urbanfit", gymName: "Urban Fit Club", gymAddress: "Viale Monza 120, Milano", city: "Milano", connectedAt: "" },
  { gymId: "romafit", gymName: "Roma Fit Center", gymAddress: "Via del Corso 200, Roma", city: "Roma", connectedAt: "" },
  { gymId: "colosseumgym", gymName: "Colosseum Gym", gymAddress: "Via Labicana 15, Roma", city: "Roma", connectedAt: "" },
  { gymId: "torinoathletic", gymName: "Torino Athletic Club", gymAddress: "Corso Vittorio 88, Torino", city: "Torino", connectedAt: "" },
  { gymId: "napolifit", gymName: "Napoli Fitness Hub", gymAddress: "Via Toledo 32, Napoli", city: "Napoli", connectedAt: "" },
];

const EMPTY_PLAN: MembershipPlan = { joinDate: "", expiryDate: "", certificateExpiryDate: "" };

interface ConnectGymCardProps {
  onConnected: (conn: BasicGymConnection, plan: MembershipPlan) => void;
}

export function ConnectGymCard({ onConnected }: ConnectGymCardProps) {
  const [selectedId, setSelectedId] = useState<string>("");
  const [query, setQuery] = useState("");
  const [city, setCity] = useState<string>("all");
  const [planOpen, setPlanOpen] = useState(false);
  const [plan, setPlan] = useState<MembershipPlan>(EMPTY_PLAN);

  const cities = useMemo(
    () => Array.from(new Set(DEMO_GYMS.map(g => g.city))).sort(),
    []
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return DEMO_GYMS.filter(g => {
      const matchCity = city === "all" || g.city === city;
      const matchQuery =
        !q ||
        g.gymName.toLowerCase().includes(q) ||
        g.gymAddress.toLowerCase().includes(q);
      return matchCity && matchQuery;
    });
  }, [query, city]);

  const openPlanDialog = () => {
    if (!DEMO_GYMS.find(g => g.gymId === selectedId)) {
      toast.error("Seleziona una palestra");
      return;
    }
    setPlanOpen(true);
  };

  const handleConfirm = () => {
    const gym = DEMO_GYMS.find(g => g.gymId === selectedId);
    if (!gym) return;
    if (!plan.joinDate) {
      toast.error("Inserisci almeno la data di iscrizione");
      return;
    }
    const conn = { ...gym, connectedAt: new Date().toISOString() };
    onConnected(conn, plan);
    setPlanOpen(false);
    toast.success(`Connesso a ${gym.gymName}`);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Building2 className="h-5 w-5" />
          Connetti la tua palestra
        </CardTitle>
        <CardDescription>
          Cerca la palestra a cui sei iscritto, inserisci i dati del tuo piano e connettiti.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-3 sm:grid-cols-[1fr_200px]">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Cerca per nome o indirizzo..."
              value={query}
              onChange={e => setQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={city} onValueChange={setCity}>
            <SelectTrigger>
              <SelectValue placeholder="Città" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tutte le città</SelectItem>
              {cities.map(c => (
                <SelectItem key={c} value={c}>{c}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-2">
          {filtered.length === 0 ? (
            <div className="text-center text-sm text-muted-foreground border border-dashed rounded-lg p-6">
              Nessuna palestra trovata con questi criteri.
            </div>
          ) : (
            filtered.map(g => (
              <button
                key={g.gymId}
                onClick={() => setSelectedId(g.gymId)}
                className={`text-left border rounded-lg p-3 hover:bg-muted/40 transition ${selectedId === g.gymId ? 'border-primary bg-primary/5' : 'border-border'}`}
              >
                <div className="font-medium">{g.gymName}</div>
                <div className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                  <MapPin className="h-3 w-3" /> {g.gymAddress}
                </div>
              </button>
            ))
          )}
        </div>

        <Button className="w-full" onClick={openPlanDialog} disabled={!selectedId}>
          Connetti
        </Button>
      </CardContent>

      <Dialog open={planOpen} onOpenChange={setPlanOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Inserisci i dati del tuo piano</DialogTitle>
            <DialogDescription>
              Questi dati verranno precompilati nella sezione "Il mio piano" della palestra.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-1">
              <Label>Data iscrizione *</Label>
              <Input
                type="date"
                value={plan.joinDate}
                onChange={e => setPlan(p => ({ ...p, joinDate: e.target.value }))}
              />
            </div>
            <div className="space-y-1">
              <Label>Scadenza iscrizione</Label>
              <Input
                type="date"
                value={plan.expiryDate}
                onChange={e => setPlan(p => ({ ...p, expiryDate: e.target.value }))}
              />
            </div>
            <div className="space-y-1">
              <Label className="flex items-center gap-1">
                <FileText className="h-3 w-3" /> Scadenza certificato medico
              </Label>
              <Input
                type="date"
                value={plan.certificateExpiryDate}
                onChange={e => setPlan(p => ({ ...p, certificateExpiryDate: e.target.value }))}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setPlanOpen(false)}>Annulla</Button>
            <Button onClick={handleConfirm} disabled={!plan.joinDate}>
              Conferma e connetti
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
