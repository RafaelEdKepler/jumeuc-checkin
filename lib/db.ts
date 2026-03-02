"use server"

import { Attendee } from "@/app/generated/prisma";
import { fromZonedTime } from "date-fns-tz"
import prisma from "./prisma";
import { endOfDay, startOfDay } from "date-fns";

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
  const startOfDay = new Date(Date.UTC(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate()
  ));

  const endOfDay = new Date(Date.UTC(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate() + 1
  ));

  const attendees = await prisma.attendee.findMany({
    where: {
      createdAt: {
        gte: startOfDay,
        lt: endOfDay,
      }
    },
    orderBy: { createdAt: "asc" },
    });

    return attendees;
}

export async function confirmAttendee(confirmed: number[], notConfirmed: number[]) {
    
    console.log(confirmed, notConfirmed)
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