import { AttendeeWithCount } from "@/shared/types/types";

export default function verifyRedundance(
  arr: AttendeeWithCount[],
  value: string,
) {
  return arr.find((arrValue) => arrValue.name === value);
}
