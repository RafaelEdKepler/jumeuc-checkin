"use server";

import prisma from "../../shared/lib/prisma";

const PAGE_SIZE = 10;

export const getMoreAttendance = async (page = 0) => {
  const newDate = new Date();
  const actualYear = newDate.getFullYear();
  const allProgramsResponse = await prisma.calendar.count({
    where: {
      date: {
        gte: new Date(`${actualYear}-01-01`),
        lte: new Date(),
      },
    },
  });
  const attendeeResponse = await prisma.attendee.groupBy({
    by: ["name"],
    where: {
      confirmed: true,
      createdAt: {
        gte: new Date(`${actualYear}-01-01`),
        lte: new Date(),
      },
    },
    _count: {
      name: true,
    },
    orderBy: [{ _count: { name: "desc" } }, { name: "asc" }],
    take: PAGE_SIZE + 1,
    skip: page * PAGE_SIZE,
  });

  const hasMore = attendeeResponse.length > PAGE_SIZE;

  const sliced = attendeeResponse.slice(0, PAGE_SIZE);

  return {
    data: sliced.map((attendee, index) => ({
      position: page * PAGE_SIZE + index + 1,
      name: attendee.name,
      count: attendee._count.name,
      percentual: ((attendee._count.name * 100) / allProgramsResponse).toFixed(
        0,
      ),
    })),
    hasMore,
  };
};
