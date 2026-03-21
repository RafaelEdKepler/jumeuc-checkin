export function normalizeDate(date: Date) {
  return new Date(Date.UTC(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    12, 0, 0
  ))
}

export function parseDate(date: string | Date) {
  if (typeof date === "string") {
    return new Date(date.replace("$D", ""))
  }
  return date
}