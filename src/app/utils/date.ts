export function formatYYYYMMDD(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export function timeStringToNumber(time: string): number {
  const [hour, minute] = time.split(':').map(Number);
  return hour + (minute / 60);
}
