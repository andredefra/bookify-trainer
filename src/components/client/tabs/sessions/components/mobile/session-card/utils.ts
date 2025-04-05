
import { SessionItem } from "@/types/sessions";

export function formatDate(session: SessionItem): string {
  return session.date instanceof Date 
    ? session.date.toLocaleDateString() 
    : session.date;
}

export function getBgColor(featured: boolean, isPast: boolean, session: SessionItem): string {
  if (featured) return 'bg-blue-50 border-blue-100';
  if (isPast) return 'bg-gray-50 border-gray-200';
  if (session.status === 'registered' || session.status === 'confirmed') return 'bg-accent/40 border-accent/30';
  return 'bg-gray-50 border-gray-100';
}
