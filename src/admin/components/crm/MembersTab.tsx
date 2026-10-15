import { useMemo, useState } from "react";
import { Download, ExternalLink, Plus, Search } from "lucide-react";
import { toast } from "sonner";
import { it } from "../../i18n/it";
import {
  CONTRACT_STATUSES,
  CrmMember,
  PENALTY_CARDS,
  SEAT_CAPACITY,
  TIERS,
  lowestFreeSeat,
  useCrmMembers,
} from "../../hooks/useCrmMembers";
import { membersToCsv } from "../../lib/crmMembersCsv";
import { downloadCsv } from "../../lib/waitlistCsv";
import { eur } from "./MemberDialog";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { safeFormatDate } from "@/utils/safeFormatDate";
import { cn } from "@/lib/utils";

const t = it.crm.members;

const STATUS_CLASS: Record<string, string> = {
  inviato: "bg-secondary text-secondary-foreground",
  firmato: "bg-primary/15 text-primary border-primary/30",
  in_attesa_pagamento: "bg-amber-100 text-amber-900 border-amber-300",
  pagato: "bg-emerald-100 text-emerald-900 border-emerald-300",
  decaduto: "bg-muted text-muted-foreground line-through",
};
// Penalty cards carry their own literal colour.
const CARD_CLASS: Record<string, string> = {
  giallo: "bg-yellow-300 text-yellow-950 border-yellow-400",
  arancione: "bg-orange-500 text-white border-orange-600",
  rosso: "bg-red-600 text-white border-red-700",
  nero: "bg-neutral-900 text-white border-neutral-900",
};
const SIGNED = ["firmato", "in_attesa_pagamento", "pagato"];
const d = (v: string | null) => (v ? safeFormatDate(v, "dd/MM/yyyy", "—") : "—");

