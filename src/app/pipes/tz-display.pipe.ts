import { Pipe, PipeTransform } from '@angular/core';
const GENERIC_LABELS: Record<string, string> = {
  'America/New_York': 'Eastern Time',
  'America/Chicago': 'Central Time',
  'America/Denver': 'Mountain Time',
  'America/Los_Angeles': 'Pacific Time',
  'America/Mexico_City': 'Central Time (MX)',
  'Europe/London': 'UK Time',
  'Europe/Berlin': 'Central European Time',
  'Europe/Paris': 'Central European Time',
  'Europe/Madrid': 'Central European Time',
  'Europe/Helsinki': 'Eastern European Time',
  'Asia/Tokyo': 'Japan Time',
  'Asia/Shanghai': 'China Time',
  'Asia/Kolkata': 'India Standard Time',
  'Australia/Sydney': 'Australia Eastern Time',
  UTC: 'Coordinated Universal Time',
};

@Pipe({ name: 'tzDisplay', standalone: true })
export class TzDisplayPipe implements PipeTransform {

  transform(date: Date, timeZone: string, locale = 'en-US'): string {
    const df = new Intl.DateTimeFormat(locale, {
      timeZone,
      hour: '2-digit',
      minute: '2-digit',
      timeZoneName: 'long',
    });
    const parts = df.formatToParts(date);
    const name = parts.find(p => p.type === 'timeZoneName')?.value ?? '';
    const hh = parts.find(p => p.type === 'hour')?.value ?? '';
    const mm = parts.find(p => p.type === 'minute')?.value ?? '';

    const isGMT = /^GMT/i.test(name);
    const cleaned = isGMT
      ? (GENERIC_LABELS[timeZone] ?? timeZone)
      : name.replace(/\b(Daylight|Standard)\s+/g, '').trim(); // "Eastern Time"

    return `${cleaned} (${hh}:${mm})`;
  }
}
