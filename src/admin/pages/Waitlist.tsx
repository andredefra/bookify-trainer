import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Download } from "lucide-react";
import { useDebounce } from "@/hooks/useDebounce";
import { safeFormatDate } from "@/utils/safeFormatDate";
import { it } from "../i18n/it";
import { useWaitlistPage, useWaitlistStats, fetchAllWaitlist, WAITLIST_PAGE_SIZE, type WaitlistFilters } from "../hooks/useWaitlist";
import { waitlistToCsv, downloadCsv } from "../lib/waitlistCsv";

const t = it.waitlist;

export default function Waitlist() {
  const [search, setSearch] = useState("");
  const [consent, setConsent] = useState<"all" | "yes">("all");
  const [audience, setAudience] = useState<WaitlistFilters["audience"]>("all");
  const [page, setPage] = useState(0);
  const [exporting, setExporting] = useState(false);
  const debounced = useDebounce(search, 300);

  const filters: WaitlistFilters = { search: debounced, consentOnly: consent === "yes", audience };
  useEffect(() => setPage(0), [debounced, consent, audience]);

  const { data: stats } = useWaitlistStats();
  const { data, isLoading, error } = useWaitlistPage(filters, page);
  const rows = data?.rows ?? [];
  const totalFiltered = data?.count ?? 0;
  const pages = Math.max(1, Math.ceil(totalFiltered / WAITLIST_PAGE_SIZE));

  const onExport = async () => {
    setExporting(true);
    try {
      const all = await fetchAllWaitlist(filters);
      downloadCsv(`waitlist-${safeFormatDate(new Date(), "yyyy-MM-dd")}.csv`, waitlistToCsv(all));
    } finally {
      setExporting(false);
    }
  };

  const counters = [
    { label: t.total, value: stats?.total },
    { label: t.consented, value: stats?.consent },
    { label: t.last7, value: stats?.d7 },
    { label: t.last30, value: stats?.d30 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">{t.title}</h1>
        <p className="text-sm text-muted-foreground">{t.subtitle}</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {counters.map((c) => (
          <Card key={c.label}>
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground">{c.label}</p>
              <p className="text-2xl font-semibold">{c.value ?? "—"}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Input
          placeholder={t.search}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-xs"
        />
        <Select value={consent} onValueChange={(v) => setConsent(v as any)}>
          <SelectTrigger className="w-48"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t.consentAll}</SelectItem>
            <SelectItem value="yes">{t.consentOnly}</SelectItem>
          </SelectContent>
        </Select>
        <Select value={audience} onValueChange={(v) => setAudience(v as any)}>
          <SelectTrigger className="w-44"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t.audienceAll}</SelectItem>
            <SelectItem value="user">{t.audienceUser}</SelectItem>
            <SelectItem value="trainer">{t.audienceTrainer}</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" className="ml-auto" onClick={onExport} disabled={exporting || totalFiltered === 0}>
          <Download className="h-4 w-4 mr-2" />
          {exporting ? it.common.loading : t.export}
        </Button>
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t.cols.date}</TableHead>
              <TableHead>{t.cols.name}</TableHead>
              <TableHead>{t.cols.email}</TableHead>
              <TableHead>{t.cols.phone}</TableHead>
              <TableHead>{t.cols.city}</TableHead>
              <TableHead>{t.cols.source}</TableHead>
              <TableHead>{t.cols.language}</TableHead>
              <TableHead>{t.cols.trains}</TableHead>
              <TableHead>{t.cols.consent}</TableHead>
              <TableHead>{t.cols.campaign}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {error ? (
              <TableRow><TableCell colSpan={10} className="text-destructive">{t.error}</TableCell></TableRow>
            ) : isLoading ? (
              <TableRow><TableCell colSpan={10} className="text-muted-foreground">{it.common.loading}</TableCell></TableRow>
            ) : rows.length === 0 ? (
              <TableRow><TableCell colSpan={10} className="text-muted-foreground">{it.common.empty}</TableCell></TableRow>
            ) : (
              rows.map((r) => (
                <TableRow key={r.id}>
                  <TableCell className="whitespace-nowrap">{safeFormatDate(r.created_at, "dd/MM/yyyy HH:mm", "—")}</TableCell>
                  <TableCell>{r.full_name}</TableCell>
                  <TableCell>{r.email}</TableCell>
                  <TableCell>{r.phone || "—"}</TableCell>
                  <TableCell>{r.city || "—"}</TableCell>
                  <TableCell>{r.source_page || "—"}</TableCell>
                  <TableCell className="uppercase">{r.language || "—"}</TableCell>
                  <TableCell>
                    {r.trains_with_pt === "alone" ? t.alone : r.trains_with_pt === "with_pt" ? t.withPt : "—"}
                  </TableCell>
                  <TableCell>
                    <Badge variant={r.marketing_consent ? "default" : "secondary"}>
                      {r.marketing_consent ? t.yes : t.no}
                    </Badge>
                  </TableCell>
                  <TableCell>{r.utm_campaign || "—"}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Card>

      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>{t.pageOf(page + 1, pages, totalFiltered)}</span>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" disabled={page === 0} onClick={() => setPage((p) => p - 1)}>{t.prev}</Button>
          <Button variant="outline" size="sm" disabled={page + 1 >= pages} onClick={() => setPage((p) => p + 1)}>{t.next}</Button>
        </div>
      </div>
    </div>
  );
}
