import { AttendeeWithCount } from "@/shared/lib/db";

export function updateAttendees(
  prev: AttendeeWithCount[],
  name: string,
  count: number
): AttendeeWithCount[] {
  const exists = prev.some(att => att.name === name);

  if (exists) {
    return prev.map(att =>
      att.name === name ? { ...att, count } : att
    );
  }

  return [...prev, { name, count }];
}