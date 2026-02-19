import { format, isValid } from 'date-fns';

/**
 * Safely format a date value. Returns fallback string if the date is invalid.
 */
export function safeFormatDate(
  dateValue: string | Date | null | undefined,
  formatStr: string,
  fallback: string = 'N/A'
): string {
  if (!dateValue) return fallback;
  try {
    const date = dateValue instanceof Date ? dateValue : new Date(dateValue);
    if (!isValid(date)) return fallback;
    return format(date, formatStr);
  } catch {
    return fallback;
  }
}
