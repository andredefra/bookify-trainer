import { describe, expect, test } from "bun:test";
import { applyTextBatches, buildTextPreview, defaultPhaseIndex } from "../src/admin/lib/contentTextUpdate";
import { parseCsv } from "../src/admin/lib/csv";
import type { MktContent, MktPlanPhase } from "../src/admin/types";

const phases = [1, 2, 3].map((index) => ({ id: `phase-${index}`, phase_index: index, label: `Fase ${index}` } as MktPlanPhase));
const post = (id: string, phase: number, sequence: number) => ({ id, plan_phase_id: `phase-${phase}`, sequence_number: sequence, post_copy: "Prima", cta: "CTA", media_prompt: "Media", status: "Posted", media_urls: ["bucket://keep"], persona_id: "keep-persona" } as MktContent);

describe("Aggiornamento testi tracker", () => {
  test("maps only Phase 1/2/3 by default and ignores India and strategy sheets", () => {
    expect(["Phase 1", "Phase 2", "Phase 3"].map(defaultPhaseIndex)).toEqual([1, 2, 3]);
    for (const name of ["Strategia", "Strategia India", "Phase 1 — India", "Note India"]) expect(defaultPhaseIndex(name)).toBeNull();
  });
  test("matches phase plus # and updates only the three changed text fields", () => {
    const posts = [post("one", 1, 1), post("two", 2, 1)];
    const result = buildTextPreview([{ name: "Phase 2", rows: parseCsv('#,Post Copy / Text,CTA,Media Prompt,Status,Media Links\n1,Dopo,Nuova CTA,Nuovo media,Draft,overwrite') }], { "Phase 2": "phase-2" }, phases, posts);
    expect(result.changes).toHaveLength(1);
    expect(result.changes[0].id).toBe("two");
    expect(result.changes[0].patch).toEqual({ post_copy: "Dopo", cta: "Nuova CTA", media_prompt: "Nuovo media" });
    expect(posts[1].status).toBe("Posted");
    expect(posts[1].media_urls).toEqual(["bucket://keep"]);
  });
  test("counts unchanged and unmatched rows, never inventing a sequence for missing #", () => {
    const result = buildTextPreview([{ name: "CSV", rows: parseCsv('#,Post Copy / Text,CTA,Media Prompt\n1,Prima,CTA,Media\n99,Nessuno,,\n,Senza numero,,') }], { CSV: "phase-1" }, phases, [post("one", 1, 1)]);
    expect(result.unchanged).toBe(1);
    expect(result.notFound).toHaveLength(2);
    expect(result.changes).toEqual([]);
  });
  test("respects editable mapping, absent columns and explicit blank cells", () => {
    const result = buildTextPreview([{ name: "Phase 1", rows: parseCsv('#,CTA\n1,') }], { "Phase 1": "phase-3" }, phases, [post("three", 3, 1)]);
    expect(result.changes[0].id).toBe("three");
    expect(result.changes[0].patch).toEqual({ cta: null });
    expect(result.changes[0].before).toEqual({ post_copy: "Prima", cta: "CTA", media_prompt: "Media" });
  });
  test("applies batches of at most 20 and reports partial failures and progress", async () => {
    const sample = buildTextPreview([{ name: "CSV", rows: parseCsv('#,CTA\n1,Dopo') }], { CSV: "phase-1" }, phases, [post("one", 1, 1)]).changes[0];
    const changes = Array.from({ length: 45 }, (_, i) => ({ ...sample, id: String(i) }));
    let active = 0; let maximum = 0; const progress: number[] = [];
    const result = await applyTextBatches(changes, async (change) => {
      active++; maximum = Math.max(maximum, active);
      await new Promise((resolve) => setTimeout(resolve, 1)); active--;
      if (change.id === "25") throw new Error("errore");
    }, (value) => progress.push(value));
    expect(maximum).toBe(20);
    expect(result.updated).toBe(44);
    expect(result.failures).toHaveLength(1);
    expect(progress).toHaveLength(45);
    expect(progress[44]).toBe(45);
  });
});