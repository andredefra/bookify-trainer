import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { sb } from "../lib/sb";

export const SEAT_CAPACITY = 250;
export const TIERS = [
  { tier: 1, from: 1, to: 25, price: 250 },
  { tier: 2, from: 26, to: 50, price: 300 },
  { tier: 3, from: 51, to: 250, price: 350 },
] as const;
export const CONTRACT_STATUSES = ["inviato", "firmato", "in_attesa_pagamento", "pagato", "decaduto"] as const;
export const PENALTY_CARDS = ["nessuno", "giallo", "arancione", "rosso", "nero"] as const;

/** Display-only preview; the database computes the stored tier/price. */
export function seatTier(seat: number) {
  return TIERS.find((t) => seat >= t.from && seat <= t.to) ?? null;
}

export interface CrmMember {
  id: string;
  created_at: string;
  updated_at: string;
  opportunity_id: string | null;
  seat_number: number;
  tier: number;
  price_eur: number;
  full_name: string;
  email: string | null;
  phone: string | null;
  city: string | null;
  contract_status: string;
  signed_at: string | null;
  payment_due_at: string | null;
  paid_at: string | null;
  penalty_card: string;
  penalty_month: number | null;
  platform_user_id: string | null;
  platform_url: string | null;
  notes: string | null;
}

export const MEMBERS_KEY = ["mkt", "crm", "members"];

export function useCrmMembers() {
  return useQuery({
    queryKey: MEMBERS_KEY,
    queryFn: async () => {
      const { data, error } = await sb.from("mkt_crm_members").select("*").order("seat_number");
      if (error) throw error;
      return (data ?? []) as CrmMember[];
    },
  });
}

export function lowestFreeSeat(members: Pick<CrmMember, "seat_number">[]): number | null {
  const taken = new Set(members.map((m) => m.seat_number));
  for (let i = 1; i <= SEAT_CAPACITY; i++) if (!taken.has(i)) return i;
  return null;
}

export class SeatTakenError extends Error {}

export function useSaveMember() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (m: Partial<CrmMember>) => {
      // tier and price_eur are generated columns: never send them.
      const { id, created_at, updated_at, tier, price_eur, ...rest } = m as any;
      const res = id
        ? await sb.from("mkt_crm_members").update(rest).eq("id", id)
        : await sb.from("mkt_crm_members").insert(rest);
      if (res.error) {
        if (res.error.code === "23505") throw new SeatTakenError();
        throw res.error;
      }
    },
    onSettled: () => qc.invalidateQueries({ queryKey: MEMBERS_KEY }),
  });
}

export function useDeleteMember() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await sb.from("mkt_crm_members").delete().eq("id", id);
      if (error) throw error;
    },
    onSettled: () => qc.invalidateQueries({ queryKey: MEMBERS_KEY }),
  });
}