export default function MembersTab({ onOpen }: { onOpen: (m: Partial<CrmMember>) => void }) {
  const { data = [], isLoading, error } = useCrmMembers();
  const [search, setSearch] = useState("");
  const [tier, setTier] = useState("all");
  const [status, setStatus] = useState("all");
  const [card, setCard] = useState("all");

  const filtered = useMemo(() => {
    const s = search.trim().toLowerCase();
    return data.filter(
      (m) =>
        (tier === "all" || String(m.tier) === tier) &&
        (status === "all" || m.contract_status === status) &&
        (card === "all" || m.penalty_card === card) &&
        (!s || m.full_name.toLowerCase().includes(s) || (m.email ?? "").toLowerCase().includes(s))
    );
  }, [data, search, tier, status, card]);

  const signed = data.filter((m) => SIGNED.includes(m.contract_status)).reduce((s, m) => s + Number(m.price_eur), 0);
  const paid = data.filter((m) => m.contract_status === "pagato").reduce((s, m) => s + Number(m.price_eur), 0);

  const onNew = () => {
    const seat = lowestFreeSeat(data);
    if (seat == null) return toast.error(t.programmeFull);
    onOpen({ seat_number: seat, contract_status: "inviato", penalty_card: "nessuno" });
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3">
        {TIERS.map((ti) => {
          const cap = ti.to - ti.from + 1;
          const taken = data.filter((m) => m.tier === ti.tier).length;
          return (
            <Card key={ti.tier}>
              <CardContent className="p-4 space-y-2">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{t.tier(ti.tier)}</span>
                  <span>{eur(ti.price)}</span>
                </div>
                <p className="text-lg font-semibold">{t.seatsOf(taken, cap)}</p>
                <Progress value={(taken / cap) * 100} className="h-1.5" />
              </CardContent>
            </Card>
          );
        })}
        <Card>
          <CardContent className="p-4 space-y-1">
            <p className="text-xs text-muted-foreground">{t.signedTotal}</p>
            <p className="text-lg font-semibold">{eur(signed)}</p>
            <p className="text-[11px] text-muted-foreground">{t.signedHint}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 space-y-1">
            <p className="text-xs text-muted-foreground">{t.paidTotal}</p>
            <p className="text-lg font-semibold">{eur(paid)}</p>
            <p className="text-[11px] text-muted-foreground">{t.paidHint}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 space-y-2">
            <p className="text-xs text-muted-foreground">{t.programme}</p>
            <p className="text-lg font-semibold">{t.seatsOf(data.length, SEAT_CAPACITY)}</p>
            <Progress value={(data.length / SEAT_CAPACITY) * 100} className="h-1.5" />
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="relative w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input className="pl-8" placeholder={t.search} value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <Select value={tier} onValueChange={setTier}>
          <SelectTrigger className="w-36"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t.allTiers}</SelectItem>
            {TIERS.map((ti) => <SelectItem key={ti.tier} value={String(ti.tier)}>{t.tier(ti.tier)}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger className="w-48"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t.allStatuses}</SelectItem>
            {CONTRACT_STATUSES.map((s) => <SelectItem key={s} value={s}>{t.statuses[s]}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={card} onValueChange={setCard}>
          <SelectTrigger className="w-44"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t.allCards}</SelectItem>
            {PENALTY_CARDS.map((c) => <SelectItem key={c} value={c}>{t.cards[c]}</SelectItem>)}
          </SelectContent>
        </Select>
        <div className="flex-1" />
        <Button
          variant="outline"
          disabled={filtered.length === 0}
          onClick={() =>
            downloadCsv(`pt-premium-membri-${safeFormatDate(new Date(), "yyyy-MM-dd")}.csv`, membersToCsv(filtered))
          }
        >
          <Download className="h-4 w-4 mr-2" />
          {t.export}
        </Button>
        <Button onClick={onNew}>
          <Plus className="h-4 w-4 mr-1" />
          {t.newMember}
        </Button>
      </div>

      <Card className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>#</TableHead>
              <TableHead>{t.fields.tier}</TableHead>
              <TableHead>{t.fields.full_name}</TableHead>
              <TableHead>{t.fields.email}</TableHead>
              <TableHead>{t.fields.phone}</TableHead>
              <TableHead>{t.fields.city}</TableHead>
              <TableHead>{t.fields.contract_status}</TableHead>
              <TableHead>{t.fields.signed_at}</TableHead>
              <TableHead>{t.fields.payment_due_at}</TableHead>
              <TableHead>{t.fields.paid_at}</TableHead>
              <TableHead>{t.fields.penalty_card}</TableHead>
              <TableHead>{t.fields.platform_url}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {error ? (
              <TableRow><TableCell colSpan={12} className="text-destructive">{t.error}</TableCell></TableRow>
            ) : isLoading ? (
              <TableRow><TableCell colSpan={12} className="text-muted-foreground">{it.common.loading}</TableCell></TableRow>
            ) : filtered.length === 0 ? (
              <TableRow><TableCell colSpan={12} className="text-muted-foreground">{t.empty}</TableCell></TableRow>
            ) : (
              filtered.map((m) => (
                <TableRow key={m.id} className="cursor-pointer" onClick={() => onOpen(m)}>
                  <TableCell className="font-mono font-semibold">{m.seat_number}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="whitespace-nowrap">
                      {t.tier(m.tier)} · {eur(Number(m.price_eur))}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-medium whitespace-nowrap">{m.full_name}</TableCell>
                  <TableCell>{m.email || "—"}</TableCell>
                  <TableCell>{m.phone || "—"}</TableCell>
                  <TableCell>{m.city || "—"}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={cn("whitespace-nowrap", STATUS_CLASS[m.contract_status])}>
                      {(t.statuses as any)[m.contract_status] ?? m.contract_status}
                    </Badge>
                  </TableCell>
                  <TableCell className="whitespace-nowrap">{d(m.signed_at)}</TableCell>
                  <TableCell className="whitespace-nowrap">{d(m.payment_due_at)}</TableCell>
                  <TableCell className="whitespace-nowrap">{d(m.paid_at)}</TableCell>
                  <TableCell>
                    {m.penalty_card === "nessuno" ? (
                      "—"
                    ) : (
                      <Badge variant="outline" className={CARD_CLASS[m.penalty_card]}>
                        {(t.cards as any)[m.penalty_card]}
                        {m.penalty_month != null && ` · M${m.penalty_month}`}
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    {m.platform_url ? (
                      <a
                        href={m.platform_url}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-1 text-primary hover:underline"
                      >
                        {t.linked} <ExternalLink className="h-3 w-3" />
                      </a>
                    ) : (
                      "—"
                    )}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
