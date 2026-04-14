"use server"

import { Attendee } from "@/app/generated/prisma";
import prisma from "./prisma";
import { getUTCDayRange, normalizeDate, toBrazilDayKey, toUTCDateKey } from "@/shared/utils/normalize-data";
import { AppError } from "@/shared/utils/error-class";

export interface AttendeeWithCount {
  name: string,
  count: number
}

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

export async function addAttendee(name: string) {
  await prisma.attendee.create({
    data: { 
      name, 
      createdAt: new Date()
    },
  });
}

export async function getAttendeesForDate(date: Date): Promise<Attendee[]> {
  const { start, end } = getUTCDayRange(date);

  try {
    return await prisma.attendee.findMany({
      where: {
        createdAt: {
          gte: start,
          lte: end,
        }
      },
      orderBy: { createdAt: "asc" },
    });
  } catch (err) {
    throw new AppError(`Error on get Attendees by date - ${err}`, 400)
  }
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

export const getMoreAttendance = async () => {
  const newDate = new Date();
  const actualYear = newDate.getFullYear();
  const allProgramsResponse = await prisma.calendar.count({
    where: {
      date: {
        gte: new Date(`${actualYear}-01-01`),
        lte: new Date()
      }
    }
  });
  const attendeeResponse = await prisma.attendee.groupBy({
    by: ['name'],
    where: {
      confirmed: true,
      createdAt: {
        gte: new Date(`${actualYear}-01-01`),
        lte: new Date()
      }
    },
    _count: {
      name: true
    },    
    orderBy: {
      _count: {
        name: 'desc'
      }
    },
    take: 10
  })
  return attendeeResponse.map((attendee, index) => ({
    position: index + 1,
    name: attendee.name,
    count: attendee._count.name,
    percentual: (attendee._count.name * 100 / allProgramsResponse).toFixed(0)
  }))
}