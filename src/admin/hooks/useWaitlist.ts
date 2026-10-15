import { useQuery } from "@tanstack/react-query";
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

export function useWaitlistStats() {
  return useQuery({
    queryKey: ["mkt", "waitlist", "stats"],
    queryFn: async () => {
      const count = async (mod?: (q: any) => any) => {
        let q = sb.from("waitlist").select("id", { count: "exact", head: true });
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
