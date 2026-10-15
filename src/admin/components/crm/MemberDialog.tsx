import { useState } from "react";
import { toast } from "sonner";
import { it } from "../../i18n/it";
import {
  CONTRACT_STATUSES,
  CrmMember,
  PENALTY_CARDS,
  SeatTakenError,
  seatTier,
  useDeleteMember,
  useSaveMember,
} from "../../hooks/useCrmMembers";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { cn } from "@/lib/utils";

const t = it.crm.members;
export const eur = (n: number) =>
  new Intl.NumberFormat("it-IT", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n);

export default function MemberDialog({ initial, onClose }: { initial: Partial<CrmMember>; onClose: () => void }) {
  const [f, setF] = useState<Partial<CrmMember>>(initial);
  const [seatError, setSeatError] = useState<string | null>(null);
  const [confirmDel, setConfirmDel] = useState(false);
  const save = useSaveMember();
  const del = useDeleteMember();
  const set = (k: keyof CrmMember, v: any) => setF((p) => ({ ...p, [k]: v }));
  const txt = (k: keyof CrmMember) => ({
    value: (f[k] as any) ?? "",
    onChange: (e: any) => set(k, e.target.value === "" ? null : e.target.value),
  });

  const seat = Number(f.seat_number);
  const tierInfo = Number.isInteger(seat) ? seatTier(seat) : null;

  const submit = () => {
    if (!f.full_name?.trim()) return;
    if (!tierInfo) return setSeatError(t.seatRange);
    setSeatError(null);
    const payload: any = {
      ...f,
      full_name: f.full_name.trim(),
      seat_number: seat,
      penalty_month: f.penalty_month == null || (f.penalty_month as any) === "" ? null : Number(f.penalty_month),
    };
    save.mutate(payload, {
      onSuccess: () => {
        toast.success(t.saved);
        onClose();
      },
      onError: (e) => {
        if (e instanceof SeatTakenError) setSeatError(t.seatTaken(seat));
        else toast.error(t.saveError);
      },
    });
  };

  return (
    <Dialog open onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{f.id ? t.editMember : t.newMember}</DialogTitle>
        </DialogHeader>
        {f.opportunity_id && <p className="text-xs text-muted-foreground -mt-2">{t.fromOpportunity}</p>}
        <div className="grid grid-cols-2 gap-3">
          <Field label={`${t.fields.seat_number} *`}>
            <Input
              type="number"
              min={1}
              max={250}
              value={f.seat_number ?? ""}
              onChange={(e) => {
                setSeatError(null);
                set("seat_number", e.target.value === "" ? null : Number(e.target.value));
              }}
            />
          </Field>
          <Field label={t.fields.tier}>
            <p className={cn("h-10 flex items-center text-sm", tierInfo ? "text-muted-foreground" : "text-destructive")}>
              {tierInfo ? t.derived(tierInfo.tier, eur(tierInfo.price)) : t.seatRange}
            </p>
          </Field>
          {seatError && <p className="col-span-2 text-sm text-destructive -mt-1">{seatError}</p>}
          <Field label={`${t.fields.full_name} *`} className="col-span-2">
            <Input {...txt("full_name")} />
          </Field>
          <Field label={t.fields.email}><Input type="email" {...txt("email")} /></Field>
          <Field label={t.fields.phone}><Input {...txt("phone")} /></Field>
          <Field label={t.fields.city}><Input {...txt("city")} /></Field>
          <Field label={t.fields.contract_status}>
            <Select value={f.contract_status ?? "inviato"} onValueChange={(v) => set("contract_status", v)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {CONTRACT_STATUSES.map((s) => <SelectItem key={s} value={s}>{t.statuses[s]}</SelectItem>)}
              </SelectContent>
            </Select>
          </Field>
          <Field label={t.fields.signed_at}><Input type="date" {...txt("signed_at")} /></Field>
          <Field label={t.fields.payment_due_at}><Input type="date" {...txt("payment_due_at")} /></Field>
          <Field label={t.fields.paid_at}><Input type="date" {...txt("paid_at")} /></Field>
          <Field label={t.fields.penalty_card}>
            <Select value={f.penalty_card ?? "nessuno"} onValueChange={(v) => set("penalty_card", v)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {PENALTY_CARDS.map((c) => <SelectItem key={c} value={c}>{t.cards[c]}</SelectItem>)}
              </SelectContent>
            </Select>
          </Field>
          <Field label={t.fields.penalty_month}>
            <Input type="number" min={1} {...txt("penalty_month")} />
          </Field>
          <Field label={t.fields.platform_user_id}><Input {...txt("platform_user_id")} /></Field>
          <Field label={t.fields.platform_url}><Input {...txt("platform_url")} /></Field>
          <Field label={t.fields.notes} className="col-span-2">
            <Textarea rows={3} {...txt("notes")} />
          </Field>
        </div>
        <DialogFooter className="sm:justify-between gap-2">
          <div>
            {f.id && (
              <Button variant="destructive" onClick={() => setConfirmDel(true)}>{it.common.delete}</Button>
            )}
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose}>{it.common.cancel}</Button>
            <Button onClick={submit} disabled={!f.full_name?.trim() || save.isPending}>{it.common.save}</Button>
          </div>
        </DialogFooter>
      </DialogContent>

      <AlertDialog open={confirmDel} onOpenChange={setConfirmDel}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{it.common.delete}</AlertDialogTitle>
            <AlertDialogDescription>{t.confirmDelete}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{it.common.cancel}</AlertDialogCancel>
            <AlertDialogAction
              onClick={() =>
                del.mutate(f.id!, {
                  onSuccess: () => { toast.success(t.deleted); onClose(); },
                  onError: () => toast.error(t.saveError),
                })
              }
            >
              {it.common.delete}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Dialog>
  );
}

function Field({ label, className, children }: { label: string; className?: string; children: React.ReactNode }) {
  return (
    <div className={cn("space-y-1.5", className)}>
      <Label className="text-xs">{label}</Label>
      {children}
    </div>
  );
}
