import Papa from "papaparse";
import type { MktPersona } from "../types";

export interface CsvRow {
  scheduled_date?: string;
  scheduled_time?: string;
  persona?: string;
  funnel_stage?: string;
  content_format?: string;
  hook?: string;
  post_copy?: string;
  cta?: string;
  media_prompt?: string;
}

export interface ParsedRow extends CsvRow {
  persona_id: string | null;
  _personaMatched: boolean;
}

export function parseCsv(text: string): CsvRow[] {
  const result = Papa.parse<CsvRow>(text, {
    header: true,
    skipEmptyLines: true,
    transformHeader: (h) => h.trim().toLowerCase().replace(/\s+/g, "_"),
  });
  return (result.data ?? []).filter(Boolean);
}

export function matchPersonas(rows: CsvRow[], personas: MktPersona[]): ParsedRow[] {
  const byName = new Map(personas.map((p) => [p.name.toLowerCase().trim(), p.id]));
  return rows.map((r) => {
    const key = (r.persona ?? "").toLowerCase().trim();
    const id = key ? byName.get(key) ?? null : null;
    return { ...r, persona_id: id, _personaMatched: !key || !!id };
  });
}

export const CSV_TEMPLATE =
  "scheduled_date,scheduled_time,persona,funnel_stage,content_format,hook,post_copy,cta,media_prompt\n" +
  "2026-06-15,07:00,Giulia,Awareness,Reel,\"Hook forte qui\",\"Testo del post\",\"Scrivimi in DM\",\"PT in palestra mostra app\"\n";
