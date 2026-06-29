import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, FileText, Save, Pencil } from "lucide-react";
import { toast } from "sonner";

export interface MembershipPlan {
  joinDate: string;
  expiryDate: string;
  certificateExpiryDate: string;
}

interface MembershipPlanCardProps {
  value: MembershipPlan;
  onSave: (v: MembershipPlan) => void;
}

function statusFor(dateStr: string): { label: string; variant: 'default' | 'secondary' | 'destructive' } {
  if (!dateStr) return { label: "Da impostare", variant: "secondary" };
  const d = new Date(dateStr);
  const now = new Date();
  const days = Math.ceil((d.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  if (days < 0) return { label: "Scaduto", variant: "destructive" };
  if (days <= 30) return { label: `In scadenza (${days}gg)`, variant: "destructive" };
  return { label: `Attivo (${days}gg)`, variant: "default" };
}

export function MembershipPlanCard({ value, onSave }: MembershipPlanCardProps) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState<MembershipPlan>(value);

  useEffect(() => setDraft(value), [value]);

  const handleSave = () => {
    onSave(draft);
    setEditing(false);
    toast.success("Piano aggiornato");
  };

  const subStatus = statusFor(value.expiryDate);
  const certStatus = statusFor(value.certificateExpiryDate);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <CalendarDays className="h-5 w-5" /> Il mio piano
            </CardTitle>
            <CardDescription>Iscrizione, scadenza e certificato medico</CardDescription>
          </div>
          {!editing ? (
            <Button variant="outline" size="sm" onClick={() => setEditing(true)}>
              <Pencil className="h-4 w-4 mr-2" /> Modifica
            </Button>
          ) : (
            <Button size="sm" onClick={handleSave}>
              <Save className="h-4 w-4 mr-2" /> Salva
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="space-y-1">
            <Label>Data iscrizione</Label>
            <Input
              type="date"
              value={draft.joinDate}
              disabled={!editing}
              onChange={e => setDraft({ ...draft, joinDate: e.target.value })}
            />
          </div>
          <div className="space-y-1">
            <Label>Scadenza iscrizione</Label>
            <Input
              type="date"
              value={draft.expiryDate}
              disabled={!editing}
              onChange={e => setDraft({ ...draft, expiryDate: e.target.value })}
            />
            {!editing && value.expiryDate && (
              <Badge variant={subStatus.variant} className="mt-1">{subStatus.label}</Badge>
            )}
          </div>
          <div className="space-y-1">
            <Label className="flex items-center gap-1">
              <FileText className="h-3 w-3" /> Scadenza certificato medico
            </Label>
            <Input
              type="date"
              value={draft.certificateExpiryDate}
              disabled={!editing}
              onChange={e => setDraft({ ...draft, certificateExpiryDate: e.target.value })}
            />
            {!editing && value.certificateExpiryDate && (
              <Badge variant={certStatus.variant} className="mt-1">{certStatus.label}</Badge>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
