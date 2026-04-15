type ParticipantExportRow = {
  firstName: string;
  lastName: string;
  email: string;
  company?: string | null;
  message?: string | null;
  createdAt?: string;
};

const headers = ['Vorname', 'Nachname', 'E-Mail', 'Firma', 'Nachricht', 'Anmeldezeit'];

function escapeCsvValue(value: string) {
  if (value.includes('"') || value.includes(',') || value.includes('\n')) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

export function buildParticipantsCsv(rows: ParticipantExportRow[]) {
  const lines: string[] = [];
  lines.push(headers.join(','));

  for (const row of rows) {
    const line = [
      row.firstName,
      row.lastName,
      row.email,
      row.company || '',
      row.message || '',
      row.createdAt ? new Date(row.createdAt).toLocaleString('de-DE') : '',
    ]
      .map((value) => escapeCsvValue(String(value ?? '')))
      .join(',');
    lines.push(line);
  }

  return lines.join('\r\n');
}
