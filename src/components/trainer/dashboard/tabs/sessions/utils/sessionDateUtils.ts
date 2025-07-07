export function formatSessionDate(date: string | Date): string {
  try {
    if (typeof date === 'string') {
      return date;
    }
    return date.toLocaleDateString();
  } catch (error) {
    console.error('Error formatting session date:', error);
    return 'Invalid Date';
  }
}