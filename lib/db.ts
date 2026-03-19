"use server"

import { Attendee } from "@/app/generated/prisma";
import { fromZonedTime } from "date-fns-tz"
import prisma from "./prisma";
import { addYears, endOfDay, startOfDay, startOfYear } from "date-fns";

const timeZone = "America/Sao_Paulo";

export async function getAllAttendees(): Promise<string[]> {
    const now = new Date();
    const startOfToday = fromZonedTime(startOfDay(now), timeZone);
    const endOfToday = fromZonedTime(endOfDay(now), timeZone);
    const response = await prisma.attendee.findMany({
        where: { 
            createdAt: {
                gte: startOfToday,
                lte: endOfToday,
            } 
        },
    });
    return response.map((attendee: Attendee) => attendee.name);
}

export async function addAttendee(name: string) {
    await prisma.attendee.create({
        data: { name, createdAt: new Date() },
    });
    return;
}

export async function getAttendeesForDate(date: Date): Promise<Attendee[]> {
  const startOfThisDay = fromZonedTime(startOfDay(date), timeZone);
  const endOfThisDay = fromZonedTime(endOfDay(date), timeZone);

  const attendees = await prisma.attendee.findMany({
    where: {
      createdAt: {
        gte: startOfThisDay,
        lt: endOfThisDay,
      }
    },
    orderBy: { createdAt: "asc" },
    });

    return attendees;
}

export async function confirmAttendee(confirmed: number[], notConfirmed: number[]) {
        
    await prisma.$transaction([
        prisma.attendee.updateMany({
            where: {id: { in: confirmed }},
            data: { confirmed: true, updatedAt: new Date() }
        }),
        prisma.attendee.updateMany({
            where: {id: { in: notConfirmed }},
            data: { confirmed: false, updatedAt: new Date() }
        }),
    ])

}

export async function getDates(year: number) {    
  const start = startOfYear(new Date(year, 0, 1))
  const end = addYears(start, 1)

  return await prisma.calendar.findMany({
    where: {
      date: {
        gte: start,
        lt: end
      }
    }
  })
}

export async function saveDates(dates: Date[]) {    
  await prisma.calendar.createMany({
    data: dates.map((date) => ({
      date,
    })),
  })
}