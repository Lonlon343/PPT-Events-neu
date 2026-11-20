type ParticipantExportRow = {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string | null;
  company?: string | null;
  message?: string | null;
  createdAt?: string;
};

const headers = ['Vorname', 'Nachname', 'E-Mail', 'Telefon', 'Firma', 'Nachricht', 'Anmeldezeit'];

// Cells starting with one of these characters are interpreted as formulas by
// spreadsheet apps (CSV/formula injection). OWASP: prefix with a single quote
// and wrap the cell in double quotes.
const FORMULA_TRIGGER = /^[=+\-@\t\r]/;
// A trigger right after ';' (the list separator of e.g. German Excel) or a line
// break would start a new cell when the file is split on ';' or lines, so it is
// neutralized there as well (OWASP: also take care of the field separator).
const EMBEDDED_FORMULA_TRIGGER = /([;\r\n])(?=[=+\-@\t\r])/g;

function escapeCsvValue(value: string) {
  const isFormula = FORMULA_TRIGGER.test(value);
  let cell = value.replace(EMBEDDED_FORMULA_TRIGGER, "$1'");
  if (isFormula) cell = `'${cell}`;
  if (cell !== value || /[",;\r\n]/.test(cell)) {
    return `"${cell.replace(/"/g, '""')}"`;
  }
  return cell;
}

export function buildParticipantsCsv(rows: ParticipantExportRow[]) {
  const lines: string[] = [];
  lines.push(headers.join(','));

  for (const row of rows) {
    const line = [
      row.firstName,
      row.lastName,
      row.email,
      row.phone || '',
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
