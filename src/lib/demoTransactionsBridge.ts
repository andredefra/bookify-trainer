/**
 * Demo Transactions Bridge
 * ------------------------
 * Shared localStorage-backed store that connects the client's "Payment History"
 * to the trainer's "Sales / Transactions" for the Andrea demo account.
 *
 * Future-proofing: once Sessions / Programs / Packages checkout flows ship,
 * their success handlers should call `upsertDemoTransaction()` so the same UI
 * surface keeps working with real transactions (or, in production, swap the
 * implementation to read from Supabase).
 */
import { TransactionType } from "@/components/trainer/dashboard/tabs/transactions/types/transactionTypes";

const KEY = "demo-shared-transactions";
const EVT = "demo-tx-changed";

export const DEMO_CLIENT_NAME = "Andrea M.";
export const DEMO_TRAINER_NAME = "Sarah Johnson";

export type RefundStatus = "pending" | "approved" | "rejected";

export interface DemoTransaction extends TransactionType {
  // Client-driven flags (mirrors of the trainer-side semantics)
  refundStatus?: RefundStatus;
  refundReason?: string;
  refundRequestedAt?: string;
  // Lifecycle: once both sides agree, mark as archived (then removed from lists)
  clientConfirmedReceipt?: boolean;
}

const SEED: DemoTransaction[] = [
  {
    id: 90001,
    client: DEMO_CLIENT_NAME,
    type: "Session",
    name: "Personal Training",
    amount: 50,
    date: "2025-06-15",
    status: "paid",
    paymentMethod: "card",
    invoiceStatus: "sent_to_client",
    invoiceSent: true,
  },
  {
    id: 90002,
    client: DEMO_CLIENT_NAME,
    type: "Session",
    name: "Personal Training",
    amount: 45,
    date: "2025-06-08",
    status: "paid",
    paymentMethod: "cash",
    invoiceStatus: "none",
    invoiceSent: false,
  },
  {
    id: 90003,
    client: DEMO_CLIENT_NAME,
    type: "Program",
    name: "Strength Building Program",
    amount: 120,
    date: "2025-06-01",
    status: "paid",
    paymentMethod: "card",
    invoiceStatus: "sent_to_client",
    invoiceSent: true,
    refundStatus: "pending",
    refundReason: "Cambio di programma personale",
    refundRequestedAt: "2025-06-20",
  },
];

function read(): DemoTransaction[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) {
      window.localStorage.setItem(KEY, JSON.stringify(SEED));
      return [...SEED];
    }
    return JSON.parse(raw) as DemoTransaction[];
  } catch {
    return [...SEED];
  }
}

function write(list: DemoTransaction[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEY, JSON.stringify(list));
  window.dispatchEvent(new CustomEvent(EVT));
}

export function getDemoTransactions(): DemoTransaction[] {
  return read();
}

export function upsertDemoTransaction(tx: DemoTransaction) {
  const list = read();
  const i = list.findIndex((t) => t.id === tx.id);
  if (i >= 0) list[i] = { ...list[i], ...tx };
  else list.unshift(tx);
  write(list);
}

export function patchDemoTransaction(id: number, patch: Partial<DemoTransaction>) {
  const list = read();
  const i = list.findIndex((t) => t.id === id);
  if (i < 0) return;
  list[i] = { ...list[i], ...patch };
  write(list);
}

export function removeDemoTransaction(id: number) {
  const list = read().filter((t) => t.id !== id);
  write(list);
}

export function subscribeDemoTransactions(cb: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  const handler = (e: StorageEvent | Event) => {
    if (e instanceof StorageEvent && e.key && e.key !== KEY) return;
    cb();
  };
  window.addEventListener("storage", handler);
  window.addEventListener(EVT, handler as EventListener);
  return () => {
    window.removeEventListener("storage", handler);
    window.removeEventListener(EVT, handler as EventListener);
  };
}
