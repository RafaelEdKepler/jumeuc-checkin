"use server"

import { Attendee } from "@/app/generated/prisma";
import prisma from "../../shared/lib/prisma";
import { AttendeeWithCount } from "../../shared/types/types";
import { getUTCDayRange, normalizeDate, toBrazilDayKey, toUTCDateKey } from "../../shared/utils/normalize-data";
import { AppError } from "../../shared/utils/error-class";

export async function getAllAttendeesCheckin(): Promise<AttendeeWithCount[]> {
  const { start, end } = getUTCDayRange(new Date());

  const todayAttendees = await prisma.attendee.findMany({
    where: {
      createdAt: {
        gte: start,
        lte: end,
      },
      confirmed: true,
    },
    select: {
      name: true,
    }
  });

  const names = todayAttendees.map(a => a.name);

  const counts = await prisma.attendee.groupBy({
    by: ["name"],
    where: {
      name: { in: names },
      confirmed: true,
      createdAt: {
        lte: end
      }
    },
    _count: {
      name: true
    }
  });

  const countMap = new Map(
    counts.map(c => [c.name, c._count.name])
  );

  return todayAttendees.map(att => ({
    name: att.name,
    count: countMap.get(att.name) ?? 1
  }));
}

export async function getAllAttendees(): Promise<string[]> {
  const { start, end } = getUTCDayRange(new Date());

  const response = await prisma.attendee.findMany({
    where: { 
      createdAt: {
        gte: start,
        lte: end,                
      },
      confirmed: true
    },
  });

  return response.map(a => a.name);
}

export async function getHowManyAttendance(name: string): Promise<number> {
  const programs = await prisma.calendar.findMany({
    where: {
      date: {
        lte: new Date()
      }
    },
    orderBy: { date: "desc" },
    select: { date: true }
  });

  const attendances = await prisma.attendee.findMany({
    where: {
      name,
      confirmed: true
    },
    select: {
      createdAt: true
    }
  });  

  const attendanceSet = new Set(
    attendances.map(a => toBrazilDayKey(a.createdAt))
  );

  let streak = 0;

  for (const program of programs) {
    const programKey = toUTCDateKey(program.date);

    if (attendanceSet.has(programKey)) {
      streak++;
    } else {
      break;
    }
  }

  return streak;
}

export async function addAttendee(name: string, date: Date) {
  await prisma.attendee.create({
    data: { 
      name, 
      createdAt: normalizeDate(date)
    },
  });
}

export async function getAttendeesForDate(date: Date): Promise<Attendee[]> {
  const {start, end} = getUTCDayRange(date);

  return prisma.attendee.findMany({
    where: {
      createdAt: {
        gte: start,
        lte: end,
      }
    },
    orderBy: { createdAt: "asc" },
  });
}

export async function confirmAttendee(confirmed: number[], notConfirmed: number[]) {
    
    try {
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
    } catch (err) {
      throw new AppError(`Error on confirm attendees - ${err}`, 400)
    }

}