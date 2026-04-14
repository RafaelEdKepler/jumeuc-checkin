import { AttendeeWithCount } from "@/lib/db";

export function mergeOptimisticAttendee(
  state: AttendeeWithCount[],
  attendee: AttendeeWithCount
) {
  const exists = state.some(a => a.name === attendee.name);

  if (exists) {
    return state.map(a =>
      a.name === attendee.name ? attendee : a
    );
  }

  return [...state, attendee];
}