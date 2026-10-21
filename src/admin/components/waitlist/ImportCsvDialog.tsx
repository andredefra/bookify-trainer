import { useRef, useState } from "react";
import Papa from "papaparse";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Upload } from "lucide-react";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { it } from "../../i18n/it";
import { importWaitlistRows, type NewWaitlistEntry, type WaitlistAudience } from "../../hooks/useWaitlist";

const t = it.waitlist;

type TargetField = "full_name" | "email" | "phone" | "city" | "language" | "marketing_consent" | "created_at";
const TARGETS: TargetField[] = ["full_name", "email", "phone", "city", "language", "marketing_consent", "created_at"];
const NONE = "__none__";

const HEADER_GUESSES: Record<TargetField, RegExp> = {
  full_name: /^(nome|name|full.?name|nome e cognome)/i,
  email: /e-?mail|posta/i,
  phone: /telefono|phone|cellulare|mobile|^tel/i,
  city: /citt|city/i,
  language: /lingua|language|^lang/i,
  marketing_consent: /consenso|consent|marketing/i,
  created_at: /timestamp|informazioni cronologiche|data|date|created/i,
};

function guessMapping(headers: string[]): Record<TargetField, string> {
  const mapping = {} as Record<TargetField, string>;
  const used = new Set<string>();
  for (const field of TARGETS) {
    const hit = headers.find((h) => !used.has(h) && HEADER_GUESSES[field].test(h.trim()));
    mapping[field] = hit ?? NONE;
    if (hit) used.add(hit);
  }
  return mapping;
}

const parseConsent = (v: string) => /^(s[iì]|yes|true|1|y)$/i.test(v.trim());

const parseDate = (v: string): string | undefined => {
  const d = new Date(v.trim());
  return Number.isNaN(d.getTime()) ? undefined : d.toISOString();
};

const parseLang = (v: string): string | null => {
  const s = v.trim().toLowerCase();
  return ["it", "en", "in"].includes(s) ? s : null;
};

export default function ImportCsvDialog({ audience }: { audience: WaitlistAudience }) {
  const qc = useQueryClient();
  const [open, setOpen] = useState(false);
  const [headers, setHeaders] = useState<string[]>([]);
  const [rows, setRows] = useState<Record<string, string>[]>([]);
  const [mapping, setMapping] = useState<Record<TargetField, string> | null>(null);
  const [importing, setImporting] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const reset = () => {
    setHeaders([]);
    setRows([]);
    setMapping(null);
    if (fileRef.current) fileRef.current.value = "";
  };

  const onFile = (file: File) => {
    Papa.parse<Record<string, string>>(file, {
      header: true,
      skipEmptyLines: true,
      complete: (res) => {
        const hs = (res.meta.fields ?? []).filter(Boolean);
        if (!hs.length) {
          toast.error(t.importError);
          return;
        }
        setHeaders(hs);
        setRows(res.data);
        setMapping(guessMapping(hs));
      },
      error: () => toast.error(t.importError),
    });
  };

  const onImport = async () => {
    if (!mapping) return;
    setImporting(true);
    try {
      const get = (r: Record<string, string>, f: TargetField) =>
        mapping[f] === NONE ? "" : (r[mapping[f]] ?? "").trim();
      const entries: NewWaitlistEntry[] = rows.map((r) => ({
        full_name: get(r, "full_name") || get(r, "email"),
        email: get(r, "email"),
        phone: get(r, "phone") || null,
        city: get(r, "city") || null,
        language: parseLang(get(r, "language")),
        marketing_consent: parseConsent(get(r, "marketing_consent")),
        created_at: parseDate(get(r, "created_at")),
        trains_with_pt: null,
      }));
      const { imported, skipped } = await importWaitlistRows(audience, entries);
      toast.success(t.importResult(imported, skipped));
      qc.invalidateQueries({ queryKey: ["mkt", "waitlist"] });
      setOpen(false);
      reset();
    } catch {
      toast.error(t.importError);
    } finally {
      setImporting(false);
    }
  };

  const preview = rows.slice(0, 5);

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        setOpen(v);
        if (!v) reset();
      }}
    >
      <DialogTrigger asChild>
        <Button variant="outline">
          <Upload className="h-4 w-4 mr-2" />
          {t.importCsv}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{t.importTitle}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <input
            ref={fileRef}
            type="file"
            accept=".csv,text/csv"
            className="text-sm"
            onChange={(e) => e.target.files?.[0] && onFile(e.target.files[0])}
          />
          {mapping && (
            <>
              <div>
                <p className="text-sm font-medium mb-2">{t.importMapping}</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {TARGETS.map((f) => (
                    <div key={f}>
                      <label className="text-xs text-muted-foreground">{t.importFields[f]}</label>
                      <Select
                        value={mapping[f]}
                        onValueChange={(v) => setMapping({ ...mapping, [f]: v })}
                      >
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value={NONE}>—</SelectItem>
                          {headers.map((h) => (
                            <SelectItem key={h} value={h}>{h}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm font-medium mb-2">{t.importPreview}</p>
                <div className="border rounded-md overflow-auto max-h-56">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        {TARGETS.filter((f) => mapping[f] !== NONE).map((f) => (
                          <TableHead key={f}>{t.importFields[f]}</TableHead>
                        ))}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {preview.map((r, i) => (
                        <TableRow key={i}>
                          {TARGETS.filter((f) => mapping[f] !== NONE).map((f) => (
                            <TableCell key={f} className="max-w-40 truncate">
                              {r[mapping[f]] ?? ""}
                            </TableCell>
                          ))}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                <p className="text-xs text-muted-foreground mt-1">{t.importRows(rows.length)}</p>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="ghost" onClick={() => setOpen(false)}>{it.common.cancel}</Button>
                <Button onClick={onImport} disabled={importing || mapping.email === NONE}>
                  {importing ? it.common.loading : t.importRun}
                </Button>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
