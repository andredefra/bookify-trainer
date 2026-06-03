import { createContext, useCallback, useContext, useEffect, useMemo, useState, ReactNode } from "react";
import type { SalesContact } from "@/components/trainer/dashboard/tabs/sales/types";

interface RosterState {
  removedClientIds: number[];
  terminatedContacts: SalesContact[];
}

interface RemoveInput {
  id: number;
  name: string;
  email: string;
  clientSince?: string;
  reason?: string;
}

interface ClientRosterContextValue {
  removedIds: Set<number>;
  terminatedContacts: SalesContact[];
  removeClient: (input: RemoveInput) => void;
}

const STORAGE_KEY = "trainer-client-roster";
const ClientRosterContext = createContext<ClientRosterContextValue | null>(null);

export function ClientRosterProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<RosterState>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return JSON.parse(raw) as RosterState;
    } catch {
      // ignore
    }
    return { removedClientIds: [], terminatedContacts: [] };
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // ignore
    }
  }, [state]);

  const removeClient = useCallback((input: RemoveInput) => {
    setState((prev) => {
      const now = new Date().toISOString();
      const emailKey = (input.email || "").trim().toLowerCase();
      const filtered = prev.terminatedContacts.filter(
        (c) => (c.email || "").trim().toLowerCase() !== emailKey
      );
      const contact: SalesContact = {
        id: `terminated-${input.id}-${Date.now()}`,
        name: input.name,
        email: input.email,
        status: "terminated",
        notes: input.reason ?? "Removed from Clients list",
        createdAt: now,
        lastUpdated: now,
        clientSince: input.clientSince,
      };
      return {
        removedClientIds: prev.removedClientIds.includes(input.id)
          ? prev.removedClientIds
          : [...prev.removedClientIds, input.id],
        terminatedContacts: [contact, ...filtered],
      };
    });
  }, []);

  const value = useMemo<ClientRosterContextValue>(
    () => ({
      removedIds: new Set(state.removedClientIds),
      terminatedContacts: state.terminatedContacts,
      removeClient,
    }),
    [state, removeClient]
  );

  return <ClientRosterContext.Provider value={value}>{children}</ClientRosterContext.Provider>;
}

export function useClientRoster() {
  const ctx = useContext(ClientRosterContext);
  if (!ctx) throw new Error("useClientRoster must be used within ClientRosterProvider");
  return ctx;
}
