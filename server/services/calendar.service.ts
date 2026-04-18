"use server"

import prisma from "../../shared/lib/prisma";
import { normalizeDate } from "../../shared/utils/normalize-data";

export async function getDates(year: number) {
  const start = new Date(Date.UTC(year, 0, 1));
  const end = new Date(Date.UTC(year + 1, 0, 1));

  return await prisma.calendar.findMany({
    where: {
      date: {
        gte: start,
        lt: end
      }
    }
  });
}

export async function saveDates(dates: Date[]) {
  await prisma.calendar.createMany({
    data: dates.map((date) => ({
      date: normalizeDate(date),
    })),
  })
}

export async function saveSingleDate(date: Date) {
  await prisma.calendar.create({
    data: {
      date: normalizeDate(date)
    }
  })
}

export async function deleteSingleData(date: Date) {  

  await prisma.calendar.delete({
    where: {
      date: normalizeDate(date),
    }
  })
}

export const confirmIfIsThereProgram = async (date: Date) => {
  const normalized = normalizeDate(date);

  return await prisma.calendar.findFirst({
    where: {
      date: normalized
    }
  })
}