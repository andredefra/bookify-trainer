import Papa from "papaparse";

export interface WaitlistRow {
  id: string;
  created_at: string;
  full_name: string;
  email: string;
  phone: string | null;
  city: string | null;
  source_page: string | null;
  language: string | null;
  trains_with_pt: string | null;
  marketing_consent: boolean;
  utm_campaign: string | null;
  audience: string;
}

// Same shape as outreachCsv: header line + one line per row.
export function waitlistToCsv(rows: WaitlistRow[]): string {
  return Papa.unparse(
    rows.map((r) => ({
      date: r.created_at,
      name: r.full_name,
      email: r.email,
      phone: r.phone ?? "",
      city: r.city ?? "",
      source_page: r.source_page ?? "",
      language: r.language ?? "",
      trains_with_pt: r.trains_with_pt ?? "",
      marketing_consent: r.marketing_consent ? "yes" : "no",
      utm_campaign: r.utm_campaign ?? "",
      audience: r.audience,
    })),
  );
}

export function downloadCsv(filename: string, csv: string) {
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 30_000);
}
