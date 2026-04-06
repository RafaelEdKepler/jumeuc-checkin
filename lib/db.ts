"use server"

import { Attendee } from "@/app/generated/prisma";
import { fromZonedTime } from "date-fns-tz"
import prisma from "./prisma";
import { addYears, endOfDay, startOfDay, startOfYear } from "date-fns";
import { normalizeDate, parseDate } from "@/utils/normalize-data";
import { AppError } from "@/utils/error-class";

const timeZone = "America/Sao_Paulo";

export async function getAllAttendees(): Promise<string[]> {  
  const normalized = normalizeDate(new Date());  
  const startOfToday = new Date(Date.UTC(
    normalized.getUTCFullYear(),
    normalized.getUTCMonth(),
    normalized.getUTCDate(),
    0, 0, 0, 0
  ))

  const endOfToday = new Date(Date.UTC(
    normalized.getUTCFullYear(),
    normalized.getUTCMonth(),
    normalized.getUTCDate(),
    23, 59, 59, 999
  ))
  const response = await prisma.attendee.findMany({
      where: { 
          createdAt: {
              gte: startOfToday,
              lte: endOfToday,                
          },
          confirmed: true
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

  try {
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
  try {
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
  } catch (err) {
    throw new AppError(`Error on get dates - ${err}`, 400)
  }
}

export async function saveDates(dates: Date[]) {  
  try {
    await prisma.calendar.createMany({
      data: dates.map((date) => ({
        date: normalizeDate(date),
      })),
    })
  } catch (err) {
    throw new AppError(`Error on save dates - ${err}`, 400)
  }
}

export async function saveSingleDate(date: Date) {  
  try {    
    await prisma.calendar.create({
      data: {
        date: normalizeDate(date)
      }
    })
  } catch (err) {
    throw new AppError(`Error on save single date - ${err}`, 400)
  }
}

export async function deleteSingleData(date: Date | string) {
  try {
    const parsedDate = parseDate(date)  
    await prisma.calendar.delete({        
      where: {
        date: normalizeDate(parsedDate),
      }
    })
  } catch (err) {
    throw new AppError(`Error on get delete single date - ${err}`, 400)
  }
}

export const confirmIfIsThereProgram = async (date: Date) => {
  try {
    const normalized = normalizeDate(date)

    const start = new Date(Date.UTC(
      normalized.getUTCFullYear(),
      normalized.getUTCMonth(),
      normalized.getUTCDate(),
      0, 0, 0, 0
    ))

    const end = new Date(Date.UTC(
      normalized.getUTCFullYear(),
      normalized.getUTCMonth(),
      normalized.getUTCDate(),
      23, 59, 59, 999
    ))

    return await prisma.calendar.findFirst({
      where: {
        date: {
          gte: start,
          lte: end
        }
      }
    })
  } catch (err) {
    throw new AppError(`Error verify if there is program by date - ${err}`, 400)
  }
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