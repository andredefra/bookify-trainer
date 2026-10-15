import Papa from "papaparse";
import type { CrmMember } from "../hooks/useCrmMembers";

// Same shape as waitlistCsv: header line + one line per row, every column.
export function membersToCsv(rows: CrmMember[]): string {
  return Papa.unparse(
    rows.map((r) => ({
      seat_number: r.seat_number,
      tier: r.tier,
      price_eur: r.price_eur,
      full_name: r.full_name,
      email: r.email ?? "",
      phone: r.phone ?? "",
      city: r.city ?? "",
      contract_status: r.contract_status,
      signed_at: r.signed_at ?? "",
      payment_due_at: r.payment_due_at ?? "",
      paid_at: r.paid_at ?? "",
      penalty_card: r.penalty_card,
      penalty_month: r.penalty_month ?? "",
      platform_user_id: r.platform_user_id ?? "",
      platform_url: r.platform_url ?? "",
      opportunity_id: r.opportunity_id ?? "",
      notes: r.notes ?? "",
      created_at: r.created_at,
      updated_at: r.updated_at,
    })),
  );
}
