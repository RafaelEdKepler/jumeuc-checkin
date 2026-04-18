export function normalizeDate(date: Date) {
  return new Date(Date.UTC(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    0, 0, 0, 0
  ));
}

export function getUTCDayRange(date: Date) {
  const start = new Date(Date.UTC(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    0, 0, 0, 0
  ));

  const end = new Date(Date.UTC(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    23, 59, 59, 999
  ));

  return { start, end };
}

export function isSameDayUTC(a: Date, b: Date) {
  return normalizeDate(a).getTime() === normalizeDate(b).getTime();
}

export function toLocalMidnight(date: Date) {
  return new Date(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate(),
    0, 0, 0, 0
  );
}

export function normalizeBrazilDate(date: Date) {
  const brazil = new Date(
    date.toLocaleString("en-US", { timeZone: "America/Sao_Paulo" })
  );

  return new Date(Date.UTC(
    brazil.getFullYear(),
    brazil.getMonth(),
    brazil.getDate(),
    0, 0, 0, 0
  ));
}

export function toBrazilDayKey(date: Date) {
  const brazil = new Date(
    date.toLocaleString("en-US", { timeZone: "America/Sao_Paulo" })
  );

  const y = brazil.getFullYear();
  const m = String(brazil.getMonth() + 1).padStart(2, "0");
  const d = String(brazil.getDate()).padStart(2, "0");

  return `${y}-${m}-${d}`;
}

export function toUTCDateKey(date: Date) {
  const y = date.getUTCFullYear();
  const m = String(date.getUTCMonth() + 1).padStart(2, "0");
  const d = String(date.getUTCDate()).padStart(2, "0");

  return `${y}-${m}-${d}`;
}

export function normalizeDateBugFix(date: Date) {
  return new Date(Date.UTC(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    0, 0, 0, 0
  ));
}