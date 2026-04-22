import { formatInTimeZone, toDate } from "date-fns-tz";

export function normalizeDate(date: Date) {
  const brazilOffset = -3;
  return new Date(
    date.getTime() + brazilOffset * 60 * 60 * 1000
  );
}

export function getUTCDayRange(date: Date) {
  const start = toDate(formatInTimeZone(date, 'America/Sao_Paulo', 'yyyy-MM-dd'));
  console.log(start)
  // start.setHours(0, 0, 0, 0);
  
  const end = toDate(formatInTimeZone(date, 'America/Sao_Paulo', 'yyyy-MM-dd'));
  // end.setHours(0, 0, 0, 0);
  end.setDate(date.getUTCDate() + 1)

  console.log(start, end)

  return { start, end };
}

export function toLocalMidnight(date: Date) {
  return new Date(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate(),
    0, 0, 0, 0
  );
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