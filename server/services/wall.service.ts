"use server"

import prisma from "../../shared/lib/prisma";

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