import Papa from "papaparse";
import type { Gender, AgeBucket } from "../types-outreach";

// Expected columns (semicolon-separated, header line):
// creator; username; followers; Engagement; ER; Audience city; Audience age;
// Avg. reel plays; Avg. views; Email
export interface OutreachCsvRow {
  creator?: string;
  username?: string;
  followers?: string;
  engagement?: string;
  er?: string;
  audience_city?: string;
  audience_age?: string;
  avg_reel_plays?: string;
  avg_views?: string;
  email?: string;
}

export interface ParsedOutreachRow {
  creator: string | null;
  username: string;
  followers: number | null;
  engagement: number | null;
  er: number | null;
  audience_city: string | null;
  audience_age: string | null;
  avg_reel_plays: number | null;
  avg_views: number | null;
  email: string | null;
  gender: Gender;
  age_bucket: AgeBucket;
  is_milan: boolean;
}

const FEMALE_HINTS = [
  "a","ia","ella","etta","ina","ola","ara","ena","isa","ria","sia","lia","nia",
];
const MALE_HINTS = [
  "o","io","ele","ino","aldo","ardo","erto","ico","one","eo","tro",
];

function guessGender(name: string | null): Gender {
  if (!name) return "unknown";
  const first = name.trim().split(/\s+/)[0]?.toLowerCase() ?? "";
  if (!first) return "unknown";
  // explicit common Italian names quick map
  const female = ["giulia","sara","maria","anna","laura","chiara","sofia","martina","alessia","francesca","elena","valeria","silvia","camilla","beatrice","cristina","federica","giorgia","lucia","ilaria","veronica","arianna"];
  const male = ["marco","luca","matteo","andrea","alessandro","francesco","giovanni","stefano","davide","simone","paolo","riccardo","federico","giorgio","lorenzo","tommaso","gabriele","filippo","nicola","fabio","roberto","antonio"];
  if (female.includes(first)) return "f";
  if (male.includes(first)) return "m";
  for (const s of FEMALE_HINTS) if (first.endsWith(s)) return "f";
  for (const s of MALE_HINTS) if (first.endsWith(s)) return "m";
  return "unknown";
}

function parseAgeBucket(raw: string | null): AgeBucket {
  if (!raw) return "unknown";
  // pick the dominant age range (e.g. "25-34 (45%)" or "18-24, 25-34")
  const m = raw.match(/(18-24|25-34|35-44|45\+|45-54|55\+|55-64)/i);
  if (!m) return "unknown";
  const v = m[1].toLowerCase();
  if (v.startsWith("45") || v.startsWith("55")) return "45+";
  return v as AgeBucket;
}

function isMilan(city: string | null): boolean {
  if (!city) return false;
  return /milan/i.test(city);
}

function num(v: string | undefined | null): number | null {
  if (v == null || v === "") return null;
  const cleaned = String(v).replace(/[^\d.,-]/g, "").replace(",", ".");
  const n = Number(cleaned);
  return Number.isFinite(n) ? n : null;
}

export function parseOutreachCsv(text: string): ParsedOutreachRow[] {
  // Try ; first, fall back to , — Papa auto-detects when delimiter is empty
  const result = Papa.parse<OutreachCsvRow>(text, {
    header: true, skipEmptyLines: true, delimiter: "",
    transformHeader: (h) => h.trim().toLowerCase().replace(/\./g, "").replace(/\s+/g, "_"),
  });
  const rows = result.data ?? [];
  return rows
    .filter((r) => r && (r.username || r.creator))
    .map((r) => {
      const creator = (r.creator ?? "").toString().trim() || null;
      let username = (r.username ?? "").toString().trim().replace(/^@/, "");
      if (!username && creator) username = creator.toLowerCase().replace(/\s+/g, ".");
      const city = (r.audience_city ?? "").toString().trim() || null;
      const age = (r.audience_age ?? "").toString().trim() || null;
      return {
        creator,
        username,
        followers: num(r.followers),
        engagement: num(r.engagement),
        er: num(r.er),
        audience_city: city,
        audience_age: age,
        avg_reel_plays: num(r.avg_reel_plays),
        avg_views: num(r.avg_views),
        email: (r.email ?? "").toString().trim() || null,
        gender: guessGender(creator),
        age_bucket: parseAgeBucket(age),
        is_milan: isMilan(city),
      };
    });
}

export const OUTREACH_CSV_TEMPLATE =
  "creator;username;followers;Engagement;ER;Audience city;Audience age;Avg. reel plays;Avg. views;Email\n" +
  "Giulia Rossi;giulia.rossi;25400;1200;4.7;Milan (38%);25-34 (52%);18500;22000;giulia@example.com\n" +
  "Marco Bianchi;marco_bianchi;48000;1900;3.9;Roma (29%);25-34 (44%);31000;28000;marco@example.com\n";
