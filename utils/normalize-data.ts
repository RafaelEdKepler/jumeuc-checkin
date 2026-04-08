export function normalizeDate(date: Date) {
  const brazilOffset = -3;
  return new Date(
    date.getTime() + brazilOffset * 60 * 60 * 1000
  );
}

export function parseDate(date: string | Date) {
  if (typeof date === "string") {
    return new Date(date.replace("$D", ""))
  }
  return date
}