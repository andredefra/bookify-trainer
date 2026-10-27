import { parseCsv, matchPersonas } from "./csv";
import type { MktContent, MktPlanPhase } from "../types";

export const TEXT_FIELDS = ["post_copy", "cta", "media_prompt"] as const;
export type TextField = typeof TEXT_FIELDS[number];
export type TextValues = Pick<MktContent, TextField>;
export interface TrackerSheet { name: string; rows: ReturnType<typeof parseCsv> }
export interface TextChange {
  id: string;
  phaseId: string;
  phase: string;
  sequence: number;
  before: TextValues;
  patch: Partial<TextValues>;
}
export interface TextPreview {
  changes: TextChange[];
  unchanged: number;
  notFound: { phase: string; sequence: string; reason: string }[];
}

export function defaultPhaseIndex(sheet: string): number | null {
  const match = /^Phase ([123])$/i.exec(sheet.trim());
  return match ? Number(match[1]) : null;
}

export function buildTextPreview(sheets: TrackerSheet[], mapping: Record<string, string>, phases: MktPlanPhase[], posts: MktContent[]): TextPreview {
  const result: TextPreview = { changes: [], unchanged: 0, notFound: [] };
  const seen = new Set<string>();
  for (const sheet of sheets) {
    const phase = phases.find((p) => p.id === mapping[sheet.name]);
    if (!phase) continue;
    const label = phase.label ?? `Fase ${phase.phase_index}`;
    const parsed = matchPersonas(sheet.rows, []);
    sheet.rows.forEach((row, index) => {
      const raw = row["#"]?.trim() ?? "";
      const sequence = Number(raw);
      const matches = raw && Number.isInteger(sequence) && sequence > 0
        ? posts.filter((p) => p.plan_phase_id === phase.id && p.sequence_number === sequence) : [];
      const post = matches[0];
      if (!post || matches.length !== 1 || seen.has(post.id)) {
        result.notFound.push({ phase: label, sequence: raw || "—", reason: matches.length > 1 || (post && seen.has(post.id)) ? "Corrispondenza duplicata: riga saltata" : "non trovato" });
        return;
      }
      seen.add(post.id);
      const patch: Partial<TextValues> = {};
      for (const field of TEXT_FIELDS) {
        const keys = field === "post_copy" ? ["post_copy_/_text", "post_copy_text", "post_copy"] : [field];
        // An absent column must never erase existing text. An explicitly empty cell clears it.
        if (keys.some((key) => Object.prototype.hasOwnProperty.call(row, key)) && (post[field] ?? "") !== (parsed[index][field] ?? "")) {
          patch[field] = parsed[index][field];
        }
      }
      if (!Object.keys(patch).length) { result.unchanged++; return; }
      result.changes.push({ id: post.id, phaseId: phase.id, phase: label, sequence, before: { post_copy: post.post_copy, cta: post.cta, media_prompt: post.media_prompt }, patch });
    });
  }
  return result;
}

export async function applyTextBatches(changes: TextChange[], update: (change: TextChange) => Promise<void>, progress: (completed: number) => void) {
  let completed = 0;
  const failures: string[] = [];
  for (let offset = 0; offset < changes.length; offset += 20) {
    await Promise.all(changes.slice(offset, offset + 20).map(async (change) => {
      try { await update(change); } catch (error) {
        failures.push(`${change.phase} #${change.sequence}: ${error instanceof Error ? error.message : "Aggiornamento non riuscito"}`);
      } finally { completed++; progress(completed); }
    }));
  }
  return { updated: changes.length - failures.length, failures };
}