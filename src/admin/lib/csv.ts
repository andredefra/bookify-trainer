import Papa from "papaparse";
import type { MktPersona } from "../types";

// Headers aligned with the team's Marketing Social Tracker Excel:
// #, Day, Social Media Channel, Tipo Format, Tipo Persona, Obiettivo,
// Fase del Funnel, Situazione, Post Copy / Text, Content type, CTA,
// Media Prompt, Media Links (Images/Videos), Status, Post Link
export interface CsvRow {
  "#"?: string;
  day?: string;
  social_media_channel?: string;
  tipo_format?: string;
  tipo_persona?: string;
  obiettivo?: string;
  fase_del_funnel?: string;
  situazione?: string;
  "post_copy_/_text"?: string;
  post_copy_text?: string;
  content_type?: string;
  cta?: string;
  media_prompt?: string;
  "media_links_(images/videos)"?: string;
  media_links?: string;
  status?: string;
  post_link?: string;
}

export interface ParsedRow {
  sequence_number: number | null;
  social_channel: string | null;
  content_format: string | null;
  persona_name: string | null;
  persona_id: string | null;
  _personaMatched: boolean;
  objective: string | null;
  funnel_stage: string | null;
  situation: string | null;
  post_copy: string | null;
  content_type: string | null;
  cta: string | null;
  media_prompt: string | null;
  media_url: string | null;
  status: string | null;
  published_link: string | null;
}

function pick(r: CsvRow, ...keys: string[]): string | null {
  for (const k of keys) {
    const v = (r as Record<string, unknown>)[k];
    if (v !== undefined && v !== null && String(v).trim() !== "") return String(v).trim();
  }
  return null;
}

export function parseCsv(text: string): CsvRow[] {
  const result = Papa.parse<CsvRow>(text, {
    header: true,
    skipEmptyLines: true,
    transformHeader: (h) => h.trim().toLowerCase().replace(/\s+/g, "_"),
  });
  return (result.data ?? []).filter((r) => Object.values(r).some((v) => v != null && String(v).trim() !== ""));
}

export function matchPersonas(rows: CsvRow[], personas: MktPersona[]): ParsedRow[] {
  const byName = new Map(personas.map((p) => [p.name.toLowerCase().trim(), p.id]));
  return rows.map((r, idx) => {
    const personaName = pick(r, "tipo_persona");
    const personaKey = personaName?.toLowerCase().trim() ?? "";
    const personaId = personaKey ? byName.get(personaKey) ?? null : null;
    const seqRaw = pick(r, "#", "n", "num", "sequence");
    const seq = seqRaw ? Number(seqRaw) : idx + 1;
    return {
      sequence_number: Number.isFinite(seq) ? Math.trunc(seq) : idx + 1,
      social_channel: pick(r, "social_media_channel") ?? "Instagram",
      content_format: pick(r, "tipo_format", "format"),
      persona_name: personaName,
      persona_id: personaId,
      _personaMatched: !personaName || !!personaId,
      objective: pick(r, "obiettivo"),
      funnel_stage: pick(r, "fase_del_funnel", "funnel"),
      situation: pick(r, "situazione"),
      post_copy: pick(r, "post_copy_/_text", "post_copy_text", "post_copy"),
      content_type: pick(r, "content_type"),
      cta: pick(r, "cta"),
      media_prompt: pick(r, "media_prompt"),
      media_url: pick(r, "media_links_(images/videos)", "media_links", "media_url"),
      status: pick(r, "status"),
      published_link: pick(r, "post_link", "published_link"),
    };
  });
}

export const CSV_TEMPLATE =
  "#,Day,Social Media Channel,Tipo Format,Tipo Persona,Obiettivo,Fase del Funnel,Situazione,Post Copy / Text,Content type,CTA,Media Prompt,Media Links (Images/Videos),Status,Post Link\n" +
  "1,1,Instagram,Reel,Giulia,Brand awareness,Awareness,Lezione di gruppo,\"Testo del post\",Video step-by-step,\"Scrivimi in DM\",\"PT in palestra mostra app\",,Draft,\n" +
  "2,2,Instagram,Carosello,Matteo,Lead gen,Consideration,Coach analitico,\"Testo\",Carosello dati,\"Prova gratis\",\"Schermata analytics\",,Draft,\n";
