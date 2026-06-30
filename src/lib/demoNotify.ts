/**
 * Demo Notify
 * Lightweight mock for in-app notifications + chat messages + email.
 * For the Andrea demo only; gated by demo flag in caller.
 */
import { toast } from "sonner";

type Role = "trainer" | "client";

interface NotifyArgs {
  to: Role;
  title: string;
  description?: string;
  threadId?: string;
}

const NOTIF_KEY = (role: Role) => `demo-notifications-${role}`;
const MSG_KEY = (role: Role) => `demo-messages-${role}`;
const DEMO_EMAIL = "andrea.mypersonal.fit@gmail.com";

export function notifyDemo({ to, title, description, threadId }: NotifyArgs) {
  if (typeof window === "undefined") return;

  // 1) Persist notification for the recipient
  try {
    const key = NOTIF_KEY(to);
    const list = JSON.parse(window.localStorage.getItem(key) || "[]");
    list.unshift({
      id: Date.now(),
      title,
      description,
      createdAt: new Date().toISOString(),
      read: false,
    });
    window.localStorage.setItem(key, JSON.stringify(list.slice(0, 50)));
  } catch {}

  // 2) Append a chat message to the demo thread
  try {
    const key = MSG_KEY(to);
    const list = JSON.parse(window.localStorage.getItem(key) || "[]");
    list.push({
      id: Date.now(),
      threadId: threadId || "andrea-sarah",
      text: `${title}${description ? " — " + description : ""}`,
      createdAt: new Date().toISOString(),
      from: to === "trainer" ? "client" : "trainer",
    });
    window.localStorage.setItem(key, JSON.stringify(list.slice(-200)));
  } catch {}

  // 3) Mock email (console only)
  // eslint-disable-next-line no-console
  console.log(
    `[MOCK EMAIL → ${to === "client" ? DEMO_EMAIL : "trainer@mypersonal.fit"}] ${title}${
      description ? " — " + description : ""
    }`
  );

  // 4) Toast to whoever is currently viewing
  toast(title, { description });
}
