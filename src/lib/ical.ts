import type { PayloadEvent } from '@/lib/events';

const formatDate = (date: Date) =>
  date
    .toISOString()
    .replace(/[-:]/g, '')
    .replace(/\.\d{3}Z$/, 'Z');

export function buildCalendarICS(events: PayloadEvent[], siteUrl: string) {
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//PPT Events//Events Calendar//DE',
    'CALSCALE:GREGORIAN',
  ];

  for (const event of events) {
    const start = new Date(event.startDate);
    const end = new Date(event.endDate);
    lines.push(
      'BEGIN:VEVENT',
      `UID:${event.id}@ppt-events`,
      `DTSTAMP:${formatDate(new Date())}`,
      `DTSTART:${formatDate(start)}`,
      `DTEND:${formatDate(end)}`,
      `SUMMARY:${event.title}`,
      event.location ? `LOCATION:${event.location}` : '',
      `URL:${siteUrl}/veranstaltungen/${event.slug}`,
      'END:VEVENT',
    );
  }

  lines.push('END:VCALENDAR');
  return lines.filter(Boolean).join('\r\n');
}
