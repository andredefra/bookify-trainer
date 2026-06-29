// Mock invite storage for gym/studio onboarding (localStorage only).

export type MockGymInviteStatus = "pending" | "verified";
export type MockGymKind = "gym" | "studio";

export interface MockGymInvite {
  token: string;
  name: string;
  kind: MockGymKind;
  street: string;
  city?: string;
  vat?: string;
  notes?: string;
  status: MockGymInviteStatus;
  trainerId?: string;
  trainerEmail?: string;
  createdAt: string;
  verifiedAt?: string;
  gymEmail?: string;
  documents?: string[];
}

const STORAGE_KEY = "mock-gym-invites";

export function getAllInvites(): MockGymInvite[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as MockGymInvite[]) : [];
  } catch {
    return [];
  }
}

export function saveAllInvites(list: MockGymInvite[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

const TOKEN_PREFIX = "inv_";

function b64urlEncode(s: string): string {
  // Unicode-safe base64url
  const b64 = btoa(unescape(encodeURIComponent(s)));
  return b64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function b64urlDecode(s: string): string | null {
  try {
    const b64 = s.replace(/-/g, "+").replace(/_/g, "/");
    const pad = b64.length % 4 === 0 ? "" : "=".repeat(4 - (b64.length % 4));
    return decodeURIComponent(escape(atob(b64 + pad)));
  } catch {
    return null;
  }
}

function decodeInviteFromToken(token: string): MockGymInvite | undefined {
  if (!token.startsWith(TOKEN_PREFIX)) return undefined;
  const json = b64urlDecode(token.slice(TOKEN_PREFIX.length));
  if (!json) return undefined;
  try {
    const data = JSON.parse(json) as Partial<MockGymInvite>;
    if (!data.name || !data.kind || !data.street) return undefined;
    return {
      token,
      name: data.name,
      kind: data.kind,
      street: data.street,
      city: data.city,
      vat: data.vat,
      notes: data.notes,
      trainerId: data.trainerId,
      trainerEmail: data.trainerEmail,
      status: "pending",
      createdAt: data.createdAt || new Date().toISOString(),
    };
  } catch {
    return undefined;
  }
}

export function getInviteByToken(token: string): MockGymInvite | undefined {
  const stored = getAllInvites().find((i) => i.token === token);
  if (stored) return stored;
  // Fallback: reconstruct from self-encoded token so links work across browsers.
  const decoded = decodeInviteFromToken(token);
  if (decoded) {
    const list = getAllInvites();
    list.unshift(decoded);
    saveAllInvites(list);
    return decoded;
  }
  return undefined;
}

export function getInviteByEmail(email: string): MockGymInvite | undefined {
  const normalized = email.trim().toLowerCase();
  return getAllInvites().find(
    (i) => i.gymEmail?.toLowerCase() === normalized && i.status === "verified"
  );
}

export function createInvite(
  data: Omit<MockGymInvite, "token" | "status" | "createdAt">
): MockGymInvite {
  const createdAt = new Date().toISOString();
  const payload = JSON.stringify({
    name: data.name,
    kind: data.kind,
    street: data.street,
    city: data.city,
    vat: data.vat,
    notes: data.notes,
    trainerId: data.trainerId,
    trainerEmail: data.trainerEmail,
    createdAt,
  });
  const token = TOKEN_PREFIX + b64urlEncode(payload);
  const invite: MockGymInvite = {
    ...data,
    token,
    status: "pending",
    createdAt,
  };
  const list = getAllInvites();
  list.unshift(invite);
  saveAllInvites(list);
  return invite;
}

export function updateInvite(
  token: string,
  patch: Partial<MockGymInvite>
): MockGymInvite | undefined {
  const list = getAllInvites();
  const idx = list.findIndex((i) => i.token === token);
  if (idx === -1) return undefined;
  list[idx] = { ...list[idx], ...patch };
  saveAllInvites(list);
  return list[idx];
}

export function deleteInvite(token: string): void {
  const list = getAllInvites().filter((i) => i.token !== token);
  saveAllInvites(list);
}


export function getInvitesForTrainer(trainerId?: string): MockGymInvite[] {
  if (!trainerId) return getAllInvites();
  return getAllInvites().filter((i) => i.trainerId === trainerId);
}

export function buildOnboardingUrl(token: string): string {
  const origin =
    typeof window !== "undefined" ? window.location.origin : "";
  return `${origin}/gym-onboarding/${token}`;
}
