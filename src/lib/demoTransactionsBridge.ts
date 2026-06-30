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
const VKEY = "demo-shared-transactions-version";
const SEED_VERSION = 2;
const EVT = "demo-tx-changed";

export const DEMO_CLIENT_NAME = "Andrea M.";
export const DEMO_TRAINER_NAME = "Sarah Johnson";

export type RefundStatus = "pending" | "approved" | "rejected" | "processed";

export interface DemoTransaction extends Omit<TransactionType, "refundStatus"> {

  // Client-driven flags (mirrors of the trainer-side semantics)
  refundStatus?: RefundStatus;
  refundReason?: string;
  refundRequestedAt?: string;
  refundProcessedAt?: string;
  refundRejectedAt?: string;
  refundReceiptNumber?: string;
  // Invoice metadata (used for downloadable PDF)
  invoiceNumber?: string;
  invoiceIssuedAt?: string;
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
  // --- v2 mock entries: historical, downloadable, varied states ---
  {
    id: 90004,
    client: DEMO_CLIENT_NAME,
    type: "Session",
    name: "Personal Training",
    amount: 50,
    date: "2025-05-20",
    status: "paid",
    paymentMethod: "card",
    invoiceStatus: "sent_to_client",
    invoiceSent: true,
    invoiceNumber: "INV-2025-0042",
    invoiceIssuedAt: "2025-05-21",
    clientConfirmedReceipt: true, // already finalized → stays visible as historic via filter override
  },
  {
    id: 90005,
    client: DEMO_CLIENT_NAME,
    type: "Program",
    name: "Hypertrophy 8-week Program",
    amount: 200,
    date: "2025-05-10",
    status: "refunded",
    paymentMethod: "card",
    invoiceStatus: "sent_to_client",
    invoiceSent: true,
    invoiceNumber: "INV-2025-0036",
    invoiceIssuedAt: "2025-05-10",
    refundStatus: "processed",
    refundReason: "Infortunio del cliente, programma interrotto",
    refundRequestedAt: "2025-05-18",
    refundProcessedAt: "2025-05-22",
    refundReceiptNumber: "REF-2025-0007",
  },
  {
    id: 90006,
    client: DEMO_CLIENT_NAME,
    type: "Session",
    name: "Personal Training",
    amount: 45,
    date: "2025-04-28",
    status: "paid",
    paymentMethod: "cash",
    invoiceStatus: "none",
    invoiceSent: false,
  },
  {
    id: 90007,
    client: DEMO_CLIENT_NAME,
    type: "Package",
    name: "10-Session Pack",
    amount: 300,
    date: "2025-04-15",
    status: "paid",
    paymentMethod: "card",
    invoiceStatus: "sent_to_client",
    invoiceSent: true,
    invoiceNumber: "INV-2025-0028",
    invoiceIssuedAt: "2025-04-16",
    clientConfirmedReceipt: true,
  },
  {
    id: 90008,
    client: DEMO_CLIENT_NAME,
    type: "Session",
    name: "Personal Training",
    amount: 50,
    date: "2025-03-30",
    status: "paid",
    paymentMethod: "card",
    invoiceStatus: "sent_to_client",
    invoiceSent: true,
    invoiceNumber: "INV-2025-0019",
    invoiceIssuedAt: "2025-03-31",
    refundStatus: "rejected",
    refundReason: "Sessione effettuata regolarmente, rimborso non applicabile",
    refundRequestedAt: "2025-04-02",
    refundRejectedAt: "2025-04-04",
  },
];

function read(): DemoTransaction[] {
  if (typeof window === "undefined") return [];
  try {
    const currentVersion = parseInt(
      window.localStorage.getItem(VKEY) ?? "0",
      10
    );
    const raw = window.localStorage.getItem(KEY);
    if (!raw || currentVersion < SEED_VERSION) {
      window.localStorage.setItem(KEY, JSON.stringify(SEED));
      window.localStorage.setItem(VKEY, String(SEED_VERSION));
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
