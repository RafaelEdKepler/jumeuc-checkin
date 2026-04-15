"use server";

import { addAttendee, confirmAttendee } from "@/shared/services/attendee.service";
import { revalidatePath } from "next/cache";

export async function checkIn(formData: FormData) {
  const name = formData.get("name") as string;

  if (!name) return;

  await addAttendee(name);

  revalidatePath("/checkin");
}

export async function confirmAttendeeAction(confirmed : number[], notConfirmed : number[]) {
  await confirmAttendee(confirmed, notConfirmed)
  revalidatePath("/confirm");
}