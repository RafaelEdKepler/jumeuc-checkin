"use server";

import { addAttendee, confirmAttendee } from "@/server/services/attendee.service";
import { revalidatePath } from "next/cache";

export async function checkIn(formData: FormData, date: Date) {
  const name = formData.get("name") as string;

  if (!name) return;

  await addAttendee(name, date);

  revalidatePath("/checkin");
}

export async function confirmAttendeeAction(confirmed : number[], notConfirmed : number[]) {
  await confirmAttendee(confirmed, notConfirmed)
  revalidatePath("/confirm");
}