"use server"
import { Attendee } from "@/app/checkin/types";
import prisma from "./prisma";

export async function getAttendees(): Promise<string[]> {
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const endOfToday = new Date();
    endOfToday.setHours(23, 59, 59, 999);
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