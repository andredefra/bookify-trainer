import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { sb } from "../lib/sb";
import type { WaitlistRow } from "../lib/waitlistCsv";

export interface WaitlistFilters {
  search: string;
  consentOnly: boolean;
  audience: "all" | "user" | "trainer";
}

export const WAITLIST_PAGE_SIZE = 50;
const COLS =
  "id,created_at,full_name,email,phone,city,source_page,language,trains_with_pt,marketing_consent,utm_campaign,audience";

function applyFilters(q: any, f: WaitlistFilters) {
  const s = f.search.trim().replace(/[%,()]/g, " ");
  if (s) q = q.or(`full_name.ilike.%${s}%,email.ilike.%${s}%`);
  if (f.consentOnly) q = q.eq("marketing_consent", true);
  if (f.audience !== "all") q = q.eq("audience", f.audience);
  return q;
}

export function useWaitlistStats(audience: WaitlistFilters["audience"] = "all") {
  return useQuery({
    queryKey: ["mkt", "waitlist", "stats", audience],
    queryFn: async () => {
      const count = async (mod?: (q: any) => any) => {
        let q = sb.from("waitlist").select("id", { count: "exact", head: true });
        if (audience !== "all") q = q.eq("audience", audience);
        if (mod) q = mod(q);
        const { count: c, error } = await q;
        if (error) throw error;
        return c ?? 0;
      };
      const ago = (d: number) => new Date(Date.now() - d * 86400000).toISOString();
      const [total, consent, d7, d30] = await Promise.all([
        count(),
        count((q) => q.eq("marketing_consent", true)),
        count((q) => q.gte("created_at", ago(7))),
        count((q) => q.gte("created_at", ago(30))),
      ]);
      return { total, consent, d7, d30 };
    },
  });
}

export function useWaitlistPage(f: WaitlistFilters, page: number) {
  return useQuery({
    queryKey: ["mkt", "waitlist", "page", f, page],
    queryFn: async () => {
      const from = page * WAITLIST_PAGE_SIZE;
      const q = applyFilters(sb.from("waitlist").select(COLS, { count: "exact" }), f)
        .order("created_at", { ascending: false })
        .range(from, from + WAITLIST_PAGE_SIZE - 1);
      const { data, count, error } = await q;
      if (error) throw error;
      return { rows: (data ?? []) as WaitlistRow[], count: count ?? 0 };
    },
  });
}

export async function fetchAllWaitlist(f: WaitlistFilters): Promise<WaitlistRow[]> {
  const out: WaitlistRow[] = [];
  const step = 1000;
  for (let from = 0; ; from += step) {
    const { data, error } = await applyFilters(sb.from("waitlist").select(COLS), f)
      .order("created_at", { ascending: false })
      .range(from, from + step - 1);
    if (error) throw error;
    out.push(...(data ?? []));
    if (!data || data.length < step) break;
  }
  return out;
}

// ---- Manual add + CSV import ----

export type WaitlistAudience = "user" | "trainer";

export interface NewWaitlistEntry {
  full_name: string;
  email: string;
  phone?: string | null;
  city?: string | null;
  language?: string | null;
  marketing_consent: boolean;
  notes?: string | null;
  trains_with_pt?: string | null;
  created_at?: string;
}

export class DuplicateWaitlistEmailError extends Error {}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const isValidEmail = (e: string) => EMAIL_RE.test(e.trim());

async function fetchExistingEmails(audience: WaitlistAudience): Promise<Set<string>> {
  const existing = new Set<string>();
  for (let from = 0; ; from += 1000) {
    const { data, error } = await sb
      .from("waitlist")
      .select("email")
      .eq("audience", audience)
      .range(from, from + 999);
    if (error) throw error;
    (data ?? []).forEach((r: { email: string }) => existing.add(String(r.email).trim().toLowerCase()));
    if (!data || data.length < 1000) break;
  }
  return existing;
}

export function useAddWaitlistEntry(audience: WaitlistAudience) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (entry: NewWaitlistEntry) => {
      const existing = await fetchExistingEmails(audience);
      if (existing.has(entry.email.trim().toLowerCase())) throw new DuplicateWaitlistEmailError();
      const { error } = await sb.from("waitlist").insert({
        ...entry,
        email: entry.email.trim().toLowerCase(),
        audience,
        source_page: "manuale",
      });
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["mkt", "waitlist"] }),
  });
}

export async function importWaitlistRows(
  audience: WaitlistAudience,
  rows: NewWaitlistEntry[]
): Promise<{ imported: number; skipped: number }> {
  const existing = await fetchExistingEmails(audience);
  const seen = new Set<string>();
  const toInsert: Record<string, unknown>[] = [];
  let skipped = 0;
  for (const r of rows) {
    const email = (r.email ?? "").trim().toLowerCase();
    if (!isValidEmail(email) || existing.has(email) || seen.has(email)) {
      skipped++;
      continue;
    }
    seen.add(email);
    toInsert.push({ ...r, email, audience, source_page: "google-form" });
  }
  if (toInsert.length) {
    const { error } = await sb.from("waitlist").insert(toInsert);
    if (error) throw error;
  }
  return { imported: toInsert.length, skipped };
}
