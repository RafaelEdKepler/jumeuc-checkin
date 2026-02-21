"use server";

import { addAttendee } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function checkIn(formData: FormData) {
  const name = formData.get("name") as string;

  if (!name) return;

  await addAttendee(name);

  revalidatePath("/checkin");
}