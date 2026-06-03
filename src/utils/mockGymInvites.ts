// Mock invite storage for gym/studio onboarding (localStorage only).

export type MockGymInviteStatus = "pending" | "verified";
export type MockGymKind = "gym" | "studio";

export interface MockGymInvite {
  token: string;
  name: string;
  kind: MockGymKind;
  street: string;
  city?: string;
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

export function getInviteByToken(token: string): MockGymInvite | undefined {
  return getAllInvites().find((i) => i.token === token);
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
  const token =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : Math.random().toString(36).slice(2) + Date.now().toString(36);
  const invite: MockGymInvite = {
    ...data,
    token,
    status: "pending",
    createdAt: new Date().toISOString(),
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

export function getInvitesForTrainer(trainerId?: string): MockGymInvite[] {
  if (!trainerId) return getAllInvites();
  return getAllInvites().filter((i) => i.trainerId === trainerId);
}

export function buildOnboardingUrl(token: string): string {
  const origin =
    typeof window !== "undefined" ? window.location.origin : "";
  return `${origin}/gym-onboarding/${token}`;
}
